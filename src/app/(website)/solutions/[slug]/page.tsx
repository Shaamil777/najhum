import { buildMetadata, pageSchema } from "@/lib/seo";
import StructuredData from "@/components/seo/StructuredData";
import { formatPublicCopy, formatPublicText } from '@/lib/public-copy';
/**
 * Dynamic Solution Page
 * 
 * Public-facing page that renders solution content based on slug.
 * Server component with static generation and on-demand revalidation.
 */

import { notFound } from 'next/navigation';
import { getSolutionBySlug } from '@/lib/db/queries/solutions';
import { SectionType } from '@/types/section';
import SolutionSection from '@/components/solutions/SolutionSection';
import { liveDocument } from '@/lib/builder/server';
import { prisma } from '@/lib/db/prisma';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  let solution = null;
  try {
    solution = await getSolutionBySlug(slug, true);
  } catch (err) {
    console.error("Failed to query solution for metadata:", err);
  }

  if (!solution) return buildMetadata({title:"Solution not found",description:"This solution is not available.",path:`/solutions/${encodeURIComponent(slug)}`,noIndex:true});
  return buildMetadata({title:formatPublicText(solution.title),description:formatPublicText(solution.metaDescription || `${solution.title}. Connected monitoring and operational intelligence from Najhum Technologies in the UAE.`),path:`/solutions/${solution.slug}`,image:solution.coverImage,keywords:[formatPublicText(solution.title),...solution.platforms,"IoT solutions UAE","connected monitoring"]});
}

export default async function SolutionPage({ params }: PageProps) {
  const { slug } = await params;

  // Public routes expose published pages; draft previews remain in the admin builder.
  let solution = null;
  try {
    solution = await getSolutionBySlug(slug, true);
  } catch (error) {
    console.error(`Failed to load solution for slug "${slug}":`, error);
  }

  // Return 404 only if solution does not exist in database
  if (!solution) {
    notFound();
  }

  const document = formatPublicCopy(liveDocument({ ...solution, sections: solution.sections || [] }));
  const sectionsToRender = document.sections.filter(section => !solution.isDraft ? !section.isDraft : true);

  let products: Array<{ id: string; name: string; description: string; imageUrl: string | null; brochureUrl: string | null }> = [];
  try {
    products = await prisma.product.findMany({
      where: { isDraft: false, solutions: { has: solution.slug } },
      orderBy: { order: 'asc' },
      select: { id: true, name: true, description: true, imageUrl: true, brochureUrl: true },
    });
  } catch (err) {
    console.error("Failed to query products for solution:", err);
  }

  const selectedIds = [
    ...new Set(
      sectionsToRender
        .filter(section => section.type === SectionType.PRODUCT_CARD)
        .flatMap(section => (section.content.productIds || []) as string[])
    ),
  ];

  let availableProducts: Array<{ id: string; name: string; description: string; imageUrl: string | null; brochureUrl: string | null }> = [];
  if (selectedIds.length) {
    try {
      availableProducts = await prisma.product.findMany({
        where: { isDraft: false, id: { in: selectedIds } },
        select: { id: true, name: true, description: true, imageUrl: true, brochureUrl: true },
      });
    } catch (err) {
      console.error("Failed to query available products by id:", err);
    }
  }

  const seo = {title:formatPublicText(solution.title),description:formatPublicText(solution.metaDescription || `${solution.title}. Connected monitoring and operational intelligence from Najhum Technologies in the UAE.`),path:`/solutions/${solution.slug}`};
  return (
    <><StructuredData data={pageSchema(seo,sectionsToRender.map(section=>({id:`solution-section-${section.id}`,name:String(section.content.heading || section.type.replaceAll('_',' '))})),{"@type":"Service",name:seo.title,serviceType:seo.title,provider:{"@type":"Organization",name:"Najhum Technologies LLC"},areaServed:{"@type":"Country",name:"United Arab Emirates"}})} />
    <main className="solution-page min-h-screen">
      {/* Draft Notification Banner */}
      {solution.isDraft && (
        <div className="bg-amber-500 text-white px-4 py-2.5 text-center text-sm font-semibold flex flex-wrap items-center justify-center gap-2 sticky top-0 z-50 shadow-md">
          <span>⚠️ Draft Mode — This solution page is currently unpublished.</span>
          <a
            href={`/admin/solutions/${solution.id}/edit`}
            className="underline font-bold hover:text-amber-100 ml-1 inline-flex items-center gap-1"
          >
            Open in Admin Editor to Publish →
          </a>
        </div>
      )}

      {/* Render sections dynamically using SolutionSection */}
      {sectionsToRender.map((section) => (
        <SolutionSection
          key={section.id}
          section={section}
          products={products}
          availableProducts={availableProducts}
        />
      ))}

      {/* Empty state if no sections */}
      {sectionsToRender.length === 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {solution.title}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            This solution is currently being set up. Please check back later.
          </p>
        </div>
      )}
    </main></>
  );
}

// Read current published content at request time; builds do not require a database.
export const dynamic = 'force-dynamic';
