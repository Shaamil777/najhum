"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Map,
  Activity,
  RefreshCw,
  BarChart3,
  ArrowRight,
  Sparkles
} from "lucide-react";
import { cropifaiContent } from "@/content/cropifai";
import CropifaiDashboardDemo from "./CropifaiDashboardDemo";

export default function CropifaiInterface() {
  const { interface: iface } = cropifaiContent;
  const featuresData = iface.features;
  const features = [
    { icon: Map, ...featuresData[0] },
    { icon: Activity, ...featuresData[1] },
    { icon: RefreshCw, ...featuresData[2] },
    { icon: BarChart3, ...featuresData[3] },
  ];

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
    <section id="cropifai-interface" aria-label="cropif AI Interface" className="w-full pt-16 sm:pt-20 lg:pt-28 pb-12 sm:pb-16 lg:pb-20 bg-white relative overflow-hidden font-sans">
      
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
              {iface.header.titlePart1} <br className="hidden sm:block" />
              <span className="text-primary font-black">{iface.header.titlePart2}</span>
            </motion.h2>
          </div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-muted text-[13px] sm:text-base lg:text-lg max-w-md leading-relaxed italic text-center lg:text-left mx-auto lg:mx-0 mt-2 sm:mt-0"
          >
            {iface.header.description}
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
                <Sparkles className="w-3.5 h-3.5 text-primary" /> Interactive 3D Digital Twin
              </span>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground leading-tight">
                {iface.sidebar.titleLine1} <br className="hidden lg:block"/> {iface.sidebar.titleLine2}
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
                <span>Request Custom Walkthrough</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right Column: Live Enterprise Dashboard Showcase */}
          <div className="order-1 lg:order-2 lg:col-span-8 flex flex-col w-full justify-start">
            <CropifaiDashboardDemo
              activeIndex={activeIndex}
              onSelectIndex={(index) => setActiveIndex(index)}
              maxHeight={leftHeight}
            />
          </div>

        </div>

      </div>
    </section>
  );
}
