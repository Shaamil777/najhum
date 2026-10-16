"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { Activity, Layers3, Radio } from "lucide-react";
import styles from "./ImpactAnimatedVisual.module.css";

type VisualKind = "energy" | "maintenance" | "deployment";
const demandHeights = [22, 20, 18, 18, 20, 24, 36, 49, 57, 61, 64, 68, 74, 90, 100, 97, 93, 85, 64, 46, 36, 30, 26, 23];
const stages = [
  { label: "Connect", detail: "Install sensors", Icon: Radio },
  { label: "Monitor", detail: "We run it", Icon: Activity },
  { label: "Scale", detail: "Same subscription", Icon: Layers3 },
];

function signal(x: number, time: number) {
  const position = (x - 28) / 544;
  const amplitude = 4 + Math.pow(position, 2.4) * 44;
  return 107 + (Math.sin(position * 63 - time * 1.1) * .72 + Math.sin(position * 122 + time * .55) * .19 + Math.sin(position * 208 - time * .35) * .09) * amplitude;
}

/** Illustrative activity, paused off screen and for reduced-motion preferences. */
export default function ImpactAnimatedVisual({ kind }: { kind: VisualKind }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    let frame = 0;
    let previous = 0;
    let lastPaint = 0;
    let elapsed = 0;

    const draw = () => {
      if (kind !== "maintenance") return;
      let path = "";
      for (let x = 28; x <= 572; x += 3) path += `${x === 28 ? "M" : "L"}${x} ${signal(x, elapsed).toFixed(2)}`;
      pathRef.current?.setAttribute("d", path);
      dotRef.current?.setAttribute("cy", signal(470, elapsed).toFixed(2));
    };
    const tick = (now: number) => {
      if (previous) elapsed += Math.min((now - previous) / 1000, .1);
      previous = now;
      if (now - lastPaint > 40) { draw(); lastPaint = now; }
      frame = requestAnimationFrame(tick);
    };
    const sync = () => {
      cancelAnimationFrame(frame);
      previous = 0;
      const paused = !visible || document.hidden || reducedMotion.matches;
      root.dataset.paused = String(paused);
      if (!paused && kind === "maintenance") frame = requestAnimationFrame(tick);
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
    draw();
    sync();
    observer.observe(root);
    reducedMotion.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      reducedMotion.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
    };
  }, [kind]);

  const label = kind === "energy"
    ? "Illustrative animated load profile highlighting peak demand"
    : kind === "maintenance"
      ? "Illustrative vibration signal showing equipment drifting outside its normal operating range"
      : "Deployment sequence: Connect — install sensors; Monitor — we run it; Scale — same subscription";

  return (
    <div ref={rootRef} className={`${styles.visual} ${kind === "maintenance" ? styles.dark : ""} ${kind === "deployment" ? styles.deployment : ""}`} role="img" aria-label={label}>
      {kind === "energy" && <>
        <span className={styles.figureNote}>Illustrative load profile</span>
        <div className={styles.threshold} />
        <span className={styles.graphLabel}>Peak demand</span>
        <div className={styles.bars}>
          {demandHeights.map((height, index) => <div key={index} className={`${styles.bar} ${index >= 14 && index <= 18 ? styles.peak : ""}`} style={{ "--bar-height": `${height}%`, animationDelay: `${-index * .16}s` } as CSSProperties} />)}
        </div>
      </>}
      {kind === "maintenance" && <>
        <span className={styles.figureNote}>Illustrative asset signal</span>
        <span className={styles.graphLabel}>Drift flagged</span>
        <svg viewBox="0 0 600 210" preserveAspectRatio="none" aria-hidden="true">
          <rect x="28" y="85" width="544" height="45" fill="#3b82f6" opacity=".13" />
          <path d="M28 85H572M28 130H572" stroke="#4670a9" strokeOpacity=".45" strokeDasharray="3 6" />
          <path ref={pathRef} d="M28 107H572" fill="none" stroke="#72a7ff" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M470 56V180" stroke="#93c5fd" strokeWidth="1.2" strokeDasharray="4 5" />
          <circle ref={dotRef} className={styles.driftDot} cx="470" cy="107" r="3.5" />
        </svg>
      </>}
      {kind === "deployment" && <>
        <div className={styles.stepLine} />
        {stages.map(({ label: stageLabel, detail, Icon }, index) => <div key={stageLabel} className={styles.step} data-first={index === 0} style={{ "--stage-delay": `${index * 2.6}s` } as CSSProperties}>
          <div className={styles.stepIcon}><Icon size={27} strokeWidth={1.8} /></div>
          <b>{stageLabel}</b><small>{detail}</small>
        </div>)}
      </>}
    </div>
  );
}
