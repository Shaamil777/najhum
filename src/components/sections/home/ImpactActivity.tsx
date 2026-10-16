import { Activity, Cpu, Layers3, Radio } from "lucide-react";
import styles from "./ImpactMotion.module.css";

/** Decorative previews of the card's operation. */
export default function ImpactActivity({ kind }: { kind: "retrofit" | "energy" | "maintenance" | "deployment" }) {
  if (kind === "deployment") {
    return (
      <div className={styles.deployment} aria-hidden="true">
        <div className={styles.deploymentTrack} />
        {[
          { label: "Connect", Icon: Radio },
          { label: "Monitor", Icon: Activity },
          { label: "Scale", Icon: Layers3 },
        ].map(({ label, Icon }, index) => (
          <div key={label} className={styles.stage} style={{ animationDelay: `${index * 1.2}s` }}>
            <span><Icon size={24} strokeWidth={1.8} /></span>
            <small>{label}</small>
          </div>
        ))}
      </div>
    );
  }

  if (kind === "retrofit") {
    return (
      <div className={styles.retrofit} aria-hidden="true">
        <svg viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="40" stroke="currentColor" strokeOpacity=".15" />
          <path className={styles.connectionFlow} d="M14 24L50 50L86 24M14 76L50 50L86 76" stroke="currentColor" strokeWidth="2" />
          <g className={styles.orbit}><circle cx="50" cy="10" r="4" fill="currentColor" /></g>
          {[[14,24],[86,24],[14,76],[86,76]].map(([x,y]) => <rect key={`${x}-${y}`} x={x-6} y={y-6} width="12" height="12" rx="4" fill="#eff6ff" stroke="currentColor" />)}
          <circle cx="50" cy="50" r="19" fill="white" stroke="currentColor" strokeOpacity=".2" />
        </svg>
        <Cpu size={22} strokeWidth={1.8} className={styles.retrofitCpu} />
      </div>
    );
  }

  if (kind === "energy") {
    return (
      <div className={styles.energy} aria-hidden="true">
        <svg viewBox="0 0 84 84" fill="none">
          <path d="M10 66H74" stroke="currentColor" strokeOpacity=".2" />
          {[24, 37, 28, 45, 34, 51].map((height, index) => (
            <rect key={index} className={styles.energyBar} x={13 + index * 10} y={65-height} width="6" height={height} rx="3" fill="currentColor" style={{ animationDelay: `${index * -.45}s` }} />
          ))}
          <path className={styles.energyTrace} d="M10 44L23 38L35 42L47 27L59 30L74 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    );
  }

  return (
    <div className={styles.radar} aria-hidden="true">
      <span className={styles.radarSweep} />
      <span className={styles.radarGrid} />
      <i className={styles.blip} /><i className={styles.blip} /><i className={styles.blip} />
      <svg viewBox="0 0 84 84" fill="none">
        <circle cx="42" cy="42" r="3" fill="currentColor" />
        <path className={styles.sensorTrace} d="M12 45H24L29 35L35 53L42 25L50 48L56 39L62 45H72" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}
