import { buildMetadata, pageSchema } from "@/lib/seo";
import { pageSeo } from "@/content/page-seo";
import { pageSections } from "@/content/page-sections";
import StructuredData from "@/components/seo/StructuredData";
import { Poppins } from "next/font/google";
import IotricsHero from "@/components/sections/iotrics/IotricsHero";
import IotricsPipeline from "@/components/sections/iotrics/IotricsPipeline";
import IotricsAbout from "@/components/sections/iotrics/IotricsAbout";
import IotricsCore from "@/components/sections/iotrics/IotricsCore";
import IotricsMethodology from "@/components/sections/iotrics/IotricsMethodology";
import IotricsBusinessModel from "@/components/sections/iotrics/IotricsBusinessModel";
import IotricsIndustries from "@/components/sections/iotrics/IotricsIndustries";
import IotricsFaq from "@/components/sections/iotrics/IotricsFaq";
import IotricsCta from "@/components/sections/iotrics/IotricsCta";
import PlatformProductsServer from "@/components/shared/PlatformProductsServer";
import PlatformSolutionsServer from "@/components/shared/PlatformSolutionsServer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = buildMetadata(pageSeo.iotrics);

export default function IotricsPage() {
  return (
    <><StructuredData data={pageSchema(pageSeo.iotrics, pageSections.iotrics, { "@type": "SoftwareApplication", name: "IoTRICs", applicationCategory: "BusinessApplication", operatingSystem: "Web", url: pageSeo.iotrics.path, provider: { "@type": "Organization", name: "Najhum Technologies LLC" } })} /><div className={`flex flex-col w-full ${poppins.className}`}>
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
      <IotricsPipeline />
      <IotricsAbout />
      <IotricsCore />
      <PlatformProductsServer platformId="iotrics" />
      {/* <PlatformSolutionsServer platformId="iotrics" /> */}
      <IotricsBusinessModel />
      {/* Core capabilities section hidden; component and content retained. */}
      <IotricsIndustries />
      <IotricsFaq />
      <IotricsCta />
    </div></>
  );
}
