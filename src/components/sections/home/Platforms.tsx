"use client";

import { useId } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Cpu, Leaf, Plus, Radio, ScanLine, Workflow, Zap } from "lucide-react";
import { homeContent } from "@/content/home";

const platformDetails = {
  evoltics: {
    image: "/images/platforms/evoltics_hub.jpg",
    alt: "Electric vehicle charging stations at a mobility hub",
    category: "EV charging & mobility",
    icon: Zap,
    features: ["Charger management", "Load balancing", "Payments & billing"],
  },
  iotrics: {
    image: "/images/platforms/iotrics_factory.jpg",
    alt: "Industrial gateway and connected equipment on a factory floor",
    category: "Industrial IoT & intelligence",
    icon: Cpu,
    features: ["Connected assets", "Real-time insights", "Automation"],
  },
  cropifai: {
    image: "/images/platforms/cropifai_agriculture.jpg",
    alt: "Connected agriculture with sensors monitoring growing conditions",
    category: "Precision agriculture & AI",
    icon: Leaf,
    features: ["Crop intelligence", "Resource efficiency", "Yield optimization"],
  },
};

const methodology = [
  { title: "Collect", icon: ScanLine, description: "Capture data from your physical assets." },
  { title: "Connect", icon: Radio, description: "Bring every signal into a connected ecosystem." },
  { title: "Collaborate", icon: Workflow, description: "Turn shared intelligence into better decisions." },
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function Platforms() {
  const id = useId();
  const reducedMotion = useReducedMotion();
  const reveal = {
    initial: reducedMotion ? false as const : { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.12 },
  };

  return (
    <section
      id="platforms"
      aria-labelledby={`${id}-heading`}
      className="relative z-10 scroll-mt-20 overflow-hidden border-y border-slate-200 bg-[#f4f6f8] py-16 sm:py-20 lg:py-28"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[linear-gradient(to_right,#dfe5ed_1px,transparent_1px)] bg-[size:calc(100%/12)_100%] [mask-image:linear-gradient(to_bottom,black,transparent)] opacity-60" />
      <div className="relative mx-auto max-w-[1536px] px-6 sm:px-8 lg:px-12">
        <motion.div {...reveal} transition={{ duration: reducedMotion ? 0 : 0.7, ease }} className="mb-10 lg:mb-14">
          <div className="mb-6 flex items-center gap-3 text-[10px] font-bold tracking-[0.18em] text-primary uppercase sm:text-xs">
            <Plus size={16} aria-hidden="true" />
            <span>{homeContent.platforms.label}</span>
            <span aria-hidden="true" className="h-px flex-1 bg-slate-300" />
            <span className="hidden font-mono text-slate-500 sm:block">NAJHUM / PLATFORMS</span>
          </div>
          <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr] lg:items-end lg:gap-16">
            <h2 id={`${id}-heading`} className="font-display text-[clamp(2.25rem,4.5vw,4.5rem)] leading-[1.02] font-bold tracking-[-0.035em] text-slate-950 uppercase">
              One ecosystem.<br />
              <span className="text-primary">Built for impact.</span>
            </h2>
            <div className="max-w-md lg:ml-auto lg:pb-1">
              <p className="text-sm leading-7 text-slate-600 sm:text-base">
                From connected industries to electric mobility and smarter agriculture. Purpose-built platforms that turn your infrastructure into intelligence.
              </p>
              <span className="mt-5 inline-flex items-center gap-2 text-[10px] font-semibold tracking-[0.14em] text-slate-500 uppercase">
                <span aria-hidden="true" className="h-1.5 w-1.5 bg-primary" />
                Three platforms. One connected vision.
              </span>
            </div>
          </div>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-3 lg:gap-6">
          {homeContent.platforms.items.map((platform, index) => {
            const details = platformDetails[platform.id as keyof typeof platformDetails];
            const Icon = details.icon;
            const featured = platform.id === "iotrics";
            return (
              <motion.article
                key={platform.id}
                {...reveal}
                transition={{ duration: reducedMotion ? 0 : 0.75, delay: reducedMotion ? 0 : index * 0.1, ease }}
                className={`group relative flex min-w-0 flex-col overflow-hidden rounded-2xl border transition-[border-color,box-shadow] duration-300 hover:border-primary/50 hover:shadow-xl ${featured ? "border-slate-900 bg-slate-950" : "border-slate-200 bg-white"}`}
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-800 md:aspect-[4/3]">
                  <Image
                    src={details.image}
                    alt={details.alt}
                    fill
                    sizes="(max-width: 767px) 100vw, (max-width: 1536px) 33vw, 480px"
                    className="object-cover transition-transform duration-700 ease-out motion-safe:group-hover:scale-105 motion-safe:group-focus-within:scale-105"
                  />
                  <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-slate-950/15" />
                  <div aria-hidden="true" className="absolute top-4 left-4 flex h-9 w-9 items-center justify-center rounded-full bg-primary font-mono text-xs text-white">0{index + 1}</div>
                  <Plus aria-hidden="true" size={20} strokeWidth={1} className="absolute top-5 right-5 text-white/80" />
                  <div className="absolute right-5 bottom-5 left-5 flex items-center gap-2 text-[9px] font-semibold tracking-[0.12em] text-white uppercase lg:text-[10px]">
                    <Icon size={15} aria-hidden="true" className="shrink-0 text-blue-300" />
                    {details.category}
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-6 lg:p-7 xl:p-8">
                  <h3 className={`font-display text-4xl leading-none font-bold tracking-tight normal-case lg:text-[42px] ${featured ? "text-white" : "text-slate-950"}`}>
                    {platform.title}
                  </h3>
                  <p className={`mt-4 text-sm leading-7 ${featured ? "text-slate-300" : "text-slate-500"}`}>
                    {platform.description}
                  </p>
                  <ul className={`mt-6 mb-7 space-y-2.5 border-t pt-5 ${featured ? "border-white/15 text-slate-300" : "border-slate-200 text-slate-600"}`}>
                    {details.features.map(feature => (
                      <li key={feature} className="flex items-center gap-2.5 text-xs">
                        <span aria-hidden="true" className="h-1 w-1 shrink-0 bg-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/platforms/${platform.id}`}
                    aria-label={`Explore ${platform.title}`}
                    className={`mt-auto flex min-h-11 items-center justify-between gap-3 rounded-sm text-xs font-semibold tracking-wide focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary ${featured ? "text-white" : "text-slate-950"}`}
                  >
                    Explore platform
                    <span className={`flex h-11 w-11 items-center justify-center rounded-full transition-colors duration-300 group-hover:bg-primary group-hover:text-white group-focus-within:bg-primary group-focus-within:text-white ${featured ? "bg-primary text-white" : "bg-blue-50 text-primary"}`}>
                      <ArrowUpRight size={20} aria-hidden="true" className="transition-transform duration-300 motion-safe:group-hover:rotate-45 motion-safe:group-focus-within:rotate-45" />
                    </span>
                  </Link>
                </div>
                <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-primary transition-transform duration-500 motion-safe:group-hover:scale-x-100 motion-safe:group-focus-within:scale-x-100" />
              </motion.article>
            );
          })}
        </div>

        <div className="mt-12 border-t border-slate-300 pt-8 sm:mt-14 lg:mt-16 lg:pt-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_2.5fr] lg:gap-12">
            <motion.div {...reveal} transition={{ duration: reducedMotion ? 0 : 0.7, ease }}>
              <span className="text-[10px] font-bold tracking-[0.16em] text-primary uppercase">The Najhum 3C approach</span>
              <h3 className="mt-3 font-display text-2xl leading-tight font-bold text-slate-950 uppercase">Connected<br className="hidden lg:block" /> by design.</h3>
              <Link href="/about" className="mt-3 inline-flex min-h-11 items-center gap-3 text-xs font-semibold text-slate-600 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
                Our approach <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </motion.div>
            <div className="relative grid gap-6 sm:grid-cols-3 sm:gap-5 lg:gap-8">
              <motion.div aria-hidden="true" initial={reducedMotion ? false : { scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: reducedMotion ? 0 : 1.2, ease }} className="absolute top-5 right-0 left-5 hidden h-px origin-left bg-slate-300 sm:block" />
              {methodology.map(({ title, description, icon: StepIcon }, index) => (
                <motion.div key={title} {...reveal} transition={{ duration: reducedMotion ? 0 : 0.65, delay: reducedMotion ? 0 : index * 0.12, ease }} className="relative flex items-start gap-4 sm:block">
                  <div className="relative mb-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-blue-200 bg-[#f4f6f8] text-primary">
                    <StepIcon size={18} strokeWidth={1.5} aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="font-display text-base font-semibold text-slate-950 uppercase">{title}</h4>
                    <p className="mt-2 max-w-[26ch] text-xs leading-6 text-slate-500">{description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
