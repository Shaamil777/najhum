// @vitest-environment jsdom
import React,{act} from 'react';
import {createRoot,type Root} from 'react-dom/client';
import {beforeEach,afterEach,expect,it,vi} from 'vitest';
import ImportEditor,{type ImportSession} from './ImportEditor';
import {metadataSchema,type ImportedDocument} from '@/lib/solution-import/types';
vi.mock('next/navigation',()=>({useRouter:()=>({refresh:vi.fn()})}));
const page:ImportedDocument={schemaVersion:1,html:'<h1>Cold Storage</h1>',css:'',scripts:[],metadata:metadataSchema.parse({title:'Cold Storage',slug:'cold-storage',seoTitle:'Cold Storage SEO',coverImage:'https://media.test/cover.webp'}),assets:[],warnings:[],sourceName:'page.html',checksum:'test'};
const session:ImportSession={id:'solution',isDraft:true,publishedRevisionId:null,baseRevisionId:'r1',document:page,revisions:[{id:'r1',number:1,createdAt:'2026-11-16'}]};
let container:HTMLDivElement,root:Root;
const fetchMock=vi.fn();
beforeEach(()=>{vi.stubGlobal('IS_REACT_ACT_ENVIRONMENT',true);vi.stubGlobal('fetch',fetchMock);HTMLElement.prototype.scrollIntoView=vi.fn();fetchMock.mockReset();fetchMock.mockImplementation(async(url:string)=>new Response(JSON.stringify(url.includes('products')?{products:[]}:url.includes('?revisionId=')?{document:page}:session),{status:200}));container=document.createElement('div');document.body.append(container);root=createRoot(container);});
afterEach(async()=>{await act(async()=>root.unmount());container.remove();vi.unstubAllGlobals();});
const button=(text:string)=>Array.from(container.querySelectorAll<HTMLButtonElement>('button')).find(b=>b.textContent?.trim()===text)!;
async function click(text:string){await act(async()=>button(text).click());}
it('supports Next, Back and direct step tabs',async()=>{await act(async()=>root.render(<ImportEditor initialSession={session}/>));await click('Next');expect(container.textContent).toContain('Upload your page and manage images');await click('Back');expect(container.querySelector('[role="tabpanel"]')?.getAttribute('id')).toBe('solution-panel-0');await act(async()=>container.querySelectorAll<HTMLButtonElement>('[role="tab"]')[2].click());expect(container.textContent).toContain('Search, sharing and platforms');});
it('validates the first step before moving forward',async()=>{await act(async()=>root.render(<ImportEditor/>));await click('Next');expect(container.querySelector('[role="alert"]')?.textContent).toContain('menu title');expect(container.querySelector('[role="tabpanel"]')?.id).toBe('solution-panel-0');});
it('opens preview in a separate tab without gating publishing',async()=>{
 const opened={location:{replace:vi.fn()},close:vi.fn()} as unknown as Window;
 vi.spyOn(window,'open').mockReturnValue(opened);
 await act(async()=>root.render(<ImportEditor initialSession={session}/>));await act(async()=>container.querySelectorAll<HTMLButtonElement>('[role="tab"]')[3].click());
 await click('Preview');
 expect(window.open).toHaveBeenCalledWith('about:blank','_blank');
 expect(container.querySelector('iframe')).toBeNull();
 const url=vi.mocked(opened.location.replace).mock.calls[0][0] as string;
 expect(url).toContain('/api/admin/solutions/solution/preview?revisionId=r1&run=');
 expect(button('Publish draft').disabled).toBe(false);
 const run=new URL(url,window.location.origin).searchParams.get('run');
 await act(async()=>window.dispatchEvent(new MessageEvent('message',{origin:window.location.origin,source:opened,data:{type:'solution-preview',run,error:null}})));
 expect(button('Publish draft').disabled).toBe(false);
 expect(fetchMock.mock.calls.filter(call=>call[1]?.method==='POST')).toHaveLength(0);
 vi.mocked(window.open).mockRestore();
});
it('reports when the browser blocks the preview tab',async()=>{
 vi.spyOn(window,'open').mockReturnValue(null);
 await act(async()=>root.render(<ImportEditor initialSession={session}/>));await act(async()=>container.querySelectorAll<HTMLButtonElement>('[role="tab"]')[3].click());await click('Preview');
 expect(container.querySelector('[role="alert"]')?.textContent).toContain('blocked the preview tab');
 vi.mocked(window.open).mockRestore();
});
it('shows an existing cover and removes it from the draft without deleting storage',async()=>{await act(async()=>root.render(<ImportEditor initialSession={session}/>));await act(async()=>container.querySelectorAll<HTMLButtonElement>('[role="tab"]')[1].click());expect(container.querySelector('img[alt="Carousel cover preview"]')?.getAttribute('src')).toBe(page.metadata.coverImage);await act(async()=>container.querySelector<HTMLButtonElement>('[aria-label="Remove Carousel cover"]')!.click());expect(container.querySelector('img[alt="Carousel cover preview"]')).toBeNull();expect(container.textContent).toContain('Unsaved changes');expect(fetchMock.mock.calls.filter(call=>call[1]?.method==='DELETE')).toHaveLength(0);});

it('publishes a saved draft without opening a preview',async()=>{
 fetchMock.mockImplementation(async(url:string,options?:RequestInit)=>new Response(JSON.stringify(options?.method==='POST'?{slug:'cold-storage'}:session),{status:200}));
 const open=vi.spyOn(window,'open');
 await act(async()=>root.render(<ImportEditor initialSession={session}/>));
 await act(async()=>container.querySelectorAll<HTMLButtonElement>('[role="tab"]')[3].click());
 expect(button('Publish draft').disabled).toBe(false);
 await click('Publish draft');
 expect(open).not.toHaveBeenCalled();
 expect(fetchMock).toHaveBeenCalledWith('/api/admin/solutions/solution/revisions',expect.objectContaining({method:'POST',body:JSON.stringify({revisionId:'r1'})}));
 expect(container.textContent).toContain('Your page is live.');
 open.mockRestore();
});

it('uses the same four-step upload editor for portfolio projects',async()=>{
 await act(async()=>root.render(<ImportEditor kind="portfolio" initialSession={session}/>));
 expect(container.textContent).toContain('Edit project');expect(container.textContent).toContain('Client name');expect(container.textContent).not.toContain('Menu icon');
 await act(async()=>container.querySelectorAll<HTMLButtonElement>('[role="tab"]')[3].click());
 expect(button('Publish draft').disabled).toBe(false);expect(container.textContent).toContain('/portfolio/cold-storage');
});
