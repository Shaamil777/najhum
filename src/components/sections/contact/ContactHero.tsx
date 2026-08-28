"use client";

import { motion } from "framer-motion";
import { Container } from "@/design-system/primitives/layout/Container";
import { ArrowDown } from "lucide-react";

export default function ContactHero() {
  return (
    <section className="relative w-full pt-32 pb-16 sm:pt-40 sm:pb-24 lg:pt-48 lg:pb-32 bg-background overflow-hidden flex flex-col justify-center ">
      
      {/* Background Grids & Ambient Effects */}
      <div className="absolute inset-0 pointer-events-none opacity-50 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_20%,transparent_100%)]" />
      </div>
      
      {/* Subtle Top Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-primary/5 rounded-[100%] blur-[80px] pointer-events-none z-0" />

      <Container size="md" className="relative z-10 flex flex-col items-center text-center">

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight text-foreground leading-[1.05] mb-6 uppercase font-display"
        >
          Let's Build The <br className="hidden sm:block" />
          <span className="text-primary">Future</span> Together.
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg sm:text-xl text-muted leading-relaxed max-w-2xl mb-12"
        >
          Whether you're looking for enterprise IoT deployment, a complete EV charging network, or precision agriculture, our team of experts is ready to help.
        </motion.p>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-muted animate-bounce"
        >
          <ArrowDown className="w-5 h-5" />
        </motion.div>

      </Container>
    </section>
  );
}