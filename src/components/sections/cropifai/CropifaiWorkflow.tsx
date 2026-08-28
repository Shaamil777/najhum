import React from "react";
import { Scan, BrainCircuit, Lightbulb, Sprout } from "lucide-react";

export default function CropifaiWorkflow() {
  const steps = [
    {
      num: "01",
      title: "Sense",
      description: "Industrial sensors capture micro-climatic and soil data at 15-minute intervals.",
      icon: Scan
    },
    {
      num: "02",
      title: "Analyze",
      description: "Cloud engines process billions of data points through crop-specific AI models.",
      icon: BrainCircuit
    },
    {
      num: "03",
      title: "Decide",
      description: "Actionable recommendations are generated for resource optimization and risk mitigation.",
      icon: Lightbulb
    },
    {
      num: "04",
      title: "Irrigate",
      description: "Smart controllers execute precise water delivery via automated valve management.",
      icon: Sprout
    }
  ];

  return (
    <section className="w-full py-24 md:py-32 bg-white text-neutral-900 overflow-hidden relative">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Header */}
        <div className="text-center mb-20 md:mb-32 relative z-10">
          <p className="text-sm font-bold tracking-widest uppercase text-primary mb-4">
            WORKFLOW
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black font-display text-neutral-900 leading-tight">
            Data-to-Action Lifecycle
          </h2>
        </div>

        {/* Steps Grid */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-8 z-10">
          
          {/* Decorative Connecting Line (Desktop Only) */}
          <div className="hidden lg:block absolute top-[2.5rem] left-[12.5%] right-[12.5%] h-[2px] bg-neutral-100 z-0">
             <div className="h-full w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent animate-pulse origin-left" style={{ animationDuration: '3s' }}></div>
          </div>

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative z-10 flex flex-col group cursor-default">
                
                {/* Large Background Number */}
                <div className="absolute -top-16 -left-8 text-[9rem] font-black text-neutral-50 pointer-events-none transition-all duration-700 ease-out group-hover:-translate-y-4 group-hover:text-primary/5 select-none">
                  {step.num}
                </div>
                
                {/* Icon Circle */}
                <div className="w-20 h-20 bg-white rounded-2xl shadow-xl shadow-neutral-200/50 border border-neutral-100 flex items-center justify-center text-primary mb-8 relative z-10 transition-all duration-500 group-hover:scale-110 group-hover:-rotate-3 group-hover:bg-primary group-hover:text-white group-hover:shadow-primary/30">
                  <Icon className="w-8 h-8" strokeWidth={2} />
                </div>

                {/* Text Content */}
                <div className="relative z-10 pr-4 mt-2">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-sm font-bold text-primary/60 tracking-wider">STEP {step.num}</span>
                  </div>
                  <h3 className="text-2xl font-black mb-4 text-neutral-800 tracking-tight group-hover:text-primary transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-neutral-500 leading-relaxed font-medium">
                    {step.description}
                  </p>
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
