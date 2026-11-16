import { NextRequest,NextResponse } from 'next/server';
import { requireAdmin,requireSameOrigin } from '@/lib/auth/require-admin';
import { publishImport } from '@/lib/solution-import/server';
import { revalidateSolutions } from '@/lib/utils/revalidate-solutions';
import { handleApiError,apiErrors } from '@/lib/utils/api-error';
export async function POST(req:NextRequest,{params}:{params:Promise<{id:string}>}){
 try{await requireAdmin(req);requireSameOrigin(req);const body=await req.json().catch(()=>({}));if(typeof body.revisionId!=='string')throw apiErrors.badRequest('Open the HTML editor, preview a saved revision and publish it there.');const result=await publishImport((await params).id,body.revisionId);revalidateSolutions(result.slug);revalidateSolutions(result.oldSlug);return NextResponse.json(result);}catch(e){return handleApiError(e);}
}
