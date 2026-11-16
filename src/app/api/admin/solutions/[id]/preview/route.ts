import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { requireAdmin } from '@/lib/auth/require-admin';
import { apiErrors, handleApiError } from '@/lib/utils/api-error';
import { previewDocument } from '@/lib/solution-import/preview';
import type { ImportedDocument } from '@/lib/solution-import/types';

export const dynamic = 'force-dynamic';
const json = (value: unknown) => JSON.stringify(value).replaceAll('<', '\\u003c');

/** Authenticated full-page preview. Uploaded code stays in an opaque sandbox. */
export async function GET(request: NextRequest, {params}: {params: Promise<{id: string}>}) {
 try {
  await requireAdmin(request);
  const {id} = await params;
  const revisionId = request.nextUrl.searchParams.get('revisionId');
  const run = request.nextUrl.searchParams.get('run') || crypto.randomUUID();
  const revision = await prisma.solutionRevision.findFirst({where: {solutionId: id}, orderBy: {number: 'desc'}});
  if (revisionId && revision?.id !== revisionId) throw apiErrors.notFound('This draft was replaced. Open the latest preview from the editor.');
  if (!revision) throw apiErrors.notFound();
  const page = revision.document as unknown as ImportedDocument;
  const source = previewDocument(page, run);
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>Solution draft preview</title><style>html,body{margin:0;height:100%;overflow:hidden}iframe{display:block;width:100%;height:100%;border:0}</style></head><body><iframe title="Solution draft preview" sandbox="allow-scripts"></iframe><script>
  const frame=document.querySelector('iframe');
  let source=${json(source)};
  try {
   if(window.opener && window.opener.location.origin===location.origin){
    const escape=value=>value.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;');
    const links=Array.from(window.opener.document.querySelectorAll('link[rel="stylesheet"]')).map(link=>'<link rel="stylesheet" href="'+escape(link.href)+'">').join('');
    const computed=window.opener.getComputedStyle(window.opener.document.body);
    const variables=['--font-sans-base','--font-display-base','--font-poppins-base'].map(key=>key+':'+computed.getPropertyValue(key)).join(';');
    source=source.replace('</head>',links+'<style>body{'+variables+'}</style></head>');
   }
  } catch {}
  window.addEventListener('message',event=>{
   if(event.source!==frame.contentWindow || event.data?.type!=='solution-preview' || event.data.run!==${json(run)})return;
   if(window.opener)window.opener.postMessage(event.data,location.origin);
  });
  frame.srcdoc=source;
  </script></body></html>`;
  return new NextResponse(html, {headers: {'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex, nofollow'}});
 } catch (error) { return handleApiError(error); }
}
