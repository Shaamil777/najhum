import { NextRequest, NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';
import { requireAdmin, requireSameOrigin } from '@/lib/auth/require-admin';
import { handleApiError, apiErrors } from '@/lib/utils/api-error';
import { uploadToR2 } from '@/lib/storage/r2';
import { put } from '@vercel/blob';
import { importPackage,verifyAsset } from './parse';
import { editAssets,type AssetEdit } from './asset-edits';
import { z } from 'zod';
import { metadataSchema, type ImportedDocument, MAX_UPLOAD } from './types';
import { prisma } from '@/lib/db/prisma';
import { saveImport } from './server';
import { savePortfolioImport } from '@/lib/portfolio/import-server';

export async function importHandler(req:NextRequest,id?:string,kind:'solutions'|'portfolio'='solutions') {
  try {
    const actor=await requireAdmin(req);requireSameOrigin(req);
    if(Number(req.headers.get('content-length'))>MAX_UPLOAD+1024*1024)throw apiErrors.badRequest('Maximum upload is 4 MB.');
    const form=await req.formData();
    const metadata=metadataSchema.parse(JSON.parse(String(form.get('metadata')||'{}')));
    for(const url of [metadata.coverImage,metadata.socialImage,metadata.menuIcon.includes('/')?metadata.menuIcon:''])if(url&&!/^https:\/\/|^\/(?!\/)/.test(url))throw apiErrors.badRequest('Image URLs must be HTTPS or site-relative.');
    const files=form.getAll('files').filter((f):f is File=>typeof f!=='string');
    const staged:{key:string;provider:string}[]=[];
    try {
      let document:ImportedDocument;
      const write=async(bytes:Uint8Array,name:string,type:string)=>{
        const ext=name.split('.').pop()!.toLowerCase();const key=`${kind==='portfolio'?'portfolio':'solutions'}/imports/${crypto.randomUUID()}.${ext}`;
        const file=new File([new Uint8Array(bytes)],name,{type});
        const provider=process.env.STORAGE_PROVIDER||'r2';
        if(provider==='vercel-blob'){const result=await put(key,file,{access:'public',addRandomSuffix:false});staged.push({key:result.url,provider});return {url:result.url,storageKey:result.url};}
        if(provider!=='r2')throw new Error('Unsupported media storage provider.');
        const saved=await uploadToR2(file,key);staged.push({key,provider});return saved;
      };
      if(files.length)document=await importPackage(files,metadata,write);
      else {
        if(!id)throw apiErrors.badRequest('Upload a responsive HTML file or ZIP.');
        const revision=kind==='portfolio'?await prisma.portfolioRevision.findFirst({where:{projectId:id},orderBy:{number:'desc'}}):await prisma.solutionRevision.findFirst({where:{solutionId:id},orderBy:{number:'desc'}});
        if(!revision)throw apiErrors.badRequest('Upload your first HTML package.');
        document={...(revision.document as unknown as ImportedDocument),metadata};
      }
      const changes=z.array(z.object({storageKey:z.string().max(2000),alt:z.string().max(500).optional(),fileKey:z.string().max(100).optional()})).max(100).parse(JSON.parse(String(form.get('assetEdits')||'[]')));
      if(files.length&&changes.length)throw apiErrors.badRequest('Import the replacement package first, then edit its images.');
      let replacementBytes=files.reduce((n,f)=>n+f.size,0);
      const edits:AssetEdit[]=[];
      for(const change of changes){
        const edit:AssetEdit={storageKey:change.storageKey,alt:change.alt};
        if(change.fileKey){
          const image=form.get(change.fileKey);
          if(!(image instanceof File))throw apiErrors.badRequest('Replacement image is missing.');
          replacementBytes+=image.size;
          if(replacementBytes>MAX_UPLOAD)throw apiErrors.badRequest('Replacement uploads must total less than 4 MB.');
          if(!['image/png','image/jpeg','image/webp','image/avif','image/gif'].includes(image.type))throw apiErrors.badRequest('Use a PNG, JPG, WebP, AVIF or GIF image.');
          const bytes=new Uint8Array(await image.arrayBuffer());verifyAsset(bytes,image.type);
          const ext=({ 'image/png':'png','image/jpeg':'jpg','image/webp':'webp','image/avif':'avif','image/gif':'gif' })[image.type]!;
          const original=document.assets.find(a=>a.storageKey===change.storageKey);
          if(!original)throw apiErrors.badRequest('This asset no longer exists in the current draft.');
          const saved=await write(bytes,`replacement.${ext}`,image.type);
          edit.replacement={...saved,path:original.path,type:image.type,size:image.size};
        }
        edits.push(edit);
      }
      document=editAssets(document,edits);
      const saved=await (kind==='portfolio'?savePortfolioImport:saveImport)(id,document,actor.sub,String(form.get('baseRevisionId')||''));
      return NextResponse.json({...saved,warnings:document.warnings},{status:201});
    }catch(error){
      // Failed imports never replace the live version. Clean up assets uploaded by this attempt.
      await Promise.allSettled(staged.map(async item=>{if(item.provider==='vercel-blob'){const {del}=await import('@vercel/blob');await del(item.key);}else{const {deleteFromR2}=await import('@/lib/storage/r2');await deleteFromR2(item.key);}}));
      throw error;
    }
  }catch(error){
    if(error instanceof Prisma.PrismaClientKnownRequestError && ['P2021','P2022'].includes(error.code)) return NextResponse.json({error:`Database setup is required. Run database/${kind==='portfolio'?'portfolio-html-import':'solution-html-import'}.sql in Supabase first.`},{status:503});
    if(error instanceof Prisma.PrismaClientKnownRequestError && error.code==='P2034') return NextResponse.json({error:'Another administrator saved this page. Reload before saving again.'},{status:409});
    if(error instanceof Error && !(typeof error==='object'&&'statusCode' in error))return NextResponse.json({error:error.message.includes('Unique constraint')?'That URL is already used. Choose another slug.':error.message},{status:400});
    return handleApiError(error);
  }
}
