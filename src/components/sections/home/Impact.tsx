import { ArrowRight, Cpu, Zap, Target, BatteryCharging, Server } from "lucide-react";
import Image from "next/image";
import { MarketingButton } from "@/design-system/primitives/actions/MarketingButton";
import { Card } from "@/design-system/primitives/surfaces/Card";
import { homeContent } from "@/content/home";
import { Poppins } from "next/font/google";

const poppins = Poppins({ 
  subsets: ["latin"], 
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins"
});

export default function Impact() {
  return (
    <section 
      className={`relative w-full bg-white py-10 sm:py-16 lg:py-32 ${poppins.variable} ${poppins.className}`}
      style={{
        '--font-display': 'var(--font-poppins)',
        '--font-sans': 'var(--font-poppins)'
      } as React.CSSProperties}
    >
      <div className="max-w-[1536px] mx-auto px-6 sm:px-8 lg:px-12 md:scale-[0.9] lg:scale-[0.85] xl:scale-[0.9] 2xl:scale-100 md:origin-top transition-transform duration-300 md:-mb-24 lg:-mb-32 xl:-mb-16 2xl:mb-0">
        <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-8 lg:gap-12 xl:gap-24 relative items-start">
          
          {/* Left Sticky Column */}
          <div className="lg:sticky lg:top-24 flex flex-col justify-center h-auto lg:h-[calc(100vh-6rem)] pb-12 lg:pb-0">
            <div className="max-w-xl lg:-ml-4 xl:-ml-12">
              <h2 className="font-display normal-case text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl 2xl:text-[5.5rem] font-bold tracking-tighter leading-[1] text-zinc-900 mb-6 lg:mb-8 whitespace-pre-line">
                Build
                Intelligent
                Operations.
              </h2>
              
              <p className="text-base sm:text-lg text-zinc-500 mb-8 lg:mb-10 leading-relaxed max-w-md">
                Transform industrial infrastructure with connected platforms for Industrial IoT, smart energy, EV mobility, and enterprise automation.
              </p>
              
              <MarketingButton icon={ArrowRight}>
                Explore Platforms
              </MarketingButton>

              <div className="flex gap-6 sm:gap-10 mt-8 md:mt-16 lg:mt-20">
                <div className="flex flex-col gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#4c3bcf] flex items-center justify-center text-white">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <p className="text-sm font-medium text-[#4c3bcf] max-w-[140px] leading-snug">
                    Industrial IoT<br/>Enterprise Platforms
                  </p>
                </div>
                <div className="flex flex-col gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#4c3bcf] flex items-center justify-center text-white">
                    <Zap className="w-5 h-5" />
                  </div>
                  <p className="text-sm font-medium text-[#4c3bcf] max-w-[140px] leading-snug">
                    Smart Energy<br/>& EV Infrastructure
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Scrolling Column (Cards) */}
          <div className="flex flex-col gap-4 sm:gap-6 lg:gap-8 pb-10 sm:pb-16 lg:pb-32">
            
            {/* Card 1 */}
            <Card variant="outlined" className="bg-white rounded-[2.5rem] p-5 sm:p-8 lg:p-12 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.08)] relative overflow-hidden group">
              <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(#cbd5e1_2px,transparent_2px)] [background-size:24px_24px] opacity-40 group-hover:opacity-80 transition-opacity duration-700" />
              <div className="relative z-10 flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8">
                <span className="text-sm font-semibold tracking-widest text-zinc-400 uppercase">{homeContent.impact.card1.label1}</span>
                <span className="text-xs font-bold px-3 py-1 bg-zinc-100 text-zinc-600 rounded-full uppercase tracking-wider w-fit">{homeContent.impact.card1.label2}</span>
              </div>
              <h3 className="normal-case text-xl sm:text-2xl lg:text-3xl font-bold text-zinc-900 mb-4 sm:mb-6">
                {homeContent.impact.card1.title}
              </h3>
              <p className="text-zinc-500 text-base sm:text-lg leading-relaxed mb-8 sm:mb-12">
                {homeContent.impact.card1.description}
              </p>
              <div className="flex justify-between items-center border-t border-zinc-100 pt-6">
                <p className="text-sm font-semibold text-[#4c3bcf]">
                  <span className="text-zinc-400 font-medium mr-2 uppercase tracking-wide text-xs">{homeContent.impact.card1.outcomeLabel}</span>
                  {homeContent.impact.card1.outcome}
                </p>
                <ArrowRight className="w-5 h-5 text-zinc-400" />
              </div>
            </Card>

            {/* Card 2 */}
            <Card variant="outlined" className="bg-white rounded-[2.5rem] p-4 sm:p-8 lg:p-10 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.08)]">
              <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-3 sm:gap-4 xl:gap-6">
                
                {/* 1. Industrial IoT */}
                <div className="relative bg-zinc-50 border border-zinc-100 rounded-[2rem] p-5 lg:p-8 overflow-hidden group hover:-translate-y-1 hover:shadow-md transition-all duration-300 cursor-default min-h-[140px] sm:min-h-[180px] lg:min-h-[220px]">
                  <div className="absolute -right-2 -bottom-6 text-[5rem] sm:text-[6rem] lg:text-[8rem] font-bold text-zinc-200 group-hover:text-zinc-300 transition-colors z-0 select-none leading-none">
                    {homeContent.impact.card2.items[0].id}
                  </div>
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6 text-zinc-900 group-hover:scale-110 transition-transform">
                      <Cpu className="w-6 h-6" />
                    </div>
                    <h4 className="normal-case text-xl font-bold text-zinc-900 mt-auto leading-tight">{homeContent.impact.card2.items[0].title}<br/>{homeContent.impact.card2.items[0].subtitle}</h4>
                  </div>
                </div>

                {/* 2. Smart Energy */}
                <div className="relative bg-zinc-50 border border-zinc-100 rounded-[2rem] p-5 lg:p-8 overflow-hidden group hover:-translate-y-1 hover:shadow-md transition-all duration-300 cursor-default min-h-[140px] sm:min-h-[180px] lg:min-h-[220px]">
                  <div className="absolute -right-2 -bottom-6 text-[5rem] sm:text-[6rem] lg:text-[8rem] font-bold text-zinc-200 group-hover:text-zinc-300 transition-colors z-0 select-none leading-none">
                    {homeContent.impact.card2.items[1].id}
                  </div>
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6 text-zinc-900 group-hover:scale-110 transition-transform">
                      <Zap className="w-6 h-6" />
                    </div>
                    <h4 className="normal-case text-xl font-bold text-zinc-900 mt-auto leading-tight">{homeContent.impact.card2.items[1].title}<br/>{homeContent.impact.card2.items[1].subtitle}</h4>
                  </div>
                </div>

                {/* 3. EV Charging */}
                <div className="relative bg-zinc-50 border border-zinc-100 rounded-[2rem] p-5 lg:p-8 overflow-hidden group hover:-translate-y-1 hover:shadow-md transition-all duration-300 cursor-default min-h-[140px] sm:min-h-[180px] lg:min-h-[220px]">
                  <div className="absolute -right-2 -bottom-6 text-[5rem] sm:text-[6rem] lg:text-[8rem] font-bold text-zinc-200 group-hover:text-zinc-300 transition-colors z-0 select-none leading-none">
                    {homeContent.impact.card2.items[2].id}
                  </div>
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6 text-zinc-900 group-hover:scale-110 transition-transform">
                      <BatteryCharging className="w-6 h-6" />
                    </div>
                    <h4 className="normal-case text-xl font-bold text-zinc-900 mt-auto leading-tight">{homeContent.impact.card2.items[2].title}<br/>{homeContent.impact.card2.items[2].subtitle}</h4>
                  </div>
                </div>

                {/* 4. Managed Services */}
                <div className="relative bg-zinc-50 border border-zinc-100 rounded-[2rem] p-5 lg:p-8 overflow-hidden group hover:-translate-y-1 hover:shadow-md transition-all duration-300 cursor-default min-h-[140px] sm:min-h-[180px] lg:min-h-[220px]">
                  <div className="absolute -right-2 -bottom-6 text-[5rem] sm:text-[6rem] lg:text-[8rem] font-bold text-zinc-200 group-hover:text-zinc-300 transition-colors z-0 select-none leading-none">
                    {homeContent.impact.card2.items[3].id}
                  </div>
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6 text-zinc-900 group-hover:scale-110 transition-transform">
                      <Server className="w-6 h-6" />
                    </div>
                    <h4 className="normal-case text-xl font-bold text-zinc-900 mt-auto leading-tight">{homeContent.impact.card2.items[3].title}<br/>{homeContent.impact.card2.items[3].subtitle}</h4>
                  </div>
                </div>

                {/* The green image box */}
                <div className="sm:col-span-2 2xl:col-span-2 bg-[#a3e635] rounded-[2rem] p-5 sm:p-6 lg:p-8 relative overflow-hidden flex flex-col items-start min-h-[160px] sm:min-h-[200px] lg:min-h-[220px] hover:shadow-lg transition-all duration-300 cursor-pointer group">
                  <h4 className="normal-case text-zinc-900 font-bold text-xl sm:text-2xl leading-tight w-2/3 sm:w-1/2 mb-auto relative z-10">
                    {homeContent.impact.card2.featureTitle}
                  </h4>
                  {/* Placeholder for person image, using a solid block for now to keep it clean */}
                  <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-zinc-800 rounded-t-full rounded-bl-full flex items-center justify-center rotate-12 opacity-90 group-hover:scale-105 transition-transform duration-500">
                    <div className="w-32 h-32 rounded-full bg-zinc-700/50" />
                  </div>
                  <div className="mt-auto relative z-10 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm group-hover:bg-zinc-900 group-hover:text-white transition-colors">
                    <ArrowRight className="w-6 h-6" />
                  </div>
                </div>
              </div>
            </Card>

            {/* Card 3 */}
            <Card variant="outlined" className="bg-white rounded-[2.5rem] p-5 sm:p-8 lg:p-12 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.08)] relative overflow-hidden group">
              <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(#cbd5e1_2px,transparent_2px)] [background-size:24px_24px] opacity-40 group-hover:opacity-80 transition-opacity duration-700" />
              <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start gap-8 mb-12">
                <div className="flex flex-col gap-1">
                  <h3 className="normal-case text-3xl sm:text-4xl lg:text-6xl font-bold text-[#3b82f6] tracking-tighter leading-none">
                    {homeContent.impact.card3.title1}
                  </h3>
                  <h3 className="normal-case text-3xl sm:text-4xl lg:text-6xl font-bold text-zinc-900 tracking-tighter leading-none">
                    {homeContent.impact.card3.title2}
                  </h3>
                </div>
                {/* Subtle abstract graphic top right */}
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-zinc-100 to-zinc-200 shadow-inner flex items-center justify-center shrink-0">
                   <div className="w-12 h-12 bg-white rounded-full shadow-sm" />
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row justify-between items-end gap-8 mt-auto border-t border-zinc-100 pt-8">
                <p className="text-zinc-500 text-base sm:text-lg leading-relaxed max-w-lg">
                  {homeContent.impact.card3.description}
                </p>
                <div className="w-14 h-14 rounded-full bg-zinc-900 flex items-center justify-center text-white shrink-0 shadow-lg hover:scale-105 transition-transform cursor-pointer">
                  <ArrowRight className="w-6 h-6" />
                </div>
              </div>
            </Card>

            {/* Card 4 */}
            <Card variant="outlined" className="bg-white rounded-[2.5rem] p-5 sm:p-8 lg:p-12 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.08)] relative overflow-hidden group">
              <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(#cbd5e1_2px,transparent_2px)] [background-size:24px_24px] opacity-40 group-hover:opacity-80 transition-opacity duration-700" />
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <div className="flex justify-between items-start mb-8">
                    <div className="flex flex-col gap-1">
                      <h3 className="normal-case text-3xl sm:text-4xl lg:text-5xl font-bold text-[#3b82f6] tracking-tighter leading-none">
                        {homeContent.impact.card4.title1}
                      </h3>
                      <h3 className="normal-case text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-900 tracking-tighter leading-none">
                        {homeContent.impact.card4.title2}
                      </h3>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-[#3b82f6]/10 flex items-center justify-center shrink-0">
                      <Zap className="w-6 h-6 text-[#3b82f6]" />
                    </div>
                  </div>
                  
                  <p className="text-zinc-500 text-base sm:text-lg leading-relaxed max-w-lg mb-8 sm:mb-12">
                    {homeContent.impact.card4.description}
                  </p>
                </div>
                
                <div className="flex justify-between items-center border-t border-zinc-100 pt-6">
                  <p className="text-sm font-semibold text-[#4c3bcf]">
                    <span className="text-zinc-400 font-medium mr-2 uppercase tracking-wide text-xs">{homeContent.impact.card4.outcomeLabel}</span>
                    {homeContent.impact.card4.outcome}
                  </p>
                  <ArrowRight className="w-5 h-5 text-zinc-400" />
                </div>
              </div>
            </Card>
            
            {/* Card 5 */}
            <Card variant="elevated" className="bg-zinc-900 border-none rounded-[2.5rem] p-5 sm:p-8 lg:p-12 shadow-[0_20px_50px_-12px_rgba(24,24,27,0.5)] text-white relative overflow-hidden group">
              <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(#52525b_2px,transparent_2px)] [background-size:24px_24px] opacity-40 group-hover:opacity-80 transition-opacity duration-700" />
              {/* Ambient glows */}
              <div className="absolute -top-20 -right-20 w-72 h-72 bg-[#3b82f6] rounded-full blur-[100px] opacity-30 group-hover:opacity-50 transition-opacity duration-700 pointer-events-none" />
              <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-[#a3e635] rounded-full blur-[100px] opacity-10 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none" />
              
              <div className="relative z-10 flex flex-col h-full justify-between min-h-[200px] lg:min-h-[300px]">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-white font-semibold tracking-widest uppercase text-sm mb-4 block">{homeContent.impact.card5.label}</span>
                    <h3 className="normal-case text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight max-w-[280px]" style={{ color: "#ffffff" }}>
                      {homeContent.impact.card5.title1}<br/>{homeContent.impact.card5.title2}
                    </h3>
                  </div>
                  <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-xl">
                    <Target className="w-6 h-6 text-[#a3e635]" />
                  </div>
                </div>
                
                <div className="border-t border-white/10 pt-8 mt-12 flex flex-col xl:flex-row justify-between xl:items-end gap-8">
                  <p className="text-zinc-400 text-base sm:text-lg leading-relaxed max-w-lg">
                    {homeContent.impact.card5.description}
                  </p>
                  <div className="flex items-center gap-3 bg-white text-zinc-900 px-6 py-3 rounded-full font-bold text-sm tracking-wider hover:bg-zinc-100 transition-colors cursor-pointer shrink-0 w-fit">
                    {homeContent.impact.card5.button} <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </Card>

            {/* Card 6 */}
            <Card variant="outlined" className="bg-white rounded-[2.5rem] p-5 sm:p-8 lg:p-12 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.08)] flex flex-col justify-between min-h-[200px] lg:min-h-[300px] relative overflow-hidden group">
               <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(#cbd5e1_2px,transparent_2px)] [background-size:24px_24px] opacity-40 group-hover:opacity-80 transition-opacity duration-700" />
               <div className="relative z-10">
                 <span className="text-sm font-semibold tracking-widest text-[#3b82f6] uppercase mb-4 block">
                   {homeContent.impact.card6.label}
                 </span>
                 <h3 className="normal-case text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-900 tracking-tighter leading-tight mb-6 sm:mb-8">
                   {homeContent.impact.card6.title1}<br/>{homeContent.impact.card6.title2}
                 </h3>
                 <p className="text-zinc-500 text-base sm:text-lg leading-relaxed max-w-xl mb-8 sm:mb-12">
                   {homeContent.impact.card6.description}
                 </p>
               </div>
               
               <div className="flex items-center justify-center gap-3 bg-zinc-900 text-white px-8 py-4 rounded-full font-bold text-sm tracking-wider hover:-translate-y-1 hover:shadow-xl hover:bg-zinc-800 transition-all cursor-pointer w-fit">
                 {homeContent.impact.card6.button} <ArrowRight className="w-4 h-4" />
               </div>
            </Card>

          </div>
        </div>
      </div>
    </section>
  );
}