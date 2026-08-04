import EvolticsHero from "@/components/sections/evoltics/EvolticsHero";
import EvolticsChallenges from "@/components/sections/evoltics/EvolticsChallenges";
import EvolticsComparison from "@/components/sections/evoltics/EvolticsComparison";
import EvolticsFacilities from "@/components/sections/evoltics/EvolticsFacilities";
import EvolticsDashboard from "@/components/sections/evoltics/EvolticsDashboard";
import EvolticsHardware from "@/components/sections/evoltics/EvolticsHardware";
import EvolticsArchitecture from "@/components/sections/evoltics/EvolticsArchitecture";
import EvolticsProcess from "@/components/sections/evoltics/EvolticsProcess";
import EvolticsMetrics from "@/components/sections/evoltics/EvolticsMetrics";
import EvolticsClients from "@/components/sections/evoltics/EvolticsClients";
import EvolticsCta from "@/components/sections/evoltics/EvolticsCta";
import EvolticsExplore from "@/components/sections/evoltics/EvolticsExplore";

export default function EvolticsPage() {
  return (
    <div className="flex flex-col w-full">
      <EvolticsHero />
      <EvolticsChallenges />
      <EvolticsComparison />
      <EvolticsFacilities />
      <EvolticsDashboard />
      <EvolticsHardware />
      <EvolticsArchitecture />
      <EvolticsProcess />
      <EvolticsMetrics />
      <EvolticsClients />
      <EvolticsCta />
      <EvolticsExplore />
    </div>
  );
}
