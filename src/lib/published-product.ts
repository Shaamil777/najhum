import { cache } from "react";
import { prisma } from "@/lib/db/prisma";
import { generateSlug } from "@/lib/utils/slug";

// Share the published record between metadata and rendering; match the slugs
// already emitted by product cards, including names containing punctuation.
export const getPublishedProductBySlug = cache(async (slug:string) => {
  let decoded:string;
  try { decoded=decodeURIComponent(slug); } catch { return null; }
  try {
    const exact=await prisma.product.findFirst({where:{isDraft:false,OR:[{id:slug},{name:{equals:decoded.replace(/-/g," "),mode:"insensitive"}},{name:{equals:decoded,mode:"insensitive"}}]}});
    if(exact)return exact;
    const candidates=await prisma.product.findMany({where:{isDraft:false},select:{id:true,name:true}});
    const match=candidates.find(product=>generateSlug(product.name)===decoded);
    return match?await prisma.product.findFirst({where:{id:match.id,isDraft:false}}):null;
  } catch(error) { console.error("Failed to load published product:",error); return null; }
});
