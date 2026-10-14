import Link from 'next/link';
import { prisma } from '@/lib/db/prisma';
import { ArrowRight, Layers, Sparkles } from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Solutions | Dexiko Technologies',
  description: 'Explore our comprehensive solutions designed to drive digital excellence.',
};

async function getSolutions() {
  try {
    // First try published solutions
    let solutions = await prisma.solution.findMany({
      where: { isDraft: false },
      select: {
        id: true,
        slug: true,
        title: true,
        metaDescription: true,
        coverImage: true,
        isDraft: true,
        updatedAt: true,
      },
      orderBy: { updatedAt: 'desc' },
    });

    // If no published solutions, fetch all solutions so the catalog isn't empty
    if (!solutions || solutions.length === 0) {
      solutions = await prisma.solution.findMany({
        select: {
          id: true,
          slug: true,
          title: true,
          metaDescription: true,
          coverImage: true,
          isDraft: true,
          updatedAt: true,
        },
        orderBy: { updatedAt: 'desc' },
      });
    }

    return solutions;
  } catch (error) {
    console.error('Failed to load solutions for catalog:', error);
    return [];
  }
}

export default async function SolutionsPage() {
  const solutions = await getSolutions();

  return (
    <div className="w-full min-h-screen bg-slate-50/50 py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Architecture & Deployments</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-display mb-4">
            Our Solutions
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            Discover production-grade frameworks and hardware-software architectures designed to drive digital excellence.
          </p>
        </div>

        {/* Solutions Grid */}
        {solutions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {solutions.map((solution, idx) => {
              const codeNumber = `SOL-${String(idx + 1).padStart(2, '0')}`;
              return (
                <Link
                  key={solution.id || solution.slug}
                  href={`/solutions/${solution.slug}`}
                  className="group relative bg-[#edf4ff] border border-blue-100 rounded-[1.75rem] p-6 flex flex-col justify-between min-h-[290px] shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden"
                >
                  {/* Background Graphic / Image */}
                  <div className="absolute top-0 right-0 bottom-0 w-[55%] pointer-events-none overflow-hidden rounded-r-[1.75rem]">
                    {solution.coverImage ? (
                      <img
                        src={solution.coverImage}
                        alt={solution.title}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                    ) : (
                      <div className="w-full h-full relative bg-gradient-to-br from-blue-100/60 to-indigo-100/40">
                        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#2563eb_1px,transparent_1px)] [background-size:16px_16px]" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#edf4ff] via-[#edf4ff]/90 to-transparent" />
                  </div>

                  {/* Corner Icon Badge */}
                  <div className="absolute top-4 right-4 z-10 pointer-events-none">
                    <div className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs border border-white/80 shadow-xs flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform duration-300">
                      <Layers className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Content Top */}
                  <div className="relative z-10 max-w-[68%]">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-slate-500">
                        {codeNumber}
                      </span>
                      {solution.isDraft && (
                        <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                          Draft
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 mb-2 tracking-tight line-clamp-2 group-hover:text-blue-700 transition-colors leading-snug">
                      {solution.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                      {solution.metaDescription || "Production-ready deployment framework and cloud connectivity."}
                    </p>
                  </div>

                  {/* Footer Action */}
                  <div className="relative z-10 pt-4 mt-4 border-t border-blue-200/60 flex items-center justify-between text-xs font-semibold text-blue-600 group-hover:text-blue-700">
                    <span>Explore Architecture</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 p-8 max-w-xl mx-auto shadow-xs">
            <Layers className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-900 mb-2">No solutions available yet</h3>
            <p className="text-sm text-slate-500 mb-6">
              Solutions are being curated. Check back shortly or explore our platforms.
            </p>
            <Link
              href="/platforms"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm"
            >
              Explore Platforms
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}
