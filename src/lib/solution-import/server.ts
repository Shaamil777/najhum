import { describeAssets } from './asset-edits';
import { cleanUnusedImportAssets } from './storage-cleanup';
import { Prisma } from '@prisma/client';
import { prisma } from '@/lib/db/prisma';
import { apiErrors } from '@/lib/utils/api-error';
import type { ImportedDocument } from './types';

export async function saveImport(id:string|undefined,document:ImportedDocument,actor:string,baseRevisionId?:string) {
  document={...document,metadata:{...document.metadata,productIds:[]}};
  const result=await prisma.$transaction(async tx=>{
    let solution=id?await tx.solution.findUnique({where:{id}}):null;
    if(id&&!solution)throw apiErrors.notFound();
    if(!solution)solution=await tx.solution.create({data:{title:document.metadata.title,slug:document.metadata.slug,contentMode:'HTML',isDraft:true}});
    const latest=await tx.solutionRevision.findFirst({where:{solutionId:solution.id},orderBy:{number:'desc'}});
    if((latest?.id||'')!==(baseRevisionId||''))throw apiErrors.conflict('Another administrator saved a newer draft. Reload before saving.');
    const obsolete=await tx.solutionRevision.findMany({where:{solutionId:solution.id,id:{notIn:solution.publishedRevisionId?[solution.publishedRevisionId]:[]}}});
    const revision=await tx.solutionRevision.create({data:{solutionId:solution.id,number:(latest?.number||0)+1,document:document as unknown as Prisma.InputJsonValue,createdBy:actor}});
    await tx.solutionRevision.deleteMany({where:{id:{in:obsolete.map(row=>row.id)}}});
    await tx.solution.update({where:{id:solution.id},data:{updatedAt:new Date()}});
    return {id:solution.id,revisionId:revision.id,number:revision.number,obsolete:obsolete.map(row=>row.document as unknown as ImportedDocument)};
  },{isolationLevel:Prisma.TransactionIsolationLevel.Serializable});
  await cleanUnusedImportAssets(result.obsolete).catch(error=>console.error('Unused solution media cleanup failed',error));
  return {id:result.id,revisionId:result.revisionId,number:result.number};
}
export async function publishImport(id:string,revisionId:string) {
  const result=await prisma.$transaction(async tx=>{
    const solution=await tx.solution.findUniqueOrThrow({where:{id}});
    const revision=await tx.solutionRevision.findFirst({where:{id:revisionId,solutionId:id}});
    if(!revision)throw apiErrors.notFound('Revision not found.');
    const document=revision.document as unknown as ImportedDocument,m=document.metadata;
    const latest=await tx.solutionRevision.findFirst({where:{solutionId:id},orderBy:{number:'desc'}});
    if(latest?.id!==revision.id)throw apiErrors.conflict('The draft changed. Reload and preview the latest draft.');
    const obsolete=await tx.solutionRevision.findMany({where:{solutionId:id,id:{not:revision.id}}});
    await tx.solution.update({where:{id},data:{title:m.title,slug:m.slug,seoTitle:m.seoTitle,metaDescription:m.metaDescription,menuDescription:m.menuDescription,menuIcon:m.menuIcon,coverImage:m.coverImage||null,socialImage:m.socialImage||null,socialImageAlt:m.socialImageAlt,classification:m.classification,platforms:m.platforms,contentMode:'HTML',publishedRevisionId:revision.id,isDraft:false}});
    await tx.solutionRevision.deleteMany({where:{solutionId:id,id:{not:revision.id}}});
    return {slug:m.slug,oldSlug:solution.slug,obsolete:obsolete.map(row=>row.document as unknown as ImportedDocument)};
  },{isolationLevel:Prisma.TransactionIsolationLevel.Serializable});
  await cleanUnusedImportAssets(result.obsolete).catch(error=>console.error('Unused solution media cleanup failed',error));
  return {slug:result.slug,oldSlug:result.oldSlug};
}
export async function getImportSession(id:string) {
  const solution=await prisma.solution.findUnique({where:{id},include:{revisions:{orderBy:{number:'desc'},take:1,select:{id:true,number:true,createdAt:true}}}});
  if(!solution)return null;
  const latest=solution.revisions[0];
  const revision=latest?await prisma.solutionRevision.findUnique({where:{id:latest.id}}):null;
  return {id:solution.id,publishedSlug:solution.slug,isDraft:solution.isDraft,publishedRevisionId:solution.publishedRevisionId,baseRevisionId:latest?.id||'',document:revision?describeAssets(revision.document as unknown as ImportedDocument):null,revisions:solution.revisions.map(r=>({...r,createdAt:r.createdAt.toISOString()}))};
}
