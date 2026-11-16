'use client';
import { useEffect,useRef } from 'react';
import type { ImportedDocument } from '@/lib/solution-import/types';

/** Trusted admin code executes in the browser only. Standard animation resources
 * are tracked so imported scripts cannot accumulate on client-side navigation. */
export default function HtmlSolution({document:page}:{document:ImportedDocument}) {
 const root=useRef<HTMLDivElement>(null);
 useEffect(()=>{
  const host=root.current;if(!host)return;
  host.innerHTML=page.html;
  let alive=true;
  const events:Array<[EventTarget,string,EventListenerOrEventListenerObject,boolean|AddEventListenerOptions|undefined]>=[];
  const frames=new Set<number>(),timers=new Set<number>(),intervals=new Set<number>(),observers:Array<{disconnect:()=>void}>=[];
  const raf:typeof requestAnimationFrame=callback=>{const id=window.requestAnimationFrame(t=>{frames.delete(id);if(alive)callback(t);});frames.add(id);return id;};
  const timeout=(callback:()=>void,ms?:number)=>{const id=window.setTimeout(()=>{timers.delete(id);if(alive)callback();},ms);timers.add(id);return id;};
  const interval=(callback:()=>void,ms?:number)=>{const id=window.setInterval(()=>{if(alive)callback();},ms);intervals.add(id);return id;};
  function targetProxy<T extends Window|Document>(target:T):T{return new Proxy(target,{get(obj,key){
   if(key==='addEventListener')return (name:string,handler:EventListenerOrEventListenerObject,options?:boolean|AddEventListenerOptions)=>{if(target===window.document && name==='DOMContentLoaded' && window.document.readyState!=='loading'){timeout(()=>{const event=new Event('DOMContentLoaded');if(typeof handler==='function')handler.call(target,event);else handler.handleEvent(event);},0);return;}events.push([target,name,handler,options]);target.addEventListener(name,handler,options);};
   if(key==='requestAnimationFrame')return raf;if(key==='setTimeout')return timeout;if(key==='setInterval')return interval;
   const value=Reflect.get(obj,key,obj);return typeof value==='function'?value.bind(obj):value;
  }});}
  const trackedObserver=<T extends typeof IntersectionObserver|typeof ResizeObserver|typeof MutationObserver>(Original:T)=>new Proxy(Original,{construct(target,args){const obj=Reflect.construct(target,args);observers.push(obj);return obj;}});
  const resize=()=>{const header=window.document.querySelector('header');const height=header?.getBoundingClientRect().bottom||80;host.style.setProperty('--solution-header-height',`${height}px`);};
  resize();window.addEventListener('resize',resize);
  try{
   for(const source of page.scripts){
    // Deliberately executable, trusted-admin browser JavaScript; never compiled on the server.
    const run=new Function('window','document','requestAnimationFrame','cancelAnimationFrame','setTimeout','clearTimeout','setInterval','clearInterval','IntersectionObserver','ResizeObserver','MutationObserver',source);
    run(targetProxy(window),targetProxy(window.document),raf,window.cancelAnimationFrame.bind(window),timeout,window.clearTimeout.bind(window),interval,window.clearInterval.bind(window),trackedObserver(IntersectionObserver),trackedObserver(ResizeObserver),trackedObserver(MutationObserver));
   }
  }catch(error){console.error('[IMPORTED_SOLUTION_SCRIPT]',error);host.querySelectorAll('.rv').forEach(el=>el.classList.add('in'));}
  return ()=>{alive=false;window.removeEventListener('resize',resize);events.forEach(([target,name,handler,options])=>target.removeEventListener(name,handler,options));frames.forEach(cancelAnimationFrame);timers.forEach(clearTimeout);intervals.forEach(clearInterval);observers.forEach(o=>o.disconnect());};
 },[page]);
 return <><style dangerouslySetInnerHTML={{__html:page.css}}/><div ref={root} dangerouslySetInnerHTML={{__html:page.html}}/></>;
}
