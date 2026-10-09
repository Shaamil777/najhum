import { siteConfig } from "@/config/site";
import type { MetadataRoute } from "next";
import { prisma } from '@/lib/db/prisma';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = [
    "",
    "/about",
    "/contact",
    "/demo",
    "/portfolio",
    "/products",
    "/platforms",
    "/solutions",
    "/blogs",
    "/platforms/iotrics",
    "/platforms/evoltics",
    "/platforms/cropifai",
  ];

  const solutions = await prisma.solution.findMany({ where: { isDraft: false }, select: { slug: true, updatedAt: true } });
  const staticPages: MetadataRoute.Sitemap = routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
  return [...staticPages, ...solutions.map((solution) => ({ url: `${siteConfig.url}/solutions/${solution.slug}`, lastModified: solution.updatedAt, changeFrequency: 'monthly' as const, priority: 0.8 }))];
}
