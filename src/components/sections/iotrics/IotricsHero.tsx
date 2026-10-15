"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { iotricsContent } from "@/content/iotrics";
import { HERO_VIDEOS } from "@/config/videos";
import ClientMarquee from "@/components/ui/ClientMarquee";

export default function IotricsHero() {
  const { hero } = iotricsContent;
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((e) => console.log("Video playback failed:", e));
    }
  }, []);

  return (
    <section className="w-full min-h-screen relative overflow-hidden flex flex-col justify-center items-center pt-24 sm:pt-28 pb-32 sm:pb-36 text-white">
      
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
          <source src={HERO_VIDEOS.iotrics} type="video/mp4" />
        </video>
        {/* Overlay to ensure text readability */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Main Hero Container */}
      <div className="container mx-auto px-6 lg:px-16 relative z-10 max-w-5xl flex flex-col items-center text-center mt-auto mb-auto">
        
        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-wide leading-[1.1] mb-6 text-white uppercase"
        >
          {hero.title.line1} <br /> {hero.title.line2}
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg sm:text-xl text-neutral-300 leading-relaxed max-w-3xl mb-10"
        >
          {hero.description}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-row items-center justify-center gap-2.5 sm:gap-4 w-auto"
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
            className="inline-flex items-center justify-center space-x-2 sm:space-x-2.5 bg-primary hover:bg-primary-hover text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full font-bold text-xs sm:text-sm whitespace-nowrap transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            <span>{hero.cta.primary}</span>
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </a>
        </motion.div>

      </div>

      {/* Logo Marquee at Bottom */}
      <div className="absolute bottom-0 left-0 w-full border-t-2 border-dotted border-white/20 bg-transparent z-20 pt-2 pb-3 sm:pb-4">
        <ClientMarquee title={hero.marqueeText} showFadeMask={false} />
      </div>

    </section>
  );
}
