import Hero from "@/components/sections/home/Hero";

import About from "@/components/sections/home/About";
import Platforms from "@/components/sections/home/Platforms";
import Impact from "@/components/sections/home/Impact";
import WhyChoose from "@/components/sections/home/WhyChoose";
import Faq from "@/components/sections/home/Faq";
import Cta from "@/components/sections/home/Cta";

export default function Home() {
  return (
    <div className="flex w-full flex-col bg-white">
      <Hero />
      <About />
      <Platforms />
      <Impact />
      <WhyChoose />
      <Faq />
      <Cta />
    </div>
  );
}
