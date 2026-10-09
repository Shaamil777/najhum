"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, FileText, Search, X } from "lucide-react";

interface RecentSolution { id: string; title: string; slug: string; isDraft: boolean; updatedAt: string; }
export default function RecentSolutions({ solutions }: { solutions: RecentSolution[] }) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const visible = solutions.filter((solution) => (status === "all" || (status === "draft" ? solution.isDraft : !solution.isDraft)) && (solution.title + " " + solution.slug).toLowerCase().includes(search.trim().toLowerCase()));
  return (
    <section aria-labelledby="recent-heading" className="overflow-hidden rounded-2xl border border-slate-200/70 bg-white shadow-[0_4px_24px_-16px_rgba(15,23,42,0.18)]">
      <div className="flex flex-wrap items-start justify-between gap-3 px-5 pt-5 sm:px-6 sm:pt-6">
        <div><h2 id="recent-heading" className="text-base font-semibold normal-case text-slate-900">Pick up where you left off</h2><p className="mt-1 text-xs text-slate-500">Your five most recently updated solutions.</p></div>
        <Link href="/admin/solutions" className="flex min-h-10 items-center gap-1.5 text-xs font-semibold text-primary focus-visible:outline-2 focus-visible:outline-primary">View all <ArrowRight size={14} aria-hidden="true" /></Link>
      </div>
      {solutions.length > 0 ? <>
        <div className="flex flex-col gap-3 px-5 py-5 sm:flex-row sm:px-6">
          <div className="relative min-w-0 flex-1"><Search size={16} aria-hidden="true" className="pointer-events-none absolute top-3.5 left-3 text-slate-400" /><input type="search" value={search} onChange={(e) => setSearch(e.target.value)} aria-label="Search recent solutions" placeholder="Search recent solutions..." className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50/60 pr-3 pl-9 text-sm outline-none placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/10" /></div>
          <select value={status} onChange={(e) => setStatus(e.target.value)} aria-label="Filter recent solutions by status" className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-xs font-medium text-slate-600 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10"><option value="all">All statuses</option><option value="published">Published</option><option value="draft">Drafts</option></select>
        </div>
        <div className="hidden grid-cols-[minmax(0,1fr)_110px_90px] gap-4 border-y border-slate-100 bg-slate-50/60 px-6 py-3 text-[10px] font-semibold tracking-wide text-slate-400 uppercase sm:grid"><span>Solution</span><span>Status</span><span className="text-right">Actions</span></div>
        <ul className="divide-y divide-slate-100">
          {visible.map((solution) => <li key={solution.id} className="px-5 py-4 transition-colors hover:bg-slate-50/50 sm:px-6">
            <div className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-[minmax(0,1fr)_110px_90px] sm:items-center sm:gap-4">
              <Link href={`/admin/solutions/${solution.id}/edit`} className="group flex min-w-0 items-center gap-3 rounded-lg focus-visible:outline-2 focus-visible:outline-primary">
                <span aria-hidden="true" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-100 bg-slate-50 text-slate-400 group-hover:border-primary/15 group-hover:bg-primary/5 group-hover:text-primary"><FileText size={18} strokeWidth={1.6} /></span>
                <span className="min-w-0"><span className="block truncate text-sm font-semibold text-slate-700 group-hover:text-primary">{solution.title}</span><span className="mt-1 block truncate text-[11px] text-slate-400">Updated {new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "Asia/Calcutta" }).format(new Date(solution.updatedAt))}</span></span>
              </Link>
              <div className="flex items-center justify-between gap-3 sm:contents">
                <span className={`inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold ${solution.isDraft ? "bg-amber-50 text-amber-700" : "bg-emerald-50 text-emerald-700"}`}><span aria-hidden="true" className={`h-1.5 w-1.5 rounded-full ${solution.isDraft ? "bg-amber-500" : "bg-emerald-500"}`} />{solution.isDraft ? "Draft" : "Published"}</span>
                <div className="flex items-center justify-end gap-1">
                  {!solution.isDraft && <Link href={`/solutions/${solution.slug}`} aria-label={`Preview ${solution.title}`} title="Preview published page" className="flex h-11 w-11 items-center justify-center rounded-xl text-slate-400 hover:bg-primary/5 hover:text-primary focus-visible:outline-2 focus-visible:outline-primary"><ArrowUpRight size={17} /></Link>}
                  <Link href={`/admin/solutions/${solution.id}/edit`} aria-label={`Edit ${solution.title}`} title="Edit solution" className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-50 text-slate-600 hover:bg-primary/10 hover:text-primary focus-visible:outline-2 focus-visible:outline-primary"><ArrowRight size={17} /></Link>
                </div>
              </div>
            </div>
          </li>)}
        </ul>
        {visible.length === 0 && <div role="status" className="px-6 py-10 text-center"><p className="text-sm font-medium text-slate-600">No matching recent solutions.</p><button onClick={() => { setSearch(""); setStatus("all"); }} className="mx-auto mt-3 flex min-h-11 items-center gap-2 rounded-xl px-3 text-xs font-semibold text-primary focus-visible:outline-2 focus-visible:outline-primary"><X size={14} aria-hidden="true" />Clear filters</button></div>}
      </> : <div className="px-6 py-12 text-center"><div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/7 text-primary"><FileText size={22} aria-hidden="true" /></div><p className="text-sm font-semibold text-slate-700">Your first solution starts here</p><p className="mt-1 text-xs text-slate-500">Create a page, add your content, then publish when ready.</p><Link href="/admin/solutions/new" className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-xl bg-primary px-4 text-xs font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">Create a solution <ArrowRight size={15} aria-hidden="true" /></Link></div>}
    </section>
  );
}
