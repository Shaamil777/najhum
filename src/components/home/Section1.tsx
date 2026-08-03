export default function Section1() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(6,182,212,0.15),rgba(255,255,255,0))]" />
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-neutral-300 backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-cyan-400" />
            Welcome to Next Generation Design
          </div>
          <h1 className="mt-8 text-5xl font-extrabold tracking-tight text-white sm:text-6xl">
            Section 1:{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
              Elevate Your Vision
            </span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-neutral-300">
            This is Section 1 of the home page. Crafted with clean aesthetics,
            modern typography, and dynamic gradients for a stunning user
            experience.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="#section2"
              className="rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/25 transition-transform hover:scale-105"
            >
              Explore Features
            </a>
            <a
              href="#section3"
              className="text-sm font-semibold leading-6 text-white transition-colors hover:text-cyan-400"
            >
              Learn More <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
