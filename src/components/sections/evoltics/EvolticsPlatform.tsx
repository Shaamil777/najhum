"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  BadgeDollarSign,
  Receipt,
  BarChart3,
  ShieldCheck,
  Server,
  ArrowRight,
  Sparkles
} from "lucide-react";
import PartnerLogos, { EVOLTICS_PARTNERS } from "@/components/shared/PartnerLogos";
import EvolticsDashboardDemo from "./EvolticsDashboardDemo";

const features = [
  { icon: Server, title: "Hardware Agnostic", desc: "Integrate and setup any OCPP-compliant charger in a few clicks and start charging." },
  { icon: BarChart3, title: "Dashboard & Analytics", desc: "Monitor your charging network with real-time data insights, charts and statistics." },
  { icon: BadgeDollarSign, title: "Session records and reconciliation", desc: "Every session logged with charger, duration, energy delivered and payment — the audit trail behind the revenue, and what a landlord actually asks for." },
  { icon: Receipt, title: "Auto-Payment Settlements", desc: "Smart settlement system auto-calculates fees and distributes net revenue monthly." },
  { icon: ShieldCheck, title: "Public-Private Mode", desc: "Set charger accessibility for employees or visitors as private, or open to the public." },
];

export default function EvolticsPlatform() {
  const [activeIndex, setActiveIndex] = useState(0);
  const leftColRef = useRef<HTMLDivElement>(null);
  const [leftHeight, setLeftHeight] = useState<number | undefined>(undefined);

  useEffect(() => {
    const updateHeight = () => {
      if (leftColRef.current && window.innerWidth >= 1024) {
        setLeftHeight(leftColRef.current.offsetHeight);
      } else {
        setLeftHeight(undefined);
      }
    };
    updateHeight();
    const ro = new ResizeObserver(updateHeight);
    if (leftColRef.current) ro.observe(leftColRef.current);
    window.addEventListener("resize", updateHeight);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", updateHeight);
    };
  }, [activeIndex]);

  return (
    <section id="evoltics-platform" aria-label="CSMP Charging Station Management Platform" className="w-full pt-16 sm:pt-20 lg:pt-28 pb-12 sm:pb-16 lg:pb-20 bg-white relative overflow-hidden font-sans">

      {/* Background Architectural Grid & Radial Glow */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,#000_15%,transparent_100%)]" />
      </div>

      <div className="w-full max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-16 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 sm:mb-16 gap-3 sm:gap-8">
          <div className="max-w-2xl text-center lg:text-left mx-auto lg:mx-0">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-[1.65rem] sm:text-3xl md:text-4xl lg:text-[2rem] xl:text-[3.2rem] font-black tracking-tight text-foreground leading-[1.1] sm:leading-[1.05] uppercase"
            >
              CSMP — Charging Station <br className="hidden sm:block" />
              <span className="text-primary font-black">Management Platform</span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-muted text-[13px] sm:text-base lg:text-lg max-w-md leading-relaxed italic text-center lg:text-left mx-auto lg:mx-0 mt-2 sm:mt-0"
          >
            World&apos;s first IoT-enabled EV Charger Management Platform.
          </motion.p>
        </div>

        {/* Main Interactive Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start mb-0">

          {/* Left Column: Feature Capabilities */}
          <div
            ref={leftColRef}
            className="order-2 lg:order-1 lg:col-span-4 flex flex-col space-y-4"
          >
            <div className="mb-2 text-center lg:text-left">
              <span className="text-[11px] font-bold text-primary tracking-widest uppercase mb-1.5 inline-flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-primary" /> Interactive CSMP Demo
              </span>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground leading-tight">
                Everything you need <br className="hidden lg:block" /> in one CSMP
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5 sm:gap-3">
              {features.map((feat, i) => {
                const Icon = feat.icon;
                const isActive = activeIndex === i;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    role="button"
                    tabIndex={0}
                    aria-pressed={isActive}
                    onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); setActiveIndex(i); } }}
                    onClick={() => setActiveIndex(i)}
                    className={`p-3.5 sm:p-4 rounded-xl border transition-all flex items-start space-x-3 sm:space-x-4 cursor-pointer select-none group shadow-sm ${
                      isActive
                        ? "bg-primary/[0.04] border-primary/80 ring-1 ring-primary/20 shadow-md"
                        : "bg-surface border-border/80 hover:border-primary/40 hover:bg-surface-alt/50"
                    }`}
                  >
                    <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center transition-all shrink-0 ${
                      isActive
                        ? "bg-primary text-white shadow-sm"
                        : "bg-primary/10 border border-primary/15 text-primary group-hover:bg-primary group-hover:text-white"
                    }`}>
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className={`text-xs sm:text-sm font-bold transition-colors leading-tight ${
                          isActive ? "text-primary" : "text-foreground group-hover:text-primary"
                        }`}>
                          {feat.title}
                        </h4>
                        {isActive && (
                          <span className="inline-flex items-center text-[9px] font-bold text-primary uppercase tracking-widest bg-primary/10 px-2 py-0.5 rounded-full shrink-0">
                            Active View
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] sm:text-xs text-muted leading-relaxed mt-1">
                        {feat.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-3 pt-2 flex justify-center lg:justify-start">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center space-x-2 bg-primary hover:bg-primary-hover text-white px-6 py-3.5 rounded-full font-bold text-xs sm:text-sm whitespace-nowrap uppercase tracking-wider transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer w-full sm:w-auto text-center group"
              >
                <span>Request Custom CSMP Demo</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right Column: Live Enterprise Dashboard Showcase */}
          <div className="order-1 lg:order-2 lg:col-span-8 flex flex-col w-full justify-start">
            <EvolticsDashboardDemo
              activeIndex={activeIndex}
              onSelectIndex={(index) => setActiveIndex(index)}
              maxHeight={leftHeight}
            />



          </div>

        </div>

            {/* Enterprise Compatibility Footer & Prominent OCPP Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mt-6 sm:mt-8 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 w-full"
            >
              <section aria-labelledby="infrastructure-partners-heading" className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-5 flex-1 w-full min-w-0">
                <h3 id="infrastructure-partners-heading" className="font-sans text-[11px] sm:text-xs font-semibold uppercase tracking-wide text-muted shrink-0">Infrastructure Partners:</h3>
                <PartnerLogos logos={EVOLTICS_PARTNERS} compact />
              </section>

              {/* Prominent Outside Certification Badge */}
              <div className="flex items-center justify-center sm:justify-start space-x-3 sm:space-x-4 bg-surface border border-border px-4 sm:px-5 py-2 sm:py-3 rounded-full shadow-sm cursor-pointer group hover:border-primary/40 transition-colors overflow-hidden shrink-0 w-full sm:w-auto">
                <div className="w-10 h-10 sm:w-14 sm:h-14 relative flex items-center justify-center -ml-1">
                  <Image
                    src="/logo/occplogo.png"
                    alt="OCPP 2.0.1 Certified"
                    width={96}
                    height={96}
                    className="object-contain opacity-90 group-hover:opacity-100 transition-all scale-[1.3] group-hover:scale-[1.4]"
                  />
                </div>
                <div className="flex flex-col pr-1 sm:pr-2 text-left">
                  <span className="text-xs sm:text-sm font-bold text-foreground leading-none mb-1">OCPP 2.0.1</span>
                  <span className="text-[9px] sm:text-[10px] text-muted uppercase tracking-widest font-semibold">Certified Network Protocol</span>
                </div>
              </div>
            </motion.div>

      </div>
    </section>
  );
}
