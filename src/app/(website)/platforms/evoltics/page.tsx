import { buildMetadata, pageSchema } from "@/lib/seo";
import { pageSeo } from "@/content/page-seo";
import { pageSections } from "@/content/page-sections";
import StructuredData from "@/components/seo/StructuredData";
import EvolticsHero from "@/components/sections/evoltics/EvolticsHero";
import EvolticsAbout from "@/components/sections/evoltics/EvolticsAbout";
import EvolticsEcosystem from "@/components/sections/evoltics/EvolticsEcosystem";
import EvolticsComparison from "@/components/sections/evoltics/EvolticsComparison";
import EvolticsPlatform from "@/components/sections/evoltics/EvolticsPlatform";
import PlatformProductsServer from "@/components/shared/PlatformProductsServer";
import PlatformSolutionsServer from "@/components/shared/PlatformSolutionsServer";
import EvolticsMobileApp from "@/components/sections/evoltics/EvolticsMobileApp";
import EvolticsSolutions from "@/components/sections/evoltics/EvolticsSolutions";
import EvolticsJourney from "@/components/sections/evoltics/EvolticsJourney";
import EvolticsCarbonCredit from "@/components/sections/evoltics/EvolticsCarbonCredit";
import EvolticsFaq from "@/components/sections/evoltics/EvolticsFaq";
import EvolticsCta from "@/components/sections/evoltics/EvolticsCta";

import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins"
});

export const metadata = buildMetadata(pageSeo.evoltics);

export default function EvolticsPage() {
  return (
    <><StructuredData data={pageSchema(pageSeo.evoltics, pageSections.evoltics, { "@type": "SoftwareApplication", name: "EVOLTICS", applicationCategory: "BusinessApplication", operatingSystem: "Web", url: pageSeo.evoltics.path, provider: { "@type": "Organization", name: "Najhum Technologies LLC" } })} /><div
      className={`flex flex-col w-full ${poppins.variable} ${poppins.className}`}
      style={{
        '--font-display': 'var(--font-poppins)',
        '--font-sans': 'var(--font-poppins)',
      } as React.CSSProperties}
    >
      <EvolticsHero />
      <EvolticsAbout />
      <EvolticsSolutions />
      <EvolticsComparison />
      <EvolticsPlatform />
      <PlatformProductsServer platformId="evoltics" />
      {/* <PlatformSolutionsServer platformId="evoltics" /> */}
      <EvolticsMobileApp />
      <EvolticsCarbonCredit />
      <EvolticsEcosystem />
      <EvolticsJourney />
      <EvolticsFaq />
      <EvolticsCta />
    </div></>
  );
}
