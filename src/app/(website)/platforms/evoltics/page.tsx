import EvolticsHero from "@/components/sections/evoltics/EvolticsHero";
import EvolticsAbout from "@/components/sections/evoltics/EvolticsAbout";
import EvolticsEcosystem from "@/components/sections/evoltics/EvolticsEcosystem";
import EvolticsComparison from "@/components/sections/evoltics/EvolticsComparison";
import EvolticsPlatform from "@/components/sections/evoltics/EvolticsPlatform";
import EvolticsSolutions from "@/components/sections/evoltics/EvolticsSolutions";
import EvolticsJourney from "@/components/sections/evoltics/EvolticsJourney";
import EvolticsCta from "@/components/sections/evoltics/EvolticsCta";

export default function EvolticsPage() {
  return (
    <div className="flex flex-col w-full">
      <EvolticsHero />
      <EvolticsAbout />
      <EvolticsSolutions />
      <EvolticsComparison />
      <EvolticsPlatform />
      <EvolticsEcosystem />
      <EvolticsJourney />
      <EvolticsCta />
    </div>
  );
}
