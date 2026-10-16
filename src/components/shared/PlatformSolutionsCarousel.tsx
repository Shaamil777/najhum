"use client";
import PlatformCardCarousel from './PlatformCardCarousel';

interface SolutionItem {
  id: string;
  title: string;
  slug: string;
  metaDescription?: string | null;
  coverImage?: string | null;
  sections?: { type: string; content: unknown }[];
  images?: { url: string; altText?: string | null }[];
}
interface PlatformSolutionsCarouselProps {
  solutions: SolutionItem[];
  platformId: string;
  title?: string;
  eyebrow?: string;
  description?: string;
}
export default function PlatformSolutionsCarousel({ solutions, title, description = 'Explore connected applications built around your operations.' }: PlatformSolutionsCarouselProps) {
  const items = solutions.map(solution => {
    const hero = solution.sections?.find(section => section.type === 'HERO')?.content as { backgroundImage?: string; subheading?: string } | undefined;
    return { id: solution.id, title: solution.title, href: `/solutions/${encodeURIComponent(solution.slug)}`, imageUrl: solution.coverImage || solution.images?.[0]?.url || hero?.backgroundImage, description: (solution.metaDescription || hero?.subheading || 'Explore the applications and connected technology behind this solution.').replace(/<[^>]*>/g, '') };
  });
  return <PlatformCardCarousel items={items} itemLabel="solution" imageFit="cover" title={title || <>Explore Our <br className="hidden sm:block"/><span className="text-primary font-bold">Solutions</span></>} description={description}/>;
}
