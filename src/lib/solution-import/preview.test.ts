// @vitest-environment jsdom
import {JSDOM,VirtualConsole} from 'jsdom';
import {expect,it} from 'vitest';
import {previewDocument} from './preview';
import {metadataSchema,type ImportedDocument} from './types';
const page:ImportedDocument={schemaVersion:1,html:'<h1>Cold Storage</h1>',css:'h1{color:blue}',scripts:['window.animationStarted=true;'],metadata:metadataSchema.parse({title:'Cold Storage',slug:'cold-storage',seoTitle:'Cold SEO'}),assets:[],warnings:[],sourceName:'page.html',checksum:'test'};
it('reports ready after original scripts execute and the frame loads',async()=>{
 const messages:unknown[]=[];const html=previewDocument(page,'run-1');
 const dom=new JSDOM(html,{runScripts:'dangerously',pretendToBeVisual:true,beforeParse(window){window.postMessage=(message:unknown)=>{messages.push(message);};}});
 await new Promise(resolve=>setTimeout(resolve,60));expect((dom.window as unknown as {animationStarted:boolean}).animationStarted).toBe(true);expect(messages).toContainEqual({type:'solution-preview',run:'run-1',error:null});dom.window.close();
});
it('reports a script error instead of announcing a successful preview',async()=>{
 const messages:unknown[]=[];const dom=new JSDOM(previewDocument({...page,scripts:['throw new Error("Animation failed")']},'run-2'),{runScripts:'dangerously',pretendToBeVisual:true,virtualConsole:new VirtualConsole(),beforeParse(window){window.postMessage=(message:unknown)=>{messages.push(message);};}});
 await new Promise(resolve=>setTimeout(resolve,60));expect(messages.some(m=>(m as {error:string}).error?.includes('Animation failed'))).toBe(true);expect(messages).not.toContainEqual({type:'solution-preview',run:'run-2',error:null});dom.window.close();
});
it('makes repeat previews distinct and safely escapes document metadata',()=>{expect(previewDocument(page,'one')).not.toBe(previewDocument(page,'two'));expect(previewDocument({...page,metadata:{...page.metadata,title:'</title><script>alert(1)</script>'}},'safe')).toContain('&lt;/title>');});
