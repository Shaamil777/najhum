import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { prisma } from '@/lib/db/prisma';
import { buildMetadata,pageSchema } from '@/lib/seo';
import StructuredData from '@/components/seo/StructuredData';
import HtmlSolution from '@/components/solutions/imported/HtmlSolution';
import type { ImportedDocument } from '@/lib/solution-import/types';
export const dynamic='force-dynamic';
async function published(slug:string){
 const solution=await prisma.portfolioProject.findFirst({where:{slug,isDraft:false,contentMode:'HTML',publishedRevisionId:{not:null}}});
 if(!solution)return null;
 const revision=await prisma.portfolioRevision.findFirst({where:{id:solution.publishedRevisionId!,projectId:solution.id}});
 return revision?{solution,document:revision.document as unknown as ImportedDocument}:null;
}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
 const result=await published((await params).slug);if(!result)return {title:'Project not found',robots:{index:false,follow:false}};
 const m=result.document.metadata,path=`/portfolio/${result.solution.slug}`;
 const base=buildMetadata({title:m.seoTitle,description:m.metaDescription,path,image:m.socialImage||m.coverImage});
 // The CMS SEO title is exact; do not append Najhum a second time.
 return {...base,title:{absolute:m.seoTitle},openGraph:{...base.openGraph,title:m.seoTitle,images:m.socialImage?[{url:new URL(m.socialImage,process.env.NEXT_PUBLIC_APP_URL||'https://najhumgroup.com').href,width:1200,height:630,alt:m.socialImageAlt||m.title}]:base.openGraph?.images},twitter:{...base.twitter,title:m.seoTitle}};
}
export default async function ProjectPage({params}:{params:Promise<{slug:string}>}){
 const result=await published((await params).slug);if(!result)notFound();
 const m=result.document.metadata;
 return <><StructuredData data={pageSchema({title:m.seoTitle,description:m.metaDescription,path:`/portfolio/${m.slug}`},[],{'@type':'CreativeWork',name:m.title,provider:{'@type':'Organization',name:'Najhum Technologies LLC'}})}/><main className="solution-page min-h-screen pt-20"><HtmlSolution key={result.solution.publishedRevisionId} document={result.document}/></main></>;
}
