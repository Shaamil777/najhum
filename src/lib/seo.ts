import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export interface PageSeo { title: string; description: string; path: string; keywords?: string[]; image?: string | null; noIndex?: boolean }
export function plainSeoText(value: string): string {
  return value.replace(/<[^>]*>/g, " ").replace(/&(nbsp|amp|quot|apos|lt|gt);/g, (_, entity:string) => ({nbsp:" ",amp:"&",quot:'"',apos:"'",lt:"<",gt:">"}[entity]??" ")).replace(/\s+/g," ").trim();
}
export function seoDescription(value: string): string {
  const text=plainSeoText(value);
  if(text.length<=160)return text;
  const truncated=text.slice(0,157);
  return `${truncated.slice(0,truncated.lastIndexOf(" ")>110?truncated.lastIndexOf(" "):157).replace(/[ ,;:-]+$/,'')}…`;
}
export function absoluteSiteUrl(path: string): string { return new URL(path,siteConfig.url).toString(); }
export function buildMetadata({title,description,path,keywords=[],image,noIndex=false}:PageSeo):Metadata {
  const cleanTitle=plainSeoText(title); const summary=seoDescription(description);
  const url=absoluteSiteUrl(path); const imageUrl=image?absoluteSiteUrl(image):siteConfig.ogImage;
  return { title:cleanTitle,description:summary,keywords:[...new Set(["Najhum",...keywords])],alternates:{canonical:url},
    robots:{index:!noIndex,follow:!noIndex,googleBot:{index:!noIndex,follow:!noIndex,"max-image-preview":"large","max-snippet":-1,"max-video-preview":-1}},
    openGraph:{type:"website",locale:"en_GB",siteName:siteConfig.name,url,title:`${cleanTitle} | Najhum`,description:summary,images:[{url:imageUrl,alt:cleanTitle,...(!image?{width:1200,height:630}:{})}]},
    twitter:{card:"summary_large_image",title:`${cleanTitle} | Najhum`,description:summary,images:[imageUrl]},
  };
}
export function jsonLdString(value:unknown):string { return JSON.stringify(value).replace(/</g,"\\u003c"); }
export function pageSchema(seo:PageSeo,sections:{id:string;name:string}[]=[],mainEntity?:Record<string,unknown>){
  const url=absoluteSiteUrl(seo.path);
  const parts=seo.path.split('/').filter(Boolean);
  const breadcrumbs=[{name:"Home",item:siteConfig.url},...(parts[0]==="products"&&parts.length>1?[{name:"Products",item:absoluteSiteUrl('/products')}]:parts[0]==="solutions"&&parts.length>1?[{name:"Solutions",item:absoluteSiteUrl('/solutions')}]:[]),...(parts.length?[{name:seo.title,item:url}]:[])];
  return {"@context":"https://schema.org","@graph":[{"@type":"WebPage","@id":`${url}#webpage`,url,name:seo.title,description:seoDescription(seo.description),inLanguage:"en-GB",isPartOf:{"@id":`${siteConfig.url}/#website`},publisher:{"@id":`${siteConfig.url}/#organisation`},...(sections.length?{hasPart:sections.map(section=>({"@type":"WebPageElement","@id":`${url}#${section.id}`,name:section.name,url:`${url}#${section.id}`}))}:{}),...(mainEntity?{mainEntity:{...mainEntity,url}}:{}),...(seo.path==='/privacy-policy'||seo.path==='/terms-and-conditions'?{datePublished:"2025-11-29"}:{})},{"@type":"BreadcrumbList",itemListElement:breadcrumbs.map((crumb,index)=>({"@type":"ListItem",position:index+1,name:crumb.name,item:crumb.item}))}]};
}
export const organisationSchema={"@context":"https://schema.org","@graph":[{"@type":"Organization","@id":`${siteConfig.url}/#organisation`,name:siteConfig.name,url:siteConfig.url,logo:absoluteSiteUrl('/logo/logo.png'),email:siteConfig.contact.email,telephone:siteConfig.contact.phone,address:{"@type":"PostalAddress",streetAddress:"in5 Innovation Centre, Dubai Design District",addressLocality:"Dubai",addressCountry:"AE"},sameAs:Object.values(siteConfig.links)},{"@type":"WebSite","@id":`${siteConfig.url}/#website`,name:siteConfig.name,url:siteConfig.url,inLanguage:"en-GB",publisher:{"@id":`${siteConfig.url}/#organisation`}}]};
