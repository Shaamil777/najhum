import { FooterLinks } from "./FooterLinks";

export default function Footer() {
  return (
    <footer className="w-full bg-white text-zinc-900 flex flex-col font-poppins relative overflow-hidden border-t border-zinc-200 mt-24">
      {/* Background ambient grids matching the rest of the site's light mode */}
      <div className="absolute top-0 left-10 w-96 h-96 bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] bg-[size:32px_32px] opacity-[0.15] z-0 pointer-events-none [mask-image:radial-gradient(circle,white,transparent_70%)]" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-[linear-gradient(to_right,#60a5fa_1px,transparent_1px),linear-gradient(to_bottom,#60a5fa_1px,transparent_1px)] bg-[size:32px_32px] opacity-[0.08] z-0 pointer-events-none [mask-image:radial-gradient(circle,white,transparent_70%)]" />
      
      {/* 
        We apply the scale down effect natively on the inner wrapper rather than the footer itself 
        so the background spans the full width beautifully.
      */}
      <div className="relative z-10 w-full flex flex-col">
        <FooterLinks />
        
        {/* Copyright Bar */}
        <div className="w-full py-8 text-center text-sm font-medium text-zinc-400 border-t border-zinc-100 max-w-[1400px] mx-auto px-6 lg:px-12 mt-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 lg:scale-[0.85] xl:scale-[0.9] 2xl:scale-100 lg:origin-center transition-transform duration-300">
            <span>&copy; {new Date().getFullYear()} Najhum Technologies. All rights reserved.</span>
            <div className="flex gap-8 text-[0.85rem] font-semibold tracking-wide uppercase text-zinc-400">
              <a href="#" className="hover:text-primary transition-colors">Privacy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms</a>
              <a href="#" className="hover:text-primary transition-colors">Legal</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
