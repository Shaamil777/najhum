import { Container } from "@/design-system/primitives/layout/Container";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ProductsHero() {
  return (
    <section className="w-full relative overflow-hidden bg-[#f8faff] pt-16 pb-8 lg:pt-24 lg:pb-12">
      {/* Abstract Background Shape */}
      <div className="absolute top-0 right-0 w-[50%] h-full bg-gradient-to-bl from-[#e5eeff] to-transparent rounded-bl-full z-0 opacity-70"></div>

      <Container size="full" className="relative z-10 px-4 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
          
          {/* Left Content */}
          <div className="w-full lg:w-1/2 flex flex-col items-start text-left">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-[2px] bg-primary"></div>
              <span className="text-xs font-bold tracking-widest text-muted uppercase">Products</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-[3.5rem] font-bold text-foreground mb-6 tracking-tight leading-[1.1] font-display">
              Innovative Solutions <br />
              <span className="text-primary">for a Smarter Tomorrow</span>
            </h1>
            
            <p className="text-lg text-muted max-w-md leading-relaxed mb-10">
              Explore our complete range of products designed to deliver reliability, performance, and real-world impact.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <Link
                href="#products"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-foreground hover:bg-neutral-800 text-white px-8 py-3.5 rounded-full font-semibold text-sm transition-all"
              >
                <span>Explore Products</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 text-foreground font-semibold text-sm hover:text-primary transition-colors group"
              >
                <span>Contact Our Team</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right Image/Visual Composition */}
          <div className="w-full lg:w-1/2 relative h-[240px] lg:h-[320px] flex items-center justify-center">
            {/* Soft circle background */}
            <div className="absolute w-[80%] h-[80%] rounded-full bg-white/60 blur-3xl shadow-2xl"></div>
            
            {/* Placeholder for Device 1 (Router) */}
            <div className="absolute right-[35%] top-[10%] w-36 h-48 lg:w-44 lg:h-52 bg-white rounded-2xl shadow-xl border border-neutral-100 flex flex-col justify-between p-3 transform -rotate-2">
              <div className="w-full h-6 flex justify-end gap-1">
                 <div className="w-1 h-full bg-neutral-100 rounded-full"></div>
                 <div className="w-1 h-full bg-neutral-100 rounded-full"></div>
                 <div className="w-1 h-full bg-neutral-100 rounded-full"></div>
                 <div className="w-1 h-full bg-neutral-100 rounded-full"></div>
              </div>
              <div className="w-8 h-1 bg-primary rounded-full mt-auto"></div>
            </div>

            {/* Placeholder for Device 2 (Sensor) */}
            <div className="absolute left-[40%] bottom-[5%] w-28 h-28 lg:w-36 lg:h-36 bg-white rounded-3xl shadow-2xl border border-neutral-100 flex items-center justify-center transform rotate-3">
               <span className="text-2xl lg:text-3xl font-light text-neutral-300">N</span>
               <div className="absolute top-2 left-2 w-1.5 h-1.5 rounded-full bg-neutral-200"></div>
               <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-neutral-200"></div>
               <div className="absolute bottom-2 left-2 w-1.5 h-1.5 rounded-full bg-neutral-200"></div>
               <div className="absolute bottom-2 right-2 w-1.5 h-1.5 rounded-full bg-neutral-200"></div>
            </div>

            {/* Hand-drawn text and arrow decoration (simulated) */}
            <div className="absolute top-[15%] right-[5%] max-w-[120px] lg:max-w-[140px] transform rotate-6">
               <p className="font-sans italic text-xs lg:text-sm text-neutral-500 text-center leading-tight">
                 Technology<br/>for a better tomorrow
               </p>
               <svg className="w-8 h-12 text-neutral-400 mt-2 mx-auto transform -rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
               </svg>
            </div>
          </div>
          
        </div>
      </Container>
    </section>
  );
}