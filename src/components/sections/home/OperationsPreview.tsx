import { ArrowRight, Bell, Check, Download } from "lucide-react";
import styles from "./OperationsPreview.module.css";

/** Illustrative platform activity; no live customer data is represented. */
export default function OperationsPreview({ kind }: { kind: string }) {
  return (
    <div className={styles.preview} aria-hidden="true">
      {kind === "1" && (
        <>
          <div className={styles.toolbar}>
            <div className={styles.skeletons}><i /><i /></div>
            <span className={styles.live}><i /> LIVE</span>
          </div>
          <svg className={styles.chart} viewBox="0 0 280 100" fill="none">
            <path d="M0 25H280M0 55H280M0 85H280" className={styles.grid} />
            <path className={styles.area} d="M0 80 L28 72 L56 76 L84 53 L112 59 L140 37 L168 45 L196 27 L224 35 L252 19 L280 12 L280 100 L0 100 Z" />
            <path className={styles.line} d="M0 80 L28 72 L56 76 L84 53 L112 59 L140 37 L168 45 L196 27 L224 35 L252 19 L280 12" />
            <path className={styles.scan} d="M0 0V100" />
          </svg>
        </>
      )}
      {kind === "2" && (
        <div className={styles.alertDemo}>
          <div className={styles.notification}>
            <span className={styles.bell}><Bell size={18} strokeWidth={1.8} /></span>
            <div className={styles.notificationText}><span>Threshold detected</span><i /></div>
            <span className={styles.notificationDot} />
          </div>
          <div className={styles.route}><ArrowRight size={15} /><span>Routed to on-site team</span></div>
          <div className={styles.routeTrack}><i /></div>
        </div>
      )}
      {kind === "3" && (
        <div className={styles.auditDemo}>
          {[0, 1, 2].map((row) => (
            <div className={styles.record} key={row}>
              <Check size={14} strokeWidth={2.5} /><i /><span />
            </div>
          ))}
          <span className={styles.export}><Download size={12} /> Export</span>
        </div>
      )}
      {kind === "4" && (
        <svg className={styles.integration} viewBox="0 0 280 140" fill="none">
          <g className={styles.connections}>
            <path d="M84 70 C126 70 126 28 180 28" />
            <path d="M84 70 H180" />
            <path d="M84 70 C126 70 126 112 180 112" />
          </g>
          <g className={styles.packets}>
            <path d="M84 70 C126 70 126 28 180 28" />
            <path d="M84 70 H180" />
            <path d="M84 70 C126 70 126 112 180 112" />
          </g>
          <circle className={styles.hubHalo} cx="70" cy="70" r="29" />
          <circle cx="70" cy="70" r="23" fill="currentColor" />
          <text x="70" y="76" textAnchor="middle" fill="white" fontSize="19" fontWeight="800">N</text>
          {['BMS', 'ERP', 'BI'].map((label, index) => (
            <g key={label}>
              <rect x="180" y={12 + index * 42} width="66" height="32" rx="10" fill="white" stroke="#e4e4e7" />
              <text x="213" y={32 + index * 42} textAnchor="middle" fill="#18181b" fontSize="11" fontWeight="700">{label}</text>
            </g>
          ))}
        </svg>
      )}
    </div>
  );
}
