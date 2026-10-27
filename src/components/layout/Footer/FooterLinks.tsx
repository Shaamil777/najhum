import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";

const getSocialIcon = (name: string) => {
  const className = "w-4 h-4";
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

const platforms = [
  {
    title: "IoTRICs",
    subtitle: "Industrial IoT & Telemetry",
    href: "/platforms/iotrics",
  },
  {
    title: "EVOLTICS",
    subtitle: "EV Charging Infrastructure & CSMP",
    href: "/platforms/evoltics",
  },
  {
    title: "cropifAI",
    subtitle: "Precision AgriTech & Climate AI",
    href: "/platforms/cropifai",
  },
];

const solutions = [
  { title: "Facilities Management", href: "/solutions/facilities-management" },
  { title: "Hospitality & Hotels", href: "/solutions/hospitality" },
  { title: "Cold Storage", href: "/solutions/cold-storage" },
  { title: "Industrial & Manufacturing", href: "/solutions/industrial" },
  { title: "Energy Monitoring", href: "/solutions/energy-monitoring" },
];

const companyLinks = [
  { title: "About Us", href: "/about" },
  { title: "Products", href: "/products" },
  { title: "Journal", href: "/blogs" },
  { title: "Contact Us", href: "/contact" },
];

export function FooterLinks() {
  return (
    <div className="w-full py-16 lg:py-20 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto relative z-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 xl:gap-12">
        
        {/* Column 1: Brand & Contact (4 cols on lg, full width on sm) */}
        <div className="sm:col-span-2 lg:col-span-4 flex flex-col">
          {/* Logo properly displayed with its authentic colors */}
          <Link
            href="/"
            className="inline-block w-fit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg transition-transform duration-200 hover:opacity-95"
            aria-label={siteConfig.name}
          >
            <Image
              src="/logo/logo.png"
              alt={siteConfig.name}
              width={180}
              height={50}
              className="h-10 sm:h-11 w-auto object-contain"
            />
          </Link>

          <p className="text-slate-500 text-sm leading-relaxed mt-4 mb-6 max-w-md">
            {siteConfig.description}. Engineering mission-critical infrastructure, IoT telemetry, EV mobility networks, and smart agricultural AI.
          </p>

          {/* Direct Contact List */}
          <div className="flex flex-col space-y-3 mb-6">
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="group flex items-center gap-3 text-xs sm:text-sm text-slate-600 hover:text-primary transition-colors w-fit"
            >
              <span className="w-8 h-8 rounded-lg bg-blue-50/80 border border-blue-100 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-200 shrink-0">
                <Mail className="w-4 h-4" />
              </span>
              <span className="truncate">{siteConfig.contact.email}</span>
            </a>

            {/* Phone Numbers */}
            <div className="flex flex-col space-y-2">
              <a
                href="tel:+971556177234"
                className="group flex items-center gap-3 text-xs sm:text-sm text-slate-600 hover:text-primary transition-colors w-fit"
              >
                <span className="w-8 h-8 rounded-lg bg-blue-50/80 border border-blue-100 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-200 shrink-0">
                  <Phone className="w-4 h-4" />
                </span>
                <span>+971 55 617 7234</span>
              </a>

              <a
                href="tel:+971525699979"
                className="group flex items-center gap-3 text-xs sm:text-sm text-slate-600 hover:text-primary transition-colors w-fit"
              >
                <span className="w-8 h-8 rounded-lg bg-blue-50/80 border border-blue-100 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-200 shrink-0">
                  <Phone className="w-4 h-4" />
                </span>
                <span>+971 52 569 9979</span>
              </a>
            </div>

            <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-500 max-w-sm">
              <span className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 shrink-0 mt-0.5">
                <MapPin className="w-4 h-4" />
              </span>
              <span className="leading-snug">
                {siteConfig.contact.address.location}, {siteConfig.contact.address.district}, {siteConfig.contact.address.city}, UAE
              </span>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-2.5 pt-1">
            {Object.entries(siteConfig.links).map(([name, url]) => (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={name}
                className="w-9 h-9 flex items-center justify-center rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-primary hover:border-primary hover:text-white transition-all duration-200 shadow-2xs hover:shadow-sm hover:-translate-y-0.5"
              >
                {getSocialIcon(name)}
              </a>
            ))}
          </div>
        </div>

        {/* Column 2: Platform Solutions (3 cols on lg) */}
        <div className="sm:col-span-1 lg:col-span-3 flex flex-col">
          <div className="flex items-center gap-2 mb-5">
            <span className="w-1.5 h-3 rounded-full bg-primary" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Enterprise Platforms
            </h3>
          </div>

          <div className="flex flex-col space-y-2">
            {platforms.map((platform) => (
              <Link
                key={platform.title}
                href={platform.href}
                className="group flex flex-col p-3 rounded-xl border border-transparent hover:border-blue-100 hover:bg-blue-50/40 transition-all duration-200"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-slate-800 group-hover:text-primary transition-colors">
                    {platform.title}
                  </span>
                  <ArrowRight className="w-4 h-4 text-primary opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                </div>
                <span className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                  {platform.subtitle}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Column 3: Connected Solutions (3 cols on lg) */}
        <div className="sm:col-span-1 lg:col-span-3 flex flex-col">
          <div className="flex items-center gap-2 mb-5">
            <span className="w-1.5 h-3 rounded-full bg-primary" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Solutions
            </h3>
          </div>

          <div className="flex flex-col space-y-2.5">
            {solutions.map((sol) => (
              <Link
                key={sol.title}
                href={sol.href}
                className="group flex items-center justify-between text-sm text-slate-600 hover:text-primary transition-colors font-medium py-1"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-primary transition-colors shrink-0" />
                  <span className="truncate group-hover:translate-x-0.5 transition-transform duration-200">
                    {sol.title}
                  </span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-primary opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 shrink-0 ml-1" />
              </Link>
            ))}
            <Link
              href="/solutions"
              className="group inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary-hover transition-colors pt-2 w-fit"
            >
              <span>View all solutions</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Column 4: Company Navigation (2 cols on lg) */}
        <div className="sm:col-span-2 lg:col-span-2 flex flex-col">
          <div className="flex items-center gap-2 mb-5">
            <span className="w-1.5 h-3 rounded-full bg-slate-300" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Company
            </h3>
          </div>

          <div className="flex flex-col space-y-3">
            {companyLinks.map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="group flex items-center gap-2 text-sm text-slate-600 hover:text-primary transition-colors font-medium py-1"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-primary transition-colors shrink-0" />
                <span className="group-hover:translate-x-0.5 transition-transform duration-200">
                  {link.title}
                </span>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
