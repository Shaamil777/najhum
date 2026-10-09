import { prisma } from '@/lib/db/prisma';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Check, FilePenLine, Globe2, Layers, Plus, Sparkles, TriangleAlert } from 'lucide-react';
import RecentSolutions from '@/components/admin/dashboard/RecentSolutions';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Workspace overview', description: 'Manage your Najhum solution content.' };

async function getDashboardStats() {
  try {
    const [totalCount, publishedCount, draftCount, recentSolutions] = await Promise.all([
      prisma.solution.count(),
      prisma.solution.count({ where: { isDraft: false } }),
      prisma.solution.count({ where: { isDraft: true } }),
      prisma.solution.findMany({ orderBy: { updatedAt: 'desc' }, take: 5, select: { id: true, title: true, slug: true, isDraft: true, updatedAt: true } }),
    ]);
    return { totalCount, publishedCount, draftCount, recentSolutions, unavailable: false };
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return { totalCount: 0, publishedCount: 0, draftCount: 0, recentSolutions: [], unavailable: true };
  }
}

export default async function DashboardPage() {
  const { totalCount, publishedCount, draftCount, recentSolutions, unavailable } = await getDashboardStats();
  const publishedPercent = totalCount ? Math.round(publishedCount / totalCount * 100) : 0;
  const stats = [
    { label: 'All solutions', count: totalCount, description: 'Your complete content library', icon: Layers, href: '/admin/solutions', color: 'bg-primary/7 text-primary' },
    { label: 'Published', count: publishedCount, description: 'Live and visible on your website', icon: Globe2, href: '/admin/solutions?filter=published', color: 'bg-emerald-50 text-emerald-600' },
    { label: 'Drafts', count: draftCount, description: 'Ideas and pages in progress', icon: FilePenLine, href: '/admin/solutions?filter=draft', color: 'bg-amber-50 text-amber-600' },
  ];
  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
        <div><p className="mb-2 text-[10px] font-semibold tracking-[0.18em] text-primary uppercase">Workspace overview</p><h1 className="font-display text-[28px] leading-tight font-semibold tracking-tight normal-case text-slate-900 sm:text-[34px]">Your ideas. Your impact.</h1><p className="mt-2 text-sm text-slate-500">A clear view of your content, and what to do next.</p></div>
        <Link href="/admin/solutions/new" className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-white shadow-[0_6px_18px_-6px_rgba(59,130,246,0.45)] transition-colors hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"><Plus size={18} aria-hidden="true" />New solution</Link>
      </div>
      {unavailable && <div role="alert" className="flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4"><TriangleAlert size={20} aria-hidden="true" className="shrink-0 text-amber-600" /><div><p className="text-sm font-semibold text-amber-900">We couldn’t load your workspace data.</p><p className="mt-1 text-xs text-amber-800">Workspace data is temporarily unavailable. <a href="/admin/dashboard" className="font-semibold underline underline-offset-2">Try again</a> to load the latest overview.</p></div></div>}
      <div className="grid grid-cols-3 gap-2 sm:gap-4">
        {stats.map(({ label, count, description, icon: Icon, href, color }) => <Link key={label} href={href} className="group rounded-2xl border border-slate-200/70 bg-white p-3 shadow-[0_4px_24px_-16px_rgba(15,23,42,0.18)] transition-colors hover:border-primary/30 focus-visible:outline-2 focus-visible:outline-primary sm:p-5">
          <div className="flex items-center justify-between"><span className={`flex h-10 w-10 items-center justify-center rounded-xl ${color}`}><Icon size={19} strokeWidth={1.8} aria-hidden="true" /></span><ArrowUpRight size={17} className="text-slate-300 transition-colors group-hover:text-primary" aria-hidden="true" /></div>
          <div className="mt-3 sm:mt-4"><span className="block text-[10px] font-medium text-slate-500 sm:text-xs">{label}</span><span className="mt-1 block font-display text-3xl font-semibold tracking-tight text-slate-900">{unavailable ? '—' : count}</span></div><p className="mt-2 hidden text-[11px] text-slate-400 sm:block">{description}</p>
        </Link>)}
      </div>
      <div className="grid items-start gap-5 xl:grid-cols-[minmax(0,1fr)_300px]">
        {unavailable ? <section className="rounded-2xl border border-slate-200 bg-white p-6"><h2 className="text-base font-semibold normal-case text-slate-900">Recent solutions</h2><p className="mt-2 text-sm text-slate-500">Recent pages will appear once your workspace data is available.</p></section> : <RecentSolutions solutions={recentSolutions.map((solution) => ({ ...solution, updatedAt: solution.updatedAt.toISOString() }))} />}
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-1">
          <section className="relative overflow-hidden rounded-2xl border border-primary/15 bg-gradient-to-br from-primary/8 via-white to-white p-5 sm:p-6">
            <Sparkles size={20} strokeWidth={1.8} className="mb-4 text-primary" aria-hidden="true" /><h2 className="text-base font-semibold normal-case text-slate-900">Ready for your next idea?</h2><p className="mt-2 text-xs leading-6 text-slate-500">Build a solution page with flexible sections, images, and your brand’s story.</p><Link href="/admin/solutions/new" className="mt-5 flex min-h-11 items-center justify-between rounded-xl border border-primary/15 bg-white px-3 text-xs font-semibold text-primary focus-visible:outline-2 focus-visible:outline-primary">Start a new solution <Plus size={16} aria-hidden="true" /></Link>
          </section>
          <section className="rounded-2xl border border-slate-200/70 bg-white p-5 sm:p-6">
            <h2 className="text-sm font-semibold normal-case text-slate-900">Publishing overview</h2>
            {unavailable ? <p className="mt-3 text-xs text-slate-500">Publishing status is temporarily unavailable.</p> : <>
              <div className="mt-4 flex items-baseline justify-between"><span className="text-xs text-slate-500">Published pages</span><span className="text-sm font-semibold text-slate-700">{publishedCount}<span className="font-normal text-slate-400"> / {totalCount}</span></span></div>
              <div role="progressbar" aria-label="Published solutions" aria-valuenow={publishedPercent} aria-valuemin={0} aria-valuemax={100} className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-primary" style={{ width: `${publishedPercent}%` }} /></div>
              <p className="mt-3 text-xs leading-5 text-slate-500">{draftCount ? `${draftCount} ${draftCount === 1 ? 'draft is' : 'drafts are'} waiting for your next edit.` : totalCount ? 'All your solutions are published. Nice work.' : 'Create your first solution to get started.'}</p>
              <Link href={draftCount ? '/admin/solutions?filter=draft' : '/solutions'} className="mt-4 flex min-h-10 items-center gap-2 text-xs font-semibold text-primary focus-visible:outline-2 focus-visible:outline-primary">{draftCount ? 'Continue your drafts' : 'View live solutions'}<ArrowRight size={14} aria-hidden="true" /></Link>
            </>}
            <div className="mt-4 flex items-center gap-2 border-t border-slate-100 pt-4 text-[10px] text-slate-400"><Check size={13} aria-hidden="true" />Drafts stay private until you publish.</div>
          </section>
        </div>
      </div>
    </div>
  );
}
