export default function Section3() {
  return (
    <section id="section3" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-white/[0.02] px-6 py-20 shadow-2xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
          <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Section 3: Ready to Build?
            </h2>
            <p className="mt-6 text-lg leading-8 text-neutral-300">
              This is Section 3. Easily extend or replace these sections with
              your own custom content and pages whenever you are ready.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
              <a
                href="#"
                className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black shadow-sm transition-transform hover:scale-105"
              >
                Get Started Now
              </a>
              <a
                href="#"
                className="text-sm font-semibold leading-6 text-white hover:text-cyan-400 transition-colors"
              >
                Contact Support <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>

          <div className="relative mt-16 flex items-center justify-center lg:mt-0 lg:w-1/2">
            <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-black/40 p-6 backdrop-blur-md">
              <div className="flex items-center gap-2 border-b border-white/10 pb-4">
                <div className="h-3 w-3 rounded-full bg-red-500/80" />
                <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                <div className="h-3 w-3 rounded-full bg-green-500/80" />
                <span className="ml-2 text-xs text-neutral-400 font-mono">
                  section3.tsx
                </span>
              </div>
              <pre className="mt-4 overflow-x-auto text-xs text-cyan-400 font-mono">
                <code>{`// Section 3 Component
export default function Section3() {
  return <Section3Content />;
}`}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
