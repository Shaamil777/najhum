"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import FocusLock from "react-focus-lock";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Search, ChevronDown } from "lucide-react";
import { useHydrated } from "@/lib/utils/use-hydrated";
import { PlatformMenuContent, SolutionsMenuContent } from "./MenuContent";
import type { PublishedSolutionItem } from "./menu-data";
import styles from "./Navigation.module.css";

export function MobileNav({ onSearch, solutions = [] }: { onSearch: () => void; solutions?: PublishedSolutionItem[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [expanded, setExpanded] = useState<"platforms" | "solutions" | null>("platforms");
  const mounted = useHydrated();
  const close = () => setIsOpen(false);
  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const escape = (event: KeyboardEvent) => { if (event.key === "Escape") setIsOpen(false); };
    const resize = () => { if (window.innerWidth >= 1024) setIsOpen(false); };
    document.addEventListener("keydown", escape);
    window.addEventListener("resize", resize);
    return () => { document.body.style.overflow = previous; document.removeEventListener("keydown", escape); window.removeEventListener("resize", resize); };
  }, [isOpen]);

  const logo = <Image src="/logo/logo.png" alt="Najhum" width={130} height={44} priority className="h-8 w-auto object-contain" />;
  return <>
    <header className="fixed top-3.5 sm:top-4 left-1/2 -translate-x-1/2 w-[calc(100%-1.5rem)] sm:w-[calc(100%-2.5rem)] max-w-xl z-50 flex items-center justify-between bg-white rounded-full border border-neutral-200 shadow-[0_8px_30px_rgb(0,0,0,0.07)] h-16 pl-6 pr-3">
      <Link href="/" aria-label="Najhum Home">{logo}</Link>
      <div className="flex items-center gap-2"><button type="button" aria-label="Search the website" aria-haspopup="dialog" onClick={onSearch} className={styles.iconButton}><Search size={19} /></button><button type="button" aria-label="Open menu" aria-expanded={isOpen} aria-controls="mobile-navigation" onClick={() => setIsOpen(true)} className={styles.iconButton}><Menu size={20} /></button></div>
    </header>
    {mounted && isOpen && createPortal(<FocusLock returnFocus><div id="mobile-navigation" className={styles.mobileOverlay} role="dialog" aria-modal="true" aria-label="Navigation menu">
      <header className={styles.mobileHeader}><Link href="/" aria-label="Najhum Home" onClick={close}>{logo}</Link><button type="button" onClick={close} aria-label="Close menu" className={styles.closeButton} data-autofocus><X size={20} /></button></header>
      <nav aria-label="Mobile Navigation" className={styles.mobileScroll}>
        {(["platforms", "solutions"] as const).map(menu => <div key={menu} className={styles.mobileSection}>
          <button type="button" className={styles.mobileSectionTrigger} aria-expanded={expanded === menu} aria-controls={`mobile-${menu}`} onClick={() => setExpanded(previous => previous === menu ? null : menu)}>{menu === "platforms" ? "Platforms" : "Solutions"}<ChevronDown size={18} className={expanded === menu ? styles.chevronOpen : ""} /></button>
          {expanded === menu && <div id={`mobile-${menu}`}>{menu === "platforms" ? <PlatformMenuContent mobile onNavigate={close} /> : <SolutionsMenuContent mobile solutions={solutions} onNavigate={close} />}</div>}
        </div>)}
        <Link href="/products" className={styles.mobileNavLink} onClick={close}>Products</Link><Link href="/blogs" className={styles.mobileNavLink} onClick={close}>Blogs</Link><Link href="/about" className={styles.mobileNavLink} onClick={close}>About</Link>
      </nav>
      <div className={styles.mobileFooter}><button type="button" onClick={() => { close(); onSearch(); }}><Search size={18} />Search</button><Link href="/contact" onClick={close}>Contact us</Link></div>
    </div></FocusLock>,document.body)}
  </>;
}
