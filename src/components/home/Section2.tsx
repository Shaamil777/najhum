export default function Section2() {
  const features = [
    {
      title: "Modern Architecture",
      description:
        "Built with clean, modular React components and scalable layouts designed for speed and flexibility.",
    },
    {
      title: "Rich Aesthetics",
      description:
        "Harmonious color palettes, glassmorphic effects, and subtle micro-animations that engage visitors.",
    },
    {
      title: "Responsive by Default",
      description:
        "Seamlessly adapts across desktop, tablet, and mobile devices with pixel-perfect precision.",
    },
  ];

  return (
    <section id="section2" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-cyan-400">
            Section 2
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Designed for Impact & Performance
          </p>
          <p className="mt-4 text-neutral-400">
            Here is Section 2 showcasing a feature breakdown within the home
            folder layout.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-5xl">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative rounded-2xl border border-white/10 bg-white/[0.03] p-8 transition-all duration-300 hover:border-cyan-500/50 hover:bg-white/[0.06]"
              >
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 text-cyan-400 group-hover:scale-110 transition-transform">
                  <span className="text-lg font-bold">0{index + 1}</span>
                </div>
                <h3 className="text-lg font-semibold text-white">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-neutral-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
