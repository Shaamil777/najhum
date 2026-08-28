"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Leaf, Zap, Globe2, Car, Gauge, Gift, Award } from "lucide-react";

export default function EvolticsCarbonCredit() {
  return (
    <section className="w-full py-20 lg:py-32 bg-white relative overflow-hidden font-sans">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-emerald-100 to-transparent rounded-full blur-[100px] opacity-60 pointer-events-none translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-teal-50 to-transparent rounded-full blur-[100px] opacity-60 pointer-events-none -translate-x-1/3 translate-y-1/3" />

      <div className="container mx-auto px-6 lg:px-16 relative z-10 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center lg:items-start">
          
          {/* Left Column: Title, Desc, 3 Features */}
          <div className="flex flex-col">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[2.25rem] sm:text-5xl lg:text-6xl font-black tracking-tight text-foreground leading-[1.05] mb-6"
            >
              Charge Your EV. <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-400">
                Earn Carbon Credits.
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-muted text-sm sm:text-base lg:text-lg leading-relaxed mb-12 max-w-xl"
            >
              Evoltics’ upcoming <strong className="text-foreground font-semibold">Green Carbon System</strong> rewards eco-conscious drivers with carbon credits for every kWh charged through the Evoltics network.
            </motion.p>

            {/* 3 Features Stacked */}
            <div className="space-y-6 sm:space-y-8">
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100 shadow-sm">
                  <Globe2 className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base sm:text-lg font-bold text-foreground mb-1">Drive Sustainability</h4>
                  <p className="text-[13px] sm:text-sm text-muted leading-relaxed max-w-md">Make every charging session part of a more sustainable mobility experience.</p>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100 shadow-sm">
                  <Zap className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base sm:text-lg font-bold text-foreground mb-1">Earn Carbon Credits</h4>
                  <p className="text-[13px] sm:text-sm text-muted leading-relaxed max-w-md">Get rewarded with carbon credits based on the energy used to charge your electric vehicle.</p>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100 shadow-sm">
                  <Leaf className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base sm:text-lg font-bold text-foreground mb-1">Power a Better Future</h4>
                  <p className="text-[13px] sm:text-sm text-muted leading-relaxed max-w-md">Turn everyday EV charging into a sustainability-focused experience and contribute to a cleaner future.</p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right Column: Spider Layout from Reference Image */}
          <div className="w-full flex items-center justify-center mt-12 lg:mt-0">
            <div className="relative w-full max-w-[500px] lg:max-w-[600px] aspect-square flex items-center justify-center">
              
              {/* Background Thin Dashed Ring */}
              <div className="absolute inset-8 sm:inset-12 border border-dashed border-emerald-500/30 rounded-full pointer-events-none" />
              
              {/* Center Image */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative w-[55%] sm:w-[50%] aspect-square z-10"
              >
                <div className="absolute inset-0 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
                <Image 
                  src="/images/elvotics/carbon_credit.png" 
                  alt="Carbon Credit" 
                  fill 
                  className="object-contain drop-shadow-2xl relative z-10"
                />
              </motion.div>

              {/* 4 Corner Cards */}
              {[
                { num: "01", title: "CHARGE YOUR EV", desc: "Charge your electric vehicle through the Evoltics charging network.", pos: "top-0 left-0", align: "left", icon: Car },
                { num: "02", title: "TRACK ENERGY USED", desc: "Your charging activity is measured based on the energy consumed.", pos: "top-0 right-0", align: "right", icon: Gauge },
                { num: "04", title: "CARBON CREDITS", desc: "Receive carbon credits through the Evoltics Green Carbon System.", pos: "bottom-0 left-0", align: "left", icon: Award },
                { num: "03", title: "EARN REWARDS", desc: "Your charging activity contributes toward sustainability rewards.", pos: "bottom-0 right-0", align: "right", icon: Gift }
              ].map((step, idx) => {
                const Icon = step.icon;
                const isRight = step.align === "right";
                
                return (
                  <motion.div
                    key={`step-img-${idx}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + (idx * 0.1) }}
                    className={`absolute ${step.pos} w-[45%] sm:w-[220px] bg-white rounded-2xl p-4 sm:p-5 shadow-xl shadow-emerald-900/5 z-20 flex flex-col ${isRight ? 'items-end text-right' : 'items-start text-left'}`}
                  >
                    {/* Floating Top Icon */}
                    <div className="absolute -top-5 sm:-top-6 left-1/2 -translate-x-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#156e30] text-white flex items-center justify-center shadow-lg border-4 border-white">
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    
                    <div className="mt-3 sm:mt-4 w-full">
                      <div className="text-3xl sm:text-4xl font-black text-emerald-100/80 mb-1 sm:mb-2 font-display">
                        {step.num}
                      </div>
                      <h5 className="text-[10px] sm:text-xs font-black text-foreground uppercase tracking-wider mb-1.5 sm:mb-2">
                        {step.title}
                      </h5>
                      <p className="text-[9px] sm:text-[11px] text-muted leading-relaxed">
                        {step.desc}
                      </p>
                      {/* Accent Line */}
                      <div className={`w-6 sm:w-8 h-[2px] bg-[#156e30] mt-3 sm:mt-4 rounded-full ${isRight ? 'ml-auto' : ''}`} />
                    </div>
                  </motion.div>
                );
              })}
              
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
