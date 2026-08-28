"use client";

import React from "react";
import Image from "next/image";

const clients = [
  { name: "DEWA", src: "/logo/client%20logos/Dubai_Electricity_and_Water_Authority_id40SLA8sS_1.png" },
  { name: "Thuraya", src: "/logo/client%20logos/Thuraya_logo.png" },
  { name: "Aramtec", src: "/logo/client%20logos/aramtec.png" },
  { name: "Yahsat", src: "/logo/client%20logos/idsuguLgbe.png" },
  { name: "Nokia", src: "/logo/client%20logos/nokia-com-wordmark.png" },
  { name: "Space42", src: "/logo/client%20logos/space42.png" },
];

const industries = [
  "Energy",
  "Telecommunications",
  "Smart Buildings",
  "Commercial Real Estate",
  "Industrial Facilities",
];

export default function AboutTrust() {
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
            Trusted Across Industries
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black font-display text-white leading-tight tracking-tight mb-6">
            Powering Intelligent Infrastructure <br className="hidden md:block" />
            for Leading Organizations
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-neutral-400">
            <span>Supporting organizations across</span>
            {industries.map((industry, idx) => (
              <span key={idx} className="flex items-center gap-2">
                <span className="font-semibold text-white">{industry}</span>
                {idx < industries.length - 1 && (
                  <span className="text-primary">•</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Infinite Scrolling Logo Marquee ── */}
      <div className="relative w-full mb-20">
        {/* Left/Right fade masks */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-neutral-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-neutral-950 to-transparent z-10 pointer-events-none" />

        {/* Row 1 - scrolls left */}
        <div className="flex mb-6 overflow-hidden">
          <div className="flex shrink-0 animate-[scroll-left_30s_linear_infinite] gap-8">
            {[...clients, ...clients, ...clients].map((client, idx) => (
              <div
                key={idx}
                className="flex items-center justify-center w-44 h-24 bg-white/[0.03] border border-white/[0.06] rounded-2xl px-6 shrink-0 hover:bg-white/[0.08] hover:border-white/[0.12] transition-all group"
              >
                <Image
                  src={client.src}
                  alt={client.name}
                  width={120}
                  height={50}
                  className="object-contain max-h-10 w-auto opacity-40 group-hover:opacity-90 transition-opacity duration-300 invert"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 - scrolls right */}
        <div className="flex overflow-hidden">
          <div className="flex shrink-0 animate-[scroll-right_35s_linear_infinite] gap-8">
            {[...clients.slice().reverse(), ...clients.slice().reverse(), ...clients.slice().reverse()].map((client, idx) => (
              <div
                key={idx}
                className="flex items-center justify-center w-44 h-24 bg-white/[0.03] border border-white/[0.06] rounded-2xl px-6 shrink-0 hover:bg-white/[0.08] hover:border-white/[0.12] transition-all group"
              >
                <Image
                  src={client.src}
                  alt={client.name}
                  width={120}
                  height={50}
                  className="object-contain max-h-10 w-auto opacity-40 group-hover:opacity-90 transition-opacity duration-300 invert"
                />
              </div>
            ))}
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
            From enterprise campuses to national infrastructure, Najhum delivers intelligent solutions that scale.
          </p>
        </div>
      </div>

      {/* ── Keyframe Styles ── */}
      <style jsx>{`
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-50% - 1rem)); }
        }
        @keyframes scroll-right {
          0% { transform: translateX(calc(-50% - 1rem)); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </section>
  );
}

