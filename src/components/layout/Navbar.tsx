"use client";

import Link from "next/link";

export default function Navbar() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navItems = [
    { label: "Platform", id: "solutions" },
    { label: "Solutions", id: "process" },
    { label: "Portfolio", id: "whychoose" },
    { label: "About", id: "about" },
  ];

  return (
    <header className="fixed top-4 left-0 right-0 z-50 pointer-events-none">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 sm:px-10">
        {/* Left/Center: Logo + Main Nav Links combined in floating rounded pill */}
        <div className="flex items-center gap-6 sm:gap-8 rounded-full bg-[#f8f8f8] px-6 py-2.5 pointer-events-auto">
          <Link
            href="/"
            className="flex items-center gap-2.5 text-xl font-black tracking-tighter text-najhum-black transition-opacity hover:opacity-80"
          >
            <span className="inline-block h-3.5 w-3.5 rounded-full bg-najhum-blue"></span>
            najhum
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-xs sm:text-sm font-semibold text-najhum-grey">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.id)}
                className="cursor-pointer transition-colors hover:text-najhum-black"
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Right side action links: Demo & Contact */}
        <div className="flex items-center gap-3 pointer-events-auto">
          <button
            onClick={() => scrollToSection("impact")}
            className="cursor-pointer rounded-full bg-[#f8f8f8] px-5 py-2.5 text-xs sm:text-sm font-bold text-najhum-black transition-all hover:bg-neutral-100"
          >
            Demo
          </button>
          <button
            onClick={() => scrollToSection("cta")}
            className="cursor-pointer rounded-full bg-najhum-black px-6 py-2.5 text-xs sm:text-sm font-bold text-white shadow-md transition-all hover:opacity-90 hover:scale-105"
          >
            Contact
          </button>
        </div>
      </div>
    </header>
  );
}
