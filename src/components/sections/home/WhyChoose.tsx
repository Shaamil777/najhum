import { homeContent } from "@/content/home";
import { Check, X, Database, Hexagon, Monitor, Eye, Settings, Network, Zap, Brain, Box, BarChart3, ArrowRight } from "lucide-react";

const centerIcons = [Monitor, Eye, Settings, Network, Zap, Brain];
const traditionalIcons = [Monitor, Database, Settings, Box, Zap, BarChart3];

export default function WhyChoose() {
  const { whyChoose } = homeContent;

  return (
    <section className="relative w-full bg-white py-16 sm:py-24 overflow-hidden font-poppins">
      
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-16 relative z-20 px-6">
        <span className="text-sm font-semibold tracking-widest text-primary uppercase mb-4 flex items-center gap-4 before:h-px before:w-8 before:bg-blue-200 after:h-px after:w-8 after:bg-blue-200">
          {whyChoose.label}
        </span>
        <h2 className="font-poppins normal-case text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-zinc-900 mb-6">
          Smarter. Unified. <span className="text-primary">Future-Ready.</span>
        </h2>
        <p className="text-lg md:text-xl text-zinc-500 max-w-2xl">
          {whyChoose.subtitle}
        </p>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 relative z-10 lg:scale-[0.85] xl:scale-[0.9] 2xl:scale-100 lg:origin-top transition-transform duration-300 lg:-mb-32 xl:-mb-16 2xl:mb-0">
        
        {/* Background Ambient Pixel Grids */}
        {/* Left Grey Grids */}
        <div className="absolute top-10 -left-10 w-96 h-96 bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] bg-[size:32px_32px] opacity-20 z-0 pointer-events-none [mask-image:radial-gradient(circle,white,transparent_70%)]" />
        
        {/* Right Blue Grids */}
        <div className="absolute top-20 -right-10 w-[500px] h-[500px] bg-[linear-gradient(to_right,#60a5fa_1px,transparent_1px),linear-gradient(to_bottom,#60a5fa_1px,transparent_1px)] bg-[size:32px_32px] opacity-25 z-0 pointer-events-none [mask-image:radial-gradient(circle,white,transparent_70%)]" />

        {/* Desktop Comparison Grid */}
        <div className="hidden lg:grid grid-cols-[1fr_260px_1fr] w-full relative z-10 drop-shadow-xl">
           
           {/* Row 0: Headers */}
           <div className="bg-gradient-to-b from-blue-50/80 to-white rounded-t-3xl border-t border-l border-r border-zinc-200 pt-6 pb-5 px-8 flex items-center justify-center relative">
              <div className="bg-white border border-zinc-200 rounded-full py-2 px-6 flex items-center shadow-sm">
                 <span className="font-bold text-black tracking-widest text-[0.8rem]">{whyChoose.competitorLabel.toUpperCase()}</span>
              </div>
           </div>
           
           <div className="bg-transparent"></div>
           
           <div className="bg-primary rounded-t-3xl pt-6 pb-5 px-8 flex items-center justify-center relative overflow-hidden">
              <div className="bg-white/15 border border-white/20 rounded-full py-2 px-6 flex items-center relative z-10 shadow-sm backdrop-blur-sm">
                 <span className="font-bold text-white tracking-widest text-[0.8rem]">{whyChoose.najhumLabel.toUpperCase()}</span>
              </div>
           </div>

           {/* Rows 1-N */}
           {whyChoose.features.map((f, i) => {
              const CenterIcon = centerIcons[i];
              const TradIcon = traditionalIcons[i];
              const isLast = i === whyChoose.features.length - 1;
              return (
                <div className="contents" key={i}>
                  {/* Left Cell */}
                  <div className={`bg-gradient-to-r from-blue-50/30 to-white px-8 py-6 flex items-center justify-between border-l border-r border-zinc-200 ${isLast ? 'rounded-b-3xl border-b' : 'border-b border-zinc-100'}`}>
                     <div className="flex items-center gap-4 max-w-[85%]">
                        <TradIcon className="w-5 h-5 text-zinc-400 flex-shrink-0" />
                        <p className="text-black text-[0.9rem] leading-relaxed font-medium">{f.competitor}</p>
                     </div>
                     <div className="w-6 h-6 rounded-full bg-zinc-100 flex items-center justify-center flex-shrink-0">
                       <X className="w-3 h-3 text-zinc-400" />
                     </div>
                  </div>

                  {/* Center Cell */}
                  <div className="relative flex flex-col items-center justify-center py-4">
                     {/* Dotted connecting line */}
                     <div className="absolute top-1/2 left-0 right-0 border-t-2 border-dotted border-blue-300 -z-10 -translate-y-1/2" />
                     {/* Dots on the ends of the line */}
                     <div className="absolute top-1/2 left-0 w-1.5 h-1.5 rounded-full bg-blue-400 -translate-y-1/2 -translate-x-1/2" />
                     <div className="absolute top-1/2 right-0 w-1.5 h-1.5 rounded-full bg-blue-400 -translate-y-1/2 translate-x-1/2" />
                     
                     <div className="w-10 h-10 rounded-full bg-white border border-blue-200 shadow-sm flex items-center justify-center z-10 text-blue-500 mb-2">
                        <CenterIcon className="w-4 h-4" />
                     </div>
                     <span className="text-[9px] font-bold text-zinc-800 tracking-widest text-center uppercase max-w-[100px] leading-tight mt-1">
                       {f.name}
                     </span>
                  </div>

                  {/* Right Cell */}
                  <div className={`bg-primary px-8 py-6 flex items-center gap-4 relative overflow-hidden ${isLast ? 'rounded-b-3xl' : 'border-b border-white/10'}`}>
                     <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 shadow-inner relative z-10">
                       <Check className="w-3 h-3 text-white" />
                     </div>
                     <p className="text-white text-[0.95rem] leading-relaxed font-medium relative z-10 max-w-[90%]">{f.najhum}</p>
                  </div>
                </div>
              );
           })}
        </div>

        {/* Mobile Comparison (Stacked) */}
        <div className="lg:hidden flex flex-col gap-8 relative z-10">
           {/* Mobile Traditional */}
           <div className="bg-gradient-to-b from-blue-50/50 to-white rounded-3xl border border-zinc-200 shadow-lg overflow-hidden">
             <div className="bg-transparent py-4 px-6 border-b border-zinc-200 flex items-center justify-center">
                <div className="bg-white border border-zinc-200 rounded-full py-1.5 px-5 flex items-center shadow-sm">
                   <span className="font-bold text-black text-[0.75rem] tracking-widest">{whyChoose.competitorLabel.toUpperCase()}</span>
                </div>
             </div>
             <div className="flex flex-col">
                {whyChoose.features.map((f, i) => (
                  <div key={i} className={`p-6 flex flex-col gap-2 ${i !== whyChoose.features.length - 1 ? 'border-b border-zinc-100' : ''}`}>
                     <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">{f.name}</span>
                     <div className="flex items-start justify-between gap-4">
                        <p className="text-black text-sm leading-relaxed font-medium">{f.competitor}</p>
                        <div className="w-6 h-6 rounded-full bg-zinc-100 flex items-center justify-center flex-shrink-0 mt-1">
                          <X className="w-3 h-3 text-zinc-400" />
                        </div>
                     </div>
                  </div>
                ))}
             </div>
           </div>

           {/* Mobile Najhum */}
           <div className="bg-primary rounded-3xl shadow-xl overflow-hidden relative">
             <div className="bg-white/10 py-4 px-6 border-b border-white/10 flex items-center justify-center relative z-10">
                <div className="bg-white/15 border border-white/20 rounded-full py-1.5 px-5 flex items-center shadow-sm backdrop-blur-sm">
                   <span className="font-bold text-white text-[0.75rem] tracking-widest">{whyChoose.najhumLabel.toUpperCase()}</span>
                </div>
             </div>
             <div className="flex flex-col relative z-10">
                {whyChoose.features.map((f, i) => (
                  <div key={i} className={`p-6 flex flex-col gap-2 ${i !== whyChoose.features.length - 1 ? 'border-b border-white/10' : ''}`}>
                     <span className="text-xs font-bold text-blue-200 uppercase tracking-wider">{f.name}</span>
                     <div className="flex items-start gap-4">
                        <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-1">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                        <p className="text-white text-sm leading-relaxed font-medium">{f.najhum}</p>
                     </div>
                  </div>
                ))}
             </div>
           </div>
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-12 bg-white border border-zinc-200 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative z-20">
           <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                 <BarChart3 className="w-8 h-8 text-primary" />
              </div>
              <div className="flex flex-col gap-1">
                 <h4 className="text-lg md:text-xl font-bold text-zinc-900">Move from legacy limitations to limitless possibilities.</h4>
                 <p className="text-zinc-500 text-sm md:text-base max-w-xl">Najhum Platform empowers industries with real-time intelligence, automation, and efficiency at every level.</p>
              </div>
           </div>
           
           <div className="flex flex-col items-center md:items-end gap-3 flex-shrink-0 w-full md:w-auto mt-4 md:mt-0 md:pl-8 md:border-l border-zinc-100">
              <span className="text-sm font-medium text-zinc-500">Ready to transform your operations?</span>
              <button className="w-full md:w-auto bg-primary hover:bg-primary-hover transition-colors text-white font-semibold py-3 px-8 rounded-full flex items-center justify-center gap-2">
                 Request a Demo <ArrowRight className="w-4 h-4" />
              </button>
           </div>
        </div>

      </div>
    </section>
  );
}