import Hero from "@/components/sections/home/Hero";
import TrustedClients from "@/components/sections/home/TrustedClients";
import About from "@/components/sections/home/About";
import Platforms from "@/components/sections/home/Platforms";
import Process from "@/components/sections/home/Process";
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
      <TrustedClients />
      <About />
      <Platforms />
      <Process />
      <Impact />
      <WhyChoose />
      <Trust />
      <Analytics />
      <Faq />
      <Cta />
    </div>
  );
}
