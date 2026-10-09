"use client";

import React from "react";
import { ShieldCheck, Lock, Cloud, ActivitySquare, Webhook, History } from "lucide-react";
import { motion } from "framer-motion";
import { demoContent } from "@/content/demo";

export default function DemoEnterpriseFeatures() {
  const { enterpriseFeatures } = demoContent;

  const iconMap: Record<string, React.ElementType> = {
    ShieldCheck, Lock, Cloud, ActivitySquare, Webhook, History
  };

  const features = enterpriseFeatures.features.map((feature) => {
    const Icon = iconMap[feature.iconName] || ShieldCheck;
    return {
      ...feature,
      icon: <Icon className="w-5 h-5" strokeWidth={1.5} />
    };
  });

  return (
    <section className="w-full bg-white py-24 md:py-32 font-sans border-b border-neutral-200">
      <div className="container-base max-w-[1200px]">
        
        {/* Minimal Corporate Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-20 pb-8 border-b border-neutral-200">
          <div className="max-w-xl">
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[10px] font-bold tracking-widest text-neutral-500 uppercase mb-4"
            >
              {enterpriseFeatures.badge}
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl font-semibold tracking-tight text-neutral-900 leading-tight"
            >
              {enterpriseFeatures.title}
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-neutral-500 max-w-sm text-sm md:text-base leading-relaxed"
          >
            {enterpriseFeatures.description}
          </motion.p>
        </div>
        
        {/* Minimal Symmetrical Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col group"
            >
              <div className="mb-6 flex items-center">
                <div className="w-12 h-12 rounded-full bg-neutral-50 border border-neutral-200 flex items-center justify-center text-neutral-600 group-hover:bg-neutral-900 group-hover:border-neutral-900 group-hover:text-white transition-all duration-300">
                  {feature.icon}
                </div>
                {/* Decorative minimal line */}
                <div className="h-px w-8 bg-neutral-200 ml-4 group-hover:bg-neutral-900 transition-colors duration-300" />
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-3 tracking-tight">
                {feature.title}
              </h3>
              <p className="text-sm text-neutral-500 leading-relaxed font-medium">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
        
      </div>
    </section>
  );
}