import { SectionType } from '@/types/section';
import type { BuilderDocument, BuilderSection, BuilderProduct } from './document';
import { defaultSolaasContent } from '@/content/solaas';

export const sectionLibrary = [
  { type: SectionType.HERO, label: 'Hero', description: 'A bold introduction with a call to action', mark: 'H', content: { heading: 'Intelligent solutions. Real impact.', subheading: 'Connect your infrastructure with the intelligence to make better decisions.', ctaText: 'Talk to our team', ctaLink: '/contact', backgroundImage: '/builder-samples/sensor.svg' } },
  { type: SectionType.INTRO, label: 'Introduction', description: 'Tell your story with text and an image', mark: 'T', content: { eyebrow: 'THE SOLUTION', heading: 'Built around your business', summary: 'Connected systems. Measurable results.', bodyText: 'Turn operational challenges into opportunities with connected systems and actionable insights.', bodyFormat: 'text', image: '/builder-samples/energy.svg', imageAlt: 'Sample connected infrastructure illustration', imageCaption: 'Replace this sample with your own solution image.', imagePosition: 'right', theme: 'light', highlights: [{ title: 'Live intelligence', description: 'See your infrastructure in real time.' }], stats: [{ value: '24/7', label: 'Visibility' }], buttonText: 'Explore our platforms', buttonLink: '/platforms' } },
  { type: SectionType.CHALLENGE, label: 'Challenges', description: 'Describe the problems you solve', mark: '!', content: { heading: 'Your challenges, solved', description: 'Bring clarity to complex infrastructure.', challenges: [{ title: 'Operational visibility', description: 'Replace fragmented information with a clear picture of your operations.', category: 'Operations', exploreLink: '/solutions' }] } },
  { type: SectionType.FEATURES, label: 'Features', description: 'A flexible grid of capabilities', mark: '✦', content: { features: [{ title: 'Connected intelligence', description: 'Bring your systems together in one place.', icon: '✦' }, { title: 'Real-time visibility', description: 'Understand what is happening, as it happens.', icon: '◉' }, { title: 'Designed to scale', description: 'Grow your infrastructure with confidence.', icon: '↗' }] } },
  { type: SectionType.BENEFITS, label: 'Benefits', description: 'Explain the value, with optional images', mark: '+', content: { benefits: [{ title: 'Make better decisions', description: 'Transform your data into measurable improvements.', image: '/builder-samples/energy.svg' }] } },
  { type: SectionType.TESTIMONIALS, label: 'Testimonials', description: 'Let your customers tell their story', mark: '“', content: { testimonials: [{ quote: 'A meaningful improvement in how we run our operations.', author: 'Customer name', role: 'Operations manager', company: 'Company', avatar: '/builder-samples/sensor.svg' }] } },
  { type: SectionType.USE_CASES, label: 'Use cases', description: 'Interactive tabs for applications', mark: '↔', content: { eyebrow: 'USE CASES', heading: 'Intelligence for every application', tabs: [{ id: 'application-1', label: 'Smart operations', solutionDetails: 'Connect sensors, systems, and teams.', statValue: '24/7', statDescription: 'Operational visibility', bullets: ['Live monitoring', 'Actionable insights'] }] } },
  { type: SectionType.METHODOLOGY, label: 'Methodology', description: 'Show the steps in your process', mark: '123', content: { eyebrow: 'OUR APPROACH', heading: 'From insight to action', bodyText: 'A proven approach to connected infrastructure.', steps: [{ title: 'Collect', description: 'Capture the information that matters.' }, { title: 'Connect', description: 'Bring your systems together.' }, { title: 'Collaborate', description: 'Turn insights into improvements.' }] } },
  { type: SectionType.SOLAAS, label: 'SolaaS', description: 'Your managed delivery model', mark: 'S', content: { ...defaultSolaasContent } },
  { type: SectionType.PRODUCTS_CAROUSEL, label: 'Products', description: 'Show published products linked to this solution', mark: 'P', content: { heading: 'Related products', description: 'Explore the hardware that powers this solution.' } },
  { type: SectionType.CTA, label: 'Call to action', description: 'Guide visitors to their next step', mark: '↗', content: { heading: 'Ready to move forward?', bodyText: 'Let’s find the right solution for your business.', primaryButtonText: 'Get in touch', primaryButtonLink: '/contact', secondaryButtonText: 'Explore platforms', secondaryButtonLink: '/platforms' } },
  { type: SectionType.CUSTOM, label: 'Rich content', description: 'Formatted content with safe HTML', mark: '</>', content: { heading: 'Your story', bodyHtml: '<p>Build <strong>connected infrastructure</strong> with <em>actionable intelligence</em>.</p><ul><li>Real-time monitoring</li><li>Measurable operational improvements</li></ul>' } },
  {
    type: SectionType.IMAGE,
    label: 'Image showcase',
    description: 'Visual diagram or system architecture breakdown',
    mark: '▧',
    content: {
      eyebrow: 'ARCHITECTURE DIAGRAM',
      heading: 'End-to-End System Integration',
      description: 'Visual breakdown of our hardware edge nodes streaming telemetry to cloud analytics.',
      imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2940&auto=format&fit=crop',
      altText: 'System Architecture',
      layout: 'contained',
      aspectRatio: '16:9',
      rounded: true,
    },
  },
  {
    type: SectionType.VIDEO,
    label: 'Video showcase',
    description: 'Watch telemetry and deployment in action',
    mark: '▷',
    content: {
      eyebrow: 'LIVE DEMONSTRATION',
      heading: 'See The Solution In Action',
      subheading: 'Watch our telemetry and deployment framework in real-world scenarios.',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      layout: 'contained',
    },
  },
  {
    type: SectionType.GRAPH,
    label: 'Graph & metrics',
    description: 'Quantifiable benchmarks and performance impact',
    mark: '↗▥',
    content: {
      eyebrow: 'PERFORMANCE METRICS',
      heading: 'Quantifiable Industrial Impact',
      description: 'Benchmarking telemetry and efficiency gains against legacy setups.',
      chartType: 'bar',
      primaryLabel: 'Our Architecture',
      secondaryLabel: 'Legacy Setup',
      dataPoints: [
        { label: 'Data Transmission Latency', value: 12, secondaryValue: 85, unit: 'ms' },
        { label: 'Energy Efficiency Factor', value: 94, secondaryValue: 62, unit: '%' },
        { label: 'Uptime Availability SLA', value: 99.98, secondaryValue: 94.2, unit: '%' },
        { label: 'Deployment Speed', value: 4, secondaryValue: 24, unit: 'days' },
      ],
      metrics: [
        { title: 'Latency Reduction', value: '-85%', change: '12ms avg', isPositive: true },
        { title: 'Annual Opex Savings', value: '38%', change: '+$120K', isPositive: true },
        { title: 'System Reliability', value: '99.98%', change: 'Field Verified', isPositive: true },
      ],
    },
  },
  {
    type: SectionType.COMPARISON_TABLE,
    label: 'Comparison table',
    description: 'Side-by-side comparison with legacy setups',
    mark: '≡',
    content: {
      header: {
        leftTitle: 'Traditional Setup',
        rightTitlePart1: 'The Modern',
        rightTitlePart2: 'Advantage',
        eyebrow: 'Side-by-Side Comparison',
      },
      items: [
        {
          id: 'comp-1',
          traditional: {
            title: 'Fragmented Vendors',
            description: 'High Integration Complexity',
            details: 'Multi-vendor systems cause finger-pointing during network downtime and slow deployment cycles.',
          },
          solution: {
            title: 'Unified Turnkey Stack',
            description: 'Zero Integration Friction',
            details: 'Pre-validated hardware, edge firmware, and cloud protocols deliver instant plug-and-play operation.',
          },
        },
        {
          id: 'comp-2',
          traditional: {
            title: 'Manual Monitoring',
            description: 'Reactive Maintenance',
            details: 'Field technicians dispatched only after hardware fails, resulting in costly downtime.',
          },
          solution: {
            title: 'Predictive Telemetry',
            description: 'Autonomous Remediation',
            details: 'Continuous edge diagnostics detect thermal and electrical anomalies before failures occur.',
          },
        },
      ],
      footer: {
        leftLabel: 'Legacy Ongoing Cost:',
        leftValue: '+42% Higher TCO',
        rightLabel: 'Estimated Payback:',
        rightValue: '< 9 Months ROI',
      },
    },
  },
  {
    type: SectionType.PRODUCT_CARD,
    label: 'Product cards',
    description: 'Compatible hardware and field-proven products',
    mark: 'P↗',
    content: {
      eyebrow: 'COMPATIBLE HARDWARE',
      heading: 'Field-Proven Platform Products',
      description: 'Explore connected edge appliances and devices engineered to power this architecture.',
      displayMode: 'solution-tagged',
      columns: 3,
      productIds: [],
    },
  },
] as const;

export function makeSection(type: SectionType, products: BuilderProduct[] = []): BuilderSection {
  const template = sectionLibrary.find(item => item.type === type)!;
  const content = JSON.parse(JSON.stringify(template.content));
  if (type === SectionType.PRODUCT_CARD) content.productIds = products.slice(0, 3).map(product => product.id);
  return { id: crypto.randomUUID(), type, content, isDraft: false, design: {} };
}

export function makeTemplate(kind: 'overview' | 'full'): BuilderSection[] {
  return (kind === 'overview' ? [SectionType.HERO, SectionType.INTRO, SectionType.FEATURES, SectionType.CTA] : [SectionType.HERO, SectionType.INTRO, SectionType.CHALLENGE, SectionType.USE_CASES, SectionType.METHODOLOGY, SectionType.PRODUCTS_CAROUSEL, SectionType.CTA]).map(type => makeSection(type));
}

// Templates for adding items to an empty collection; do not infer types from old values.
export const arrayTemplates: Record<string, Record<string, unknown> | string> = {
  features: { title: 'New feature', description: 'Describe this feature.', icon: '' },
  benefits: { title: 'New benefit', description: 'Describe this benefit.', image: '/builder-samples/energy.svg' },
  testimonials: { quote: 'Customer quote', author: 'Name', role: 'Role', company: 'Company', avatar: '/builder-samples/sensor.svg' },
  challenges: { title: 'New challenge', description: 'Describe this challenge.', category: 'Operations', exploreLink: '/solutions' },
  tabs: { id: 'new-application', label: 'New application', solutionDetails: 'Describe this application.', statValue: '24/7', statDescription: 'Monitoring', bullets: ['New capability'] },
  steps: { title: 'New step', description: 'Describe this step.' },
  cards: { title: 'New card', description: 'Describe this card.' },
  highlights: { title: 'New highlight', description: '' },
  stats: { value: '24/7', label: 'Visibility' },
  bullets: 'New capability',
  dataPoints: { label: 'New Metric', value: 50, secondaryValue: 25, unit: '%' },
  metrics: { title: 'New Metric', value: '99%', change: '+10%', isPositive: true },
  items: {
    id: 'comp-item',
    traditional: { title: 'Traditional Approach', description: 'High friction', details: 'Manual intervention required.' },
    solution: { title: 'Turnkey Solution', description: 'Automated', details: 'Zero friction.' },
  },
};
export const arrayLimits: Record<string, number> = {
  features: 12,
  benefits: 8,
  testimonials: 10,
  challenges: 12,
  tabs: 10,
  steps: 6,
  cards: 6,
  highlights: 4,
  stats: 3,
  bullets: 10,
  dataPoints: 12,
  metrics: 6,
  items: 10,
  productIds: 12,
};

export function editableContent(section: BuilderSection): Record<string, unknown> {
  const defaults = sectionLibrary.find(item => item.type === section.type)?.content || {};
  return { ...JSON.parse(JSON.stringify(defaults)), ...section.content };
}

export const previewDocument = (): BuilderDocument => ({ title: 'Intelligent infrastructure', slug: 'intelligent-infrastructure', metaDescription: 'Connected solutions for your business.', sections: makeTemplate('overview') });
