"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { homeContent } from "@/content/home";

const clients = [
  { name: "DEWA", src: "/logo/client%20logos/Dubai_Electricity_and_Water_Authority_id40SLA8sS_1.png" },
  { name: "ADAA", src: "/logo/client%20logos/adaa_gov.png" },
  { name: "UAEAA", src: "/logo/client%20logos/uaeaa_gov.png" },
  { name: "ARC", src: "/logo/client%20logos/ARC_Logo-2.svg" },
  { name: "Thuraya", src: "/logo/client%20logos/Thuraya_logo.png" },
  { name: "Aramtec", src: "/logo/client%20logos/aramtec.png" },
  { name: "Yahsat", src: "/logo/client%20logos/idsuguLgbe.png" },
  { name: "Nokia", src: "/logo/client%20logos/nokia-com-wordmark.png" },
  { name: "Space42", src: "/logo/client%20logos/space42.png" },
];

export default function Hero() {
  const { hero } = homeContent;

  return (
    <section className="w-full min-h-[90vh] lg:min-h-[95vh] relative overflow-hidden flex flex-col justify-center items-center pt-28 pb-16 border-b border-border text-white bg-black">
      
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-80"
      >
        <source src="/videos/hero-bg-video.mp4" type="video/mp4" />
      </video>

      {/* Vignette Overlay for readable text */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/35 to-black/85 z-0"></div>

      {/* Main Hero Container */}
      <div className="container mx-auto px-6 lg:px-16 relative z-10 max-w-5xl flex flex-col items-center text-center mt-auto mb-auto">
        
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight leading-[1.08] uppercase font-display">
          {hero.titlePart1} <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-primary-hover">{hero.titlePart2}</span> <br className="hidden sm:block" /> {hero.titlePart3}
        </h1>
        
        <p className="text-base sm:text-lg md:text-xl text-neutral-300 max-w-3xl leading-relaxed mb-8 sm:mb-10">
          {hero.subheadline}
        </p>

        {/* CTA Buttons - Single row pill buttons on mobile and desktop */}
        <div className="flex flex-row items-center justify-center gap-2.5 sm:gap-4 w-full sm:w-auto max-w-sm sm:max-w-none mx-auto">
          <Link
            href={hero.primaryCta.href}
            className="flex-1 sm:flex-none inline-flex items-center justify-center space-x-1.5 sm:space-x-2.5 bg-primary hover:bg-primary-hover text-white px-4 py-3 sm:px-8 sm:py-4 rounded-full font-bold text-xs sm:text-sm whitespace-nowrap transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 active:translate-y-0 group"
          >
            <span>{hero.primaryCta.label}</span>
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>

          <Link
            href={hero.secondaryCta.href}
            className="flex-1 sm:flex-none inline-flex items-center justify-center space-x-1.5 sm:space-x-2.5 bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm border border-white/20 px-4 py-3 sm:px-8 sm:py-4 rounded-full font-bold text-xs sm:text-sm whitespace-nowrap transition-all shadow-sm hover:border-white/40 hover:-translate-y-0.5 active:translate-y-0 group"
          >
            <span>{hero.secondaryCta.label}</span>
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

      </div>

      {/* Logo Marquee at Bottom */}
      <div className="absolute bottom-0 left-0 w-full border-t-2 border-dotted border-white/20 bg-transparent overflow-hidden flex flex-col items-center justify-center h-28 z-20 pt-2">
        <p className="text-[11px] sm:text-xs font-bold text-white uppercase tracking-widest text-center drop-shadow-sm mb-2 w-full">
          TRUSTED BY COMPANIES WORLDWIDE
        </p>
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: marquee 30s linear infinite;
            width: max-content;
          }
        `}</style>
        
        <div className="flex animate-marquee items-center w-full mt-2">
          {[...clients, ...clients, ...clients, ...clients].map((client, i) => {
            return (
              <div key={i} className="flex flex-none items-center justify-center mx-4 px-8 py-2 bg-transparent opacity-90 hover:opacity-100 hover:scale-105 transition-all duration-300 min-w-[160px]">
                <img 
                  src={client.src} 
                  alt={client.name} 
                  className="h-8 w-auto object-contain brightness-0 invert drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]"
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}