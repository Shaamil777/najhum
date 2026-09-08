import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { ArrowRight } from "lucide-react";

const getSocialIcon = (name: string) => {
  const className = "w-5 h-5";
  switch (name.toLowerCase()) {
    case "linkedin": 
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
          <rect x="2" y="9" width="4" height="12"></rect>
          <circle cx="4" cy="4" r="2"></circle>
        </svg>
      );
    case "facebook": 
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
        </svg>
      );
    case "instagram": 
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
      );
    default: 
      return null;
  }
};

export function FooterLinks() {
  return (
    <div className="w-full py-24 px-6 lg:px-12 grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-16 lg:gap-24 max-w-[1400px] mx-auto relative z-10 lg:scale-[0.85] xl:scale-[0.9] 2xl:scale-100 lg:origin-bottom transition-transform duration-300">
      
      {/* Brand Column */}
      <div className="flex flex-col">
        <Link href="/" className="mb-8 block w-fit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm">
          <Image
            src="/logo/logo.png"
            alt={siteConfig.name}
            width={160}
            height={53}
            className="h-10 sm:h-12 w-auto object-contain brightness-0"
          />
        </Link>
        <p className="text-zinc-500 text-lg max-w-md leading-relaxed mb-10">
          {siteConfig.description}
        </p>
        
        {/* Social / External Links */}
        <div className="flex flex-wrap gap-3">
          {Object.entries(siteConfig.links).map(([name, url]) => (
            <a
              key={name}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={name}
              className="w-12 h-12 flex items-center justify-center bg-zinc-50 hover:bg-primary border border-zinc-200 hover:border-primary text-zinc-600 hover:text-white rounded-full transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-1"
            >
              {getSocialIcon(name)}
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
