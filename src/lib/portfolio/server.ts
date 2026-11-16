import { publishIssues } from './editor';
import { prisma } from '@/lib/db/prisma';
import { projectSchema, settingsSchema } from './schema';
import { sanitizeBlogContent } from '@/lib/blog/content';
import { apiErrors } from '@/lib/utils/api-error';
import { revalidatePath } from 'next/cache';
export const publishedProjects = { isDraft:false,publishedAt:{not:null},contentMode:'HTML',publishedRevisionId:{not:null} } as const;
export async function getPortfolioSettings() { return settingsSchema.parse(await prisma.portfolioSettings.findUnique({where:{id:'main'}}) ?? {}); }
export function prepareProject(input:unknown) {
 const data=projectSchema.parse(input);
 for(const key of ['challenge','solution','results'] as const) data[key]=sanitizeBlogContent(data[key]);
 data.technology=data.technology.filter(item=>item.label||item.items);
 data.outcomes=data.outcomes.filter(item=>item.value||item.label||item.context);
 for(const key of ['painPoints','components','architectureSteps','keyWins'] as const) data.caseStudy[key]=data.caseStudy[key].filter(item=>item.title||item.description);
 data.caseStudy.clientFacts=data.caseStudy.clientFacts.filter(item=>item.label||item.value);
 if(!data.isDraft){const issues=publishIssues(data);if(issues.length)throw apiErrors.badRequest(issues[0].message,issues);}

 return data;
}
export function refreshPortfolio(...slugs:string[]) { for(const path of ['/portfolio','/admin/portfolio','/sitemap.xml',...slugs.map(slug=>`/portfolio/${slug}`)]) revalidatePath(path); }
