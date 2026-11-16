import { z } from 'zod';
import { isSafeMediaUrl } from '@/lib/utils/content-url';
export const MAX_JOURNEY_STEPS = 20;
const text = (max = 250) => z.string().trim().max(max).default('');
const media = z.string().max(2000).refine(value => !value || isSafeMediaUrl(value), 'Use a local path or an HTTP(S) URL.').default('');
export const caseStudyIconSchema = z.enum(['building','energy','air','alert','settings','sensor','cloud','network','mobile','chart']);
const feature = z.object({ title:text(160), description:text(1500), icon:caseStudyIconSchema.default('sensor') });
export const caseStudySchema = z.object({
 clientDisplay:z.enum(['name','logo','both']).default('both'),heroClientDisplay:z.enum(['name','logo','both']).default('name'),logoSize:z.enum(['small','medium','large']).default('medium'),logoMobileSize:z.enum(['small','medium','large']).default('small'),logoTreatment:z.enum(['original','invert','dark','light']).default('original'),gallerySize:z.enum(['small','medium','large']).default('medium'),galleryFit:z.enum(['cover','contain']).default('cover'),comparisonContext:z.array(z.object({label:text(100),before:text(500),after:text(500)})).max(12).default([]),testimonialNote:text(500),
 showFacts:z.boolean().default(true),showSectionNav:z.boolean().default(true),hiddenSections:z.array(z.enum(['overview','challenge','solution','technology','results','gallery','testimonial','resources','related'])).max(9).default([]),
 heroTitle:text(200),heroAccent:text(200),coverCaption:text(500),overviewHeading:text(200),clientFacts:z.array(z.object({label:text(100),value:text(250)})).max(20).default([]),
 challengeHeading:text(200),challengeIntro:text(1500),challengeCallout:text(1000),painPoints:z.array(feature).max(20).default([]),
 solutionHeading:text(200),solutionIntro:text(1500),solutionCallout:text(1000),components:z.array(feature).max(20).default([]),
 technologyHeading:text(200),technologyIntro:text(1500),architectureTitle:text(200),architectureSteps:z.array(feature).max(MAX_JOURNEY_STEPS).default([]),
 outcomeMode:z.enum(['objectives','results']).default('objectives'),resultsHeading:text(200),resultsIntro:text(1500),keyWins:z.array(feature).max(20).default([]),
 comparisonTitle:text(200),comparisonNote:text(1000),comparisonUnit:text(50),comparisonRows:z.array(z.object({label:text(100),value:z.number().finite().min(0).max(1000000000)})).max(12).default([]),
 galleryHeading:text(200),galleryIntro:text(1500),testimonialHeading:text(200),ctaHeading:text(200),ctaText:text(1000),
}).prefault({});
export type CaseStudy = z.infer<typeof caseStudySchema>;
export const galleryImageSchema = z.object({ url: media, alt: text(250), caption: text(500), section: z.enum(['challenge','solution','results','gallery','dashboard','technology','mobile']).default('gallery') });
export const projectSchema = z.object({
 title: z.string().trim().min(1,'Add a project title.').max(200), slug: z.string().trim().min(1).max(120).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/,'Use lowercase words separated by hyphens.'),
 summary: text(500), clientName: text(), clientLogo: media, clientOverview: text(4000), industry: text(100), location: text(), year: text(20), duration: text(100), deliveryModel: text(100),
 platforms: z.array(z.enum(['iotrics','evoltics','cropifai'])).max(3).default([]), solutionIds: z.array(z.string().max(150)).max(100).default([]), productIds: z.array(z.string().max(150)).max(100).default([]),
 coverImage: media, coverAlt: text(), challenge: text(100000), solution: text(100000), results: text(100000),
 technology: z.array(z.object({label:text(100),items:text(1000)})).max(30).default([]), outcomes:z.array(z.object({value:text(100),label:text(200),context:text(500)})).max(20).default([]),
 gallery:z.array(galleryImageSchema).max(100).default([]), caseStudy:caseStudySchema, galleryLayout:z.enum(['grid','full','mixed']).default('grid'),
 testimonialQuote:text(4000),testimonialName:text(),testimonialRole:text(),documentUrl:media,
 seoTitle:text(200),seoDescription:text(300),ogImage:media,noIndex:z.boolean().default(false),featured:z.boolean().default(false),order:z.number().int().min(0).max(100000).default(0),isDraft:z.boolean().default(true),
});
export type ProjectInput = z.infer<typeof projectSchema>;
export type GalleryImage = z.infer<typeof galleryImageSchema>;
export const settingsSchema = z.object({heading:z.string().trim().min(1).max(200).default('Connected infrastructure. Proven in practice.'),introduction:z.string().trim().max(1000).default('Explore the projects connecting people, assets, and operations.'),seoTitle:z.string().trim().min(1).max(100).default('Projects & Case Studies | Najhum'),seoDescription:z.string().trim().max(300).default('Explore Najhum projects across industrial IoT, EV charging and precision agriculture.'),ogImage:media,noIndex:z.boolean().default(false)});
export type PortfolioSettingsInput = z.infer<typeof settingsSchema>;
export const platformLabels: Record<string,string> = {iotrics:'IoTRICs',evoltics:'EVOLTICS',cropifai:'cropifAI'};
