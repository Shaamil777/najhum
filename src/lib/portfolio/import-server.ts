import { describeAssets } from '@/lib/solution-import/asset-edits';
import { cleanUnusedImportAssets } from '@/lib/solution-import/storage-cleanup';
import { Prisma } from '@prisma/client';
import { prisma } from '@/lib/db/prisma';
import { apiErrors } from '@/lib/utils/api-error';
import {metadataSchema,type ImportedDocument} from '@/lib/solution-import/types';

export async function savePortfolioImport(id:string|undefined,document:ImportedDocument,actor:string,baseRevisionId?:string) {
  document={...document,metadata:{...document.metadata,productIds:[]}};
  const result=await prisma.$transaction(async tx=>{
    let solution=id?await tx.portfolioProject.findUnique({where:{id}}):null;
    if(id&&!solution)throw apiErrors.notFound();
    if(!solution)solution=await tx.portfolioProject.create({data:{title:document.metadata.title,slug:document.metadata.slug,contentMode:'HTML',isDraft:true}});
    const latest=await tx.portfolioRevision.findFirst({where:{projectId:solution.id},orderBy:{number:'desc'}});
    if((latest?.id||'')!==(baseRevisionId||''))throw apiErrors.conflict('Another administrator saved a newer draft. Reload before saving.');
    const obsolete=await tx.portfolioRevision.findMany({where:{projectId:solution.id,id:{notIn:solution.publishedRevisionId?[solution.publishedRevisionId]:[]}}});
    const revision=await tx.portfolioRevision.create({data:{projectId:solution.id,number:(latest?.number||0)+1,document:document as unknown as Prisma.InputJsonValue,createdBy:actor}});
    await tx.portfolioRevision.deleteMany({where:{id:{in:obsolete.map(row=>row.id)}}});
    await tx.portfolioProject.update({where:{id:solution.id},data:{updatedAt:new Date()}});
    return {id:solution.id,revisionId:revision.id,number:revision.number,obsolete:obsolete.map(row=>row.document as unknown as ImportedDocument)};
  },{isolationLevel:Prisma.TransactionIsolationLevel.Serializable});
  await cleanUnusedImportAssets(result.obsolete).catch(error=>console.error('Unused solution media cleanup failed',error));
  return {id:result.id,revisionId:result.revisionId,number:result.number};
}
export async function publishPortfolioImport(id:string,revisionId:string) {
  const result=await prisma.$transaction(async tx=>{
    const solution=await tx.portfolioProject.findUniqueOrThrow({where:{id}});
    const revision=await tx.portfolioRevision.findFirst({where:{id:revisionId,projectId:id}});
    if(!revision)throw apiErrors.notFound('Revision not found.');
    const document=revision.document as unknown as ImportedDocument,m=document.metadata;
    const latest=await tx.portfolioRevision.findFirst({where:{projectId:id},orderBy:{number:'desc'}});
    if(latest?.id!==revision.id)throw apiErrors.conflict('The draft changed. Reload and preview the latest draft.');
    const obsolete=await tx.portfolioRevision.findMany({where:{projectId:id,id:{not:revision.id}}});
    await tx.portfolioProject.update({where:{id},data:{title:m.title,slug:m.slug,seoTitle:m.seoTitle,seoDescription:m.metaDescription,summary:m.menuDescription,coverImage:m.coverImage||'',ogImage:m.socialImage||'',coverAlt:m.socialImageAlt,clientName:m.clientName||'',industry:m.industry||'',location:m.location||'',year:m.year||'',platforms:m.platforms,publishedAt:new Date(),contentMode:'HTML',publishedRevisionId:revision.id,isDraft:false}});
    await tx.portfolioRevision.deleteMany({where:{projectId:id,id:{not:revision.id}}});
    return {slug:m.slug,oldSlug:solution.slug,obsolete:obsolete.map(row=>row.document as unknown as ImportedDocument)};
  },{isolationLevel:Prisma.TransactionIsolationLevel.Serializable});
  await cleanUnusedImportAssets(result.obsolete).catch(error=>console.error('Unused solution media cleanup failed',error));
  return {slug:result.slug,oldSlug:result.oldSlug};
}
export async function getPortfolioImportSession(id:string) {
  const solution=await prisma.portfolioProject.findUnique({where:{id},include:{revisions:{orderBy:{number:'desc'},take:1,select:{id:true,number:true,createdAt:true}}}});
  if(!solution)return null;
  const latest=solution.revisions[0];
  const revision=latest?await prisma.portfolioRevision.findUnique({where:{id:latest.id}}):null;
  return {metadata:metadataSchema.parse({title:solution.title,slug:solution.slug,seoTitle:solution.seoTitle||solution.title,metaDescription:solution.seoDescription,menuDescription:solution.summary.slice(0,180),coverImage:solution.coverImage,socialImage:solution.ogImage,socialImageAlt:solution.coverAlt,platforms:solution.platforms,clientName:solution.clientName.slice(0,200),industry:solution.industry,location:solution.location.slice(0,200),year:solution.year}),id:solution.id,publishedSlug:solution.slug,isDraft:solution.isDraft,publishedRevisionId:solution.publishedRevisionId,baseRevisionId:latest?.id||'',document:revision?describeAssets(revision.document as unknown as ImportedDocument):null,revisions:solution.revisions.map(r=>({...r,createdAt:r.createdAt.toISOString()}))};
}
