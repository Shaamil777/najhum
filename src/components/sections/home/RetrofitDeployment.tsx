"use client";

import { useEffect, useRef, useState } from "react";
import { Building2, Gauge, Cpu, Cloud } from "lucide-react";
import styles from "./RetrofitDeployment.module.css";

/** The approved Plug-in deployment motion: existing assets stay fixed as a controller docks. */
export default function RetrofitDeployment() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: .15 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={`${styles.panel} ${visible ? styles.visible : ""}`} role="img" aria-label="Plug-in deployment: a Najhum controller docks alongside unchanged existing assets, connecting them to one platform.">
    <span className={styles.caption}>Add the controller. Keep the equipment.</span>
    <div className={styles.diagram} aria-hidden="true">
      <div className={styles.connection}><span /><span /></div>
      <div className={styles.asset}><div className={styles.assetIcons}><Building2 size={25} strokeWidth={1.7} /><Gauge size={25} strokeWidth={1.7} /></div><strong>Existing assets</strong><small>Stay in place</small></div>
      <div className={styles.dock}><div className={styles.module}><Cpu size={34} strokeWidth={1.7} /><strong>NAJHUM</strong></div><span className={styles.statusLeft} /><span className={styles.statusRight} /><span className={styles.dockLabel}>Add one controller</span></div>
      <div className={styles.asset}><Cloud size={31} strokeWidth={1.7} /><strong>Platform</strong><small>Connected view</small></div>
    </div>
  </div>;
}
