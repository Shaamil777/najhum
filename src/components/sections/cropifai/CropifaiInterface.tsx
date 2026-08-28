import React from "react";
import { CheckCircle2 } from "lucide-react";

export default function CropifaiInterface() {
  const features = [
    "Real-time geospatial farm mapping",
    "Automated irrigation overrides",
    "Predictive maintenance alerts"
  ];

  return (
    <section className="w-full py-24 bg-[#0F1115] text-white overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-8">
          
          {/* Left Text Content */}
          <div className="w-full lg:w-1/2 lg:pr-10">
            <p className="text-xs font-bold tracking-widest uppercase text-neutral-500 mb-6">
              USER INTERFACE
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display text-white leading-tight mb-6">
              Unified Farmer Control Hub
            </h2>
            <p className="text-base md:text-lg text-neutral-400 mb-10 leading-relaxed max-w-lg">
              A powerful, intuitive dashboard designed for high-stakes decision making. Accessible from any device, anywhere.
            </p>

            <ul className="space-y-5">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center text-neutral-300">
                  <CheckCircle2 className="w-5 h-5 text-neutral-500 mr-4 shrink-0" strokeWidth={1.5} />
                  <span className="text-sm md:text-base">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Mockup Content */}
          <div className="w-full lg:w-1/2 relative flex justify-center lg:justify-end mt-12 lg:mt-0">
            {/* Desktop Mockup Placeholder */}
            <div className="relative w-[90%] lg:w-[95%] aspect-[16/10] bg-[#F4F5F7] rounded-xl overflow-hidden shadow-2xl border border-neutral-700">
               <svg className="absolute inset-0 w-full h-full text-neutral-300" preserveAspectRatio="none">
                 <line x1="0" y1="0" x2="100%" y2="100%" stroke="currentColor" strokeWidth="1.5" />
                 <line x1="100%" y1="0" x2="0" y2="100%" stroke="currentColor" strokeWidth="1.5" />
               </svg>
            </div>

            {/* Mobile Mockup Placeholder */}
            <div className="absolute -bottom-10 right-0 w-[28%] min-w-[120px] max-w-[160px] aspect-[9/19] bg-[#F4F5F7] rounded-3xl overflow-hidden shadow-2xl border-[6px] border-[#0F1115]">
               <svg className="absolute inset-0 w-full h-full text-neutral-300" preserveAspectRatio="none">
                 <line x1="0" y1="0" x2="100%" y2="100%" stroke="currentColor" strokeWidth="1.5" />
                 <line x1="100%" y1="0" x2="0" y2="100%" stroke="currentColor" strokeWidth="1.5" />
               </svg>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
