"use client";

import AccentText from "@/components/ui/AccentText";
import HomePlatformCards from "./HomePlatformCards";
import React, { useRef, useState } from "react";
import { Poppins } from "next/font/google";
import { homeContent } from "@/content/home";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins"
});

export default function Platforms() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [expandedSteps, setExpandedSteps] = useState<string[]>([]);


  return (
    <section
      className={`relative w-full pt-16 sm:pt-24 lg:pt-32 pb-0 text-zinc-900 ${poppins.variable} ${poppins.className} z-10`}
      style={{
        '--font-display': 'var(--font-poppins)',
        '--font-sans': 'var(--font-poppins)'
      } as React.CSSProperties}
    >
      <div className="max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12" ref={containerRef}>

        {/* Panel Layout Grid Wrapper with Header */}
        <div className="bg-[#2a2a2a] relative p-3 sm:p-4 rounded-[1.5rem] lg:rounded-[2rem] shadow-2xl w-full flex flex-col overflow-hidden border border-zinc-700">

          {/* Subtle Dotted Grid Background */}
          <div className="absolute inset-0 z-0 opacity-20 pointer-events-none bg-[radial-gradient(#404040_1px,transparent_1px)] [background-size:20px_20px]" />

          {/* Header */}
          <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between pt-12 pb-16 sm:pt-16 sm:pb-20 lg:pt-20 lg:pb-24 px-4 lg:px-8 gap-6 md:gap-12">
            <div className="flex items-center gap-4 shrink-0 mb-2 md:mb-2">
              <span className="w-10 sm:w-16 h-[2px] bg-[#3B82F6] block"></span>
              <p className="text-xs sm:text-sm font-bold text-zinc-400 uppercase tracking-[0.2em]">
                {homeContent.platforms.label}
              </p>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-6xl font-bold tracking-tighter text-white leading-[1.05] text-left md:text-right max-w-[20ch]">
              <AccentText text={homeContent.platforms.title} accent="high performance" dark />
            </h2>
          </div>

          {/* Card visuals are isolated from the existing section layout and scrolling. */}
          <HomePlatformCards />

          {/* 3C Methodology Process Section */}
          <div className="relative z-10 mt-12 pt-16 pb-8 border-t border-zinc-700/50 flex flex-col px-4 lg:px-8">

            {/* Massive Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
              <div className="flex flex-col max-w-2xl">
                <h3 className="text-white text-3xl sm:text-4xl lg:text-6xl font-display font-bold tracking-tighter leading-tight uppercase">
                  The <span className="text-blue-400">3C</span> Methodology
                </h3>
              </div>
              <p className="text-zinc-400 text-lg max-w-md leading-relaxed">
                A unified methodology that bridges the physical and virtual worlds, turning environmental data into operational intelligence.
              </p>
            </div>

            {/* Aurora Beam Cards Grid */}
            <div className="relative z-10 mt-8">
              {/* Connecting Aurora Line (Desktop Only) */}
              <div className="absolute top-[45%] left-8 right-8 h-[5px] -translate-y-1/2 hidden md:block z-0 bg-zinc-900 rounded-full overflow-hidden shadow-[0_0_20px_rgba(59,130,246,0.8)] border border-zinc-800/50">
                <div className="w-full h-full bg-gradient-to-r from-transparent via-[#60a5fa] to-transparent opacity-100 animate-pulse" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start gap-6 lg:gap-8 relative z-10">
                {[
                  {
                    step: "01",
                    title: "Collect",
                    desc: "Industrial-grade sensors capture what is actually happening on site: temperature, humidity and air quality; energy use, water flow, pressure and vibration; door access, motion and personnel safety.",
                    metric: "ENVIRONMENT · INFRASTRUCTURE · SAFETY"
                  },
                  {
                    step: "02",
                    title: "Connect",
                    desc: "A connectivity layer built so data reaches the platform from remote and off-grid sites. Cellular and fibre where bandwidth allows, LPWAN for long-range low-power coverage across large sites, satellite and BLE where neither reaches.",
                    metric: "CELLULAR · LPWAN · SATELLITE"
                  },
                  {
                    step: "03",
                    title: "Collaborate",
                    desc: "Data is processed and visualised on the secure cloud platform: live dashboards for situational awareness, automated triggers that flag anomalies and threshold breaches before they become failures, and historical modelling for maintenance and resource planning.",
                    metric: "DASHBOARDS · TRIGGERS · PREDICTIVE"
                  }
                ].map((c, i) => {
                  const expanded = expandedSteps.includes(c.step);
                  return (
                  <div
                    key={c.step}
                    className={`relative p-[5px] rounded-[1.75rem] overflow-clip flex shadow-2xl ${i === 2 ? 'md:col-span-2 lg:col-span-1' : ''}`}
                  >
                    {/* Rotating Aurora Border */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250%] aspect-square animate-spin [animation-duration:4s] bg-[conic-gradient(from_0deg,transparent_0%,transparent_35%,#3B82F6_45%,#93c5fd_50%,transparent_55%,transparent_100%)] opacity-100" />

                    {/* Static Border Fallback */}
                    <div className="absolute inset-0 bg-[#2a2a2a] rounded-[1.75rem]" />

                    {/* Inner Card */}
                    <div className="relative z-10 flex flex-col flex-grow bg-[#000000] rounded-[1.5rem] p-6 sm:p-7 overflow-clip">
                      {/* Step Number */}
                      <span className="text-5xl sm:text-6xl font-display font-black text-transparent bg-clip-text bg-gradient-to-b from-zinc-700 to-zinc-900 mb-4 block">
                        {c.step}
                      </span>

                      {/* Content */}
                      <h4 className="text-2xl sm:text-3xl font-bold text-white mb-3 lg:mb-4 uppercase">{c.title}</h4>
                      <p id={`methodology-description-${c.step}`} className={`text-zinc-400 text-sm sm:text-base leading-relaxed ${expanded ? "" : "line-clamp-3"}`}>
                        {c.desc}
                      </p>
                      <button
                        type="button"
                        aria-expanded={expanded}
                        aria-controls={`methodology-description-${c.step}`}
                        aria-label={`${expanded ? "Read less" : "Read more"} about ${c.title}`}
                        onClick={() => setExpandedSteps((steps) => expanded ? steps.filter((step) => step !== c.step) : [...steps, c.step])}
                        className="self-start inline-flex items-center gap-1.5 mt-3 mb-5 py-1 text-xs font-semibold text-blue-400 hover:text-blue-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-400 rounded-sm cursor-pointer transition-colors"
                      >
                        {expanded ? "Read less" : "Read more"}
                        <span aria-hidden="true">{expanded ? "−" : "+"}</span>
                      </button>

                      {/* Metric Footer */}
                      <div className="mt-auto pt-4 border-t border-zinc-800/80 flex items-center gap-2.5 min-w-0">
                        <div className="w-2 h-2 rounded-full bg-[#3B82F6] shadow-[0_0_15px_rgba(59,130,246,1)] animate-pulse shrink-0" />
                        <span className="text-[10px] sm:text-[11px] md:text-xs lg:text-[11px] xl:text-xs 2xl:text-sm font-bold text-zinc-300 uppercase tracking-wide leading-relaxed">
                          {c.metric}
                        </span>
                      </div>
                    </div>
                  </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

