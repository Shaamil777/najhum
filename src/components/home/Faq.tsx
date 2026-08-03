export default function Faq() {
  return (
    <section
      id="faq"
      className="w-full h-screen flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-br from-neutral-900 via-stone-950 to-zinc-950 text-white"
    >
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-neutral-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,rgba(168,162,158,0.15),rgba(255,255,255,0))]" />

      {/* Centered Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2 text-sm font-medium text-neutral-300 backdrop-blur-md mb-6 shadow-lg">
          <span className="h-2 w-2 rounded-full bg-zinc-400" />
          <span>09 &bull; Homepage Section</span>
        </div>

        <h2 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight uppercase bg-gradient-to-r from-zinc-200 via-neutral-300 to-stone-400 bg-clip-text text-transparent drop-shadow-2xl">
          FAQ
        </h2>

        <p className="mt-6 text-base sm:text-lg text-neutral-400 max-w-md font-light">
          Frequently asked questions &bull; 100vh &times; 100vw
        </p>
      </div>

      {/* Subtle bottom scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-xs text-neutral-400/60 font-mono">
        <span>NEXT: CTA</span>
        <span className="text-zinc-400">&darr;</span>
      </div>
    </section>
  );
}
