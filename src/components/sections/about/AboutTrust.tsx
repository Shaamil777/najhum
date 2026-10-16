"use client";

import React from "react";
import Image from "next/image";
import { aboutContent } from "@/content/about";
import { homeContent } from "@/content/home";

import { DEFAULT_CLIENT_LOGOS } from "@/components/ui/ClientMarquee";

const reversedLogos = [...DEFAULT_CLIENT_LOGOS].reverse();

export default function AboutTrust() {
  const { trust } = aboutContent;

  return (
    <section className="relative w-full py-28 md:py-36 bg-neutral-950 text-white overflow-hidden">

      {/* ── Background ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">

        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <span className="text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase text-neutral-500 block mb-4">
            {trust.badge}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black font-display text-white leading-tight tracking-tight mb-6">
            {trust.titlePart1} <br className="hidden md:block" />
            {trust.titlePart2}
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-neutral-400">
            <span>{trust.subtitleText}</span>
            {trust.industries.map((industry, idx) => (
              <span key={idx} className="flex items-center gap-2">
                <span className="font-semibold text-white">{industry}</span>
                {idx < trust.industries.length - 1 && (
                  <span className="text-primary">•</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Infinite Scrolling Logo Marquee ── */}
      <div className="relative w-full mb-20 select-none">
        {/* Left/Right fade masks */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-neutral-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-neutral-950 to-transparent z-10 pointer-events-none" />

        <style>{`
          @keyframes aboutScrollLeft {
            0% { transform: translate3d(0, 0, 0); }
            100% { transform: translate3d(-50%, 0, 0); }
          }
          @keyframes aboutScrollRight {
            0% { transform: translate3d(-50%, 0, 0); }
            100% { transform: translate3d(0, 0, 0); }
          }
        `}</style>

        {/* Row 1 - scrolls left */}
        <div className="flex mb-6 overflow-hidden">
          <div
            className="flex shrink-0 will-change-transform hover:[animation-play-state:paused]"
            style={{
              width: "max-content",
              animation: "aboutScrollLeft 35s linear infinite",
            }}
          >
            {/* Track 1 */}
            <div className="flex shrink-0 items-center gap-8 pr-8">
              {DEFAULT_CLIENT_LOGOS.map((client, idx) => (
                <div
                  key={`r1-t1-${idx}`}
                  className="flex items-center justify-center w-48 h-24 bg-white/[0.03] border border-white/[0.06] rounded-2xl px-6 shrink-0 hover:bg-white/[0.08] hover:border-white/[0.12] transition-all group"
                >
                  <img
                    src={client.src}
                    alt={client.name}
                    className={`object-contain ${client.className || "max-h-8 max-w-[125px]"} w-auto duration-300 ${
                      client.filterClass ? client.filterClass : "opacity-50 group-hover:opacity-95 transition-opacity invert"
                    }`}
                  />
                </div>
              ))}
            </div>
            {/* Track 2 */}
            <div className="flex shrink-0 items-center gap-8 pr-8" aria-hidden="true">
              {DEFAULT_CLIENT_LOGOS.map((client, idx) => (
                <div
                  key={`r1-t2-${idx}`}
                  className="flex items-center justify-center w-48 h-24 bg-white/[0.03] border border-white/[0.06] rounded-2xl px-6 shrink-0 hover:bg-white/[0.08] hover:border-white/[0.12] transition-all group"
                >
                  <img
                    src={client.src}
                    alt={client.name}
                    className={`object-contain ${client.className || "max-h-8 max-w-[125px]"} w-auto duration-300 ${
                      client.filterClass ? client.filterClass : "opacity-50 group-hover:opacity-95 transition-opacity invert"
                    }`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Row 2 - scrolls right */}
        <div className="flex overflow-hidden">
          <div
            className="flex shrink-0 will-change-transform hover:[animation-play-state:paused]"
            style={{
              width: "max-content",
              animation: "aboutScrollRight 38s linear infinite",
            }}
          >
            {/* Track 1 */}
            <div className="flex shrink-0 items-center gap-8 pr-8">
              {reversedLogos.map((client, idx) => (
                <div
                  key={`r2-t1-${idx}`}
                  className="flex items-center justify-center w-48 h-24 bg-white/[0.03] border border-white/[0.06] rounded-2xl px-6 shrink-0 hover:bg-white/[0.08] hover:border-white/[0.12] transition-all group"
                >
                  <img
                    src={client.src}
                    alt={client.name}
                    className={`object-contain ${client.className || "max-h-8 max-w-[125px]"} w-auto duration-300 ${
                      client.filterClass ? client.filterClass : "opacity-50 group-hover:opacity-95 transition-opacity invert"
                    }`}
                  />
                </div>
              ))}
            </div>
            {/* Track 2 */}
            <div className="flex shrink-0 items-center gap-8 pr-8" aria-hidden="true">
              {reversedLogos.map((client, idx) => (
                <div
                  key={`r2-t2-${idx}`}
                  className="flex items-center justify-center w-48 h-24 bg-white/[0.03] border border-white/[0.06] rounded-2xl px-6 shrink-0 hover:bg-white/[0.08] hover:border-white/[0.12] transition-all group"
                >
                  <img
                    src={client.src}
                    alt={client.name}
                    className={`object-contain ${client.className || "max-h-8 max-w-[125px]"} w-auto duration-300 ${
                      client.filterClass ? client.filterClass : "opacity-50 group-hover:opacity-95 transition-opacity invert"
                    }`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Quote Block ── */}
      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <div className="relative text-center py-12 border-t border-b border-white/10">
          <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-neutral-950 flex items-center justify-center">
            <span className="text-3xl text-primary font-display">&ldquo;</span>
          </div>
          <p className="text-xl md:text-2xl lg:text-3xl font-medium text-neutral-200 leading-relaxed italic">
            {trust.quote}
          </p>
        </div>
      </div>
    </section>
  );
}

