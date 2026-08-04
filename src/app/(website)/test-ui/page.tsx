export default function ThemeTest() {
  return (
    <section className="min-h-screen bg-background flex items-center justify-center p-20">
      <div className="bg-surface border border-border rounded-xl shadow-card p-10 max-w-xl">
        <span className="text-primary font-semibold">
          Najhum Design System
        </span>

        <h1 className="text-h2 font-display mt-4 text-foreground">
          Enterprise Theme
        </h1>

        <p className="mt-4 text-muted">
          If this renders correctly, your design system foundation is working.
        </p>

        <button className="mt-8 bg-primary hover:bg-primary-hover text-white rounded-lg px-6 py-3 transition-colors">
          Get Started
        </button>
      </div>
    </section>
  );
}