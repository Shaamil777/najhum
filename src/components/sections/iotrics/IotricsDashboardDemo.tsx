"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

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
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const [scale, setScale] = useState(0.5);
  const [isLoading, setIsLoading] = useState(true);

  const currentConfig = MODULE_PAGES[activeIndex] || MODULE_PAGES[0];
  const targetUrl = `/dashboard_Demo/${currentConfig.file}`;

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

  // Handle iframe load and bidirectional link sync
  const handleIframeLoaded = (frame: HTMLIFrameElement | null) => {
    setIsLoading(false);
    if (!frame) return;

    try {
      const doc = frame.contentDocument;
      if (doc) {
        doc.addEventListener("click", (e) => {
          const link = (e.target as HTMLElement)?.closest("a");
          if (!link) return;
          const href = link.getAttribute("href");
          if (!href || href.startsWith("#") || href.startsWith("http")) return;

          const targetFileName = href.split("/").pop();
          const targetIndex = MODULE_PAGES.findIndex((p) => p.file === targetFileName);
          if (targetIndex !== -1 && targetIndex !== activeIndex) {
            onSelectIndex?.(targetIndex);
          }
        });
      }
    } catch {
      // Ignore cross-origin error if any
    }
  };

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
        className="relative w-full h-[460px] sm:h-[520px] lg:h-full overflow-y-auto overflow-x-hidden bg-[#F4F4F7]"
        style={{
          height: maxHeight ? `${maxHeight}px` : undefined,
          maxHeight: maxHeight ? `${maxHeight}px` : undefined
        }}
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
            height: currentConfig.height * scale,
            position: "relative"
          }}
        >
          <iframe
            key={currentConfig.file}
            ref={iframeRef}
            src={targetUrl}
            title={`IoTRICs Dashboard - ${currentConfig.title}`}
            onLoad={() => handleIframeLoaded(iframeRef.current)}
            className="border-0 bg-[#F4F4F7] block"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: 1440,
              height: currentConfig.height,
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
