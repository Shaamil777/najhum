"use client";

import React from "react";
import { ArrowRight, Image as ImageIcon, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { demoContent } from "@/content/demo";

export default function DemoHero() {
  const { hero } = demoContent;
  return (
    <section className="w-full bg-white pt-32 pb-16 md:pt-48 md:pb-24 font-sans overflow-hidden">
      <div className="container-base max-w-[1200px]">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-8 items-center">
          
          {/* Left Content */}
          <div className="w-full lg:w-[45%] flex flex-col items-start text-left z-10">
            
            <motion.h1 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-black text-neutral-900 tracking-tighter leading-[1.05] mb-6"
            >
              {hero.titlePart1}<br />{hero.titlePart2}
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base md:text-lg text-neutral-500 leading-relaxed mb-10 max-w-[420px]"
            >
              {hero.description}
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
            >
              <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-black text-white text-[10px] font-bold tracking-widest uppercase rounded-lg shadow-xl shadow-black/10 hover:-translate-y-0.5 hover:shadow-2xl hover:bg-neutral-900 transition-all duration-300">
                {hero.buttonExplore}
                <ArrowRight className="w-4 h-4" />
              </button>
              <button className="w-full sm:w-auto flex items-center justify-center px-8 py-4 bg-white border-2 border-neutral-200 text-neutral-900 text-[10px] font-bold tracking-widest uppercase rounded-lg hover:border-neutral-300 hover:bg-neutral-50 transition-colors duration-300">
                {hero.buttonDemo}
              </button>
            </motion.div>
          </div>
          
          {/* Right Content - Hero Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-[55%] relative lg:pl-12 flex items-center justify-center"
          >
            <div className="relative w-full overflow-hidden group">
              <img 
                src="/images/demo/IoT%20Irrigation%20Dashboard%20Field%20Cutaway.png" 
                alt="IoT Irrigation Dashboard" 
                className="w-full h-auto object-cover opacity-80"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}