import React from "react";
import { Poppins } from "next/font/google";
import { PlugZap, Server, BarChart3 } from "lucide-react";

const poppins = Poppins({ 
  subsets: ["latin"], 
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins"
});

export default function EvolticsAbout() {
  return (
    <section 
      className={`relative w-full bg-[#f8f9fa] py-16 sm:py-24 lg:py-32 overflow-hidden ${poppins.variable} ${poppins.className}`}
      style={{
        '--font-display': 'var(--font-poppins)',
        '--font-sans': 'var(--font-poppins)'
      } as React.CSSProperties}
    >
      {/* Subtle Background Gradients - matching home page style */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#f8f9fa] via-zinc-50/50 to-[#f8f9fa] z-0"></div>
      <div className="absolute top-0 right-0 w-full lg:w-1/2 h-full bg-teal-50/40 blur-3xl rounded-full opacity-60 z-0 transform translate-x-1/4 -translate-y-1/4 hidden lg:block"></div>
      
      <div className="max-w-[1536px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-24 items-center relative">
          
          {/* Left Column: Content */}
          <div className="flex flex-col relative z-10 w-full">
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="text-sm font-medium text-teal-600 uppercase tracking-widest">
                Who We Are
              </span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-zinc-900 mb-6 whitespace-pre-line">
              The EV Revolution Is Here
            </h2>
            
            <p className="text-lg sm:text-xl text-zinc-900 font-medium mb-6 leading-relaxed">
              The Middle East is rapidly electrifying — demand for reliable EV charging infrastructure is surging.
            </p>
            
            <p className="text-sm sm:text-base text-zinc-500 mb-10 leading-relaxed">
              Evoltics is a full-service EV charging solutions provider based in the UAE. From CPO licensing and regulatory approvals to hardware supply, installation, software management, and ongoing maintenance — we deliver everything under one roof, empowering businesses to join the electric mobility revolution.
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 sm:gap-8 mb-8 sm:mb-12 pt-8 border-t border-zinc-200">
              <div className="flex flex-col border-l-2 border-teal-500 pl-6">
                <span className="text-3xl sm:text-4xl font-black tracking-tighter text-zinc-900 mb-1 sm:mb-2">40%</span>
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-zinc-500 mb-1 sm:mb-2">Annual Growth</span>
                <p className="text-[10px] sm:text-xs text-zinc-400 leading-relaxed">in UAE EV registrations</p>
              </div>
              <div className="flex flex-col border-l-2 border-teal-500 pl-6">
                <span className="text-3xl sm:text-4xl font-black tracking-tighter text-zinc-900 mb-1 sm:mb-2">42,000+</span>
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-zinc-500 mb-1 sm:mb-2">EV Chargers</span>
                <p className="text-[10px] sm:text-xs text-zinc-400 leading-relaxed">needed across UAE by 2030</p>
              </div>
            </div>
          </div>

          {/* Right Column: Simplified Visuals / Core Pillars */}
          <div className="w-full relative z-10 flex flex-col gap-4 sm:gap-6">
            <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-zinc-100 flex items-start gap-4 sm:gap-6 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center flex-shrink-0">
                <PlugZap className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-zinc-900 mb-2">End-to-End Infrastructure</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">
                  We supply, install, and manage hardware while navigating all DEWA, TAQA, and FEWA regulatory approvals for you.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-zinc-100 flex items-start gap-4 sm:gap-6 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center flex-shrink-0">
                <Server className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-zinc-900 mb-2">Smart Management (CPMS)</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">
                  Our IoT-enabled Charge Point Management System and driver app allow you to monitor, control, and monetize your network.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-zinc-100 flex items-start gap-4 sm:gap-6 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center flex-shrink-0">
                <BarChart3 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-zinc-900 mb-2">Scale & Monetize</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">
                  Deploy white-label solutions and rely on our smart auto-payment settlements to generate effortless revenue.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
