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
  <div className={`flex flex-col ${side === 'left' ? 'md:items-end md:text-right text-left' : 'md:items-start md:text-left text-left'} bg-surface/50 md:bg-transparent p-3 sm:p-4 md:p-0 rounded-2xl md:rounded-none border border-border/40 md:border-transparent h-full`}>
    <div className={`flex items-start md:items-center gap-2 sm:gap-3 mb-1.5 sm:mb-2 md:mb-3 ${side === 'left' ? 'md:flex-row-reverse' : ''}`}>
      <div className="w-6 h-6 sm:w-9 sm:h-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 mt-0.5 md:mt-0">
        <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
      </div>
      <div className={`flex flex-col md:flex-row md:items-center gap-1 sm:gap-2 ${side === 'left' ? 'md:flex-row-reverse' : ''}`}>
        <span className="text-[12px] sm:text-[15px] lg:text-base font-bold text-foreground leading-tight">{feat.title}</span>
        {feat.badge && (
          <span className="text-[8px] sm:text-[9px] font-bold tracking-wider text-orange-600 bg-orange-100 px-1.5 py-0.5 rounded-sm uppercase shrink-0 w-fit">
            {feat.badge}
          </span>
        )}
      </div>
    </div>
    <p className={`text-[10px] sm:text-[13px] md:text-xs lg:text-sm text-muted leading-relaxed lg:max-w-[260px] xl:max-w-[280px] ${side === 'left' ? 'md:mr-12 mt-1 md:mt-0 md:ml-0' : 'mt-1 md:mt-0'} ml-0 md:ml-12`}>
      {feat.desc}
    </p>
  </div>
);

export default function EvolticsMobileApp() {
  return (
    <section className="w-full py-16 lg:py-28 bg-background relative overflow-hidden font-sans">
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--color-primary)_0%,transparent_50%)]" />
      </div>

      <div className="container mx-auto px-6 lg:px-16 max-w-[1400px] relative z-10">
        
        {/* Top Header Area */}
        <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-16 lg:mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[1.65rem] sm:text-3xl md:text-4xl xl:text-[3.2rem] font-black tracking-tight text-foreground leading-[1.1] sm:leading-[1.05] mb-2 sm:mb-4 uppercase"
          >
            Mobile App — <span className="text-primary font-black">for EV Drivers</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-muted text-[13px] sm:text-base lg:text-lg leading-relaxed italic mb-6 lg:mb-8 max-w-2xl mx-auto"
          >
            Empowering eco-conscious drivers with seamless control and sustainability.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-surface/60 border border-border/80 p-4 sm:p-6 lg:p-8 rounded-3xl shadow-sm text-left mx-auto relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl" />
            <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2 sm:mb-3 text-center">The Evoltics App</h3>
            <p className="text-[12px] sm:text-sm lg:text-[15px] text-foreground/80 leading-relaxed text-center max-w-3xl mx-auto">
              Our Evoltics app helps users locate nearby charging stations, monitor their charging progress, and make payments. It provides real-time charging station availability and status updates, ensuring drivers always have access to the charging infrastructure they need.
            </p>
          </motion.div>
        </div>

        {/* Center Spider Layout */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-8 sm:gap-10 md:gap-4 lg:gap-8 xl:gap-16 items-center">
          
          {/* Left Features */}
          <div className="order-1 grid grid-cols-2 md:flex md:flex-col gap-3 sm:gap-4 md:gap-8 lg:gap-14">
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
            className="order-2 relative w-[220px] sm:w-[280px] md:w-[240px] lg:w-[300px] xl:w-[340px] h-[440px] sm:h-[580px] md:h-[480px] lg:h-[620px] xl:h-[680px] rounded-[2rem] sm:rounded-[3rem] bg-surface border-[6px] sm:border-[8px] border-surface-alt flex flex-col items-center justify-center overflow-hidden group shadow-xl sm:shadow-2xl mx-auto"
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
          <div className="order-3 grid grid-cols-2 md:flex md:flex-col gap-3 sm:gap-4 md:gap-8 lg:gap-14">
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
          className="flex flex-row items-center justify-center gap-2 sm:gap-4 mt-12 sm:mt-16 lg:mt-24 px-4 sm:px-0"
        >
          <button className="flex items-center justify-center space-x-1.5 sm:space-x-2 bg-foreground text-background hover:bg-foreground/90 transition-colors px-3 sm:px-8 py-2.5 sm:py-3.5 rounded-xl font-semibold shadow-xl hover:shadow-2xl hover:-translate-y-0.5 duration-200 flex-1 sm:flex-none max-w-[160px] sm:max-w-none">
            <Apple className="w-5 h-5 sm:w-7 sm:h-7 shrink-0" />
            <div className="flex flex-col items-start leading-none">
              <span className="text-[7px] sm:text-[10px] uppercase tracking-widest mb-0.5 sm:mb-1 opacity-80 whitespace-nowrap">Download on the</span>
              <span className="text-xs sm:text-base font-bold whitespace-nowrap">App Store</span>
            </div>
          </button>
          
          <button className="flex items-center justify-center space-x-1.5 sm:space-x-2 bg-primary text-white hover:bg-primary-hover transition-colors px-3 sm:px-8 py-2.5 sm:py-3.5 rounded-xl font-semibold shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 hover:-translate-y-0.5 duration-200 flex-1 sm:flex-none max-w-[160px] sm:max-w-none">
            <Play className="w-4 h-4 sm:w-6 sm:h-6 fill-current shrink-0" />
            <div className="flex flex-col items-start leading-none ml-0 sm:ml-1">
              <span className="text-[7px] sm:text-[10px] uppercase tracking-widest mb-0.5 sm:mb-1 opacity-90 whitespace-nowrap">GET IT ON</span>
              <span className="text-xs sm:text-base font-bold whitespace-nowrap">Google Play</span>
            </div>
          </button>
        </motion.div>

      </div>
    </section>
  );
}
