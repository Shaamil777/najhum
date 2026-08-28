"use client";

import React from "react";
import { motion } from "framer-motion";
import { Radio, PlugZap, Sprout, ArrowRight } from "lucide-react";
import { Container } from "@/design-system/primitives/layout/Container";
import Link from "next/link";

const ecosystems = [
  {
    title: "IoTRICs",
    desc: "Universal industrial IoT platform for real-time asset monitoring.",
    icon: Radio,
    href: "/platforms/iotrics"
  },
  {
    title: "EVOLTICS",
    desc: "Comprehensive management software for EV charging networks.",
    icon: PlugZap,
    href: "/platforms/evoltics"
  },
  {
    title: "CropifAI",
    desc: "AI-driven precision agriculture for optimized resource use.",
    icon: Sprout,
    href: "/platforms/cropifai"
  }
];

export default function ContactExplore() {
  return (
    <section className="w-full py-24 sm:py-32 bg-stone-50 font-poppins border-b border-neutral-200">
      <Container size="xl">
        
        {/* Header Section */}
        <div className="text-center mb-16 lg:mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-neutral-900 leading-[1.1]"
          >
            Explore The Najhum Ecosystem
          </motion.h2>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {ecosystems.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="h-full"
            >
              <Link href={item.href} className="group flex flex-col h-full bg-white border border-neutral-200 rounded-3xl p-8 lg:p-10 shadow-sm hover:shadow-xl hover:border-neutral-300 transition-all duration-300">
                
                {/* Icon Box */}
                <div className="w-14 h-14 rounded-xl bg-neutral-100 flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-white transition-colors duration-300 text-neutral-700">
                  <item.icon className="w-6 h-6" />
                </div>
                
                {/* Content */}
                <h3 className="text-xl lg:text-2xl font-bold tracking-tight text-neutral-900 mb-3">
                  {item.title}
                </h3>
                
                <p className="text-[15px] text-neutral-500 leading-relaxed mb-8 flex-grow">
                  {item.desc}
                </p>
                
                {/* Link */}
                <div className="flex items-center text-sm font-bold text-neutral-900 group-hover:text-primary transition-colors duration-300">
                  Learn More <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

      </Container>
    </section>
  );
}