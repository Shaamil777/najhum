"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const CLIENT_LOGOS = [
  { src: "/logo/client logos/ARC_Logo-2.svg", alt: "ARC" },
  { src: "/logo/client logos/Dubai_Electricity_and_Water_Authority_id40SLA8sS_1.png", alt: "DEWA" },
  { src: "/logo/client logos/Thuraya_logo.png", alt: "Thuraya" },
  { src: "/logo/client logos/aramtec.png", alt: "Aramtec" },
  { src: "/logo/client logos/idsuguLgbe.png", alt: "Client 5" },
  { src: "/logo/client logos/nokia-com-wordmark.png", alt: "Nokia" },
  { src: "/logo/client logos/space42.png", alt: "Space42" },
];

export default function TrustedClients() {
  return (
    <section className="w-full relative bg-background py-5 lg:py-8 overflow-hidden flex flex-col items-center">
      {/* Section Dotted Background */}
      <div 
        className="absolute inset-0 opacity-[0.25] pointer-events-none" 
        style={{ backgroundImage: 'radial-gradient(var(--color-muted) 1px, transparent 1px)', backgroundSize: '16px 16px' }} 
      />
      
      <div className="w-full flex overflow-hidden mask-image-linear-gradient relative z-10">
        <motion.div 
          className="flex items-center gap-12 lg:gap-24 whitespace-nowrap w-max px-6"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
        >
          {/* Group 1 */}
          <div className="flex items-center gap-12 lg:gap-24">
            {CLIENT_LOGOS.map((logo, index) => (
              <div key={`g1-${index}`} className="relative h-16 w-32 md:h-20 md:w-48 flex items-center justify-center group">
                <div className="relative h-8 w-20 md:h-12 md:w-28 flex items-center justify-center z-10">
                  <Image 
                    src={logo.src} 
                    alt={logo.alt} 
                    fill
                    className="object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </div>
            ))}
          </div>
          {/* Group 2 (Duplicate for seamless loop) */}
          <div className="flex items-center gap-12 lg:gap-24">
            {CLIENT_LOGOS.map((logo, index) => (
              <div key={`g2-${index}`} className="relative h-16 w-32 md:h-20 md:w-48 flex items-center justify-center group">
                <div className="relative h-8 w-20 md:h-12 md:w-28 flex items-center justify-center z-10">
                  <Image 
                    src={logo.src} 
                    alt={logo.alt} 
                    fill
                    className="object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
