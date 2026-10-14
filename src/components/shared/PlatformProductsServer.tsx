import { prisma } from "@/lib/db/prisma";
import PlatformProductsCarousel from "./PlatformProductsCarousel";

export default async function PlatformProductsServer({ platformId }: { platformId: string }) {
  let products;
  try {
    products = await prisma.product.findMany({
      where: {
        platforms: {
          has: platformId,
        },
        isDraft: false,
      },
      orderBy: {
        order: "asc",
      },
    });
  } catch (error) {
    console.error(`Failed to load products for platform "${platformId}":`, error);
    return null;
  }

  if (!products || products.length === 0) {
    return null;
  }

  return <PlatformProductsCarousel products={products} />;
}
