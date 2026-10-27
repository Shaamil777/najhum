"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { useHydrated } from "@/lib/utils/use-hydrated";
import { PlatformMenuContent, SolutionsMenuContent } from "./MenuContent";
import type { PublishedSolutionItem } from "./menu-data";
import styles from "./Navigation.module.css";

type Menu = "platforms" | "solutions";
export function DesktopNav({ solutions = [] }: { solutions?: PublishedSolutionItem[] }) {
  const [open, setOpen] = useState<Menu | null>(null);
  const [top, setTop] = useState(100);
  const nav = useRef<HTMLElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const keyboard = useRef(false);
  const clicked = useRef<Menu | null>(null);
  const mounted = useHydrated();
  const pathname = usePathname();
  const cancel = () => { if (timer.current) clearTimeout(timer.current); };
  const close = () => { cancel(); clicked.current = null; setOpen(null); };
  const show = (menu: Menu) => { cancel(); setTop((nav.current?.closest("header")?.getBoundingClientRect().bottom || 88) + 12); setOpen(menu); };
  const leave = () => { cancel(); timer.current = setTimeout(() => setOpen(null), 180); };

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);
  useEffect(() => { if (!open) clicked.current = null; }, [open]);
  useEffect(() => {
    if (!open) return;
    const update = () => {
      if (window.innerWidth < 1024) { setOpen(null); return; }
      setTop((nav.current?.closest("header")?.getBoundingClientRect().bottom || 88) + 12);
    };
    const outside = (event: PointerEvent) => { if (!nav.current?.contains(event.target as Node) && !panel.current?.contains(event.target as Node)) setOpen(null); };
    const escape = (event: KeyboardEvent) => { if (event.key === "Escape") { event.preventDefault(); nav.current?.querySelector<HTMLButtonElement>(`[data-menu="${open}"]`)?.focus(); setOpen(null); } };
    const focus = (event: FocusEvent) => { if (!nav.current?.contains(event.target as Node) && !panel.current?.contains(event.target as Node)) setOpen(null); };
    if (keyboard.current) { panel.current?.querySelector<HTMLElement>("a,button")?.focus(); keyboard.current = false; }
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, { passive: true });
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", escape);
    document.addEventListener("focusin", focus);
    return () => { window.removeEventListener("resize", update); window.removeEventListener("scroll", update); document.removeEventListener("pointerdown", outside); document.removeEventListener("keydown", escape); document.removeEventListener("focusin", focus); };
  }, [open]);

  return <nav ref={nav} aria-label="Main Navigation" className={styles.desktopNav}>
    {(["platforms", "solutions"] as const).map(menu => <div key={menu} onMouseEnter={() => { if (open !== menu) clicked.current = null; show(menu); }} onMouseLeave={leave}>
      <button type="button" data-menu={menu} id={`nav-${menu}`} className={`${styles.trigger} ${open === menu || pathname.startsWith(`/${menu}`) ? styles.selectedTrigger : ""}`} aria-expanded={open === menu} aria-controls={`desktop-${menu}`} onClick={() => { if (clicked.current === menu) close(); else { clicked.current = menu; show(menu); } }} onKeyDown={event => {
        if (event.key === "ArrowDown" || (event.key === "Tab" && !event.shiftKey && open === menu)) { event.preventDefault(); if (open === menu) panel.current?.querySelector<HTMLElement>("a,button")?.focus(); else { keyboard.current = true; show(menu); } }
      }}>{menu === "platforms" ? "Platforms" : "Solutions"}<ChevronDown size={15} className={open === menu ? styles.chevronOpen : ""} aria-hidden="true" /></button>
    </div>)}
    <Link href="/products" onMouseEnter={close} onFocus={close} className={styles.trigger} aria-current={pathname.startsWith("/products") ? "page" : undefined}>Products</Link>
    <Link href="/blogs" onMouseEnter={close} onFocus={close} className={styles.trigger} aria-current={pathname.startsWith("/blogs") ? "page" : undefined}>Blogs</Link>
    <Link href="/about" onMouseEnter={close} onFocus={close} className={styles.trigger} aria-current={pathname.startsWith("/about") ? "page" : undefined}>About</Link>
    {mounted && open && createPortal(<>
      <div className={styles.backdrop} style={{ top: Math.max(top - 12, 0) }} aria-hidden="true" onClick={close} />
      <div ref={panel} id={`desktop-${open}`} aria-labelledby={`nav-${open}`} className={`${styles.mega} ${open === "platforms" ? styles.platformMega : ""}`} style={{ top, maxHeight: `calc(100dvh - ${top + 16}px)` }} onMouseEnter={cancel} onMouseLeave={leave} onKeyDown={event => { if (event.key === "Tab" && event.shiftKey && event.target === panel.current?.querySelector("a,button")) { event.preventDefault(); nav.current?.querySelector<HTMLButtonElement>(`[data-menu="${open}"]`)?.focus(); } }}>
        {open === "platforms" ? <PlatformMenuContent onNavigate={close} /> : <SolutionsMenuContent solutions={solutions} onNavigate={close} />}
      </div>
    </>, document.body)}
  </nav>;
}
