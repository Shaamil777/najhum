"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check, Target } from "lucide-react";
import { cn } from "@/lib/utils";

const solaasPoints = [
  "Hardware, software, connectivity, and maintenance bundled into a monthly subscription",
  "Minimal CAPEX with no large upfront investment required",
  "Najhum manages deployment, configuration, updates, and ongoing support",
  "Scale from a single sensor to thousands without changing your infrastructure"
];

const paasPoints = [
  "Platform licensing for organizations managing their own IoT infrastructure",
  "API access for integration with existing systems",
  "Integration with enterprise platforms and operational systems",
  "Custom dashboard development and white-labelling available",
  "Dedicated technical support and onboarding"
];

export default function IotricsBusinessModel() {
  return (
    <section className="w-full relative overflow-hidden font-poppins">
      
      {/* Background Split (Desktop Only) */}
      <div className="absolute inset-0 pointer-events-none hidden lg:flex">
        {/* Left Side Bg */}
        <div className="w-1/2 bg-white relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-neutral-200/40 rounded-full blur-[120px]" />
        </div>
        {/* Right Side Bg */}
        <div className="w-1/2 bg-blue-50/40 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px]" />
        </div>
      </div>

      <div className="container mx-auto relative z-10 max-w-[1400px]">
        
        {/* ════════════════════════════════════════════════════════════════════════
            DESKTOP SPLIT VIEW (lg and up)
           ════════════════════════════════════════════════════════════════════════ */}
        <div className="hidden lg:grid grid-cols-2 gap-8 xl:gap-32">
          
          {/* LEFT COLUMN: SOLAAS */}
          <div className="py-24 flex flex-col items-end bg-transparent">
            
            <div className="w-full text-right mb-12">
              <span className="text-sm font-bold tracking-widest text-neutral-400 uppercase mb-2 block">Deployment Model 01</span>
              <h2 className="text-4xl font-bold tracking-tight text-neutral-800">
                SOLAAS
              </h2>
              <p className="text-neutral-500 mt-2 text-lg">Solution-as-a-Service</p>
            </div>

            <div className="space-y-8 w-full flex flex-col items-end">
              {solaasPoints.map((text, idx) => {
                let staggerClass = "";
                if (idx === 0) staggerClass = "mr-12";
                if (idx === 1) staggerClass = "mr-0";
                if (idx === 2) staggerClass = "mr-16";
                if (idx === 3) staggerClass = "mr-6";

                return (
                  <motion.div
                    key={`desktop-solaas-${idx}`}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className={cn(
                      "flex items-start gap-4 max-w-[400px] w-full",
                      staggerClass
                    )}
                  >
                    <div className="mt-1 w-7 h-7 rounded-full bg-neutral-100 flex items-center justify-center shrink-0 border border-neutral-200">
                      <Check className="w-4 h-4 text-neutral-500" strokeWidth={3} />
                    </div>
                    <p className="text-[15px] text-neutral-600 leading-relaxed">
                      {text}
                    </p>
                  </motion.div>
                );
              })}
            </div>

            {/* Left Col Bottom Tag */}
            <div className="mt-16 w-full max-w-[400px] text-right relative group">
               <div className="absolute inset-0 bg-gradient-to-r from-transparent to-neutral-100/80 rounded-2xl blur-xl transition-all opacity-0 group-hover:opacity-100" />
               <div className="relative bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-neutral-200/80 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_4px_25px_rgb(0,0,0,0.06)] transition-all">
                 <div className="absolute top-1/2 -translate-y-1/2 right-0 w-1 h-1/2 bg-neutral-300 rounded-l-full" />
                 <p className="text-[11px] text-neutral-400 uppercase tracking-widest mb-2 font-bold flex items-center justify-end gap-2">
                   Ideal Fit <Target className="w-3.5 h-3.5 text-neutral-400" />
                 </p>
                 <p className="text-[14px] text-neutral-700 font-medium leading-relaxed pr-3">
                   Most deployments needing a complete IoT solution without maintaining an internal team.
                 </p>
               </div>
            </div>
          </div>

          {/* RIGHT COLUMN: PAAS */}
          <div className="py-24 flex flex-col items-start bg-transparent">
            
            <div className="w-full text-left mb-12">
              <span className="text-sm font-bold tracking-widest text-blue-500 uppercase mb-2 block">Deployment Model 02</span>
              <h2 className="text-4xl font-bold tracking-tight text-neutral-900">
                PAAS
              </h2>
              <p className="text-blue-600 mt-2 text-lg">Platform-as-a-Service</p>
            </div>

            <div className="space-y-8 w-full flex flex-col items-start">
              {paasPoints.map((text, idx) => {
                let staggerClass = "";
                if (idx === 0) staggerClass = "ml-0";
                if (idx === 1) staggerClass = "ml-12";
                if (idx === 2) staggerClass = "ml-6";
                if (idx === 3) staggerClass = "ml-16";
                if (idx === 4) staggerClass = "ml-4";

                return (
                  <motion.div
                    key={`desktop-paas-${idx}`}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className={cn(
                      "flex items-start gap-4 max-w-[400px] w-full",
                      staggerClass
                    )}
                  >
                    <div className="mt-1 w-7 h-7 rounded-full bg-white flex items-center justify-center shrink-0 border border-blue-100 shadow-sm">
                      <Check className="w-4 h-4 text-blue-600" strokeWidth={3} />
                    </div>
                    <p className="text-[15px] text-neutral-700 leading-relaxed">
                      {text}
                    </p>
                  </motion.div>
                );
              })}
            </div>

            {/* Right Col Bottom Tag */}
            <div className="mt-16 w-full max-w-[400px] text-left relative group">
               <div className="absolute inset-0 bg-gradient-to-l from-transparent to-blue-200/50 rounded-2xl blur-xl transition-all opacity-0 group-hover:opacity-100" />
               <div className="relative bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-blue-100 shadow-[0_4px_20px_rgb(59,130,246,0.08)] hover:shadow-[0_4px_25px_rgb(59,130,246,0.12)] transition-all">
                 <div className="absolute top-1/2 -translate-y-1/2 left-0 w-1 h-1/2 bg-blue-500 rounded-r-full" />
                 <p className="text-[11px] text-blue-600 uppercase tracking-widest mb-2 font-bold flex items-center gap-2">
                   <Target className="w-3.5 h-3.5" /> Ideal Fit
                 </p>
                 <p className="text-[14px] text-neutral-800 font-medium leading-relaxed pl-3">
                   Enterprises with existing IoT infrastructure or in-house technical teams.
                 </p>
               </div>
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════════════════
            MOBILE COMBINED VIEW (< lg)
           ════════════════════════════════════════════════════════════════════════ */}
        <div className="flex lg:hidden flex-col items-center px-4 sm:px-6 py-16 bg-blue-50/20">
          
          <div className="text-center mb-12">
            <span className="text-blue-600 font-bold tracking-widest uppercase mb-2 text-xs">BUSINESS MODELS</span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900">
              SOLAAS <span className="text-neutral-400 font-normal mx-2">vs</span> PAAS
            </h2>
          </div>

          <div className="w-full max-w-md md:max-w-3xl flex flex-col md:flex-row gap-8 md:gap-12 bg-white rounded-3xl shadow-sm border border-neutral-200 p-6 sm:p-8">
            
            {/* SOLAAS Side */}
            <div className="w-full md:w-1/2 flex flex-col">
              <span className="text-[11px] font-bold tracking-wider text-neutral-400 uppercase mb-2">Model 01</span>
              <h3 className="text-xl font-bold text-neutral-900 mb-6">SOLAAS</h3>
              
              <div className="space-y-5 flex-1">
                {solaasPoints.map((text, idx) => (
                  <div key={`mobile-solaas-${idx}`} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" strokeWidth={3} />
                    <p className="text-[13px] text-neutral-600 leading-relaxed">{text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="hidden md:block w-px bg-neutral-200/50 self-stretch" />
            <div className="md:hidden h-px bg-neutral-200/50 w-full" />

            {/* PAAS Side */}
            <div className="w-full md:w-1/2 flex flex-col">
              <span className="text-[11px] font-bold tracking-wider text-blue-500 uppercase mb-2">Model 02</span>
              <h3 className="text-xl font-bold text-neutral-900 mb-6">PAAS</h3>
              
              <div className="space-y-5 flex-1">
                {paasPoints.map((text, idx) => (
                  <div key={`mobile-paas-${idx}`} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" strokeWidth={3} />
                    <p className="text-[13px] text-neutral-700 leading-relaxed">{text}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Best For Tags (Mobile) */}
          <div className="w-full max-w-md md:max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            <div className="relative bg-white border border-neutral-200 rounded-2xl p-5 text-left shadow-sm">
               <div className="absolute top-1/2 -translate-y-1/2 left-0 w-1 h-1/2 bg-neutral-300 rounded-r-full" />
               <p className="text-[11px] uppercase tracking-widest font-bold text-neutral-400 mb-2 pl-3 flex items-center gap-2">
                 <Target className="w-3.5 h-3.5" /> Ideal Fit
               </p>
               <p className="text-[13px] text-neutral-700 font-medium pl-3">
                 Most deployments needing a complete IoT solution without an internal team.
               </p>
            </div>
            <div className="relative bg-white border border-blue-100 rounded-2xl p-5 text-left shadow-[0_4px_20px_rgb(59,130,246,0.06)]">
               <div className="absolute top-1/2 -translate-y-1/2 left-0 w-1 h-1/2 bg-blue-500 rounded-r-full" />
               <p className="text-[11px] uppercase tracking-widest font-bold text-blue-500 mb-2 pl-3 flex items-center gap-2">
                 <Target className="w-3.5 h-3.5" /> Ideal Fit
               </p>
               <p className="text-[13px] text-neutral-900 font-medium pl-3">
                 Enterprises with existing IoT infrastructure or in-house technical teams.
               </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
