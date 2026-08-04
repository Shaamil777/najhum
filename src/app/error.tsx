"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-white text-neutral-900">
      <h2 className="text-6xl font-black tracking-tighter">Error</h2>
      <p className="mt-4 text-sm font-mono tracking-widest uppercase text-neutral-500">
        Something went wrong
      </p>
      <button
        onClick={() => reset()}
        className="mt-8 px-6 py-2 border border-neutral-200 text-xs font-bold uppercase tracking-widest hover:bg-neutral-50 transition-colors cursor-pointer"
      >
        Try Again
      </button>
    </div>
  );
}
