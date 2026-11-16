 'use client';
import PortfolioVisibilityButton from '@/components/admin/PortfolioVisibilityButton';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2 } from 'lucide-react';
import type { ProjectInput } from '@/lib/portfolio/schema';
export default function ProjectActions({id,project}:{id:string;project:ProjectInput}){const router=useRouter();const [busy,setBusy]=useState(false),[error,setError]=useState('');async function remove(){if(!window.confirm(`Permanently delete “${project.title}”? This cannot be undone.`))return;setBusy(true);setError('');try{const response=await fetch(`/api/admin/portfolio/${id}`,{method:'DELETE'});if(!response.ok){const result=await response.json();throw new Error(result.error||'Delete failed.');}router.refresh();}catch(error){setError(error instanceof Error?error.message:'Delete failed.');}finally{setBusy(false);}}return <><PortfolioVisibilityButton id={id} kind="portfolio" hidden={project.isDraft}/><button className="blog-admin-button danger" disabled={busy} onClick={()=>void remove()}><Trash2 size={15}/>Delete</button>{error&&<p role="alert">{error}</p>}</>;}
