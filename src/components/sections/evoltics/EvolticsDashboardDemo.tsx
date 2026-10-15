"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

interface EvolticsDashboardDemoProps {
  activeIndex: number;
  onSelectIndex?: (index: number) => void;
  maxHeight?: number;
}

const DASHBOARD_FILE = "Evoltics.dc.html";
const DEFAULT_HEIGHT = 1750;

// Fallback section scroll targets inside Evoltics.dc.html (unscaled px)
const FALLBACK_OFFSETS: Record<number, number> = {
  0: 0,     // 3D EV Charging Station Twin & Fleet Overview
  1: 1250,  // Charging Telemetry & Energy Dispensed Chart
  2: 780,   // Fast Chargers & Solar Canopy Hardware
  3: 1250,  // Recent Settlements & Landlord Payouts
  4: 120    // Auto-Balancing & Station Mode Settings
};

export default function EvolticsDashboardDemo({
  activeIndex,
  maxHeight
}: EvolticsDashboardDemoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const [scale, setScale] = useState(0.5);
  const [contentHeight, setContentHeight] = useState(DEFAULT_HEIGHT);
  const [isLoaded, setIsLoaded] = useState(false);

  const targetUrl = `/dashboard_Demo/${DASHBOARD_FILE}`;

  // Measure container and compute scaling factor to fit 1440px desktop design
  const updateScale = useCallback(() => {
    if (containerRef.current) {
      const width = containerRef.current.clientWidth;
      if (width > 0) {
        setScale(Math.min(1, width / 1440));
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

  // Measure dynamic content height of Modern.dc.html to eliminate empty space at the end
  const handleIframeLoaded = useCallback((frame: HTMLIFrameElement | null) => {
    setIsLoaded(true);
    if (!frame) return;

    try {
      const doc = frame.contentDocument;
      if (!doc) return;

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
    if (containerRef.current) {
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
  }, [activeIndex, scale]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-neutral-50 rounded-2xl border border-neutral-200/80 shadow-2xl overflow-hidden relative w-full flex flex-col group"
      style={{
        height: maxHeight ? `${maxHeight}px` : undefined,
        maxHeight: maxHeight ? `${maxHeight}px` : undefined
      }}
    >
      {/* Scaled Interactive Viewport Container */}
      <div
        ref={containerRef}
        className="relative w-full h-[460px] sm:h-[520px] lg:h-full overflow-y-auto overflow-x-hidden bg-[#F4F5F3]"
        style={{
          height: maxHeight ? `${maxHeight}px` : undefined,
          maxHeight: maxHeight ? `${maxHeight}px` : undefined
        }}
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
            title="Evoltics CSMP Dashboard - Interactive Station Management Platform"
            onLoad={() => handleIframeLoaded(iframeRef.current)}
            className="border-0 bg-[#F4F5F3] block"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: 1440,
              height: contentHeight,
              transform: `scale(${scale})`,
              transformOrigin: "top left",
              pointerEvents: "auto"
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}
