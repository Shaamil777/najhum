import type { VideoSectionContent } from '@/types/section';
import SectionHeader from './SectionHeader';
import SolutionVideoPlayer from './SolutionVideoPlayer';

export default function VideoSection({ content }: { content: VideoSectionContent }) {
  const split = content.layout === 'split-right';
  return <section className="relative w-full bg-zinc-950 text-white overflow-hidden font-sans">
    <div className={`mx-auto px-4 sm:px-6 lg:px-8 ${content.layout === 'cinema' ? 'max-w-[1440px]' : 'max-w-7xl'} ${split ? 'grid lg:grid-cols-2 gap-6 lg:gap-10 items-center' : ''}`}>
      <SectionHeader eyebrow={content.eyebrow} heading={content.heading} description={content.subheading} centered={!split} dark />
      <SolutionVideoPlayer key={content.videoUrl} url={content.videoUrl} poster={content.posterUrl} title={content.heading || 'Solution video'} dark />
      {content.caption && <p className="text-center text-xs text-zinc-400 mt-4 lg:col-span-full">{content.caption}</p>}
    </div>
  </section>;
}
