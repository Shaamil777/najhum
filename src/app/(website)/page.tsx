import { buildMetadata, pageSchema } from "@/lib/seo";
import { pageSeo } from "@/content/page-seo";
import { pageSections } from "@/content/page-sections";
import StructuredData from "@/components/seo/StructuredData";
import Hero from "@/components/sections/home/Hero";

import About from "@/components/sections/home/About";
import Platforms from "@/components/sections/home/Platforms";
import Impact from "@/components/sections/home/Impact";
import WhyChoose from "@/components/sections/home/WhyChoose";
import Analytics from "@/components/sections/home/Analytics";
import Faq from "@/components/sections/home/Faq";
import Cta from "@/components/sections/home/Cta";

export const metadata = buildMetadata(pageSeo.home);

export default function Home() {
  return (
    <><StructuredData data={pageSchema(pageSeo.home, pageSections.home)} /><div className="flex flex-col w-full">
      <Hero />
      {/* Scroll Container */}
      <div className="relative z-10 bg-white">
        <About />
        <Platforms />
      </div>

      {/* Rest of the page */}
      <div className="relative z-20 bg-white">
        <Impact />
        <WhyChoose />
        <Analytics />
        <Faq />
        <Cta />
      </div>
    </div></>
  );
}
