"use client";

import AccentText from "@/components/ui/AccentText";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Bell, Eye, Zap, Map, BarChart3, CheckCircle2, ArrowRight } from "lucide-react";

import { iotricsContent } from "@/content/iotrics";
import IotricsDashboardDemo from "./IotricsDashboardDemo";

const modulesData = iotricsContent.core.modules;

const coreModules = [
  { ...modulesData[0], icon: Activity },
  { ...modulesData[1], icon: Bell },
  { ...modulesData[2], icon: Eye },
  { ...modulesData[3], icon: Zap },
  { ...modulesData[4], icon: Map },
  { ...modulesData[5], icon: BarChart3 }
];

export default function IotricsCore() {
  const { core } = iotricsContent;
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
    <section id="iotrics-core" aria-label="Io TRICs Core" className="w-full pt-16 sm:pt-20 lg:pt-10 pb-12 sm:pb-16 lg:pb-20 bg-white text-neutral-900 font-poppins">
      <div className="container mx-auto px-6 lg:px-8 max-w-[1440px] flex flex-col items-center">
        
        <div className="text-center max-w-4xl mx-auto flex flex-col items-center mb-16 lg:mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[1.75rem] sm:text-3xl lg:text-[2rem] xl:text-[3.2rem] font-black tracking-tight text-neutral-900 leading-[1.1] sm:leading-[1.05] uppercase mb-6"
          >
            <AccentText text={core.header.title} accent="Intelligence Layer" />
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-neutral-500 text-lg sm:text-xl max-w-2xl leading-relaxed"
          >
            {core.header.description}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-8 xl:gap-10 w-full text-left items-start">
          
          {/* Left Column: Accordion List (shown second on mobile, first on desktop) */}
          <div 
            ref={leftColRef}
            className="order-2 lg:order-1 lg:col-span-4 xl:col-span-4 flex flex-col border-t border-neutral-200"
          >
            {coreModules.map((module, index) => {
              const isActive = activeIndex === index;
              return (
                <div 
                  key={module.id}
                  className="border-b border-neutral-200 cursor-pointer overflow-hidden group"
                  onClick={() => setActiveIndex(index)}
                >
                  <div className="flex items-center py-4 sm:py-5 gap-3 sm:gap-4">
                    <module.icon className={`w-5 h-5 shrink-0 transition-colors ${isActive ? 'text-neutral-900' : 'text-neutral-400 group-hover:text-neutral-600'}`} />
                    <h3 className={`text-xs sm:text-sm lg:text-base font-bold tracking-widest uppercase transition-colors ${isActive ? 'text-neutral-900' : 'text-neutral-400 group-hover:text-neutral-600'}`}>
                      {module.title}
                    </h3>
                  </div>
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="pr-2 sm:pr-4 pb-6 text-neutral-500 leading-relaxed text-[13px] sm:text-sm lg:text-base">
                          <p className="mb-5">{module.description}</p>
                          
                          {/* ═══ MOBILE-ONLY: Rich details inside accordion ═══ */}
                          <div className="lg:hidden bg-neutral-50 rounded-xl p-4 sm:p-5 border border-neutral-100">
                            <h5 className="text-[10px] sm:text-xs font-bold text-neutral-900 uppercase tracking-widest mb-3 border-b border-neutral-200 pb-2 inline-block">
                              Key Capabilities
                            </h5>
                            <ul className="grid grid-cols-1 gap-y-2 mb-5">
                              {module.keyCapabilities.map((cap, i) => (
                                <li key={i} className="flex items-start gap-2 text-neutral-600 text-[12px] sm:text-[13px]">
                                  <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary shrink-0 mt-0.5" />
                                  <span>{cap}</span>
                                </li>
                              ))}
                            </ul>
                            
                            {/* Tags Bottom Bar */}
                            <div className="flex flex-wrap gap-1.5 pt-2 border-t border-neutral-200">
                              {module.tags.map((tag, i) => (
                                <span key={i} className="px-2 py-1 bg-white border border-neutral-200 rounded text-[8px] sm:text-[9px] font-bold tracking-widest text-neutral-400 uppercase">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>

                        </div>
                        <div className="w-1/3 h-[2px] bg-neutral-900 mb-6 hidden lg:block" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
            
            <div className="mt-8 lg:mt-10 pt-2 flex justify-center lg:justify-start">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center space-x-2 sm:space-x-2.5 bg-primary hover:bg-primary-hover text-white px-6 py-3.5 sm:px-8 sm:py-4 rounded-full font-bold text-xs sm:text-sm whitespace-nowrap uppercase tracking-wider transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer w-full sm:w-auto text-center group"
              >
                <span>{core.cta}</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right Column: Live Enterprise Dashboard Interactive Showcase (shown first on mobile, second on desktop) */}
          <div className="order-1 lg:order-2 flex flex-col lg:col-span-8 xl:col-span-8 w-full justify-start">
            <IotricsDashboardDemo
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
