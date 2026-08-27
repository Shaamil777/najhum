import IotricsHero from "@/components/sections/iotrics/IotricsHero";
import IotricsAbout from "@/components/sections/iotrics/IotricsAbout";
import IotricsCore from "@/components/sections/iotrics/IotricsCore";
import IotricsComparison from "@/components/sections/iotrics/IotricsComparison";
import IotricsMethodology from "@/components/sections/iotrics/IotricsMethodology";
import IotricsBusinessModel from "@/components/sections/iotrics/IotricsBusinessModel";
import IotricsCapabilities from "@/components/sections/iotrics/IotricsCapabilities";
import IotricsIndustries from "@/components/sections/iotrics/IotricsIndustries";
import IotricsClients from "@/components/sections/iotrics/IotricsClients";
import IotricsCta from "@/components/sections/iotrics/IotricsCta";

export default function IotricsPage() {
  return (
    <div className="flex flex-col w-full">
      <IotricsHero />
      <IotricsAbout />
      <IotricsCore />
      <IotricsComparison />
      <IotricsMethodology />
      <IotricsBusinessModel />
      <IotricsCapabilities />
      <IotricsIndustries />
      <IotricsClients />
      <IotricsCta />
    </div>
  );
}
