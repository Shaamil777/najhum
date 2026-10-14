import Image from 'next/image';
import type { CSSProperties } from 'react';
import { ArrowRight, BarChart3, Cpu, Layers, Network, ShieldCheck } from 'lucide-react';
import type { IntroContent } from '@/types/section';
import { sanitizeContent } from '@/lib/utils/sanitize-content';
import styles from './IntroSection.module.css';

const highlightIcons = { network: Network, layers: Layers, shield: ShieldCheck, cpu: Cpu, chart: BarChart3 };
const defaultIcons = ['network', 'layers', 'shield', 'cpu'] as const;

export default function IntroSection({ content }: { content: IntroContent }) {
  const highlights = content.highlights || [];
  const stats = content.stats || [];
  const flowSteps = content.flowSteps || [];
  const featuredIndex = content.featuredMetricIndex ?? 0;
  const hasCollage = Boolean(content.image && content.secondaryImage && content.imageLayout !== 'single');
  const accentPhrase = content.headingAccent?.trim();
  const accentIndex = accentPhrase ? content.heading.toLowerCase().indexOf(accentPhrase.toLowerCase()) : -1;
  const headingText = accentPhrase && accentIndex >= 0 ? (
    <>{content.heading.slice(0, accentIndex)}<span className={styles.headingAccent}>{content.heading.slice(accentIndex, accentIndex + accentPhrase.length)}</span>{content.heading.slice(accentIndex + accentPhrase.length)}</>
  ) : content.heading;
  const buttonLink = content.buttonLink && (
    /^\/(?!\/)/.test(content.buttonLink) || /^#[^\s]*$/.test(content.buttonLink) ||
    /^https?:\/\//i.test(content.buttonLink) && URL.canParse(content.buttonLink)
  ) ? content.buttonLink : undefined;

  return <section data-theme="light" data-surface={content.surfaceTone || 'white'} data-accent={content.accentTone || 'blue'} data-heading-style={content.headingStyle || 'uppercase'} data-decoration={content.decorationStyle || 'grid'} data-animation={content.animationStyle || 'subtle'} data-metrics={content.metricStyle || 'cards'} data-button={content.buttonStyle || 'solid'} className={styles.section}>
    {content.decorationStyle !== 'none' && <div className={styles.backgroundGeometry} aria-hidden="true"><span /><span /><span /></div>}
    <div className={styles.inner}>
      <div className={styles.editorial} data-has-metrics={stats.length > 0}>
        <div className={`${styles.story} ${styles.reveal}`}>
          <h2 className={styles.heading}>{headingText}</h2>
          <div className={styles.narrative}>
            {content.summary && <p className={styles.summary}>{content.summary}</p>}
            <div className={styles.body}>
              {content.bodyFormat === 'text' ? <p className={styles.plainText}>{content.bodyText}</p> :
                <div dangerouslySetInnerHTML={{ __html: sanitizeContent(content.bodyText) }} />}
            </div>
          </div>
          {flowSteps.length > 0 && <ol className={styles.flow} aria-label="Solution flow">
            {flowSteps.map((step, index) => <li key={index}><span>{step.label}</span>{index < flowSteps.length - 1 && <ArrowRight size={13} aria-hidden="true" />}</li>)}
          </ol>}
          {content.buttonText && buttonLink && <a href={buttonLink} className={styles.action}>
            <span>{content.buttonText}</span><ArrowRight size={17} className={styles.actionArrow} aria-hidden="true" />
          </a>}
        </div>
        {stats.length > 0 && <dl className={`${styles.metrics} ${styles.reveal}`} data-count={stats.length}>
          {stats.map((stat, index) => <div key={index} className={styles.metric} data-featured={index === featuredIndex} data-tone={index === featuredIndex ? content.featuredMetricTone || 'soft' : 'neutral'}>
            <dt className={styles.metricLabel}>{stat.label}</dt><dd className={styles.metricValue}>{stat.value}</dd><span className={styles.metricRule} aria-hidden="true" />
          </div>)}
        </dl>}
      </div>

      {(content.image || highlights.length > 0) && <div className={styles.details} data-has-image={Boolean(content.image)} data-has-highlights={highlights.length > 0} data-image-position={content.imagePosition || 'left'}>
        {content.image && <figure className={`${styles.figure} ${styles.reveal}`}>
          <div className={styles.imageComposition} data-collage={hasCollage}>
            <div className={styles.imageFrame}><Image src={content.image} alt={content.imageAlt || content.heading} fill unoptimized className={styles.photo} sizes="(max-width: 899px) 100vw, 50vw" /></div>
            {hasCollage && <div className={styles.detailImage}><Image src={content.secondaryImage!} alt={content.secondaryImageAlt || ''} fill unoptimized className={styles.photo} sizes="(max-width: 899px) 45vw, 25vw" /></div>}
          </div>
          {content.imageCaption && <figcaption className={styles.caption}>{content.imageCaption}</figcaption>}
        </figure>}
        {highlights.length > 0 && <div className={styles.highlights} data-count={highlights.length} style={{ '--intro-highlight-count': highlights.length } as CSSProperties}>
          {highlights.map((highlight, index) => {
            const iconName = highlight.icon || defaultIcons[index % defaultIcons.length];
            const Icon = iconName === 'none' ? undefined : highlightIcons[iconName];
            return <article key={index} data-tone={highlight.tone || 'white'} className={`${styles.highlight} ${styles.reveal}`}>
              <div className={styles.highlightTop} aria-hidden="true">{Icon && <Icon size={23} strokeWidth={1.6} />}<span>{String(index + 1).padStart(2, '0')}</span></div>
              <h3>{highlight.title}</h3>{highlight.description && <p>{highlight.description}</p>}
              {content.decorationStyle !== 'none' && <span className={styles.cardDecoration} aria-hidden="true" />}
            </article>;
          })}
        </div>}
      </div>}
    </div>
  </section>;
}
