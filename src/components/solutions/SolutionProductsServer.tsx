import { prisma } from "@/lib/db/prisma";
import PlatformProductsCarousel from "@/components/shared/PlatformProductsCarousel";

interface SolutionProductsServerProps {
  solutionSlug: string;
  content?: {
    heading?: string;
    description?: string;
  };
}

export default async function SolutionProductsServer({ 
  solutionSlug,
  content 
}: SolutionProductsServerProps) {
  const products = await prisma.product.findMany({
    where: {
      solutions: {
        has: solutionSlug,
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

  return (
    <PlatformProductsCarousel 
      products={products}
      title={content?.heading || "Compatible Ecosystem Hardware"}
      eyebrow="HARDWARE & APPLIANCES"
      description={content?.description || "Field-proven edge appliances and devices engineered specifically to power this solution."}
    />
  );
}
