import industrySolutions from '@/content/industry-solutions.json';
import { SectionType } from '@/types/section';
import type { BuilderDocument, BuilderSection, BuilderProduct } from './document';
import { defaultSolaasContent } from '@/content/solaas';

export const sectionLibrary = [
  { type: SectionType.HERO, label: 'Hero · centered banner', description: 'Centered hero with an optional background image · 16:9', mark: 'H', content: { heading: 'Intelligent solutions. Real impact.', subheading: 'Connect your infrastructure with the intelligence to make better decisions.', ctaText: 'Talk to our team', ctaLink: '/contact', backgroundImage: '', layout: 'centered', eyebrow: 'CONNECTED SOLUTIONS' } },
  { type: SectionType.INTRO, label: 'Text with image', description: 'Tell your story with text and an image', mark: 'T', content: { eyebrow: 'THE SOLUTION', heading: 'Built around your business', summary: 'Connected systems. Measurable results.', bodyText: 'Turn operational challenges into opportunities with connected systems and actionable insights.', bodyFormat: 'text', image: '/builder-placeholders/image-4-3.svg', imageAlt: 'Solution overview image', imageCaption: 'Recommended image: 4:3 · 1200 × 900 px.', imagePosition: 'right', theme: 'light', highlights: [{ title: 'Live intelligence', description: 'See your infrastructure in real time.' }], stats: [{ value: '24/7', label: 'Visibility' }], buttonText: 'Explore our platforms', buttonLink: '/platforms' } },
  { type: SectionType.CHALLENGE, label: 'Problems we solve', description: 'Describe the problems you solve', mark: '!', content: { heading: 'Your challenges, solved', description: 'Bring clarity to complex infrastructure.', challenges: [{ title: 'Operational visibility', description: 'Replace fragmented information with a clear picture of your operations.', category: 'Operations', exploreLink: '/solutions' }] } },
  { type: SectionType.FEATURES, label: 'Feature cards', description: 'A flexible grid of capabilities', mark: '✦', content: { eyebrow: 'KEY CAPABILITIES', heading: 'Everything you need to stay connected', subheading: 'Reliable monitoring, clear insights, and room to grow.', features: [{ title: 'Connected intelligence', description: 'Bring your systems together in one place.', icon: '✦' }, { title: 'Real-time visibility', description: 'Understand what is happening, as it happens.', icon: '◉' }, { title: 'Designed to scale', description: 'Grow your infrastructure with confidence.', icon: '↗' }] } },
  { type: SectionType.BENEFITS, label: 'Benefits & outcomes', description: 'Explain the value, with optional images', mark: '+', content: { eyebrow: 'WHY IT MATTERS', heading: 'Better outcomes for your business', subheading: 'Discover the value of connected operations.', benefits: [{ title: 'Make better decisions', description: 'Transform your data into measurable improvements.', image: '/builder-placeholders/image-4-3.svg' }] } },
  { type: SectionType.TESTIMONIALS, label: 'Customer quotes', description: 'Let your customers tell their story', mark: '“', content: { eyebrow: 'CUSTOMER STORIES', heading: 'What our customers say', subheading: 'Sample quote — replace with an approved customer testimonial.', testimonials: [{ quote: 'A meaningful improvement in how we run our operations.', author: 'Customer name', role: 'Operations manager', company: 'Company', avatar: '/builder-placeholders/image-1-1.svg' }] } },
  { type: SectionType.USE_CASES, label: 'Application tabs', description: 'Interactive tabs for applications', mark: '↔', content: { eyebrow: 'USE CASES', heading: 'Intelligence for every application', tabs: [{ id: 'application-1', label: 'Smart operations', solutionDetails: 'Connect sensors, systems, and teams.', statValue: '24/7', statDescription: 'Operational visibility', bullets: ['Live monitoring', 'Actionable insights'] }] } },
  { type: SectionType.METHODOLOGY, label: 'How it works', description: 'Show the steps in your process', mark: '123', content: { eyebrow: 'OUR APPROACH', heading: 'From insight to action', bodyText: 'A proven approach to connected infrastructure.', steps: [{ title: 'Collect', description: 'Capture the information that matters.' }, { title: 'Connect', description: 'Bring your systems together.' }, { title: 'Collaborate', description: 'Turn insights into improvements.' }] } },
  { type: SectionType.SOLAAS, label: 'Managed service', description: 'Your managed delivery model', mark: 'S', content: { ...defaultSolaasContent } },
  { type: SectionType.PRODUCTS_CAROUSEL, label: 'Product slider', description: 'Show published products linked to this solution', mark: 'P', content: { heading: 'Related products', description: 'Explore the hardware that powers this solution.' } },
  { type: SectionType.CTA, label: 'Contact banner', description: 'Guide visitors to their next step', mark: '↗', content: { heading: 'Ready to move forward?', bodyText: 'Let’s find the right solution for your business.', primaryButtonText: 'Get in touch', primaryButtonLink: '/contact', secondaryButtonText: 'Explore platforms', secondaryButtonLink: '/platforms' } },
  { type: SectionType.CUSTOM, label: 'Text section', description: 'Formatted content with safe HTML', mark: '</>', content: { heading: 'Your story', eyebrow: 'THE SOLUTION', theme: 'light', headingAlign: 'left', mediaRatio: '16:9', columns: 3, layout: 'rich-text', entries: [], bodyHtml: '<p>Build <strong>connected infrastructure</strong> with <em>actionable intelligence</em>.</p><ul><li>Real-time monitoring</li><li>Measurable operational improvements</li></ul>' } },
  {
    type: SectionType.IMAGE,
    label: 'Image & diagram',
    description: 'Visual diagram or system architecture breakdown',
    mark: '▧',
    content: {
      eyebrow: 'ARCHITECTURE DIAGRAM',
      heading: 'End-to-End System Integration',
      description: 'Visual breakdown of our hardware edge nodes streaming telemetry to cloud analytics.',
      imageUrl: '/builder-placeholders/image-16-9.svg',
      altText: 'System Architecture',
      layout: 'contained',
      aspectRatio: 'auto',
      fit: 'contain',
      rounded: true,
    },
  },
  {
    type: SectionType.VIDEO,
    label: 'Video',
    description: 'Watch telemetry and deployment in action',
    mark: '▷',
    content: {
      eyebrow: 'LIVE DEMONSTRATION',
      heading: 'See The Solution In Action',
      subheading: 'Watch our telemetry and deployment framework in real-world scenarios.',
      videoUrl: '',
      posterUrl: '/builder-placeholders/image-16-9.svg',
      caption: 'Add your video URL. Recommended cover: 16:9 · 1600 × 900 px.',
      layout: 'contained',
    },
  },
  {
    type: SectionType.GRAPH,
    label: 'Charts & metrics',
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
    label: 'Before & after',
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

export const sectionPresets = [
  { id: 'hero-faded', type: SectionType.HERO, label: 'Hero · side-fade image', description: 'A light editorial hero with photography fading behind the copy · 16:9', mark: 'H◧', content: { layout: 'hero-faded', eyebrow: 'CONNECTED OPERATIONS', heading: 'A clearer view of every possibility.', subheading: 'Introduce your solution with a large image, a focused message, and a clear next step.', backgroundImage: '', imageAlt: '', ctaText: 'Discuss your project', ctaLink: '/contact', secondaryCtaText: 'Explore the platform', secondaryCtaLink: '/platforms/iotrics' } },
  { id: 'faded-image-cards', label: 'Faded image cards · About style', description: 'Pale blue cards with photography fading behind text · 4:3', mark: '▧', content: { eyebrow: 'CONNECTED POSSIBILITIES', heading: 'Designed for your everyday operations', bodyHtml: '<p>Introduce your key applications with the same image-led cards used on our About page.</p>', layout: 'faded-image-cards', theme: 'light', headingAlign: 'center', mediaRatio: '4:3', columns: 3, entries: [
    { title: 'Connected spaces', description: 'Understand your environment and help every space work better.', image: '', imageAlt: 'Connected workplace', link: '/contact', linkText: 'Explore the possibilities' },
    { title: 'Smarter assets', description: 'Know what your equipment needs before small changes become bigger problems.', image: '', imageAlt: 'Connected equipment', link: '/contact', linkText: 'Discuss your assets' },
    { title: 'Clearer decisions', description: 'Give your team a shared view of the information that matters.', image: '', imageAlt: 'Operations team', link: '/demo', linkText: 'Explore the platform' },
  ] } },
  { id: 'image-banner', label: 'Background image · full overlay', description: 'Full-width photography, readable overlay, and optional action · 16:9', mark: '▣', content: { layout: 'image-banner', eyebrow: 'SEE THE BIGGER PICTURE', heading: 'Your entire operation. One connected view.', bodyHtml: '<p>Bring a key benefit into focus with a large photograph and a short, clear message.</p>', backgroundImage: '', imageAlt: '', overlayStyle: 'full', theme: 'dark', headingAlign: 'left', buttonText: 'Discuss your project', buttonLink: '/contact', entries: [] } },
  { id: 'image-banner-side', label: 'Background image · side fade', description: 'A soft image fade beside your content · 16:9', mark: '◧', content: { layout: 'image-banner', eyebrow: 'BUILT AROUND YOUR TEAM', heading: 'Better visibility starts here.', bodyHtml: '<p>Let a photograph set the scene while your message stays easy to read.</p>', backgroundImage: '', imageAlt: '', overlayStyle: 'side', theme: 'soft', headingAlign: 'left', buttonText: 'Talk to our team', buttonLink: '/contact', entries: [] } },

  { id: 'faq', label: 'Frequently asked questions', description: 'Expandable answers to common customer questions', mark: '?', content: { eyebrow: 'COMMON QUESTIONS', theme: 'light', headingAlign: 'center', heading: 'Your questions, answered', bodyHtml: '<p>Find out how this solution fits your project.</p>', layout: 'faq', entries: [
    { title: 'Can this work with our existing systems?', description: 'We review your infrastructure and recommend a suitable integration approach.' },
    { title: 'How do we get started?', description: 'Contact our team to discuss your site, goals, and deployment requirements.' },
    { title: 'Can we expand the solution later?', description: 'Start with a pilot and add more devices and locations as your needs grow.' },
  ] } },
  { id: 'case-studies', label: 'Project stories', description: 'Show customer projects, deployment details, and outcomes', mark: 'CS', content: { eyebrow: 'CUSTOMER STORIES', theme: 'soft', headingAlign: 'left', mediaRatio: '16:9', columns: 2, heading: 'See what is possible', bodyHtml: '<p>Example project — replace with an approved customer story before publishing.</p>', layout: 'case-studies', entries: [
    { title: 'Connecting a smarter workplace', description: 'Describe the customer challenge, the devices installed, and the outcome of the deployment.', image: '/builder-placeholders/image-4-3.svg', link: '/contact', linkText: 'Discuss a similar project' },
    { title: 'Visibility across multiple sites', description: 'Explain how teams brought site data together and improved their daily operations.', image: '/builder-placeholders/image-4-3.svg', link: '/contact', linkText: 'Discuss your project' },
  ] } },
  { id: 'resources', label: 'Guides & downloads', description: 'Link to brochures, technical guides, and demonstrations', mark: '↓', content: { eyebrow: 'RESOURCES', theme: 'light', headingAlign: 'left', heading: 'Plan your next step', bodyHtml: '<p>Add your own brochures and installation guides to help visitors evaluate this solution.</p>', layout: 'resources', entries: [
    { title: 'Solution overview', description: 'A practical introduction to the solution and its capabilities.', link: '/contact', linkText: 'Request the brochure' },
    { title: 'Deployment guide', description: 'Discuss installation, connectivity, and integration requirements.', link: '/contact', linkText: 'Request the guide' },
  ] } },
  { id: 'statistics', label: 'Key numbers', description: 'Compact cards for coverage, scale, and verified results', mark: '#', content: { eyebrow: 'AT A GLANCE', theme: 'soft', headingAlign: 'left', heading: 'At a glance', bodyHtml: '<p>Sample figures — replace with verified project data.</p>', layout: 'statistics', entries: [
    { title: 'Monitoring', value: '24/7', description: 'Continuous visibility into connected operations.' },
    { title: 'Dashboard', value: 'One', description: 'Bring your site information into a shared view.' },
    { title: 'Deployment', value: 'Flexible', description: 'Start small and expand as your needs grow.' },
  ] } },
  { id: 'image-cards', label: 'Image cards', description: 'Images above feature text · 4:3 recommended', mark: '▧', content: { eyebrow: 'EXPLORE THE SOLUTION', heading: 'Connected solutions for every space', bodyHtml: '<p>Show where your solution works with a photograph and a short explanation for each application.</p>', layout: 'image-cards', theme: 'light', headingAlign: 'left', mediaRatio: '4:3', columns: 3, entries: [
    { title: 'Smart workplaces', description: 'Connect office environments and help teams understand how their spaces are used.', image: '', imageAlt: 'Smart workplace', link: '/contact', linkText: 'Explore this application' },
    { title: 'Connected buildings', description: 'Bring building systems together for clearer operational visibility.', image: '', imageAlt: 'Connected building', link: '/contact', linkText: 'Discuss your building' },
    { title: 'Industrial operations', description: 'Monitor site conditions and give your team practical information for daily decisions.', image: '', imageAlt: 'Industrial site', link: '/contact', linkText: 'Plan your deployment' },
  ] } },
  { id: 'overlay-cards', label: 'Image cards with text overlay', description: 'Full image cards with readable text overlays · 3:4', mark: '▣', content: { eyebrow: 'APPLICATIONS', heading: 'See the bigger picture', bodyHtml: '<p>Lead with photography and introduce the environments your solution connects.</p>', layout: 'overlay-cards', theme: 'light', headingAlign: 'left', mediaRatio: '3:4', columns: 3, entries: [
    { title: 'People & spaces', description: 'Understand occupancy and help every space work better.', image: '', imageAlt: 'People using a shared space', link: '/contact', linkText: 'Discover more' },
    { title: 'Energy & assets', description: 'Bring resource usage and asset conditions into view.', image: '', imageAlt: 'Building infrastructure', link: '/contact', linkText: 'Explore the solution' },
    { title: 'Connected operations', description: 'Turn site information into timely operational decisions.', image: '', imageAlt: 'Operations team', link: '/contact', linkText: 'Talk to our team' },
  ] } },
  { id: 'image-bento', label: 'Featured image mosaic', description: 'One featured image with smaller supporting cards · 16:9', mark: '▦', content: { eyebrow: 'IN THE FIELD', heading: 'One solution. Many possibilities.', bodyHtml: '<p>Use a larger featured image and supporting cards to tell the story of your solution.</p>', layout: 'image-bento', theme: 'soft', headingAlign: 'left', mediaRatio: '16:9', columns: 3, entries: [
    { title: 'A connected view of your site', description: 'Show your complete deployment, from field devices to the operations team.', image: '', imageAlt: 'Overview of a connected site', link: '/contact', linkText: 'Plan your project' },
    { title: 'Purpose-built devices', description: 'Highlight a device in its installation environment.', image: '', imageAlt: 'Sensor installation', link: '', linkText: 'Learn more' },
    { title: 'Clear insights', description: 'Show the dashboard that brings site information together.', image: '', imageAlt: 'Solution dashboard', link: '', linkText: 'Learn more' },
  ] } },
  { id: 'split-stories', label: 'Alternating image & text', description: 'Large images beside content, alternating each row · 4:3', mark: '↔', content: { eyebrow: 'HOW IT HELPS', heading: 'Built for the way you work', bodyHtml: '<p>Explain your solution through a sequence of images, benefits, and clear next steps.</p>', layout: 'split-stories', theme: 'light', headingAlign: 'left', mediaRatio: '4:3', columns: 2, entries: [
    { title: 'Connect the places that matter', description: 'Show where your devices are installed and explain the information they capture.', image: '', imageAlt: 'On-site solution installation', link: '/contact', linkText: 'Discuss installation' },
    { title: 'Make information useful', description: 'Use a dashboard image to explain how teams review trends, receive notifications, and respond.', image: '', imageAlt: 'Dashboard and reporting', link: '/contact', linkText: 'Explore the platform' },
  ] } },
  { id: 'video-cards', label: 'Video cards', description: 'Editable video library with covers and descriptions · 16:9', mark: '▷', content: { eyebrow: 'WATCH & EXPLORE', heading: 'See your solution in action', bodyHtml: '<p>Share product demonstrations, installation walkthroughs, and customer stories.</p>', layout: 'video-cards', theme: 'soft', headingAlign: 'left', mediaRatio: '16:9', columns: 3, entries: [
    { title: 'Solution walkthrough', description: 'Introduce the key parts of your solution in a short overview.', image: '', imageAlt: 'Solution walkthrough cover', videoUrl: '', link: '', linkText: 'Learn more' },
    { title: 'Installation guide', description: 'Show how devices are installed and connected on site.', image: '', imageAlt: 'Installation guide cover', videoUrl: '', link: '', linkText: 'Learn more' },
    { title: 'Dashboard demonstration', description: 'Walk through the information and tools available to your customers.', image: '', imageAlt: 'Dashboard demonstration cover', videoUrl: '', link: '', linkText: 'Learn more' },
  ] } },
  { id: 'hero-split', type: SectionType.HERO, label: 'Hero · split image', description: 'Introduction beside a large image · 4:3', mark: 'H▧', content: { layout: 'hero-split', eyebrow: 'CONNECTED SOLUTIONS', heading: 'Intelligent infrastructure. Clearer decisions.', subheading: 'Introduce your solution alongside a photograph of the environment it connects.', backgroundImage: '', imageAlt: 'Solution overview', ctaText: 'Discuss your project', ctaLink: '/contact', secondaryCtaText: 'Explore solutions', secondaryCtaLink: '/solutions' } },
  { id: 'hero-video', type: SectionType.HERO, label: 'Hero · background video', description: 'Dark cinematic banner with a hosted background video · 16:9', mark: 'H▷', content: { layout: 'hero-video', eyebrow: 'SEE WHAT IS POSSIBLE', heading: 'Bring your connected world to life.', subheading: 'Set the scene with a short video of your solution in action.', videoUrl: '', backgroundImage: '', imageAlt: 'Video cover', ctaText: 'Talk to our team', ctaLink: '/contact' } },
  { id: 'hero-editorial', type: SectionType.HERO, label: 'Hero · image card strip', description: 'Editorial heading with three supporting image cards · 4:3', mark: 'H▦', content: { layout: 'hero-editorial', eyebrow: 'INTELLIGENT OPERATIONS', heading: 'One connected vision. Every part of your business.', subheading: 'Introduce your solution with a visual story across the environments, devices, and teams it connects.', backgroundImage: '', ctaText: 'Start a conversation', ctaLink: '/contact', mediaCards: [ { title: 'Connected spaces', image: '', imageAlt: 'Connected spaces' }, { title: 'Intelligent devices', image: '', imageAlt: 'Intelligent devices' }, { title: 'Actionable insights', image: '', imageAlt: 'Dashboard insights' } ] } },
  { id: 'table', label: 'Data table', description: 'Editable columns and rows for specifications, challenges, or comparisons', mark: '≡', content: { eyebrow: 'AT A GLANCE', heading: 'Compare the details', bodyHtml: '', layout: 'table', theme: 'light', headingAlign: 'left', tableCaption: 'Solution details', tableColumns: ['Challenge', 'Operational impact'], tableRows: [{ cells: ['Manual monitoring', 'Limited visibility and delayed response'] }, { cells: ['Disconnected systems', 'More effort to bring information together'] }] } },
] as const;
export type SectionPresetId = typeof sectionPresets[number]['id'];
export function makePreset(id: SectionPresetId): BuilderSection {
  const preset = sectionPresets.find(item => item.id === id)!;
  return { id: crypto.randomUUID(), type: 'type' in preset ? preset.type : SectionType.CUSTOM, content: structuredClone(preset.content), isDraft: false, design: {} };
}
export function sectionLabel(section: BuilderSection) {
  return ((section.type === SectionType.CUSTOM || section.type === SectionType.HERO) && sectionPresets.find(item => item.id === section.content.layout)?.label)
    || sectionLibrary.find(item => item.type === section.type)?.label || 'Section';
}

export const pageTemplates = [
  { id: 'overview', label: 'Quick overview', description: 'A short introduction, feature cards, and a clear next step.' },
  { id: 'full', label: 'Complete solution', description: 'Tell the full story with challenges, applications, architecture, products, and FAQs.' },
  { id: 'people-counting', label: 'People counting & occupancy', description: 'Visitor insights for retail, offices, and shared spaces.' },
  { id: 'healthcare', label: 'Smart healthcare', description: 'Facility monitoring, environmental comfort, and operational visibility.' },
  { id: 'water-management', label: 'Building water management', description: 'Metering, leak detection, pressure monitoring, and building protection.' },
  { id: 'visual-overview', label: 'Visual overview', description: 'Light split hero, overlay images, alternating stories, and video cards.' },
  { id: 'image-editorial', label: 'Image editorial', description: 'Image-card hero, featured image mosaics, large photographs, and project stories.' },
  { id: 'video-showcase', label: 'Video showcase', description: 'Background-video hero, a cinema player, and a video card library.' },
  { id: 'dark-showcase', label: 'Dark showcase', description: 'Dark image overlays, a featured mosaic, and video cards with blue accents.' },
  { id: 'application-gallery', label: 'Application gallery', description: 'A visual application directory with image grids, overlays, and demonstrations.' },
  { id: 'facilities-management', label: 'Facilities management', description: 'Side-fade hero, About-style image cards, visual stories and application accordions.' },
  { id: 'hospitality', label: 'Hospitality & hotels', description: 'Split photography, hospitality image cards, a full-image banner and a featured mosaic.' },
  { id: 'cold-storage', label: 'Cold chain intelligence', description: 'Editorial image strip, cold-room photo cards, side-fade storytelling and practical FAQs.' },
  { id: 'industrial', label: 'Industrial & manufacturing', description: 'Immersive hero, production image cards, a three-column table and plant-wide imagery.' },
  { id: 'energy-monitoring', label: 'Energy monitoring', description: 'Light photo hero, an energy image mosaic, faded application cards and an evidence-led story.' },
] as const;
export type PageTemplateId = typeof pageTemplates[number]['id'];

export function makeTemplate(kind: PageTemplateId, products: BuilderProduct[] = []): BuilderSection[] {
  const imported = industrySolutions.find(solution => solution.slug === kind);
  if (imported) return structuredClone(imported.sections).map(section => ({ ...section, id: crypto.randomUUID(), type: section.type as SectionType }));
  const visualTemplates: Partial<Record<PageTemplateId, (SectionType | SectionPresetId)[]>> = {
    'visual-overview': ['hero-split', 'overlay-cards', 'split-stories', 'video-cards', 'image-cards', 'statistics', 'faq', SectionType.CTA],
    'image-editorial': ['hero-editorial', 'image-bento', 'split-stories', SectionType.IMAGE, 'image-cards', 'case-studies', 'resources', SectionType.CTA],
    'video-showcase': ['hero-video', SectionType.VIDEO, 'video-cards', 'split-stories', 'overlay-cards', 'faq', SectionType.CTA],
    'dark-showcase': [SectionType.HERO, 'overlay-cards', 'image-bento', 'video-cards', 'statistics', 'faq', SectionType.CTA],
    'application-gallery': ['hero-editorial', 'image-cards', 'overlay-cards', 'split-stories', 'video-cards', SectionType.PRODUCT_CARD, 'faq', SectionType.CTA],
  };
  const composition = visualTemplates[kind];
  if (composition) {
    const sections = composition.map(key => sectionPresets.some(preset => preset.id === key) ? makePreset(key as SectionPresetId) : makeSection(key as SectionType, products));
    if (kind === 'dark-showcase') for (const section of sections) {
      if (section.type === SectionType.CUSTOM) section.content.theme = 'dark';
      if (section.type === SectionType.CTA) section.design = { background: '#09090b', headingColor: '#ffffff', textColor: '#d4d4d8' };
    }
    if (kind === 'video-showcase') {
      const video = sections.find(section => section.type === SectionType.VIDEO)!;
      Object.assign(video.content, { layout: 'cinema', heading: 'Your solution, from every angle' });
    }
    if (kind === 'application-gallery') {
      const cards = sections.find(section => section.content.layout === 'image-cards')!;
      cards.content.columns = 2;
    }
    return sections;
  }
  const types = kind === 'overview' ? [SectionType.HERO, SectionType.INTRO, SectionType.FEATURES, SectionType.CTA]
    : [SectionType.HERO, SectionType.INTRO, SectionType.CHALLENGE, SectionType.USE_CASES, SectionType.IMAGE, SectionType.FEATURES, SectionType.METHODOLOGY, SectionType.PRODUCT_CARD, SectionType.CTA];
  const sections = types.map(type => makeSection(type, products));
  const stories = {
    'people-counting': { title: 'Understand your spaces. Improve every visit.', summary: 'People counting and occupancy insights for smarter buildings.', image: '/builder-placeholders/image-4-3.svg', applications: ['Retail entrances', 'Office occupancy', 'Shared spaces'], problems: ['Unclear visitor trends', 'Underused spaces', 'Manual headcounts'], features: ['Visitor flow insights', 'Occupancy monitoring', 'Centralized reporting'] },
    healthcare: { title: 'Connected facilities. Better care environments.', summary: 'Bring environmental monitoring and facility operations into one view.', image: '/builder-placeholders/image-4-3.svg', applications: ['Patient environments', 'Storage monitoring', 'Facility operations'], problems: ['Disconnected facility data', 'Delayed environmental alerts', 'Manual record keeping'], features: ['Environmental visibility', 'Timely notifications', 'Historical reporting'] },
    'water-management': { title: 'Monitor water. Protect your building.', summary: 'Connect metering, leak detection, and pressure monitoring across your sites.', image: '/builder-placeholders/image-4-3.svg', applications: ['Smart metering', 'Leak detection', 'Pressure monitoring'], problems: ['Hidden water leaks', 'Manual meter readings', 'Unexpected pressure changes'], features: ['Usage visibility', 'Leak notifications', 'Pressure insights'] },
  };
  const story = kind in stories ? stories[kind as keyof typeof stories] : undefined;
  if (story) {
    for (const section of sections) {
      if (section.type === SectionType.HERO) Object.assign(section.content, { heading: story.title, subheading: story.summary, backgroundImage: '' });
      if (section.type === SectionType.INTRO) Object.assign(section.content, { heading: story.summary, summary: 'A connected view of your operations', bodyText: 'Bring sensors, connectivity, and reporting together so your team can see changes and respond with confidence. Tailor this example to the capabilities of your own solution.', image: story.image });
      if (section.type === SectionType.CHALLENGE) section.content.challenges = story.problems.map(title => ({ title, description: 'Describe how this challenge affects your customers and how your solution addresses it.', category: 'Operations' }));
      if (section.type === SectionType.USE_CASES) section.content.tabs = story.applications.map((label, index) => ({ id: `application-${index + 1}`, label, solutionDetails: `Describe your approach to ${label.toLowerCase()} and where devices are installed.`, statValue: 'Live', statDescription: 'Connected site visibility', bullets: ['Connect relevant sensors', 'Monitor site conditions', 'Notify your team'] }));
      if (section.type === SectionType.FEATURES) section.content.features = story.features.map(title => ({ title, description: 'Explain this capability and the practical value it brings to your customers.', icon: '✦' }));
    }
  }
  if (kind !== 'overview') sections.splice(2, 0, makePreset('statistics'));
  if (kind !== 'overview') sections.splice(sections.length - 1, 0, makePreset('case-studies'), makePreset('resources'), makePreset('faq'));
  return sections;
}

// Templates for adding items to an empty collection; do not infer types from old values.
export const arrayTemplates: Record<string, Record<string, unknown> | string> = {
  mediaCards: { title: 'New image card', image: '', imageAlt: 'Describe this image' },
  tableColumns: 'New column',
  tableRows: { cells: ['Value', 'Value'] },
  cells: 'Value',
  entries: { title: 'New item', description: 'Describe this item.', image: '', imageAlt: 'Describe this image', videoUrl: '', link: '', linkText: 'Learn more', value: '' },
  features: { title: 'New feature', description: 'Describe this feature.', icon: '' },
  benefits: { title: 'New benefit', description: 'Describe this benefit.', image: '/builder-placeholders/image-4-3.svg' },
  testimonials: { quote: 'Customer quote', author: 'Name', role: 'Role', company: 'Company', avatar: '/builder-placeholders/image-1-1.svg' },
  challenges: { title: 'New challenge', description: 'Describe this challenge.', category: 'Operations', exploreLink: '/solutions' },
  tabs: { id: 'new-application', label: 'New application', solutionDetails: 'Describe this application.', statValue: '24/7', statDescription: 'Monitoring', bullets: ['New capability'] },
  steps: { title: 'New step', description: 'Describe this step.' },
  cards: { title: 'New card', description: 'Describe this card.' },
  highlights: { title: 'New highlight', description: 'Describe the value of this capability.' },
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
  mediaCards: 3,
  tableColumns: 12,
  tableRows: 100,
  cells: 12,
  entries: 12,
  features: 12,
  benefits: 8,
  testimonials: 10,
  challenges: 12,
  tabs: 20,
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
  const base = sectionLibrary.find(item => item.type === section.type)?.content || {};
  const preset = sectionPresets.find(item => item.id === (section.content.layout === 'image-banner' && section.content.overlayStyle === 'side' ? 'image-banner-side' : section.content.layout))?.content || {};
  const defaults = { ...base, ...preset };
  const content = { ...JSON.parse(JSON.stringify(defaults)), ...section.content };
  if (['image-cards', 'overlay-cards', 'image-bento', 'split-stories', 'case-studies', 'video-cards', 'faded-image-cards'].includes(content.layout) && Array.isArray(content.entries)) {
    content.entries = content.entries.map((entry: Record<string, unknown>) => ({ image: '', imageAlt: '', ...(content.layout === 'video-cards' ? { videoUrl: '' } : {}), ...entry }));
  }
  if (section.type === SectionType.HERO && Array.isArray(content.mediaCards)) {
    content.mediaCards = content.mediaCards.map((card: Record<string, unknown>) => ({ image: '', imageAlt: '', ...card }));
  }
  return content;
}

export const previewDocument = (): BuilderDocument => ({ title: 'Intelligent infrastructure', slug: 'intelligent-infrastructure', metaDescription: 'Connected solutions for your business.', sections: makeTemplate('overview') });
