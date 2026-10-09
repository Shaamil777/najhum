"use client";

import React from "react";
import { motion } from "framer-motion";
import type { MethodologyContent } from "@/types/section";

export default function MethodologySection({ content }: { content: MethodologyContent }) {
  return (
    <section className="relative w-full py-24 md:py-32 bg-zinc-50 overflow-hidden font-sans border-b border-zinc-200">
      
      {/* Background Pixel Grid Effect */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)] bg-[size:32px_32px] opacity-70"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-50 via-transparent to-zinc-50"></div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        <div className="mb-16 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 mb-6">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="text-[10px] md:text-xs font-bold tracking-widest uppercase text-white">
              {content.eyebrow}
            </span>
          </div>
          
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight text-zinc-900 mb-6 uppercase">
            {content.heading.split(' ').map((word, i, arr) => 
              i === arr.length - 1 ? <span key={i} className="text-primary">{word}</span> : word + ' '
            )}
          </h2>
          
          <p className="max-w-2xl text-zinc-600 text-lg">
            {content.bodyText}
          </p>
        </div>

        <div className={`grid grid-cols-1 sm:grid-cols-2 ${content.steps.length === 1 ? 'lg:grid-cols-1' : content.steps.length === 2 ? 'lg:grid-cols-2' : content.steps.length === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-4'} gap-6 justify-center`}>
          {content.steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
              className="group relative bg-white rounded-2xl p-8 border border-zinc-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1"
            >
              {/* Decorative background shape */}
              <div className="absolute -right-8 -top-8 w-24 h-24 rounded-full bg-primary/5 group-hover:bg-primary/10 transition-colors duration-300"></div>
              
              <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-zinc-50 border border-zinc-100 group-hover:border-primary/30 group-hover:bg-primary/5 transition-colors mb-6 relative z-10 shadow-sm">
                <span className="text-lg font-black text-primary font-mono tracking-tighter">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              
              <h3 className="text-base font-bold text-zinc-900 mb-3 group-hover:text-primary transition-colors uppercase tracking-wide">
                {step.title}
              </h3>
              
              <p className="text-sm text-zinc-500 leading-relaxed group-hover:text-zinc-700 transition-colors">
                {step.description}
              </p>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 w-0 h-1 bg-primary group-hover:w-full transition-all duration-300"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
