import React from "react";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";

export default function CropifaiCta() {
  return (
    <section className="relative w-full py-24 md:py-32 overflow-hidden bg-neutral-900">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/20 blur-[100px] rounded-[100%] pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-black font-display text-white mb-6 leading-tight tracking-tight">
            Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">Optimize</span> Your Agricultural Operations?
          </h2>
          
          <p className="text-lg md:text-xl text-neutral-300 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
            Join the leading agri-enterprises saving millions of gallons of water and boosting crop yields with CropifAI's intelligent, data-driven ecosystem.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link 
              href="/demo" 
              className="w-full sm:w-auto group relative inline-flex items-center justify-center gap-3 px-8 py-5 bg-primary text-white rounded-full font-bold uppercase tracking-widest text-sm overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_-10px_rgba(34,197,94,0.5)]"
            >
              <span className="relative z-10 flex items-center gap-2">
                Schedule a Demo
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 bg-emerald-500 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
            </Link>

            <Link 
              href="/contact" 
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-5 bg-white/5 text-white rounded-full font-bold uppercase tracking-widest text-sm border border-white/10 hover:bg-white/10 transition-colors"
            >
              <Phone className="w-5 h-5 text-neutral-400" />
              Contact Sales
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
