import PlatformsHero from "@/components/sections/platforms/PlatformsHero";
import PlatformsGrid from "@/components/sections/platforms/PlatformsGrid";
import PlatformsCta from "@/components/sections/platforms/PlatformsCta";

export default function PlatformsPage() {
  return (
    <div className="flex flex-col w-full">
      <PlatformsHero />
      <PlatformsGrid />
      <PlatformsCta />
    </div>
  );
}
