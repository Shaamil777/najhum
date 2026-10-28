import { siteConfig } from "@/config/site";
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/admin", "/dashboard/", "/test-ui", "/dashboard_Demo/", "/demo"],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
