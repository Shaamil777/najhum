"use client";

import React from "react";
import { Factory, Zap, Tractor, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function DemoPlatformPortfolios() {
  const portfolios = [
    {
      icon: Factory,
      title: "IoTRICs",
      description: "General Industrial IoT management suite for mixed assets and infrastructure monitoring.",
      category: "INDUSTRIAL AUTOMATION",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop",
      color: "group-hover:text-blue-400",
    },
    {
      icon: Zap,
      title: "EVOLTICS",
      description: "Specialized grid-edge analytics for smart meters, EV networks, and renewable energy storage.",
      category: "ENERGY INTELLIGENCE",
      image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=800&auto=format&fit=crop",
      color: "group-hover:text-emerald-400",
    },
    {
      icon: Tractor,
      title: "CropifAI",
      description: "Agritech platform focused on yield optimization and precision soil analysis via satellite and on-site sensors.",
      category: "PRECISION AGRI",
      image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=800&auto=format&fit=crop",
      color: "group-hover:text-amber-400",
    }
  ];

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
            Our Ecosystem
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight"
          >
            Platform Portfolios.
          </motion.h2>
        </div>

        {/* Cards Container */}
        <div className="flex overflow-x-auto md:grid md:grid-cols-3 gap-4 md:gap-6 lg:gap-8 pb-6 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 snap-x snap-mandatory hide-scrollbar">
          {portfolios.map((portfolio, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
              className="group relative bg-[#111] border border-neutral-800 rounded-3xl overflow-hidden flex flex-col min-h-[380px] lg:min-h-[480px] cursor-pointer flex-shrink-0 w-[85vw] sm:w-[400px] md:w-auto snap-center"
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
          ))}
        </div>

        {/* Mobile Swipe Indicator */}
        <div className="flex md:hidden items-center justify-center gap-2 mt-8 text-neutral-500 opacity-80">
          <span className="text-[10px] font-bold tracking-widest uppercase">Swipe to view more</span>
          <ArrowRight className="w-3.5 h-3.5 animate-pulse" />
        </div>

      </div>
    </section>
  );
}