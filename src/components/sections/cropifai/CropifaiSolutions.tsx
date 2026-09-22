"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Target, Droplets, BrainCircuit, CloudCog, Zap, ArrowRight } from "lucide-react";
import { Container } from "@/design-system/primitives/layout/Container";

export default function CropifaiSolutions() {
  const solutions = [
    {
      code: "CORE 01",
      title: "Precision Farming",
      description: "Multi-depth soil sensors, weather monitoring, and crop health tracking.",
      tag: "Soil & Crop Telemetry",
      bgImage: "/images/cropify/precision_farming.jpg",
      icon: Target,
    },
    {
      code: "CORE 02",
      title: "Smart Irrigation",
      description: "Automated valve control, fertigation, and water flow optimization.",
      tag: "Automated Valve Flow",
      bgImage: "/images/cropify/smart_irrigation.jpg",
      icon: Droplets,
    },
    {
      code: "CORE 03",
      title: "AI/ML Analytics",
      description: "Satellite imagery, NDVI analysis, yield prediction, and recommendations.",
      tag: "Predictive Yield Models",
      bgImage: "/images/cropify/aiml_analytics.jpg",
      icon: BrainCircuit,
    },
    {
      code: "CORE 04",
      title: "Cloud Platform",
      description: "Real-time dashboards, remote monitoring, and multi-site management.",
      tag: "IoTRICs Central Hub",
      bgImage: "/images/cropify/cloud_platform.jpg",
      icon: CloudCog,
    },
  ];

  return (
    <section id="solutions" className="relative w-full py-20 lg:py-28 bg-slate-50 text-slate-900 overflow-hidden font-sans border-y border-slate-200/60">
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

      <Container size="full" className="max-w-[1536px] px-4 sm:px-6 xl:px-8 relative z-10">
        
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-14 lg:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-[0.2em] uppercase mb-5 backdrop-blur-sm"
          >
            <Zap className="w-3.5 h-3.5" />
            Core Solutions
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-black font-display text-slate-900 leading-tight tracking-tight mb-5"
          >
            The Future of <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">Smart Agriculture</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base md:text-lg text-slate-600 font-medium leading-relaxed max-w-2xl"
          >
            A revolutionary IoT-based agriculture and irrigation system using sensors, devices, and data analytics to monitor and optimize farming operations.
          </motion.p>
        </div>

        {/* 4 Cards in a Single Row on Desktop (lg:grid-cols-4) with the exact About page card design & brand color palette */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 xl:gap-5">
          {solutions.map((solution, index) => {
            const Icon = solution.icon;
            return (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                className="group relative bg-[#edf4ff] border border-blue-100 rounded-[1.75rem] p-5 sm:p-6 xl:p-7 flex flex-col justify-between min-h-[250px] sm:min-h-[260px] xl:min-h-[270px] shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden"
              >
                {/* Background Image with smooth gradient fade matching About section */}
                <div className="absolute top-0 right-0 bottom-0 w-[55%] sm:w-[58%] lg:w-[60%] pointer-events-none overflow-hidden rounded-r-[1.75rem]">
                  <Image
                    src={solution.bgImage}
                    alt={solution.title}
                    fill
                    className="object-cover object-right group-hover:scale-105 transition-transform duration-700 ease-out"
                    sizes="(max-width: 1024px) 100vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#edf4ff] via-[#edf4ff]/85 to-transparent" />
                </div>

                {/* Decorative Floating Icon Badge Overlay */}
                <div className="absolute top-5 right-5 z-10 pointer-events-none">
                  <div className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs border border-white/80 shadow-xs flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                {/* Card Content Top */}
                <div className="relative z-10 max-w-[170px] sm:max-w-[190px] lg:max-w-[165px] xl:max-w-[190px]">
                  {/* Core Number Label */}
                  <div className="flex items-center gap-2 mb-3 sm:mb-4">
                    <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.2em] uppercase text-slate-500">
                      {solution.code}
                    </span>
                    <div className="w-5 sm:w-6 h-px bg-slate-400/50" />
                  </div>

                  {/* Title */}
                  <h3 className="text-base sm:text-lg xl:text-xl font-extrabold text-slate-900 mb-2 tracking-tight">
                    {solution.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[11px] sm:text-xs xl:text-[13px] text-slate-600 leading-relaxed font-medium">
                    {solution.description}
                  </p>
                </div>

                {/* Card CTA Bottom */}
                <div className="relative z-10 pt-5 sm:pt-6 mt-auto flex items-center">
                  <div className="inline-flex items-center gap-2 text-xs sm:text-[13px] font-bold text-primary">
                    <span>{solution.tag}</span>
                    <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center transition-all duration-300 group-hover:translate-x-1 group-hover:bg-primary group-hover:text-white">
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </Container>
    </section>
  );
}
