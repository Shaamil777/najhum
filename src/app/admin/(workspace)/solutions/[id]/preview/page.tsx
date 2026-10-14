import { notFound } from "next/navigation";
import { getSolutionById } from "@/lib/db/queries/solutions";
import { prisma } from "@/lib/db/prisma";
import SolutionPreviewClient from "@/components/admin/solutions/SolutionPreviewClient";

interface PreviewPageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminSolutionPreviewPage({ params }: PreviewPageProps) {
  const { id } = await params;

  // Fetch solution including all sections (both active and draft)
  const solution = await getSolutionById(id, true);

  if (!solution) {
    notFound();
  }

  // Fetch products tagged with this solution
  const products = await prisma.product.findMany({
    where: {
      solutions: {
        has: solution.slug,
      },
    },
    orderBy: {
      order: "asc",
    },
  });

  return (
    <SolutionPreviewClient
      solution={solution}
      products={products}
    />
  );
}

export const dynamic = "force-dynamic";
