"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Wifi, Sprout, Droplets, BarChart3 } from "lucide-react";

export default function AboutPlatform() {
  const platforms = [
    {
      code: "CORE 01",
      name: "IOTRICS",
      description:
        "Advanced IoT asset management and sensor integration for real-time visibility across global supply chains.",
      href: "/platforms/iotrics",
      bgImage: "/images/about/iotrics_bg.jpg",
      cardBg: "bg-[#edf4ff]",
      borderColor: "border-blue-100",
      gradientOverlay: "from-[#edf4ff] via-[#edf4ff]/85 to-transparent",
      accentColor: "text-primary",
      ctaBg: "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white",
      badgeType: "iotrics",
    },
    {
      code: "CORE 02",
      name: "EVOLTICS",
      description:
        "Energy management and optimization platform designed for smart cities and high-consumption industrial plants.",
      href: "/platforms/evoltics",
      bgImage: "/images/about/evoltics_bg.jpg",
      cardBg: "bg-[#fffcf5]",
      borderColor: "border-amber-100",
      gradientOverlay: "from-[#fffcf5] via-[#fffcf5]/85 to-transparent",
      accentColor: "text-amber-600",
      ctaBg: "bg-amber-100 text-amber-600 group-hover:bg-amber-600 group-hover:text-white",
      badgeType: "evoltics",
    },
    {
      code: "CORE 03",
      name: "CROPIFAI",
      description:
        "AI-driven agricultural intelligence focused on soil health, yield optimization, and resource sustainability.",
      href: "/platforms/cropifai",
      bgImage: "/images/about/cropifai_bg.jpg",
      cardBg: "bg-[#f2fcf5]",
      borderColor: "border-emerald-100",
      gradientOverlay: "from-[#f2fcf5] via-[#f2fcf5]/85 to-transparent",
      accentColor: "text-emerald-600",
      ctaBg: "bg-emerald-100 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white",
      badgeType: "cropifai",
    },
  ];

  return (
    <section className="relative w-full py-20 md:py-28 bg-[#fbfcfd] text-slate-900 overflow-hidden">
      {/* Subtle Ambient Decorative Arcs */}
      <div className="absolute -top-48 -left-48 w-[600px] h-[600px] rounded-full border border-blue-100/50 pointer-events-none" />
      <div className="absolute -top-64 -right-48 w-[700px] h-[700px] rounded-full border border-blue-100/40 pointer-events-none" />

      <div className="container mx-auto px-6 max-w-[1440px] relative z-10">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14">
          <div className="flex items-center justify-center gap-3 mb-3.5">
            <div className="w-10 h-px bg-slate-300" />
            <span className="text-[11px] sm:text-xs font-bold tracking-[0.25em] uppercase text-slate-500">
              The Architecture
            </span>
            <div className="w-10 h-px bg-slate-300" />
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight tracking-tight mb-3.5 normal-case">
            One Group. <span className="text-primary">Three Intelligent Platforms.</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Purpose-built platforms addressing critical global challenges through
            intelligent technology, real-world impact, and long-term sustainability.
          </p>
        </div>

        {/* Three Platform Cards - Wide Horizontal Rectangle Proportions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 xl:gap-8">
          {platforms.map((platform, idx) => (
            <Link
              key={idx}
              href={platform.href}
              className={`group relative ${platform.cardBg} border ${platform.borderColor} rounded-[1.75rem] p-6 sm:p-7 xl:p-8 flex flex-col justify-between min-h-[250px] sm:min-h-[260px] lg:min-h-[260px] xl:min-h-[270px] shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden`}
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
                <div className={`absolute inset-0 bg-gradient-to-r ${platform.gradientOverlay}`} />
              </div>

              {/* Decorative Card Badge Overlays */}
              {platform.badgeType === "iotrics" && (
                <div className="absolute top-6 right-6 z-10 opacity-30 pointer-events-none">
                  <Wifi className="w-7 h-7 text-blue-600" strokeWidth={2.2} />
                </div>
              )}

              {platform.badgeType === "cropifai" && (
                <div className="absolute top-5 right-5 z-10 flex flex-col gap-1.5 opacity-80 pointer-events-none">
                  <div className="w-6 h-6 rounded-full bg-white/90 backdrop-blur-xs border border-white/80 shadow-xs flex items-center justify-center text-emerald-600">
                    <Sprout className="w-3 h-3" />
                  </div>
                  <div className="w-6 h-6 rounded-full bg-white/90 backdrop-blur-xs border border-white/80 shadow-xs flex items-center justify-center text-emerald-600 translate-x-2.5">
                    <Droplets className="w-3 h-3" />
                  </div>
                  <div className="w-6 h-6 rounded-full bg-white/90 backdrop-blur-xs border border-white/80 shadow-xs flex items-center justify-center text-emerald-600">
                    <BarChart3 className="w-3 h-3" />
                  </div>
                </div>
              )}

              {/* Card Content Top */}
              <div className="relative z-10 max-w-[230px] sm:max-w-[250px] lg:max-w-[235px] xl:max-w-[260px]">
                {/* Core Number Label */}
                <div className="flex items-center gap-2.5 mb-3.5 sm:mb-4">
                  <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.2em] uppercase text-slate-500">
                    {platform.code}
                  </span>
                  <div className="w-6 sm:w-8 h-px bg-slate-400/50" />
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

              {/* Card CTA Bottom */}
              <div className="relative z-10 pt-5 sm:pt-6 mt-auto flex items-center">
                <div className={`inline-flex items-center gap-2 text-xs sm:text-[13px] font-bold ${platform.accentColor}`}>
                  <span>Explore {platform.name}</span>
                  <div className={`w-6 h-6 rounded-full ${platform.ctaBg} flex items-center justify-center transition-all duration-300 group-hover:translate-x-1`}>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom Closing Statement */}
        <div className="flex items-center justify-center gap-4 mt-16 sm:mt-20">
          <div className="w-12 sm:w-16 h-px bg-slate-200" />
          <span className="text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase text-slate-400 text-center">
            Technology for a More Resilient Tomorrow
          </span>
          <div className="w-12 sm:w-16 h-px bg-slate-200" />
        </div>
      </div>
    </section>
  );
}
