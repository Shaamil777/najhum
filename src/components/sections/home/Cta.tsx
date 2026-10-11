import { homeContent } from "@/content/home";
import { homeContainer, HomeLink } from "./HomePrimitives";

export default function Cta() {
  const { cta } = homeContent;
  return (
    <section aria-labelledby="home-cta-heading" className="relative isolate overflow-hidden bg-slate-950 py-16 sm:py-20 lg:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:64px_64px]" />
      <div className={`${homeContainer} grid items-center gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-16`}>
        <div>
          <p className="mb-6 text-xs font-semibold tracking-[0.16em] text-blue-300 uppercase">Your next step</p>
          <h2 id="home-cta-heading" className="max-w-3xl font-display text-[clamp(2.5rem,4.5vw,4.5rem)] leading-[1.05] font-bold tracking-[-0.035em] text-white uppercase">{cta.headline}</h2>
        </div>
        <div className="max-w-md lg:ml-auto">
          <p className="mb-8 text-base leading-7 text-slate-300">{cta.subheadline}</p>
          <div className="flex flex-wrap gap-3">
            <HomeLink href={cta.primaryCta.href}>{cta.primaryCta.label}</HomeLink>
            <HomeLink href={cta.secondaryCta.href} secondary light>{cta.secondaryCta.label}</HomeLink>
          </div>
        </div>
      </div>
    </section>
  );
}
