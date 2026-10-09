import { prisma } from "@/lib/db/prisma";
import PlatformProductsCarousel from "@/components/shared/PlatformProductsCarousel";

export default async function SolutionProductsServer({ solutionSlug }: { solutionSlug: string }) {
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
    <div className="py-24 bg-zinc-50 border-y border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
        <h2 className="text-3xl md:text-4xl font-black text-zinc-900 tracking-tight">Related Products</h2>
        <p className="mt-4 text-lg text-zinc-500">Explore the hardware that powers this solution.</p>
      </div>
      <PlatformProductsCarousel products={products} />
    </div>
  );
}
