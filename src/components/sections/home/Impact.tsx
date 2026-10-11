import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Activity, BatteryCharging, Sprout } from "lucide-react";
import { homeContainer, homeHeading, HomeEyebrow, HomeLink } from "./HomePrimitives";

const useCases = [
  { title: "Monitor connected assets", description: "Bring equipment data, diagnostics, and alerts into one operational view.", icon: Activity, href: "/platforms/iotrics" },
  { title: "Manage EV networks", description: "Coordinate charger availability, load balancing, and billing across sites.", icon: BatteryCharging, href: "/platforms/evoltics" },
  { title: "Understand growing conditions", description: "Track soil conditions and irrigation needs to guide agricultural decisions.", icon: Sprout, href: "/platforms/cropifai" },
];

export default function Impact() {
  return (
    <section aria-labelledby="home-impact-heading" className="bg-white py-16 sm:py-20 lg:py-28">
      <div className={homeContainer}>
        <HomeEyebrow>From data to action</HomeEyebrow>
        <div className="grid items-start gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <h2 id="home-impact-heading" className={homeHeading}>See your operations.<br /><span className="text-primary">Act with clarity.</span></h2>
          <div className="max-w-md lg:ml-auto">
            <p className="mb-6 text-base leading-7 text-slate-600">Explore the IoTRICS interface: sensor telemetry, diagnostics, and a spatial view of connected assets together in one dashboard.</p>
            <HomeLink href="/platforms/iotrics" secondary>Explore IoTRICS</HomeLink>
          </div>
        </div>
        <figure className="mt-10 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-3 sm:mt-14 sm:p-6">
          <Image src="/images/iotrics/dashboardiortics.png" alt="IoTRICS dashboard showing soil moisture alerts, real-time sensor readings, and a spatial digital twin of connected fields" width={2880} height={1572} sizes="(max-width: 1536px) 100vw, 1440px" className="h-auto w-full rounded-lg border border-slate-200" />
          <figcaption className="mt-4 flex flex-wrap justify-between gap-2 px-1 text-xs leading-5 text-slate-500">
            <span>IoTRICS / Connected asset dashboard</span>
            <span>Product interface preview. Readings shown are illustrative.</span>
          </figcaption>
        </figure>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {useCases.map(({ title, description, icon: Icon, href }) => (
            <Link key={title} href={href} className="group rounded-2xl border border-slate-200 bg-white p-6 transition-colors hover:border-blue-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500 lg:p-8">
              <div className="mb-6 flex items-center justify-between"><Icon size={24} aria-hidden="true" className="text-primary" /><ArrowUpRight size={20} aria-hidden="true" className="text-slate-400 group-hover:text-primary" /></div>
              <h3 className="font-display text-xl font-semibold text-slate-950 normal-case">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
            </Link>
          ))}
        </div>
        <div className="mt-8"><HomeLink href="/solutions" secondary>Explore Solutions</HomeLink></div>
      </div>
    </section>
  );
}
