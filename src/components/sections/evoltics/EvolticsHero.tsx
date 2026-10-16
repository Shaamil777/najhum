"use client";

import PlatformBrand from "@/components/ui/PlatformBrand";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { evolticsContent } from "@/content/evoltics";
import { HERO_VIDEOS } from "@/config/videos";
import ClientMarquee, { ClientLogo } from "@/components/ui/ClientMarquee";

const evolticsLogos: ClientLogo[] = [1, 2, 3, 4, 5, 6].map((num) => ({
  name: `Trusted Partner ${num}`,
  src: `/logo/evoltics/${num}.png`,
  className: "max-h-8 max-w-[130px]",
}));

export default function EvolticsHero() {
  const { hero } = evolticsContent;
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((e) => console.log("Video playback failed:", e));
    }
  }, []);

  return (
    <section id="evoltics-hero" aria-label="EVOLTICS Hero" className="w-full min-h-screen relative overflow-hidden font-sans flex flex-col justify-center items-center pt-24 sm:pt-28 pb-32 sm:pb-36 text-white">
      
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={HERO_VIDEOS.evoltics} type="video/mp4" />
        </video>
        {/* Overlay to ensure text readability */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Main Hero Container */}
      <div className="container mx-auto px-6 lg:px-16 relative z-10 max-w-5xl flex flex-col items-center text-center mt-auto mb-auto">
        
        <div className="mb-6"><PlatformBrand platform="evoltics" priority /></div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6 font-display text-white normal-case"
          style={{ textTransform: "none" }}
        >
          {hero.title.line1} <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3B82F6] via-blue-400 to-blue-200">
            {hero.title.line2}
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg sm:text-xl font-medium mb-6 text-neutral-200 tracking-wide normal-case"
          style={{ textTransform: "none" }}
        >
          {hero.subtitle}
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-base sm:text-lg text-neutral-300 leading-relaxed max-w-2xl mb-10"
        >
          {hero.description}
        </motion.p>

        {/* CTA Buttons - Single row pill buttons on mobile and desktop */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-row items-center justify-center gap-2.5 sm:gap-4 w-full sm:w-auto max-w-sm sm:max-w-none mx-auto"
        >
          <a
            href="#solutions"
            onClick={(e) => {
              const el = document.getElementById("solutions");
              if (el) {
                e.preventDefault();
                el.scrollIntoView({ behavior: "smooth" });
                window.history.pushState(null, "", "#solutions");
              }
            }}
            className="flex-1 sm:flex-none inline-flex items-center justify-center space-x-1.5 sm:space-x-2.5 bg-primary hover:bg-primary-hover text-white px-4 py-3 sm:px-8 sm:py-4 rounded-full font-bold text-xs sm:text-sm whitespace-nowrap transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            <span>{hero.cta.primary}</span>
          </a>

          <a
            href="#journey"
            onClick={(e) => {
              const el = document.getElementById("journey");
              if (el) {
                e.preventDefault();
                el.scrollIntoView({ behavior: "smooth" });
                window.history.pushState(null, "", "#journey");
              }
            }}
            className="flex-1 sm:flex-none inline-flex items-center justify-center space-x-1.5 sm:space-x-2 bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm border border-white/20 px-4 py-3 sm:px-8 sm:py-4 rounded-full font-bold text-xs sm:text-sm whitespace-nowrap transition-all shadow-sm hover:border-white/40 cursor-pointer"
          >
            <span>{hero.cta.secondary}</span>
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </a>
        </motion.div>

      </div>

      {/* Logo Marquee at Bottom */}
      <div className="absolute bottom-0 left-0 w-full border-t-2 border-dotted border-white/20 bg-transparent z-20 pt-2 pb-3 sm:pb-4">
        <ClientMarquee title={hero.marqueeText} logos={evolticsLogos} showFadeMask={false} />
      </div>

    </section>
  );
}
