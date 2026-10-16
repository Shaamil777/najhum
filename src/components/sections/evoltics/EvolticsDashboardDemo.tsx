"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize2, Minimize2 } from "lucide-react";

interface EvolticsDashboardDemoProps {
  activeIndex: number;
  onSelectIndex?: (index: number) => void;
  maxHeight?: number;
}

const DASHBOARD_FILE = "EVOLTICS.dc.html";
const DEFAULT_HEIGHT = 1750;

// Fallback section scroll targets inside EVOLTICS.dc.html (unscaled px)
const FALLBACK_OFFSETS: Record<number, number> = {
  0: 0,     // 3D EV Charging Station Twin & Fleet Overview
  1: 1250,  // Charging Telemetry & Energy Dispensed Chart
  2: 780,   // Fast Chargers & Solar Canopy Hardware
  3: 1250,  // Recent Settlements & Landlord Payouts
  4: 120    // Auto-Balancing & Station Mode Settings
};

export default function EvolticsDashboardDemo({
  activeIndex,
  onSelectIndex,
  maxHeight
}: EvolticsDashboardDemoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const fullscreenContainerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const fullscreenIframeRef = useRef<HTMLIFrameElement>(null);

  const [scale, setScale] = useState(0.5);
  const [fullscreenScale, setFullscreenScale] = useState(1);
  const [contentHeight, setContentHeight] = useState(DEFAULT_HEIGHT);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const targetUrl = `/dashboard_Demo/${DASHBOARD_FILE}`;

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Measure container and compute scaling factor to fit 1440px desktop design
  const updateScale = useCallback(() => {
    if (containerRef.current) {
      const width = containerRef.current.clientWidth;
      if (width > 0) {
        setScale(Math.min(1, width / 1440));
      }
    }
  }, []);

  const updateFullscreenScale = useCallback(() => {
    if (fullscreenContainerRef.current) {
      const width = fullscreenContainerRef.current.clientWidth;
      if (width > 0) {
        setFullscreenScale(Math.min(1.2, width / 1440));
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

  // Measure dynamic content height & capture click link traps
  const handleIframeLoaded = useCallback((frame: HTMLIFrameElement | null) => {
    setIsLoaded(true);
    if (!frame) return;

    try {
      const doc = frame.contentDocument;
      if (!doc) return;

      // Capture-phase link trapping to prevent accidental 404 navigation
      doc.addEventListener(
        "click",
        (e: MouseEvent) => {
          const link = (e.target as HTMLElement)?.closest("a");
          if (!link) return;
          const href = link.getAttribute("href");
          if (!href) return;
          if (href.startsWith("#")) {
            const el = doc.querySelector(href);
            if (el) {
              e.preventDefault();
              e.stopPropagation();
              el.scrollIntoView({ behavior: "smooth" });
            }
            return;
          }
          e.preventDefault();
          e.stopPropagation();
          if (href.startsWith("http")) {
            window.open(href, "_blank", "noopener,noreferrer");
          }
        },
        true
      );

      const measureHeight = () => {
        const wrap = doc.querySelector(".wrap") as HTMLElement | null;
        if (wrap) {
          const bottom = wrap.offsetTop + wrap.offsetHeight;
          if (bottom > 600) {
            setContentHeight(bottom + 24);
            return;
          }
        }
        if (doc.body) {
          const scrollH = doc.body.scrollHeight;
          if (scrollH > 600) {
            setContentHeight(scrollH);
          }
        }
      };

      measureHeight();
      setTimeout(measureHeight, 250);
      setTimeout(measureHeight, 800);
      setTimeout(measureHeight, 1800);

      if (typeof ResizeObserver !== "undefined" && doc.body) {
        const ro = new ResizeObserver(() => {
          measureHeight();
        });
        ro.observe(doc.body);
      }
    } catch {
      // ignore
    }
  }, []);

  // Smoothly scroll to the corresponding section when activeIndex changes
  useEffect(() => {
    if (containerRef.current && !isMobile) {
      let targetOffset = FALLBACK_OFFSETS[activeIndex] ?? 0;
      try {
        const doc = iframeRef.current?.contentDocument;
        if (doc) {
          const sections = doc.querySelectorAll(".wrap > section");
          if (activeIndex === 0) {
            targetOffset = 0;
          } else if (activeIndex === 1 && sections[4]) {
            targetOffset = Math.max(0, (sections[4] as HTMLElement).offsetTop - 20);
          } else if (activeIndex === 2 && sections[2]) {
            targetOffset = Math.max(0, (sections[2] as HTMLElement).offsetTop - 20);
          } else if (activeIndex === 3 && sections[3]) {
            targetOffset = Math.max(0, (sections[3] as HTMLElement).offsetTop - 20);
          } else if (activeIndex === 4 && sections[0]) {
            targetOffset = Math.max(0, (sections[0] as HTMLElement).offsetTop - 20);
          }
        }
      } catch {
        // fallback
      }

      containerRef.current.scrollTo({
        top: targetOffset * scale,
        behavior: "smooth"
      });
    }
  }, [activeIndex, scale, isMobile]);

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
          className="relative w-full h-full overflow-hidden bg-[#F4F5F3]"
        >
          {/* Subtle loading placeholder */}
          {!isLoaded && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-neutral-100/60 backdrop-blur-[1px]">
              <div className="w-7 h-7 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          {/* Scaled Artboard Surface */}
          <div
            style={{
              width: "100%",
              height: contentHeight * scale,
              position: "relative"
            }}
          >
            <iframe
              ref={iframeRef}
              src={targetUrl}
              title="EVOLTICS CSMP Dashboard - Interactive Station Management Platform"
              onLoad={() => handleIframeLoaded(iframeRef.current)}
              sandbox="allow-scripts allow-same-origin allow-forms"
              loading="lazy"
              className="border-0 bg-[#F4F5F3] block"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: 1440,
                height: contentHeight,
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
            className="fixed inset-0 z-[99999] bg-[#F4F5F3] flex flex-col select-none overflow-hidden"
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
              className="relative w-full h-full overflow-auto bg-[#F4F5F3] flex justify-center"
            >
              <div
                style={{
                  width: 1440 * fullscreenScale,
                  height: contentHeight * fullscreenScale,
                  position: "relative"
                }}
              >
                <iframe
                  ref={fullscreenIframeRef}
                  src={targetUrl}
                  title="EVOLTICS CSMP Dashboard Fullscreen"
                  onLoad={() => handleIframeLoaded(fullscreenIframeRef.current)}
                  sandbox="allow-scripts allow-same-origin allow-forms"
                  className="border-0 bg-[#F4F5F3] block"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: 1440,
                    height: contentHeight,
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

