import { getProductClassification } from "@/lib/product-classification";
import ProductsHero from "@/components/sections/products/ProductsHero";
import ProductsGrid from "@/components/sections/products/ProductsGrid";
import Cta from "@/components/sections/home/Cta";
import { prisma } from "@/lib/db/prisma";

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  let dbProducts: Array<{
    id: string;
    name: string;
    description: string;
    imageUrl?: string | null;
    platforms: string[];
    solutions: string[];
    brochureUrl?: string | null;
    details?: unknown;
  }> = [];

  try {
    dbProducts = await prisma.product.findMany({
      where: {
        isDraft: false,
      },
      orderBy: {
        order: "asc",
      },
    });
  } catch (error) {
    console.error("Failed to load products from database:", error);
  }

  return (
    <div className="flex flex-col w-full">
      <ProductsHero />
      <ProductsGrid initialProducts={dbProducts.map(product => ({ ...product, ...getProductClassification(product) }))} />
      <Cta />
    </div>
  );
}