export default function Footer() {
  return (
    <footer className="w-full p-8 bg-neutral-950 border-t border-white/10 flex flex-col items-center justify-center text-white text-center">
      <div className="text-sm font-mono text-neutral-400 uppercase tracking-widest mb-2">
        Footer Placeholder
      </div>
      <div className="text-xs text-neutral-600">
        &copy; {new Date().getFullYear()} Najhum Technologies. All rights reserved.
      </div>
    </footer>
  );
}
