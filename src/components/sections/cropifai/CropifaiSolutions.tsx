"use client";

import React from "react";
import { motion } from "framer-motion";
import { Target, Droplets, BrainCircuit, CloudCog, ArrowRight, Zap } from "lucide-react";
import { Container } from "@/design-system/primitives/layout/Container";

export default function CropifaiSolutions() {
  const solutions = [
    {
      title: "Precision Farming",
      description: "Multi-depth soil sensors, weather monitoring, crop health tracking",
      icon: Target,
      color: "from-blue-500/20 to-blue-500/0",
      accent: "text-blue-400"
    },
    {
      title: "Smart Irrigation",
      description: "Automated valve control, fertigation, water flow optimization",
      icon: Droplets,
      color: "from-teal-500/20 to-teal-500/0",
      accent: "text-teal-400"
    },
    {
      title: "AI/ML Analytics",
      description: "Satellite imagery, NDVI analysis, yield prediction, recommendations",
      icon: BrainCircuit,
      color: "from-purple-500/20 to-purple-500/0",
      accent: "text-purple-400"
    },
    {
      title: "Cloud Platform",
      description: "Real-time dashboards, remote monitoring, multi-site management",
      icon: CloudCog,
      color: "from-pink-500/20 to-pink-500/0",
      accent: "text-pink-400"
    },
  ];

  const flowSteps = ["Sense", "Analyze", "Decide", "Irrigate"];

  return (
    <section id="solutions" className="relative w-full py-24 lg:py-32 bg-[#09090b] text-white overflow-hidden font-sans border-y border-white/5">
      
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[500px] bg-primary/10 rounded-[100%] blur-[120px] pointer-events-none opacity-50" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

      <Container size="xl" className="relative z-10">
        
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-20 lg:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-zinc-300 text-xs font-bold tracking-[0.2em] uppercase mb-6 backdrop-blur-sm"
          >
            <Zap className="w-4 h-4 text-primary" />
            Core Solutions
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black font-display text-white leading-tight tracking-tight mb-8"
          >
            The Future of <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">Smart Agriculture</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-zinc-400 font-medium leading-relaxed max-w-3xl"
          >
            A revolutionary IoT-based agriculture and irrigation system using sensors, devices, and data analytics to monitor and optimize farming operations.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-24">
          {solutions.map((solution, index) => {
            const Icon = solution.icon;
            return (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6, type: "spring", stiffness: 100 }}
                className="group relative bg-[#111111] rounded-[2rem] p-8 border border-white/10 hover:border-white/20 transition-all duration-500 overflow-hidden"
              >
                {/* Glow effect on hover */}
                <div className={`absolute top-0 inset-x-0 h-32 bg-gradient-to-b ${solution.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 shadow-xl">
                    <Icon className={`w-8 h-8 ${solution.accent}`} strokeWidth={1.5} />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">
                    {solution.title}
                  </h3>
                  
                  <p className="text-sm text-zinc-400 leading-relaxed font-medium mt-auto">
                    {solution.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Process Flow */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative max-w-5xl mx-auto"
        >
          <div className="absolute inset-0 bg-primary/20 blur-[60px] rounded-full pointer-events-none" />
          
          <div className="relative bg-[#111] border border-white/10 rounded-[2.5rem] py-6 px-8 md:px-16 flex flex-wrap items-center justify-center gap-4 md:gap-8 shadow-2xl backdrop-blur-xl">
            <p className="w-full text-center text-xs font-bold tracking-[0.2em] text-zinc-500 uppercase mb-4 md:hidden">Workflow</p>
            
            {flowSteps.map((step, index) => (
              <React.Fragment key={index}>
                <div className="flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/5 border border-white/10 text-primary text-xs font-black">
                    0{index + 1}
                  </span>
                  <span className="text-lg md:text-2xl font-black font-display text-white tracking-wide">
                    {step}
                  </span>
                </div>
                {index < flowSteps.length - 1 && (
                  <ArrowRight className="w-5 h-5 text-zinc-600 hidden md:block" />
                )}
              </React.Fragment>
            ))}
          </div>
        </motion.div>

      </Container>
    </section>
  );
}
