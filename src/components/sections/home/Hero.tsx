"use client";

import React from "react";
import Image from "next/image";
import { homeContent } from "@/content/home";
import { AntiMetalButton } from "@/components/ui/anti-metal-button"; // HMR trigger

const clients = [
  { name: "ARC", src: "/logo/client%20logos/ARC_Logo-2.svg" },
  { name: "DEWA", src: "/logo/client%20logos/Dubai_Electricity_and_Water_Authority_id40SLA8sS_1.png" },
  { name: "Thuraya", src: "/logo/client%20logos/Thuraya_logo.png" },
  { name: "Aramtec", src: "/logo/client%20logos/aramtec.png" },
  { name: "Yahsat", src: "/logo/client%20logos/idsuguLgbe.png" },
  { name: "Nokia", src: "/logo/client%20logos/nokia-com-wordmark.png" },
  { name: "Space42", src: "/logo/client%20logos/space42.png" },
];

export default function Hero() {
  const { hero } = homeContent;

  return (
    <section className="relative w-full h-screen flex flex-col justify-center overflow-hidden bg-black">
      
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-80"
      >
        <source src="/videos/hero-bg-video.mp4" type="video/mp4" />
      </video>

      {/* Vignette Overlay for readable text */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80 z-0"></div>

      {/* Logo Marquee at Bottom */}
      <div className="absolute bottom-0 left-0 w-full border-t-2 border-dotted border-white/20 bg-transparent overflow-hidden flex items-center h-24 z-20">
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: marquee 30s linear infinite;
            width: max-content;
          }
        `}</style>
        
        <div className="flex animate-marquee items-center">
          {[...clients, ...clients, ...clients, ...clients].map((client, i) => {
            return (
              <div key={i} className="flex flex-none items-center justify-center mx-4 px-8 py-4 bg-transparent opacity-90 hover:opacity-100 hover:scale-105 transition-all duration-300 min-w-[160px]">
                <img 
                  src={client.src} 
                  alt={client.name} 
                  className="h-8 w-auto object-contain brightness-0 invert drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]"
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}