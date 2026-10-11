import { Check, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { homeContent } from "@/content/home";
import { homeContainer, homeHeading, HomeEyebrow } from "./HomePrimitives";

export default function WhyChoose() {
  const { whyChoose } = homeContent;
  return (
    <section aria-labelledby="home-advantage-heading" className="border-y border-slate-200 bg-slate-50 py-16 sm:py-20 lg:py-28">
      <div className={homeContainer}>
        <HomeEyebrow>{whyChoose.label}</HomeEyebrow>
        <div className="mb-10 grid gap-6 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
          <h2 id="home-advantage-heading" className={homeHeading}>Less fragmentation.<br /><span className="text-primary">More visibility.</span></h2>
          <p className="max-w-md text-base leading-7 text-slate-600 lg:ml-auto lg:self-end">Bring monitoring, integration, and maintenance into a connected workflow. Here’s how Najhum helps your team work with better information.</p>
        </div>
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div aria-hidden="true" className="hidden grid-cols-[1fr_1.25fr_1.25fr] gap-8 border-b border-slate-200 bg-slate-100 px-8 py-5 text-xs font-semibold tracking-wide text-slate-500 uppercase md:grid">
            <span>Capability</span><span>{whyChoose.competitorLabel}</span><span className="text-blue-700">{whyChoose.najhumLabel}</span>
          </div>
          <dl className="divide-y divide-slate-200">
            {whyChoose.features.map(feature => (
              <div key={feature.name} className="grid gap-4 p-6 md:grid-cols-[1fr_1.25fr_1.25fr] md:gap-8 md:px-8">
                <dt className="font-display text-lg font-semibold text-slate-950">{feature.name}</dt>
                <dd className="text-sm leading-6 text-slate-500"><span className="mb-1 block text-xs font-semibold text-slate-500 md:sr-only">Traditional systems</span>{feature.competitor}</dd>
                <dd className="flex items-start gap-3 text-sm leading-6 text-slate-700"><Check size={18} aria-hidden="true" className="mt-1 shrink-0 text-blue-600" /><div><span className="mb-1 block text-xs font-semibold text-blue-700 md:sr-only">Najhum platform</span>{feature.najhum}</div></dd>
              </div>
            ))}
          </dl>
        </div>
        <Link href="/contact" className="mt-8 inline-flex min-h-12 items-center gap-3 rounded-sm text-sm font-semibold text-blue-700 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500">Discuss your integration requirements <ArrowUpRight size={18} aria-hidden="true" /></Link>
      </div>
    </section>
  );
}
