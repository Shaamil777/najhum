"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Zap,
  ArrowRight,
  ShieldCheck,
  Cpu,
  Activity,
  CheckCircle2,
  Globe2,
  Sparkles,
  Layers,
  ChevronDown
} from "lucide-react";

export default function EvolticsHero() {
  return (
    <section className="w-full min-h-[92vh] lg:min-h-screen bg-background relative overflow-hidden font-sans flex flex-col justify-between pt-28 pb-16 border-b border-border">
      
      {/* Background Architectural Grid & Subtle Radial Glows */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_20%,#000_20%,transparent_100%)]" />
      </div>

      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-400/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Hero Container */}
      <div className="container mx-auto px-6 lg:px-16 relative z-10 max-w-7xl my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Headlines & Call to Actions */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Top Brand Pill */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center space-x-2.5 bg-primary/10 border border-primary/25 px-4 py-1.5 rounded-full mb-6 shadow-sm"
            >
              <Zap className="w-3.5 h-3.5 text-primary fill-primary" />
              <span className="text-[11px] font-bold tracking-[0.18em] text-primary uppercase">
                Turnkey EV Infrastructure Ecosystem
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground leading-[1.08] mb-6 font-display"
            >
              Powering <br />
              Sustainable{" "}
              <span className="bg-gradient-to-r from-primary via-blue-600 to-cyan-500 bg-clip-text text-transparent">
                Mobility
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl text-muted leading-relaxed max-w-xl mb-8"
            >
              Complete EV charging infrastructure under one roof — where engineering precision meets seamless operational management.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-10"
            >
              <Link
                href="#solutions"
                className="inline-flex items-center justify-center space-x-2.5 bg-primary hover:bg-primary-hover text-white px-7 py-4 rounded-xl font-bold text-sm transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Explore Ecosystem</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="#contact"
                className="inline-flex items-center justify-center space-x-2 bg-surface hover:bg-surface-alt text-foreground border border-border px-7 py-4 rounded-xl font-bold text-sm transition-all shadow-sm hover:border-primary/40"
              >
                <span>Schedule Consultation</span>
              </Link>
            </motion.div>

            {/* Key Micro-Pill Highlights */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-wrap items-center gap-y-2 gap-x-6 pt-6 border-t border-border/80 text-xs text-muted font-medium w-full"
            >
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                <span>DEWA, TAQA & FEWA Approved</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                <span>OCPP 2.0.1 Certified Protocol</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                <span>Hardware Agnostic CPMS</span>
              </div>
            </motion.div>

          </div>

          {/* Right Column: High-Tech Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative mx-auto max-w-lg lg:max-w-none"
            >
              {/* Glowing Background Ring */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-primary/30 to-cyan-400/20 rounded-3xl blur-2xl opacity-60" />

              {/* Main Card Container */}
              <div className="relative bg-surface border border-border rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden">
                
                {/* Visual Platform Graphic */}
                <div className="relative w-full h-56 sm:h-64 bg-dark rounded-2xl overflow-hidden border border-white/10 p-6 flex flex-col justify-between mb-6">
                  {/* Subtle Grid overlay in preview */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:1.5rem_1.5rem]" />
                  
                  <div className="relative z-10 flex items-center justify-between">
                    <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                      <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                      <span className="text-[10px] font-bold text-white uppercase tracking-widest">
                        Network Live
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-neutral-400">
                      UAE Grid Sync
                    </span>
                  </div>

                  {/* Center Hero Logo Asset */}
                  <div className="relative z-10 my-auto flex items-center justify-center">
                    <div className="w-28 h-28 relative flex items-center justify-center">
                      <Image
                        src="/images/platforms/evoltics.png"
                        alt="Evoltics Architecture"
                        fill
                        className="object-contain drop-shadow-[0_0_25px_rgba(59,130,246,0.5)]"
                        priority
                      />
                    </div>
                  </div>

                  <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-neutral-300 pt-2 border-t border-white/10">
                    <span>Peak Efficiency: <strong className="text-emerald-400">99.4%</strong></span>
                    <span>Load: <strong className="text-primary">1.24 MW</strong></span>
                  </div>
                </div>

                {/* Floating Metric 1 */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-surface-alt border border-border p-4 rounded-xl">
                    <span className="text-[10px] font-bold text-muted uppercase tracking-widest block mb-1">
                      National Alignment
                    </span>
                    <span className="text-xl font-black text-foreground block">
                      Net Zero 2050
                    </span>
                    <span className="text-[11px] text-primary font-semibold">
                      Federal Charter
                    </span>
                  </div>

                  <div className="bg-surface-alt border border-border p-4 rounded-xl">
                    <span className="text-[10px] font-bold text-muted uppercase tracking-widest block mb-1">
                      Turnkey Scope
                    </span>
                    <span className="text-xl font-black text-foreground block">
                      CPO + CPMS
                    </span>
                    <span className="text-[11px] text-emerald-600 font-semibold">
                      Single Accountable Partner
                    </span>
                  </div>
                </div>

              </div>

            </motion.div>
          </div>

        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="container mx-auto px-6 lg:px-16 text-center relative z-10 pt-8">
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="inline-flex items-center space-x-2 text-xs font-semibold text-muted uppercase tracking-widest"
        >
          <span>Discover the Ecosystem</span>
          <ChevronDown className="w-3.5 h-3.5 text-primary" />
        </motion.div>
      </div>

    </section>
  );
}
