"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin, Mail, Phone, Clock } from "lucide-react";
import { contactContent } from "@/content/contact";

export default function ContactAddress() {
  const { address } = contactContent;

  const iconMap: Record<string, React.ElementType> = {
    MapPin,
    Mail,
    Phone,
    Clock
  };

  const addressDetails = address.details.map((item) => {
    const Icon = iconMap[item.iconName] || MapPin;
    
    let content;
    if (item.type === "address") {
      content = (
        <div className="flex flex-col gap-2">
          <p className="text-neutral-400">{item.location}</p>
          <p className="text-neutral-400">{item.addressLine1}</p>
          <p className="text-neutral-400">{item.addressLine2}</p>
          <a href="#" className="text-sm font-semibold text-white underline underline-offset-4 mt-2 hover:text-blue-400 transition-colors inline-block">
            {item.linkText}
          </a>
        </div>
      );
    } else if (item.type === "emails") {
      content = (
        <div className="flex flex-col gap-2">
          {item.emails?.map((email, idx) => (
            <p key={idx} className="text-neutral-400"><span className="text-neutral-600">{email.label}:</span> {email.address}</p>
          ))}
        </div>
      );
    } else if (item.type === "phones") {
      content = (
        <div className="flex flex-col gap-2">
          {item.phones?.map((phone, idx) => (
            <p key={idx} className="text-neutral-400"><span className="text-neutral-600">{phone.label}:</span> {phone.number}</p>
          ))}
        </div>
      );
    } else if (item.type === "hours") {
      content = (
        <div className="flex flex-col gap-2">
          <p className="text-neutral-400">{item.days}</p>
          <p className="text-neutral-400 mb-2">{item.hours}</p>
          <p className="text-neutral-500 italic text-sm">{item.note}</p>
        </div>
      );
    }

    return {
      title: item.title,
      icon: Icon,
      content
    };
  });

  return (
    <section className="w-full bg-[#111111] text-white py-24 sm:py-32 font-poppins border-b border-neutral-900 overflow-hidden">
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
              {address.headerTitle1}
            </motion.h2>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-neutral-500 leading-[1.1]"
            >
              {address.headerTitle2}
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
              {address.headerDescription}
            </p>
          </motion.div>
        </div>

        {/* ═══ DESKTOP GRID (lg+) ═══ */}
        <div className="hidden lg:grid grid-cols-4 border-t border-l border-neutral-800/80">
          {addressDetails.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative border-r border-b border-neutral-800/80 p-8 xl:p-12 flex flex-col group h-full overflow-hidden"
            >
              {/* Hover Dark Overlay Gradient */}
              <div className="absolute inset-0 z-0 bg-gradient-to-b from-neutral-800/0 to-neutral-800/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              {/* Content */}
              <div className="relative z-10 flex flex-col h-full">
                <item.icon className="w-6 h-6 text-blue-400 mb-10 group-hover:text-blue-300 transition-colors duration-500" />
                
                <h3 className="text-xl font-bold tracking-wide text-white mb-6 group-hover:text-blue-300 transition-colors duration-500">
                  {item.title}
                </h3>
                
                <div className="text-[14px] leading-relaxed mt-auto group-hover:text-neutral-300 transition-colors duration-500">
                  {item.content}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ═══ MOBILE GRID (< lg) ═══ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:hidden gap-4 sm:gap-6">
          {addressDetails.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="bg-neutral-900/60 border border-neutral-800/60 rounded-2xl p-6 sm:p-8 flex flex-col"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-neutral-800/80 flex items-center justify-center shadow-inner">
                  <item.icon className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="text-lg font-bold text-white tracking-tight">
                  {item.title}
                </h3>
              </div>
              <div className="text-[14px] leading-relaxed pl-2">
                {item.content}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}