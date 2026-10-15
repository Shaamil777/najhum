import RichText, { AccentHeading } from './RichText';
import type { ChallengeContent } from '@/types/section';
import { isSafeLink } from '@/lib/utils/content-url';

export default function ChallengeSection({ content }: { content: ChallengeContent }) {
  return <section className="py-10 lg:py-14 bg-white text-zinc-900 border-b border-zinc-200 font-sans">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <header className="max-w-3xl mb-6 lg:mb-8">
        <p className="text-xs font-bold tracking-widest uppercase text-primary mb-3">Industry challenges</p>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight tracking-tight mb-4"><AccentHeading value={content.heading} /></h2>
        {content.description && <div className="text-zinc-600 leading-relaxed"><RichText as="div" value={content.description} /></div>}
      </header>
      <div className="solution-card-grid">
        {content.challenges.map((challenge, index) => <article key={index} className={`min-w-0 rounded-2xl p-5 sm:p-6 border flex flex-col gap-4 ${index % 2 ? 'bg-blue-50 border-blue-100' : 'bg-zinc-50 border-zinc-200'}`}>
          <span className="text-xs font-bold text-primary">{String(index + 1).padStart(2, '0')} · {challenge.category || 'Challenge'}</span>
          <h3 className="text-xl font-bold leading-snug"><RichText value={challenge.title} /></h3>
          <div className="text-sm text-zinc-600 leading-relaxed"><RichText as="div" value={challenge.description} /></div>
          {challenge.exploreLink && isSafeLink(challenge.exploreLink) && <a className="mt-auto pt-2 text-sm font-semibold text-primary underline underline-offset-4" href={challenge.exploreLink}>Explore solution →</a>}
        </article>)}
      </div>
    </div>
  </section>;
}
