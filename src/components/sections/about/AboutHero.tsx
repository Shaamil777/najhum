"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, ChevronRight, Activity, Globe2, Cpu, BarChart3 } from "lucide-react";

export default function AboutHero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((e) => console.log("Video playback failed:", e));
    }
  }, []);

  const stats = [
    { label: "FOUNDED", value: "2017", icon: Activity },
    { label: "CORE PLATFORMS", value: "3+", icon: Cpu },
    { label: "SERVER IN", value: "Dubai", icon: Globe2 },
    { label: "IOT EXPERTISE", value: "Industrial", icon: BarChart3 },
  ];

  return (
    <section className="relative w-full min-h-[65vh] flex flex-col justify-center bg-neutral-950 text-white overflow-hidden pt-20">
      
      {/* Video Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        >
          <source src="/videos/hero-bg-video.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/70 via-neutral-950/40 to-neutral-950/90" />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 relative z-10 flex-1 flex flex-col justify-center py-12 md:py-16">
        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black font-display text-white mb-6 leading-[1.1] tracking-tight">
            Turning Infrastructure <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-primary-hover">Into Intelligence</span>
          </h1>
          
          <p className="text-base md:text-xl text-neutral-300 mb-8 max-w-2xl font-medium leading-relaxed">
            Najhum Group bridges the gap between physical assets and digital clarity through a proprietary hardware-agnostic industrial ecosystem.
          </p>
          
          <div className="flex flex-row items-center gap-2.5 sm:gap-4 w-full sm:w-auto max-w-sm sm:max-w-none">
            <a 
              href="#technology" 
              onClick={(e) => {
                const el = document.getElementById("technology");
                if (el) {
                  e.preventDefault();
                  el.scrollIntoView({ behavior: "smooth" });
                  window.history.pushState(null, "", "#technology");
                }
              }}
              className="flex-1 sm:flex-none group relative inline-flex items-center justify-center gap-1.5 sm:gap-3 px-4 py-3 sm:px-7 sm:py-3.5 bg-primary hover:bg-primary-hover text-white rounded-full font-bold uppercase tracking-wider sm:tracking-widest text-[11px] sm:text-xs whitespace-nowrap transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <span className="relative z-10 flex items-center gap-1.5 sm:gap-2">
                Our Technology
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-1" />
              </span>
            </a>

            <Link 
              href="/contact" 
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 sm:gap-3 px-4 py-3 sm:px-6 sm:py-3.5 bg-white/5 text-white rounded-full font-bold uppercase tracking-wider sm:tracking-widest text-[11px] sm:text-xs whitespace-nowrap border border-white/10 hover:bg-white/10 transition-colors"
            >
              <span>Get In Touch</span>
              <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-neutral-400" />
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="relative z-20 border-t border-white/10 bg-neutral-950/60 backdrop-blur-xl">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div key={idx} className="flex flex-col items-center justify-center py-4 md:py-6 px-4 text-center group">
                  <div className="flex items-center gap-3 mb-1">
                    <Icon className="w-4 h-4 md:w-5 md:h-5 text-primary opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                    <span className="text-2xl md:text-3xl font-black text-white">{stat.value}</span>
                  </div>
                  <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400">{stat.label}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
