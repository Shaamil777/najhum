"use client";

import { useState, type CSSProperties } from "react";
import { Activity, LayoutDashboard, Wrench, Share2, Zap, Plug, Check, X, ArrowRight, Repeat2 } from "lucide-react";
import { homeContent } from "@/content/home";
import styles from "./WhyChoose.module.css";

const icons = [Activity, LayoutDashboard, Wrench, Share2, Zap, Plug];
const tilts = [-1.8, 1.4, -1.1, 1.7, -1.5, 1.2];

export default function WhyChoose() {
  const { features } = homeContent.whyChoose;
  const [connected, setConnected] = useState<boolean[]>(() => features.map(() => false));
  const count = connected.filter(Boolean).length;
  const allOn = count === features.length;
  const setAll = (value: boolean) => setConnected(features.map(() => value));

  return (
    <section id="why-choose" className={styles.section} aria-labelledby="compare-heading">
      <span className={styles.glow} style={{ opacity: count / features.length }} aria-hidden="true" />
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.copy}>
            <span className={styles.eyebrow}>Same assets. Different operation.</span>
            <h2 id="compare-heading">Flip the switch on <span className={allOn ? styles.blue : undefined}>how you operate.</span></h2>
            <p><span className={styles.desktopCopy}>Toggle to see what changes when every asset reports to one platform, or tap any card to flip it.</span><span className={styles.mobileCopy}>Toggle all six, or tap a card to flip it.</span></p>
          </div>
          <div className={styles.controls}>
            <div className={styles.toggle} role="group" aria-label="Compare traditional systems with Najhum">
              <span aria-hidden="true" className={`${styles.pill} ${allOn ? styles.pillOn : ""} ${count > 0 && !allOn ? styles.pillMixed : ""}`} />
              <button type="button" aria-pressed={count === 0} onClick={() => setAll(false)}><X size={16} aria-hidden="true" />Instead of</button>
              <button type="button" aria-pressed={allOn} onClick={() => setAll(true)}><Check size={16} aria-hidden="true" />Najhum gives</button>
            </div>
            <div className={styles.progress}>
              <span>Connected</span>
              <div className={styles.track} role="progressbar" aria-label="Connected capabilities" aria-valuemin={0} aria-valuemax={features.length} aria-valuenow={count}><span style={{ width: `${count / features.length * 100}%` }} /></div>
              <strong aria-live="polite" aria-atomic="true">{count}<small>/{features.length}</small></strong>
            </div>
          </div>
        </div>

        <div className={styles.tiles} aria-label="Tap a capability to compare">
          {features.map((feature, index) => {
            const on = connected[index];
            const Icon = icons[index];
            return (
              <button key={feature.id} type="button" className={`${styles.tile} ${on ? styles.connected : ""}`} style={{ "--tilt": `${tilts[index]}deg`, "--delay": `${index * 60}ms` } as CSSProperties} aria-pressed={on} aria-label={`${feature.name}: ${on ? "Najhum gives" : "Instead of"}. Tap to ${on ? "disconnect" : "connect"}.`} onClick={() => setConnected(previous => previous.map((value, i) => i === index ? !value : value))}>
                <span className={styles.tileHeader}>
                  <span className={styles.icon}><Icon size={22} aria-hidden="true" strokeWidth={1.8} /></span>
                  <span className={styles.title}><span>{feature.id}<span className={styles.mobileNumber}> / 06</span></span><strong>{feature.name}</strong></span>
                </span>
                <span className={styles.label}>{on ? "With Najhum" : "Instead of"}</span>
                <span className={styles.statement}>{on ? feature.najhum : feature.competitor}</span>
                <span className={styles.badge}>{on ? "Connected" : "Disconnected"}</span>
              </button>
            );
          })}
        </div>
        <div className={styles.footer}>
          <span><Repeat2 size={17} aria-hidden="true" />{count === 0 ? "Tap a card to flip it." : allOn ? "One platform, any vendor, every asset." : "Getting there — keep flipping."}</span>
          <span className={styles.swipe}>Swipe <ArrowRight size={16} aria-hidden="true" /></span>
        </div>
      </div>
    </section>
  );
}
