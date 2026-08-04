import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import Solutions from "@/components/home/Solutions";
import Process from "@/components/home/Process";
import Impact from "@/components/home/Impact";
import WhyChoose from "@/components/home/WhyChoose";
import Trust from "@/components/home/Trust";
import Analytics from "@/components/home/Analytics";
import Faq from "@/components/home/Faq";
import Cta from "@/components/home/Cta";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <Hero />
      <About />
      <Solutions />
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
