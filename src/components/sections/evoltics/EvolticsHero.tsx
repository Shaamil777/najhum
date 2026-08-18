"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";

export default function EvolticsHero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((e) => console.log("Video playback failed:", e));
    }
  }, []);

  return (
    <section className="w-full min-h-[90vh] lg:min-h-[95vh] relative overflow-hidden font-sans flex flex-col justify-center items-center pt-28 pb-16 border-b border-border text-white">
      
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
          <source src="/videos/elvotics_bg.mp4" type="video/mp4" />
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
          className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-wide leading-[1.1] mb-6 font-display text-white"
        >
          POWERING <br />
          SUSTAINABLE MOBILITY
        </motion.h1>

        {/* Subtitle */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl sm:text-2xl font-medium mb-6 text-neutral-200 tracking-wide"
        >
          Complete EV Charging Solutions
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-lg sm:text-xl text-neutral-300 leading-relaxed max-w-3xl mb-10"
        >
          From licensing and regulatory approvals to hardware, installation, intelligent software and ongoing maintenance — Evoltics provides everything you need to deploy, manage and scale EV charging infrastructure under one roof.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 w-full sm:w-auto"
        >
          <Link
            href="#solutions"
            className="inline-flex items-center justify-center space-x-2.5 bg-primary hover:bg-primary-hover text-white px-8 py-4 rounded-md font-bold text-sm transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>Explore Solutions</span>
          </Link>

          <Link
            href="#contact"
            className="inline-flex items-center justify-center space-x-2 bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm border border-white/20 px-8 py-4 rounded-md font-bold text-sm transition-all shadow-sm hover:border-white/40"
          >
            <span>Start Your EV Journey</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

      </div>

      {/* Trusted By Companies */}
      <div className="container mx-auto px-6 lg:px-16 mt-auto relative z-10 w-full flex flex-col items-center">
        <p className="text-[11px] sm:text-xs font-bold text-white uppercase tracking-widest mb-6 text-center drop-shadow-sm">
          TRUSTED BY COMPANIES WORLDWIDE
        </p>
        <div className="flex flex-wrap justify-center items-center gap-x-8 sm:gap-x-12 md:gap-x-16 gap-y-8 w-full max-w-6xl">
          <Image src="/logo/elvotics_logo/1.png" alt="Trusted Partner 1" width={160} height={50} className="object-contain h-6 sm:h-8 lg:h-10 w-auto brightness-0 invert opacity-80 hover:opacity-100 transition-opacity" />
          <Image src="/logo/elvotics_logo/2.png" alt="Trusted Partner 2" width={160} height={50} className="object-contain h-6 sm:h-8 lg:h-10 w-auto brightness-0 invert opacity-80 hover:opacity-100 transition-opacity" />
          <Image src="/logo/elvotics_logo/3.png" alt="Trusted Partner 3" width={160} height={50} className="object-contain h-6 sm:h-8 lg:h-10 w-auto brightness-0 invert opacity-80 hover:opacity-100 transition-opacity" />
          <Image src="/logo/elvotics_logo/4.png" alt="Trusted Partner 4" width={160} height={50} className="object-contain h-6 sm:h-8 lg:h-10 w-auto brightness-0 invert opacity-80 hover:opacity-100 transition-opacity" />
          <Image src="/logo/elvotics_logo/5.png" alt="Trusted Partner 5" width={160} height={50} className="object-contain h-6 sm:h-8 lg:h-10 w-auto brightness-0 invert opacity-80 hover:opacity-100 transition-opacity" />
          <Image src="/logo/elvotics_logo/6.png" alt="Trusted Partner 6" width={160} height={50} className="object-contain h-6 sm:h-8 lg:h-10 w-auto brightness-0 invert opacity-80 hover:opacity-100 transition-opacity" />
        </div>
      </div>

    </section>
  );
}
