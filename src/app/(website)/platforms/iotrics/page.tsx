import { Poppins } from "next/font/google";
import IotricsHero from "@/components/sections/iotrics/IotricsHero";
import IotricsAbout from "@/components/sections/iotrics/IotricsAbout";
import IotricsCore from "@/components/sections/iotrics/IotricsCore";
import IotricsMethodology from "@/components/sections/iotrics/IotricsMethodology";
import IotricsBusinessModel from "@/components/sections/iotrics/IotricsBusinessModel";
import IotricsIndustries from "@/components/sections/iotrics/IotricsIndustries";
import IotricsCta from "@/components/sections/iotrics/IotricsCta";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export default function IotricsPage() {
  return (
    <div className={`flex flex-col w-full ${poppins.className}`}>
      <style>{`
        .${poppins.className} h1,
        .${poppins.className} h2,
        .${poppins.className} h3,
        .${poppins.className} h4,
        .${poppins.className} h5,
        .${poppins.className} h6,
        .${poppins.className} p,
        .${poppins.className} span,
        .${poppins.className} div {
          font-family: inherit !important;
        }
      `}</style>
      <IotricsHero />
      <IotricsAbout />
      <IotricsCore />
      <IotricsMethodology />
      <IotricsBusinessModel />
      <IotricsIndustries />
      <IotricsCta />
    </div>
  );
}

