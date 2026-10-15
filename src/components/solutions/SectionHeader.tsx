import { Heading } from '@/design-system/primitives/typography/Heading';
import RichText, { AccentHeading } from './RichText';

export default function SectionHeader({ heading, eyebrow, description, centered = false, dark = false }: {
  heading?: string; eyebrow?: string; description?: string; centered?: boolean; dark?: boolean;
}) {
  return <header className={`solution-section-header ${centered ? 'is-centered' : ''}`}>
    {eyebrow && <p className="solution-eyebrow">{eyebrow}</p>}
    {heading && <Heading level={2} variant="h2" weight="black" align={centered ? 'center' : 'left'} className={`text-3xl md:text-4xl lg:text-5xl mb-4 ${dark ? 'text-white' : 'text-zinc-900'}`}><AccentHeading value={heading} /></Heading>}
    {description && <RichText as="div" value={description} className={`text-base md:text-lg leading-relaxed font-medium ${dark ? 'text-zinc-300' : 'text-zinc-600'}`} />}
  </header>;
}
