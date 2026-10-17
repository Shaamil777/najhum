import PortfolioHero from "@/components/sections/portfolio/PortfolioHero";
import PortfolioMetrics from "@/components/sections/portfolio/PortfolioMetrics";
import PortfolioIndustries from "@/components/sections/portfolio/PortfolioIndustries";
import PortfolioProjects from "@/components/sections/portfolio/PortfolioProjects";
import PortfolioCta from "@/components/sections/portfolio/PortfolioCta";
import { buildMetadata } from "@/lib/seo";
import { pageSeo } from "@/content/page-seo";

export const metadata = buildMetadata(pageSeo.portfolio);

export default function PortfolioPage() {
  return (
    <div className="flex flex-col w-full">
      <PortfolioHero />
      <PortfolioMetrics />
      <PortfolioIndustries />
      <PortfolioProjects />
      <PortfolioCta />
    </div>
  );
}
