export default function Impact() {
  return (
    <section
      id="impact"
      className="w-full h-screen flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-br from-blue-950 via-sky-950 to-slate-950 text-white"
    >
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_80%_20%,rgba(59,130,246,0.2),rgba(255,255,255,0))]" />

      {/* Centered Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2 text-sm font-medium text-neutral-300 backdrop-blur-md mb-6 shadow-lg">
          <span className="h-2 w-2 rounded-full bg-blue-400" />
          <span>05 &bull; Homepage Section</span>
        </div>

        <h2 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight uppercase bg-gradient-to-r from-sky-400 via-blue-300 to-indigo-400 bg-clip-text text-transparent drop-shadow-2xl">
          Impact
        </h2>

        <p className="mt-6 text-base sm:text-lg text-blue-200/80 max-w-md font-light">
          Measurable success &amp; transformative results &bull; 100vh &times; 100vw
        </p>
      </div>

      {/* Subtle bottom scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-xs text-blue-300/60 font-mono">
        <span>NEXT: WHY CHOOSE</span>
        <span className="text-blue-400">&darr;</span>
      </div>
    </section>
  );
}
