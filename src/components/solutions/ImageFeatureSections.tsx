import Image from 'next/image';
import { ArrowRight, Radio } from 'lucide-react';
import type { CustomContent } from '@/types/section';
import { isSafeLink, isSafeMediaUrl } from '@/lib/utils/content-url';
import { isPlaceholderMedia } from '@/lib/builder/media';
import RichText from './RichText';
import SectionHeader from './SectionHeader';
import MediaPlaceholder from './MediaPlaceholder';

export function BackgroundImageSection({ content }: { content: CustomContent }) {
  const { backgroundImage, imageAlt, theme = 'dark', overlayStyle = 'full', heading, eyebrow, bodyHtml, headingAlign, buttonLink, buttonText } = content;
  const hasImage = backgroundImage && !isPlaceholderMedia(backgroundImage) && isSafeMediaUrl(backgroundImage);
  return <section className={`solution-image-banner solution-banner-${overlayStyle} solution-banner-${theme}`}>
    <div className="solution-banner-image" aria-hidden="true">
      {hasImage ? <Image src={backgroundImage} alt={imageAlt || ''} fill unoptimized sizes="100vw" className="object-cover"/> : <MediaPlaceholder fill dark={theme === 'dark'} ratio="16:9"/>}
    </div>
    <div className="solution-banner-wash"/>
    <div className={`solution-banner-content ${headingAlign === 'center' ? 'is-centered' : ''}`}>
      <SectionHeader heading={heading} eyebrow={eyebrow} description={bodyHtml} centered={headingAlign === 'center'} dark={theme === 'dark'}/>
      {buttonText && buttonLink && isSafeLink(buttonLink) && <a href={buttonLink} className="solution-hero-primary">{buttonText}<ArrowRight size={16}/></a>}
    </div>
  </section>;
}

export function FadedImageCards({ content }: { content: CustomContent }) {
  return <div className="solution-faded-grid" data-columns={content.columns || 3} data-count={content.entries?.length || 0}>
    {(content.entries || []).map((entry, index) => {
      const hasImage = entry.image && !isPlaceholderMedia(entry.image) && isSafeMediaUrl(entry.image);
      return <article key={index} className="solution-faded-card">
        <div className="solution-faded-photo">
          {hasImage ? <Image src={entry.image!} alt={entry.imageAlt || ''} fill unoptimized sizes="(max-width: 767px) 100vw, 40vw" className="object-cover object-right"/> : <MediaPlaceholder ratio="4:3" fill/>}
          <div className="solution-faded-wash"/>
        </div>
        <Radio size={25} strokeWidth={1.6} className="solution-faded-icon" aria-hidden="true"/>
        <div className="solution-faded-copy">
          <div className="solution-faded-code"><span>{entry.value || `APPLICATION ${String(index + 1).padStart(2, '0')}`}</span><i/></div>
          {entry.title && <h3><RichText value={entry.title}/></h3>}
          {entry.description && <RichText as="div" className="solution-faded-description" value={entry.description}/>}
        </div>
        {entry.link && isSafeLink(entry.link) && <a href={entry.link} className="solution-faded-link">{entry.linkText || 'Explore this application'}<span><ArrowRight size={14}/></span></a>}
      </article>;
    })}
  </div>;
}
