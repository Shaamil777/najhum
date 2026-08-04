export default function Loading() {
  return (
    <div className="flex h-[50vh] w-full flex-col items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-neutral-300 border-t-neutral-900" />
      <p className="mt-4 text-xs font-mono tracking-widest text-neutral-500 uppercase">
        Loading...
      </p>
    </div>
  );
}
