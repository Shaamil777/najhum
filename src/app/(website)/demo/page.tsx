import DemoHero from "@/components/sections/demo/DemoHero";
import DemoTrustMetrics from "@/components/sections/demo/DemoTrustMetrics";
import DemoDashboardUI from "@/components/sections/demo/DemoDashboardUI";
import DemoPlatformPortfolios from "@/components/sections/demo/DemoPlatformPortfolios";
import DemoModules from "@/components/sections/demo/DemoModules";
import DemoArchitecture from "@/components/sections/demo/DemoArchitecture";
import DemoTechStack from "@/components/sections/demo/DemoTechStack";
import DemoEnterpriseFeatures from "@/components/sections/demo/DemoEnterpriseFeatures";
import DemoCta from "@/components/sections/demo/DemoCta";

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