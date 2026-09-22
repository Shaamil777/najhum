import { FooterLinks } from "./FooterLinks";

export default function Footer() {
  return (
    <footer className="w-full bg-slate-50/50 text-slate-900 flex flex-col font-poppins relative overflow-hidden border-t border-slate-200 mt-24">
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
              className="group flex items-center gap-2 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <span className="text-[11px] uppercase tracking-wider font-medium text-slate-400">Developed by</span>
              <img 
                src="/images/footer/dexiko.png" 
                alt="Dexiko" 
                className="h-3.5 w-auto object-contain opacity-65 group-hover:opacity-100 transition-all relative -translate-y-[2px]" 
              />
            </a>

            <div className="flex items-center gap-6 text-xs text-slate-400">
              <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
              <span className="text-slate-300">•</span>
              <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
              <span className="text-slate-300">•</span>
              <a href="#" className="hover:text-primary transition-colors">Security</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

