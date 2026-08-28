import React from "react";

export default function CropifaiAbout() {
  return (
    <section className="relative w-full min-h-[60vh] flex items-center bg-white overflow-hidden py-24 md:py-32">
      {/* Brand Blue Arrow Shape on the left with rounded corners */}
      <div className="absolute left-0 top-0 bottom-0 w-1/2 sm:w-1/3 lg:w-1/4">
        <svg 
          viewBox="0 0 100 100" 
          preserveAspectRatio="none"
          className="w-full h-full text-primary overflow-visible"
        >
          <polygon 
            points="-5,-5 100,50 -5,105 0,75 50,50 0,25" 
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row justify-end items-center">
        <div className="w-full sm:w-[85%] md:w-3/4 lg:w-[72%] pl-10 sm:pl-16 md:pl-20 py-8">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display text-foreground mb-6 leading-tight">
            Smart Agriculture, <br />
            Powered by <span className="text-primary">AI & IoT</span>
          </h2>
          <p className="text-lg md:text-xl text-muted leading-relaxed font-medium mb-10 max-w-3xl">
            CropifAI™ is an intelligent platform combining IoT sensors, AI analytics, and cloud technology for real-time monitoring. We help you reduce water consumption, optimize crop health, and fully automate irrigation decisions.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
            {[
              { num: "1", title: "COLLECT", desc: "Intelligent sensors capture soil, water & environmental data" },
              { num: "2", title: "CONNECT", desc: "LoRaWAN & cloud connectivity from remote field locations" },
              { num: "3", title: "COLLABORATE", desc: "AI-driven dashboards turn data into actionable insights" },
            ].map((step) => (
              <div key={step.num} className="bg-neutral-50 border border-neutral-100 rounded-xl p-5 flex flex-col gap-3 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold shadow-sm">
                  {step.num}
                </div>
                <h3 className="text-sm font-bold text-neutral-900 uppercase tracking-wider">
                  {step.title}
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
