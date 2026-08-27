"use client";

import React from "react";
import { motion } from "framer-motion";
import { Building2, Snowflake, Hotel, Factory, Truck, Building, Tractor, ShoppingCart, Zap } from "lucide-react";

const industries = [
  {
    number: "01",
    title: "Facilities Management",
    desc: "Monitor building environments, equipment, energy consumption, and critical infrastructure from one connected platform.",
    icon: Building2,
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop"
  },
  {
    number: "02",
    title: "Cold Storage",
    desc: "Track temperature, humidity, and environmental conditions in real time to maintain critical storage conditions and respond to abnormal conditions.",
    icon: Snowflake,
    image: "https://images.unsplash.com/photo-1551313158-73d016a829ae?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29sZCUyMHN0b3JhZ2V8ZW58MHx8MHx8fDA%3D"
  },
  {
    number: "03",
    title: "Hospitality",
    desc: "Monitor guest environments, energy usage, equipment, and facility conditions to improve operational efficiency and service reliability.",
    icon: Hotel,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop"
  },
  {
    number: "04",
    title: "Industrial & Manufacturing",
    desc: "Connect industrial assets and equipment to monitor operational conditions, identify anomalies, and improve efficiency.",
    icon: Factory,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop"
  },
  {
    number: "05",
    title: "Logistics",
    desc: "Track assets and operational conditions across distributed locations, helping teams gain greater visibility across their logistics operations.",
    icon: Truck,
    image: "https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=800&auto=format&fit=crop"
  },
  {
    number: "06",
    title: "Smart Cities & Infrastructure",
    desc: "Connect distributed infrastructure and environmental systems to create real-time visibility across smart-city operations.",
    icon: Building,
    image: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?q=80&w=800&auto=format&fit=crop"
  },
  {
    number: "07",
    title: "Agriculture",
    desc: "Monitor environmental and operational conditions across agricultural environments using connected sensors and real-time data.",
    icon: Tractor,
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=800&auto=format&fit=crop"
  },
  {
    number: "08",
    title: "Retail",
    desc: "Connect and monitor retail environments, assets, and operational conditions through a centralized IoT platform.",
    icon: ShoppingCart,
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800&auto=format&fit=crop"
  }
];

export default function IotricsIndustries() {
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
              One IoT Platform.
            </motion.h2>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-neutral-500 leading-[1.1]"
            >
              Built for Every Industry.
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
              From facilities and manufacturing to logistics and smart infrastructure, IoTRICs adapts to the environments where real-time asset visibility, monitoring, and intelligence matter most.
            </p>
          </motion.div>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-neutral-800/80">
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

      </div>
    </section>
  );
}
