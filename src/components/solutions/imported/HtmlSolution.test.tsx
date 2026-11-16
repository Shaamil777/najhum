// @vitest-environment jsdom
import React,{act} from 'react';
import {createRoot} from 'react-dom/client';
import {afterEach,expect,it,vi} from 'vitest';
import HtmlSolution from './HtmlSolution';
import {metadataSchema,type ImportedDocument} from '@/lib/solution-import/types';
const doc:ImportedDocument={schemaVersion:1,html:'<div id="import-root"><h1>Cold Storage</h1></div>',css:'',metadata:metadataSchema.parse({title:'Cold',slug:'cold',seoTitle:'Cold'}),assets:[],warnings:[],sourceName:'page.html',checksum:'sample',scripts:[`var el=document.querySelector('#import-root');window.addEventListener('scroll',function(){el.dataset.scrolled='yes'});setInterval(function(){el.dataset.tick='yes'},100);new IntersectionObserver(function(){}).observe(el);`]};
afterEach(()=>{vi.unstubAllGlobals();vi.useRealTimers();});
it('starts original browser scripts and cleans resources on navigation',async()=>{
 vi.stubGlobal('IS_REACT_ACT_ENVIRONMENT',true);vi.useFakeTimers();const disconnect=vi.fn();vi.stubGlobal('IntersectionObserver',class{observe(){}disconnect=disconnect;});vi.stubGlobal('ResizeObserver',class{});
 const container=document.createElement('div');document.body.append(container);const root=createRoot(container);
 await act(async()=>root.render(<HtmlSolution document={doc}/>));const el=container.querySelector('#import-root') as HTMLElement;
 window.dispatchEvent(new Event('scroll'));expect(el.dataset.scrolled).toBe('yes');await act(async()=>vi.advanceTimersByTime(100));expect(el.dataset.tick).toBe('yes');el.dataset.scrolled='no';el.dataset.tick='no';
 await act(async()=>root.unmount());window.dispatchEvent(new Event('scroll'));vi.advanceTimersByTime(500);expect(el.dataset.scrolled).toBe('no');expect(el.dataset.tick).toBe('no');expect(disconnect).toHaveBeenCalledOnce();container.remove();
});
