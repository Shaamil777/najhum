"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ShieldCheck, Box, Zap, Settings, TrendingUp, Layers, Server } from "lucide-react";
import { Container } from "@/design-system/primitives/layout/Container";

export default function CropifaiBusinessModels() {
  const [activeTab, setActiveTab] = useState<"solaas" | "paas">("solaas");

  const models = {
    solaas: {
      title: "SolaaS",
      subtitle: "Solution as a Service",
      tags: ["Lower CapEx", "Fully Managed", "Subscription-Based"],
      summary: "We supply, manage, and maintain everything. You subscribe and operate — no upfront hardware investment required.",
      benefits: [
        { icon: Zap, title: "Minimal upfront investment", desc: "Hardware, gateways & connectivity are covered under subscription." },
        { icon: TrendingUp, title: "Predictable costs", desc: "Fixed monthly/annual pricing with no surprise maintenance bills." },
        { icon: ShieldCheck, title: "Peace of mind", desc: "AMC, warranty & connectivity all in one package." },
        { icon: Settings, title: "Zero hardware burden", desc: "We own the lifecycle, from installation to replacement." },
        { icon: Box, title: "OpEx-friendly", desc: "Ideal for clients who prefer operating expenditure over capital outlay." },
      ],
      included: [
        "Annual Maintenance (AMC) covering hardware & software",
        "Warranty coverage for the full active subscription period",
        "Supply of IP-rated & non-IP-rated devices",
        "Configuration, commissioning & radio planning",
        "Outdoor gateway supply & monthly connectivity charges",
      ],
      excluded: [
        "Platform customizations or feature changes beyond standard scope",
        "On-site civil works (drilling, structural mounting, etc.)",
        "Client-side IT infrastructure, computers, or internet connectivity",
        "Site acquisition, poles, or power arrangements",
      ]
    },
    paas: {
      title: "PaaS",
      subtitle: "Platform as a Service",
      tags: ["Higher CapEx", "Asset Ownership", "Platform Subscription"],
      summary: "Clients make a one-time purchase of hardware/devices from us, then subscribe to our cloud platform to monitor and manage their assets.",
      benefits: [
        { icon: Box, title: "Full asset ownership", desc: "Hardware is yours after a one-time purchase." },
        { icon: TrendingUp, title: "Lower recurring costs", desc: "Subscription covers platform only, not hardware." },
        { icon: Settings, title: "Greater control", desc: "Manage your own devices, infrastructure & deployment." },
        { icon: Server, title: "CapEx-aligned", desc: "Suits clients with capital budgets or existing procurement models." },
        { icon: Layers, title: "Scalable & Enterprise-ready", desc: "Add devices easily; role-based access & reporting built in." },
      ],
      included: [
        "Cloud-based monitoring platform for data visualization & management",
        "Data storage & historical data access for the subscription period",
        "Basic analytics, reporting & alert management features",
        "User access management & role-based permissions",
        "One-time platform orientation & usage training",
        "Platform maintenance, updates & security patches",
      ],
      excluded: [
        "Platform customizations",
        "On-site civil works (drilling, structural mounting, etc.)",
        "Internet connectivity, computers, or laptops",
        "Gateways in case of no coverage",
        "AI Module and related dashboards",
      ]
    }
  };

  const currentModel = models[activeTab];

  return (
    <section className="relative w-full py-24 lg:py-32 bg-zinc-50 overflow-hidden font-sans border-y border-zinc-200">
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3 pointer-events-none" />

      <Container size="xl" className="relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4">OUR BUSINESS MODELS</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black font-display text-zinc-900 tracking-tight leading-tight mb-6">
            Two Ways to Work With Us
          </h2>
          <p className="text-lg text-zinc-500">
            Choose the deployment model that best fits your capital structure and operational preferences.
          </p>
        </div>

        {/* Custom Toggle Switch */}
        <div className="flex justify-center mb-12">
          <div className="relative inline-flex bg-white border border-zinc-200 p-1.5 rounded-full shadow-sm">
            {/* Sliding Background */}
            <motion.div
              className="absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-zinc-900 rounded-full shadow-md pointer-events-none"
              initial={false}
              animate={{
                left: activeTab === "solaas" ? "6px" : "calc(50%)",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
            
            <button
              onClick={() => setActiveTab("solaas")}
              className={`relative z-10 flex items-center justify-center px-8 py-3 rounded-full text-sm font-bold transition-colors w-[160px] sm:w-[200px] ${
                activeTab === "solaas" ? "text-white" : "text-zinc-500 hover:text-zinc-900"
              }`}
            >
              SolaaS
            </button>
            <button
              onClick={() => setActiveTab("paas")}
              className={`relative z-10 flex items-center justify-center px-8 py-3 rounded-full text-sm font-bold transition-colors w-[160px] sm:w-[200px] ${
                activeTab === "paas" ? "text-white" : "text-zinc-500 hover:text-zinc-900"
              }`}
            >
              PaaS
            </button>
          </div>
        </div>

        {/* Content Area */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-[2rem] border border-zinc-200 shadow-xl shadow-zinc-200/50 overflow-hidden"
        >
          {/* Header Banner */}
          <div className="bg-zinc-900 text-white p-8 md:p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
            <h3 className="text-3xl md:text-4xl font-black mb-3 relative z-10">
              {currentModel.title} — {currentModel.subtitle}
            </h3>
            <div className="flex flex-wrap justify-center gap-3 relative z-10">
              {currentModel.tags.map((tag, i) => (
                <span key={i} className="px-3 py-1 bg-white/10 rounded-full text-xs font-semibold tracking-wide border border-white/20">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="p-8 md:p-12">
            <p className="text-xl md:text-2xl font-medium text-zinc-800 text-center max-w-4xl mx-auto mb-16 leading-relaxed">
              <span className="font-bold text-primary">Summary:</span> {currentModel.summary}
            </p>

            {/* Benefits Grid */}
            <div className="mb-16">
              <h4 className="text-xl font-bold text-zinc-900 mb-8 border-b border-zinc-100 pb-4">Why {currentModel.title}?</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentModel.benefits.map((benefit, i) => (
                  <div key={i} className="bg-zinc-50 rounded-2xl p-6 border border-zinc-100">
                    <div className="w-10 h-10 rounded-lg bg-white border border-zinc-200 flex items-center justify-center text-primary mb-4 shadow-sm">
                      <benefit.icon className="w-5 h-5" />
                    </div>
                    <h5 className="font-bold text-zinc-900 mb-2">{benefit.title}</h5>
                    <p className="text-sm text-zinc-500 leading-relaxed">{benefit.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Scope Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Included */}
              <div className="bg-green-50/50 rounded-2xl p-6 md:p-8 border border-green-100">
                <h4 className="text-lg font-bold text-green-900 mb-6 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-green-200 flex items-center justify-center text-green-700">✓</span>
                  What's included in your subscription:
                </h4>
                <ul className="space-y-4">
                  {currentModel.included.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 shrink-0" />
                      <span className="text-sm text-green-800 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Excluded */}
              <div className="bg-red-50/50 rounded-2xl p-6 md:p-8 border border-red-100">
                <h4 className="text-lg font-bold text-red-900 mb-6 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-red-200 flex items-center justify-center text-red-700">✗</span>
                  Outside the scope of this model:
                </h4>
                <ul className="space-y-4">
                  {currentModel.excluded.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0" />
                      <span className="text-sm text-red-800/80 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        </motion.div>

      </Container>
    </section>
  );
}
