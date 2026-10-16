import RichText from './RichText';
import Image from 'next/image';
import Link from 'next/link';
import type { HeroContent } from '@/types/section';
import { ArrowRight } from 'lucide-react';
import SolutionImage from './SolutionImage';
import MediaPlaceholder from './MediaPlaceholder';
import HeroBackgroundVideo from './HeroBackgroundVideo';
import { isPlaceholderMedia } from '@/lib/builder/media';
import { isSafeMediaUrl } from '@/lib/utils/content-url';
import ClientMarquee from '@/components/ui/ClientMarquee';

interface HeroSectionProps {
  content: HeroContent;
}

export default function HeroSection({ content }: HeroSectionProps) {
  const {
    layout = 'centered', eyebrow, videoUrl, imageAlt, mediaCards = [{ title: 'Connected spaces', image: '' }, { title: 'Intelligent devices', image: '' }, { title: 'Actionable insights', image: '' }],
    heading,
    subheading,
    backgroundImage,
    ctaText,
    ctaLink,
    secondaryCtaText,
    secondaryCtaLink,
  } = content;

  if (layout === 'hero-faded') return <section className="solution-hero-faded">
    {backgroundImage && !isPlaceholderMedia(backgroundImage) && isSafeMediaUrl(backgroundImage) && <div className="solution-hero-faded-photo"><Image src={backgroundImage} alt={imageAlt || ''} fill unoptimized priority sizes="100vw" className="object-cover object-right"/></div>}
    <div className="solution-hero-faded-wash"/>
    <div className="solution-hero-faded-content">
      {eyebrow && <p className="solution-eyebrow">{eyebrow}</p>}
      <h1><RichText value={heading}/></h1>
      <RichText as="div" value={subheading} className="solution-hero-faded-summary"/>
      <div className="flex flex-wrap gap-3 mt-7">
        {ctaText && ctaLink && <Link href={ctaLink} className="solution-hero-primary">{ctaText}<ArrowRight size={16}/></Link>}
        {secondaryCtaText && secondaryCtaLink && <Link href={secondaryCtaLink} className="solution-hero-secondary">{secondaryCtaText}</Link>}
      </div>
    </div>
  </section>;

  if (layout === 'hero-split' || layout === 'hero-editorial') return <section className={`solution-hero solution-hero-${layout} relative overflow-hidden bg-zinc-50 font-sans`}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className={layout === 'hero-split' ? 'grid lg:grid-cols-2 gap-8 lg:gap-12 items-center' : 'max-w-4xl'}>
        <div className="min-w-0">
          {eyebrow && <p className="solution-eyebrow">{eyebrow}</p>}
          <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold uppercase leading-[1.08] tracking-tight text-zinc-900"><RichText value={heading} /></h1>
          <RichText as="div" value={subheading} className="mt-5 text-base md:text-lg leading-relaxed font-medium text-zinc-600 max-w-2xl" />
          <div className="flex flex-wrap items-center gap-3 mt-7">
            {ctaText && ctaLink && <Link href={ctaLink} className="solution-hero-primary">{ctaText}<ArrowRight size={16} /></Link>}
            {secondaryCtaText && secondaryCtaLink && <Link href={secondaryCtaLink} className="solution-hero-secondary">{secondaryCtaText}</Link>}
          </div>
        </div>
        {layout === 'hero-split' && <div className="overflow-hidden rounded-3xl border border-zinc-200 shadow-card"><SolutionImage src={backgroundImage} alt={imageAlt || heading} ratio="4:3" /></div>}
      </div>
      {layout === 'hero-editorial' && <div className="solution-hero-image-strip mt-8">{mediaCards.map((card, index) => <article key={index} className="overflow-hidden rounded-2xl border border-zinc-200 bg-white"><SolutionImage src={card.image} alt={card.imageAlt || card.title} ratio="4:3" /><h2 className="font-display text-lg md:text-xl font-bold p-5 text-zinc-900"><RichText value={card.title} /></h2></article>)}</div>}
    </div>
  </section>;

  return (
    <section data-hero-layout={layout} className="relative w-full min-h-[90vh] lg:min-h-screen flex flex-col justify-between overflow-hidden bg-neutral-950 text-white">
      {/* Background Media */}
      {backgroundImage && !isPlaceholderMedia(backgroundImage) && (
        <div className="absolute inset-0 z-0">
          <Image
            src={backgroundImage}
            alt=""
            fill
            className="object-cover object-center opacity-30 select-none pointer-events-none scale-105"
            priority
            sizes="100vw"
          />
        </div>
      )}

      {layout === 'hero-video' && <div className="absolute inset-0 z-0">{videoUrl && isSafeMediaUrl(videoUrl) && /\.(mp4|webm)(?:[?#]|$)/i.test(videoUrl) ? <HeroBackgroundVideo key={videoUrl} src={videoUrl} /> : (!backgroundImage || isPlaceholderMedia(backgroundImage)) ? <MediaPlaceholder video dark fill /> : null}</div>}
      {/* Ambient Lighting & Vignette Gradients */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Central Violet Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] sm:w-[800px] sm:h-[800px] rounded-full bg-primary/20 blur-[140px]" />
        
        {/* Subtle Tech Grid */}
        <div 
          className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem]" 
        />

        {/* Multi-layered Vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/80 via-neutral-950/30 to-neutral-950 hero-gradient-overlay" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_30%,_rgba(10,10,10,0.8)_100%)] hero-radial-overlay" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto flex-grow pt-32 pb-16 sm:pt-40 sm:pb-24">
        {eyebrow && <p className="solution-eyebrow mb-5">{eyebrow}</p>}
        {/* Heading with strict balance and fluid typography */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.08] uppercase font-display max-w-4xl mx-auto [text-wrap:balance]">
          <RichText value={heading} />
        </h1>

        {/* Subheading with bound width and readability */}
        <div className="mt-6 text-base sm:text-lg md:text-xl text-neutral-300 max-w-2xl mx-auto leading-relaxed [text-wrap:pretty]">
          <RichText as="div" value={subheading} />
        </div>

        {/* Call to Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 w-full sm:w-auto mt-8 sm:mt-10">
          {ctaText && ctaLink && (
            <Link
              href={ctaLink}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white px-7 sm:px-8 py-3.5 sm:py-4 rounded-lg font-bold text-sm transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>{ctaText}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}

          {secondaryCtaText && secondaryCtaLink && (
            <Link
              href={secondaryCtaLink}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 text-white backdrop-blur-sm px-7 sm:px-8 py-3.5 sm:py-4 rounded-lg font-semibold text-sm transition-all hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>{secondaryCtaText}</span>
            </Link>
          )}
        </div>
      </div>

      {/* Logo Marquee at Bottom */}
      <div className="relative z-10 w-full border-t border-white/10 bg-neutral-950/70 backdrop-blur-md py-3.5">
        <ClientMarquee showFadeMask={false} />
      </div>
    </section>
  );
}
