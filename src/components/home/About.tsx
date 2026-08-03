export default function About() {
  return (
    <section
      id="about"
      className="w-full h-screen flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-br from-indigo-950 via-blue-950 to-slate-950 text-white"
    >
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_80%_50%,rgba(99,102,241,0.2),rgba(255,255,255,0))]" />

      {/* Centered Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2 text-sm font-medium text-neutral-300 backdrop-blur-md mb-6 shadow-lg">
          <span className="h-2 w-2 rounded-full bg-indigo-400" />
          <span>02 &bull; Homepage Section</span>
        </div>

        <h2 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight uppercase bg-gradient-to-r from-violet-400 via-indigo-300 to-cyan-400 bg-clip-text text-transparent drop-shadow-2xl">
          About
        </h2>

        <p className="mt-6 text-base sm:text-lg text-indigo-200/80 max-w-md font-light">
          Our mission, vision, and core philosophy &bull; 100vh &times; 100vw
        </p>
      </div>

      {/* Subtle bottom scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-xs text-indigo-300/60 font-mono">
        <span>NEXT: SOLUTIONS</span>
        <span className="text-indigo-400">&darr;</span>
      </div>
    </section>
  );
}
