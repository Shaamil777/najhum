"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
  MotionValue
} from "framer-motion";
import { evolticsContent } from "@/content/platforms";
import {
  Layers,
  ShieldCheck,
  Cpu,
  Activity,
  Sparkles,
  Headphones,
  Check,
  ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Data ─────────────────────────────────────────────────────────────────────

const rawCards = evolticsContent.solutions.cards;

interface AdvantageCardData {
  num: string;
  title: string;
  description: string;
  icon: React.ElementType;
  tag: string;
  badge: string;
  imageSrc: string;
  highlights: string[];
}

const advantageCards: AdvantageCardData[] = [
  {
    ...rawCards[0],
    icon: Layers,
    tag: "END-TO-END",
    badge: "SINGLE SLA ACCOUNTABILITY",
    imageSrc: "/images/elvotics/card_1.png",
    highlights: ["Licensing & Approvals", "Hardware & Installation", "Unified Operator CPMS"]
  },
  {
    ...rawCards[1],
    icon: ShieldCheck,
    tag: "REGULATORY",
    badge: "DEWA • TAQA • FEWA",
    imageSrc: "/images/elvotics/card_2.png",
    highlights: ["CPO License Acceleration", "Grid Authority Liaison", "Statutory Compliance Audit"]
  },
  {
    ...rawCards[2],
    icon: Cpu,
    tag: "HARDWARE AGNOSTIC",
    badge: "OCPP 1.6J / 2.0.1",
    imageSrc: "/images/elvotics/card_3.png",
    highlights: ["Zero Brand Lock-in", "Multi-Vendor AC & DC", "Direct Firmware Management"]
  },
  {
    ...rawCards[3],
    icon: Activity,
    tag: "TELEMETRY",
    badge: "SUB-SECOND MONITORING",
    imageSrc: "/images/elvotics/card_4.png",
    highlights: ["Live Power Distribution", "Remote Diagnostics & Reset", "Dynamic Load Balancing"]
  },
  {
    ...rawCards[4],
    icon: Sparkles,
    tag: "BRANDING",
    badge: "TENANT BRANDED APPS",
    imageSrc: "/images/elvotics/card_5.png",
    highlights: ["Custom Driver Mobile App", "White-Label CPMS Portal", "Custom Invoicing & Tariffs"]
  },
  {
    ...rawCards[5],
    icon: Headphones,
    tag: "RELIABILITY",
    badge: "99.9% UPTIME SLA",
    imageSrc: "/images/elvotics/card_6.png",
    highlights: ["24/7 Field Engineering", "Predictive Maintenance", "Rapid-Response Dispatch"]
  }
];

// ─── Stack Geometry (derived from Reference Image 2) ─────────────────────────
//
// Active card width: ~500px (compact, not 840px)
// Per-card vertical strip exposure: ~50px
// Per-card width narrowing: 20px (very subtle)
// Per-card scale reduction: 0.015 (barely perceptible, editorial)
//
const ACTIVE_W = 620;       // px — active card width (medium scale)
const CARD_H = 370;         // px — fixed card height (enforced via overflow-hidden)
const STEP_Y = 50;          // px — exposed header strip per depth level (equals header section height)
const WIDTH_STEP = 20;      // px — narrowing per depth level
const SCALE_STEP = 0.015;   // scale reduction per depth level (ratio, unchanged)

// ─── Individual Desktop Card Component (Untouched) ────────────────────────────

interface StackCardProps {
  card: AdvantageCardData;
  index: number;
  totalCards: number;
  scrollYProgress: MotionValue<number>;
  isReducedMotion: boolean | null;
}

function DesktopStackCard({ card, index, totalCards, scrollYProgress, isReducedMotion }: StackCardProps) {
  const Icon = card.icon;

  const T: [number, number][] = [
    [0.08, 0.17],
    [0.25, 0.34],
    [0.42, 0.51],
    [0.59, 0.68],
    [0.76, 0.85]
  ];

  const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

  const computeDepth = (pos: number): number => {
    let activeIdx = 0;
    for (let i = 0; i < T.length; i++) {
      const [ta, tb] = T[i];
      if (pos < ta) break;
      if (pos >= tb) {
        activeIdx = i + 1;
      } else {
        activeIdx = i + clamp01((pos - ta) / (tb - ta));
        break;
      }
    }
    if (isReducedMotion) return index - Math.round(activeIdx);
    return index - activeIdx;
  };

  const y = useTransform(scrollYProgress, (pos) => {
    const depth = computeDepth(pos);
    if (depth < 0) return Math.abs(depth) * 200;
    return -depth * STEP_Y;
  });

  const scale = useTransform(scrollYProgress, (pos) => {
    const depth = computeDepth(pos);
    if (depth < 0) return 1 + Math.abs(depth) * 0.02;
    return Math.max(0.88, 1 - depth * SCALE_STEP);
  });

  const opacity = useTransform(scrollYProgress, (pos) => {
    const depth = computeDepth(pos);
    if (depth <= -0.3) return 0;
    if (depth < 0) return clamp01(1 + depth * 3.33);
    return 1;
  });

  const width = useTransform(scrollYProgress, (pos) => {
    const depth = computeDepth(pos);
    const d = Math.max(0, depth);
    return Math.max(ACTIVE_W - (totalCards - 1) * WIDTH_STEP, ACTIVE_W - d * WIDTH_STEP);
  });

  const zIndex = useTransform(scrollYProgress, (pos) => {
    const depth = computeDepth(pos);
    if (depth < 0) return 55;
    return Math.max(10, 50 - Math.round(depth) * 5);
  });

  return (
    <motion.div
      style={{ y, scale, opacity, width, zIndex }}
      className="absolute top-0 left-1/2 -translate-x-1/2 will-change-transform"
    >
      <div
        className="bg-white rounded-2xl border border-zinc-200/90 overflow-hidden"
        style={{
          height: CARD_H,
          padding: "20px",
          boxShadow: "0 16px 40px -10px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.02)"
        }}
      >
        <div className="flex items-center justify-between" style={{ paddingBottom: "10px", borderBottom: "1px solid #f4f4f5" }}>
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-[11px] font-mono font-bold text-zinc-400 shrink-0">{card.num}</span>
            <span className="text-[10px] font-bold tracking-[0.15em] uppercase px-2.5 py-0.5 rounded-md bg-zinc-100 text-zinc-700 border border-zinc-200/70 shrink-0">
              {card.tag}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-primary text-[10px] font-bold tracking-wider uppercase shrink-0 ml-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
            <span className="truncate max-w-[160px]">{card.badge}</span>
          </div>
        </div>

        <div className="grid grid-cols-[1fr_auto] gap-4 items-center" style={{ paddingTop: "18px", paddingBottom: "15px" }}>
          <div className="min-w-0">
            <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-primary mb-3 shadow-sm shrink-0">
              <Icon className="w-[22px] h-[22px]" />
            </div>
            <h3 className="text-[21px] font-black tracking-tight text-zinc-950 mb-2 leading-snug">
              {card.title}
            </h3>
            <p className="text-[12px] text-zinc-500 leading-relaxed line-clamp-3">
              {card.description}
            </p>
          </div>

          <div className="flex items-center justify-center shrink-0" style={{ width: 135, height: 120 }}>
            <Image
              src={card.imageSrc}
              alt={card.title}
              width={150}
              height={125}
              priority={index === 0}
              className="w-full h-full object-contain drop-shadow-sm select-none"
            />
          </div>
        </div>

        <div style={{ paddingTop: "15px", borderTop: "1px solid #f4f4f5" }}>
          <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-400" style={{ marginBottom: "10px" }}>
            KEY ARCHITECTURAL PILLARS
          </div>
          <div className="flex items-center justify-between gap-2">
            <div className="grid grid-cols-3 gap-2 flex-1">
              {card.highlights.map((highlight, hIdx) => (
                <div key={hIdx} className="flex items-start gap-1.5 px-2.5 py-2 rounded-lg bg-zinc-50/90 border border-zinc-200/60">
                  <div className="w-3.5 h-3.5 rounded-full border border-blue-500 flex items-center justify-center text-primary shrink-0 mt-[1px]">
                    <Check className="w-2 h-2 stroke-[2.5]" />
                  </div>
                  <span className="text-[10px] font-semibold text-zinc-800 leading-tight">{highlight}</span>
                </div>
              ))}
            </div>
            <div className="w-8 h-8 rounded-full border border-blue-200 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors cursor-pointer shrink-0 ml-1">
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Individual Mobile Card Component (Horizontal Scroll-Driven Sequence) ─────

interface MobileCardProps {
  card: AdvantageCardData;
  index: number;
  totalCards: number;
  scrollYProgress: MotionValue<number>;
  isReducedMotion: boolean | null;
}

function MobileSequenceCard({ card, index, scrollYProgress, isReducedMotion }: MobileCardProps) {
  const Icon = card.icon;

  const T: [number, number][] = [
    [0.08, 0.17],
    [0.25, 0.34],
    [0.42, 0.51],
    [0.59, 0.68],
    [0.76, 0.85]
  ];

  const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

  const computeActiveIdx = (pos: number): number => {
    let activeIdx = 0;
    for (let i = 0; i < T.length; i++) {
      const [ta, tb] = T[i];
      if (pos < ta) break;
      if (pos >= tb) {
        activeIdx = i + 1;
      } else {
        activeIdx = i + clamp01((pos - ta) / (tb - ta));
        break;
      }
    }
    return activeIdx;
  };

  // Horizontal translation: moves smoothly from right (+115%) to center (0%) to left (-115%)
  const x = useTransform(scrollYProgress, (pos) => {
    if (isReducedMotion) return "0%";
    const activeIdx = computeActiveIdx(pos);
    const rel = index - activeIdx;
    return `${rel * 115}%`;
  });

  // Opacity: only visible around its active window
  const opacity = useTransform(scrollYProgress, (pos) => {
    const activeIdx = computeActiveIdx(pos);
    const rel = Math.abs(index - activeIdx);
    if (rel >= 1.0) return 0;
    return Math.max(0, 1 - rel * 1.5);
  });

  const scale = useTransform(scrollYProgress, (pos) => {
    if (isReducedMotion) return 1;
    const activeIdx = computeActiveIdx(pos);
    const rel = Math.abs(index - activeIdx);
    return Math.max(0.92, 1 - rel * 0.08);
  });

  return (
    <motion.div
      style={{ x, opacity, scale }}
      className="absolute inset-x-0 mx-auto w-full max-w-[360px] sm:max-w-[420px] will-change-transform pointer-events-auto"
    >
      <div
        className="bg-white rounded-2xl border border-zinc-200/90 overflow-hidden shadow-lg p-4 sm:p-5 flex flex-col justify-between"
      >
        {/* Mobile Header Strip */}
        <div className="flex items-center justify-between pb-2 border-b border-zinc-100 gap-2">
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-[11px] font-mono font-bold text-zinc-400">{card.num}</span>
            <span className="text-[8.5px] font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-zinc-100 text-zinc-700 border border-zinc-200/70">
              {card.tag}
            </span>
          </div>
          <div className="flex items-center gap-1 text-primary text-[8.5px] font-bold tracking-wider uppercase shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
            <span>{card.badge}</span>
          </div>
        </div>

        {/* Mobile Body */}
        <div className="grid grid-cols-[1fr_auto] gap-3 items-center py-2.5">
          <div className="min-w-0">
            <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-primary mb-1.5 shadow-xs shrink-0">
              <Icon className="w-4 h-4" />
            </div>
            <h3 className="text-base sm:text-lg font-black tracking-tight text-zinc-950 mb-1 leading-tight">
              {card.title}
            </h3>
            <p className="text-[11px] text-zinc-500 leading-relaxed">
              {card.description}
            </p>
          </div>

          <div className="w-18 h-18 sm:w-22 sm:h-22 flex items-center justify-center shrink-0">
            <Image
              src={card.imageSrc}
              alt={card.title}
              width={90}
              height={80}
              priority={index === 0}
              className="w-full h-full object-contain drop-shadow-sm select-none"
            />
          </div>
        </div>

        {/* Mobile Key Pillars */}
        <div className="pt-2 border-t border-zinc-100">
          <div className="text-[8px] font-bold uppercase tracking-[0.15em] text-zinc-400 mb-1.5">
            KEY ARCHITECTURAL PILLARS
          </div>
          <div className="space-y-1">
            {card.highlights.map((highlight, hIdx) => (
              <div key={hIdx} className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg bg-zinc-50/90 border border-zinc-200/60">
                <div className="w-3.5 h-3.5 rounded-full border border-blue-500 flex items-center justify-center text-primary shrink-0">
                  <Check className="w-2 h-2 stroke-[2.5]" />
                </div>
                <span className="text-[9.5px] font-semibold text-zinc-800 leading-none truncate">{highlight}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export default function EvolticsSolutions() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isReducedMotion = useReducedMotion();
  const [activeStep, setActiveStep] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.17)      setActiveStep(0);
    else if (latest < 0.34) setActiveStep(1);
    else if (latest < 0.51) setActiveStep(2);
    else if (latest < 0.68) setActiveStep(3);
    else if (latest < 0.85) setActiveStep(4);
    else                    setActiveStep(5);
  });

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[550vh] bg-white text-zinc-900 font-sans"
    >
      {/* Subtle architectural grid background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,transparent_40%,rgba(241,245,249,0.8)_100%)]" />
      </div>

      {/* ── Sticky viewport ── */}
      <div className="sticky top-0 h-screen w-full flex flex-col pt-18 sm:pt-20 lg:pt-10 pb-3 sm:pb-4 lg:pb-6 z-10 overflow-hidden">

        {/* ════════════════════════════════════════════════════════════════════════
            DESKTOP PRESENTATION (lg and up) — 100% Preserved Stack Layout
           ════════════════════════════════════════════════════════════════════════ */}
        <div className="hidden lg:flex container mx-auto px-6 lg:px-16 max-w-7xl flex-col h-full relative z-10 justify-between">

          {/* Desktop Header row */}
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 shrink-0">
            <div className="lg:max-w-md xl:max-w-lg">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-5 h-[2px] bg-primary block" />
                <span className="text-[11px] font-bold text-primary uppercase tracking-[0.2em]">
                  Core Architectural Advantages
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-[2.3rem] xl:text-[2.5rem] font-black tracking-tight text-zinc-950 leading-[1.1]">
                WHAT POWERS THE <br />
                <span className="text-primary font-black">EVOLTICS ADVANTAGE</span>
              </h2>

              <p className="mt-2 text-xs sm:text-sm text-zinc-500 max-w-sm leading-relaxed">
                A connected approach that unifies technology, regulatory compliance, hardware flexibility, and 24/7 SLA operational support.
              </p>
            </div>

            {/* Desktop Counter */}
            <div className="flex flex-col lg:items-end gap-2 shrink-0 lg:pt-1">
              <div className="flex items-baseline gap-1.5 font-mono">
                <span className="text-2xl sm:text-3xl font-black text-zinc-950 tracking-tight">
                  {String(activeStep + 1).padStart(2, "0")}
                </span>
                <span className="text-sm font-semibold text-zinc-300">/</span>
                <span className="text-sm font-bold text-zinc-400">
                  {String(advantageCards.length).padStart(2, "0")}
                </span>
              </div>
              <div className="flex gap-1.5 items-center">
                {advantageCards.map((_, i) => (
                  <div
                    key={i}
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-300 ease-out",
                      activeStep === i ? "w-7 bg-primary" : "w-5 bg-zinc-200"
                    )}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Desktop Central Card Stage */}
          <div className="flex-1 flex flex-col justify-center items-center relative min-h-0">
            <div className="relative" style={{ width: ACTIVE_W, height: CARD_H }}>
              {advantageCards.map((card, index) => (
                <DesktopStackCard
                  key={card.num}
                  card={card}
                  index={index}
                  totalCards={advantageCards.length}
                  scrollYProgress={scrollYProgress}
                  isReducedMotion={isReducedMotion}
                />
              ))}
            </div>
          </div>

          {/* Desktop Scroll Indicator */}
          <div className="shrink-0 flex flex-col items-center justify-center gap-1 pt-1 pb-1 text-center">
            <div className="w-4 h-7 rounded-full border-2 border-zinc-400/80 flex items-start justify-center p-1">
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                className="w-1 h-1 bg-zinc-500 rounded-full"
              />
            </div>
            <span className="text-[10px] sm:text-[11px] font-medium text-zinc-500 tracking-wide">
              Scroll to explore advantage sequence
            </span>
          </div>

        </div>

        {/* ════════════════════════════════════════════════════════════════════════
            MOBILE PRESENTATION (< lg) — Purpose-Built Horizontal Card Sequence
           ════════════════════════════════════════════════════════════════════════ */}
        <div className="flex lg:hidden flex-col h-full justify-between px-4 sm:px-6 relative z-10 w-full max-w-lg mx-auto">

          {/* Mobile Header Row */}
          <div className="shrink-0">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-[2px] bg-primary block" />
                <span className="text-[9px] font-bold text-primary uppercase tracking-[0.18em]">
                  Architectural Advantages
                </span>
              </div>
              {/* Mobile Counter */}
              <div className="font-mono text-xs font-bold text-zinc-500">
                <span className="text-sm font-black text-zinc-950">{String(activeStep + 1).padStart(2, "0")}</span>
                <span className="text-zinc-300 mx-0.5">/</span>
                <span>{String(advantageCards.length).padStart(2, "0")}</span>
              </div>
            </div>

            <h2 className="text-lg sm:text-xl font-black tracking-tight text-zinc-950 leading-tight">
              WHAT POWERS THE <span className="text-primary font-black">EVOLTICS ADVANTAGE</span>
            </h2>

            {/* Mobile Progress Bar */}
            <div className="flex gap-1 items-center mt-1.5">
              {advantageCards.map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "h-1 rounded-full transition-all duration-300 ease-out flex-1",
                    activeStep === i ? "bg-primary" : "bg-zinc-200"
                  )}
                />
              ))}
            </div>
          </div>

          {/* Mobile Center Stage: Horizontal Card Sequence */}
          <div className="flex-1 flex items-center justify-center relative w-full overflow-hidden my-auto py-1">
            {advantageCards.map((card, index) => (
              <MobileSequenceCard
                key={card.num}
                card={card}
                index={index}
                totalCards={advantageCards.length}
                scrollYProgress={scrollYProgress}
                isReducedMotion={isReducedMotion}
              />
            ))}
          </div>

          {/* Mobile Bottom Indicator */}
          <div className="shrink-0 flex items-center justify-center gap-2 py-1 text-center">
            <div className="w-3 h-4.5 rounded-full border-1.5 border-zinc-400/80 flex items-start justify-center p-0.5">
              <motion.div
                animate={{ y: [0, 3, 0] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                className="w-0.5 h-1 bg-zinc-500 rounded-full"
              />
            </div>
            <span className="text-[9.5px] font-medium text-zinc-500 tracking-wide">
              Scroll down to explore advantage sequence
            </span>
          </div>

        </div>

      </div>
    </section>
  );
}
