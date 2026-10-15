"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { homeContent } from "@/content/home";
import { HERO_VIDEOS } from "@/config/videos";

import ClientMarquee from "@/components/ui/ClientMarquee";

export default function Hero() {
  const { hero } = homeContent;
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && videoRef.current) {
      videoRef.current.play().catch((e) => console.log("Video playback failed:", e));
    }
  }, [isMounted]);

  return (
    <section className="w-full min-h-screen relative overflow-hidden flex flex-col justify-center items-center pt-24 sm:pt-28 pb-32 sm:pb-36 text-white bg-black">
      
      {/* Background Video & Vignette Overlay */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0" suppressHydrationWarning>
        {isMounted && (
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            suppressHydrationWarning
            className="absolute inset-0 w-full h-full object-cover z-0 opacity-80"
          >
            <source src={HERO_VIDEOS.home} type="video/mp4" />
          </video>
        )}

        {/* Vignette Overlay for readable text */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/35 to-black/85 z-0" />
      </div>

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
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 sm:gap-2.5 bg-primary hover:bg-primary-hover text-white px-4 py-3 sm:px-8 sm:py-4 rounded-full font-bold text-xs sm:text-sm whitespace-nowrap transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 active:translate-y-0 group"
          >
            <span className="leading-none translate-y-px">{hero.primaryCta.label}</span>
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>

          <Link
            href={hero.secondaryCta.href}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 sm:gap-2.5 bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm border border-white/20 px-4 py-3 sm:px-8 sm:py-4 rounded-full font-bold text-xs sm:text-sm whitespace-nowrap transition-all shadow-sm hover:border-white/40 hover:-translate-y-0.5 active:translate-y-0 group"
          >
            <span className="leading-none translate-y-px">{hero.secondaryCta.label}</span>
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

      </div>

      {/* Logo Marquee at Bottom */}
      <div className="absolute bottom-0 left-0 w-full border-t-2 border-dotted border-white/20 bg-transparent z-20 pt-2 pb-3 sm:pb-4">
        <ClientMarquee title="TRUSTED BY COMPANIES WORLDWIDE" showFadeMask={false} />
      </div>
    </section>
  );
}