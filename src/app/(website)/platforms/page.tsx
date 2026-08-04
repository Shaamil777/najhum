import PlatformsHero from "@/components/platforms/PlatformsHero";
import PlatformsGrid from "@/components/platforms/PlatformsGrid";
import PlatformsCta from "@/components/platforms/PlatformsCta";

export default function PlatformsPage() {
  return (
    <div className="flex flex-col w-full">
      <PlatformsHero />
      <PlatformsGrid />
      <PlatformsCta />
    </div>
  );
}
