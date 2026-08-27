"use client";

import React from "react";
import { motion } from "framer-motion";
import { Wifi, Cpu, Settings } from "lucide-react";

const steps = [
  {
    step: "01",
    title: "Connect",
    desc: "Integrate sensors, assets, and infrastructure into a unified ecosystem using open communication protocols.",
    icon: Wifi,
  },
  {
    step: "02",
    title: "Compute",
    desc: "Process real-time data across cloud and edge to transform raw telemetry into actionable intelligence.",
    icon: Cpu,
  },
  {
    step: "03",
    title: "Control",
    desc: "Automate decisions, orchestrate workflows, and execute operational responses without manual intervention.",
    icon: Settings,
  },
];

export default function IotricsMethodology() {
  return (
    <section className="w-full bg-white py-24 sm:py-32 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-8 max-w-[1440px]">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl font-bold tracking-tight text-neutral-900 leading-[1.1] mb-4"
          >
            The 3C Methodology
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-neutral-500 text-lg leading-relaxed"
          >
            Our framework for transforming physical infrastructure into intelligent, connected operations.
          </motion.p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 relative">
          
          {/* Connecting line (desktop) */}
          <div className="absolute top-[52px] left-[16.66%] right-[16.66%] h-px bg-neutral-200 hidden md:block z-0" />

          {steps.map((s, idx) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="flex flex-col items-center text-center px-8 sm:px-12 relative z-10"
            >
              {/* Step circle */}
              <div className="w-[104px] h-[104px] rounded-full bg-neutral-50 border border-neutral-200 flex items-center justify-center mb-8 relative">
                <s.icon className="w-6 h-6 text-neutral-900" strokeWidth={1.5} />
                <span className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-neutral-900 text-white text-[11px] font-bold flex items-center justify-center">
                  {s.step}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-neutral-900 mb-3 tracking-tight">
                {s.title}
              </h3>

              {/* Description */}
              <p className="text-neutral-500 text-[15px] leading-relaxed max-w-[280px]">
                {s.desc}
              </p>

              {/* Mobile connector */}
              {idx < steps.length - 1 && (
                <div className="w-px h-12 bg-neutral-200 my-8 md:hidden" />
              )}
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
