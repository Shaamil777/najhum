"use client";

import React from "react";
import { motion } from "framer-motion";
import { Poppins } from "next/font/google";

const poppins = Poppins({ 
  subsets: ["latin"], 
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins"
});

import { evolticsContent } from "@/content/platforms";

const journeySteps = evolticsContent.journey.steps;

// Exact grid placement to recreate the waterfall layout
const layoutClasses = [
  "col-start-1 col-span-1 row-start-1 md:col-start-1 md:col-span-1 md:row-start-1 lg:col-start-1 lg:col-span-1 lg:row-start-1", // 1
  "col-start-1 col-span-1 row-start-2 md:col-start-2 md:col-span-2 md:row-start-1 lg:col-start-2 lg:col-span-2 lg:row-start-2", // 2 (Spans 2 on desktop/tablet)
  "col-start-1 col-span-1 row-start-3 md:col-start-2 md:col-span-1 md:row-start-2 lg:col-start-3 lg:col-span-1 lg:row-start-3", // 3
  "col-start-1 col-span-1 row-start-4 md:col-start-3 md:col-span-1 md:row-start-2 lg:col-start-4 lg:col-span-1 lg:row-start-3", // 4
  "col-start-1 col-span-1 row-start-5 md:col-start-2 md:col-span-1 md:row-start-3 lg:col-start-4 lg:col-span-1 lg:row-start-4", // 5
  "col-start-1 col-span-1 row-start-6 md:col-start-3 md:col-span-1 md:row-start-3 lg:col-start-5 lg:col-span-1 lg:row-start-4", // 6
];

export default function EvolticsJourney() {
  return (
    <section 
      className={`relative w-full py-20 lg:py-28 bg-white text-neutral-900 overflow-hidden ${poppins.variable} ${poppins.className}`}
      style={{ '--font-display': 'var(--font-poppins)' } as React.CSSProperties}
    >
      {/* Background Images */}
      <div className="absolute top-[75%] -translate-y-1/2 left-[2%] lg:left-[3%] w-[45%] md:w-[40%] lg:w-[35%] xl:w-[30%] opacity-[0.05] pointer-events-none z-0">
        <img src="/images/elvotics/journey_img_2.svg" alt="" className="w-full h-auto object-contain object-left" />
      </div>
      <div className="absolute top-[45%] -translate-y-1/2 right-[2%] lg:right-[3%] w-[45%] md:w-[40%] lg:w-[35%] xl:w-[30%] opacity-[0.05] pointer-events-none z-0">
        <img src="/images/elvotics/journey_img_1.svg" alt="" className="w-full h-auto object-contain object-right" />
      </div>



      <div className="max-w-[1400px] w-full mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Header */}
        <div className="w-full text-center flex flex-col items-center mb-12 lg:mb-20">
           <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1a1f36] mb-3">
             Evoltics Deployment Journey
           </h2>
           <p className="text-[#2445c7] text-sm sm:text-base font-semibold tracking-wider uppercase">
             Our End-to-End Work Process
           </p>
        </div>

        {/* WATERFALL GRID CONTAINER */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5 mt-8 relative">
           
           {journeySteps.map((step, index) => {
             return (
               <motion.div 
                 key={index}
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true, margin: "-10% 0px" }}
                 transition={{ duration: 0.5, delay: index * 0.1 }}
                 className={`
                    bg-[#2a2a2a] border-2 border-neutral-900 rounded-md p-5 md:p-6 
                    shadow-[4px_4px_0px_#2445c7] hover:shadow-[6px_6px_0px_#2445c7] hover:-translate-y-1 
                    transition-all duration-300 relative z-10 flex flex-col justify-start
                    ${layoutClasses[index]}
                 `}
               >
                  <div className="flex items-start justify-between mb-4 gap-4">
                     <h3 className="font-bold text-white text-lg md:text-xl leading-tight">
                        {step.title}
                     </h3>
                     <div className="w-6 h-6 rounded-full bg-zinc-800 text-zinc-300 flex items-center justify-center shrink-0 font-bold text-[11px] shadow-sm">
                        {step.num}
                     </div>
                  </div>
                  
                  <p className="text-zinc-400 text-[13px] md:text-[14px] leading-relaxed">
                     {step.desc}
                  </p>
               </motion.div>
             )
           })}
        </div>

      </div>
    </section>
  );
}
