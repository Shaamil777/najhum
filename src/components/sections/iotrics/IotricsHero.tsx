"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const clients = [
  { name: "Nokia", src: "/logo/client%20logos/nokia-com-wordmark.png" },
  { name: "Thuraya", src: "/logo/client%20logos/Thuraya_logo.png" },
  { name: "Space42", src: "/logo/client%20logos/space42.png" },
  { name: "Aramtec", src: "/logo/client%20logos/aramtec.png" },
  { name: "DEWA", src: "/logo/client%20logos/Dubai_Electricity_and_Water_Authority_id40SLA8sS_1.png" },
  { name: "Yahsat", src: "/logo/client%20logos/idsuguLgbe.png" },
];

export default function IotricsHero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((e) => console.log("Video playback failed:", e));
    }
  }, []);

  return (
    <section className="w-full min-h-[90vh] lg:min-h-[95vh] relative overflow-hidden flex flex-col justify-center items-center pt-28 pb-16 border-b border-border text-white">
      
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/iotrics-bg.mp4" type="video/mp4" />
        </video>
        {/* Overlay to ensure text readability */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Main Hero Container */}
      <div className="container mx-auto px-6 lg:px-16 relative z-10 max-w-5xl flex flex-col items-center text-center mt-auto mb-auto">
        
        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-wide leading-[1.1] mb-6 text-white uppercase"
        >
          SMARTER CONNECTED <br /> OPERATIONS
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg sm:text-xl text-neutral-300 leading-relaxed max-w-3xl mb-10"
        >
          IoTRICs connects your physical assets, sensors, and infrastructure to a unified IoT platform—delivering real-time visibility, intelligent alerts, and actionable insights to help you operate smarter and more efficiently.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 w-full sm:w-auto"
        >
          <Link
            href="#solutions"
            className="inline-flex items-center justify-center space-x-2.5 bg-primary hover:bg-primary-hover text-white px-8 py-4 rounded-md font-bold text-sm transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>Explore IoTRICs</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

      </div>

      {/* Trusted By Companies */}
      <div className="w-full mt-auto relative z-10 flex flex-col items-center pt-8 pb-20 overflow-hidden">
        {/* Tiny grid effect background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:0.5rem_0.5rem] [mask-image:radial-gradient(ellipse_40%_50%_at_50%_50%,#000_0%,transparent_100%)] pointer-events-none" />

        <div className="container mx-auto px-6 lg:px-16 relative z-10 flex flex-col items-center">
          <p className="text-[11px] sm:text-xs font-bold text-white uppercase tracking-widest mb-6 text-center drop-shadow-sm">
            TRUSTED BY COMPANIES WORLDWIDE
          </p>
          <div className="flex justify-between items-center w-full max-w-6xl gap-2 sm:gap-4 lg:gap-8 px-4">
            {clients.map((client, idx) => (
              <Image 
                key={idx}
                src={client.src} 
                alt={client.name} 
                width={160} 
                height={50} 
                className="object-contain h-6 sm:h-8 lg:h-10 w-auto min-w-0 brightness-0 invert opacity-80 hover:opacity-100 transition-opacity" 
              />
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
