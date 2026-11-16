'use client';
import {useEffect,useRef,useState} from 'react';
import {ImagePlus,Replace,Scissors,Trash2,Link as LinkIcon,X,Upload} from 'lucide-react';
import styles from './ImportEditor.module.css';

type Props={label:string;help:string;value:string;onChange:(url:string)=>void;onError:(message:string)=>void;disabled?:boolean;social?:boolean;icon?:boolean;onBusy?:(busy:boolean)=>void};
export default function ImageField({label,help,value,onChange,onError,disabled,social,icon,onBusy}:Props){
 const [uploading,setUploading]=useState(false),[urlEditor,setUrlEditor]=useState(false),[cropReady,setCropReady]=useState(false);
 const [crop,setCrop]=useState<{file:File;url:string}|null>(null);
 const [zoom,setZoom]=useState(1),[x,setX]=useState(50),[y,setY]=useState(50);
 const canvas=useRef<HTMLCanvasElement>(null),bitmap=useRef<ImageBitmap|null>(null),picker=useRef<HTMLInputElement>(null),dialog=useRef<HTMLDialogElement>(null);
 const height=social?630:675,width=1200;
 useEffect(()=>{if(!crop)return;let cancelled=false;dialog.current?.showModal();createImageBitmap(crop.file).then(image=>{if(cancelled){image.close();return;}bitmap.current=image;setCropReady(true);draw();}).catch(()=>{onError('Could not open this image. Use a PNG, JPG or WebP file.');setCrop(null);});return ()=>{cancelled=true;bitmap.current?.close();bitmap.current=null;URL.revokeObjectURL(crop.url);};
 // Drawing is repeated when zoom/position changes below.
 // eslint-disable-next-line react-hooks/exhaustive-deps
 },[crop]);
 function draw(){const image=bitmap.current,context=canvas.current?.getContext('2d');if(!image||!context)return;const scale=Math.max(width/image.width,height/image.height)*zoom;const w=image.width*scale,h=image.height*scale;context.fillStyle='#ffffff';context.fillRect(0,0,width,height);context.drawImage(image,-(w-width)*x/100,-(h-height)*y/100,w,h);}
 useEffect(()=>{draw();});
 async function upload(file:File){
  setUploading(true);onBusy?.(true);onError('');
  try{if(file.size>4*1024*1024)throw new Error('Choose an image under 4 MB.');if(icon){const svg=await file.text();if(file.type!=='image/svg+xml'||!/<svg[\s>]/i.test(svg)||/<(script|foreignObject|iframe|image|use|style)\b|\bon\w+\s*=|(?:href|src)\s*=|url\s*\(/i.test(svg))throw new Error('Use a drawing-only SVG without scripts or external references.');}
   const form=new FormData();form.set('file',file);form.set('folder','solution-media');const response=await fetch('/api/admin/upload',{method:'POST',body:form});const data=await response.json();if(!response.ok)throw new Error(data.error||'Upload failed.');onChange(data.url);
  }catch(e){onError(e instanceof Error?e.message:'Image upload failed.');}finally{setUploading(false);onBusy?.(false);}
 }
 function choose(file?:File){if(!file)return;if(icon){void upload(file);return;}if(!['image/png','image/jpeg','image/webp','image/avif','image/gif'].includes(file.type)){onError('Use a PNG, JPG, WebP, AVIF or GIF image.');return;}if(file.size>4*1024*1024){onError('Choose an image under 4 MB.');return;}setCropReady(false);setZoom(1);setX(50);setY(50);setCrop({file,url:URL.createObjectURL(file)});}
 async function editExisting(){setUploading(true);onBusy?.(true);onError('');try{const response=await fetch(`/api/admin/solution-media?url=${encodeURIComponent(value)}`);if(!response.ok){const data=await response.json();throw new Error(data.error||'Could not load image.');}const blob=await response.blob();choose(new File([blob],`existing-image.${blob.type.split('/')[1]}`,{type:blob.type}));}catch(e){onError(e instanceof Error?e.message:'Could not edit image.');}finally{setUploading(false);onBusy?.(false);}}
 async function useCrop(){draw();const blob=await new Promise<Blob|null>(resolve=>canvas.current?.toBlob(resolve,'image/jpeg',.9));if(!blob){onError('Could not create cropped image.');return;}setCrop(null);await upload(new File([blob],social?'social-1200x630.jpg':'cover.jpg',{type:'image/jpeg'}));}
 const locked=disabled||uploading;
 return <div className={styles.imageField}>
  <div className={styles.fieldHeading}><strong>{label}</strong><span>{social?'1200 × 630':icon?'SVG':'Cover image'}</span></div><p className={styles.help}>{help}</p>
  <div className={`${styles.imagePreview} ${icon?styles.iconPreview:''}`}>
   {value?<img src={value} alt={`${label} preview`}/>:<div><ImagePlus size={28}/><p>No image selected</p><span>Upload an image or enter its URL</span></div>}
   {uploading&&<div className={styles.uploadOverlay}>Uploading…</div>}
  </div>
  <div className={styles.imageActions}><button type="button" disabled={locked} onClick={()=>picker.current?.click()}>{value?<Replace size={15}/>:<Upload size={15}/>} {value?'Replace':'Upload image'}</button>{value&&!icon&&<button type="button" disabled={locked} onClick={editExisting}><Scissors size={15}/> Edit crop</button>}{value&&<button type="button" disabled={locked} onClick={()=>onChange('')} aria-label={`Remove ${label}`}><Trash2 size={15}/> Remove</button>}<button type="button" disabled={locked} onClick={()=>setUrlEditor(v=>!v)}><LinkIcon size={15}/> URL</button></div>
  <input ref={picker} type="file" className={styles.visuallyHidden} accept={icon?'.svg':'image/png,image/jpeg,image/webp,image/avif,image/gif'} aria-label={`Upload ${label}`} disabled={locked} onChange={e=>{choose(e.target.files?.[0]);e.target.value='';}}/>
  {urlEditor&&<label className={styles.field}>Image URL<input value={value} onChange={e=>onChange(e.target.value)} placeholder="https://…" disabled={locked}/></label>}
  {crop&&<dialog ref={dialog} className={styles.cropDialog} onCancel={()=>setCrop(null)}><div className={styles.cropHeader}><div><h3>Crop {label.toLowerCase()}</h3><p>{width} × {height} output · drag the sliders to frame your image</p></div><button type="button" aria-label="Close crop editor" onClick={()=>setCrop(null)}><X size={20}/></button></div><canvas ref={canvas} width={width} height={height} className={styles.cropCanvas}/><div className={styles.cropControls}><label>Zoom<input type="range" min="1" max="3" step=".01" value={zoom} onChange={e=>setZoom(Number(e.target.value))}/></label><label>Horizontal position<input type="range" min="0" max="100" value={x} onChange={e=>setX(Number(e.target.value))}/></label><label>Vertical position<input type="range" min="0" max="100" value={y} onChange={e=>setY(Number(e.target.value))}/></label></div><div className={styles.cropFooter}><button type="button" className={styles.secondary} onClick={()=>setCrop(null)}>Cancel</button>{!social&&<button type="button" className={styles.secondary} onClick={()=>{const file=crop.file;setCrop(null);void upload(file);}}>Use original</button>}<button type="button" className={styles.primary} disabled={!cropReady} onClick={useCrop}>Use cropped image</button></div></dialog>}
 </div>;
}
