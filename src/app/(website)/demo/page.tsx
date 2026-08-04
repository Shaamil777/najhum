import DemoHero from "@/components/demo/DemoHero";
import DemoTrustMetrics from "@/components/demo/DemoTrustMetrics";
import DemoDashboardUI from "@/components/demo/DemoDashboardUI";
import DemoPlatformPortfolios from "@/components/demo/DemoPlatformPortfolios";
import DemoModules from "@/components/demo/DemoModules";
import DemoArchitecture from "@/components/demo/DemoArchitecture";
import DemoTechStack from "@/components/demo/DemoTechStack";
import DemoEnterpriseFeatures from "@/components/demo/DemoEnterpriseFeatures";
import DemoCta from "@/components/demo/DemoCta";

export default function DemoPage() {
  return (
    <div className="flex flex-col w-full">
      <DemoHero />
      <DemoTrustMetrics />
      <DemoDashboardUI />
      <DemoPlatformPortfolios />
      <DemoModules />
      <DemoArchitecture />
      <DemoTechStack />
      <DemoEnterpriseFeatures />
      <DemoCta />
    </div>
  );
}