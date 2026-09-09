"use client";

import React from "react";
import { motion } from "framer-motion";
import { Database, Wifi, Lightbulb } from "lucide-react";

export default function CropifaiAbout() {
  const steps = [
    { num: "1", icon: Database, title: "COLLECT", desc: "Intelligent sensors capture soil, water & environmental data" },
    { num: "2", icon: Wifi, title: "CONNECT", desc: "LoRaWAN & cloud connectivity from remote field locations" },
    { num: "3", icon: Lightbulb, title: "COLLABORATE", desc: "AI-driven dashboards turn data into actionable insights" },
  ];

  return (
    <section className="relative w-full min-h-[70vh] flex items-center bg-zinc-50 overflow-hidden py-24 md:py-32 border-b border-zinc-200">
      
      {/* Dynamic Angled Shape on the left */}
      <div className="absolute left-0 top-0 bottom-0 w-1/2 sm:w-1/3 lg:w-[30%] z-0">
        <svg 
          viewBox="0 0 100 100" 
          preserveAspectRatio="none"
          className="w-full h-full text-primary overflow-visible drop-shadow-[10px_0_30px_rgba(34,197,94,0.15)]"
        >
          <polygon 
            points="-5,-5 100,50 -5,105 0,75 50,50 0,25" 
            fill="currentColor"
          />
        </svg>
        <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent pointer-events-none" />
      </div>

      <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row justify-end items-center">
        <div className="w-full sm:w-[85%] md:w-3/4 lg:w-[75%] pl-6 sm:pl-16 md:pl-24 lg:pl-32 py-8">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4">THE PLATFORM</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black font-display text-zinc-900 mb-6 leading-tight tracking-tight">
              Smart Agriculture, <br />
              Powered by <span className="text-primary">AI & IoT</span>
            </h2>
            
            <p className="text-lg md:text-xl text-zinc-600 leading-relaxed font-medium mb-12 max-w-3xl">
              CropifAI™ is an intelligent, end-to-end platform combining rugged IoT sensors, advanced AI analytics, and cloud technology to fully automate your agricultural operations. We bridge the gap between physical infrastructure and digital intelligence.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8">
            {steps.map((step, i) => (
              <motion.div 
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="bg-white border border-zinc-100 rounded-2xl p-6 shadow-xl shadow-zinc-200/50 hover:border-primary/30 hover:shadow-primary/5 transition-all group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-[100px] transition-transform group-hover:scale-110 pointer-events-none" />
                
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-5 relative z-10 group-hover:bg-primary group-hover:text-white transition-colors">
                  <step.icon className="w-5 h-5" strokeWidth={2.5} />
                </div>
                
                <h3 className="text-sm font-black text-zinc-900 uppercase tracking-widest mb-3 relative z-10">
                  {step.title}
                </h3>
                <p className="text-sm text-zinc-500 font-medium leading-relaxed relative z-10">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
          
        </div>
      </div>
    </section>
  );
}
