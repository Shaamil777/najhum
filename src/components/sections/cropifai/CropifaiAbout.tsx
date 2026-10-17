"use client";

import { useState } from "react";
import { CalendarDays, CloudSun, Droplets, Gauge, LockKeyhole, Radio, Smartphone, TrendingUp, Waves, Wifi } from "lucide-react";
import { cropifaiContent } from "@/content/cropifai";
import styles from "./CropifaiAbout.module.css";

function Connector({ secure = false }: { secure?: boolean }) {
  return <div className={styles.connector} aria-hidden="true">{secure && <span className={styles.secure}><LockKeyhole size={13} />Secure</span>}<div className={styles.pipe}><i /><i /><b /></div>{secure && <small>To the cloud</small>}</div>;
}

export default function CropifaiAbout() {
  const [override, setOverride] = useState(false);
  const { header } = cropifaiContent.about;
  const measurements = [
    { title: "Soil parameters", Icon: Droplets },
    { title: "Irrigation flow", Icon: Waves },
    { title: "Tank level", Icon: Gauge },
    { title: "Local weather", Icon: CloudSun },
  ];
  const outcomes = [
    { title: "See the trend", text: "Soil and water readings over time, zone by zone.", Icon: TrendingUp },
    { title: "Set the schedule", text: "Irrigate by time, threshold or zone.", Icon: CalendarDays },
    { title: "Override from anywhere", text: "Open or close a valve from your phone.", Icon: Smartphone },
  ];
  return <section id="cropifai-about" aria-labelledby="cropifai-about-heading" className={styles.section}>
    <div className={styles.container}>
      <header className={styles.header}>
        <div><p className={styles.eyebrow}>{header.tag}</p><h2 id="cropifai-about-heading">{header.titlePart1} {header.titlePart2}<span> {header.highlight}.</span></h2></div>
        <p>Wireless sensors and smart valves report from the field to one platform — no wiring, no field network to build.</p>
      </header>
      <div className={styles.flow}>
        <article className={`${styles.panel} ${styles.field}`}>
          <div className={styles.panelLabel}><span>01 · IN THE FIELD</span><small>Sensors &amp; valves</small></div>
          <h3>What we measure and control</h3>
          <div className={styles.measurements}>{measurements.map(({ title, Icon }, i) => <div className={styles.measurement} key={title}><span className={styles.icon}><Icon size={18} aria-hidden="true" /></span><strong>{title}</strong><i className={styles.liveDot} style={{ animationDelay: `${i * .3}s` }} aria-hidden="true" /></div>)}
            <div className={`${styles.measurement} ${styles.valve}`}><span className={styles.icon}><Radio size={18} aria-hidden="true" /></span><span><strong>Smart valve controller</strong><small>Opens and closes on command</small></span><b>CONTROL</b></div>
          </div>
        </article>
        <Connector />
        <article className={`${styles.panel} ${styles.wireless}`}>
          <div className={styles.panelLabel}>02 · CONNECTIVITY</div><h3>Wireless, built in</h3>
          <div className={styles.wirelessVisual} aria-hidden="true"><div><i /><i /><i /><span><Wifi size={28} /></span></div></div>
          <p>Every sensor and smart valve carries its own transmitter. Readings go up, commands come back.</p>
        </article>
        <Connector secure />
        <article className={`${styles.panel} ${styles.dashboard}`} aria-label="Illustrative cropifAI dashboard">
          <div className={styles.panelLabel}><span>03 · ON THE PLATFORM</span><small><i className={styles.liveDot} aria-hidden="true" />LIVE DEMO</small></div><h3>cropifAI dashboard</h3>
          <div className={styles.chart}><div><span>SOIL · ZONE A</span><span>7 DAYS</span></div><svg viewBox="0 0 300 70" preserveAspectRatio="none" aria-hidden="true"><path d="M0 50 30 44 60 48 90 36 120 40 150 28 180 34 210 22 240 30 270 18 300 24V70H0Z" fill="currentColor" opacity=".16" /><path className={styles.spark} d="M0 50 30 44 60 48 90 36 120 40 150 28 180 34 210 22 240 30 270 18 300 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" /></svg></div>
          <div className={styles.override}><span className={styles.icon}><Radio size={18} aria-hidden="true" /></span><div><strong>Valve · Zone A</strong><span>{override ? "Open now · manual override" : "Scheduled · tomorrow 05:30"}</span></div><button type="button" role="switch" aria-checked={override} aria-label="Demo valve manual override" onClick={() => setOverride(!override)} className={`${styles.switch} ${override ? styles.switchOn : ""}`}><span /></button></div>
          <p className={styles.hint} aria-live="polite">{override ? "Demo valve opened. Tap again to return to schedule." : "Try the demo switch to override the schedule."}</p>
        </article>
      </div>
      <div className={styles.outcomes}>{outcomes.map(({ title, text, Icon }) => <article key={title}><span className={styles.icon}><Icon size={21} aria-hidden="true" /></span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div>
      <p className={styles.originalDescription}>{header.description}</p>
    </div>
  </section>;
}
