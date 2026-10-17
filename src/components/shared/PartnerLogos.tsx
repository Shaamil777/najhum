import Image from "next/image";
import styles from "./PartnerLogos.module.css";

export type PartnerLogo = { name: string; src: string; dark?: boolean };
export const HOME_PARTNERS: PartnerLogo[] = [
  { name: "Locator", src: "/logo/partners/locator.avif" },
  { name: "MITTCO", src: "/logo/partners/mittco.png" },
  { name: "Polfrost UAE", src: "/logo/partners/polfrost.png" },
  { name: "Prestige Saudi Co. Ltd.", src: "/logo/partners/prestigeSaudi.png" },
  { name: "ReFarm Global", src: "/logo/partners/refarm.svg", dark: true },
  { name: "Space42", src: "/logo/partners/space42.svg", dark: true },
];
export const EVOLTICS_PARTNERS: PartnerLogo[] = [
  { name: "Sungrow", src: "/logo/evoltics_client/sungrow.svg" },
  { name: "Gargash", src: "/logo/evoltics_client/gargash.avif" },
  { name: "Lumetra", src: "/logo/evoltics_client/lumetra.png" },
  { name: "Taqon Electric", src: "/logo/evoltics_client/taqon.png" },
  { name: "Energy Solutions", src: "/logo/evoltics_client/energy_solution.png" },
  { name: "Copak", src: "/logo/evoltics_client/copak.webp", dark: true },
  { name: "EV Energy", src: "/logo/evoltics_client/evEnergy.png", dark: true },
  { name: "Forza Al Khaleej", src: "/logo/evoltics_client/forzaalkhaleej.jpg" },
  { name: "NeoTechniq", src: "/logo/evoltics_client/neotechniq.avif" },
  { name: "Polfrost Dubai", src: "/logo/evoltics_client/polforest.png" },
];

export default function PartnerLogos({ logos, compact = false }: { logos: PartnerLogo[]; compact?: boolean }) {
  return (
    <div className={`${styles.marquee} ${compact ? styles.compact : ""}`} tabIndex={0} role="group" aria-label="Partner logos. Hover or focus to pause scrolling.">
      <div className={styles.track}>
        {[0, 1].map(copy => (
          <ul key={copy} className={styles.group} aria-hidden={copy === 1 ? true : undefined}>
            {logos.map(logo => (
              <li key={logo.src} className={`${styles.tile} ${logo.dark ? styles.lightArtwork : ""}`}>
                <div className={styles.artwork}>
                  <Image src={logo.src} alt={copy === 0 ? logo.name : ""} fill sizes={compact ? "156px" : "240px"} className={styles.logo} />
                </div>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
