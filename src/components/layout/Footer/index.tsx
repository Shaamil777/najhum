import { FooterLinks } from "./FooterLinks";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-slate-50/50 text-slate-900 flex flex-col font-sans relative overflow-hidden border-t border-slate-200">
      {/* Top accent gradient border */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent pointer-events-none" />

      {/* Subtle background ambient lighting */}
      <div className="absolute top-0 left-10 w-96 h-96 bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] bg-[size:32px_32px] opacity-[0.14] pointer-events-none [mask-image:radial-gradient(circle,white,transparent_70%)]" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-[linear-gradient(to_right,#60a5fa_1px,transparent_1px),linear-gradient(to_bottom,#60a5fa_1px,transparent_1px)] bg-[size:32px_32px] opacity-[0.08] pointer-events-none [mask-image:radial-gradient(circle,white,transparent_70%)]" />
      
      <div className="relative z-10 w-full flex flex-col">
        <FooterLinks />
        
        {/* Copyright Bar */}
        <div className="w-full py-6 text-center text-xs sm:text-sm font-medium text-slate-400 border-t border-slate-200/80 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6">
            <span className="text-left text-slate-500 text-xs sm:text-sm">
              &copy; {new Date().getFullYear()} Najhum Technologies LLC. All rights reserved.
            </span>
            
            <a 
              href="https://dexiko.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group inline-flex items-center gap-1.5 text-xs sm:text-sm text-slate-500 hover:text-primary transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600 rounded-sm"
            >
              <span>Developed by</span>
              <span className="font-semibold text-slate-700 group-hover:text-primary transition-colors">Dexiko</span>
            </a>

            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-slate-500">
              <Link href="/privacy-policy" className="inline-flex min-h-11 items-center rounded-sm hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600">Privacy Policy</Link>
              <span className="text-slate-300">•</span>
              <Link href="/terms-and-conditions" className="inline-flex min-h-11 items-center rounded-sm hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600">Terms &amp; Conditions</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

