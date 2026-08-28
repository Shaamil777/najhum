import React from "react";
import { Droplets, ShieldAlert, Network } from "lucide-react";

export default function CropifaiWhyChoose() {
  const features = [
    {
      title: "Absolute Water Conservation",
      description: "Save millions of gallons annually through precision delivery systems that only water when the plant needs it.",
      icon: Droplets,
    },
    {
      title: "Predictive Risk Management",
      description: "Identify pest threats and environmental stressors 7-10 days before they become visible to the human eye.",
      icon: ShieldAlert,
    },
    {
      title: "Multi-Farm Orchestration",
      description: "Monitor thousands of acres across different geographic locations from a single command center.",
      icon: Network,
    },
  ];

  const roadmap = [
    {
      num: "1",
      title: "Initial Assessment",
      description: "Reviewing farm topography and crop requirements.",
    },
    {
      num: "2",
      title: "Field Survey",
      description: "Sensor placement optimization and network coverage testing.",
    },
    {
      num: "3",
      title: "Hardware Deployment",
      description: "Installation of IoT sensors, gateways, and controllers.",
    },
    {
      num: "4",
      title: "Cloud Integration",
      description: "Live data feed activation and dashboard configuration.",
    },
    {
      num: "5",
      title: "AI Optimization",
      description: "Model training and autonomous irrigation active.",
    },
  ];

  return (
    <section className="w-full py-24 md:py-32 bg-neutral-50 text-neutral-900 relative">
      <div className="container mx-auto px-6 max-w-7xl">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Why Trust Section */}
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black font-display text-neutral-900 leading-tight mb-12">
              Why Leading Agri-Enterprises <br />
              <span className="text-primary">Trust CropifAI</span>
            </h2>
            
            <div className="flex flex-col gap-10">
              {features.map((feature, idx) => {
                const Icon = feature.icon;
                return (
                  <div key={idx} className="flex gap-6 items-start">
                    <div className="w-14 h-14 shrink-0 rounded-2xl bg-white shadow-sm border border-neutral-100 flex items-center justify-center text-primary">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-neutral-900">{feature.title}</h3>
                      <p className="text-neutral-600 leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Roadmap Section */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl shadow-neutral-200/50 border border-neutral-100">
            <h3 className="text-2xl md:text-3xl font-black font-display text-neutral-900 mb-10">
              Implementation Roadmap
            </h3>
            
            <div className="relative border-l-2 border-neutral-100 ml-4 flex flex-col gap-8 pb-4">
              {roadmap.map((step, idx) => (
                <div key={idx} className="relative pl-8">
                  {/* Timeline dot */}
                  <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-primary ring-4 ring-white shadow-sm" />
                  
                  <h4 className="text-lg font-bold text-neutral-900 mb-1 flex items-center gap-2">
                    <span className="text-primary font-black text-sm">STEP {step.num}</span> 
                    <span className="text-neutral-300 mx-1">•</span>
                    {step.title}
                  </h4>
                  <p className="text-neutral-500 leading-relaxed text-sm md:text-base">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
