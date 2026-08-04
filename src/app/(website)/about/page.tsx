import AboutHero from "@/components/sections/about/AboutHero";
import AboutIntro from "@/components/sections/about/AboutIntro";
import AboutPlatform from "@/components/sections/about/AboutPlatform";
import AboutMethodology from "@/components/sections/about/AboutMethodology";
import AboutDifferentiator from "@/components/sections/about/AboutDifferentiator";
import AboutTrust from "@/components/sections/about/AboutTrust";
import AboutPresence from "@/components/sections/about/AboutPresence";
import AboutCta from "@/components/sections/about/AboutCta";

export default function AboutPage() {
  return (
    <div className="flex flex-col w-full pt-20">
      <AboutHero />
      <AboutIntro />
      <AboutPlatform />
      <AboutMethodology />
      <AboutDifferentiator />
      <AboutTrust />
      <AboutPresence />
      <AboutCta />
    </div>
  );
}
