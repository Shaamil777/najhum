"use client";

import React from "react";
import { motion } from "framer-motion";
import { Radio, Server } from "lucide-react";
import { demoContent } from "@/content/demo";

export default function DemoTechStack() {
  const { techStack } = demoContent;
  const connectivityTags = techStack.connectivity.tags;
  const infrastructureTags = techStack.infrastructure.tags;

  return (
    <section className="w-full bg-[#0a0a0a] py-20 md:py-24 font-sans">
      <div className="container-base max-w-[1100px]">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
          
          {/* Left: Text Content */}
          <div className="lg:w-1/3 flex flex-col items-start text-left">
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-black tracking-tight text-white mb-4 leading-tight"
            >
              {techStack.title}
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-base text-neutral-400 leading-relaxed mb-6"
            >
              {techStack.description}
            </motion.p>
          </div>
          
          {/* Right: Simple Lists */}
          <div className="lg:w-2/3 w-full grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
            
            {/* Connectivity */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-2 mb-6">
                <Radio className="w-4 h-4 text-neutral-500" />
                <h3 className="text-[11px] font-bold tracking-widest text-neutral-500 uppercase">
                  {techStack.connectivity.badge}
                </h3>
              </div>
              <div className="bg-neutral-900 border border-neutral-800 p-[1px] grid grid-cols-2 sm:grid-cols-3 gap-[1px] rounded-xl overflow-hidden shadow-2xl">
                {connectivityTags.map((tag, i) => (
                  <motion.div 
                    key={i} 
                    className="group bg-[#0a0a0a] md:hover:bg-[#111] h-20 md:h-24 relative flex flex-col justify-between p-3 md:p-4 transition-colors duration-300 cursor-default"
                  >
                    {/* Status Dot */}
                    <div className="self-end w-1.5 h-1.5 rounded-full bg-neutral-800 md:group-hover:bg-blue-500 md:group-hover:shadow-[0_0_8px_rgba(59,130,246,0.8)] transition-all duration-300" />
                    
                    {/* Tech Name */}
                    <span className="text-[10px] md:text-xs font-mono font-bold tracking-tight text-neutral-500 md:group-hover:text-blue-400 transition-colors duration-300">
                      {tag}
                    </span>
                    
                    {/* Hover Glow Line */}
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-500 transform scale-x-0 md:group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            {/* Infrastructure */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center gap-2 mb-6">
                <Server className="w-4 h-4 text-neutral-500" />
                <h3 className="text-[11px] font-bold tracking-widest text-neutral-500 uppercase">
                  {techStack.infrastructure.badge}
                </h3>
              </div>
              
              <div className="bg-neutral-900 border border-neutral-800 p-[1px] grid grid-cols-2 sm:grid-cols-3 gap-[1px] rounded-xl overflow-hidden shadow-2xl">
                {infrastructureTags.map((tag, i) => (
                  <motion.div 
                    key={i} 
                    className="group bg-[#0a0a0a] md:hover:bg-[#111] h-20 md:h-24 relative flex flex-col justify-between p-3 md:p-4 transition-colors duration-300 cursor-default"
                  >
                    {/* Status Dot */}
                    <div className="self-end w-1.5 h-1.5 rounded-full bg-neutral-800 md:group-hover:bg-emerald-500 md:group-hover:shadow-[0_0_8px_rgba(16,185,129,0.8)] transition-all duration-300" />
                    
                    {/* Tech Name */}
                    <span className="text-[10px] md:text-xs font-mono font-bold tracking-tight text-neutral-500 md:group-hover:text-emerald-400 transition-colors duration-300">
                      {tag}
                    </span>
                    
                    {/* Hover Glow Line */}
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-emerald-500 transform scale-x-0 md:group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  </motion.div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}