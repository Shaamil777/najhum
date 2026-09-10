"use client";

import React from "react";
import { motion } from "framer-motion";
import { Zap, Box, CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ComparisonItem {
  id: string;
  solaas: {
    title: string;
    description: string;
    details: string;
  };
  paas: {
    title: string;
    description: string;
    details: string;
  };
}

const comparisonData: ComparisonItem[] = [
  {
    id: "capex",
    solaas: {
      title: "CAPITAL EXPENDITURE",
      description: "Zero Upfront Hardware Cost",
      details: "We supply all devices, gateways, and connectivity under a comprehensive subscription."
    },
    paas: {
      title: "ASSET OWNERSHIP",
      description: "Full Hardware Ownership",
      details: "Make a one-time purchase for all hardware, giving you complete permanent ownership of the assets."
    }
  },
  {
    id: "costs",
    solaas: {
      title: "RECURRING EXPENSES",
      description: "Predictable OpEx Structure",
      details: "Fixed monthly or annual pricing with no surprise maintenance or replacement bills."
    },
    paas: {
      title: "RECURRING EXPENSES",
      description: "Lower Ongoing Costs",
      details: "Your recurring subscription strictly covers the cloud platform and data storage, significantly reducing operational expenses."
    }
  },
  {
    id: "management",
    solaas: {
      title: "MAINTENANCE & SUPPORT",
      description: "Fully Managed Service",
      details: "Enjoy total peace of mind. We handle AMC, warranty, installation, and the entire device lifecycle."
    },
    paas: {
      title: "INFRASTRUCTURE CONTROL",
      description: "Complete Client Control",
      details: "Manage your own infrastructure, deployment, and device maintenance according to your internal IT policies."
    }
  }
];

const scopeData = {
  solaas: {
    included: [
      "Annual Maintenance (AMC) covering hardware & software",
      "Warranty coverage for the full active subscription period",
      "Supply of IP-rated & non-IP-rated devices",
      "Configuration, commissioning & radio planning",
      "Outdoor gateway supply & monthly connectivity charges",
    ],
    excluded: [
      "Platform customizations or feature changes",
      "On-site civil works (drilling, structural mounting)",
      "Client-side IT infrastructure, computers, or internet",
      "Site acquisition, poles, or power arrangements",
    ]
  },
  paas: {
    included: [
      "Cloud-based monitoring platform & data visualization",
      "Data storage & historical data access",
      "Basic analytics, reporting & alert management",
      "User access management & role-based permissions",
      "Platform maintenance, updates & security patches",
    ],
    excluded: [
      "Platform customizations",
      "On-site civil works (drilling, structural mounting)",
      "Internet connectivity, computers, or laptops",
      "Gateways in case of no coverage",
      "AI Module and related dashboards",
    ]
  }
};

export default function CropifaiBusinessModels() {
  return (
    <section className="w-full relative overflow-hidden font-sans bg-zinc-50 border-y border-zinc-200">
      
      {/* Background Split (Desktop Only) */}
      <div className="absolute inset-0 pointer-events-none hidden lg:flex">
        {/* Left Side Bg */}
        <div className="w-1/2 bg-white relative overflow-hidden border-r border-zinc-200/50">
          <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px]" />
        </div>
        {/* Right Side Bg */}
        <div className="w-1/2 bg-zinc-50 relative overflow-hidden">
          <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[120px]" />
        </div>
      </div>

      <div className="container mx-auto relative z-10 max-w-[1400px]">
        
        {/* Header Title (Centered) */}
        <div className="text-center w-full pt-20 pb-8 lg:pt-32 lg:pb-12 px-4 relative z-20">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4">OUR BUSINESS MODELS</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black font-display text-zinc-900 tracking-tight leading-tight mb-6">
            Two Ways to Work With Us
          </h2>
          <p className="text-lg text-zinc-500 max-w-2xl mx-auto">
            Choose the deployment model that best fits your capital structure and operational preferences.
          </p>
        </div>

        {/* ════════════════════════════════════════════════════════════════════════
            DESKTOP SPLIT VIEW (lg and up)
           ════════════════════════════════════════════════════════════════════════ */}
        <div className="hidden lg:grid grid-cols-2 gap-8 xl:gap-32 px-8">
          
          {/* LEFT COLUMN: SolaaS */}
          <div className="pb-32 flex flex-col items-end bg-transparent pt-12">
            
            <h2 className="text-4xl font-semibold tracking-tight text-zinc-900 mb-16 text-right w-full">
              <span className="text-primary font-bold">SolaaS</span> Model
            </h2>

            <div className="space-y-6 w-full flex flex-col items-end mb-16">
              {comparisonData.map((item, idx) => {
                let staggerClass = "";
                if (idx === 0) staggerClass = "mr-12";
                if (idx === 1) staggerClass = "mr-0";
                if (idx === 2) staggerClass = "mr-16";

                return (
                  <motion.div
                    key={`desktop-solaas-${item.id}`}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className={cn(
                      "bg-white border border-primary/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2.5rem] p-8 max-w-[420px] w-full transition-transform hover:-translate-y-1",
                      staggerClass
                    )}
                  >
                    <div className="flex items-start gap-4 flex-row-reverse text-right">
                      <div className="mt-0.5 shrink-0">
                        <Zap className="w-5 h-5 text-primary" strokeWidth={2.5} />
                      </div>
                      <div>
                        <span className="text-[11px] font-bold tracking-wider text-primary/70 uppercase mb-1.5 block">
                          {item.solaas.title}
                        </span>
                        <h4 className="text-base font-bold text-zinc-900 mb-2 leading-snug">
                          {item.solaas.description}
                        </h4>
                        <p className="text-[13px] text-zinc-600 leading-relaxed">
                          {item.solaas.details}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Scope of SolaaS */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="w-full max-w-[500px] bg-white border border-zinc-200/50 shadow-sm rounded-[2rem] p-8"
            >
              <h3 className="text-lg font-bold text-zinc-900 mb-6 border-b border-zinc-100 pb-4">Scope of Delivery</h3>
              
              <div className="mb-8">
                <h4 className="text-[13px] font-bold tracking-wider text-green-700 uppercase mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> Included
                </h4>
                <ul className="space-y-3">
                  {scopeData.solaas.included.map((inc, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-[14px] text-zinc-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 shrink-0" />
                      <span className="leading-snug">{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-[13px] font-bold tracking-wider text-red-600 uppercase mb-4 flex items-center gap-2">
                  <XCircle className="w-4 h-4" /> Excluded
                </h4>
                <ul className="space-y-3">
                  {scopeData.solaas.excluded.map((exc, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-[14px] text-zinc-500">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0" />
                      <span className="leading-snug">{exc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            <div className="mt-8 w-full max-w-[500px] text-center">
               <p className="text-xs text-zinc-500">Best For: <span className="font-bold text-zinc-700">OpEx Budgets & Turnkey Operations</span></p>
            </div>
          </div>

          {/* RIGHT COLUMN: PaaS */}
          <div className="pb-32 flex flex-col items-start bg-transparent pt-12">
            
            <h2 className="text-4xl font-semibold tracking-tight text-zinc-900 mb-16 text-left w-full">
              <span className="text-blue-600 font-bold">PaaS</span> Model
            </h2>

            <div className="space-y-6 w-full flex flex-col items-start mb-16">
              {comparisonData.map((item, idx) => {
                let staggerClass = "";
                if (idx === 0) staggerClass = "ml-0";
                if (idx === 1) staggerClass = "ml-12";
                if (idx === 2) staggerClass = "ml-6";

                return (
                  <motion.div
                    key={`desktop-paas-${item.id}`}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className={cn(
                      "bg-white backdrop-blur-sm border border-blue-600/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2.5rem] p-8 max-w-[420px] w-full transition-transform hover:-translate-y-1",
                      staggerClass
                    )}
                  >
                    <div className="flex items-start gap-4">
                      <div className="mt-0.5 shrink-0">
                        <Box className="w-5 h-5 text-blue-600" strokeWidth={2.5} />
                      </div>
                      <div>
                        <span className="text-[11px] font-bold tracking-wider text-blue-600/70 uppercase mb-1.5 block">
                          {item.paas.title}
                        </span>
                        <h4 className="text-base font-bold text-zinc-900 mb-2 leading-snug">
                          {item.paas.description}
                        </h4>
                        <p className="text-[13px] text-zinc-600 leading-relaxed">
                          {item.paas.details}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Scope of PaaS */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="w-full max-w-[500px] bg-white border border-zinc-200/50 shadow-sm rounded-[2rem] p-8"
            >
              <h3 className="text-lg font-bold text-zinc-900 mb-6 border-b border-zinc-100 pb-4">Scope of Delivery</h3>
              
              <div className="mb-8">
                <h4 className="text-[13px] font-bold tracking-wider text-green-700 uppercase mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> Included
                </h4>
                <ul className="space-y-3">
                  {scopeData.paas.included.map((inc, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-[14px] text-zinc-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 shrink-0" />
                      <span className="leading-snug">{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-[13px] font-bold tracking-wider text-red-600 uppercase mb-4 flex items-center gap-2">
                  <XCircle className="w-4 h-4" /> Excluded
                </h4>
                <ul className="space-y-3">
                  {scopeData.paas.excluded.map((exc, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-[14px] text-zinc-500">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0" />
                      <span className="leading-snug">{exc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            <div className="mt-8 w-full max-w-[500px] text-center">
               <p className="text-xs text-zinc-500">Best For: <span className="font-bold text-zinc-700">CapEx Budgets & In-house IT Teams</span></p>
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════════════════
            MOBILE COMBINED VIEW (< lg)
           ════════════════════════════════════════════════════════════════════════ */}
        <div className="flex lg:hidden flex-col items-center px-4 sm:px-6 py-12">
          
          {/* Main Comparisons */}
          <div className="space-y-6 w-full max-w-md md:max-w-3xl mb-12">
            {comparisonData.map((item, idx) => (
              <motion.div
                key={`mobile-combined-${item.id}`}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-white border border-zinc-200 shadow-sm rounded-3xl p-5 sm:p-6 md:p-8 w-full relative overflow-hidden flex flex-col md:flex-row md:items-stretch gap-8 md:gap-0"
              >
                {/* SolaaS Side */}
                <div className="w-full md:w-1/2 border-b md:border-b-0 md:border-r border-zinc-100 pb-8 md:pb-0 md:pr-8">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Zap className="w-4 h-4 text-primary" />
                    </div>
                    <span className="font-bold text-zinc-900">SolaaS</span>
                  </div>
                  <span className="text-[10px] md:text-[11px] font-bold tracking-wider text-primary uppercase mb-1.5 md:mb-2 block">
                    {item.solaas.title}
                  </span>
                  <h4 className="text-[14px] md:text-[15px] font-semibold text-zinc-800 leading-snug mb-2">
                    {item.solaas.description}
                  </h4>
                  <p className="text-[12px] md:text-[13px] text-zinc-500 leading-relaxed">
                    {item.solaas.details}
                  </p>
                </div>

                {/* PaaS Side */}
                <div className="w-full md:w-1/2 relative md:pl-8">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                      <Box className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="font-bold text-zinc-900">PaaS</span>
                  </div>
                  <span className="text-[10px] md:text-[11px] font-bold tracking-wider text-blue-600 uppercase mb-2 block">
                    {item.paas.title}
                  </span>
                  <h4 className="text-[14px] md:text-[15px] font-bold text-zinc-800 leading-snug mb-2">
                    {item.paas.description}
                  </h4>
                  <p className="text-[12px] md:text-[13px] text-zinc-500 leading-relaxed">
                    {item.paas.details}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Scope Accompanying Section for Mobile */}
          <div className="w-full max-w-md md:max-w-3xl space-y-6">
            <h3 className="text-2xl font-bold text-zinc-900 text-center mb-6">Scope of Delivery</h3>
            
            {/* SolaaS Scope */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white border border-zinc-200 shadow-sm rounded-3xl p-6"
            >
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-primary" />
                </div>
                <span className="font-bold text-zinc-900">SolaaS Model Scope</span>
              </div>
              
              <div className="mb-6">
                <h4 className="text-[12px] font-bold tracking-wider text-green-700 uppercase mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> Included
                </h4>
                <ul className="space-y-2">
                  {scopeData.solaas.included.map((inc, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-[13px] text-zinc-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 shrink-0" />
                      <span className="leading-snug">{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-[12px] font-bold tracking-wider text-red-600 uppercase mb-3 flex items-center gap-2">
                  <XCircle className="w-4 h-4" /> Excluded
                </h4>
                <ul className="space-y-2">
                  {scopeData.solaas.excluded.map((exc, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-[13px] text-zinc-500">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0" />
                      <span className="leading-snug">{exc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* PaaS Scope */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white border border-zinc-200 shadow-sm rounded-3xl p-6"
            >
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                  <Box className="w-4 h-4 text-blue-600" />
                </div>
                <span className="font-bold text-zinc-900">PaaS Model Scope</span>
              </div>
              
              <div className="mb-6">
                <h4 className="text-[12px] font-bold tracking-wider text-green-700 uppercase mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> Included
                </h4>
                <ul className="space-y-2">
                  {scopeData.paas.included.map((inc, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-[13px] text-zinc-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 shrink-0" />
                      <span className="leading-snug">{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-[12px] font-bold tracking-wider text-red-600 uppercase mb-3 flex items-center gap-2">
                  <XCircle className="w-4 h-4" /> Excluded
                </h4>
                <ul className="space-y-2">
                  {scopeData.paas.excluded.map((exc, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-[13px] text-zinc-500">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0" />
                      <span className="leading-snug">{exc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
