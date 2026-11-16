import type { ImportedDocument } from './types';

const escapeHtml=(value:string)=>value.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;');
const script=(source:string)=>`<script>${source.replace(/<\/script/gi,'<\\/script')}</script>`;
/** A new run ID forces a fresh iframe and prevents stale ready/error events. */
export function previewDocument(page:ImportedDocument,run:string,stylesheets:string[]=[],fontVariables='') {
 const report=script(`(function(){var failed=false;var send=function(error){parent.postMessage({type:'solution-preview',run:${JSON.stringify(run)},error:error||null},'*');};window.addEventListener('error',function(e){if(e.message){failed=true;send(String(e.message));}});window.addEventListener('unhandledrejection',function(e){failed=true;send(String(e.reason&&e.reason.message||e.reason));});window.addEventListener('load',function(){requestAnimationFrame(function(){if(!failed)send();});},{once:true});})();`);
 return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(page.metadata.title)} — draft preview</title>${stylesheets.map(url=>`<link rel="stylesheet" href="${escapeHtml(url)}">`).join('')}<style>body{margin:0;${fontVariables};--solution-header-height:0px}${page.css.replace(/<\/style/gi,'<\\/style')}</style></head><body>${report}${page.html}${page.scripts.map(script).join('')}</body></html>`;
}
