import EvolticsHero from "@/components/sections/evoltics/EvolticsHero";
import EvolticsAbout from "@/components/sections/evoltics/EvolticsAbout";
import EvolticsEcosystem from "@/components/sections/evoltics/EvolticsEcosystem";
import EvolticsComparison from "@/components/sections/evoltics/EvolticsComparison";
import EvolticsPlatform from "@/components/sections/evoltics/EvolticsPlatform";
import EvolticsMobileApp from "@/components/sections/evoltics/EvolticsMobileApp";
import EvolticsSolutions from "@/components/sections/evoltics/EvolticsSolutions";
import EvolticsJourney from "@/components/sections/evoltics/EvolticsJourney";
import EvolticsCta from "@/components/sections/evoltics/EvolticsCta";

import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins"
});

export default function EvolticsPage() {
  return (
    <div 
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
      <EvolticsMobileApp />
      <EvolticsEcosystem />
      <EvolticsJourney />
      <EvolticsCta />
    </div>
  );
}
