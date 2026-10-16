"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import { ArrowUpRight, Cpu, LockKeyhole, Plug, Plus, Sparkles, Sprout } from "lucide-react";
import { homeContent } from "@/content/home";
import styles from "./HomePlatformCards.module.css";

const themes = [
  { tag: "EV charging", colour: "#0C2733", accent: "#2F9DB8", light: "#7FD3E3", description: "Charger management, load balancing and payments.", Icon: Plug },
  { tag: "Industrial IoT", colour: "#1565C8", accent: "#167DE4", light: "#8CC2FF", description: "The operating system for industrial IoT.", Icon: Cpu },
  { tag: "Smart agriculture", colour: "#13783D", accent: "#16A34A", light: "#6EE7A0", description: "AI insights for yield and food security.", Icon: Sprout },
];

export default function HomePlatformCards() {
  const [active, setActive] = useState(1);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: .25 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    // On touch screens the selected card stays open; there is no automatic page movement.
    const media = window.matchMedia("(min-width: 1024px) and (hover: hover) and (prefers-reduced-motion: no-preference)");
    if (!visible || paused || !media.matches) return;
    const timer = window.setTimeout(() => setActive(previous => (previous + 1) % 3), 6000);
    return () => window.clearTimeout(timer);
  }, [active, paused, visible]);

  return <div ref={ref} className={styles.cards} aria-label="Explore our platforms" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocusCapture={() => setPaused(true)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false); }}>
    {homeContent.platforms.items.map((platform, index) => {
      const selected = index === active;
      const theme = themes[index];
      const Icon = theme.Icon;
      return <article key={platform.id} className={`${styles.card} ${selected ? styles.active : ""}`} style={{ "--card-bg": theme.colour, "--card-accent": theme.accent, "--card-light": theme.light } as CSSProperties} onMouseEnter={() => setActive(index)}>
        <button type="button" className={styles.heading} aria-expanded={selected} aria-controls={`home-platform-${platform.id}`} onClick={() => setActive(index)}>
          <span className={styles.headingCopy}><span className={styles.tag}>{theme.tag}</span><span className={styles.name}>{platform.title}</span></span><span className={styles.icon}><Icon size={23} strokeWidth={1.8} aria-hidden="true" /></span>
        </button>
        {selected ? <div id={`home-platform-${platform.id}`} className={styles.expanded}>
          <p className={styles.description}>{platform.description}</p>
          <div className={styles.preview} aria-label={`${platform.title} illustrative dashboard preview`}>
            {platform.id === "evoltics" ? <ChargingPreview /> : platform.id === "iotrics" ? <TelemetryPreview /> : <AgriculturePreview />}
          </div>
          <Link href={`/platforms/${platform.id}`} className={styles.explore}>Explore {platform.title}<ArrowUpRight size={17} aria-hidden="true" /></Link>
          <span className={styles.progress} aria-hidden="true"><span key={active} style={{ animationPlayState: paused || !visible ? "paused" : "running" }} /></span>
        </div> : <div className={styles.collapsed}><p>{theme.description}</p><button type="button" onClick={() => setActive(index)} aria-label={`View ${platform.title} preview`}><span><Plus size={15} aria-hidden="true" /></span>View platform</button></div>}
      </article>;
    })}
  </div>;
}

function TelemetryPreview() {
  return <div className={styles.telemetry}>
    {[["Temperature", "24.3", "°C"], ["Humidity", "52.2", "%"], ["Occupancy", "3", " people"]].map(([label, value, unit]) => <div key={label} className={styles.widget}><span className={styles.label}>{label}</span><strong>{value}<small>{unit}</small></strong></div>)}
    <div className={`${styles.widget} ${styles.trend}`}><span className={styles.widgetHeader}><span className={styles.label}>Live trend</span><span className={styles.live}><i />Live</span></span><svg viewBox="0 0 300 90" preserveAspectRatio="none" aria-hidden="true"><path d="M0 70L25 62L50 66L75 48L100 54L125 36L150 42L175 28L200 34L225 20L250 26L275 14L300 18V90H0Z" fill="#ffffff29" /><path className={styles.spark} d="M0 70L25 62L50 66L75 48L100 54L125 36L150 42L175 28L200 34L225 20L250 26L275 14L300 18" fill="none" stroke="white" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" /></svg></div>
    <div className={styles.widget}><span className={styles.label}>Networks</span><span className={styles.networks}>{["LoRaWAN", "LTE", "Wi-Fi", "BLE"].map(name => <span key={name}>{name}</span>)}</span><span className={styles.security}><LockKeyhole size={13} aria-hidden="true" />Encrypted end to end</span></div>
  </div>;
}
function ChargingPreview() {
  return <div className={styles.dashboardColumns}>
    <div className={styles.widget}><span className={styles.label}>Chargers</span><div className={styles.chargers}>{["Charging", "Charging", "Available", "Available", "Charging", "Offline"].map((status, index) => <span key={index}><strong>CP-0{index + 1}</strong><small className={status === "Offline" ? styles.offline : status === "Available" ? styles.available : styles.charging}><i />{status}</small></span>)}</div></div>
    <div className={styles.widget}><span className={styles.widgetHeader}><span className={styles.label}>Site load</span><span className={styles.live}>Balanced</span></span><div className={styles.bars}><span className={styles.limit} />{[42,58,71,76,74,75,63,48].map((height,index) => <span key={index} style={{ height: `${height}%`, animationDelay: `${index * .06}s`, background: index === 4 || index === 5 ? "#3BB0C9" : "#ffffff75" }} />)}</div><span className={styles.chartNote}>Grid limit — demand shared across chargers</span></div>
  </div>;
}
function AgriculturePreview() {
  return <div className={styles.dashboardColumns}>
    <div className={styles.widget}><span className={styles.label}>Crop health by zone</span><div className={styles.field}>{Array.from({length:24},(_,index) => <span key={index} className={index === 8 ? styles.stressed : ""} style={{ backgroundColor: index === 8 ? "#fb923c" : `rgba(134,239,172,${[.85,.7,.55,.6,.75,.8,.65,.4,.9,.35,.6,.7,.5,.3,.35,.45,.65,.8,.75,.6,.5,.65,.85,.9][index]})` }} />)}</div><span className={styles.legend}>Stressed<i />Healthy</span></div>
    <div className={styles.insights}><div className={styles.widget}><span className={styles.insightLabel}><Sparkles size={14} aria-hidden="true" />AI insight</span><strong className={styles.insightText}>Zone B3 shows early water stress.</strong><span className={styles.chartNote}>Suggested: irrigate early morning.</span></div><div className={styles.widget}><span className={styles.label}>Field sensors</span><span className={styles.live}><i />Reporting</span></div></div>
  </div>;
}
