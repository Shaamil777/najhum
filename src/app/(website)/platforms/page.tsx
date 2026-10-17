import PlatformsHero from "@/components/sections/platforms/PlatformsHero";
import PlatformsGrid from "@/components/sections/platforms/PlatformsGrid";
import PlatformsCta from "@/components/sections/platforms/PlatformsCta";
import { buildMetadata } from "@/lib/seo";
import { pageSeo } from "@/content/page-seo";

export const metadata = buildMetadata(pageSeo.platforms);

export default function PlatformsPage() {
  return (
    <div className="flex flex-col w-full">
      <PlatformsHero />
      <PlatformsGrid />
      <PlatformsCta />
    </div>
  );
}
