import styles from "./ImpactMotion.module.css";

/** Static decorative dot grid for the impact cards. */
export default function ImpactDotWave({ id, dark = false }: { id: string; dark?: boolean }) {
  const patternId = `impact-dot-wave-${id}`;
  return (
    <svg className={`${styles.dotWave} ${dark ? styles.darkDots : ""}`} width="100%" height="100%" aria-hidden="true" focusable="false">
      <defs>
        <pattern id={patternId} width="192" height="192" patternUnits="userSpaceOnUse">
          {Array.from({ length: 64 }, (_, index) => {
            const column = index % 8;
            const row = Math.floor(index / 8);
            return <circle key={index} className={styles.waveDot} cx={12 + column * 24} cy={12 + row * 24} r="2" />;
          })}
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
}
