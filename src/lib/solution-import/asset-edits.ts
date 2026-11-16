import { parseDocument } from 'htmlparser2';
import { findAll } from 'domutils';
import { isTag } from 'domhandler';
import render from 'dom-serializer';
import type { ImportedAsset,ImportedDocument } from './types';
export type AssetEdit={storageKey:string;replacement?:ImportedAsset;alt?:string};
/** Copy-on-write: previous revisions keep their own URLs and original assets. */
export function editAssets(document:ImportedDocument,edits:AssetEdit[]):ImportedDocument {
 const next=structuredClone(document);
 for(const edit of edits){
  const index=next.assets.findIndex(a=>a.storageKey===edit.storageKey);
  if(index<0)throw new Error('The image changed in another revision. Reload and try again.');
  const old=next.assets[index];if(!old.type.startsWith('image/'))throw new Error('Only image assets can be edited here.');
  const dom=parseDocument(next.html);
  for(const el of findAll(isTag,dom.children)){
   if(!isTag(el))continue;
   if(el.name==='img' && el.attribs.src===old.url && edit.alt!==undefined)el.attribs.alt=edit.alt;
   if(edit.replacement){for(const key of ['src','poster','srcset','style'])if(el.attribs[key])el.attribs[key]=el.attribs[key].split(old.url).join(edit.replacement.url);}
  }
  if(edit.alt!==undefined)next.assets[index]={...next.assets[index],altText:edit.alt};
  next.html=render(dom);
  if(edit.replacement){next.css=next.css.split(old.url).join(edit.replacement.url);next.scripts=next.scripts.map(s=>s.split(old.url).join(edit.replacement!.url));next.assets[index]={...edit.replacement,path:old.path,altText:edit.alt??old.altText};}
 }
 return next;
}

/** Populate asset captions on older revisions without rewriting stored history. */
export function describeAssets(document:ImportedDocument):ImportedDocument {
 const dom=parseDocument(document.html);const alts=new Map<string,string>();
 for(const el of findAll(isTag,dom.children))if(isTag(el)&&el.name==='img'&&!alts.has(el.attribs.src))alts.set(el.attribs.src,el.attribs.alt||'');
 return {...document,assets:document.assets.map(a=>({...a,altText:a.altText??alts.get(a.url)??''}))};
}
