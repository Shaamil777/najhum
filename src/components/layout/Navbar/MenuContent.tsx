"use client";

import { useId, useState, type CSSProperties } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, ChevronRight, Cpu, Plug, Sprout, HelpCircle } from "lucide-react";
import { buildSolutionGroups, type PublishedSolutionItem } from "./menu-data";
import styles from "./Navigation.module.css";

const platforms = [
  { name: "IoTRICs", tag: "Industrial IoT", href: "/platforms/iotrics", desc: "Industrial IoT, smart building, digital twin and telemetry.", accent: "#167DE4", soft: "#EAF3FD", dark: "#1565C8", tint: "#F3F8FE", points: ["Live sensor telemetry", "Digital twin of your site", "Alerts and predictive insight"], Icon: Cpu },
  { name: "EVOLTICS", tag: "EV charging", href: "/platforms/evoltics", desc: "EV charging infrastructure and smart CSMS management.", accent: "#2F9DB8", soft: "#E3F4F8", dark: "#0C2733", tint: "#F2FAFC", points: ["Charger monitoring and control", "Load balancing across sites", "Payment gateway integration"], Icon: Plug },
  { name: "cropifAI", tag: "Smart agriculture", href: "/platforms/cropifai", desc: "Precision agriculture and automated climate intelligence.", accent: "#16A34A", soft: "#E7F7EC", dark: "#13783D", tint: "#F3FBF5", points: ["Field and soil sensing", "Automated climate control", "AI crop insights"], Icon: Sprout },
];

export function PlatformMenuContent({ mobile = false, onNavigate }: { mobile?: boolean; onNavigate: () => void }) {
  const [active, setActive] = useState(0);
  const current = platforms[active];
  return (
    <div className={`${styles.content} ${mobile ? styles.mobileContent : ""}`}>
      <div className={styles.platformBody}>
        <div className={styles.platformList}>
          {!mobile && <div className={styles.listHeading}><strong>Our platforms</strong><span>Three platforms, one operating model</span></div>}
          {platforms.map(({ name, tag, href, desc, Icon, accent, soft, tint }, index) => (
            <Link key={href} href={href} onClick={onNavigate} onMouseEnter={() => setActive(index)} onFocus={() => setActive(index)} style={{ "--platform-accent": accent, "--platform-soft": soft, "--platform-tint": tint } as CSSProperties} className={`${styles.platformRow} ${index === active ? styles.activeRow : ""}`}>
              <span className={styles.platformIcon}><Icon size={26} strokeWidth={1.8} aria-hidden="true" /></span>
              <span className={styles.platformText}><span className={styles.platformName}>{name}<span className={styles.tag}>{tag}</span></span><span className={styles.description}>{desc}</span></span>
              {mobile ? <ChevronRight size={16} aria-hidden="true" /> : <ArrowRight className={styles.rowArrow} size={16} aria-hidden="true" />}
            </Link>
          ))}
        </div>
        {!mobile && <aside className={styles.platformPreview} style={{ background: current.dark }}>
          <div key={current.name} className={styles.previewCopy}>
            <span className={styles.previewTag}>{current.tag}</span><strong className={styles.previewName}>{current.name}</strong><p>{current.desc}</p>
            <ul>{current.points.map(point => <li key={point}><Check size={16} aria-hidden="true" />{point}</li>)}</ul>
            <Link href={current.href} onClick={onNavigate} className={styles.explore}>Explore {current.name}<ArrowUpRight size={16} aria-hidden="true" /></Link>
          </div>
        </aside>}
      </div>
      {mobile ? <p className={styles.mobileNote}>All three run on the 3C methodology: Collect, Connect, Collaborate.</p> : <MenuFooter onNavigate={onNavigate} platforms />}
    </div>
  );
}

function MenuFooter({ onNavigate, platforms = false }: { onNavigate: () => void; platforms?: boolean }) {
  return <div className={styles.menuFooter}><span><HelpCircle size={18} aria-hidden="true" />{platforms ? "Every platform runs on the same 3C methodology: Collect, Connect, Collaborate." : "Not sure which solution fits? Our engineers will map it to your site."}</span><Link href="/contact#contact-form" onClick={onNavigate} className={styles.primary}>{platforms ? "Request a demo" : "Plan your solution"}</Link></div>;
}

export function SolutionsMenuContent({ solutions, mobile = false, onNavigate }: { solutions: PublishedSolutionItem[]; mobile?: boolean; onNavigate: () => void }) {
  const [active, setActive] = useState<"industry" | "usecase">("industry");
  const id = useId();
  const groups = buildSolutionGroups(solutions);
  const current = groups[active];
  return <div className={`${styles.content} ${mobile ? styles.mobileContent : ""}`}>
    <div className={styles.solutionsBody}>
      <div className={styles.solutionRail}>
        {!mobile && <span className={styles.railLabel}>Browse solutions</span>}
        <div role="tablist" aria-label="Browse solutions" aria-orientation={mobile ? "horizontal" : "vertical"} className={styles.tabs}>
          {(["industry", "usecase"] as const).map(key => <button key={key} id={`${id}-${key}`} role="tab" type="button" aria-selected={active === key} aria-controls={`${id}-panel`} tabIndex={active === key ? 0 : -1} onClick={() => setActive(key)} onKeyDown={event => { if (["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown", "Home", "End"].includes(event.key)) { event.preventDefault(); const next = event.key === "Home" ? "industry" : event.key === "End" ? "usecase" : key === "industry" ? "usecase" : "industry"; setActive(next); document.getElementById(`${id}-${next}`)?.focus(); } }}>
            <span>{groups[key].label}{!mobile && <small>{groups[key].hint}</small>}</span><span className={styles.count}>{groups[key].items.length}</span>
          </button>)}
        </div>
        {!mobile && <Link href="/solutions" onClick={onNavigate} className={styles.viewAll}>View all solutions<ArrowRight size={16} aria-hidden="true" /></Link>}
      </div>
      <div className={styles.solutionPanel} id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-${active}`}>
        <div className={styles.solutionItems}>
          {!mobile && <div className={styles.listHeading}><strong>{current.heading}</strong><span>{current.subheading}</span></div>}
          <div className={styles.solutionGrid}>
            {current.items.map(item => <Link key={item.href} href={item.href} onClick={onNavigate} className={styles.solutionRow}>
              <span className={styles.solutionIcon}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={item.d} /></svg></span>
              <span className={styles.solutionText}><strong>{item.title}</strong><span>{item.desc}</span></span><ChevronRight className={styles.rowArrow} size={16} aria-hidden="true" />
            </Link>)}
          </div>
        </div>
        <aside className={styles.featured}>
          <span className={styles.previewTag}>Featured</span><strong>{current.featured.title}</strong>{!mobile && <p>{current.featured.desc}</p>}
          <Link href={current.featured.href} onClick={onNavigate} aria-label={`Explore ${current.featured.title}`}> {mobile ? "Explore" : "Explore solution"}<ArrowRight size={17} aria-hidden="true" /></Link>
        </aside>
      </div>
      {mobile && <Link href="/solutions" onClick={onNavigate} className={styles.viewAll}>View all solutions<ArrowRight size={16} aria-hidden="true" /></Link>}
    </div>
    {!mobile && <MenuFooter onNavigate={onNavigate} />}
  </div>;
}
