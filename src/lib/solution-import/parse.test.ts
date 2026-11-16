import {expect,it,vi} from 'vitest';
import {zipSync,strToU8} from 'fflate';
import {readFile} from 'node:fs/promises';
import {importPackage,unpack,scopeCss} from './parse';
import {metadataSchema} from './types';
const meta=metadataSchema.parse({title:'Cold Storage',slug:'cold-storage',seoTitle:'Cold Storage | Najhum'});
const writer=vi.fn(async(_bytes:Uint8Array,name:string)=>({url:`https://media.example.test/${name}`,storageKey:name}));
const file=(source:string)=>new File([source],'page.html',{type:'text/html'});
it('preserves classic animation scripts, removes Google font links and scopes CSS',async()=>{
 const result=await importPackage([file('<html><head><link href="https://fonts.googleapis.com/css2?family=Inter" rel="stylesheet"><style>body{margin:0}.hero:is(.a,.b){color:red}@keyframes float{to{opacity:1}}.hero{animation:float 1s}</style></head><body><h1>Cold Storage</h1><script>window.addEventListener("scroll",function(){})</script></body></html>')],meta,writer);
 expect(result.scripts[0]).toContain('addEventListener');expect(result.html).not.toContain('<script');expect(result.html).not.toContain('fonts.googleapis');expect(result.css).toContain('.hero:is(.a,.b)');expect(result.css).toMatch(/@keyframes import-\w+-float/);expect(result.css).toContain('--font-display-base');
});
it('rejects traversal before decompressing a ZIP',()=>{expect(()=>unpack(zipSync({'../page.html':strToU8('<h1>bad</h1>')}))).toThrow('Unsafe');});
it('rejects oversized expansion',()=>{expect(()=>unpack(zipSync({'page.html':new Uint8Array(21*1024*1024)}))).toThrow('size');});
it('maps local asset references and deduplicates embedded PNGs',async()=>{
 const png=Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jfusAAAAASUVORK5CYII=','base64');
 writer.mockClear();const html='<h1>Test</h1><img src="assets/a.png" alt="A"><img src="assets/a.png" alt="A">';
 const zip=new File([zipSync({'page.html':strToU8(html),'assets/a.png':png})],'package.zip');
 const result=await importPackage([zip],meta,writer);expect(writer).toHaveBeenCalledOnce();expect(result.html).toContain('https://media.example.test/assets/a.png');expect(result.assets).toHaveLength(1);
});
it('rejects unresolved assets instead of publishing broken images',async()=>{await expect(importPackage([file('<h1>X</h1><img src="missing.webp">')],meta,writer)).rejects.toThrow('Missing');});
it.each(['<script src="https://cdn.example/a.js"></script>','<iframe src="https://example.test"></iframe>','<button onclick="run()">X</button>'])('rejects unsupported executable dependencies',async html=>{await expect(importPackage([file(html)],meta,writer)).rejects.toThrow();});
it('imports bundled CSS and JavaScript in document order',async()=>{
 const zip=new File([zipSync({'page.html':strToU8('<h1>X</h1><link rel="stylesheet" href="style.css"><script src="main.js"></script>'),'style.css':strToU8('h1{color:red}'),'main.js':strToU8('window.test=1;')})],'page.zip');
 const result=await importPackage([zip],meta,writer);expect(result.scripts).toEqual(['window.test=1;']);expect(result.css).toContain('color:red');
});
it('does not split commas inside functional selectors',()=>{expect(scopeCss('.hero:is(.a,.b){color:red}', '.scope')).toBe('.scope .hero:is(.a,.b){color:red}');});
it('imports the supplied Cold Storage sample with its original animation and eight deduplicated assets',async()=>{
 const path='/Users/nash/Downloads/najhum-cold-storage-page/cold-storage.html';
 let source:string;try{source=await readFile(path,'utf8');}catch{return;}
 const result=await importPackage([file(source)],meta,writer);
 expect(result.scripts).toHaveLength(1);expect(result.scripts[0]).toContain('function drawAt(t)');expect(result.assets).toHaveLength(8);expect(result.html).not.toContain('data:image');expect(result.html).toContain('njcs-event');
});

it('rejects JavaScript syntax errors before a draft can be saved',async()=>{await expect(importPackage([file('<h1>Test</h1><script>function ( {</script>')],meta,writer)).rejects.toThrow('syntax error');});
