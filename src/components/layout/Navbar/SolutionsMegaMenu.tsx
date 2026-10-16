"use client";

import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ArrowRight, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PublishedSolutionItem {
  title: string;
  slug: string;
  metaDescription: string | null;
}

interface SolutionMenuItem {
  title: string;
  desc: string;
  d: string;
  href: string;
}

interface TabData {
  label: string;
  hint: string;
  heading: string;
  subheading: string;
  featTitle: string;
  featDesc: string;
  featHref: string;
  items: SolutionMenuItem[];
}

const DEFAULT_SOLUTIONS: PublishedSolutionItem[] = [
  {
    title: "Facilities Management",
    slug: "facilities-management",
    metaDescription: "Connect comfort, utilities and critical assets with IoTRICs. Give facilities teams a clearer building-wide view and a practical way to prioritise attention.",
  },
  {
    title: "Hospitality & Hotels",
    slug: "hospitality",
    metaDescription: "Connected hotel operations for guest comfort, refrigeration, utilities and maintenance. Help service teams work from a shared view of the property.",
  },
  {
    title: "Cold Storage",
    slug: "cold-storage",
    metaDescription: "Connect cold-room conditions, door activity and refrigeration demand. Understand exceptions with the context needed for a focused response.",
  },
  {
    title: "Industrial & Manufacturing",
    slug: "industrial",
    metaDescription: "Connected industrial monitoring for materials, equipment and plant conditions. Give production and maintenance teams a shared view across shifts.",
  },
  {
    title: "Energy Monitoring",
    slug: "energy-monitoring",
    metaDescription: "See electricity use by site, circuit or asset. Establish a baseline, investigate operating patterns and review the effect of changes with IoTRICs.",
  },
];

const SOLUTION_ICONS: Record<string, string> = {
  "facilities-management":
    "M4 21V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v17M16 9h3a1 1 0 0 1 1 1v11M2 21h20M8 7h4M8 11h4M8 15h4",
  "hospitality":
    "M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8M2 16h20M6 10V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v4",
  "cold-storage":
    "M12 2v20M4.9 4.9l14.2 14.2M2 12h20M4.9 19.1 19.1 4.9",
  "industrial":
    "M2 20V9l6 4V9l6 4V5l8 4v11H2zM6 16h2M11 16h2M16 16h2",
  "energy-monitoring":
    "M13 2 4 14h7l-1 8 9-12h-7l1-8z",
};

const DEFAULT_ICON =
  "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10";

export function SolutionsMegaMenu({ solutions = [] }: { solutions?: PublishedSolutionItem[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"industry" | "usecase">("industry");
  const [topOffset, setTopOffset] = useState<number>(76);
  const triggerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();

  // Active list of published solutions, initialized with passed prop or known defaults
  const [liveSolutions, setLiveSolutions] = useState<PublishedSolutionItem[]>(
    solutions && solutions.length > 0 ? solutions : DEFAULT_SOLUTIONS
  );

  useEffect(() => {
    if (solutions && solutions.length > 0) {
      setLiveSolutions(solutions);
    } else {
      fetch("/api/solutions/published")
        .then((res) => {
          if (!res.ok) throw new Error("Failed to load");
          return res.json();
        })
        .then((data) => {
          if (Array.isArray(data.solutions) && data.solutions.length > 0) {
            setLiveSolutions(data.solutions);
          }
        })
        .catch(() => {});
    }
  }, [solutions]);

  // Helper to dynamically get real metaDescription from DB
  const getDbMeta = useCallback(
    (slug: string, fallback: string) => {
      const found = liveSolutions.find((s) => s.slug === slug);
      return found?.metaDescription?.trim() || fallback;
    },
    [liveSolutions]
  );

  const getDbTitle = useCallback(
    (slug: string, fallback: string) => {
      const found = liveSolutions.find((s) => s.slug === slug);
      return found?.title?.trim() || fallback;
    },
    [liveSolutions]
  );

  // 100% Real Najhum Published Solutions & Published Operational Use Cases
  const solutionsData: Record<"industry" | "usecase", TabData> = useMemo(() => {
    // Generate industry items dynamically from real published solutions
    const industryItems: SolutionMenuItem[] = liveSolutions.map((sol) => ({
      title: sol.title,
      desc: sol.metaDescription?.trim() || "Explore connected operations with real-time telemetry.",
      d: SOLUTION_ICONS[sol.slug] || DEFAULT_ICON,
      href: `/solutions/${sol.slug}`,
    }));

    // Real operational use cases linking strictly to published solutions
    const useCaseItems: SolutionMenuItem[] = [
      {
        title: "Cold Storage & Refrigeration",
        desc: getDbMeta(
          "cold-storage",
          "Continuous temperature, humidity and door-open records for compliance."
        ),
        d: SOLUTION_ICONS["cold-storage"],
        href: "/solutions/cold-storage",
      },
      {
        title: "Energy & Sub-Metering",
        desc: getDbMeta(
          "energy-monitoring",
          "Real-time electrical load profiling, power factor and peak demand alerts."
        ),
        d: SOLUTION_ICONS["energy-monitoring"],
        href: "/solutions/energy-monitoring",
      },
      {
        title: "Facility Water & HVAC Systems",
        desc: getDbMeta(
          "facilities-management",
          "AHU performance, water tank levels, pump status and energy per floor."
        ),
        d: SOLUTION_ICONS["facilities-management"],
        href: "/solutions/facilities-management",
      },
      {
        title: "Machine Condition & Vibration",
        desc: getDbMeta(
          "industrial",
          "Motor vibration, thermal thresholds, runtime hours and downtime prevention."
        ),
        d: SOLUTION_ICONS["industrial"],
        href: "/solutions/industrial",
      },
      {
        title: "Hotel & Kitchen Operations",
        desc: getDbMeta(
          "hospitality",
          "Guest room comfort, kitchens, cold rooms and back-of-house operations."
        ),
        d: SOLUTION_ICONS["hospitality"],
        href: "/solutions/hospitality",
      },
    ];

    const featuredHospitality = liveSolutions.find((s) => s.slug === "hospitality") || liveSolutions[0] || DEFAULT_SOLUTIONS[1];
    const featuredColdStorage = liveSolutions.find((s) => s.slug === "cold-storage") || liveSolutions[2] || DEFAULT_SOLUTIONS[2];

    return {
      industry: {
        label: "By industry",
        hint: "Where you operate",
        heading: "Solutions by industry",
        subheading: "Pick your sector",
        featTitle: featuredHospitality.title,
        featDesc: featuredHospitality.metaDescription || "Connected hotel operations for guest comfort, refrigeration, utilities and maintenance.",
        featHref: `/solutions/${featuredHospitality.slug}`,
        items: industryItems,
      },
      usecase: {
        label: "By use case",
        hint: "What you need to monitor",
        heading: "Solutions by use case",
        subheading: "Pick what you need to solve",
        featTitle: "Cold Storage Monitoring",
        featDesc: featuredColdStorage.metaDescription || "Connect cold-room conditions, door activity and refrigeration demand in real time.",
        featHref: `/solutions/${featuredColdStorage.slug}`,
        items: useCaseItems,
      },
    };
  }, [liveSolutions, getDbMeta]);

  const updatePosition = useCallback(() => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setTopOffset(Math.round(rect.bottom + 6));
    }
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    updatePosition();
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 180);
  };

  useEffect(() => {
    if (isOpen) {
      updatePosition();
      window.addEventListener("scroll", updatePosition, { passive: true });
      window.addEventListener("resize", updatePosition, { passive: true });
      return () => {
        window.removeEventListener("scroll", updatePosition);
        window.removeEventListener("resize", updatePosition);
      };
    }
  }, [isOpen, updatePosition]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Close when pathname changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const currentTab = solutionsData[activeTab];
  const isSolutionsActive = pathname === "/solutions" || pathname.startsWith("/solutions/");

  return (
    <div
      ref={triggerRef}
      className="relative flex items-center justify-center font-poppins"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* ── Nav Item Trigger ── */}
      <Link
        href="/solutions"
        className={cn(
          "relative z-10 inline-flex items-center gap-1.5 text-sm font-semibold tracking-wide px-4 py-2 transition-all duration-200 rounded-full cursor-pointer",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#167DE4]",
          isOpen
            ? "bg-[#EAF3FD] text-[#0F5FB0] shadow-sm"
            : isSolutionsActive
            ? "bg-primary/10 text-primary"
            : "text-inherit hover:text-primary"
        )}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span>Solutions</span>
        <svg
          aria-hidden="true"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn(
            "transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </Link>

      {/* ── Soft Dimmed Backdrop Overlay ── */}
      {isOpen && (
        <div
          className="fixed inset-0 top-[60px] bg-[#0B0F17]/35 backdrop-blur-[1px] z-40 transition-opacity duration-200 pointer-events-auto"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* ── Solutions Mega Menu (1200px width desktop layout) ── */}
      <div
        className={cn(
          "fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-200 ease-out",
          isOpen
            ? "opacity-100 translate-y-0 pointer-events-auto visible"
            : "opacity-0 -translate-y-2 pointer-events-none invisible"
        )}
        style={{ top: `${topOffset}px` }}
      >
        {/* Invisible mouse hover bridge from trigger to card */}
        <div className="absolute -top-3 inset-x-0 h-3 pointer-events-auto" />

        <div className="w-[1200px] max-w-[calc(100vw-32px)] bg-white text-[#0B0F17] rounded-[24px] shadow-[0_30px_80px_-24px_rgba(11,15,23,0.35)] border border-[#E6EAF0] flex flex-col overflow-hidden font-poppins select-none [color-scheme:light]">
          
          {/* Main Top Body */}
          <div className="flex w-full items-stretch min-h-[460px]">
            
            {/* ── Left Rail: Tabs & Browse ── */}
            <div className="flex-none w-[248px] bg-[#F7F9FC] border-r border-[#EEF1F5] p-6 pb-5 flex flex-col gap-2">
              <span className="text-[12px] font-semibold tracking-[0.12em] text-[#5B6473] px-3 pb-2 uppercase">
                BROWSE SOLUTIONS
              </span>

              {/* Tab: By Industry */}
              <button
                type="button"
                onClick={() => setActiveTab("industry")}
                onMouseEnter={() => setActiveTab("industry")}
                className={cn(
                  "flex items-center justify-between gap-2.5 w-full min-h-[60px] p-2.5 px-3 rounded-[14px] border transition-all text-left cursor-pointer",
                  activeTab === "industry"
                    ? "bg-white border-[#CFE2F8] text-[#0F5FB0] shadow-[0_6px_16px_-10px_rgba(22,125,228,0.5)]"
                    : "bg-transparent border-transparent text-[#1F2937] hover:bg-white/60"
                )}
              >
                <div className="flex flex-col gap-0.5">
                  <span className="text-[15px] font-semibold leading-tight">By industry</span>
                  <span className="text-[12px] text-[#5B6473]">Where you operate</span>
                </div>
                <span
                  className={cn(
                    "text-[12px] font-semibold min-w-[26px] h-[26px] rounded-full border flex items-center justify-center shrink-0",
                    activeTab === "industry"
                      ? "bg-[#EAF3FD] border-[#CFE2F8] text-[#0F5FB0]"
                      : "bg-white border-[#E3E8F0] text-[#1F2937]"
                  )}
                >
                  {solutionsData.industry.items.length}
                </span>
              </button>

              {/* Tab: By Use Case */}
              <button
                type="button"
                onClick={() => setActiveTab("usecase")}
                onMouseEnter={() => setActiveTab("usecase")}
                className={cn(
                  "flex items-center justify-between gap-2.5 w-full min-h-[60px] p-2.5 px-3 rounded-[14px] border transition-all text-left cursor-pointer",
                  activeTab === "usecase"
                    ? "bg-white border-[#CFE2F8] text-[#0F5FB0] shadow-[0_6px_16px_-10px_rgba(22,125,228,0.5)]"
                    : "bg-transparent border-transparent text-[#1F2937] hover:bg-white/60"
                )}
              >
                <div className="flex flex-col gap-0.5">
                  <span className="text-[15px] font-semibold leading-tight">By use case</span>
                  <span className="text-[12px] text-[#5B6473]">What you need to monitor</span>
                </div>
                <span
                  className={cn(
                    "text-[12px] font-semibold min-w-[26px] h-[26px] rounded-full border flex items-center justify-center shrink-0",
                    activeTab === "usecase"
                      ? "bg-[#EAF3FD] border-[#CFE2F8] text-[#0F5FB0]"
                      : "bg-white border-[#E3E8F0] text-[#1F2937]"
                  )}
                >
                  {solutionsData.usecase.items.length}
                </span>
              </button>

              {/* Bottom: View all solutions Link */}
              <Link
                href="/solutions"
                onClick={() => setIsOpen(false)}
                className="mt-auto flex items-center gap-2 min-h-[44px] px-3 text-[14px] font-semibold text-[#167DE4] hover:text-[#0F5FB0] transition-colors group/all"
              >
                <span>View all solutions</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover/all:translate-x-1" />
              </Link>
            </div>

            {/* ── Center: 2-Column Items Grid ── */}
            <div className="flex-1 min-w-0 p-6 flex flex-col gap-3.5">
              <div className="flex items-baseline justify-between px-2">
                <span className="text-[18px] font-bold text-[#0B0F17]">
                  {currentTab.heading}
                </span>
                <span className="text-[13px] text-[#5B6473]">
                  {currentTab.subheading}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-1">
                {currentTab.items.map((item, idx) => (
                  <Link
                    key={idx}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="group/item flex items-center gap-3.5 p-3 rounded-[14px] text-[#0B0F17] hover:bg-[#F5F8FC] transition-all duration-150 cursor-pointer"
                  >
                    {/* SVG Icon with blue background that turns filled blue on hover */}
                    <span className="flex-none w-11 h-11 rounded-[12px] bg-[#EAF3FD] text-[#167DE4] group-hover/item:bg-[#167DE4] group-hover/item:text-white flex items-center justify-center transition-colors duration-200">
                      <svg
                        aria-hidden="true"
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d={item.d} />
                      </svg>
                    </span>

                    {/* Text Details */}
                    <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                      <span className="text-[15px] font-semibold leading-[1.3] text-[#0B0F17] group-hover/item:text-[#0F5FB0] transition-colors">
                        {item.title}
                      </span>
                      <span className="text-[13px] leading-[1.45] text-[#5B6473] line-clamp-1">
                        {item.desc}
                      </span>
                    </div>

                    {/* Animated Arrow on Hover */}
                    <ArrowRight className="flex-none w-4 h-4 text-[#167DE4] opacity-0 -translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-150" />
                  </Link>
                ))}
              </div>
            </div>

            {/* ── Right: Featured Card ── */}
            <div className="flex-none w-[272px] p-6 pl-0 flex">
              <div className="flex-1 relative overflow-hidden rounded-[18px] bg-[#0B1B33] text-white p-5 flex flex-col gap-3 shadow-md">
                {/* Decorative Glowing Ring */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-[60px] -top-[60px] w-[180px] h-[180px] rounded-full border-[28px] border-[#167DE4]/30"
                />

                {/* FEATURED Badge */}
                <span className="relative self-start text-[11px] font-bold tracking-[0.1em] bg-white/12 px-2.5 py-1 rounded-full uppercase text-white/90">
                  FEATURED
                </span>

                {/* Bottom Content */}
                <div className="relative mt-auto flex flex-col gap-2">
                  <span className="text-[20px] font-bold leading-[1.25] text-white">
                    {currentTab.featTitle}
                  </span>
                  <span className="text-[13px] leading-[1.55] text-[#C3CEDD]">
                    {currentTab.featDesc}
                  </span>
                  <Link
                    href={currentTab.featHref}
                    onClick={() => setIsOpen(false)}
                    className="inline-flex items-center gap-2 min-h-[44px] text-[14px] font-semibold text-white hover:text-blue-300 transition-colors pt-1 group/feat"
                  >
                    <span>Explore</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/feat:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>

          </div>

          {/* ── Footer Strip ── */}
          <div className="flex items-center justify-between gap-4 py-3.5 px-6 sm:px-7 border-t border-[#EEF1F5] bg-white">
            <span className="flex items-center gap-2.5 text-[14px] text-[#4B5563]">
              <HelpCircle className="w-[18px] h-[18px] text-[#167DE4] stroke-[2] shrink-0" />
              <span>Not sure which solution fits? Our engineers will map it to your site.</span>
            </span>
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="inline-flex items-center justify-center min-h-[42px] px-5 rounded-full bg-[#167DE4] hover:bg-[#0F5FB0] text-white text-[14px] font-semibold transition-colors shadow-sm shrink-0"
            >
              Plan your solution
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
