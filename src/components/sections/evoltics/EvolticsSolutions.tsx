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

// ─── Stack Geometry & Shared Logic ─────────────────────────────────────────────

const ACTIVE_W = 620;
const CARD_H = 370;
const STEP_Y = 50;
const WIDTH_STEP = 20;
const SCALE_STEP = 0.015;

const SCROLL_THRESHOLDS: [number, number][] = [
  [0.08, 0.17],
  [0.25, 0.34],
  [0.42, 0.51],
  [0.59, 0.68],
  [0.76, 0.85]
];

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

const computeActiveIndex = (pos: number): number => {
  let activeIdx = 0;
  for (let i = 0; i < SCROLL_THRESHOLDS.length; i++) {
    const [ta, tb] = SCROLL_THRESHOLDS[i];
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

// ─── Shared Card Content ──────────────────────────────────────────────────────

function CardContent({ card, index }: { card: AdvantageCardData, index: number }) {
  const Icon = card.icon;
  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between pb-2 lg:pb-[10px] border-b border-zinc-100 lg:border-[#f4f4f5] gap-2 lg:gap-0">
        <div className="flex items-center gap-1.5 lg:gap-2 min-w-0 shrink-0 lg:shrink">
          <span className="text-[11px] font-mono font-bold text-zinc-400 shrink-0">{card.num}</span>
          <span className="text-[8.5px] lg:text-[10px] font-bold tracking-wider lg:tracking-[0.15em] uppercase px-2 lg:px-2.5 py-0.5 rounded lg:rounded-md bg-zinc-100 text-zinc-700 border border-zinc-200/70 shrink-0">
            {card.tag}
          </span>
        </div>
        <div className="flex items-center gap-1 lg:gap-1.5 text-primary text-[8.5px] lg:text-[10px] font-bold tracking-wider uppercase shrink-0 lg:ml-2">
          <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
          <span className="truncate max-w-[160px]">{card.badge}</span>
        </div>
      </div>

      {/* Body */}
      <div className="grid grid-cols-[1fr_auto] gap-3 lg:gap-4 items-center py-2.5 lg:pt-[18px] lg:pb-[15px]">
        <div className="min-w-0">
          <div className="w-8 h-8 lg:w-11 lg:h-11 rounded-lg lg:rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-primary mb-1.5 lg:mb-3 shadow-xs lg:shadow-sm shrink-0">
            <Icon className="w-4 h-4 lg:w-[22px] lg:h-[22px]" />
          </div>
          <h3 className="text-base sm:text-lg lg:text-[21px] font-black tracking-tight text-zinc-950 mb-1 lg:mb-2 leading-tight lg:leading-snug">
            {card.title}
          </h3>
          <p className="text-[11px] lg:text-[12px] text-zinc-500 leading-relaxed lg:line-clamp-3">
            {card.description}
          </p>
        </div>
        <div className="w-18 h-18 sm:w-22 sm:h-22 lg:w-[135px] lg:h-[120px] flex items-center justify-center shrink-0">
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

      {/* Key Pillars */}
      <div className="pt-2 lg:pt-[15px] border-t border-zinc-100 lg:border-[#f4f4f5]">
        <div className="text-[8px] lg:text-[9px] font-bold uppercase tracking-[0.15em] lg:tracking-[0.2em] text-zinc-400 mb-1.5 lg:mb-[10px]">
          KEY ARCHITECTURAL PILLARS
        </div>
        <div className="flex lg:items-center lg:justify-between lg:gap-2">
          <div className="space-y-1 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-2 flex-1">
            {card.highlights.map((highlight, hIdx) => (
              <div key={hIdx} className="flex items-center lg:items-start gap-1.5 px-2 lg:px-2.5 py-1.5 lg:py-2 rounded-lg bg-zinc-50/90 border border-zinc-200/60">
                <div className="w-3.5 h-3.5 rounded-full border border-blue-500 flex items-center justify-center text-primary shrink-0 lg:mt-[1px]">
                  <Check className="w-2 h-2 stroke-[2.5]" />
                </div>
                <span className="text-[9.5px] lg:text-[10px] font-semibold text-zinc-800 leading-none lg:leading-tight truncate lg:whitespace-normal">{highlight}</span>
              </div>
            ))}
          </div>
          <div className="hidden lg:flex w-8 h-8 rounded-full border border-blue-200 items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors cursor-pointer shrink-0 ml-1">
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </>
  );
}

// ─── StackCard Components ────────────────────────────────────────────────────

interface StackCardProps {
  card: AdvantageCardData;
  index: number;
  totalCards: number;
  scrollYProgress: MotionValue<number>;
  isReducedMotion: boolean | null;
}

function DesktopStackCard({ card, index, totalCards, scrollYProgress, isReducedMotion }: StackCardProps) {
  const depth = useTransform(scrollYProgress, (pos) => {
    const activeIdx = computeActiveIndex(pos);
    return isReducedMotion ? index - Math.round(activeIdx) : index - activeIdx;
  });

  const y = useTransform(depth, d => d < 0 ? Math.abs(d) * 200 : -d * STEP_Y);
  const scale = useTransform(depth, d => d < 0 ? 1 + Math.abs(d) * 0.02 : Math.max(0.88, 1 - d * SCALE_STEP));
  const opacity = useTransform(depth, d => d <= -0.3 ? 0 : d < 0 ? clamp01(1 + d * 3.33) : 1);
  const width = useTransform(depth, d => Math.max(ACTIVE_W - (totalCards - 1) * WIDTH_STEP, ACTIVE_W - Math.max(0, d) * WIDTH_STEP));
  const zIndex = useTransform(depth, d => d < 0 ? 55 : Math.max(10, 50 - Math.round(d) * 5));

  return (
    <motion.div
      style={{ y, scale, opacity, width, zIndex }}
      className="absolute top-0 left-1/2 -translate-x-1/2 will-change-transform"
    >
      <div
        className="bg-white rounded-2xl border border-zinc-200/90 overflow-hidden flex flex-col justify-between"
        style={{
          height: CARD_H,
          padding: "20px",
          boxShadow: "0 16px 40px -10px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.02)"
        }}
      >
        <CardContent card={card} index={index} />
      </div>
    </motion.div>
  );
}

function MobileSequenceCard({ card, index, scrollYProgress, isReducedMotion }: StackCardProps) {
  const activeIdxValue = useTransform(scrollYProgress, computeActiveIndex);
  
  const x = useTransform(activeIdxValue, idx => isReducedMotion ? "0%" : `${(index - idx) * 115}%`);
  const opacity = useTransform(activeIdxValue, idx => {
    const rel = Math.abs(index - idx);
    return rel >= 1.0 ? 0 : Math.max(0, 1 - rel * 1.5);
  });
  const scale = useTransform(activeIdxValue, idx => isReducedMotion ? 1 : Math.max(0.92, 1 - Math.abs(index - idx) * 0.08));

  return (
    <motion.div
      style={{ x, opacity, scale }}
      className="absolute inset-x-0 mx-auto w-full max-w-[360px] sm:max-w-[420px] will-change-transform pointer-events-auto"
    >
      <div className="bg-white rounded-2xl border border-zinc-200/90 overflow-hidden shadow-lg p-4 sm:p-5 flex flex-col justify-between">
        <CardContent card={card} index={index} />
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
      className="relative w-full h-[550vh] bg-white text-foreground font-sans"
    >

      {/* ── Sticky viewport ── */}
      <div className="sticky top-0 h-screen w-full flex flex-col pt-18 sm:pt-20 lg:pt-10 pb-3 sm:pb-4 lg:pb-6 z-10 overflow-hidden">

        {/* ════════════════════════════════════════════════════════════════════════
            DESKTOP PRESENTATION (lg and up) — Side-by-side Layout
           ════════════════════════════════════════════════════════════════════════ */}
        <div className="hidden lg:flex container mx-auto px-6 lg:px-8 xl:px-12 2xl:px-16 max-w-[1500px] flex-row h-full relative z-10 items-center justify-between gap-4 lg:gap-8 xl:gap-20">

          {/* Desktop Left Side: Content */}
          <div className="w-[340px] lg:w-[360px] xl:w-[550px] shrink-0 flex flex-col justify-center gap-6 lg:gap-8 xl:gap-12">
            
            <div className="flex flex-col gap-4">


              <h2 className="text-3xl lg:text-[2rem] xl:text-[3.2rem] font-black tracking-tight text-zinc-950 leading-[1.05]">
                WHAT POWERS THE <br />
                <span className="text-primary font-black">EVOLTICS ADVANTAGE</span>
              </h2>

              <p className="text-sm lg:text-xs xl:text-base text-zinc-500 leading-relaxed max-w-md">
                A connected approach that unifies technology, regulatory compliance, hardware flexibility, and 24/7 SLA operational support.
              </p>
            </div>

            {/* Desktop Counter & Progress */}
            <div className="flex flex-col gap-3">
              <div className="flex items-baseline gap-1.5 font-mono">
                <span className="text-3xl lg:text-2xl xl:text-4xl font-black text-zinc-950 tracking-tight">
                  {String(activeStep + 1).padStart(2, "0")}
                </span>
                <span className="text-sm lg:text-xs xl:text-base font-semibold text-zinc-300">/</span>
                <span className="text-sm lg:text-xs xl:text-base font-bold text-zinc-400">
                  {String(advantageCards.length).padStart(2, "0")}
                </span>
              </div>
              <div className="flex gap-1.5 items-center w-full max-w-[280px] lg:max-w-[220px] xl:max-w-[340px]">
                {advantageCards.map((_, i) => (
                  <div
                    key={i}
                    className={cn(
                      "h-1.5 xl:h-2 rounded-full transition-all duration-300 ease-out",
                      activeStep === i ? "w-8 xl:w-12 bg-primary" : "flex-1 bg-zinc-200"
                    )}
                  />
                ))}
              </div>
            </div>

            {/* Desktop Scroll Indicator */}
            <div className="flex items-center gap-3 pt-2">
              <div className="w-4 h-7 xl:w-5 xl:h-9 rounded-full border-2 border-zinc-400/80 flex items-start justify-center p-1 shrink-0">
                <motion.div
                  animate={{ y: [0, 5, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                  className="w-1 h-1 xl:h-1.5 bg-zinc-500 rounded-full"
                />
              </div>
              <span className="text-[11px] lg:text-[10px] xl:text-[13px] font-medium text-zinc-500 tracking-wide">
                Scroll to explore advantage sequence
              </span>
            </div>

          </div>

          {/* Desktop Right Side: Card Stage */}
          <div className="flex-1 flex justify-center lg:justify-start xl:justify-center items-center relative h-full min-w-0 pl-0 lg:pl-0 xl:pl-10">
            <div className="relative lg:scale-[0.80] xl:scale-110 2xl:scale-125 lg:origin-left xl:origin-center lg:translate-x-2 lg:translate-y-8 xl:translate-x-12 xl:translate-y-16 transition-transform duration-300" style={{ width: ACTIVE_W, height: CARD_H }}>
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

        </div>

        {/* ════════════════════════════════════════════════════════════════════════
            MOBILE PRESENTATION (< lg) — Purpose-Built Horizontal Card Sequence
           ════════════════════════════════════════════════════════════════════════ */}
        <div className="flex lg:hidden flex-col h-full justify-between px-4 sm:px-6 relative z-10 w-full max-w-lg mx-auto">

          {/* Mobile Header Row */}
          <div className="shrink-0">
            <div className="flex items-center justify-between mb-1">

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
