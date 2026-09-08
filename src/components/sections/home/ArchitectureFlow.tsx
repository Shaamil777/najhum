"use client";

import React from "react";
import { Factory, Cpu, Network, CloudCog, Lightbulb, ChevronRight } from "lucide-react";
import { motion, Variants } from "framer-motion";

const steps = [
  { id: 1, title: "Physical Assets", icon: Factory, desc: "Industrial infrastructure", color: "from-blue-500 to-cyan-400" },
  { id: 2, title: "Sensors", icon: Cpu, desc: "Data acquisition", color: "from-cyan-400 to-teal-400" },
  { id: 3, title: "Connectivity", icon: Network, desc: "Secure transmission", color: "from-teal-400 to-emerald-400" },
  { id: 4, title: "Cloud Architecture", icon: CloudCog, desc: "Data processing", color: "from-emerald-400 to-indigo-400" },
  { id: 5, title: "Decisions", icon: Lightbulb, desc: "Actionable insights", color: "from-indigo-400 to-primary", highlight: true }
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export default function ArchitectureFlow() {
  return (
    <div className="relative w-full mt-16 lg:mt-32 pt-8 lg:pt-16 border-t border-zinc-200/50 z-10">
      <div className="w-full relative z-20">
        <div className="text-center mb-16">
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight text-zinc-900 mb-4">
            Intelligent Data Flow
          </h3>
          <p className="text-sm md:text-base text-zinc-500 max-w-2xl mx-auto px-4">
            Transforming physical infrastructure into actionable intelligence through a seamless, secure, and scalable architecture.
          </p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="relative flex flex-col lg:flex-row items-center justify-between w-full max-w-6xl mx-auto gap-4 lg:gap-0 px-6 lg:px-0"
        >
          {/* Animated Background Line */}
          <div className="hidden lg:block absolute top-[35%] left-[5%] right-[5%] h-[2px] bg-zinc-200 -translate-y-1/2 z-0 overflow-hidden rounded-full">
            <motion.div 
              initial={{ x: "-100%" }}
              whileInView={{ x: "100%" }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
              className="w-1/3 h-full bg-gradient-to-r from-transparent via-primary to-transparent"
            />
          </div>

          {steps.map((step, index) => {
            const isLast = index === steps.length - 1;
            return (
              <React.Fragment key={step.id}>
                {/* Step Node */}
                <motion.div 
                  variants={itemVariants}
                  className={`relative z-10 flex flex-col items-center justify-start p-6 w-full lg:w-[18%] bg-white rounded-2xl border transition-all duration-500 hover:-translate-y-2 group ${
                    step.highlight 
                      ? "border-primary/30 shadow-[0_8px_30px_rgb(0,0,0,0.12)] shadow-primary/20 ring-1 ring-primary/10" 
                      : "border-zinc-200 shadow-sm hover:shadow-md hover:border-zinc-300"
                  }`}
                >
                  {/* Icon Container */}
                  <div className={`w-14 h-14 lg:w-16 lg:h-16 rounded-2xl flex items-center justify-center mb-4 lg:mb-5 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 ${
                    step.highlight 
                      ? "bg-gradient-to-br from-primary to-primary-hover text-white shadow-lg shadow-primary/30" 
                      : "bg-zinc-50 text-zinc-700 border border-zinc-100 group-hover:bg-white group-hover:border-zinc-200"
                  }`}>
                    <step.icon className={`w-6 h-6 lg:w-7 lg:h-7 ${step.highlight ? "" : "text-zinc-600 group-hover:text-primary transition-colors"}`} strokeWidth={1.5} />
                  </div>
                  
                  {/* Text */}
                  <h4 className={`text-sm font-bold mb-2 text-center ${step.highlight ? "text-primary" : "text-zinc-900"}`}>
                    {step.title}
                  </h4>
                  <p className="text-[11px] md:text-xs text-zinc-500 text-center leading-relaxed">
                    {step.desc}
                  </p>

                  {/* Highlight glow effect */}
                  {step.highlight && (
                    <div className="absolute inset-0 bg-primary/5 rounded-2xl blur-xl -z-10 group-hover:bg-primary/10 transition-colors pointer-events-none" />
                  )}
                </motion.div>

                {/* Connecting Chevron for Mobile */}
                {!isLast && (
                  <motion.div variants={itemVariants} className="lg:hidden flex justify-center py-2 text-zinc-300">
                    <ChevronRight className="w-5 h-5 rotate-90" />
                  </motion.div>
                )}
              </React.Fragment>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
