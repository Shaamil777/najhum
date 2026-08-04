import Link from "next/link";
import { siteConfig } from "@/config/site";

export function FooterLinks() {
  return (
    <div className="w-full py-16 px-6 grid grid-cols-1 md:grid-cols-4 gap-12 max-w-7xl mx-auto">
      <div className="flex flex-col md:col-span-2">
        <h4 className="text-xl font-black uppercase tracking-widest mb-4">
          {siteConfig.shortName}
        </h4>
        <p className="text-neutral-500 text-sm max-w-sm leading-relaxed mb-6">
          {siteConfig.description}
        </p>
        <div className="flex space-x-4">
          {Object.entries(siteConfig.links).map(([name, url]) => (
            <a
              key={name}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-white transition-colors uppercase text-xs font-bold tracking-widest"
            >
              {name}
            </a>
          ))}
        </div>
      </div>
      
      <div className="flex flex-col">
        <h5 className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-6">Platforms</h5>
        <div className="flex flex-col space-y-4">
          {siteConfig.footerNav.platforms.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="text-neutral-300 hover:text-white transition-colors text-sm"
            >
              {link.title}
            </Link>
          ))}
        </div>
      </div>

      <div className="flex flex-col">
        <h5 className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-6">Company</h5>
        <div className="flex flex-col space-y-4">
          {siteConfig.footerNav.company.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="text-neutral-300 hover:text-white transition-colors text-sm"
            >
              {link.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
