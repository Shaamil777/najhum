"use client";

import React from "react";
import { motion } from "framer-motion";
import { Building2, Snowflake, Hotel, Factory, Truck, Building, Tractor, ShoppingCart, Zap } from "lucide-react";

import { iotricsContent } from "@/content/iotrics";

const industriesData = iotricsContent.industries.items;

const industries = [
  { ...industriesData[0], icon: Building2 },
  { ...industriesData[1], icon: Snowflake },
  { ...industriesData[2], icon: Hotel },
  { ...industriesData[3], icon: Factory },
  { ...industriesData[4], icon: Truck },
  { ...industriesData[5], icon: Building },
  { ...industriesData[6], icon: Tractor },
  { ...industriesData[7], icon: ShoppingCart }
];

export default function IotricsIndustries() {
  const { industries: industriesContent } = iotricsContent;
  return (
    <section className="w-full bg-[#111111] text-white py-24 sm:py-32 font-poppins border-b border-neutral-900">
      <div className="container mx-auto px-6 lg:px-8 max-w-[1440px]">
        
        {/* Header Section */}
        <div className="mb-16 lg:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-10">
          <div className="max-w-2xl">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1] mb-2"
            >
              {industriesContent.header.titlePart1}
            </motion.h2>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-neutral-500 leading-[1.1]"
            >
              {industriesContent.header.titlePart2}
            </motion.h2>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="max-w-md"
          >
            <p className="text-neutral-400 text-base sm:text-lg leading-relaxed">
              {industriesContent.header.description}
            </p>
          </motion.div>
        </div>

        {/* ═══ DESKTOP GRID (lg+) ═══ */}
        <div className="hidden lg:grid grid-cols-4 border-t border-l border-neutral-800/80">
          {industries.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="relative border-r border-b border-neutral-800/80 p-8 sm:p-10 flex flex-col group h-full overflow-hidden cursor-pointer"
            >
              {/* Hover Background Image */}
              <div 
                className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{
                  backgroundImage: `url(${item.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
              
              {/* Hover Dark Overlay Gradient */}
              <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#111111] via-[#111111]/85 to-[#111111]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              {/* Content (z-10) */}
              <div className="relative z-10 flex flex-col h-full">
                <item.icon className="w-5 h-5 text-blue-400 mb-10 group-hover:text-blue-300 transition-colors duration-500" />
                
                <h3 className="text-sm font-semibold tracking-wide text-white mb-3 group-hover:text-blue-300 transition-colors duration-500">
                  {item.title}
                </h3>
                
                <div className="text-6xl sm:text-7xl font-medium tracking-tighter text-white mb-8 transition-transform duration-500 group-hover:scale-105 origin-left">
                  {item.number}
                </div>
                
                <p className="text-[13px] text-neutral-500 leading-relaxed mt-auto group-hover:text-neutral-300 transition-colors duration-500">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ═══ MOBILE GRID (< lg) ═══ */}
        <div className="grid grid-cols-2 lg:hidden gap-3 sm:gap-4">
          {industries.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.04 }}
              className="bg-neutral-900/60 border border-neutral-800/60 rounded-2xl p-5 flex flex-col"
            >
              <div className="flex items-center justify-between mb-4">
                <item.icon className="w-4 h-4 text-blue-400" />
                <span className="text-2xl font-bold tracking-tighter text-neutral-700">
                  {item.number}
                </span>
              </div>
              <h3 className="text-[13px] font-semibold text-white leading-snug">
                {item.title}
              </h3>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
