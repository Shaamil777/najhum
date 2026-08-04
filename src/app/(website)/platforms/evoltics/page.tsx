import EvolticsHero from "@/components/evoltics/EvolticsHero";
import EvolticsChallenges from "@/components/evoltics/EvolticsChallenges";
import EvolticsComparison from "@/components/evoltics/EvolticsComparison";
import EvolticsFacilities from "@/components/evoltics/EvolticsFacilities";
import EvolticsDashboard from "@/components/evoltics/EvolticsDashboard";
import EvolticsHardware from "@/components/evoltics/EvolticsHardware";
import EvolticsArchitecture from "@/components/evoltics/EvolticsArchitecture";
import EvolticsProcess from "@/components/evoltics/EvolticsProcess";
import EvolticsMetrics from "@/components/evoltics/EvolticsMetrics";
import EvolticsClients from "@/components/evoltics/EvolticsClients";
import EvolticsCta from "@/components/evoltics/EvolticsCta";
import EvolticsExplore from "@/components/evoltics/EvolticsExplore";

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
