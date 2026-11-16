import {NextRequest,NextResponse} from 'next/server';
import {requireAdmin} from '@/lib/auth/require-admin';
import {handleApiError} from '@/lib/utils/api-error';
export async function POST(req:NextRequest){try{await requireAdmin(req);return NextResponse.json({error:'Create projects through the HTML/ZIP import editor.'},{status:410});}catch(error){return handleApiError(error);}}
