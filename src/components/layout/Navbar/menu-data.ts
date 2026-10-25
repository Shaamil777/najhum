import { matchesClassification, type SolutionClassification } from '@/lib/solution-classification';
export interface PublishedSolutionItem { title: string; slug: string; metaDescription: string | null; classification?: SolutionClassification; }
const SOLUTION_ICONS: Record<string, string> = {
  "facilities-management":
    "M4 21V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v17M16 9h3a1 1 0 0 1 1 1v11M2 21h20M8 7h4M8 11h4M8 15h4",
  "hospitality":
    "M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8M2 16h20M6 10V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v4",
  "cold-storage":
    "M12 2v20M4.9 4.9l14.2 14.2M2 12h20M4.9 19.1 19.1 4.9",
  "industrial":
    "M2 20V9l6 4V9l6 4V5l8 4v11H2zM6 16h2M11 16h2M16 16h2",
  "energy-monitoring":
    "M13 2 4 14h7l-1 8 9-12h-7l1-8z",
};

const DEFAULT_ICON =
  "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10";


const shortDescriptions: Record<string, string> = {
  "facilities-management": "Comfort, utilities and critical assets",
  hospitality: "Guest comfort, kitchens and back-of-house",
  "cold-storage": "Cold-room temperature, doors and refrigeration",
  industrial: "Materials, equipment and plant conditions",
  "energy-monitoring": "Usage by site, circuit or asset",
};
export function buildSolutionGroups(solutions: PublishedSolutionItem[]) {
  const published = solutions;
  const toItem = (s: PublishedSolutionItem) => ({ title: s.title, href: `/solutions/${s.slug}`, desc: shortDescriptions[s.slug] || s.metaDescription || "Connected monitoring for your operations", d: SOLUTION_ICONS[s.slug] || DEFAULT_ICON });
  const industry = published.filter(s => matchesClassification(s.classification, 'industry')).map(toItem);
  const usecase = published.filter(s => matchesClassification(s.classification, 'usecase')).map(toItem);
  const hotel = industry.find(s => s.href.endsWith('/hospitality')) || industry[0];
  const cold = usecase.find(s => s.href.endsWith('/cold-storage')) || usecase[0];
  return {
    industry: { label: "By industry", hint: "Where you operate", heading: "Solutions by industry", subheading: "Pick your sector", items: industry, featured: hotel },
    usecase: { label: "By use case", hint: "What you need to monitor", heading: "Solutions by use case", subheading: "Pick what you need to solve", items: usecase, featured: cold },
  };
}
