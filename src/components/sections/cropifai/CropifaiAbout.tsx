import { CloudSun, Database, Droplets, Lightbulb, Wifi } from "lucide-react";
import { cropifaiContent } from "@/content/cropifai";
import styles from "./CropifaiAbout.module.css";

function ConnectedField() {
  return (
    <svg viewBox="0 0 520 320" className={styles.field} fill="none" aria-hidden="true">
      <defs>
        <clipPath id="cropifai-field-boundary"><path d="M62 164 275 42 487 164 275 289Z" /></clipPath>
      </defs>
      <path d="M62 174 275 52 487 174 275 299Z" fill="#d1dbdc" />
      <path d="M62 164 275 42 487 164 275 289Z" fill="#e3ece5" />
      <g clipPath="url(#cropifai-field-boundary)">
        {Array.from({ length: 7 }, (_, i) => (
          <path key={i} d={`M${85 + i * 29} 106l85 49-130 75-85-49z`} fill={i % 2 ? "#b6d3bf" : "#c7ddce"} stroke="#f5faf6" strokeWidth="4" />
        ))}
      </g>
      <path d="M79 181 271 70 462 180M274 278V190l-50-29" stroke="white" strokeWidth="10" />
      <path className={styles.route} d="M110 168 271 75 446 176 275 272V190l-50-29" stroke="currentColor" strokeWidth="3" strokeDasharray="4 7" />
      <path d="m326 105 36-21 39 22v43l-38 22-37-22z" fill="#edf4ff" stroke="#9abcf7" />
      <path d="m326 105 37 22 38-21m-38 21v44" stroke="#9abcf7" />
      <path d="m349 108 14 8 14-8-14-8z" fill="currentColor" />
      {[[140, 171], [273, 231], [402, 183]].map(([cx, cy], i) => (
        <g key={cx}>
          <circle cx={cx} cy={cy} r="10" fill="white" stroke="currentColor" strokeWidth="2" />
          <circle className={styles.marker} cx={cx} cy={cy} r="4" fill="currentColor" style={{ animationDelay: `${i * 0.8}s` }} />
        </g>
      ))}
    </svg>
  );
}

export default function CropifaiAbout() {
  const { about } = cropifaiContent;
  const steps = about.steps.map((step, index) => ({ ...step, icon: [Database, Wifi, Lightbulb][index] }));
  // These labels are excerpts from the existing description, not new product claims.
  const readings = [
    { icon: Droplets, text: "moisture and salinity at root depth" },
    { icon: Database, text: "flow through the irrigation main" },
    { icon: CloudSun, text: "tank levels, valve position and local weather" },
  ];

  return (
    <section id="cropifai-about" aria-labelledby="cropifai-about-heading" className={styles.section}>
      <div className={`container mx-auto px-6 ${styles.layout}`}>
        <div className={styles.introduction}>
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4">{about.header.tag}</p>
          <h2 id="cropifai-about-heading" className="text-4xl md:text-5xl lg:text-6xl font-black font-display text-zinc-900 leading-tight tracking-tight">
            {about.header.titlePart1}{" "}{about.header.titlePart2}{" "}<span className="text-primary">{about.header.highlight}</span>
          </h2>
          <div className={styles.mosaic} aria-hidden="true">
            <div className={styles.fieldTile}>
              <ConnectedField />
              <span className={styles.fieldBadge}><Wifi size={16} />LPWAN</span>
            </div>
            <div className={styles.readings}>
              {readings.map(({ icon: Icon, text }) => (
                <div className={styles.reading} key={text}>
                  <span className={styles.readingIcon}><Icon size={20} /></span>
                  <span className={styles.readingLabel}>{text}</span>
                  <span className={styles.spark}>{Array.from({ length: 5 }, (_, i) => <i key={i} />)}</span>
                </div>
              ))}
            </div>
          </div>
          <p className={`text-lg md:text-xl text-zinc-600 leading-relaxed font-medium ${styles.description}`}>{about.header.description}</p>
        </div>
        <div className={styles.stack}>
          {steps.map(({ icon: Icon, ...step }, index) => (
            <article className={`${styles.card} ${index === 0 ? styles.primaryCard : ""}`} key={step.num}>
              <span className={styles.stepIcon}><span className={styles.ring} aria-hidden="true" /><Icon size={25} aria-hidden="true" /></span>
              <div className={styles.stepBody}>
                <span className={styles.number}>{step.num.padStart(2, "0")}</span>
                <h3>{step.title}</h3>
                <div className={styles.activity} aria-hidden="true">{Array.from({ length: 5 }, (_, i) => <i key={i} />)}</div>
                <p>{step.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
