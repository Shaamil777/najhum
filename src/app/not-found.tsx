import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-white text-neutral-900">
      <h2 className="text-8xl font-black tracking-tighter">404</h2>
      <p className="mt-4 text-sm font-mono tracking-widest uppercase text-neutral-500">
        Page Not Found
      </p>
      <Link
        href="/"
        className="mt-8 px-6 py-2 border border-neutral-200 text-xs font-bold uppercase tracking-widest hover:bg-neutral-50 transition-colors"
      >
        Return Home
      </Link>
    </div>
  );
}
