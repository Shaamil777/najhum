import { ArrowRight, ArrowUpRight, Cpu, Zap, LayoutDashboard, AlertTriangle, FileCheck, Share2 } from "lucide-react";
import Link from "next/link";
import OperationsPreview from "./OperationsPreview";
import ImpactActivity from "./ImpactActivity";
import ImpactDotWave from "./ImpactDotWave";
import motion from "./ImpactMotion.module.css";
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
      className={`relative w-full bg-white pt-10 sm:pt-16 lg:pt-20 pb-0 ${poppins.variable} ${poppins.className}`}
      style={{
        '--font-display': 'var(--font-poppins)',
        '--font-sans': 'var(--font-poppins)'
      } as React.CSSProperties}
    >
      <div className="max-w-[1536px] mx-auto px-8 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-[45%_1fr] gap-8 lg:gap-12 xl:gap-20 relative items-start">
          
          {/* Left Sticky Column */}
          <div className="min-w-0 lg:sticky lg:top-24 xl:top-28 flex flex-col justify-start h-auto self-start pb-12 lg:pb-0 z-10">
            <div className="max-w-xl">
              <h2 className="font-display normal-case text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl 2xl:text-[5.5rem] font-bold tracking-tighter leading-[1] text-zinc-900 mb-6 lg:mb-8 whitespace-pre-line">
                {"Build\n"}
                <span className="text-primary">Intelligent</span>
                {"\nOperations."}
              </h2>
              
              <p className="text-base sm:text-lg text-zinc-500 mb-5 sm:mb-6 leading-relaxed max-w-md">
                {homeContent.impact.subCopy}
              </p>
              
              <div>
                <Link
                  href="/contact#contact-form"
                  className="inline-flex items-center justify-center gap-2 sm:gap-2.5 bg-primary hover:bg-primary-hover text-white px-6 py-3.5 sm:px-8 sm:py-4 rounded-full font-bold text-xs sm:text-sm whitespace-nowrap transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 active:translate-y-0 group"
                >
                  <span className="leading-none translate-y-px">{homeContent.impact.buttonLabel}</span>
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>

              {/* Platform links based on the supplied HTML reference. */}
              <div className={motion.platformLinks}>
                {[
                  { href: "/platforms/iotrics", title: "Industrial IoT", subtitle: "Enterprise platforms", Icon: Cpu },
                  { href: "/platforms/evoltics", title: "Smart Energy", subtitle: "& EV infrastructure", Icon: Zap },
                ].map(({ href, title, subtitle, Icon }) => (
                  <Link key={href} href={href} className={motion.platformLink}>
                    <span className={motion.platformIcon}><Icon size={22} strokeWidth={1.8} aria-hidden="true" /></span>
                    <span className={motion.platformCopy}>
                      <span>{title}</span>
                      <span>{subtitle}</span>
                    </span>
                    <ArrowUpRight className={motion.platformArrow} size={18} aria-hidden="true" />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right Scrolling Column (Cards) */}
          <div className="flex flex-col gap-6 sm:gap-8 pb-0">
            
            {/* Card 1 */}
            <Card variant="outlined" className="bg-white rounded-[2.5rem] p-6 sm:p-10 lg:p-12 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.08)] relative overflow-hidden group">
              <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(#cbd5e1_2px,transparent_2px)] [background-size:24px_24px] opacity-40 group-hover:opacity-80 transition-opacity duration-700" />

              <div className="relative z-10 flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8">
                <span className="text-sm font-semibold tracking-widest text-zinc-400 uppercase">
                  · {homeContent.impact.card1.label1} ·
                </span>
                <span className="text-xs font-bold px-3 py-1 bg-zinc-100 text-zinc-600 rounded-full uppercase tracking-wider w-fit">
                  {homeContent.impact.card1.label2}
                </span>
              </div>
              <h3 className="normal-case text-2xl sm:text-3xl lg:text-4xl font-bold text-zinc-900 mb-6">
                {homeContent.impact.card1.title1}<br/>{homeContent.impact.card1.title2}
              </h3>
              <p className="text-zinc-500 text-base sm:text-lg leading-relaxed mb-12">
                {homeContent.impact.card1.description}
              </p>
              <div className="flex justify-between items-center border-t border-zinc-100 pt-6">
                <p className="text-sm font-semibold text-[#3B82F6]">
                  <span className="text-zinc-400 font-medium mr-2 uppercase tracking-wide text-xs">
                    {homeContent.impact.card1.outcomeLabel}
                  </span>
                  {homeContent.impact.card1.outcome}
                </p>
              </div>
            </Card>

            {/* Card 2 */}
            <Card variant="outlined" className="bg-slate-50 rounded-[2.5rem] p-6 sm:p-10 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.08)]">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
                <span className="text-sm font-semibold tracking-widest text-zinc-400 uppercase">
                  · {homeContent.impact.card2.label1} ·
                </span>
                <span className="text-xs font-bold px-3 py-1 bg-zinc-100 text-zinc-600 rounded-full uppercase tracking-wider w-fit">
                  {homeContent.impact.card2.label2}
                </span>
              </div>

              {/* 4 Tiles in 2x2 Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                {homeContent.impact.card2.items.map((item, idx) => {
                  const icons = [LayoutDashboard, AlertTriangle, FileCheck, Share2];
                  const Icon = icons[idx] || LayoutDashboard;
                  return (
                    <div
                      key={item.id}
                      className="relative min-w-0 bg-white border border-zinc-100 rounded-[1.75rem] p-4 sm:p-5 overflow-hidden group hover:-translate-y-1 hover:border-blue-200 hover:shadow-md transition-all duration-300 flex flex-col gap-5"
                    >
                      <OperationsPreview kind={item.id} />
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 shrink-0 bg-primary rounded-xl flex items-center justify-center text-white group-hover:scale-105 transition-transform">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="min-w-0 pt-0.5">
                          <h4 className="normal-case text-base sm:text-lg font-bold text-zinc-900 leading-tight mb-1">
                            {item.title}
                          </h4>
                          <p className="text-xs sm:text-sm text-zinc-500 leading-snug">
                            {item.subtitle}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Payment comparison based on the supplied HTML reference. */}
                <div className={`${motion.paymentPanel} sm:col-span-2`}>
                  <span className={motion.paymentHalo} aria-hidden="true" />
                  <div className={motion.paymentHeader}>
                    <h4 className="normal-case text-white font-extrabold text-2xl sm:text-[2rem] leading-[1.15] tracking-tight">
                      {homeContent.impact.card2.panel.title}
                    </h4>
                    <Link href="/platforms/iotrics#business-models" className={motion.compareLink}>
                      Compare models <ArrowRight size={16} aria-hidden="true" />
                    </Link>
                  </div>
                  <div className={motion.paymentModels}>
                    {homeContent.impact.card2.panel.models.map((model, index) => (
                      <div key={model.name} className={`${motion.paymentModel} ${index === 0 ? motion.primaryModel : ""}`}>
                        <div className={motion.modelHeading}>
                          <h5 className="normal-case text-white text-xl font-bold">{model.name}</h5>
                          <span>{model.badge}</span>
                        </div>
                        <p>{model.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {/* Card 3 */}
            <Card variant="outlined" className="bg-white rounded-[2.5rem] p-6 sm:p-10 lg:p-12 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.08)] relative overflow-hidden group">
              <ImpactDotWave id="retrofit" />
              <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start gap-8 mb-12">
                <div className="flex flex-col gap-1">
                  <h3 className="normal-case text-4xl sm:text-5xl lg:text-6xl font-bold text-[#3B82F6] tracking-tighter leading-none">
                    {homeContent.impact.card3.title1}
                  </h3>
                  <h3 className="normal-case text-4xl sm:text-5xl lg:text-6xl font-bold text-zinc-900 tracking-tighter leading-none">
                    {homeContent.impact.card3.title2}
                  </h3>
                </div>
                <ImpactActivity kind="retrofit" />
              </div>
              
              <div className="flex flex-col sm:flex-row justify-between items-end gap-8 mt-auto border-t border-zinc-100 pt-8">
                <p className="text-zinc-500 text-base sm:text-lg leading-relaxed max-w-lg">
                  {homeContent.impact.card3.description}
                </p>
              </div>
            </Card>

            {/* Card 4 */}
            <Card variant="outlined" className="bg-white rounded-[2.5rem] p-6 sm:p-10 lg:p-12 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.08)] relative overflow-hidden group">
              <ImpactDotWave id="energy" />
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <div className="flex justify-between items-start mb-8">
                    <div className="flex flex-col gap-1">
                      <h3 className="normal-case text-3xl sm:text-4xl lg:text-5xl font-bold text-[#3B82F6] tracking-tighter leading-none">
                        {homeContent.impact.card4.title1}
                      </h3>
                      <h3 className="normal-case text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-900 tracking-tighter leading-none">
                        {homeContent.impact.card4.title2}
                      </h3>
                    </div>
                    <ImpactActivity kind="energy" />
                  </div>
                  
                  <p className="text-zinc-500 text-base sm:text-lg leading-relaxed max-w-lg mb-8 sm:mb-12">
                    {homeContent.impact.card4.description}
                  </p>
                </div>
                
                <div className="flex justify-between items-center border-t border-zinc-100 pt-6">
                  <p className="text-sm font-semibold text-[#3B82F6]">
                    <span className="text-zinc-400 font-medium mr-2 uppercase tracking-wide text-xs">{homeContent.impact.card4.outcomeLabel}</span>
                    {homeContent.impact.card4.outcome}
                  </p>
                </div>
              </div>
            </Card>
            
            {/* Card 5 */}
            <Card variant="elevated" className="bg-zinc-900 border-none rounded-[2.5rem] p-6 sm:p-10 lg:p-12 shadow-[0_20px_50px_-12px_rgba(24,24,27,0.5)] text-white relative overflow-hidden group">
              <ImpactDotWave id="maintenance" dark />
              {/* Ambient glows */}
              <div className="absolute -top-20 -right-20 w-72 h-72 bg-[#3B82F6] rounded-full blur-[100px] opacity-30 group-hover:opacity-50 transition-opacity duration-700 pointer-events-none" />
              <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-[#a3e635] rounded-full blur-[100px] opacity-10 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none" />
              
              <div className="relative z-10 flex flex-col h-full justify-between min-h-[200px] lg:min-h-[300px]">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-white font-semibold tracking-widest uppercase text-xs sm:text-sm mb-4 block">
                      · {homeContent.impact.card5.label} ·
                    </span>
                    <h3 className="normal-case text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight max-w-[280px]" style={{ color: "#ffffff" }}>
                      {homeContent.impact.card5.title1}<br/>{homeContent.impact.card5.title2}
                    </h3>
                  </div>
                  <ImpactActivity kind="maintenance" />
                </div>
                
                <div className="border-t border-white/10 pt-8 mt-12 flex flex-col xl:flex-row justify-between xl:items-end gap-8">
                  <p className="text-zinc-400 text-base sm:text-lg leading-relaxed max-w-lg">
                    {homeContent.impact.card5.description}
                  </p>
                </div>
              </div>
            </Card>

            {/* Card 6 */}
            <Card variant="outlined" className="bg-white rounded-[2.5rem] p-6 sm:p-10 lg:p-12 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.08)] flex flex-col justify-between min-h-[200px] lg:min-h-[300px] relative overflow-hidden group">
               <ImpactDotWave id="deployment" />
               <div className="relative z-10">
                 <span className={`${motion.startLabel} text-xs sm:text-sm font-semibold tracking-widest text-[#3B82F6] uppercase mb-4 block`}>
                   · {homeContent.impact.card6.label} ·
                 </span>
                 <h3 className="normal-case text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-900 tracking-tighter leading-tight mb-6 sm:mb-8 max-w-xl">
                   {homeContent.impact.card6.title}
                 </h3>
                 <p className="text-zinc-500 text-base sm:text-lg leading-relaxed max-w-xl mb-8 sm:mb-12">
                   {homeContent.impact.card6.description}
                 </p>
               </div>
               
               <ImpactActivity kind="deployment" />
               <Link href="/contact#contact-form" className="inline-block relative z-10">
                 <div className={`${motion.demoButton} flex items-center justify-center gap-3 bg-zinc-900 text-white px-8 py-4 rounded-full font-bold text-sm tracking-wider hover:-translate-y-1 hover:shadow-xl hover:bg-zinc-800 transition-all cursor-pointer w-fit`}>
                   {homeContent.impact.card6.button} <ArrowRight className="w-4 h-4" />
                 </div>
               </Link>
            </Card>

          </div>
        </div>
      </div>
    </section>
  );
}