import Hero from "@/components/sections/home/Hero";

import About from "@/components/sections/home/About";
import Platforms from "@/components/sections/home/Platforms";
import Impact from "@/components/sections/home/Impact";
import WhyChoose from "@/components/sections/home/WhyChoose";
import Trust from "@/components/sections/home/Trust";
import Analytics from "@/components/sections/home/Analytics";
import Faq from "@/components/sections/home/Faq";
import Cta from "@/components/sections/home/Cta";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <Hero />

      {/* Sticky Scroll Container */}
      <div className="relative z-10 bg-white">
        <About />
        <Platforms />
      </div>

      {/* Rest of the page */}
      <div className="relative z-20 bg-white">
        <Impact />
        <WhyChoose />
        <Trust />
        <Analytics />
        <Faq />
        <Cta />
      </div>
    </div>
  );
}
