"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Container } from "@/design-system/primitives/layout/Container";

export default function CropifaiWaterFlow() {
  const flowControls = [
    { title: "Solenoid Valve Control", desc: "Percentage control 0–100%, open/close precision" },
    { title: "Autonomous Operation", desc: "Solar-powered, battery backup, works off-grid" },
    { title: "Cycle Irrigation", desc: "Set start time, duration, capacity, cycle number" },
    { title: "Fertigation Dosing", desc: "Automated nutrient dosing, variable-rate application" },
    { title: "Safety Alarms", desc: "Web notifications for flow, pressure, sensor breakdown" },
    { title: "Multicast Control", desc: "Bulk valve control across multiple zones simultaneously" },
  ];

  return (
    <section className="w-full py-20 lg:py-32 bg-white relative overflow-hidden font-sans border-b border-zinc-200">
      
      {/* Decorative background blob */}
      <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-primary/5 rounded-[100%] blur-[120px] -translate-y-1/2 pointer-events-none" />

      <Container size="xl" className="relative z-10">
        
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Left Side: Product Image Display */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="w-full lg:w-1/2 relative flex justify-center lg:justify-start"
          >
            {/* The distinct stylized background box from the reference image */}
            <div className="relative w-[340px] md:w-[480px] h-[400px] md:h-[550px] bg-[#d5a065] rounded-[3rem] overflow-hidden shadow-2xl flex items-center justify-center">
              
              {/* Background gradient/texture to match the reference image style */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#e5e7e3] to-[#be651b]" />
              
              {/* Actual Image */}
              <div className="relative w-[120%] h-[120%] -ml-10">
                <Image 
                  src="/products/cropifai/SolarPoweredWaterFlowSensor.png" 
                  alt="Automated Water Flow Controller" 
                  fill 
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-contain drop-shadow-2xl" 
                />
              </div>
            </div>
          </motion.div>

          {/* Right Side: Features */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="w-full lg:w-1/2 flex flex-col"
          >
            <div className="mb-10">
              <span className="text-primary font-black tracking-widest text-xs uppercase mb-3 block">
                SMART IRRIGATION & AUTOMATION
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-[#1a2b4b] leading-tight tracking-tight mb-2">
                Automated Water Flow Control
              </h2>
            </div>

            <ul className="space-y-6 mb-12">
              {flowControls.map((control, idx) => (
                <li key={idx} className="flex items-start gap-4">
                  <div className="mt-1.5 shrink-0">
                    <div className="w-4 h-4 rounded-full bg-primary" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-[#1a2b4b] mb-1">{control.title}</h4>
                    <p className="text-[#64748b] leading-relaxed text-[15px]">{control.desc}</p>
                  </div>
                </li>
              ))}
            </ul>

            {/* Spec tags box */}
            <div className="bg-[#f1f5f9] rounded-2xl p-6 lg:p-8 w-fit shadow-sm border border-zinc-200/50">
              <ul className="space-y-3 text-[14px] font-medium text-[#64748b]">
                <li>IP67 Rated Enclosure</li>
                <li>Flexible Power: Solar / Battery / Mains</li>
                <li>Internal & External Antenna Options</li>
              </ul>
            </div>
          </motion.div>

        </div>
      </Container>
    </section>
  );
}
