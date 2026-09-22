"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Map,
  Activity,
  RefreshCw,
  BarChart3
} from "lucide-react";

const features = [
  { icon: Map, title: "Visual Map Representation", desc: "Pinpoint exact device locations and irrigation zones across farms." },
  { icon: Activity, title: "Real-Time Telemetry", desc: "Live sensor monitoring for multi-depth soil moisture and climate." },
  { icon: RefreshCw, title: "Over-the-Air (OTA) Control", desc: "Remote valve automation, scheduling, and firmware updates." },
  { icon: BarChart3, title: "Data Analytics & Trends", desc: "Historical water consumption charts, NDVI analysis, and yield insights." },
];

export default function CropifaiInterface() {
  return (
    <section className="w-full py-28 bg-white relative overflow-hidden font-sans">
      
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
              CENTRALIZED MANAGEMENT — <br className="hidden sm:block" />
              <span className="text-primary font-black">CLOUD PLATFORM</span>
            </motion.h2>
          </div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-muted text-[13px] sm:text-base lg:text-lg max-w-md leading-relaxed italic text-center lg:text-left mx-auto lg:mx-0 mt-2 sm:mt-0"
          >
            Powered by IoTRICs, providing an intuitive, multi-tenant interface for remote agricultural management and device oversight.
          </motion.p>
        </div>

        {/* Main Interactive Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-16">
          
          {/* Left Column: 6 Feature Capabilities */}
          <div className="lg:col-span-4 flex flex-col space-y-4">
            <div className="mb-3 sm:mb-4 text-center lg:text-left">
              <h3 className="text-lg sm:text-2xl md:text-3xl font-bold text-foreground leading-tight">
                Everything you need <br className="hidden lg:block"/> in one Platform
              </h3>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-1 gap-2 sm:gap-3">
              {features.map((feat, i) => {
                const Icon = feat.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="p-3 sm:p-4 rounded-xl bg-surface border border-border/80 hover:border-primary/40 hover:bg-surface-alt/50 transition-all flex flex-col sm:flex-row lg:flex-row items-start space-y-2 sm:space-y-0 sm:space-x-4 lg:space-x-4 group shadow-sm"
                  >
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-primary/10 border border-primary/15 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shrink-0">
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div>
                      <h4 className="text-[11px] sm:text-sm font-bold text-foreground group-hover:text-primary transition-colors leading-tight mb-1 sm:mb-0">
                        {feat.title}
                      </h4>
                      <p className="text-[10px] sm:text-xs text-muted leading-relaxed sm:mt-1 line-clamp-3 sm:line-clamp-none">
                        {feat.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Live Enterprise Dashboard Showcase */}
          <div className="lg:col-span-8 flex flex-col w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-surface-alt rounded-2xl border border-border shadow-sm overflow-hidden relative w-full flex flex-col"
            >
              {/* Dashboard Image Content - Full Natural Dimensions, Never Cropped */}
              <div className="relative z-10 w-full overflow-hidden bg-surface-alt">
                <Image
                  src="/images/cropify/dashboardcropify.png"
                  alt="Cropifai IoTRICs Dashboard Interface"
                  width={1728}
                  height={934}
                  priority
                  className="w-full h-auto block object-contain select-none"
                  sizes="(max-width: 1024px) 100vw, (max-width: 1536px) 66vw, 1000px"
                />
              </div>

              {/* Decorative faint background grid */}
              <div className="absolute inset-0 pointer-events-none opacity-20 z-0">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:2rem_2rem]" />
              </div>

            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
