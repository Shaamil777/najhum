import AboutHero from "@/components/about/AboutHero";
import AboutIntro from "@/components/about/AboutIntro";
import AboutPlatform from "@/components/about/AboutPlatform";
import AboutMethodology from "@/components/about/AboutMethodology";
import AboutDifferentiator from "@/components/about/AboutDifferentiator";
import AboutTrust from "@/components/about/AboutTrust";
import AboutPresence from "@/components/about/AboutPresence";
import AboutCta from "@/components/about/AboutCta";

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
