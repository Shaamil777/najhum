import Link from "next/link";
import { siteConfig } from "@/config/site";
import { ArrowRight } from "lucide-react";

export function FooterLinks() {
  return (
    <div className="w-full py-24 px-6 lg:px-12 grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-16 lg:gap-24 max-w-[1400px] mx-auto relative z-10 lg:scale-[0.85] xl:scale-[0.9] 2xl:scale-100 lg:origin-bottom transition-transform duration-300">
      
      {/* Brand Column */}
      <div className="flex flex-col">
        <h4 className="text-4xl sm:text-5xl font-bold tracking-tighter mb-6 text-zinc-900 normal-case">
          {siteConfig.shortName}<span className="text-primary">.</span>
        </h4>
        <p className="text-zinc-500 text-lg max-w-md leading-relaxed mb-10">
          {siteConfig.description}
        </p>
        
        {/* Social / External Links */}
        <div className="flex flex-wrap gap-4">
          {Object.entries(siteConfig.links).map(([name, url]) => (
            <a
              key={name}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-zinc-50 hover:bg-primary border border-zinc-100 hover:border-primary text-zinc-600 hover:text-white rounded-full transition-all duration-300 text-sm font-bold tracking-widest uppercase shadow-sm hover:shadow-md"
            >
              {name}
            </a>
          ))}
        </div>
      </div>
      
      {/* Platforms Column */}
      <div className="flex flex-col">
        <span className="text-xs font-bold tracking-widest text-primary uppercase mb-8 flex items-center gap-4 before:h-px before:w-8 before:bg-blue-200">
          Platforms
        </span>
        <div className="flex flex-col space-y-4">
          {siteConfig.footerNav.platforms.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="group flex items-center text-zinc-500 hover:text-zinc-900 transition-colors text-[0.95rem] font-medium w-fit"
            >
              <span className="w-0 overflow-hidden opacity-0 group-hover:w-5 group-hover:opacity-100 transition-all duration-300 flex items-center text-primary">
                <ArrowRight className="w-4 h-4" />
              </span>
              <span className="group-hover:translate-x-1 transition-transform duration-300">{link.title}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Company Column */}
      <div className="flex flex-col">
        <span className="text-xs font-bold tracking-widest text-primary uppercase mb-8 flex items-center gap-4 before:h-px before:w-8 before:bg-blue-200">
          Company
        </span>
        <div className="flex flex-col space-y-4">
          {siteConfig.footerNav.company.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="group flex items-center text-zinc-500 hover:text-zinc-900 transition-colors text-[0.95rem] font-medium w-fit"
            >
              <span className="w-0 overflow-hidden opacity-0 group-hover:w-5 group-hover:opacity-100 transition-all duration-300 flex items-center text-primary">
                <ArrowRight className="w-4 h-4" />
              </span>
              <span className="group-hover:translate-x-1 transition-transform duration-300">{link.title}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
