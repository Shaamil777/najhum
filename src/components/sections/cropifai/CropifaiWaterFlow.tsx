"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Container } from "@/design-system/primitives/layout/Container";
import { cropifaiContent } from "@/content/cropifai";

export default function CropifaiWaterFlow() {
  const { waterFlow } = cropifaiContent;
  const flowControls = waterFlow.flowControls;

  return (
    <section className="w-full py-16 lg:py-20 bg-white relative overflow-hidden font-sans border-b border-zinc-200">
      
      {/* Decorative background blob */}
      <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-primary/5 rounded-[100%] blur-[120px] -translate-y-1/2 pointer-events-none" />

      <Container size="xl" className="relative z-10">
        
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          
          {/* Left Side: Product Image Display */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="w-full lg:w-1/2 relative flex justify-center lg:justify-start"
          >
            {/* The distinct stylized background box with reduced desktop size */}
            <div className="relative w-[300px] sm:w-[340px] lg:w-[380px] h-[340px] sm:h-[400px] lg:h-[440px] bg-primary/10 rounded-[2.25rem] overflow-hidden shadow-xl shadow-primary/15 border border-primary/20 flex items-center justify-center p-6 lg:p-7">
              
              {/* Background gradient using brand color */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#e8f1ff] via-primary/30 to-primary" />
              
              {/* Actual Image */}
              <div className="relative w-full h-full flex items-center justify-center">
                <Image 
                  src={waterFlow.image} 
                  alt="Automated Water Flow Controller" 
                  fill 
                  sizes="(max-width: 768px) 100vw, 380px"
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
            <div className="mb-6 lg:mb-8">
              <span className="text-primary font-black tracking-widest text-xs uppercase mb-2 block">
                {waterFlow.header.tag}
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-4xl font-black text-[#1a2b4b] leading-tight tracking-tight mb-2">
                {waterFlow.header.title}
              </h2>
            </div>

            <ul className="space-y-3.5 mb-8">
              {flowControls.map((control, idx) => (
                <li key={idx} className="flex items-start gap-3.5">
                  <div className="mt-1.5 shrink-0">
                    <div className="w-3.5 h-3.5 rounded-full bg-primary" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-[#1a2b4b] mb-0.5">{control.title}</h4>
                    <p className="text-[#64748b] leading-relaxed text-[14px]">{control.desc}</p>
                  </div>
                </li>
              ))}
            </ul>

            {/* Spec tags box */}
            <div className="bg-[#f1f5f9] rounded-2xl p-5 lg:p-6 w-fit shadow-xs border border-zinc-200/50">
              <ul className="space-y-2 text-[13px] font-medium text-[#64748b]">
                {waterFlow.specs.map((spec, idx) => (
                  <li key={idx}>{spec}</li>
                ))}
              </ul>
            </div>
          </motion.div>

        </div>
      </Container>
    </section>
  );
}
