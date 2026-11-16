import {NextRequest,NextResponse} from 'next/server';
import {requireAdmin} from '@/lib/auth/require-admin';
import {handleApiError,apiErrors} from '@/lib/utils/api-error';
/** Authenticated read proxy for cropping existing R2/Blob images without canvas CORS failures. */
export async function GET(req:NextRequest){
 try{
  await requireAdmin(req);const url=new URL(req.nextUrl.searchParams.get('url')||'');
  const configured=process.env.R2_PUBLIC_URL?new URL(process.env.R2_PUBLIC_URL):null;
  const r2=configured && url.origin===configured.origin && url.pathname.startsWith(configured.pathname.replace(/\/$/,'')+'/');
  const blob=/^[a-z0-9-]+\.public\.blob\.vercel-storage\.com$/.test(url.hostname);
  if(url.protocol!=='https:' || url.username || url.password || (!r2&&!blob))throw apiErrors.badRequest('Only images from the configured media storage can be edited. Upload a replacement instead.');
  const response=await fetch(url,{redirect:'error',signal:AbortSignal.timeout(10000)});
  if(!response.ok)throw apiErrors.badRequest('Could not load the existing image. Upload a replacement.');
  const type=response.headers.get('content-type')?.split(';')[0]||'';
  if(!['image/png','image/jpeg','image/webp','image/avif','image/gif'].includes(type))throw apiErrors.badRequest('Use a raster image for cropping.');
  const reader=response.body?.getReader();if(!reader)throw apiErrors.badRequest('Image is empty.');
  const chunks:Uint8Array[]=[];let size=0;
  try{while(true){const chunk=await reader.read();if(chunk.done)break;size+=chunk.value.length;if(size>4*1024*1024)throw apiErrors.badRequest('Image must be under 4 MB.');chunks.push(chunk.value);}}finally{await reader.cancel();}
  return new NextResponse(Buffer.concat(chunks),{headers:{'Content-Type':type,'Cache-Control':'private, no-store','X-Content-Type-Options':'nosniff'}});
 }catch(error){if(error instanceof TypeError)return NextResponse.json({error:'Invalid image URL.'},{status:400});return handleApiError(error);}
}
