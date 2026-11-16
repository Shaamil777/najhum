'use client';
import {useEffect,useRef,useState} from 'react';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import {ArrowLeft,ArrowRight,Check,CheckCircle2,AlertCircle,Upload,FileCode2,X,Save,Eye,Loader2,ExternalLink,ImageIcon,Replace} from 'lucide-react';
import {metadataSchema,MAX_UPLOAD,type ImportedDocument,type ImportMetadata} from '@/lib/solution-import/types';
import {classificationLabels} from '@/lib/solution-classification';
import ImageField from './ImageField';
import styles from './ImportEditor.module.css';

export type ImportSession={id:string;isDraft:boolean;publishedRevisionId:string|null;baseRevisionId:string;document:ImportedDocument|null;revisions:{id:string;number:number;createdAt:string}[]};
const blank:ImportMetadata={title:'',slug:'',seoTitle:'',metaDescription:'',menuDescription:'',menuIcon:'snowflake',coverImage:'',socialImage:'',socialImageAlt:'',classification:'INDUSTRY',platforms:[],productIds:[]};
const steps=[['Details','Name and navigation'],['Page & images','HTML, ZIP and media'],['SEO & links','Search and platforms'],['Preview & publish','Review and go live']];
const icons=['snowflake','building','factory','bolt','leaf','warehouse'];
const slugify=(value:string)=>value.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
type Edit={file?:File;alt?:string;previewUrl?:string};

export default function ImportEditor({initialSession}:{initialSession?:ImportSession}){
 const router=useRouter();const [session,setSession]=useState(initialSession),[meta,setMeta]=useState<ImportMetadata>(initialSession?.document?.metadata||blank);
 const [step,setStep]=useState(0),[files,setFiles]=useState<File[]>([]),[assetEdits,setAssetEdits]=useState<Record<string,Edit>>({});
 const [busy,setBusy]=useState(false),[operation,setOperation]=useState(''),[error,setError]=useState(''),[message,setMessage]=useState('');
 const [dirty,setDirty]=useState(!initialSession?.document),[chosen,setChosen]=useState(initialSession?.baseRevisionId||'');
 const [runId,setRunId]=useState('');
 const [previewStatus,setPreviewStatus]=useState<'empty'|'loading'|'ready'|'error'>('empty'),[previewError,setPreviewError]=useState('');
 const previewWindow=useRef<Window|null>(null),panel=useRef<HTMLDivElement>(null),packagePicker=useRef<HTMLInputElement>(null),assetPicker=useRef<HTMLInputElement>(null);
 const activePreview=useRef({run:'',revision:''}),objectUrls=useRef(new Set<string>());

 useEffect(()=>()=>objectUrls.current.forEach(url=>URL.revokeObjectURL(url)),[]);
 useEffect(()=>{const receive=(event:MessageEvent)=>{
  const current=activePreview.current;
  if(event.origin!==window.location.origin||event.source!==previewWindow.current||event.data?.type!=='solution-preview'||event.data.run!==current.run)return;
  if(event.data.error){setPreviewStatus('error');setPreviewError(String(event.data.error).slice(0,400));}
  else {setPreviewStatus('ready');setPreviewError('');}
 };window.addEventListener('message',receive);return ()=>window.removeEventListener('message',receive);},[]);
 useEffect(()=>{if(previewStatus!=='loading')return;const timer=setTimeout(()=>{setPreviewStatus('error');setPreviewError('The preview did not finish loading. Reload the preview or check that the package has no missing resources.');},20000);return ()=>clearTimeout(timer);},[previewStatus,runId]);
 const hasPage=files.some(f=>/\.(zip|html?)$/i.test(f.name))||!!session?.document;
 const isSelectedLive=!!session&&!session.isDraft&&session.publishedRevisionId===chosen;
 const canPublish=!busy&&hasPage&&(dirty||!isSelectedLive);
 function invalidate(){setDirty(true);activePreview.current={run:'',revision:''};setPreviewStatus('empty');setChosen(session?.baseRevisionId||'');setMessage('');}
 function update<K extends keyof ImportMetadata>(key:K,value:ImportMetadata[K]){setMeta(old=>({...old,[key]:value}));invalidate();}
 function go(index:number){setStep(index);setError('');panel.current?.scrollIntoView({behavior:'smooth',block:'start'});}
 function validateDetails(){if(!meta.title.trim()||!meta.slug||!/^\w+(?:-\w+)*$/.test(meta.slug)||meta.slug!==slugify(meta.slug)){setError('Add a menu title and a URL slug using lowercase letters, numbers and hyphens.');setStep(0);return false;}return true;}
 function validateAll(){if(!validateDetails())return false;if(!hasPage){setError('Upload one responsive HTML file or ZIP before saving.');setStep(1);return false;}const result=metadataSchema.safeParse(meta);if(!result.success){setError(result.error.issues.map(i=>`${i.path.join('.')}: ${i.message}`).join('\n'));setStep(2);return false;}return true;}
 function next(){if(step===0&&!validateDetails())return;if(step===1&&!hasPage){setError('Choose your HTML or ZIP package to continue.');return;}go(Math.min(3,step+1));}
 function chooseFiles(selected:File[],append=false){if(!selected.length)return;const next=append?[...files,...selected]:selected;if(next.reduce((n,f)=>n+f.size,0)>MAX_UPLOAD){setError('The total package upload must be under 4 MB.');return;}setFiles(next);if(!append){objectUrls.current.forEach(url=>URL.revokeObjectURL(url));objectUrls.current.clear();setAssetEdits({});}invalidate();setError('');}
 function changeAsset(key:string,file?:File,alt?:string){
  if(file && (!['image/png','image/jpeg','image/webp','image/avif','image/gif'].includes(file.type)||file.size>MAX_UPLOAD)){setError('Choose a PNG, JPG, WebP, AVIF or GIF image under 4 MB.');return;}
  setAssetEdits(old=>{const previous=old[key];if(file&&previous?.previewUrl){URL.revokeObjectURL(previous.previewUrl);objectUrls.current.delete(previous.previewUrl);}const url=file?URL.createObjectURL(file):previous?.previewUrl;if(file&&url)objectUrls.current.add(url);return {...old,[key]:{...previous,...(file?{file,previewUrl:url}:{}),...(alt!==undefined?{alt}:{})}};});invalidate();
 }
 async function saveDraft():Promise<ImportSession|null>{
  if(!validateAll())return null;if(!dirty&&session)return session;
  setBusy(true);setOperation('Saving draft…');setError('');setMessage('');
  try{
   const form=new FormData();form.set('metadata',JSON.stringify({...meta,productIds:[]}));form.set('baseRevisionId',session?.baseRevisionId||'');files.forEach(f=>form.append('files',f,f.webkitRelativePath||f.name));
   form.set('assetEdits',JSON.stringify(Object.entries(assetEdits).map(([storageKey,edit],i)=>{const fileKey=edit.file?`replacement-${i}`:undefined;if(fileKey&&edit.file)form.set(fileKey,edit.file);return {storageKey,alt:edit.alt,fileKey};})));
   const response=await fetch(session?`/api/admin/solutions/${session.id}/import`:'/api/admin/solutions/import',{method:'POST',body:form});const data=await response.json();if(!response.ok)throw new Error(data.error||'Could not save draft.');
   const refreshed=await fetch(`/api/admin/solutions/${data.id}/revisions`,{cache:'no-store'});const saved=await refreshed.json();if(!refreshed.ok)throw new Error('Draft saved, but could not reload it. Please refresh this page.');
   setSession(saved);setChosen(saved.baseRevisionId);setFiles([]);setAssetEdits({});setDirty(false);setMessage(`Draft saved. Your live page has not changed.`);
   objectUrls.current.forEach(url=>URL.revokeObjectURL(url));objectUrls.current.clear();
   if(!session)window.history.replaceState(window.history.state,'',`/admin/solutions/${data.id}/edit`);
   return saved;
  }catch(e){setError(e instanceof Error?e.message:'Could not save draft.');return null;}finally{setBusy(false);setOperation('');}
 }
 async function showPreview(){
  if(!session?.document||!chosen){setError('Save a draft before opening a preview.');return;}
  const opened=window.open('about:blank','_blank');
  if(!opened){setError('Your browser blocked the preview tab. Allow pop-ups for this website, then try again.');return;}
  const saved=session,revision=chosen;
  setStep(3);setBusy(true);setOperation('Opening preview…');setError('');setPreviewError('');setPreviewStatus('loading');
  try{
   const response=await fetch(`/api/admin/solutions/${saved.id}/revisions?revisionId=${encodeURIComponent(revision)}`,{cache:'no-store'});const data=await response.json();if(!response.ok)throw new Error(data.error||'Could not load the saved page.');
   const page=data.document as ImportedDocument;if(!page?.html)throw new Error('This revision has no HTML content. Upload the package again.');
   const run=crypto.randomUUID();activePreview.current={run,revision};previewWindow.current=opened;
   setRunId(run);
   opened.location.replace(`/api/admin/solutions/${saved.id}/preview?revisionId=${encodeURIComponent(revision)}&run=${encodeURIComponent(run)}`);
  }catch(e){opened.close();setPreviewStatus('error');setPreviewError(e instanceof Error?e.message:'Preview failed.');}finally{setBusy(false);setOperation('');}
 }
 async function publish(){
  if(!canPublish)return;
  let saved=session;
  if(dirty||!saved){saved=await saveDraft()||undefined;if(!saved)return;}
  if(!saved)return;
  const revision=saved.baseRevisionId;
  setBusy(true);setOperation('Publishing…');setError('');
  try{
   const response=await fetch(`/api/admin/solutions/${saved.id}/revisions`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({revisionId:revision})});const data=await response.json();if(!response.ok)throw new Error(data.error||'Could not publish.');
   setSession({...saved,isDraft:false,publishedRevisionId:revision});setChosen(revision);setMessage(`Your page is live. Your solution is available at /solutions/${data.slug}.`);router.refresh();
  }catch(e){setError(e instanceof Error?e.message:'Could not publish.');}finally{setBusy(false);setOperation('');}
 }
 async function unpublish(){if(!session)return;setBusy(true);setError('');try{const response=await fetch(`/api/admin/solutions/${session.id}/unpublish`,{method:'POST'});if(!response.ok)throw new Error('Could not unpublish.');setSession({...session,isDraft:true});setMessage('The solution is unpublished. Your working draft and last published page are retained.');router.refresh();}catch(e){setError(e instanceof Error?e.message:'Could not unpublish.');}finally{setBusy(false);}}
 const display=meta;
 return <div className={styles.editor}>
  <Link href="/admin/solutions" className={styles.back}><ArrowLeft size={14}/>Back to solutions</Link>
  <header className={styles.header}><div><p className={styles.eyebrow}>Solution workspace</p><h1>{session?'Edit solution':'Create solution'}</h1><p>Build your page in four steps. Save your work as a draft or publish when you’re ready. Preview is optional.</p></div><span className={`${styles.badge} ${!dirty&&session&&!session.isDraft&&session.publishedRevisionId===session.baseRevisionId?styles.badgeLive:''}`}>{dirty?'Unsaved changes':session?.isDraft===false&&session.publishedRevisionId===session.baseRevisionId?<><CheckCircle2 size={13}/>Live</>:'Draft'}</span></header>
  <div className={styles.tabs} role="tablist" aria-label="Solution editor steps">{steps.map(([title,subtitle],i)=><button type="button" key={title} role="tab" id={`solution-step-${i}`} aria-controls={`solution-panel-${i}`} aria-selected={step===i} disabled={busy} className={styles.tab} onClick={()=>go(i)}><span className={styles.stepNumber}>{i<step?<Check size={14}/>:i+1}</span><span><strong>{title}</strong><small>{subtitle}</small></span></button>)}</div>
  {error&&<div role="alert" className={`${styles.notice} ${styles.error}`}><AlertCircle size={17}/><span>{error}</span></div>}{message&&<div role="status" className={`${styles.notice} ${styles.success}`}><CheckCircle2 size={17}/>{message}</div>}
  <div ref={panel} className={styles.panel} role="tabpanel" id={`solution-panel-${step}`} aria-labelledby={`solution-step-${step}`} style={{scrollMarginTop:100}}>
   <div className={styles.panelHeader}><h2>{['Page details','Upload your page and manage images','Search, sharing and platforms','Review your page and publish'][step]}</h2><p>{['Set the name, address and navigation details visitors will see.','Upload a ZIP or HTML with assets. Replace individual images without uploading the whole package again. Saving replaces your working draft; no version history is kept.','Set how this page appears in search results and link previews, and where it belongs in your catalogue.','Publish your latest changes, or save a draft to continue later. Preview is optional.'][step]}</p></div>
   {step===0&&<div className={styles.grid}><div className={styles.stack}>
    <label className={styles.field}>Menu title *<input value={meta.title} maxLength={200} onChange={e=>{const title=e.target.value;setMeta(old=>({...old,title,slug:!old.slug||old.slug===slugify(old.title)?slugify(title):old.slug,seoTitle:!old.seoTitle||old.seoTitle===old.title?title:old.seoTitle}));invalidate();}} placeholder="Cold Storage"/><small>A short name for the Solutions menu.</small></label>
    <label className={styles.field}>URL slug *<span className={styles.inlineInput}><input value={meta.slug} onChange={e=>update('slug',e.target.value)} placeholder="cold-storage"/><button type="button" onClick={()=>update('slug',slugify(meta.title))}>Generate</button></span><small>/solutions/{meta.slug||'your-solution'}</small></label>
    <label className={styles.field}>Menu description<textarea value={meta.menuDescription} maxLength={180} onChange={e=>update('menuDescription',e.target.value)} placeholder="Monitor cold-room temperature, door activity and energy."/><small>{meta.menuDescription.length}/180 characters</small></label>
    <label className={styles.field}>Show in<select value={meta.classification} onChange={e=>update('classification',e.target.value as ImportMetadata['classification'])}>{Object.entries(classificationLabels).map(([key,label])=><option key={key} value={key}>{label}</option>)}</select></label>
   </div><div className={styles.stack}><label className={styles.field}>Menu icon<select value={icons.includes(meta.menuIcon)?meta.menuIcon:'custom'} onChange={e=>update('menuIcon',e.target.value)}>{icons.map(icon=><option key={icon} value={icon}>{icon.charAt(0).toUpperCase()+icon.slice(1)}</option>)}{!icons.includes(meta.menuIcon)&&<option value="custom">Custom uploaded icon</option>}</select></label><ImageField icon label="Custom menu icon" help="Optional. Use your own drawing-only SVG instead of a built-in icon." value={icons.includes(meta.menuIcon)?'':meta.menuIcon} onChange={url=>update('menuIcon',url||'snowflake')} onError={setError} disabled={busy} onBusy={setBusy}/></div></div>}
   {step===1&&<>
    <div className={styles.dropzone} onDragOver={e=>e.preventDefault()} onDrop={e=>{e.preventDefault();if(!busy)chooseFiles(Array.from(e.dataTransfer.files));}}><span className={styles.dropIcon}><Upload size={23}/></span><strong>Drop your HTML or ZIP package here</strong><p>One responsive HTML page for all devices. Up to 4 MB uploaded, 40 MB expanded and 150 files. Include scripts and assets locally.</p><button type="button" className={styles.primary} disabled={busy} onClick={()=>packagePicker.current?.click()}>Choose package</button><input ref={packagePicker} aria-label="Choose HTML or ZIP package" type="file" multiple accept=".zip,.html,.htm,.css,.js,.webp,.png,.jpg,.jpeg,.avif,.gif,.svg,.mp4,.woff2" className={styles.visuallyHidden} onChange={e=>{chooseFiles(Array.from(e.target.files||[]));e.target.value='';}}/></div>
    <div className={styles.summaryActions}><button type="button" className={styles.secondary} disabled={busy||files.some(f=>/\.zip$/i.test(f.name))} onClick={()=>assetPicker.current?.click()}><ImageIcon size={15}/>Add asset files</button><input ref={assetPicker} aria-label="Add page asset files" type="file" multiple className={styles.visuallyHidden} onChange={e=>{chooseFiles(Array.from(e.target.files||[]),true);e.target.value='';}}/>{session?.document&&<p className={styles.help}>Current page: <strong>{session.document.sourceName}</strong>. Keep it to edit images or metadata only.</p>}</div>
    {files.length>0&&<div className={styles.fileList}>{files.map((file,i)=><div className={styles.fileRow} key={`${file.name}-${i}`}><FileCode2 size={16}/><strong>{file.name}</strong><span>{Math.ceil(file.size/1024)} KB</span><button type="button" aria-label={`Remove file ${file.name}`} onClick={()=>{setFiles(old=>old.filter((_,index)=>index!==i));invalidate();}}><X size={15}/></button></div>)}</div>}
    {!!session?.document?.warnings.length&&<div className={styles.warning}>{session.document.warnings.map(w=><p key={w}>{w}</p>)}</div>}
    {!!session?.document?.assets.length&&!files.some(f=>/\.(zip|html?)$/i.test(f.name))&&<><div className={styles.subheading}><div><h3>Images inside your page</h3><p>Replacement images update every occurrence when you save the draft. The live page keeps its current images until you publish the draft.</p></div><span className={styles.badge}>{session.document.assets.filter(a=>a.type.startsWith('image/')).length} images</span></div><div className={styles.assetGrid}>{session.document.assets.filter(a=>a.type.startsWith('image/')).map(asset=><div key={asset.storageKey} className={styles.asset}><div className={styles.assetPicture}><img src={assetEdits[asset.storageKey]?.previewUrl||asset.url} alt={asset.path}/>{assetEdits[asset.storageKey]&&<span className={styles.pending}>Unsaved edit</span>}</div><div className={styles.assetBody}><strong title={asset.path}>{asset.path.split('/').pop()}</strong><label><span className={styles.link}><Replace size={12} style={{display:'inline',marginRight:5}}/>Replace image</span><input type="file" className={styles.visuallyHidden} aria-label={`Replace ${asset.path}`} accept="image/png,image/jpeg,image/webp,image/avif,image/gif" onChange={e=>{changeAsset(asset.storageKey,e.target.files?.[0]);e.target.value='';}}/></label><input aria-label={`Alt text for ${asset.path}`} placeholder="Edit image alt text (optional)" value={assetEdits[asset.storageKey]?.alt??asset.altText??''} onChange={e=>changeAsset(asset.storageKey,undefined,e.target.value)}/>{assetEdits[asset.storageKey]&&<button type="button" onClick={()=>{const edit=assetEdits[asset.storageKey];if(edit.previewUrl){URL.revokeObjectURL(edit.previewUrl);objectUrls.current.delete(edit.previewUrl);}setAssetEdits(old=>{const next={...old};delete next[asset.storageKey];return next;});invalidate();}}>Undo image edit</button>}</div></div>)}</div></>}
    <div className={styles.subheading}><div><h3>Solution card image</h3><p>This cover appears on solution cards and platform carousels.</p></div></div><ImageField label="Carousel cover" help="Upload, replace or crop the current cover. This does not change images inside the HTML page." value={meta.coverImage} onChange={url=>update('coverImage',url)} onError={setError} disabled={busy} onBusy={setBusy}/>
   </>}
   {step===2&&<div className={styles.stack}><div className={styles.grid}><div className={styles.stack}>
    <label className={styles.field}>SEO page title *<input maxLength={200} value={meta.seoTitle} onChange={e=>update('seoTitle',e.target.value)} placeholder="Cold Storage Temperature & Energy Monitoring | Najhum UAE"/><small>Separate from the short menu title. Used for search results and browser tabs.</small></label>
    <label className={styles.field}>Meta description<textarea maxLength={300} value={meta.metaDescription} onChange={e=>update('metaDescription',e.target.value)}/><small>{meta.metaDescription.length}/300 characters</small></label>
    <label className={styles.field}>Social image alt text<input value={meta.socialImageAlt} maxLength={200} onChange={e=>update('socialImageAlt',e.target.value)} placeholder="Describe the share image"/></label>
   </div><ImageField label="Social share image" help="For WhatsApp, LinkedIn and other link previews. Upload any suitable image and crop it to 1200 × 630." value={meta.socialImage} onChange={url=>update('socialImage',url)} onError={setError} disabled={busy} onBusy={setBusy} social/></div>
    <div className={styles.subheading}><div><h3>Platforms</h3><p>Choose the platform pages where this solution should appear.</p></div></div><div className={styles.platforms}>{(['iotrics','evoltics','cropifai'] as const).map((platform,i)=><label key={platform}><input type="checkbox" checked={meta.platforms.includes(platform)} onChange={e=>update('platforms',e.target.checked?[...meta.platforms,platform]:meta.platforms.filter(p=>p!==platform))}/>{['IoTRICs','EVOLTICS','cropifAI'][i]}</label>)}</div>

   </div>}
   {step===3&&<>
    <dl className={styles.publishSummary}>
     <div><dt>Menu title</dt><dd>{display.title||'Not set'}</dd></div>
     <div><dt>Page address</dt><dd>/solutions/{display.slug||'…'}</dd></div>
     <div><dt>Platforms</dt><dd>{display.platforms.length?display.platforms.map(p=>p==='iotrics'?'IoTRICs':p==='evoltics'?'EVOLTICS':'cropifAI').join(', '):'None selected'}</dd></div>
     <div className={styles.seoSummary}><dt>SEO page title</dt><dd>{display.seoTitle||'Not set'}</dd></div>
    </dl>
    <div className={styles.publishActions}>
     <div><strong>Preview your saved draft <span>Optional</span></strong><p>{!session?.document?'Save a draft to preview it in a new tab.':dirty?'Preview shows your last saved draft. Save first to include your latest changes.':'Opens your saved page in a separate browser tab.'}</p>
     {previewStatus!=='empty'&&<p role="status" className={previewStatus==='error'?styles.previewError:previewStatus==='ready'?styles.previewReady:''}>{previewStatus==='loading'?'Opening preview…':previewStatus==='ready'?'Preview opened in a new tab.':previewError}</p>}</div>
     <button type="button" className={styles.secondary} disabled={busy||!session?.document} onClick={showPreview}><Eye size={16}/>Preview<ExternalLink size={13}/></button>
    </div>
    {session&&!session.isDraft&&<div className={styles.liveActions}><Link href={`/solutions/${session.document?.metadata.slug||meta.slug}`} target="_blank" className={styles.link}>View live page <ExternalLink size={12}/></Link><button type="button" disabled={busy} onClick={unpublish} className={styles.dangerLink}>Unpublish</button></div>}
   </>}

  </div>
  <footer className={styles.footer}><div className={styles.footerLeft}>{step>0?<button type="button" className={styles.secondary} disabled={busy} onClick={()=>go(step-1)}><ArrowLeft size={15}/>Back</button>:<span className={styles.footerNote}>Step {step+1} of 4</span>}</div><div className={styles.footerRight}>{hasPage&&<button type="button" className={styles.secondary} disabled={busy||!dirty} onClick={()=>void saveDraft()}><Save size={15}/>{busy&&operation==='Saving draft…'?'Saving…':'Save draft'}</button>}{step<3?<button type="button" className={styles.primary} disabled={busy} onClick={next}>Next<ArrowRight size={15}/></button>:<button type="button" className={styles.primary} disabled={!canPublish} onClick={publish}>{busy&&operation==='Publishing…'?<Loader2 size={15} className={styles.spinner}/>:<CheckCircle2 size={15}/>} {isSelectedLive&&!dirty?'Already published':dirty?'Publish changes':'Publish draft'}</button>}</div></footer>
  {step===3&&<p className={styles.publishHelp}>{dirty?'Publish changes saves and publishes your latest edits. Preview is not required.':isSelectedLive?'Your saved page is already live.':'Publish draft makes your saved page live. Preview is not required.'}</p>}

 </div>;
}
