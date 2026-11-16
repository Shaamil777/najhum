import { prisma } from '@/lib/db/prisma';
import { NextRequest,NextResponse } from 'next/server';
import { requireAdmin,requireSameOrigin } from '@/lib/auth/require-admin';
import { getImportSession,publishImport } from '@/lib/solution-import/server';
import { handleApiError,apiErrors } from '@/lib/utils/api-error';
import { revalidateSolutions } from '@/lib/utils/revalidate-solutions';
export async function GET(req:NextRequest,{params}:{params:Promise<{id:string}>}){
 try{await requireAdmin(req);const session=await getImportSession((await params).id);if(!session)throw apiErrors.notFound();const selected=req.nextUrl.searchParams.get('revisionId');if(selected){if(selected!==session.baseRevisionId)throw apiErrors.notFound('Draft not found.');const revision=await prisma.solutionRevision.findFirst({where:{id:selected,solutionId:session.id}});if(!revision)throw apiErrors.notFound();return NextResponse.json({document:revision.document});}return NextResponse.json(session);}catch(e){return handleApiError(e);}
}
export async function POST(req:NextRequest,{params}:{params:Promise<{id:string}>}){
 try{await requireAdmin(req);requireSameOrigin(req);const body=await req.json();if(typeof body.revisionId!=='string')throw apiErrors.badRequest('Select a saved revision.');const result=await publishImport((await params).id,body.revisionId);revalidateSolutions(result.slug);revalidateSolutions(result.oldSlug);return NextResponse.json(result);}catch(e){return handleApiError(e);}
}
