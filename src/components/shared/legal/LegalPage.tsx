import Link from "next/link";
import { ArrowDownToLine, ArrowUpRight, ShieldCheck } from "lucide-react";
import type { LegalDocument } from "@/content/legal";

export default function LegalPage({ document }: { document: LegalDocument }) {
  return <div className="w-full bg-white text-slate-900 pt-32 sm:pt-40 pb-20">
    <div className="mx-auto max-w-6xl px-5 sm:px-8">
      <header className="border-b border-slate-200 pb-10 sm:pb-14">
        <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[.18em] text-primary"><ShieldCheck size={16} />Najhum Technologies LLC</span>
        <h1 className="mt-5 text-4xl sm:text-6xl font-bold tracking-tight leading-tight">{document.title}</h1>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 text-sm text-slate-500">
          <p>Last updated: <time dateTime="2026-10-17">{document.updated}</time></p>
          <a href={document.pdf} download className="inline-flex min-h-11 items-center gap-2 rounded-full border border-slate-200 px-5 text-slate-700 hover:border-primary hover:text-primary"><ArrowDownToLine size={16} />Download original PDF</a>
        </div>
      </header>
      <div className="grid gap-10 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-16 pt-10 sm:pt-14">
        <aside><nav aria-label={`${document.title} contents`} className="lg:sticky lg:top-28 rounded-2xl border border-slate-200 bg-slate-50/60 p-5">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">On this page</p>
          <ol className="space-y-3 text-sm text-slate-600">{document.sections.map((section,index)=><li key={section.title}><a className="hover:text-primary focus-visible:outline-primary" href={`#section-${index+1}`}><span className="mr-2 text-slate-400">{String(index+1).padStart(2,'0')}</span>{section.title}</a></li>)}</ol>
          <Link href={document.slug==='privacy-policy'?'/terms-and-conditions':'/privacy-policy'} className="mt-6 pt-5 border-t border-slate-200 flex items-center justify-between text-sm font-semibold text-primary">{document.slug==='privacy-policy'?'Terms & Conditions':'Privacy Policy'}<ArrowUpRight size={16}/></Link>
        </nav></aside>
        <article className="min-w-0 space-y-10 sm:space-y-12">
          {document.sections.map((section,index)=><section id={`section-${index+1}`} key={section.title} className="scroll-mt-32">
            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight mb-4"><span className="text-primary mr-2">{index+1}.</span>{section.title}</h2>
            {section.table && <div className="mb-5 overflow-x-auto rounded-xl border border-slate-200"><table className="w-full text-left text-sm leading-relaxed"><thead className="bg-blue-50 text-slate-800"><tr>{section.table.columns.map(column=><th scope="col" key={column} className="px-4 py-3 font-semibold">{column}</th>)}</tr></thead><tbody>{section.table.rows.map((row,i)=><tr key={i} className="border-t border-slate-200 align-top">{row.map((cell,j)=><td key={j} className={`px-4 py-4 ${j===0?'font-medium text-slate-800':'text-slate-600'}`}>{cell}</td>)}</tr>)}</tbody></table></div>}
            <div className="text-[15px] sm:text-base leading-[1.85] text-slate-600 space-y-4">
              {section.paragraphs.map((paragraph,i)=><div key={paragraph}><p>{paragraph}</p>{i===0 && section.list && <ul className="mt-4 list-disc pl-5 space-y-2 marker:text-primary">{section.list.map(item=><li key={item}>{item}</li>)}</ul>}</div>)}
            </div>
          </section>)}
        </article>
      </div>
    </div>
  </div>;
}
