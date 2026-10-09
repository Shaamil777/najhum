"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { iotricsContent } from "@/content/iotrics";

const clients = iotricsContent.hero.clients;

export default function IotricsHero() {
  const { hero } = iotricsContent;
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((e) => console.log("Video playback failed:", e));
    }
  }, []);

  return (
    <section className="w-full min-h-[90vh] lg:min-h-[95vh] relative overflow-hidden flex flex-col justify-center items-center pt-28 pb-16 border-b border-border text-white">
      
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
          <source src="/videos/iotrics-bg.mp4" type="video/mp4" />
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
      <div className="absolute bottom-0 left-0 w-full border-t-2 border-dotted border-white/20 bg-transparent overflow-hidden flex flex-col items-center justify-center h-28 z-20 pt-2">
        <p className="text-[11px] sm:text-xs font-bold text-white uppercase tracking-widest text-center drop-shadow-sm mb-2 w-full">
          {hero.marqueeText}
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
          {[...clients, ...clients, ...clients, ...clients].map((client, idx) => (
            <div key={idx} className="flex flex-none items-center justify-center mx-4 px-8 py-2 bg-transparent opacity-90 hover:opacity-100 hover:scale-105 transition-all duration-300 min-w-[160px]">
              <img 
                src={client.src} 
                alt={client.name} 
                className="h-8 w-auto object-contain brightness-0 invert drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]"
              />
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
