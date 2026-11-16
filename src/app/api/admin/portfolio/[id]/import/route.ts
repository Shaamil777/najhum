import { NextRequest } from 'next/server';
import { importHandler } from '@/lib/solution-import/handler';
export const runtime='nodejs';
export const maxDuration=60;
export async function POST(req:NextRequest,{params}:{params:Promise<{id:string}>}){return importHandler(req,(await params).id,'portfolio');}
