"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/design-system/primitives/layout/Container";
import { cropifaiContent } from "@/content/cropifai";

export default function CropifaiClients() {
  const { clients } = cropifaiContent;
  const carouselLogos = clients.carouselLogos;
  const gridLogos = clients.gridLogos;
  return (
    <section className="relative w-full py-24 bg-white overflow-hidden font-sans border-t border-zinc-100">
      <Container size="xl" className="relative z-10 flex flex-col items-center">
        
        {/* Header */}
        <div className="text-center mb-16 max-w-2xl">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-primary mb-3">{clients.header.tag}</p>
          <h2 className="text-3xl md:text-4xl font-black font-display text-zinc-900 mb-4">
            {clients.header.title}
          </h2>
          <p className="text-zinc-500 font-medium">
            {clients.header.description}
          </p>
        </div>

        {/* Carousel Row (Strategic / Telecom / Major Partners) */}
        <div className="w-full relative mb-20">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
          
          <style>{`
            @keyframes scroll {
              0% { transform: translateX(0); }
              100% { transform: translateX(calc(-200px * 6)); }
            }
            .animate-scroll {
              animation: scroll 25s linear infinite;
              display: flex;
              width: calc(200px * 12);
            }
          `}</style>

          <div className="overflow-hidden w-full h-24">
            <div className="animate-scroll">
              {[...carouselLogos, ...carouselLogos].map((logo, index) => (
                <div key={index} className="w-[200px] h-full flex items-center justify-center px-6 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                  <div className="relative w-full h-12">
                    <Image
                      src={logo.src}
                      alt={logo.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Static Grid (Regional / Specialized Clients) */}
        <div className="w-full max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-12 items-center justify-items-center">
            {gridLogos.map((logo, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                className="w-full h-16 relative flex items-center justify-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              >
                <Image
                  src={logo.src}
                  alt={logo.name}
                  fill
                  className="object-contain"
                />
              </motion.div>
            ))}
          </div>
        </div>

      </Container>
    </section>
  );
}
