"use client";

import React from "react";
import { motion } from "framer-motion";
import { Droplets, Leaf, TrendingUp, ShieldCheck, Globe2, Activity } from "lucide-react";
import { Container } from "@/design-system/primitives/layout/Container";

const impacts = [
  { value: "38%", title: "Water Savings", desc: "Smart irrigation optimization", icon: Droplets, color: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-500/20" },
  { value: "30%", title: "Crop Quality Improvement", desc: "Precision farming", icon: Leaf, color: "text-green-500", bg: "bg-green-500/10", border: "border-green-500/20" },
  { value: "35%", title: "Revenue & Profit Increase", desc: "Smart agriculture", icon: TrendingUp, color: "text-emerald-500", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
  { value: "30%", title: "Food Safety Enhancement", desc: "Supply chain traceability", icon: ShieldCheck, color: "text-orange-500", bg: "bg-orange-500/10", border: "border-orange-500/20" },
  { value: "25%", title: "Environmental Impact Reduction", desc: "Sustainable practices", icon: Globe2, color: "text-teal-500", bg: "bg-teal-500/10", border: "border-teal-500/20" },
  { value: "40%", title: "Market Competitiveness", desc: "Enhanced efficiency", icon: Activity, color: "text-indigo-500", bg: "bg-indigo-500/10", border: "border-indigo-500/20" },
];

export default function CropifaiImpact() {
  return (
    <section className="relative w-full py-14 lg:py-20 bg-white overflow-hidden font-sans border-t border-zinc-100">
      <Container size="xl" className="relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-12">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-primary mb-2.5">PROVEN IMPACT</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black font-display text-zinc-900 tracking-tight leading-tight mb-3">
            Real-World Impact
          </h2>
          <p className="text-sm md:text-base text-zinc-500">
            Field-proven technology deployed across residential, commercial, and agricultural projects.
          </p>
        </div>

        {/* Impact Grid with reduced card sizes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
          {impacts.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              className={`relative bg-white rounded-2xl p-5 sm:p-6 border ${item.border} hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group overflow-hidden`}
            >
              {/* Subtle background glow on hover */}
              <div className={`absolute -right-10 -top-10 w-28 h-28 ${item.bg} rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500 pointer-events-none`} />
              
              <div className="relative z-10">
                <span className="text-xs font-semibold text-zinc-400 block mb-1">Up to</span>
                <div className={`text-3xl sm:text-4xl lg:text-[42px] font-black font-display ${item.color} mb-3 tracking-tight leading-none`}>
                  {item.value}
                </div>
                <h4 className="text-sm sm:text-base font-bold text-zinc-900 mb-1 leading-snug">
                  {item.title}
                </h4>
                <p className="text-xs text-zinc-500 font-medium leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </Container>
    </section>
  );
}
