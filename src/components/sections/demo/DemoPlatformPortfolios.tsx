"use client";

import React from "react";
import { Factory, Zap, Tractor, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { demoContent } from "@/content/demo";

export default function DemoPlatformPortfolios() {
  const { portfolios: portfoliosContent } = demoContent;

  const iconMap: Record<string, React.ElementType> = {
    Factory,
    Zap,
    Tractor
  };

  const portfolios = portfoliosContent.items.map(item => {
    const Icon = iconMap[item.iconName] || Factory;
    return {
      ...item,
      icon: Icon
    };
  });

  return (
    <section className="w-full bg-[#0a0a0a] text-white py-24 md:py-32 border-b border-neutral-900 overflow-hidden">
      <div className="container-base max-w-[1400px]">
        
        {/* Header Area */}
        <div className="mb-16 md:mb-20">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[10px] font-bold tracking-widest text-neutral-500 uppercase mb-3"
          >
            {portfoliosContent.badge}
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight"
          >
            {portfoliosContent.title}
          </motion.h2>
        </div>

        {/* Cards Container */}
        <div className="flex overflow-x-auto md:grid md:grid-cols-3 gap-4 md:gap-6 lg:gap-8 pb-6 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 snap-x snap-mandatory hide-scrollbar">
          {portfolios.map((portfolio, index) => (
            <Link href={portfolio.link} key={index} className="flex-shrink-0 w-[85vw] sm:w-[400px] md:w-auto snap-center block">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
                className="group relative bg-[#111] border border-neutral-800 rounded-3xl overflow-hidden flex flex-col min-h-[380px] lg:min-h-[480px] cursor-pointer h-full"
              >
                {/* Background Hover Image */}
                <div 
                  className="absolute inset-0 z-0 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-700 ease-in-out"
                  style={{
                    backgroundImage: `url(${portfolio.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
                {/* Dark overlay to ensure text is readable */}
                <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/90 to-[#0a0a0a]/40 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-700 ease-in-out" />
                
                <div className="relative z-10 flex flex-col h-full p-6 md:p-8 lg:p-10">
                  {/* Top Row */}
                  <div className="flex items-start justify-between mb-8 md:mb-12">
                    <div className="w-12 h-12 rounded-2xl bg-black/50 md:bg-neutral-900 border border-white/20 md:border-neutral-800 flex items-center justify-center md:group-hover:bg-black/50 md:group-hover:border-white/20 transition-all duration-300">
                      <portfolio.icon className={`w-5 h-5 text-neutral-400 ${portfolio.color} transition-colors duration-300`} />
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="mt-auto">
                    <h3 className={`text-2xl md:text-3xl font-bold text-white mb-3 md:mb-4 ${portfolio.color} transition-colors duration-300`}>
                      {portfolio.title}
                    </h3>
                    <p className="text-sm text-neutral-300 md:text-neutral-400 leading-relaxed mb-6 md:mb-8 md:group-hover:text-neutral-300 transition-colors duration-300 max-w-[280px]">
                      {portfolio.description}
                    </p>
                    
                    {/* Footer */}
                    <div className="pt-5 md:pt-6 border-t border-white/20 md:border-neutral-800/80 flex items-center justify-between md:group-hover:border-white/20 transition-colors duration-300">
                      <span className="text-[10px] font-bold tracking-widest text-white md:text-neutral-500 uppercase md:group-hover:text-white transition-colors duration-300">
                        {portfolio.category}
                      </span>
                      <ArrowRight className={`w-5 h-5 text-neutral-600 ${portfolio.color} transform translate-x-1 md:translate-x-0 md:group-hover:translate-x-1 transition-all duration-300`} />
                    </div>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        {/* Mobile Swipe Indicator */}
        <div className="flex md:hidden items-center justify-center gap-2 mt-8 text-neutral-500 opacity-80">
          <span className="text-[10px] font-bold tracking-widest uppercase">{portfoliosContent.swipeText}</span>
          <ArrowRight className="w-3.5 h-3.5 animate-pulse" />
        </div>

      </div>
    </section>
  );
}