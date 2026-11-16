import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin, requireSameOrigin } from '@/lib/auth/require-admin';
import { prisma } from '@/lib/db/prisma';
import { refreshPortfolio } from '@/lib/portfolio/server';
import { handleApiError,apiErrors } from '@/lib/utils/api-error';
type Context={params:Promise<{id:string}>};
export async function PUT(request:NextRequest){try{await requireAdmin(request);return NextResponse.json({error:'Save projects through the HTML/ZIP import editor.'},{status:410});}catch(error){return handleApiError(error);}}
export async function DELETE(request:NextRequest,{params}:Context) {try{await requireAdmin(request);requireSameOrigin(request);const project=await prisma.portfolioProject.delete({where:{id:(await params).id}});refreshPortfolio(project.slug);return new NextResponse(null,{status:204});}catch(error){return handleApiError(error);} }
export async function PATCH(request:NextRequest,{params}:Context){
 try{
  await requireAdmin(request);requireSameOrigin(request);
  const {isDraft}=await request.json();
  if(typeof isDraft!=='boolean')return NextResponse.json({error:'Choose whether to hide this project.'},{status:400});
  const {id}=await params;
  const project=await prisma.$transaction(async tx=>{
   const existing=await tx.portfolioProject.findUniqueOrThrow({where:{id}});
   if(!isDraft){const live=existing.publishedRevisionId?await tx.portfolioRevision.findFirst({where:{id:existing.publishedRevisionId,projectId:id}}):null;if(!live)throw apiErrors.badRequest('Publish the draft in the HTML editor first.');}
   return tx.portfolioProject.update({where:{id},data:{isDraft,publishedAt:isDraft?existing.publishedAt:existing.publishedAt??new Date()}});
  });
  refreshPortfolio(project.slug);
  return NextResponse.json({project});
 }catch(error){return handleApiError(error);}
}
