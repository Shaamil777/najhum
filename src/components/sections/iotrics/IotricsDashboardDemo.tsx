"use client";

import React, { useState, useRef, useEffect, useCallback, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize2, Minimize2 } from "lucide-react";
import { useHydrated } from "@/lib/utils/use-hydrated";

function subscribeToViewport(onChange: () => void) {
  window.addEventListener("resize", onChange);
  return () => window.removeEventListener("resize", onChange);
}
const readIsMobile = () => window.innerWidth < 1024;
const serverIsMobile = () => false;

export interface ModulePageConfig {
  index: number;
  id: string;
  title: string;
  file: string;
  height: number;
}

export const MODULE_PAGES: ModulePageConfig[] = [
  {
    index: 0,
    id: "monitoring",
    title: "Demo · Building Digital Twin",
    file: "DTC-Building.dc.html",
    height: 1100
  },
  {
    index: 1,
    id: "alerts",
    title: "Demo · Alarms & Incident Management",
    file: "DTC-Alarms.dc.html",
    height: 1000
  },
  {
    index: 2,
    id: "visibility",
    title: "Demo · Device & Sensor Fleet",
    file: "DTC-Devices.dc.html",
    height: 1900
  },
  {
    index: 3,
    id: "energy",
    title: "Demo · Energy & Environmental Controls",
    file: "DTC-Energy.dc.html",
    height: 2300
  },
  {
    index: 4,
    id: "tracking",
    title: "Demo · All Sites & Multi-Campus Operations",
    file: "DTC-Sites.dc.html",
    height: 950
  },
  {
    index: 5,
    id: "analytics",
    title: "Demo · Operational Insights & Reporting",
    file: "DTC-Insights.dc.html",
    height: 2000
  }
];

interface IotricsDashboardDemoProps {
  activeIndex: number;
  onSelectIndex?: (index: number) => void;
  maxHeight?: number;
}

export default function IotricsDashboardDemo({
  activeIndex,
  onSelectIndex,
  maxHeight
}: IotricsDashboardDemoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const fullscreenContainerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const fullscreenIframeRef = useRef<HTMLIFrameElement>(null);

  const [scale, setScale] = useState(0.5);
  const [inlineHeight, setInlineHeight] = useState(1100);
  const [fullscreenScale, setFullscreenScale] = useState(1);
  const [fullscreenHeight, setFullscreenHeight] = useState(1100);
  const [isLoading, setIsLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const mounted = useHydrated();

  const currentConfig = MODULE_PAGES[activeIndex] || MODULE_PAGES[0];
  const targetUrl = `/dashboard_Demo/${currentConfig.file}`;

  const isMobile = useSyncExternalStore(subscribeToViewport, readIsMobile, serverIsMobile);

  // Compute scaling factor for inline container
  const updateScale = useCallback(() => {
    if (containerRef.current) {
      const width = containerRef.current.clientWidth;
      if (width > 0) {
        const nextScale = Math.min(1, width / 1440);
        setScale(nextScale);
        // Match the iframe viewport to the available panel, not a page-height estimate.
        setInlineHeight(Math.max(1, containerRef.current.clientHeight / nextScale));
      }
    }
  }, []);

  // Compute scaling factor for fullscreen container
  const updateFullscreenScale = useCallback(() => {
    if (fullscreenContainerRef.current) {
      const width = fullscreenContainerRef.current.clientWidth;
      if (width > 0) {
        const nextScale = Math.min(1.2, width / 1440);
        setFullscreenScale(nextScale);
        setFullscreenHeight(Math.max(1, fullscreenContainerRef.current.clientHeight / nextScale));
      }
    }
  }, []);

  useEffect(() => {
    updateScale();
    const ro = new ResizeObserver(updateScale);
    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener("resize", updateScale);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", updateScale);
    };
  }, [updateScale]);

  useEffect(() => {
    if (isFullscreen) {
      updateFullscreenScale();
      const ro = new ResizeObserver(updateFullscreenScale);
      if (fullscreenContainerRef.current) ro.observe(fullscreenContainerRef.current);
      window.addEventListener("resize", updateFullscreenScale);
      return () => {
        ro.disconnect();
        window.removeEventListener("resize", updateFullscreenScale);
      };
    }
  }, [isFullscreen, updateFullscreenScale]);

  // Handle ESC key to exit fullscreen
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    if (isFullscreen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isFullscreen]);

  // CAPTURE-PHASE link trapping & navigation containment engine
  const attachLinkInterceptor = (frame: HTMLIFrameElement | null) => {
    setIsLoading(false);
    if (!frame) return;

    try {
      const doc = frame.contentDocument;
      if (!doc) return;

      // Defensive CSS inside iframe
      const style = doc.createElement("style");
      style.textContent = `
        /* Prevent selection flickering during 3D camera pan */
        body { -webkit-user-select: none; user-select: none; }
        /* Smooth scrolling */
        html { scroll-behavior: smooth; }
        /* Fill the actual embedded viewport; longer modules scroll inside the iframe. */
        .wrap { min-height: 100vh; box-sizing: border-box; }
        /* The building plan is the flexible content, rather than empty canvas below it. */
        .wrap:has(.fp-vp) { padding-bottom: 22px !important; }
        .wrap:has(.fp-vp) > header,
        .wrap:has(.fp-vp) > nav,
        .wrap:has(.fp-vp) > section:first-of-type { flex: none; }
        .wrap:has(.fp-vp) > section:last-of-type { flex: 1 0 auto; align-items: stretch !important; }
        .wrap:has(.fp-vp) > section:last-of-type > aside { align-self: flex-start; }
        .wrap .tile:has(.fp-vp) { min-height: 100%; }
        .wrap .fp-vp { flex: 1 0 580px; height: auto !important; min-height: 580px; }
        @media (max-width: 760px) {
          .wrap .fp-vp { flex-basis: 400px; min-height: 400px; }
        }
      `;
      doc.head?.appendChild(style);

      // Deep capture-phase click listener
      const handleDocClick = (e: MouseEvent) => {
        const link = (e.target as HTMLElement)?.closest("a");
        if (!link) return;

        const href = link.getAttribute("href");
        if (!href) return;

        // In-page anchor link
        if (href.startsWith("#")) {
          const targetEl = doc.querySelector(href);
          if (targetEl) {
            e.preventDefault();
            e.stopPropagation();
            targetEl.scrollIntoView({ behavior: "smooth" });
          }
          return;
        }

        // Intercept and prevent ANY native navigation to prevent 404 & localhost loops
        e.preventDefault();
        e.stopPropagation();

        // External URLs open safely in new window
        if (href.startsWith("http://") || href.startsWith("https://")) {
          window.open(href, "_blank", "noopener,noreferrer");
          return;
        }

        // Clean target filename
        const rawFileName = href.split("/").pop()?.split("?")[0]?.split("#")[0] || "";

        // Route aliases
        let resolvedFileName = rawFileName;
        if (rawFileName === "DTC.dc.html" || rawFileName === "DTC") {
          resolvedFileName = "DTC-Building.dc.html";
        } else if (rawFileName === "DTC-Scan.dc.html") {
          resolvedFileName = "DTC-Shift.dc.html";
        } else if (rawFileName === "DTC-Room.dc.html") {
          resolvedFileName = "DTC-Building.dc.html";
        } else if (rawFileName === "DTC-Systems.dc.html") {
          resolvedFileName = "DTC-Devices.dc.html";
        } else if (rawFileName === "DTC-Automations.dc.html") {
          resolvedFileName = "DTC-Insights.dc.html";
        }

        const targetIndex = MODULE_PAGES.findIndex((p) => p.file === resolvedFileName);
        if (targetIndex !== -1) {
          onSelectIndex?.(targetIndex);
        }
      };

      // Register with useCapture = true to intercept before default browser navigation
      doc.addEventListener("click", handleDocClick, true);
    } catch {
      // Catch any cross-origin restrictions gracefully
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-neutral-50 rounded-2xl border border-neutral-200/80 shadow-2xl overflow-hidden relative w-full flex flex-col group aspect-[4/3] lg:aspect-auto"
        style={{
          height: maxHeight && !isMobile ? `${maxHeight}px` : undefined,
          maxHeight: maxHeight && !isMobile ? `${maxHeight}px` : undefined
        }}
      >
        {/* Floating Fullscreen Button */}
        <button
          type="button"
          onClick={() => setIsFullscreen(true)}
          className="absolute top-3.5 right-3.5 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 hover:bg-white text-neutral-800 text-xs font-semibold shadow-md shadow-neutral-900/5 border border-neutral-200/80 backdrop-blur-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
          title="Expand Fullscreen Demo"
          aria-label="Expand Fullscreen"
        >
          <Maximize2 className="w-3.5 h-3.5 text-neutral-600" />
          <span className="hidden sm:inline">Fullscreen</span>
        </button>

        {/* Scaled Viewport Container - 16:9 on mobile, full height on desktop, no scrollbars on mobile */}
        <div
          ref={containerRef}
          className="relative w-full h-full min-h-0 flex-1 overflow-hidden bg-[#F4F4F7]"
        >
          {/* Subtle loading placeholder */}
          {isLoading && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-neutral-100/60 backdrop-blur-[1px]">
              <div className="w-7 h-7 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          {/* Scaled Artboard Surface */}
          <div
            style={{
              width: "100%",
              height: isMobile ? currentConfig.height * scale : "100%",
              position: "relative"
            }}
          >
            <iframe
              key={`inline-${currentConfig.file}`}
              ref={iframeRef}
              src={targetUrl}
              title={`IoTRICs Dashboard - ${currentConfig.title}`}
              onLoad={() => attachLinkInterceptor(iframeRef.current)}
              sandbox="allow-scripts allow-same-origin allow-forms"
              loading="lazy"
              className="border-0 bg-[#F4F4F7] block"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: 1440,
                height: isMobile ? currentConfig.height : inlineHeight,
                transform: `scale(${scale})`,
                transformOrigin: "top left",
                pointerEvents: isMobile ? "none" : "auto"
              }}
            />
          </div>
        </div>
      </motion.div>

      {/* ═══ FULLSCREEN EXPANDED VIEW (PORTAL) ═══ */}
      {mounted && isFullscreen && createPortal(
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99999] bg-[#F4F4F7] flex flex-col select-none overflow-hidden"
          >
            {/* Floating Close Button */}
            <button
              type="button"
              onClick={() => setIsFullscreen(false)}
              className="absolute top-4 right-4 z-50 flex items-center gap-1.5 px-3 py-2 rounded-full bg-neutral-900/80 hover:bg-neutral-900 text-white text-xs font-semibold shadow-xl backdrop-blur-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
              aria-label="Exit Fullscreen"
            >
              <Minimize2 className="w-4 h-4" />
              <span>Exit (ESC)</span>
            </button>

            {/* Fullscreen Viewport Area */}
            <div
              ref={fullscreenContainerRef}
              className="relative w-full h-full min-h-0 overflow-hidden bg-[#F4F4F7] flex justify-center"
            >
              <div
                style={{
                  width: 1440 * fullscreenScale,
                  height: "100%",
                  position: "relative"
                }}
              >
                <iframe
                  key={`fs-${currentConfig.file}`}
                  ref={fullscreenIframeRef}
                  src={targetUrl}
                  title={`IoTRICs Dashboard Fullscreen - ${currentConfig.title}`}
                  onLoad={() => attachLinkInterceptor(fullscreenIframeRef.current)}
                  sandbox="allow-scripts allow-same-origin allow-forms"
                  className="border-0 bg-[#F4F4F7] block"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: 1440,
                    height: fullscreenHeight,
                    transform: `scale(${fullscreenScale})`,
                    transformOrigin: "top left",
                    pointerEvents: "auto"
                  }}
                />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}


