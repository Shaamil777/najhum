import PortfolioHero from "@/components/portfolio/PortfolioHero";
import PortfolioMetrics from "@/components/portfolio/PortfolioMetrics";
import PortfolioIndustries from "@/components/portfolio/PortfolioIndustries";
import PortfolioProjects from "@/components/portfolio/PortfolioProjects";
import PortfolioCta from "@/components/portfolio/PortfolioCta";

export default function PortfolioPage() {
  return (
    <div className="flex flex-col w-full pt-20">
      <PortfolioHero />
      <PortfolioMetrics />
      <PortfolioIndustries />
      <PortfolioProjects />
      <PortfolioCta />
    </div>
  );
}
