"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  Zap,
  Scale,
  BadgeDollarSign,
  Wrench,
  Receipt,
  Truck,
  Network,
  CheckCircle2,
  MapPin,
  BarChart3,
  Cpu,
  Layers,
  Radio,
  Sliders,
  ShieldCheck,
  ArrowUpRight,
  TrendingUp,
  RefreshCw,
  Server
} from "lucide-react";

type DashboardTab = "fleet" | "load" | "revenue";

const features = [
  { icon: Server, title: "Hardware Agnostic", desc: "Integrate and setup any OCPP-compliant charger in a few clicks and start charging." },
  { icon: BarChart3, title: "Dashboard & Analytics", desc: "Monitor your charging network with real-time data insights, charts and statistics." },
  { icon: Layers, title: "White Label Ready", desc: "Host a self-branded CPMS from your custom domain with personal brand logo and colors." },
  { icon: BadgeDollarSign, title: "Dynamic Price Plans", desc: "Create multiple pricing groups with independent rates for public and private users." },
  { icon: Receipt, title: "Auto-Payment Settlements", desc: "Smart settlement system auto-calculates fees and distributes net revenue monthly." },
  { icon: ShieldCheck, title: "Public-Private Mode", desc: "Set charger accessibility for employees or visitors as private, or open to the public." },
];

const mockStations = [
  { id: "EV-DXB-01", location: "Downtown Hub", chargers: 12, active: 11, power: "320 kW", status: "Optimal" },
  { id: "EV-DXB-04", location: "Dubai Marina", chargers: 8, active: 8, power: "240 kW", status: "Peak Load" },
  { id: "EV-AUH-02", location: "Yas Island Hub", chargers: 16, active: 14, power: "480 kW", status: "Optimal" },
  { id: "EV-SHJ-01", location: "Al Majaz Depot", chargers: 6, active: 5, power: "150 kW", status: "Optimal" },
];

const mockSessions = [
  { id: "SES-8492", vehicle: "Porsche Taycan", port: "DC CCS2 (350kW)", soc: "84%", rate: "142 kW", cost: "AED 64.50" },
  { id: "SES-8493", vehicle: "Tesla Model Y", port: "DC CCS2 (150kW)", soc: "62%", rate: "110 kW", cost: "AED 42.10" },
  { id: "SES-8494", vehicle: "Audi e-tron GT", port: "DC CCS2 (350kW)", soc: "91%", rate: "45 kW", cost: "AED 78.20" },
];

export default function EvolticsPlatform() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<DashboardTab>("fleet");
  const [livePower, setLivePower] = useState(1.24);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setLivePower((prev) => +(prev + (Math.random() * 0.04 - 0.02)).toFixed(2));
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  return (
    <section className="w-full py-28 bg-white relative overflow-hidden font-sans ">
      
      {/* Background Architectural Grid & Radial Glow */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,#000_15%,transparent_100%)]" />
      </div>

      <div className="w-full max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-16 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">

            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl lg:text-[2rem] xl:text-[3.2rem] font-black tracking-tight text-foreground leading-[1.05] uppercase"
            >
              CPMS — Charge Point <br />
              <span className="text-primary font-black">Management System</span>
            </motion.h2>
          </div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-muted text-base lg:text-lg max-w-md leading-relaxed italic"
          >
            World's first IoT-enabled EV Charger Management Platform.
          </motion.p>
        </div>

        {/* Main Interactive Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-16">
          
          {/* Left Column: 4 Feature Capabilities */}
          <div className="lg:col-span-4 flex flex-col space-y-4">
            <div className="mb-4">
              <h3 className="text-2xl font-bold text-foreground mb-3 leading-tight">
                Everything you need <br className="hidden lg:block"/> in one CPMS
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                Connect and control all your EV infrastructure from a single platform. Manage revenue, users, energy output, and more with our open, interoperable, hardware-agnostic software.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
              {features.map((feat, i) => {
                const Icon = feat.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="p-4 rounded-xl bg-surface border border-border/80 hover:border-primary/40 hover:bg-surface-alt/50 transition-all flex items-start space-x-4 group shadow-sm"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/15 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                        {feat.title}
                      </h4>
                      <p className="text-xs text-muted leading-relaxed mt-1">
                        {feat.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Live Enterprise Dashboard Showcase */}
          <div className="lg:col-span-8 lg:mt-12 xl:mt-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-dark rounded-2xl border border-white/10 shadow-2xl overflow-hidden relative"
            >
              
              {/* Dashboard Browser Frame Bar */}
              <div className="bg-dark-surface px-5 py-3.5 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex space-x-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                  </div>
                  <div className="h-3 w-px bg-white/10" />
                  <span className="text-[11px] font-mono text-neutral-400">
                    evoltics.cloud/admin/control-hub
                  </span>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2 px-2.5 py-1 bg-green-500/10 border border-green-500/20 rounded-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-[10px] font-bold tracking-widest text-green-400 uppercase">
                      Telemetry Active
                    </span>
                  </div>
                </div>
              </div>

              {/* Dashboard Sub-Header with Interactive Tabs */}
              <div className="px-6 py-4 bg-dark-surface/60 border-b border-white/5 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center space-x-2 bg-black/40 p-1 rounded-xl border border-white/5">
                  <button
                    onClick={() => setActiveTab("fleet")}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center space-x-2 ${
                      activeTab === "fleet" 
                        ? 'bg-primary text-white shadow-sm' 
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    <Radio className="w-3.5 h-3.5" />
                    <span>Live Network Topology</span>
                  </button>

                  <button
                    onClick={() => setActiveTab("load")}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center space-x-2 ${
                      activeTab === "load" 
                        ? 'bg-primary text-white shadow-sm' 
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    <Sliders className="w-3.5 h-3.5" />
                    <span>Smart Load & V2G</span>
                  </button>

                  <button
                    onClick={() => setActiveTab("revenue")}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center space-x-2 ${
                      activeTab === "revenue" 
                        ? 'bg-primary text-white shadow-sm' 
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    <BadgeDollarSign className="w-3.5 h-3.5" />
                    <span>Revenue & Tariffs</span>
                  </button>
                </div>

                <div className="flex items-center space-x-4 text-xs font-mono text-neutral-400">
                  <span>Aggregate Load: <strong className="text-white">{livePower} MW</strong></span>
                </div>
              </div>

              {/* Dashboard Dynamic Content View */}
              <div className="p-6 min-h-[420px]">
                <AnimatePresence mode="wait">
                  
                  {/* TAB 1: Live Network Topology */}
                  {activeTab === "fleet" && (
                    <motion.div
                      key="fleet"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.25 }}
                      className="space-y-6"
                    >
                      {/* Metric Stat Strip */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        <div className="bg-dark-surface/60 border border-white/5 p-3.5 rounded-xl">
                          <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block mb-1">Active Chargers</span>
                          <span className="text-xl font-bold font-mono text-white">48 <span className="text-xs text-neutral-500 font-normal">/ 50</span></span>
                        </div>
                        <div className="bg-dark-surface/60 border border-white/5 p-3.5 rounded-xl">
                          <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block mb-1">Network Uptime</span>
                          <span className="text-xl font-bold font-mono text-emerald-400">99.98%</span>
                        </div>
                        <div className="bg-dark-surface/60 border border-white/5 p-3.5 rounded-xl">
                          <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block mb-1">Live Dispense</span>
                          <span className="text-xl font-bold font-mono text-blue-400">{livePower} MW</span>
                        </div>
                        <div className="bg-dark-surface/60 border border-white/5 p-3.5 rounded-xl">
                          <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block mb-1">Avg Latency</span>
                          <span className="text-xl font-bold font-mono text-white">18ms</span>
                        </div>
                      </div>

                      {/* Map & Station List Split */}
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                        
                        {/* Interactive Topology Visualizer */}
                        <div className="md:col-span-7 bg-dark-surface/40 border border-white/5 rounded-xl p-4 relative min-h-[220px] flex flex-col justify-between overflow-hidden">
                          <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px] opacity-15" />
                          
                          <div className="flex items-center justify-between relative z-10">
                            <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest">
                              UAE Hub Distribution (OCPP 2.0.1)
                            </span>
                            <span className="text-[10px] font-mono text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                              4 Clusters Active
                            </span>
                          </div>

                          {/* Pulsing Regional Nodes */}
                          <div className="relative h-36 z-10">
                            {/* Dubai Node */}
                            <div className="absolute top-[35%] left-[55%]">
                              <motion.div animate={{ scale: [1, 2.2], opacity: [0.6, 0] }} transition={{ duration: 2, repeat: Infinity }} className="absolute -inset-1 bg-primary rounded-full" />
                              <div className="w-3.5 h-3.5 rounded-full bg-primary flex items-center justify-center text-[8px] font-bold text-white shadow-lg shadow-primary">DXB</div>
                            </div>

                            {/* Abu Dhabi Node */}
                            <div className="absolute top-[60%] left-[30%]">
                              <motion.div animate={{ scale: [1, 2.2], opacity: [0.6, 0] }} transition={{ duration: 2.2, repeat: Infinity, delay: 0.3 }} className="absolute -inset-1 bg-emerald-500 rounded-full" />
                              <div className="w-3.5 h-3.5 rounded-full bg-emerald-500 flex items-center justify-center text-[8px] font-bold text-white shadow-lg shadow-emerald-500">AUH</div>
                            </div>

                            {/* Sharjah Node */}
                            <div className="absolute top-[25%] left-[70%]">
                              <motion.div animate={{ scale: [1, 2.2], opacity: [0.6, 0] }} transition={{ duration: 2.4, repeat: Infinity, delay: 0.6 }} className="absolute -inset-1 bg-blue-400 rounded-full" />
                              <div className="w-3.5 h-3.5 rounded-full bg-blue-400 flex items-center justify-center text-[8px] font-bold text-white shadow-lg shadow-blue-400">SHJ</div>
                            </div>

                            {/* Connecting Mesh lines */}
                            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
                              <line x1="55%" y1="35%" x2="30%" y2="60%" stroke="var(--color-primary)" strokeWidth="1.5" strokeDasharray="3 3" />
                              <line x1="55%" y1="35%" x2="70%" y2="25%" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 3" />
                            </svg>
                          </div>

                          <div className="flex items-center justify-between text-[10px] text-neutral-400 relative z-10 pt-2 border-t border-white/5">
                            <span>Auto Fault-Isolation: <strong className="text-emerald-400">ENABLED</strong></span>
                            <span>WebSocket Heartbeat: <strong className="text-white">500ms</strong></span>
                          </div>
                        </div>

                        {/* Station Cluster Feed */}
                        <div className="md:col-span-5 space-y-2">
                          {mockStations.map((st) => (
                            <div key={st.id} className="p-2.5 rounded-lg bg-dark-surface/50 border border-white/5 flex items-center justify-between">
                              <div>
                                <span className="text-xs font-bold text-white block">{st.location}</span>
                                <span className="text-[10px] font-mono text-neutral-400">{st.id} • {st.active}/{st.chargers} ports</span>
                              </div>
                              <div className="text-right">
                                <span className="text-xs font-mono font-bold text-primary block">{st.power}</span>
                                <span className="text-[9px] text-emerald-400 font-semibold">{st.status}</span>
                              </div>
                            </div>
                          ))}
                        </div>

                      </div>
                    </motion.div>
                  )}

                  {/* TAB 2: Smart Load & Grid (V2G) */}
                  {activeTab === "load" && (
                    <motion.div
                      key="load"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.25 }}
                      className="space-y-6"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div className="bg-dark-surface/60 border border-white/5 p-4 rounded-xl">
                          <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block mb-1">Peak Load Shaved</span>
                          <span className="text-2xl font-bold font-mono text-emerald-400">-28.4%</span>
                          <p className="text-[10px] text-neutral-400 mt-1">Grid demand smoothing active</p>
                        </div>
                        <div className="bg-dark-surface/60 border border-white/5 p-4 rounded-xl">
                          <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block mb-1">V2G Readiness</span>
                          <span className="text-2xl font-bold font-mono text-blue-400">ISO 15118-20</span>
                          <p className="text-[10px] text-neutral-400 mt-1">Bi-directional enabled</p>
                        </div>
                        <div className="bg-dark-surface/60 border border-white/5 p-4 rounded-xl">
                          <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block mb-1">Transformer Headroom</span>
                          <span className="text-2xl font-bold font-mono text-white">420 kVA</span>
                          <p className="text-[10px] text-neutral-400 mt-1">Safe operating capacity</p>
                        </div>
                      </div>

                      {/* Power Curve Graphic */}
                      <div className="bg-dark-surface/40 border border-white/5 rounded-xl p-5">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-xs font-bold text-white">Dynamic Load Distribution Curve</span>
                          <span className="text-[10px] text-emerald-400 font-mono">Real-time Solar & Grid Balance</span>
                        </div>
                        <div className="h-32 flex items-end gap-1.5 pt-4">
                          {[35, 42, 58, 65, 80, 95, 88, 72, 60, 50, 40, 48, 62, 75, 82, 90, 85, 70, 55, 45].map((val, idx) => (
                            <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                              <div 
                                style={{ height: `${val}%` }} 
                                className={`w-full rounded-t-sm transition-all ${
                                  val > 85 ? 'bg-amber-400' : 'bg-primary'
                                }`} 
                              />
                            </div>
                          ))}
                        </div>
                        <div className="flex justify-between text-[9px] text-neutral-500 font-mono mt-2 pt-2 border-t border-white/5">
                          <span>00:00</span>
                          <span>06:00</span>
                          <span>12:00 (Solar Peak)</span>
                          <span>18:00 (Fleet Surge)</span>
                          <span>23:59</span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* TAB 3: Revenue & Dynamic Tariffs */}
                  {activeTab === "revenue" && (
                    <motion.div
                      key="revenue"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.25 }}
                      className="space-y-4"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="bg-dark-surface/60 border border-white/5 p-4 rounded-xl">
                          <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block mb-1">Today&apos;s Revenue</span>
                          <span className="text-2xl font-bold font-mono text-white">AED 14,280</span>
                        </div>
                        <div className="bg-dark-surface/60 border border-white/5 p-4 rounded-xl">
                          <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block mb-1">Total Energy Dispensed</span>
                          <span className="text-2xl font-bold font-mono text-blue-400">18.4 MWh</span>
                        </div>
                        <div className="bg-dark-surface/60 border border-white/5 p-4 rounded-xl">
                          <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block mb-1">Active Billing Multiplier</span>
                          <span className="text-2xl font-bold font-mono text-emerald-400">1.0x (Standard)</span>
                        </div>
                      </div>

                      {/* Live Transaction Stream */}
                      <div className="bg-dark-surface/40 border border-white/5 rounded-xl p-4">
                        <span className="text-xs font-bold text-white block mb-3">Live Active Charging Transactions</span>
                        <div className="space-y-2">
                          {mockSessions.map((ses) => (
                            <div key={ses.id} className="p-3 bg-dark-surface/60 border border-white/5 rounded-lg flex items-center justify-between text-xs">
                              <div>
                                <span className="font-bold text-white block">{ses.vehicle}</span>
                                <span className="text-[10px] font-mono text-neutral-400">{ses.id} • {ses.port}</span>
                              </div>
                              <div className="text-right">
                                <span className="font-bold font-mono text-emerald-400 block">{ses.cost}</span>
                                <span className="text-[10px] text-neutral-400">{ses.soc} • {ses.rate}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                </AnimatePresence>
              </div>

            </motion.div>

            {/* Enterprise Compatibility Footer & Prominent OCPP Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between px-2 gap-4"
            >
              <div className="flex items-center space-x-4">
                <span className="text-xs font-semibold text-muted uppercase tracking-wider">
                  Infrastructure Partners:
                </span>
                <div className="flex items-center space-x-4 opacity-70">
                  <span className="text-sm font-black text-foreground hover:text-primary transition-colors cursor-pointer">DEWA</span>
                  <span className="text-sm font-black text-foreground hover:text-primary transition-colors cursor-pointer">TAQA</span>
                  <span className="text-sm font-black text-foreground hover:text-primary transition-colors cursor-pointer">FEWA</span>
                </div>
              </div>

              {/* Prominent Outside Certification Badge */}
              <div className="flex items-center space-x-4 bg-surface border border-border px-5 py-3 rounded-xl shadow-sm cursor-pointer group hover:border-primary/40 transition-colors overflow-hidden">
                <div className="w-14 h-14 relative flex items-center justify-center -ml-1">
                  <Image 
                    src="/logo/occplogo.png" 
                    alt="OCPP 2.0.1 Certified" 
                    width={96} 
                    height={96} 
                    className="object-contain opacity-90 group-hover:opacity-100 transition-all scale-[1.3] group-hover:scale-[1.4]" 
                  />
                </div>
                <div className="flex flex-col pr-2">
                  <span className="text-sm font-bold text-foreground leading-none mb-1">OCPP 2.0.1</span>
                  <span className="text-[10px] text-muted uppercase tracking-widest font-semibold">Certified Network Protocol</span>
                </div>
              </div>
            </motion.div>

          </div>

        </div>

      </div>
    </section>
  );
}
