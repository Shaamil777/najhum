import React from "react";
import { Target, Droplets, TrendingUp, GitBranch } from "lucide-react";

export default function CropifaiSolutions() {
  const solutions = [
    {
      subtitle: "PRECISION",
      title: "PRECISION FARMING",
      description: "Site-specific crop management using granular environmental data.",
      icon: Target,
    },
    {
      subtitle: "AUTOMATION",
      title: "SMART IRRIGATION",
      description: "Autonomous water management based on real-time soil moisture.",
      icon: Droplets,
    },
    {
      subtitle: "FORECASTING",
      title: "AI YIELD PREDICTION",
      description: "Machine learning models forecasting seasonal harvest volume.",
      icon: TrendingUp,
    },
    {
      subtitle: "COMPLIANCE",
      title: "SUPPLY CHAIN TRACEABILITY",
      description: "End-to-end logging of crop lifecycle for industrial compliance.",
      icon: GitBranch,
    },
  ];

  return (
    <section className="w-full py-24 bg-white text-neutral-900 border-b border-neutral-200">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black font-display text-neutral-800 leading-[1.1] uppercase tracking-tight">
            BUILT FOR PRECISION. <br className="hidden md:block" />
            DESIGNED TO GROW.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {solutions.map((solution, index) => {
            const Icon = solution.icon;
            return (
              <div 
                key={index} 
                className="bg-neutral-50 p-8 rounded-lg flex flex-col items-start transition-all duration-300 hover:bg-neutral-100"
              >
                <div className="text-primary mb-6">
                  <Icon className="w-12 h-12" strokeWidth={1.5} />
                </div>
                
                <h4 className="text-xs font-bold text-primary uppercase tracking-wider mb-2">
                  {solution.subtitle}
                </h4>
                
                <h3 className="text-lg font-black text-neutral-800 uppercase leading-snug tracking-tight mb-4 min-h-[3rem]">
                  {solution.title}
                </h3>
                
                <p className="text-sm text-neutral-500 leading-relaxed font-medium">
                  {solution.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
