"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Apple, Play } from "lucide-react";

const appFeatures = [
  {
    title: "In-App Wallet",
    desc: "Pay for charging with a pre-loaded wallet. Add or withdraw funds at any time via the app.",
  },
  {
    title: "Charger Filter",
    desc: "Filter stations by connector type (CCS, CHAdeMO, Type 2) or network.",
  },
  {
    title: "Live Charging",
    desc: "View real-time battery %, power output, energy delivered and time remaining.",
  },
  {
    title: "Charger Booking",
    desc: "Reserve a charging slot in advance — no more waiting. Coming soon.",
    badge: "UPCOMING"
  },
  {
    title: "Trip Planner",
    desc: "Plan long trips with automatic charging stops based on your vehicle's range.",
    badge: "UPCOMING"
  },
  {
    title: "Notifications",
    desc: "Real-time alerts when charging completes or special offers are available.",
  },
  {
    title: "Reviews & Ratings",
    desc: "Read and write reviews for charging locations to help the community.",
  },
  {
    title: "White Label App",
    desc: "Operators can deploy a fully branded version of the app under their identity.",
  }
];

const FeatureItem = ({ feat, side }: { feat: any, side: "left" | "right" }) => (
  <div className={`flex flex-col ${side === 'left' ? 'lg:items-end lg:text-right text-left' : 'lg:items-start lg:text-left text-left'}`}>
    <div className={`flex items-center gap-3 mb-1.5 ${side === 'left' ? 'lg:flex-row-reverse' : ''}`}>
      <div className="w-9 h-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
        <CheckCircle2 className="w-4 h-4 text-primary" />
      </div>
      <div className={`flex items-center gap-2 ${side === 'left' ? 'lg:flex-row-reverse' : ''}`}>
        <span className="text-[15px] lg:text-base font-bold text-foreground">{feat.title}</span>
        {feat.badge && (
          <span className="text-[9px] font-bold tracking-wider text-orange-600 bg-orange-100 px-1.5 py-0.5 rounded-sm uppercase shrink-0">
            {feat.badge}
          </span>
        )}
      </div>
    </div>
    <p className={`text-xs sm:text-[13px] text-muted leading-relaxed lg:max-w-[260px] xl:max-w-[280px] ${side === 'left' ? 'lg:mr-12 ml-12 lg:ml-0' : 'ml-12'}`}>
      {feat.desc}
    </p>
  </div>
);

export default function EvolticsMobileApp() {
  return (
    <section className="w-full py-28 bg-background relative overflow-hidden font-sans">
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--color-primary)_0%,transparent_50%)]" />
      </div>

      <div className="container mx-auto px-6 lg:px-16 max-w-[1400px] relative z-10">
        
        {/* Top Header Area */}
        <div className="text-center max-w-4xl mx-auto mb-16 lg:mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl lg:text-4xl xl:text-[3.2rem] font-black tracking-tight text-foreground leading-[1.1] mb-4"
          >
            Mobile App — <span className="text-primary font-black">for EV Drivers</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-muted text-base lg:text-lg leading-relaxed italic mb-8 max-w-2xl mx-auto"
          >
            Empowering eco-conscious drivers with seamless control and sustainability.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-surface/60 border border-border/80 p-6 lg:p-8 rounded-3xl shadow-sm text-left mx-auto relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl" />
            <h3 className="text-xl font-bold text-foreground mb-3 text-center">The Evoltics App</h3>
            <p className="text-sm lg:text-[15px] text-foreground/80 leading-relaxed text-center max-w-3xl mx-auto">
              Our Evoltics app helps users locate nearby charging stations, monitor their charging progress, and make payments. It provides real-time charging station availability and status updates, ensuring drivers always have access to the charging infrastructure they need.
            </p>
          </motion.div>
        </div>

        {/* Center Spider Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_auto_1fr] gap-10 lg:gap-8 xl:gap-16 items-center">
          
          {/* Left Features */}
          <div className="order-2 lg:order-1 flex flex-col gap-8 lg:gap-14">
            {appFeatures.slice(0, 4).map((feat, idx) => (
              <motion.div 
                key={`left-${idx}`}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + (idx * 0.1) }}
              >
                <FeatureItem feat={feat} side="left" />
              </motion.div>
            ))}
          </div>

          {/* Center Image Mockup */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-1 lg:order-2 md:col-span-2 lg:col-span-1 relative w-[280px] sm:w-[320px] lg:w-[300px] xl:w-[340px] h-[580px] lg:h-[620px] xl:h-[680px] rounded-[3rem] bg-surface border-[8px] border-surface-alt flex items-center justify-center overflow-hidden group shadow-2xl mx-auto"
          >
            {/* Phone Notch/Dynamic Island */}
            <div className="absolute top-0 inset-x-0 h-6 bg-surface-alt flex justify-center items-end pb-1.5 rounded-b-3xl w-32 mx-auto z-20">
              <div className="w-14 h-1.5 bg-black/10 rounded-full" />
            </div>
            
            <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors" />
            
            <div className="text-center z-10 p-6">
              <div className="w-14 h-14 bg-surface-alt rounded-2xl mx-auto flex items-center justify-center mb-4 shadow-sm border border-border">
                <svg className="w-7 h-7 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-base font-bold text-foreground mb-2">App Mockup</h3>
              <p className="text-xs text-muted max-w-[200px] mx-auto">
                Insert your mobile UI here
              </p>
            </div>

            {/* <Image src="/path" fill className="object-cover" alt="" /> */}
          </motion.div>

          {/* Right Features */}
          <div className="order-3 lg:order-3 flex flex-col gap-8 lg:gap-14">
            {appFeatures.slice(4, 8).map((feat, idx) => (
              <motion.div 
                key={`right-${idx}`}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + (idx * 0.1) }}
              >
                <FeatureItem feat={feat} side="right" />
              </motion.div>
            ))}
          </div>

        </div>

        {/* Bottom Store Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-4 mt-16 lg:mt-24"
        >
          <button className="flex items-center space-x-2 bg-foreground text-background hover:bg-foreground/90 transition-colors px-8 py-3.5 rounded-xl font-semibold shadow-xl hover:shadow-2xl hover:-translate-y-0.5 duration-200">
            <Apple className="w-7 h-7" />
            <div className="flex flex-col items-start leading-none">
              <span className="text-[10px] uppercase tracking-widest mb-1 opacity-80">Download on the</span>
              <span className="text-base font-bold">App Store</span>
            </div>
          </button>
          
          <button className="flex items-center space-x-2 bg-primary text-white hover:bg-primary-hover transition-colors px-8 py-3.5 rounded-xl font-semibold shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 hover:-translate-y-0.5 duration-200">
            <Play className="w-6 h-6 fill-current" />
            <div className="flex flex-col items-start leading-none ml-1">
              <span className="text-[10px] uppercase tracking-widest mb-1 opacity-90">GET IT ON</span>
              <span className="text-base font-bold">Google Play</span>
            </div>
          </button>
        </motion.div>

      </div>
    </section>
  );
}
