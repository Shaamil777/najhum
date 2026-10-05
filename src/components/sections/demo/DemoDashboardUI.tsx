import { Image as ImageIcon } from "lucide-react";
import { motion } from "framer-motion";

export default function DemoDashboardUI() {
  return (
    <section className="w-full bg-white py-20 md:py-32 font-sans border-b border-neutral-200">
      <div className="container-base max-w-[1200px]">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
          
          {/* Dashboard Image Placeholder (Left) */}
          <div className="w-full lg:w-[65%] order-2 lg:order-1">
            <div className="relative w-full aspect-[4/3] md:aspect-[16/10] bg-[#f8f9fa] border-2 border-dashed border-neutral-200 rounded-3xl flex flex-col items-center justify-center overflow-hidden group hover:bg-neutral-50 hover:border-neutral-300 transition-all duration-300">
              <ImageIcon className="w-12 h-12 text-neutral-300 mb-4 group-hover:scale-110 transition-transform duration-500" />
              <p className="text-[10px] md:text-xs font-bold tracking-widest text-neutral-400 uppercase">
                Dashboard Image Space
              </p>
              <p className="text-[9px] md:text-[10px] text-neutral-400 mt-2 max-w-[200px] text-center">
                Add your high-resolution platform UI mockup here.
              </p>
            </div>
          </div>
          
          {/* Content & Dummy Data (Right) */}
          <div className="w-full lg:w-[35%] flex flex-col items-start order-1 lg:order-2">
            <p className="text-[10px] font-bold tracking-widest text-neutral-400 uppercase mb-3">
              Featured Environment
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-neutral-900 leading-tight mb-6 tracking-tight">
              Dashboard UI Sample
            </h2>
            <p className="text-sm text-neutral-500 leading-relaxed mb-10 md:mb-12">
              Monitor asset health, track real-time telemetry, and leverage predictive AI models all from a single pane of glass designed for enterprise scale.
            </p>
            
            <div className="flex flex-col gap-6 md:gap-8 w-full mb-10 md:mb-12">
              <div className="flex flex-col border-l-2 border-neutral-200 pl-5 hover:border-black transition-colors duration-300">
                <h4 className="text-[10px] font-bold text-neutral-900 uppercase tracking-widest mb-1.5">
                  Feed Status
                </h4>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                  <p className="text-xs text-neutral-600 font-mono font-bold tracking-tight uppercase">
                    LIVE_FEED_STREAMING
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col border-l-2 border-neutral-200 pl-5 hover:border-black transition-colors duration-300">
                <h4 className="text-[10px] font-bold text-neutral-900 uppercase tracking-widest mb-1.5">
                  Node Identifier
                </h4>
                <p className="text-xs text-neutral-500 font-mono font-bold tracking-tight uppercase">
                  ID: M0C-904X
                </p>
              </div>
            </div>
            
            <button className="px-8 py-4 bg-black text-white text-[10px] font-bold tracking-widest uppercase rounded-lg hover:bg-neutral-800 transition-colors w-full md:w-auto shadow-lg hover:shadow-xl hover:-translate-y-0.5 duration-300">
              View Demo Dashboard
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}