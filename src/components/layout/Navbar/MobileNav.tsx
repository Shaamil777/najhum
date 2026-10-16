"use client";
import { useHydrated } from "@/lib/utils/use-hydrated";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ArrowRight, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface NavItemData {
  title: string;
  href: string;
}

const navItems: NavItemData[] = [
  { title: "Home", href: "/" },
  { title: "IoTRICS", href: "/platforms/iotrics" },
  { title: "EVOLTICS", href: "/platforms/evoltics" },
  { title: "CropifAI", href: "/platforms/cropifai" },
  { title: "Solutions", href: "/solutions" },
  { title: "Products", href: "/products" },
  { title: "About", href: "/about" },
];

export function MobileNav({ onSearch }: { onSearch: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const mounted = useHydrated();
  const pathname = usePathname();

  // Prevent body scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const toggle = () => setIsOpen((prev) => !prev);
  const close = () => setIsOpen(false);

  return (
    <>
      {/* ═══ Closed State Floating Pill Header (Mobile) ═══ */}
      <header className="fixed top-3.5 sm:top-4 left-1/2 -translate-x-1/2 w-[calc(100%-1.5rem)] sm:w-[calc(100%-2.5rem)] max-w-xl z-50 flex items-center justify-between bg-white rounded-full border border-neutral-200 shadow-[0_8px_30px_rgb(0,0,0,0.07)] h-16 pl-6 pr-3 transition-all duration-200">
        <Link
          href="/"
          className="flex items-center shrink-0 focus:outline-none"
          aria-label="Najhum Home"
        >
          <Image
            src="/logo/logo.png"
            alt="Najhum"
            width={130}
            height={44}
            priority
            className="h-8 w-auto object-contain"
          />
        </Link>

        <div className="flex items-center gap-2"><button type="button" aria-label="Search the website" aria-haspopup="dialog" onClick={onSearch} className="w-11 h-11 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-900"><Search size={19}/></button>        <button
          onClick={toggle}
          type="button"
          aria-label="Open menu"
          aria-expanded={isOpen}
          className="w-11 h-11 rounded-full bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 flex items-center justify-center text-neutral-900 transition-all shadow-xs active:scale-95 cursor-pointer shrink-0"
        >
          <Menu className="w-5 h-5 text-neutral-900" strokeWidth={2} />
        </button></div>
      </header>

      {/* ═══ Open State Overlay & Dropdown Menu ═══ */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {isOpen && (
              <div className="fixed inset-0 z-[100]">
                {/* Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  onClick={close}
                  className="fixed inset-0 bg-black/40 backdrop-blur-xs"
                />

                {/* Open State Floating Header */}
                <header className="fixed top-3.5 sm:top-4 left-1/2 -translate-x-1/2 w-[calc(100%-1.5rem)] sm:w-[calc(100%-2.5rem)] max-w-xl z-[101] flex items-center justify-between bg-white rounded-full border border-neutral-200 shadow-[0_8px_30px_rgb(0,0,0,0.07)] h-16 pl-6 pr-3">
                  <Link
                    href="/"
                    onClick={close}
                    className="flex items-center shrink-0 focus:outline-none"
                    aria-label="Najhum Home"
                  >
                    <Image
                      src="/logo/logo.png"
                      alt="Najhum"
                      width={130}
                      height={44}
                      priority
                      className="h-8 w-auto object-contain"
                    />
                  </Link>

                  <button
                    onClick={close}
                    type="button"
                    aria-label="Close menu"
                    aria-expanded={true}
                    className="w-11 h-11 rounded-full bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 flex items-center justify-center text-neutral-900 transition-all shadow-xs active:scale-95 cursor-pointer shrink-0"
                  >
                    <X className="w-5 h-5 text-neutral-900" strokeWidth={2} />
                  </button>
                </header>

                {/* Floating Dropdown Card */}
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.98 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  className="fixed top-[5.5rem] left-1/2 -translate-x-1/2 w-[calc(100%-1.5rem)] sm:w-[calc(100%-2.5rem)] max-w-xl z-[101] max-h-[calc(100vh-6.75rem)] overflow-y-auto bg-white rounded-[30px] border border-neutral-200 shadow-2xl shadow-black/15 p-5 flex flex-col font-sans"
                >
                  <nav className="flex flex-col space-y-1">
                    {navItems.map((item) => {
                      const isActive =
                        item.href === "/"
                          ? pathname === "/"
                          : Boolean(item.href && pathname?.startsWith(item.href));

                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={close}
                          className={cn(
                            "flex items-center justify-between px-4 py-3 sm:py-3.5 rounded-2xl text-left transition-colors text-base sm:text-lg font-semibold",
                            isActive
                              ? "bg-primary/10 text-primary font-bold"
                              : "text-neutral-800 hover:bg-neutral-50 hover:text-primary"
                          )}
                        >
                          <span className="tracking-wide">{item.title}</span>
                          {isActive && (
                            <span className="w-2.5 h-2.5 rounded-full bg-primary shrink-0" />
                          )}
                        </Link>
                      );
                    })}

                  </nav>

                  {/* Divider */}
                  <div className="w-full h-px bg-neutral-100 my-3.5" />

                  {/* Bottom Brand CTA Button */}
                  <Link
                    href="/contact"
                    onClick={close}
                    className="w-full bg-primary hover:bg-primary-hover active:scale-[0.99] text-white font-bold py-3.5 sm:py-4 px-6 rounded-full flex items-center justify-center gap-2.5 shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all text-base sm:text-lg group cursor-pointer"
                  >
                    <span>Contact Us</span>
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-primary flex items-center justify-center shrink-0 ml-1.5 shadow-xs group-hover:translate-x-0.5 transition-transform">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </Link>
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
