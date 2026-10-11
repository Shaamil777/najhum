import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function CTAButton() {
  return (
    <Link href="/contact" className="hidden min-h-12 items-center justify-center gap-2 rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500 md:inline-flex">
      Request a Demo <ArrowUpRight size={17} aria-hidden="true" />
    </Link>
  );
}
