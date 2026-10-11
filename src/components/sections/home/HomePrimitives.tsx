import Link from "next/link";
import { ArrowUpRight, Plus } from "lucide-react";
import type { ReactNode } from "react";

export const homeContainer = "mx-auto w-full max-w-[1536px] px-6 sm:px-8 lg:px-12";
export const homeHeading = "min-w-0 font-display text-[clamp(1.875rem,4.5vw,4.5rem)] leading-[1.05] font-bold tracking-[-0.035em] text-slate-950 uppercase";

export function HomeEyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="mb-6 flex items-center gap-3 text-xs font-semibold tracking-[0.16em] text-primary uppercase">
      <Plus size={16} aria-hidden="true" />
      <span>{children}</span>
      <span aria-hidden="true" className="h-px flex-1 bg-slate-200" />
    </div>
  );
}

export function HomeLink({ href, children, secondary = false, light = false }: {
  href: string;
  children: ReactNode;
  secondary?: boolean;
  light?: boolean;
}) {
  const appearance = secondary
    ? light ? "border-white/30 text-white hover:bg-white/10" : "border-slate-300 text-slate-950 hover:bg-slate-100"
    : "border-blue-600 bg-blue-600 text-white hover:border-blue-700 hover:bg-blue-700";
  return (
    <Link href={href} className={`inline-flex min-h-12 items-center justify-center gap-3 rounded-full border px-6 py-3 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500 ${appearance}`}>
      {children}
      <ArrowUpRight size={18} aria-hidden="true" />
    </Link>
  );
}
