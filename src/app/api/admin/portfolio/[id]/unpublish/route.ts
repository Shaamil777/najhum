import {NextRequest,NextResponse} from 'next/server';
import {requireAdmin,requireSameOrigin} from '@/lib/auth/require-admin';
import {prisma} from '@/lib/db/prisma';
import {handleApiError} from '@/lib/utils/api-error';
import {refreshPortfolio} from '@/lib/portfolio/server';
export async function POST(req:NextRequest,{params}:{params:Promise<{id:string}>}){try{await requireAdmin(req);requireSameOrigin(req);const project=await prisma.portfolioProject.update({where:{id:(await params).id},data:{isDraft:true}});refreshPortfolio(project.slug);return NextResponse.json({isDraft:true});}catch(error){return handleApiError(error);}}
