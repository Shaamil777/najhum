import React from "react";
import Link from "next/link";
import { ArrowUpRight, Radio, Zap, Sprout } from "lucide-react";

export default function AboutPlatform() {
  const platforms = [
    {
      code: "CORE_01",
      name: "IoTRICs",
      tag: "Asset Tracking",
      description: "Advanced IoT asset management and sensor integration for real-time visibility across global supply chains.",
      href: "/platforms/iotrics",
      icon: Radio,
      accentColor: "text-blue-500",
      accentBg: "bg-blue-500",
      accentBgLight: "bg-blue-500/10",
      borderHover: "hover:border-blue-500/40",
      glowColor: "group-hover:shadow-blue-500/10",
    },
    {
      code: "CORE_02",
      name: "EVOLTICS",
      tag: "Power Efficiency",
      description: "Energy management and optimization platform designed for smart cities and high-consumption industrial plants.",
      href: "/platforms/evoltics",
      icon: Zap,
      accentColor: "text-amber-500",
      accentBg: "bg-amber-500",
      accentBgLight: "bg-amber-500/10",
      borderHover: "hover:border-amber-500/40",
      glowColor: "group-hover:shadow-amber-500/10",
    },
    {
      code: "CORE_03",
      name: "CropifAI",
      tag: "Precision Ag",
      description: "AI-driven agricultural intelligence focused on soil health, yield optimization, and resource sustainability.",
      href: "/platforms/cropifai",
      icon: Sprout,
      accentColor: "text-emerald-500",
      accentBg: "bg-emerald-500",
      accentBgLight: "bg-emerald-500/10",
      borderHover: "hover:border-emerald-500/40",
      glowColor: "group-hover:shadow-emerald-500/10",
    },
  ];

  return (
    <section className="relative w-full py-24 md:py-32 bg-neutral-950 text-white overflow-hidden">
      {/* Background dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#fff 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">

        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <span className="text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase text-neutral-500 block mb-4">
            The Architecture
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black font-display text-white leading-tight tracking-tight">
            One Group. Three Intelligent Platforms.
          </h2>
        </div>

        {/* Platform Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {platforms.map((platform, idx) => {
            const Icon = platform.icon;
            return (
              <Link
                key={idx}
                href={platform.href}
                className={`group relative bg-white/[0.03] border border-white/10 ${platform.borderHover} rounded-3xl p-8 lg:p-10 flex flex-col justify-between transition-all duration-500 hover:bg-white/[0.06] hover:shadow-2xl ${platform.glowColor} hover:-translate-y-1 overflow-hidden`}
              >
                {/* Glow on hover */}
                <div className={`absolute -top-20 -right-20 w-40 h-40 ${platform.accentBgLight} rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

                <div className="relative z-10">
                  {/* Code label */}
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-500">
                      {platform.code}
                    </span>
                    <div className={`w-10 h-10 rounded-xl ${platform.accentBgLight} flex items-center justify-center ${platform.accentColor} group-hover:scale-110 transition-transform`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Name */}
                  <h3 className="text-3xl lg:text-4xl font-black font-display text-white mb-4 tracking-tight">
                    {platform.name}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-neutral-400 leading-relaxed mb-8">
                    {platform.description}
                  </p>
                </div>

                {/* Footer */}
                <div className="relative z-10 flex items-center justify-between pt-6 border-t border-white/10">
                  <span className={`text-[10px] sm:text-xs font-bold tracking-widest uppercase ${platform.accentColor}`}>
                    {platform.tag}
                  </span>
                  <div className={`w-8 h-8 rounded-full ${platform.accentBgLight} flex items-center justify-center ${platform.accentColor} opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-0 -translate-x-2`}>
                    <ArrowUpRight className="w-4 h-4" />
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

