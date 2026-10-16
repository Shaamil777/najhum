import { buildMetadata, pageSchema } from "@/lib/seo";
import { pageSeo } from "@/content/page-seo";
import { pageSections } from "@/content/page-sections";
import StructuredData from "@/components/seo/StructuredData";
import AboutHero from "@/components/sections/about/AboutHero";
import AboutIntro from "@/components/sections/about/AboutIntro";
import AboutPlatform from "@/components/sections/about/AboutPlatform";
import AboutMethodology from "@/components/sections/about/AboutMethodology";
import AboutDifferentiator from "@/components/sections/about/AboutDifferentiator";
import AboutTrust from "@/components/sections/about/AboutTrust";
import AboutPresence from "@/components/sections/about/AboutPresence";
import AboutCta from "@/components/sections/about/AboutCta";

export const metadata = buildMetadata(pageSeo.about);

export default function AboutPage() {
  return (
    <><StructuredData data={pageSchema(pageSeo.about, pageSections.about)} /><div className="flex flex-col w-full">
      <AboutHero />
      <AboutIntro />
      <AboutPlatform />
      {/* <AboutMethodology /> */}
      <AboutDifferentiator />
      <AboutTrust />
      {/* <AboutPresence /> */}
      <AboutCta />
    </div></>
  );
}
