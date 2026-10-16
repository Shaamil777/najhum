import { prisma } from '@/lib/db/prisma';
import SolutionsCatalog from '@/components/sections/solutions/SolutionsCatalog';
export const dynamic = 'force-dynamic';
export const metadata = { title: 'Solutions | Najhum Technologies', description: 'Explore connected solutions for facilities, hospitality, cold storage, industrial operations, and energy monitoring.' };
export default async function SolutionsPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const params = await searchParams;
  let solutions: Awaited<ReturnType<typeof getSolutions>> = [];
  let unavailable = false;
  try { solutions = await getSolutions(); } catch { unavailable = true; }
  return <div className="min-h-screen bg-zinc-50 pt-28 pb-16 sm:pt-36 sm:pb-20"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><header className="max-w-3xl mb-8 sm:mb-12"><p className="text-xs font-bold tracking-[.2em] uppercase text-primary mb-4">CONNECTED SOLUTIONS</p><h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-zinc-900 mb-5">Find your solution.</h1><p className="text-base sm:text-lg leading-relaxed text-zinc-500">Explore the applications, devices, and intelligence that bring your operations together.</p></header>{unavailable ? <p role="alert" className="rounded-2xl border border-zinc-200 bg-white p-6 text-zinc-600">Solutions are temporarily unavailable. Please try again shortly.</p> : <SolutionsCatalog solutions={solutions} initialQuery={typeof params.q === 'string' ? params.q : ''}/>}</div></div>;
}
function getSolutions() { return prisma.solution.findMany({ where: { isDraft: false }, select: { id: true, slug: true, title: true, metaDescription: true, coverImage: true, platforms: true }, orderBy: { title: 'asc' } }); }
