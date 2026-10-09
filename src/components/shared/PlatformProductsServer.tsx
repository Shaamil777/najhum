import { prisma } from "@/lib/db/prisma";
import PlatformProductsCarousel from "./PlatformProductsCarousel";

export default async function PlatformProductsServer({ platformId }: { platformId: string }) {
  const products = await prisma.product.findMany({
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

  if (!products || products.length === 0) {
    return null;
  }

  return <PlatformProductsCarousel products={products} />;
}
