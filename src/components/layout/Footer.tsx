import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-white/10 bg-black py-12 text-neutral-400">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-2">
            <span className="inline-block h-3 w-3 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-600"></span>
            <span className="text-lg font-semibold tracking-tight text-white">
              Najhum
            </span>
          </div>
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Najhum. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link href="/" className="transition-colors hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/" className="transition-colors hover:text-white">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
