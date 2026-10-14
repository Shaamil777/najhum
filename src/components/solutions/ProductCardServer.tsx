import { prisma } from "@/lib/db/prisma";
import ProductCardSection from "./ProductCardSection";
import type { ProductCardSectionContent } from "@/types/section";

interface ProductCardServerProps {
  content: ProductCardSectionContent;
  solutionSlug?: string;
}

export default async function ProductCardServer({ content, solutionSlug }: ProductCardServerProps) {
  let products: Array<{
    id: string;
    name: string;
    description: string;
    imageUrl?: string | null;
    platforms: string[];
    brochureUrl?: string | null;
  }> = [];

  try {
    if (content.displayMode === "manual" && content.productIds && content.productIds.length > 0) {
      products = await prisma.product.findMany({
        where: {
          id: { in: content.productIds },
          isDraft: false,
        },
        orderBy: { order: "asc" },
      });
    } else if (content.displayMode === "solution-tagged" && solutionSlug) {
      products = await prisma.product.findMany({
        where: {
          solutions: { has: solutionSlug },
          isDraft: false,
        },
        orderBy: { order: "asc" },
      });
      // Fallback if none tagged specifically to this slug
      if (products.length === 0) {
        products = await prisma.product.findMany({
          where: { isDraft: false },
          take: 6,
          orderBy: { order: "asc" },
        });
      }
    } else {
      products = await prisma.product.findMany({
        where: { isDraft: false },
        take: 6,
        orderBy: { order: "asc" },
      });
    }
  } catch (err) {
    console.error("Failed to load products for ProductCardSection:", err);
  }

  if (products.length === 0) return null;

  return <ProductCardSection content={content} products={products} />;
}
