"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Wifi, Zap, Sprout } from "lucide-react";
import { aboutContent } from "@/content/about";

export default function AboutPlatform() {
  const { platform } = aboutContent;

  // Unified Najhum Blue card treatment, with subtle brand extension accents
  const styleMapping = [
    {
      bgImage: "/images/about/iotrics_bg.jpg",
      accentLine: "bg-blue-600/70",
      accentIconColor: "text-blue-600",
      icon: Wifi,
    },
    {
      bgImage: "/images/about/evoltics_bg.jpg",
      accentLine: "bg-sky-500/70",
      accentIconColor: "text-sky-600",
      icon: Zap,
    },
    {
      bgImage: "/images/about/cropifai_bg.jpg",
      accentLine: "bg-cyan-500/70",
      accentIconColor: "text-cyan-600",
      icon: Sprout,
    },
  ];

  const platforms = platform.platforms.map((p, idx) => ({
    ...p,
    ...styleMapping[idx % styleMapping.length]
  }));

  return (
    <section id="technology" className="relative w-full py-20 md:py-28 bg-[#fbfcfd] text-slate-900 overflow-hidden scroll-mt-16">
      {/* Subtle Ambient Decorative Arcs */}
      <div className="absolute -top-48 -left-48 w-[600px] h-[600px] rounded-full border border-blue-100/50 pointer-events-none" />
      <div className="absolute -top-64 -right-48 w-[700px] h-[700px] rounded-full border border-blue-100/40 pointer-events-none" />

      <div className="container mx-auto px-6 max-w-[1440px] relative z-10">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14">
          <div className="flex items-center justify-center gap-3 mb-3.5">
            <div className="w-10 h-px bg-slate-300" />
            <span className="text-[11px] sm:text-xs font-bold tracking-[0.25em] uppercase text-slate-500">
              {platform.badge}
            </span>
            <div className="w-10 h-px bg-slate-300" />
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight tracking-tight mb-3.5 normal-case">
            {platform.titlePart1} <span className="text-primary">{platform.titlePart2}</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-500 max-w-2xl mx-auto leading-relaxed">
            {platform.description}
          </p>
        </div>

        {/* Three Platform Cards - Unified Najhum Blue Card Treatment */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 xl:gap-8">
          {platforms.map((platform, idx) => {
            const Icon = platform.icon;
            return (
              <Link
                key={idx}
                href={platform.href}
                className="group relative bg-[#edf4ff] border border-blue-100 rounded-[1.75rem] p-6 sm:p-7 xl:p-8 flex flex-col justify-between min-h-[250px] sm:min-h-[260px] lg:min-h-[260px] xl:min-h-[270px] shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden"
              >
                {/* Background Image with smooth gradient fade */}
                <div className="absolute top-0 right-0 bottom-0 w-[55%] sm:w-[58%] lg:w-[60%] pointer-events-none overflow-hidden rounded-r-[1.75rem]">
                  <Image
                    src={platform.bgImage}
                    alt={platform.name}
                    fill
                    className="object-cover object-right group-hover:scale-105 transition-transform duration-700 ease-out"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#edf4ff] via-[#edf4ff]/85 to-transparent" />
                </div>

                {/* Decorative Platform Watermark Icon */}
                <div className="absolute top-6 right-6 z-10 opacity-30 pointer-events-none">
                  <Icon className={`w-7 h-7 ${platform.accentIconColor}`} strokeWidth={2.2} />
                </div>

                {/* Card Content Top */}
                <div className="relative z-10 max-w-[230px] sm:max-w-[250px] lg:max-w-[235px] xl:max-w-[260px]">
                  {/* Core Number Label with Brand Extension Accent Line */}
                  <div className="flex items-center gap-2.5 mb-3.5 sm:mb-4">
                    <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.2em] uppercase text-slate-500">
                      {platform.code}
                    </span>
                    <div className={`w-6 sm:w-8 h-0.5 rounded-full ${platform.accentLine}`} />
                  </div>

                  {/* Platform Name */}
                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-2 tracking-tight">
                    {platform.name}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">
                    {platform.description}
                  </p>
                </div>

                {/* Card CTA Bottom - All using Najhum Blue */}
                <div className="relative z-10 pt-5 sm:pt-6 mt-auto flex items-center">
                  <div className="inline-flex items-center gap-2 text-xs sm:text-[13px] font-bold text-primary">
                    <span>Explore {platform.name}</span>
                    <div className="w-6 h-6 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white flex items-center justify-center transition-all duration-300 group-hover:translate-x-1">
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}
