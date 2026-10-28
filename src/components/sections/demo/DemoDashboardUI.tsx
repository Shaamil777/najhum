import Link from "next/link";
import { demoContent } from "@/content/demo";

export default function DemoDashboardUI() {
  const { dashboardUI } = demoContent;
  return (
    <section className="w-full bg-white py-20 md:py-32 font-sans border-b border-neutral-200">
      <div className="container-base max-w-[1200px]">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
          
          {/* Dashboard Image Placeholder (Left) */}
          <div className="w-full lg:w-[65%] order-2 lg:order-1">
            <Link href="/platforms/iotrics#iotrics-core" aria-label="Explore the IoTRICs dashboard" className="block rounded-2xl border border-neutral-200 bg-neutral-50 p-3 shadow-lg overflow-hidden">
              <img src="/images/iotrics/dashboard-iotrics.webp" alt="IoTRICs monitoring dashboard preview" className="w-full h-auto rounded-xl" loading="lazy"/>
            </Link>
          </div>
          
          {/* Content & Dummy Data (Right) */}
          <div className="w-full lg:w-[35%] flex flex-col items-start order-1 lg:order-2">
            <p className="text-[10px] font-bold tracking-widest text-neutral-400 uppercase mb-3">
              {dashboardUI.badge}
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-neutral-900 leading-tight mb-6 tracking-tight">
              {dashboardUI.title}
            </h2>
            <p className="text-sm text-neutral-500 leading-relaxed mb-10 md:mb-12">
              {dashboardUI.description}
            </p>
            
            <div className="flex flex-col gap-6 md:gap-8 w-full mb-10 md:mb-12">
              <div className="flex flex-col border-l-2 border-neutral-200 pl-5 hover:border-black transition-colors duration-300">
                <h4 className="text-[10px] font-bold text-neutral-900 uppercase tracking-widest mb-1.5">
                  {dashboardUI.statusFeed.label}
                </h4>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                  <p className="text-xs text-neutral-600 font-mono font-bold tracking-tight uppercase">
                    {dashboardUI.statusFeed.value}
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col border-l-2 border-neutral-200 pl-5 hover:border-black transition-colors duration-300">
                <h4 className="text-[10px] font-bold text-neutral-900 uppercase tracking-widest mb-1.5">
                  {dashboardUI.statusNode.label}
                </h4>
                <p className="text-xs text-neutral-500 font-mono font-bold tracking-tight uppercase">
                  {dashboardUI.statusNode.value}
                </p>
              </div>
            </div>
            
            <Link href="/platforms/iotrics#iotrics-core" className="px-8 py-4 bg-black text-white text-[10px] font-bold tracking-widest uppercase rounded-lg hover:bg-neutral-800 transition-colors w-full md:w-auto shadow-lg hover:shadow-xl hover:-translate-y-0.5 duration-300">
              {dashboardUI.buttonLabel}
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}