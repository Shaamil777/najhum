import React from "react";
import { Cpu, Shield, Globe, ArrowUpRight, Share2 } from "lucide-react";
import { homeContent } from "@/content/home";

export default function Analytics() {
  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="w-full max-w-full mx-auto px-8 lg:px-16">
        
        {/* Header Area */}
        <div className="mb-10 lg:mb-12 flex flex-col lg:flex-row lg:items-end justify-between gap-6 lg:gap-8 border-b border-neutral-200 pb-8 lg:pb-10">
          <div className="flex-1">
            <p className="text-[10px] md:text-xs font-black tracking-[0.2em] uppercase text-neutral-900 mb-4">
              {homeContent.analytics.badge}
            </p>
            <h2 className="text-5xl md:text-7xl lg:text-[5rem] font-black text-neutral-900 tracking-tighter uppercase leading-[0.9]">
              {homeContent.analytics.headline}<br /><span className="text-neutral-300 italic">{homeContent.analytics.headlineItalic}</span>
            </h2>
          </div>
          <div className="lg:w-1/3 lg:max-w-[320px]">
            <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest leading-relaxed">
              {homeContent.analytics.description}
            </p>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 lg:grid-rows-2 gap-4 md:gap-6">
          
          {/* Card 01: Core Platform */}
          <div className="relative col-span-1 lg:col-span-2 lg:row-span-2 bg-[#0d0d0d] rounded-[2rem] p-6 md:p-10 lg:p-8 xl:p-12 text-white overflow-hidden flex flex-col justify-between min-h-[280px] md:min-h-[350px] lg:min-h-[360px] xl:min-h-[450px]">
            <div>
              <p className="text-[10px] font-black tracking-widest uppercase mb-4 text-white">{homeContent.analytics.cards.core.label}</p>
              <h3 className="text-xl font-bold mb-2 !text-white" style={{ color: "white" }}>{homeContent.analytics.cards.core.title}</h3>
              <p className="text-sm text-neutral-400 max-w-sm leading-relaxed mb-8">
                {homeContent.analytics.cards.core.description}
              </p>
              <div className="w-12 h-12 border border-white/20 rounded-xl flex items-center justify-center">
                <Cpu className="w-5 h-5 text-white" />
              </div>
            </div>
            
            <div className="mt-12 md:mt-20 flex items-end justify-between">
              <div>
                <h4 className="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-2 !text-white" style={{ color: "white" }}>{homeContent.analytics.cards.core.kpiValue}</h4>
                <p className="text-xs text-neutral-500 tracking-widest font-bold uppercase">{homeContent.analytics.cards.core.kpiLabel}</p>
              </div>
              <ArrowUpRight className="w-8 h-8 text-neutral-400" />
            </div>
          </div>

          {/* Card 02: Connectivity */}
          <div className="col-span-1 lg:col-span-2 lg:row-span-1 bg-white border border-neutral-200 rounded-[2rem] p-6 md:p-10 lg:p-6 xl:p-10 flex flex-col justify-between min-h-[180px] md:min-h-[220px] lg:min-h-[180px] xl:min-h-[250px]">
            <div>
              <p className="text-[10px] font-black tracking-widest uppercase text-neutral-900 mb-4">{homeContent.analytics.cards.connectivity.label}</p>
              <h3 className="text-xl font-bold mb-2 text-neutral-900">{homeContent.analytics.cards.connectivity.title}</h3>
              <p className="text-sm text-neutral-500 max-w-sm leading-relaxed">
                {homeContent.analytics.cards.connectivity.description}
              </p>
            </div>
            
            <div className="mt-6 xl:mt-8 flex items-end justify-between">
              <div className="flex-1 mr-6 pt-2">
                <div className="h-1.5 w-full bg-neutral-100 rounded-full overflow-hidden mb-3">
                  <div className="h-full bg-[#0d0d0d] w-full rounded-full" />
                </div>
                <p className="text-[9px] font-black tracking-widest text-neutral-400 uppercase">
                  {homeContent.analytics.cards.connectivity.progressText}
                </p>
              </div>
              <div className="text-right pb-0.5">
                <h4 className="text-2xl md:text-3xl font-black tracking-tighter text-neutral-900 leading-none">{homeContent.analytics.cards.connectivity.kpiValue}</h4>
                <p className="text-[8px] text-neutral-500 tracking-widest font-bold uppercase mt-1">{homeContent.analytics.cards.connectivity.kpiLabel}</p>
              </div>
            </div>
          </div>

          {/* Card 03: Deployment */}
          <div className="col-span-1 lg:col-span-1 lg:row-span-1 bg-[#0d0d0d] rounded-[2rem] p-6 md:p-10 lg:p-6 xl:p-10 flex flex-col justify-between min-h-[180px] md:min-h-[220px] lg:min-h-[180px] xl:min-h-[250px] text-white">
            <div>
              <p className="text-[10px] font-black tracking-widest uppercase mb-4 text-white">{homeContent.analytics.cards.deployment.label}</p>
              <h3 className="text-xl font-bold mb-2 !text-white" style={{ color: "white" }}>{homeContent.analytics.cards.deployment.title}</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                {homeContent.analytics.cards.deployment.description}
              </p>
            </div>
            <div className="mt-6 xl:mt-8 flex items-end justify-between">
              <Globe className="w-8 h-8 text-neutral-400" />
              <div className="text-right">
                <h4 className="text-2xl md:text-3xl font-black tracking-tighter !text-white" style={{ color: "white" }}>{homeContent.analytics.cards.deployment.kpiValue}</h4>
                <p className="text-[8px] text-neutral-500 tracking-widest font-bold uppercase mt-1">{homeContent.analytics.cards.deployment.kpiLabel}</p>
              </div>
            </div>
          </div>

          {/* Card 04: Analytics */}
          <div className="col-span-1 lg:col-span-1 lg:row-span-1 bg-white border border-neutral-200 rounded-[2rem] p-6 md:p-10 lg:p-6 xl:p-10 flex flex-col justify-between min-h-[180px] md:min-h-[220px] lg:min-h-[180px] xl:min-h-[250px]">
            <div>
              <p className="text-[10px] font-black tracking-widest uppercase text-neutral-900 mb-4">{homeContent.analytics.cards.analytics.label}</p>
              <h3 className="text-sm font-bold text-neutral-900 mb-2">
                {homeContent.analytics.cards.analytics.title}
              </h3>
              <p className="text-xs text-neutral-500 leading-relaxed mb-6">
                {homeContent.analytics.cards.analytics.description}
              </p>
            </div>
            
            <div className="mt-6 xl:mt-8 flex items-end justify-between w-full">
              <div className="flex items-end justify-between gap-1.5 md:gap-2 h-16 xl:h-24 flex-1 mr-4 md:mr-6">
                {/* Mini Chart visualization */}
                {[
                  { label: homeContent.analytics.cards.analytics.chartLabels[0], h: "h-[30%]" },
                  { label: homeContent.analytics.cards.analytics.chartLabels[1], h: "h-[65%]" },
                  { label: homeContent.analytics.cards.analytics.chartLabels[2], h: "h-[45%]" },
                  { label: homeContent.analytics.cards.analytics.chartLabels[3], h: "h-[90%]" },
                  { label: homeContent.analytics.cards.analytics.chartLabels[4], h: "h-[55%]" },
                  { label: homeContent.analytics.cards.analytics.chartLabels[5], h: "h-[100%]" }
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center flex-1 h-full justify-end group relative cursor-pointer">
                    <span className="absolute -top-7 text-[10px] font-bold text-neutral-900 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-white px-2 py-0.5 rounded shadow-sm border border-neutral-100 z-10">
                      {item.label}
                    </span>
                    <div className={`w-full bg-neutral-200 transition-all duration-300 group-hover:bg-neutral-900 rounded-sm ${item.h}`} />
                  </div>
                ))}
              </div>
              <div className="text-right pb-1">
                <h4 className="text-2xl md:text-3xl font-black tracking-tighter text-neutral-900 leading-none">{homeContent.analytics.cards.analytics.kpiValue}</h4>
                <p className="text-[8px] text-neutral-500 tracking-widest font-bold uppercase mt-1">{homeContent.analytics.cards.analytics.kpiLabel}</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}