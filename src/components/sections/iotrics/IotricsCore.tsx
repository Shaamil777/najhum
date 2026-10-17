"use client";

import AccentText from "@/components/ui/AccentText";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import styles from "./IotricsCore.module.css";
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
  }, []);

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
            className={`order-2 lg:order-1 lg:col-span-4 xl:col-span-4 flex flex-col border-t border-neutral-200 ${styles.accordion}`}
          >
            {coreModules.map((module, index) => {
              const isActive = activeIndex === index;
              return (
                <div key={module.id} className={`${styles.item} ${isActive ? styles.active : ""} group`}>
                  <h3 className={styles.heading}>
                    <button
                      type="button"
                      id={`core-trigger-${module.id}`}
                      aria-expanded={isActive}
                      aria-controls={`core-panel-${module.id}`}
                      onClick={() => setActiveIndex(index)}
                      className={`${styles.trigger} ${isActive ? styles.selected : ""}`}
                    >
                      <module.icon className="w-5 h-5 shrink-0" aria-hidden="true" />
                      <span>{module.title}</span>
                    </button>
                  </h3>
                  {isActive && (
                    <div id={`core-panel-${module.id}`} role="region" aria-labelledby={`core-trigger-${module.id}`} className={styles.details} tabIndex={0}>
                      <p className="mb-5">{module.description}</p>
                      <div className="bg-neutral-50 rounded-xl p-4 sm:p-5 border border-neutral-100">
                        <h4 className="text-[10px] sm:text-xs font-bold text-neutral-900 uppercase tracking-widest mb-3 border-b border-neutral-200 pb-2 inline-block">Key Capabilities</h4>
                        <ul className="grid grid-cols-1 gap-y-2 mb-5">
                          {module.keyCapabilities.map(cap => (
                            <li key={cap} className="flex items-start gap-2 text-neutral-600 text-[12px] sm:text-[13px]">
                              <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                              <span>{cap}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-neutral-200">
                          {module.tags.map(tag => <span key={tag} className="px-2 py-1 bg-white border border-neutral-200 rounded text-[8px] sm:text-[9px] font-bold tracking-widest text-neutral-400 uppercase">{tag}</span>)}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
            
            <div className={`mt-8 lg:mt-6 pt-2 flex justify-center lg:justify-start ${styles.cta}`}>
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
