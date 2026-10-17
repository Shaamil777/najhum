"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Box, Check, Cloud, Info, ShieldCheck, Wifi } from "lucide-react";
import styles from "./BusinessModels.module.css";

const layers = [
  { name: "Platform & data storage", sub: "Dashboards, alerts, history", Icon: Cloud, paas: "included" },
  { name: "Connectivity", sub: "Getting data from site to cloud", Icon: Wifi, paas: "scoped" },
  { name: "Maintenance & warranty", sub: "AMC, replacements, lifecycle", Icon: ShieldCheck, paas: "scoped" },
  { name: "Hardware", sub: "Sensors, gateways, controllers", Icon: Box, paas: "owned" },
] as const;
const models = {
  solaas: { lead: "Everything in one subscription. You get the outcome; we own and maintain the hardware.", pay: "One fixed monthly or annual fee", points: [{ title: "Zero upfront hardware cost", text: "Devices, gateways and connectivity included." }, { title: "Predictable OPEX", text: "No surprise maintenance or replacement bills." }, { title: "Fully managed", text: "AMC, warranty and the full device lifecycle." }], best: "Our primary model — best for most sites.", summary: "Every layer, one subscription. Nothing to buy, nothing to maintain." },
  paas: { lead: "For large-scale projects. You buy the hardware once and own it; we license the platform.", pay: "One-time hardware + platform subscription", points: [{ title: "Full hardware ownership", text: "A one-time purchase; the assets are yours." }, { title: "Lower ongoing costs", text: "The subscription covers only the cloud platform and data storage." }], best: "Built for enterprise and city-scale rollouts.", summary: "You own the hardware. We run the platform. Connectivity and maintenance are agreed per project." },
};
export default function BusinessModels() {
  const [selected, setSelected] = useState<"solaas" | "paas">("solaas");
  const model = models[selected];
  return <section id="business-models" aria-labelledby="business-models-heading" className={styles.section}>
    <div className={styles.container}>
      <header className={styles.header}><div><p className={styles.eyebrow}>HOW YOU BUY IT</p><h2 id="business-models-heading">One platform. <span>Two ways to own it.</span></h2></div>
        <div className={styles.toggle} role="group" aria-label="Business model">
          <span className={`${styles.pill} ${selected === "paas" ? styles.pillRight : ""}`} aria-hidden="true" />
          <button type="button" aria-pressed={selected === "solaas"} onClick={() => setSelected("solaas")}><strong>SolaaS</strong><span>★ Recommended</span></button>
          <button type="button" aria-pressed={selected === "paas"} onClick={() => setSelected("paas")}><strong>PaaS</strong><span>For large projects</span></button>
        </div>
      </header>
      <div className={styles.columns}>
        <div className={styles.details} aria-live="polite" aria-atomic="true"><p className={styles.lead}>{model.lead}</p><div className={styles.payment}><span>YOU PAY</span><strong>{model.pay}</strong></div>
          <ul className={styles.points}>{model.points.map(point => <li key={point.title}><span><Check size={14} aria-hidden="true" /></span><div><strong>{point.title}</strong><p>{point.text}</p></div></li>)}</ul>
          <div className={styles.cta}>{selected === "paas" && <Link href="/contact#contact-form">Discuss a PaaS deployment<ArrowRight size={16} aria-hidden="true" /></Link>}<p>{model.best}</p></div>
        </div>
        <div className={styles.coverage}><div className={styles.coverageHeader}><h3>What&apos;s covered</h3><ul aria-label="Coverage key"><li><i className={styles.includedKey} />In your subscription</li><li><i className={styles.ownedKey} />Yours to own</li><li><i className={styles.scopedKey} />Scoped per project</li></ul></div>
          <div className={styles.layers}>{layers.map(({ name, sub, Icon, paas }, i) => { const status = selected === "solaas" ? "included" : paas; return <div key={name} className={`${styles.layer} ${styles[status]}`} style={{ transitionDelay: `${i * 70}ms` }}><span className={styles.layerIcon}><Icon size={20} aria-hidden="true" /></span><div><strong>{name}</strong><p>{sub}</p></div><span className={styles.status}>{status === "included" ? "Included" : status === "owned" ? "Yours · bought once" : "Per project"}</span></div>; })}</div>
          <div className={styles.summary} aria-live="polite"><Info size={20} aria-hidden="true" /><p>{model.summary}</p></div>
        </div>
      </div>
    </div>
  </section>;
}
