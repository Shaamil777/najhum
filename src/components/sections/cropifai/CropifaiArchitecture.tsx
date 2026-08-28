import React from "react";
import { Cloud, Cpu, Droplets, LayoutDashboard, Wifi, ThermometerSun, Activity } from "lucide-react";

export default function CropifaiArchitecture() {
  const nodes = [
    { name: "Field Sensors", icon: Activity, shift: "translate-y-0" },
    { name: "Weather Station", icon: ThermometerSun, shift: "translate-y-12" },
    { name: "LoRaWAN Gateway", icon: Wifi, shift: "-translate-y-12" },
    { name: "CropifAI Cloud", icon: Cloud, shift: "translate-y-0", isMain: true },
    { name: "AI Analytics", icon: Cpu, shift: "-translate-y-12" },
    { name: "Farmer Dashboard", icon: LayoutDashboard, shift: "translate-y-12" },
    { name: "Auto Irrigation", icon: Droplets, shift: "translate-y-0" },
  ];

  return (
    <section className="w-full py-12 md:py-16 flex flex-col items-center justify-center bg-primary text-white border-b border-primary/20 overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <p className="text-xs font-medium tracking-widest uppercase text-white/70 mb-2">
            SYSTEM ARCHITECTURE
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display text-white leading-tight">
            The CropifAI Connected Ecosystem
          </h2>
        </div>

        {/* Visual Flow Timeline */}
        <div className="relative w-full max-w-6xl mx-auto flex items-center justify-between min-h-[250px] px-2 sm:px-6">
          {/* Curved Connecting SVG Line */}
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[96px] z-0 pointer-events-none px-10 sm:px-20">
            <svg 
              className="w-full h-full overflow-visible" 
              preserveAspectRatio="none" 
              viewBox="0 0 100 100"
            >
              <path 
                d="M 0,50 
                   C 8.33,50 8.33,100 16.66,100 
                   C 25,100 25,0 33.33,0 
                   C 41.66,0 41.66,50 50,50 
                   C 58.33,50 58.33,0 66.66,0 
                   C 75,0 75,100 83.33,100 
                   C 91.66,100 91.66,50 100,50" 
                fill="none" 
                stroke="rgba(255,255,255,0.25)" 
                strokeWidth="2" 
                vectorEffect="non-scaling-stroke"
                strokeDasharray="4 4"
              />
            </svg>
          </div>

          {nodes.map((node, index) => {
            const Icon = node.icon;
            const isMain = node.isMain;

            return (
              <div 
                key={index} 
                className={`relative z-10 flex flex-col items-center min-w-[70px] sm:min-w-[120px] ${node.shift}`}
              >
                {isMain ? (
                  <>
                    <div className="w-20 h-20 sm:w-28 sm:h-28 bg-white rounded-2xl flex items-center justify-center text-primary shadow-[0_0_50px_rgba(34,197,94,0.6)] z-10 mb-4 transition-transform hover:scale-105 cursor-pointer">
                      <Icon className="w-10 h-10 sm:w-14 sm:h-14" strokeWidth={2} />
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-center whitespace-nowrap">{node.name}</h3>
                  </>
                ) : (
                  <>
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-white/40 bg-primary flex items-center justify-center text-white/90 z-10 mb-3 hover:border-white transition-all hover:scale-110 cursor-pointer shadow-lg">
                      <Icon className="w-7 h-7 sm:w-8 sm:h-8" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-[11px] sm:text-sm font-medium text-white/80 text-center leading-tight max-w-[100px]">
                      {node.name.split(' ').map((word, i) => <React.Fragment key={i}>{word}<br/></React.Fragment>)}
                    </h3>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
