"use client";

import React from "react";
import { motion } from "framer-motion";
import { Radio, PlugZap, Sprout, Leaf, ArrowRight } from "lucide-react";
import { Container } from "@/design-system/primitives/layout/Container";
import Link from "next/link";

const ecosystems = [
  {
    title: "IoTRICs",
    desc: "IoT platforms for connected assets, real-time data, and operational intelligence.",
    icon: Radio,
    href: "/platforms/iotrics"
  },
  {
    title: "EVOLTICS",
    desc: "Smart EV charging management for connected and sustainable mobility.",
    icon: PlugZap,
    href: "/platforms/evoltics"
  },
  {
    title: "Smart Irrigation",
    desc: "IoT-powered irrigation and precision agriculture for smarter water management.",
    icon: Sprout,
    href: "/"
  },
  {
    title: "ESG & Sustainability",
    desc: "Data-driven energy and carbon solutions for measurable sustainability.",
    icon: Leaf,
    href: "/"
  }
];

export default function CropifaiEcosystem() {
  return (
    <section className="relative w-full py-24 sm:py-32 bg-[#FFFFF] font-sans overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-primary/5 to-transparent pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

      <Container size="xl" className="relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col items-start mb-16 lg:mb-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-px bg-primary" />
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-primary">
              CORPORATE GROUP
            </span>
          </div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-black font-display tracking-tight text-neutral-900 leading-[1.1]"
          >
            Explore the Najhum Ecosystem
          </motion.h2>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8">
          {ecosystems.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="h-full"
            >
              <Link href={item.href} className="group relative flex flex-col h-full bg-white border border-neutral-200 rounded-3xl p-8 shadow-sm hover:shadow-2xl hover:shadow-primary/5 hover:border-primary/30 transition-all duration-500 overflow-hidden">
                
                {/* Hover gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Icon Box */}
                <div className="w-14 h-14 rounded-2xl bg-neutral-100 flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-white group-hover:scale-110 transition-all duration-500 text-neutral-700 relative z-10">
                  <item.icon className="w-6 h-6" strokeWidth={1.5} />
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-bold tracking-tight text-neutral-900 mb-3 relative z-10 group-hover:text-primary transition-colors duration-300">
                  {item.title}
                </h3>
                
                <p className="text-[15px] text-neutral-500 leading-relaxed mb-8 flex-grow relative z-10 group-hover:text-neutral-700 transition-colors duration-300">
                  {item.desc}
                </p>
                
                {/* Link Indicator */}
                <div className="flex items-center text-sm font-bold text-neutral-900 group-hover:text-primary transition-colors duration-300 relative z-10 mt-auto">
                  Learn More 
                  <span className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center ml-3 group-hover:bg-primary/10 transition-colors duration-300">
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </span>
                </div>
                
              </Link>
            </motion.div>
          ))}
        </div>

      </Container>
    </section>
  );
}
