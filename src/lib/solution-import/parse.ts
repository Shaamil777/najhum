import { createHash } from 'node:crypto';
import path from 'node:path/posix';
import { parse as parseJavaScript } from 'acorn';
import { unzipSync } from 'fflate';
import { parseDocument } from 'htmlparser2';
import { findAll, getText, removeElement } from 'domutils';
import { Element, isTag } from 'domhandler';
import render from 'dom-serializer';
import postcss from 'postcss';
import selectorParser from 'postcss-selector-parser';
import { MAX_UPLOAD, MAX_EXPANDED, type ImportedAsset, type ImportedDocument, type ImportMetadata } from './types';

export type AssetWriter = (bytes: Uint8Array, name: string, type: string) => Promise<{url:string;storageKey:string}>;
const types: Record<string,string> = { webp:'image/webp',png:'image/png',jpg:'image/jpeg',jpeg:'image/jpeg',gif:'image/gif',avif:'image/avif',svg:'image/svg+xml',mp4:'video/mp4',woff2:'font/woff2',css:'text/css',js:'text/javascript' };
const MAX_FILES = 150;
function safePath(name:string) {
  if (name.includes('\\') || name.startsWith('/') || /^[a-z]:/i.test(name) || name.split('/').includes('..') || name.includes('\0')) throw new Error('Unsafe archive path.');
  return path.normalize(name).replace(/^\.\//,'');
}
export function unpack(bytes:Uint8Array) {
  let expanded=0,count=0;
  const files=unzipSync(bytes,{filter(file){
    safePath(file.name); count++;
    if(count>MAX_FILES || (expanded+=file.originalSize)>MAX_EXPANDED || file.originalSize>MAX_UPLOAD) throw new Error('ZIP exceeds the file count or expanded size limit.');
    return !file.name.endsWith('/') && !file.name.includes('__MACOSX') && !path.basename(file.name).startsWith('.');
  }});
  return new Map(Object.entries(files).map(([name,data])=>[safePath(name),data]));
}
function cleanSvg(bytes:Uint8Array) {
  const source=new TextDecoder().decode(bytes);
  if (!/<svg[\s>]/i.test(source) || /<(script|foreignObject|iframe|image|use|style)\b|\bon\w+\s*=|(?:href|src)\s*=|url\s*\(|<!DOCTYPE|<!ENTITY/i.test(source)) throw new Error('SVG must contain drawing elements only (no scripts, external references or embedded HTML).');
  return bytes;
}
export function verifyAsset(bytes:Uint8Array,type:string) {
  if(type==='image/svg+xml') return cleanSvg(bytes);
  const b=Buffer.from(bytes);
  const valid=type==='image/png'?b.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10])):
    type==='image/jpeg'?b[0]===255&&b[1]===216:
    type==='image/webp'?b.toString('ascii',0,4)==='RIFF'&&b.toString('ascii',8,12)==='WEBP':
    type==='image/gif'?b.toString('ascii',0,3)==='GIF':
    type==='image/avif'?b.toString('ascii',4,8)==='ftyp'&&b.subarray(8,32).includes(Buffer.from('avif')):
    type==='video/mp4'?b.toString('ascii',4,8)==='ftyp':type==='font/woff2'?b.toString('ascii',0,4)==='wOF2':false;
  if(!valid) throw new Error('An asset does not match its declared file format.');
  return bytes;
}
export function scopeCss(css:string, scope:string) {
  const tree=postcss.parse(css); const names=new Map<string,string>();
  tree.walkAtRules(rule=>{if(/import|namespace|charset/i.test(rule.name)) rule.remove(); else if(/keyframes$/i.test(rule.name)){names.set(rule.params,`${scope.slice(1)}-${rule.params}`);rule.params=names.get(rule.params)!;}});
  tree.walkRules(rule=>{
    if(rule.parent?.type==='atrule' && /keyframes$/i.test(rule.parent.name))return;
    rule.selector=selectorParser(selectors=>{selectors.each(selector=>{
      selector.walkPseudos(p=>{if(p.value===':root')p.replaceWith(selectorParser.className({value:scope.slice(1)}));});
      selector.walkTags(t=>{if(['html','body'].includes(t.value))t.replaceWith(selectorParser.className({value:scope.slice(1)}));});
      if(!selector.toString().trim().startsWith(scope)){
        selector.prepend(selectorParser.combinator({value:' '}));
        selector.prepend(selectorParser.className({value:scope.slice(1)}));
      }
    });}).processSync(rule.selector);
  });
  tree.walkDecls(decl=>{if(/^animation(?:-name)?$/.test(decl.prop))for(const [from,to] of names)decl.value=decl.value.replace(new RegExp(`\\b${from.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')}\\b`,'g'),to);});
  return tree.toString();
}
export async function importPackage(files:File[],metadata:ImportMetadata,write:AssetWriter):Promise<ImportedDocument> {
  if(!files.length)throw new Error('Upload an HTML file or ZIP package.');
  if(files.reduce((n,f)=>n+f.size,0)>MAX_UPLOAD)throw new Error('Upload must be under 4 MB.');
  let entries:Map<string,Uint8Array>;
  if(files.some(f=>/\.zip$/i.test(f.name))){if(files.length!==1)throw new Error('Upload one ZIP, or HTML with assets—not both.');entries=unpack(new Uint8Array(await files[0].arrayBuffer()));}
  else {entries=new Map();for(const file of files){const name=safePath(file.name);if(entries.has(name))throw new Error(`Duplicate filename: ${name}`);entries.set(name,new Uint8Array(await file.arrayBuffer()));}}
  if(entries.size>MAX_FILES)throw new Error('Maximum 150 files.');
  const htmlNames=[...entries.keys()].filter(n=>/\.html?$/i.test(n));
  if(htmlNames.length!==1)throw new Error('Package must contain exactly one responsive HTML file.');
  const htmlName=htmlNames[0], source=new TextDecoder().decode(entries.get(htmlName));
  if(source.length>2*1024*1024)throw new Error('HTML must be under 2 MB.');
  const hash=createHash('sha256').update(source).digest('hex'); const scope=`.import-${hash.slice(0,12)}`;
  const doc=parseDocument(source);const elements=findAll(isTag,doc.children) as Element[];
  if(elements.some(e=>e.name==='iframe'||e.name==='base'||e.name==='object'||e.name==='embed'))throw new Error('Embedded frames, objects and base tags are not supported.');
  const warnings:string[]=[],assets:ImportedAsset[]=[],scripts:string[]=[],styles:string[]=[];
  const cache=new Map<string,Promise<string>>();
  function locate(ref:string,base=htmlName){
    const relative=safePath(path.join(path.dirname(base),decodeURIComponent(ref.split(/[?#]/)[0])));
    if(entries.has(relative))return relative;
    const name=path.basename(relative),matches=[...entries.keys()].filter(p=>path.basename(p)===name);
    if(matches.length===1)return matches[0];
    throw new Error(`Missing or ambiguous asset: ${ref}. Upload it with its original filename.`);
  }
  const assetUrl=(ref:string,base=htmlName):Promise<string>=>{
    if(ref.startsWith('#')||/^\//.test(ref)&&!ref.startsWith('//'))return Promise.resolve(ref);
    if(/^https:\/\//i.test(ref))return Promise.resolve(ref);
    if(/^(?:javascript|vbscript|http):|^\/\//i.test(ref))throw new Error(`Unsupported asset URL: ${ref.slice(0,80)}`);
    let bytes:Uint8Array,name:string,type:string;
    if(ref.startsWith('data:')){
      const m=ref.match(/^data:(image\/(?:png|jpeg|webp|gif|avif));base64,([\s\S]+)$/);if(!m)throw new Error('Only embedded base64 raster images are supported.');
      bytes=new Uint8Array(Buffer.from(m[2],'base64'));type=m[1];name=`embedded-${createHash('sha256').update(bytes).digest('hex').slice(0,16)}.${type.split('/')[1]}`;
    }else{name=locate(ref,base);bytes=entries.get(name)!;type=types[name.split('.').pop()!.toLowerCase()];}
    if(!type||type==='text/css'||type==='text/javascript')throw new Error(`Unsupported asset: ${name}`);
    if(bytes.length>MAX_UPLOAD)throw new Error('Asset too large.');
    const key=createHash('sha256').update(bytes).digest('hex');if(cache.has(key))return cache.get(key)!;
    const upload=(async()=>{verifyAsset(bytes,type);const saved=await write(bytes,name,type);assets.push({path:name,...saved,type,size:bytes.length});return saved.url;})();cache.set(key,upload);return upload;
  };
  async function cssAssets(css:string,base=htmlName){
    const refs=[...css.matchAll(/url\(\s*(['"]?)(.*?)\1\s*\)/g)];
    for(const match of refs){const url=await assetUrl(match[2],base);css=css.replace(match[0],`url("${url}")`);}return css;
  }
  for(const el of elements){
    if(el.name==='script'){
      if(el.attribs.type==='application/ld+json'){removeElement(el);warnings.push('Structured data is managed by the website.');continue;}
      if(el.attribs.type && !['text/javascript','application/javascript'].includes(el.attribs.type))throw new Error('Only classic JavaScript scripts are supported; bundle ES modules before upload.');
      if(el.attribs.src){if(/^(?:https?:)?\/\//.test(el.attribs.src))throw new Error('Bundle external JavaScript into your ZIP instead of loading a CDN.');scripts.push(new TextDecoder().decode(entries.get(locate(el.attribs.src))));}
      else scripts.push(getText(el));
      removeElement(el);continue;
    }
    if(el.name==='style'){styles.push(await cssAssets(getText(el)));removeElement(el);continue;}
    if(el.name==='link'){
      if(el.attribs.href?.includes('fonts.googleapis.com')||el.attribs.href?.includes('fonts.gstatic.com'))warnings.push('Google Fonts links replaced by project fonts.');
      else if(el.attribs.rel==='stylesheet'){if(/^(?:https?:)?\/\//.test(el.attribs.href||''))throw new Error('Include external CSS in the ZIP.');const name=locate(el.attribs.href);styles.push(await cssAssets(new TextDecoder().decode(entries.get(name)),name));}
      removeElement(el);continue;
    }
    for(const [attr,val] of Object.entries(el.attribs)){
      if(/^on/i.test(attr))throw new Error('Move inline event handlers (onclick etc.) into a script block.');
      if(/^(?:javascript|vbscript):/i.test(val.trim()))throw new Error('Executable attribute URLs are not supported.');
      if(['src','poster'].includes(attr))el.attribs[attr]=await assetUrl(val);
      if(attr==='srcset'){
        if(val.includes('data:'))throw new Error('Use separate files for srcset images.');
        el.attribs[attr]=(await Promise.all(val.split(',').map(async entry=>{const [url,...size]=entry.trim().split(/\s+/);return [await assetUrl(url),...size].join(' ');}))).join(', ');
      }
      if(attr==='style')el.attribs[attr]=await cssAssets(val);
    }
    if(el.name==='img'){const asset=assets.find(a=>a.url===el.attribs.src);if(asset&&asset.altText===undefined)asset.altText=el.attribs.alt||'';if(!el.attribs.alt)warnings.push('An image has no descriptive alt text.');}
    if(el.name==='a'&&el.attribs.target==='_blank')el.attribs.rel='noopener noreferrer';
  }
  for(const script of scripts) { try { parseJavaScript(script,{ecmaVersion:'latest',sourceType:'script'}); } catch(error) { throw new Error(`JavaScript syntax error: ${error instanceof Error?error.message:'Invalid script'}`); } }
  const body=elements.find(e=>e.name==='body');
  const nodes=body?body.children:doc.children.filter(n=>!(isTag(n)&&['head','html'].includes(n.name)));
  if(!findAll(e=>isTag(e)&&e.name==='h1',nodes).length)warnings.push('Add an H1 heading to this page.');
  const css=scopeCss(styles.join('\n'),scope);
  // Fonts are shared with the host. The sample uses --display/--body tokens.
  const bridge=`${scope}{font-family:var(--font-sans-base),sans-serif;--top:var(--solution-header-height,80px)} ${scope} :is(h1,h2,h3,h4,h5,h6){text-transform:none} ${scope} .njcs.njcs{--display:var(--font-display-base),sans-serif;--body:var(--font-sans-base),sans-serif;--top:var(--solution-header-height,80px)}`;
  return {schemaVersion:1,html:`<div class="${scope.slice(1)}">${render(nodes)}</div>`,css:css+'\n'+bridge,scripts,metadata,assets,warnings:[...new Set(warnings)],sourceName:htmlName,checksum:hash};
}
