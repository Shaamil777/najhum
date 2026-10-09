import React from "react";
import { demoContent } from "@/content/demo";

export default function DemoTrustMetrics() {
  const { trustMetrics: metrics } = demoContent;

  return (
    <section className="w-full bg-white border-b border-neutral-200">
      <div className="container-base max-w-[1200px]">
        {/* Force 4 columns on all screens to stay in a single row */}
        <div className="grid grid-cols-4 gap-1 sm:gap-4 py-8 md:py-16">
          {metrics.map((metric, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center justify-center text-center"
            >
              <p className="text-[6px] sm:text-[9px] md:text-[10px] font-bold tracking-widest text-neutral-400 uppercase mb-1 md:mb-2 leading-tight">
                {metric.label}
              </p>
              <div className="flex flex-col items-center">
                <span className="text-lg sm:text-3xl md:text-4xl lg:text-5xl font-black text-neutral-900 tracking-tighter">
                  {metric.value}
                </span>
                <span className="text-[6px] sm:text-[9px] md:text-[10px] font-bold tracking-widest text-neutral-500 uppercase mt-0.5 md:mt-1 leading-tight">
                  {metric.suffix}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}