"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Droplets, ArrowRight, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { Container } from "@/design-system/primitives/layout/Container";

export default function CropifaiCaseStudies() {
  const [activeCase, setActiveCase] = useState<number>(0);

  const cases = [
    {
      id: 0,
      client: "Emaar",
      title: "The Greens, Dubai",
      mode: "Proof of Concept",
      location: "The Greens, Dubai",
      launched: "March 2020",
      challenge: "Traditional irrigation causing excessive water waste, inefficient practices, and high maintenance costs in residential community.",
      solution: "Retrofitted existing irrigation with wireless IoT sensors, smart valve controllers, integrated with IoTRICs cloud dashboard.",
      result: "38% reduction in water consumption with optimized irrigation, remote monitoring, and enhanced plant health.",
      metric: "38%",
      metricLabel: "Water Savings Achieved",
      image: "/images/cropifai/the-greens.jpg", // Placeholder or actual image path if available
    },
    {
      id: 1,
      client: "Al Rostamani Properties",
      title: "Garden Villa",
      mode: "Commercial Deployment",
      location: "Dubai",
      launched: "2021",
      challenge: "Need for sustainable environments and optimized watering to reduce carbon footprint and operational costs.",
      solution: "Deployed a full cycle system: Sense (Real-time monitoring) → Decide (Smart engine) → Irrigate (Automated cut-off) → Analyze (Central reports).",
      result: "Reduced water consumption, healthier crop growth, zero electrical cabling (solar-powered), and lower operational costs.",
      metric: "100%",
      metricLabel: "Wireless & Solar-Powered",
      image: "/images/cropifai/garden-villa.jpg", // Placeholder
      outcomes: [
        "Reduced water consumption through smart scheduling",
        "Healthier crop growth with optimized soil moisture",
        "No electrical cabling — wireless & solar-powered",
        "Reduced carbon emissions & lower operational cost"
      ],
      components: "Soil Sensors • Smart Controllers • Cloud Monitoring Platform"
    }
  ];

  return (
    <section className="relative w-full py-24 lg:py-32 bg-zinc-900 overflow-hidden font-sans text-white">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />

      <Container size="xl" className="relative z-10">
        
        {/* Header */}
        <div className="text-left mb-16 md:mb-20 max-w-2xl">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4">CASE STUDIES</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black font-display text-white tracking-tight leading-tight mb-6">
            Real-World Impact
          </h2>
          <p className="text-lg text-zinc-400">
            See how leading organizations are transforming their infrastructure with our smart agriculture and irrigation solutions.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          
          {/* Navigation Column */}
          <div className="w-full lg:w-1/3 flex flex-col gap-3">
            {cases.map((c, i) => (
              <button
                key={c.id}
                onClick={() => setActiveCase(i)}
                className={`flex flex-col text-left p-6 rounded-2xl border transition-all duration-300 relative overflow-hidden group ${
                  activeCase === i 
                    ? "bg-white/10 border-primary/50 shadow-[0_0_30px_rgba(34,197,94,0.1)]" 
                    : "bg-white/5 border-white/10 hover:bg-white/10"
                }`}
              >
                {activeCase === i && (
                  <motion.div 
                    layoutId="activeCaseHighlight" 
                    className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary"
                  />
                )}
                <span className="text-xs font-bold text-primary mb-1 uppercase tracking-wider">{c.client}</span>
                <span className={`text-xl font-bold ${activeCase === i ? "text-white" : "text-zinc-300"} group-hover:text-white transition-colors`}>
                  {c.title}
                </span>
              </button>
            ))}
          </div>

          {/* Content Column */}
          <div className="w-full lg:w-2/3 bg-white/5 border border-white/10 rounded-[2rem] p-8 md:p-12 relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCase}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex flex-wrap gap-x-6 gap-y-3 text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-10 border-b border-white/10 pb-6">
                  <span><span className="text-primary mr-2">•</span>Mode: {cases[activeCase].mode}</span>
                  <span><span className="text-primary mr-2">•</span>Location: {cases[activeCase].location}</span>
                  <span><span className="text-primary mr-2">•</span>Launched: {cases[activeCase].launched}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="space-y-10">
                    <div>
                      <h4 className="text-sm font-bold text-zinc-400 mb-3 uppercase tracking-wider">The Challenge</h4>
                      <p className="text-zinc-200 leading-relaxed font-medium">
                        {cases[activeCase].challenge}
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-bold text-primary mb-3 uppercase tracking-wider">The Solution</h4>
                      <p className="text-zinc-200 leading-relaxed font-medium">
                        {cases[activeCase].solution}
                      </p>
                    </div>

                    {cases[activeCase].outcomes && (
                      <div>
                        <h4 className="text-sm font-bold text-zinc-400 mb-3 uppercase tracking-wider">Key Outcomes</h4>
                        <ul className="space-y-3">
                          {cases[activeCase].outcomes?.map((outcome, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                              <span className="text-sm text-zinc-300 leading-relaxed">{outcome}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className="space-y-10">
                    <div>
                      <h4 className="text-sm font-bold text-zinc-400 mb-3 uppercase tracking-wider">The Result</h4>
                      <p className="text-white leading-relaxed font-semibold text-lg">
                        {cases[activeCase].result}
                      </p>
                    </div>

                    <div className="bg-primary/10 border border-primary/20 rounded-2xl p-8 flex items-center gap-6">
                      <div className="text-5xl md:text-6xl font-black font-display text-primary tracking-tighter">
                        {cases[activeCase].metric}
                      </div>
                      <div className="text-sm font-bold text-white uppercase tracking-wider leading-tight">
                        {cases[activeCase].metricLabel}
                      </div>
                    </div>

                    {cases[activeCase].components && (
                      <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                        <span className="text-xs font-bold text-zinc-400 block mb-2 uppercase tracking-wider">Components Deployed</span>
                        <span className="text-sm text-zinc-200 font-medium leading-relaxed">
                          {cases[activeCase].components}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </Container>
    </section>
  );
}
