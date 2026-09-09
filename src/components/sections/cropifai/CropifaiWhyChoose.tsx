"use client";

import React from "react";
import { motion } from "framer-motion";
import { Droplets, Leaf, TrendingDown, Globe2 } from "lucide-react";
import { Container } from "@/design-system/primitives/layout/Container";

export default function CropifaiWhyChoose() {
  const features = [
    {
      title: "Water Conservation",
      description: "Save millions of gallons annually through precision delivery systems that only water when the plant needs it.",
      icon: Droplets,
    },
    {
      title: "Crop Quality",
      description: "Ensure optimal growing conditions for maximum yield and quality by monitoring key soil and environmental metrics.",
      icon: Leaf,
    },
    {
      title: "Cost Reduction",
      description: "Lower energy bills, labor costs, and fertilizer expenses through targeted, automated resource distribution.",
      icon: TrendingDown,
    },
    {
      title: "Sustainability",
      description: "Meet environmental goals with eco-friendly smart agriculture practices that reduce your overall carbon footprint.",
      icon: Globe2,
    },
  ];

  const roadmap = [
    {
      num: "1",
      title: "Initial Assessment",
      description: "Reviewing farm topography and crop requirements.",
    },
    {
      num: "2",
      title: "Field Survey",
      description: "Sensor placement optimization and network coverage testing.",
    },
    {
      num: "3",
      title: "Hardware Deployment",
      description: "Installation of IoT sensors, gateways, and controllers.",
    },
    {
      num: "4",
      title: "Cloud Integration",
      description: "Live data feed activation and dashboard configuration.",
    },
    {
      num: "5",
      title: "AI Optimization",
      description: "Model training and autonomous irrigation active.",
    },
  ];

  return (
    <section className="relative w-full py-24 md:py-32 bg-zinc-50 text-zinc-900 overflow-hidden font-sans border-b border-zinc-200">
      
      {/* Background Decor */}
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <Container size="xl" className="relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          
          {/* Why Choose Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4">BENEFITS</p>
            <h2 className="text-4xl md:text-5xl font-black font-display text-zinc-900 leading-tight tracking-tight mb-12">
              Why Choose <br />
              <span className="text-primary">cropifAI™?</span>
            </h2>
            
            <div className="flex flex-col gap-10">
              {features.map((feature, idx) => (
                <div key={idx} className="flex gap-6 items-start group">
                  <div className="w-14 h-14 shrink-0 rounded-2xl bg-white shadow-lg shadow-zinc-200/50 border border-zinc-100 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 group-hover:scale-110">
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-zinc-900 group-hover:text-primary transition-colors">{feature.title}</h3>
                    <p className="text-zinc-600 font-medium leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Roadmap Section */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl shadow-zinc-200/50 border border-zinc-100 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[100px] pointer-events-none" />
            
            <h3 className="text-2xl md:text-3xl font-black font-display text-zinc-900 mb-10 tracking-tight">
              Implementation Roadmap
            </h3>
            
            <div className="relative border-l-2 border-zinc-100 ml-4 flex flex-col gap-8 pb-4">
              {roadmap.map((step, idx) => (
                <div key={idx} className="relative pl-8 group">
                  {/* Timeline dot */}
                  <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-zinc-200 ring-4 ring-white shadow-sm group-hover:bg-primary transition-colors duration-300" />
                  
                  <h4 className="text-lg font-bold text-zinc-900 mb-1 flex items-center gap-2 group-hover:text-primary transition-colors">
                    <span className="text-primary font-black text-xs tracking-wider">STEP {step.num}</span> 
                    <span className="text-zinc-300 mx-1">•</span>
                    {step.title}
                  </h4>
                  <p className="text-zinc-500 font-medium leading-relaxed text-sm md:text-base">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </Container>
    </section>
  );
}
