export default function Solutions() {
  return (
    <section
      id="solutions"
      className="w-full h-screen flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-br from-emerald-950 via-teal-950 to-slate-950 text-white"
    >
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_20%_80%,rgba(16,185,129,0.2),rgba(255,255,255,0))]" />

      {/* Centered Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2 text-sm font-medium text-neutral-300 backdrop-blur-md mb-6 shadow-lg">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          <span>03 &bull; Homepage Section</span>
        </div>

        <h2 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight uppercase bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent drop-shadow-2xl">
          Solutions
        </h2>

        <p className="mt-6 text-base sm:text-lg text-emerald-200/80 max-w-md font-light">
          Innovative products &amp; custom architectures &bull; 100vh &times; 100vw
        </p>
      </div>

      {/* Subtle bottom scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-xs text-emerald-300/60 font-mono">
        <span>NEXT: PROCESS</span>
        <span className="text-emerald-400">&darr;</span>
      </div>
    </section>
  );
}
