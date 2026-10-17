import PartnerLogos, { HOME_PARTNERS } from "@/components/shared/PartnerLogos";

export default function Partners() {
  return <section id="partners" aria-labelledby="partners-heading" className="bg-slate-50 border-y border-slate-100 py-14 sm:py-20">
    <div className="container mx-auto max-w-[1440px] px-6 lg:px-8">
      <div className="flex items-center gap-5 mb-7 sm:mb-10"><span className="h-px flex-1 bg-slate-200" /><h2 id="partners-heading" className="font-display text-2xl sm:text-3xl font-bold normal-case tracking-tight text-slate-900">Our partners</h2><span className="h-px flex-1 bg-slate-200" /></div>
      <PartnerLogos logos={HOME_PARTNERS} />
    </div>
  </section>;
}
