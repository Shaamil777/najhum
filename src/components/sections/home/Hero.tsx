"use client";

import { useState } from "react";
import Image from "next/image";
import { Pause, Play } from "lucide-react";
import { homeContent } from "@/content/home";
import { homeContainer, HomeLink } from "./HomePrimitives";

const clients = [
  { name: "DEWA", src: "/logo/client%20logos/Dubai_Electricity_and_Water_Authority_id40SLA8sS_1.png" },
  { name: "ADAA", src: "/logo/client%20logos/adaa_gov.png" },
  { name: "Thuraya", src: "/logo/client%20logos/Thuraya_logo.png" },
  { name: "Aramtec", src: "/logo/client%20logos/aramtec.png" },
  { name: "Nokia", src: "/logo/client%20logos/nokia-com-wordmark.png" },
  { name: "Space42", src: "/logo/client%20logos/space42.png" },
];

export default function Hero() {
  const { hero } = homeContent;
  const [playBackground, setPlayBackground] = useState(false);

  return (
    <section aria-labelledby="home-hero-heading" className="relative isolate w-full bg-slate-950 text-white">
      <div className="relative isolate overflow-hidden">
        <Image src="/images/hero/hero_main_tech.png" alt="" fill sizes="100vw" loading="eager" className="-z-20 object-cover object-[65%_center] opacity-60" />
        {playBackground && (
          <video autoPlay loop muted playsInline poster="/images/hero/hero_main_tech.png" aria-hidden="true" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-60">
            <source src="/videos/hero-bg-video.mp4" type="video/mp4" />
          </video>
        )}
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-slate-950 via-slate-950/75 to-slate-950/20" />
        <div className={`${homeContainer} relative flex min-h-[min(860px,90svh)] flex-col justify-center pt-32 pb-24 sm:pt-40 sm:pb-28`}>
          <p className="mb-6 max-w-xl text-xs leading-6 font-semibold tracking-[0.16em] text-blue-300 uppercase">{hero.badge}</p>
          <h1 id="home-hero-heading" className="max-w-5xl font-display text-[clamp(2.65rem,6.6vw,6.5rem)] leading-[0.98] font-bold tracking-[-0.04em] text-white uppercase">
            {hero.titlePart1}<br />
            <span className="text-blue-400">{hero.titlePart2}</span> {hero.titlePart3}
          </h1>
          <p className="mt-7 max-w-xl text-base leading-7 text-slate-300 sm:text-lg">{hero.subheadline}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <HomeLink href={hero.primaryCta.href}>{hero.primaryCta.label}</HomeLink>
            <HomeLink href={hero.secondaryCta.href} secondary light>{hero.secondaryCta.label}</HomeLink>
          </div>
          <button type="button" aria-pressed={playBackground} onClick={() => setPlayBackground(!playBackground)} className="absolute right-6 bottom-6 inline-flex min-h-11 items-center gap-2 rounded-full border border-white/20 bg-slate-950/60 px-4 text-xs text-white hover:bg-slate-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-400 sm:right-8 lg:right-12">
            {playBackground ? <Pause size={14} aria-hidden="true" /> : <Play size={14} aria-hidden="true" />}
            {playBackground ? "Stop background video" : "Play background video"}
          </button>
        </div>
      </div>
      <div className="border-t border-white/15 bg-slate-950 py-7 sm:py-9">
        <div className={`${homeContainer} flex flex-col gap-7 lg:flex-row lg:items-center lg:gap-12`}>
          <p className="shrink-0 text-center text-xs font-semibold tracking-[0.14em] text-slate-400 uppercase lg:w-40 lg:text-left">Trusted by companies worldwide</p>
          <ul aria-label="Client companies" className="grid flex-1 grid-cols-3 items-center gap-x-6 gap-y-7 sm:grid-cols-6">
            {clients.map(client => (
              <li key={client.name} className="flex justify-center">
                <Image src={client.src} alt={client.name} width={150} height={45} className="h-8 w-full max-w-32 object-contain brightness-0 invert opacity-80" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
