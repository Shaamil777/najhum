import { homeContent } from "@/content/home";
import { homeContainer, homeHeading, HomeEyebrow, HomeLink } from "./HomePrimitives";

export default function About() {
  const { about } = homeContent;
  return (
    <section aria-labelledby="home-about-heading" className="bg-white py-16 sm:py-20 lg:py-24">
      <div className={homeContainer}>
        <HomeEyebrow>Who we are</HomeEyebrow>
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
          <h2 id="home-about-heading" className={`${homeHeading} whitespace-pre-line`}>{about.headline}</h2>
          <div className="max-w-xl lg:ml-auto">
            <p className="mb-6 text-base leading-7 text-slate-600">{about.leftContent}</p>
            <HomeLink href="/about" secondary>{about.buttonLabel}</HomeLink>
          </div>
        </div>
        <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-slate-200 pt-8 lg:grid-cols-4 lg:gap-10">
          {about.stats.map(stat => (
            <div key={stat.id} className="min-w-0">
              <dt className="text-xs font-semibold tracking-[0.1em] text-slate-500 uppercase">{stat.title}</dt>
              <dd className="mt-3 font-display text-2xl leading-tight font-semibold tracking-tight text-slate-950 sm:text-3xl">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

