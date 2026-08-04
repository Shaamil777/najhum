import IotricsHero from "@/components/iotrics/IotricsHero";
import IotricsAbout from "@/components/iotrics/IotricsAbout";
import IotricsMethodology from "@/components/iotrics/IotricsMethodology";
import IotricsBusinessModel from "@/components/iotrics/IotricsBusinessModel";
import IotricsCapabilities from "@/components/iotrics/IotricsCapabilities";
import IotricsIndustries from "@/components/iotrics/IotricsIndustries";
import IotricsClients from "@/components/iotrics/IotricsClients";
import IotricsCta from "@/components/iotrics/IotricsCta";

export default function IotricsPage() {
  return (
    <div className="flex flex-col w-full">
      <IotricsHero />
      <IotricsAbout />
      <IotricsMethodology />
      <IotricsBusinessModel />
      <IotricsCapabilities />
      <IotricsIndustries />
      <IotricsClients />
      <IotricsCta />
    </div>
  );
}
