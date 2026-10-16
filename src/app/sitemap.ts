import { siteConfig } from "@/config/site";
import type { MetadataRoute } from "next";
import { prisma } from "@/lib/db/prisma";
import { generateSlug } from "@/lib/utils/slug";

export const dynamic = "force-dynamic";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes=["","/about","/contact","/privacy-policy","/terms-and-conditions","/products","/solutions","/platforms/iotrics","/platforms/evoltics","/platforms/cropifai"];
  const staticPages:MetadataRoute.Sitemap=routes.map(route=>({url:`${siteConfig.url}${route}`,changeFrequency:"monthly",priority:route===""?1:.8}));
  const [solutions,products]=await Promise.allSettled([
    prisma.solution.findMany({where:{isDraft:false},select:{slug:true,updatedAt:true}}),
    prisma.product.findMany({where:{isDraft:false},select:{id:true,name:true,updatedAt:true}}),
  ]);
  const solutionPages:MetadataRoute.Sitemap=solutions.status==="fulfilled"?solutions.value.map(solution=>({url:`${siteConfig.url}/solutions/${solution.slug}`,lastModified:solution.updatedAt,changeFrequency:"monthly",priority:.8})):[];
  const productPages:MetadataRoute.Sitemap=products.status==="fulfilled"?products.value.map(product=>({url:`${siteConfig.url}/products/${generateSlug(product.name)||product.id}`,lastModified:product.updatedAt,changeFrequency:"monthly",priority:.7})):[];
  return [...staticPages,...solutionPages,...productPages];
}
