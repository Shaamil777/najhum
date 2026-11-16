import { prisma } from '@/lib/db/prisma';
import Link from 'next/link';
import { ArrowUpRight, ArrowRight, Layers, Package, Users, FilePenLine, Plus, AlertCircle, CheckCircle2 } from 'lucide-react';
import RecentSolutions from '@/components/admin/dashboard/RecentSolutions';
import type { ImportedDocument } from '@/lib/solution-import/types';
import styles from './Dashboard.module.css';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Workspace overview', description: 'Content status, recent leads and publishing tasks for Najhum.' };

async function read<T>(label:string, query:()=>PromiseLike<T>):Promise<T|null> {
 try { return await query(); } catch(error) { console.error(`Dashboard ${label} unavailable`,error);return null; }
}
const date=(value:Date)=>new Intl.DateTimeFormat('en-GB',{day:'numeric',month:'short',year:'numeric',timeZone:'Asia/Calcutta'}).format(value);

export default async function DashboardPage() {
 const weekAgo=new Date(Date.now()-7*24*60*60*1000);
 const [solutions,products,articles,projects,leads]=await Promise.all([
  read('solutions',()=>prisma.solution.findMany({orderBy:{updatedAt:'desc'},select:{id:true,title:true,slug:true,isDraft:true,updatedAt:true,publishedRevisionId:true,platforms:true,seoTitle:true,metaDescription:true,socialImage:true,revisions:{orderBy:{number:'desc'},take:1,select:{id:true,document:true}}}})),
  read('products',()=>prisma.product.groupBy({by:['isDraft'],_count:{_all:true}})),
  read('articles',()=>prisma.blogPost.groupBy({by:['isDraft'],_count:{_all:true}})),
  read('portfolio',()=>prisma.portfolioProject.groupBy({by:['isDraft'],_count:{_all:true}})),
  read('leads',async()=>{const [total,recentCount,recent]=await Promise.all([prisma.customer.count(),prisma.customer.count({where:{createdAt:{gte:weekAgo}}}),prisma.customer.findMany({orderBy:{createdAt:'desc'},take:5,select:{id:true,name:true,source:true,productName:true,createdAt:true}})]);return {total,recentCount,recent};}),
 ]);
 const live=solutions?.filter(s=>!s.isDraft).length;
 const pending=solutions?.filter(s=>s.revisions[0]&&s.revisions[0].id!==s.publishedRevisionId);
 const hidden=solutions?.filter(s=>s.isDraft&&s.publishedRevisionId).length;
 const count=(rows:typeof products,draft:boolean)=>rows?.filter(row=>row.isDraft===draft).reduce((n,row)=>n+row._count._all,0);
 const productTotal=products?.reduce((n,row)=>n+row._count._all,0);
 const stats=[
  {label:'Live solutions',value:live,detail:solutions?`${solutions.length} total · ${hidden} hidden`:'Data unavailable',href:'/admin/solutions?filter=published',icon:Layers},
  {label:'Working drafts',value:pending?.length,detail:'New pages and unpublished edits',href:'/admin/solutions',icon:FilePenLine},
  {label:'Products',value:productTotal,detail:products?`${count(products,false)} published · ${count(products,true)} drafts`:'Data unavailable',href:'/admin/products',icon:Package},
  {label:'Leads · last 7 days',value:leads?.recentCount,detail:leads?`${leads.total} leads in your database`:'Data unavailable',href:'/admin/customers',icon:Users},
 ];
 const tasks=(solutions||[]).flatMap(solution=>{
  const draft=solution.revisions[0];
  const m=draft?(draft.document as unknown as ImportedDocument).metadata:null;
  const issues:string[]=[];
  if(draft&&draft.id!==solution.publishedRevisionId)issues.push(solution.publishedRevisionId?'Unpublished changes':'Draft not published');
  if(!(m?.seoTitle??solution.seoTitle)?.trim()||!(m?.metaDescription??solution.metaDescription)?.trim())issues.push('SEO title or description missing');
  if(!(m?.socialImage??solution.socialImage))issues.push('Social share image missing');
  if(!(m?.platforms??solution.platforms).length)issues.push('No platform selected');
  return issues.length?[{id:solution.id,title:m?.title||solution.title,issues}]:[];
 });
 const libraries=[{title:'Journal',href:'/admin/blogs',rows:articles},{title:'Portfolio',href:'/admin/portfolio',rows:projects},{title:'Products',href:'/admin/products',rows:products}];
 const unavailable=[['Solutions',solutions],['Products',products],['Journal',articles],['Portfolio',projects],['Leads',leads]].filter(([,data])=>data===null).map(([name])=>name);
 return <div className={styles.page}>
  <header className={styles.header}><div><p className={styles.eyebrow}>Workspace overview</p><h1>Your website at a glance</h1><p>Content to publish, details to complete and your latest leads.</p></div><Link href="/admin/solutions/new" className={styles.primary}><Plus size={17}/>New solution</Link></header>
  {!!unavailable.length&&<div role="alert" className={styles.notice}><AlertCircle size={18}/><span>{unavailable.join(', ')} data could not be loaded. Other available information is shown below. <Link href="/admin/dashboard">Reload overview</Link></span></div>}
  <div className={styles.stats}>{stats.map(({label,value,detail,href,icon:Icon})=><Link key={label} href={href} className={styles.stat}><div><span className={styles.icon}><Icon size={19}/></span><ArrowUpRight size={17}/></div><span>{label}</span><strong>{value??'—'}</strong><small>{detail}</small></Link>)}</div>
  <div className={styles.columns}><section className={styles.card}><div className={styles.sectionTitle}><div><h2>Needs attention</h2><p>Based on the latest saved solution drafts.</p></div><span className={styles.pill}>{solutions?tasks.length:'—'} pages</span></div>
   {!solutions?<p className={styles.empty}>Solution tasks are temporarily unavailable.</p>:!tasks.length?<div className={styles.empty}><CheckCircle2 size={24}/><strong>{solutions.length?'Your solution details are complete':'No solutions created yet'}</strong><p>{solutions.length?'No pending drafts or missing SEO, share-image or platform fields.':'Upload your first responsive HTML or ZIP package to get started.'}</p><Link href={solutions.length?'/admin/solutions':'/admin/solutions/new'}>{solutions.length?'Manage solutions':'Create a solution'} <ArrowRight size={14}/></Link></div>:<ul className={styles.list}>{tasks.slice(0,5).map(task=><li key={task.id}><Link href={`/admin/solutions/${task.id}/edit`}><div><strong>{task.title}</strong><p>{task.issues.join(' · ')}</p></div><ArrowRight size={17}/></Link></li>)}</ul>}
   {tasks.length>5&&<Link href="/admin/solutions" className={styles.more}>Manage all {tasks.length} pages <ArrowRight size={14}/></Link>}
  </section><section className={styles.card}><div className={styles.sectionTitle}><div><h2>Latest leads</h2><p>Recent contact and brochure activity.</p></div><Link href="/admin/customers">View all <ArrowUpRight size={14}/></Link></div>
   {!leads?<p className={styles.empty}>Lead data is temporarily unavailable.</p>:!leads.recent.length?<div className={styles.empty}><Users size={24}/><strong>No leads received yet</strong><p>Contact enquiries and brochure requests will appear here when received.</p></div>:<ul className={styles.list}>{leads.recent.map(lead=><li key={lead.id}><Link href="/admin/customers"><div><strong>{lead.name}</strong><p>{lead.source==='contact_form'?'Contact enquiry':lead.source==='brochure_download'?'Brochure request':lead.source.replaceAll('_',' ')}{lead.productName?` · ${lead.productName}`:''}</p><small>{date(lead.createdAt)}</small></div><ArrowRight size={17}/></Link></li>)}</ul>}
  </section></div>
  <div className={styles.libraries}>{libraries.map(library=><Link key={library.title} href={library.href}><div><h2>{library.title}</h2><ArrowUpRight size={17}/></div><p>{library.rows?<><strong>{count(library.rows,false)}</strong> published <span>·</span> <strong>{count(library.rows,true)}</strong> drafts</>:'Status unavailable'}</p></Link>)}</div>
  {solutions&&<RecentSolutions solutions={solutions.slice(0,5).map(solution=>({...solution,updatedAt:solution.updatedAt.toISOString()}))}/>}
 </div>;
}
