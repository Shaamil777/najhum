export type SearchCategory = 'Pages' | 'Platforms' | 'Solutions' | 'Products' | 'Blogs';
export interface SearchEntry { title: string; href: string; description: string; category: SearchCategory; keywords?: string }
export const recommendedPages: SearchEntry[] = [
  { title: 'Solutions', href: '/solutions', description: 'Explore applications across industries and find the right solution.', category: 'Pages', keywords: 'facilities hospitality hotel cold storage industrial energy monitoring' },
  { title: 'Blogs', href: '/blogs', description: 'Read insights on connected infrastructure, IoT, energy, EV charging, and agriculture.', category: 'Pages', keywords: 'blog blogs articles journal insights stories perspectives' },
  { title: 'IoTRICs', href: '/platforms/iotrics', description: 'Connected buildings, industrial monitoring, sensors, and operational intelligence.', category: 'Platforms', keywords: 'iot internet things smart building bms hvac temperature humidity occupancy water energy' },
  { title: 'EVOLTICS', href: '/platforms/evoltics', description: 'EV charging management, infrastructure, and smart mobility.', category: 'Platforms', keywords: 'electric vehicle ev charger charging parking ocpp' },
  { title: 'cropifAI', href: '/platforms/cropifai', description: 'Precision agriculture and automated growing environments.', category: 'Platforms', keywords: 'agriculture farming crop greenhouse irrigation climate' },
  { title: 'Products', href: '/products', description: 'Browse connected devices, sensors, and platform products.', category: 'Pages', keywords: 'hardware sensors gateways equipment' },
  { title: 'Book a demo', href: '/contact', description: 'Explore our platforms and arrange a demonstration.', category: 'Pages', keywords: 'dashboard live demo demonstration' },
  { title: 'Contact our team', href: '/contact', description: 'Discuss a project, request support, or get in touch.', category: 'Pages', keywords: 'contact email phone address support sales quotation dubai uae' },
  { title: 'About Najhum', href: '/about', description: 'Meet Najhum Technologies and learn about our approach.', category: 'Pages', keywords: 'company team about najhum' },
];
export function searchableText(value: unknown): string {
  if (typeof value === 'string') return value.replace(/<[^>]*>/g, ' ').replace(/&[a-z#0-9]+;/gi, ' ').replace(/https?:\/\/\S+/g, ' ');
  if (Array.isArray(value)) return value.map(searchableText).join(' ');
  if (value && typeof value === 'object') return Object.entries(value).filter(([key]) => !/image|url|link|_design|rawData/i.test(key)).map(([, item]) => searchableText(item)).join(' ');
  return '';
}
export function rankSearch(entries: SearchEntry[], query: string, category?: string) {
  const normalize = (value: string) => value.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const terms = normalize(query.trim()).split(/\s+/).filter(Boolean);
  return entries.filter(entry => !category || category === 'All' || entry.category === category).map((entry, index) => {
    const title = normalize(entry.title), description = normalize(entry.description), body = normalize(entry.keywords || '');
    const score = terms.reduce((total, term) => total + (title.includes(term) ? 12 : 0) + (description.includes(term) ? 5 : 0) + (body.includes(term) ? 2 : 0), 0);
    const matches = terms.every(term => `${title} ${description} ${body}`.includes(term));
    return { entry, index, score, matches };
  }).filter(item => item.matches).sort((a,b) => b.score - a.score || a.index - b.index).slice(0,24).map(({ entry }) => ({ title: entry.title, href: entry.href, description: entry.description, category: entry.category }));
}
