import { mediaRatios } from '@/lib/builder/media';
import { Heading } from '@/design-system/primitives/typography/Heading';
import { Plus, ArrowUpRight } from 'lucide-react';
import RichText from './RichText';
import type { CustomContent } from '@/types/section';
import { isSafeLink } from '@/lib/utils/content-url';
import SectionHeader from './SectionHeader';
import SolutionImage from './SolutionImage';
import SolutionVideoPlayer from './SolutionVideoPlayer';

export default function CustomSection({ content }: { content: CustomContent }) {
  const { heading, bodyHtml, eyebrow, layout = 'rich-text', theme = 'light', headingAlign = 'left', mediaRatio, columns = 3, entries = [] } = content;
  const dark = theme === 'dark';
  const visual = ['image-cards', 'overlay-cards', 'image-bento', 'split-stories', 'case-studies', 'video-cards'].includes(layout);
  const ratio = mediaRatio || (layout === 'overlay-cards' ? '3:4' : layout === 'image-cards' || layout === 'split-stories' ? '4:3' : '16:9');
  return <section className={`solution-custom-section solution-surface-${theme} border-b border-zinc-200/80 overflow-hidden font-sans`} data-layout={layout}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeader heading={heading} eyebrow={eyebrow} description={bodyHtml} centered={headingAlign === 'center'} dark={dark} />
      {layout === 'faq' ? <div className="solution-faq-list max-w-4xl mx-auto">
        {entries.map((entry, index) => <details key={index} className="solution-faq-item group"><summary className="flex items-center justify-between gap-5 cursor-pointer list-none"><span className="text-base md:text-lg font-medium"><RichText value={entry.title} /></span><span className="solution-faq-toggle"><Plus size={18} /></span></summary><RichText as="div" className="solution-card-description pt-4" value={entry.description} /></details>)}
      </div> : layout !== 'rich-text' && <div className={`solution-visual-grid solution-layout-${layout}`} data-columns={columns}>
        {entries.map((entry, index) => {
          const entryRatio = entry.aspectRatio || ratio;
          const overlay = layout === 'overlay-cards';
          return <article key={index} className={`solution-content-card ${overlay ? 'is-overlay' : ''}`} style={overlay ? { aspectRatio: mediaRatios[entryRatio].css } : undefined}>
            {visual && (layout === 'video-cards' ? <SolutionVideoPlayer key={entry.videoUrl} url={entry.videoUrl} poster={entry.image} title={entry.title} dark={dark} /> : <SolutionImage src={entry.image} alt={entry.imageAlt || entry.title} ratio={entryRatio} dark={dark || overlay} fill={overlay} />)}
            <div className="solution-content-card-body">
              {layout === 'statistics' && <div className="solution-stat-value">{entry.value}</div>}
              <Heading level={3} variant="h4" weight="bold" className={`text-xl md:text-2xl ${overlay || dark ? 'text-white' : 'text-zinc-900'}`}><RichText value={entry.title} /></Heading>
              <RichText as="div" className="solution-card-description" value={entry.description} />
              {entry.link && isSafeLink(entry.link) && <a href={entry.link} className="solution-card-link">{entry.linkText || 'Learn more'}<ArrowUpRight size={16} className="shrink-0" /></a>}
            </div>
          </article>;
        })}
      </div>}
    </div>
  </section>;
}
