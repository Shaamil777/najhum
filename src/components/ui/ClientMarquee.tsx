"use client";

import React from "react";

export interface ClientLogo {
  name: string;
  src: string;
  className?: string;
  filterClass?: string;
  lightFilterClass?: string;
}

export const DEFAULT_CLIENT_LOGOS: ClientLogo[] = [
  {
    name: "Nokia",
    src: "/logo/client%20logos/nokia-com-wordmark.png",
    className: "max-h-6 max-w-[115px]",
  },
  {
    name: "e&",
    src: "/logo/client%20logos/eand.webp",
    className: "max-h-8 max-w-[110px]",
  },
  {
    name: "Space42",
    src: "/logo/client%20logos/space42.png",
    className: "max-h-7 max-w-[130px]",
  },
  {
    name: "Thuraya",
    src: "/logo/client%20logos/Thuraya_logo.png",
    className: "max-h-8 max-w-[125px]",
  },
  {
    name: "ADAA",
    src: "/logo/client%20logos/adaa_gov.png",
    className: "max-h-8 max-w-[130px]",
    filterClass: "transition-opacity invert hue-rotate-180 opacity-80 group-hover/logo:opacity-100 drop-shadow-[0_0_6px_rgba(255,255,255,0.2)]",
  },
  {
    name: "Al Rostamani Group",
    src: "/logo/client%20logos/alrostamaniagroup.svg",
    className: "max-h-8 max-w-[130px]",
  },
  {
    name: "UAEAA",
    src: "/logo/client%20logos/uaeaa_gov.png",
    className: "max-h-8 max-w-[120px]",
  },
  {
    name: "du",
    src: "/logo/client%20logos/du.png",
    className: "max-h-9 max-w-[100px]",
  },
  {
    name: "Yahsat",
    src: "/logo/client%20logos/idsuguLgbe.png",
    className: "max-h-5 max-w-[125px]",
  },
  {
    name: "Al Mulla Group",
    src: "/logo/client%20logos/almulagroup.svg",
    className: "max-h-8 max-w-[130px]",
  },
  {
    name: "Radiant Square",
    src: "/logo/client%20logos/radiantsquaregroup.webp",
    className: "max-h-8 max-w-[130px]",
  },
  {
    name: "Dubai Taxi",
    src: "/logo/client%20logos/dubaitaxi.png",
    className: "max-h-8 max-w-[120px]",
  },
  {
    name: "Aramtec",
    src: "/logo/client%20logos/aramtec.png",
    className: "max-h-10 max-w-[95px]",
  },
  {
    name: "The Deep Seafood Company",
    src: "/logo/client%20logos/thedeepseofood.png",
    className: "max-h-9 max-w-[110px]",
  },
];

export interface ClientMarqueeProps {
  title?: string;
  logos?: ClientLogo[];
  speed?: number; // Duration in seconds for one full loop cycle
  theme?: "dark" | "light";
  pauseOnHover?: boolean;
  className?: string;
  showFadeMask?: boolean;
}

export default function ClientMarquee({
  title,
  logos = DEFAULT_CLIENT_LOGOS,
  speed = 35,
  theme = "dark",
  pauseOnHover = true,
  className = "",
  showFadeMask = true,
}: ClientMarqueeProps) {
  // Ensure we have enough items in a track for wide displays
  const trackItems = logos.length < 8 ? [...logos, ...logos] : logos;

  const isDark = theme === "dark";

  return (
    <div className={`relative w-full overflow-hidden select-none group/marquee ${className}`}>
      {/* Title */}
      {title && (
        <p
          className={`text-[11px] sm:text-xs font-bold uppercase tracking-widest text-center drop-shadow-sm mb-2.5 w-full ${
            isDark ? "text-white/90" : "text-neutral-500"
          }`}
        >
          {title}
        </p>
      )}

      {/* Gradient Fade Masks */}
      {showFadeMask && (
        <>
          <div
            className={`pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-28 z-10 ${
              isDark
                ? "bg-gradient-to-r from-black/80 via-black/40 to-transparent"
                : "bg-gradient-to-r from-white via-white/70 to-transparent"
            }`}
          />
          <div
            className={`pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-28 z-10 ${
              isDark
                ? "bg-gradient-to-l from-black/80 via-black/40 to-transparent"
                : "bg-gradient-to-l from-white via-white/70 to-transparent"
            }`}
          />
        </>
      )}

      {/* Inline styles for guaranteed CSS animation and responsiveness */}
      <style>{`
        @keyframes clientMarqueeScroll {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }
        .client-marquee-track {
          transform: translate3d(0, 0, 0);
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
      `}</style>

      {/* Marquee Motion Wrapper */}
      <div
        className={`flex shrink-0 will-change-transform client-marquee-track ${
          pauseOnHover ? "group-hover/marquee:[animation-play-state:paused]" : ""
        }`}
        style={{
          width: "max-content",
          animation: `clientMarqueeScroll ${speed}s linear infinite`,
        }}
      >
        {/* Track 1 */}
        <div className="flex shrink-0 items-center gap-6 sm:gap-10 pr-6 sm:pr-10">
          {trackItems.map((logo, idx) => (
            <div
              key={`track1-${idx}`}
              className="group/logo flex h-14 sm:h-16 w-36 sm:w-44 shrink-0 items-center justify-center px-3 cursor-pointer"
            >
              <img
                src={logo.src}
                alt={logo.name}
                loading="eager"
                decoding="async"
                draggable={false}
                className={`w-auto object-contain pointer-events-none select-none duration-300 ${
                  isDark
                    ? (logo.filterClass ?? "transition-opacity brightness-0 invert opacity-70 group-hover/logo:opacity-100 drop-shadow-[0_0_8px_rgba(255,255,255,0.35)]")
                    : (logo.lightFilterClass ?? "transition-[opacity,filter] grayscale opacity-60 group-hover/logo:grayscale-0 group-hover/logo:opacity-100")
                } ${logo.className || "max-h-8 max-w-[125px]"}`}
              />
            </div>
          ))}
        </div>

        {/* Track 2 - Exact Clone for 100% seamless, mathematically verified infinite loop */}
        <div
          className="flex shrink-0 items-center gap-6 sm:gap-10 pr-6 sm:pr-10"
          aria-hidden="true"
        >
          {trackItems.map((logo, idx) => (
            <div
              key={`track2-${idx}`}
              className="group/logo flex h-14 sm:h-16 w-36 sm:w-44 shrink-0 items-center justify-center px-3 cursor-pointer"
            >
              <img
                src={logo.src}
                alt={logo.name}
                loading="eager"
                decoding="async"
                draggable={false}
                className={`w-auto object-contain pointer-events-none select-none duration-300 ${
                  isDark
                    ? (logo.filterClass ?? "transition-opacity brightness-0 invert opacity-70 group-hover/logo:opacity-100 drop-shadow-[0_0_8px_rgba(255,255,255,0.35)]")
                    : (logo.lightFilterClass ?? "transition-[opacity,filter] grayscale opacity-60 group-hover/logo:grayscale-0 group-hover/logo:opacity-100")
                } ${logo.className || "max-h-8 max-w-[125px]"}`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
