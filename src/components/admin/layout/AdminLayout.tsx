"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ChevronRight, LayoutDashboard, Layers, Menu, Plus } from "lucide-react";
import { Toaster } from "sonner";
import AdminSidebar from "./AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const mainRef = useRef<HTMLElement>(null);
  const isNew = pathname === "/admin/solutions/new";
  const pageLabel = pathname === "/admin/dashboard" ? "Overview" : pathname.startsWith("/admin/pages") ? "Pages" : isNew ? "New solution" : pathname.endsWith("/edit") ? "Edit solution" : "Solutions";

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isSidebarOpen && !dialog.open) dialog.showModal();
    if (!isSidebarOpen && dialog.open) dialog.close();
    if (!isSidebarOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [isSidebarOpen]);
  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const closeOnDesktop = () => { if (media.matches) setIsSidebarOpen(false); };
    media.addEventListener("change", closeOnDesktop);
    return () => media.removeEventListener("change", closeOnDesktop);
  }, []);
  useEffect(() => { mainRef.current?.scrollTo({ top: 0 }); }, [pathname]);

  const mobileLinks = [
    { name: "Overview", href: "/admin/dashboard", icon: LayoutDashboard, active: pathname === "/admin/dashboard" },
    { name: "Solutions", href: "/admin/solutions", icon: Layers, active: pathname.startsWith("/admin/solutions") && !isNew },
    { name: "Create", href: "/admin/solutions/new", icon: Plus, active: isNew },
  ];
  return (
    <div data-theme="light" className="flex h-dvh w-full overflow-hidden bg-[#f6f8fc] text-slate-900">
      <a href="#admin-content" className="sr-only z-[100] rounded-lg bg-white p-3 text-primary focus:not-sr-only focus:fixed focus:top-2 focus:left-2">Skip to content</a>
      <aside aria-label="Workspace sidebar" className="hidden h-full w-64 shrink-0 lg:block"><AdminSidebar /></aside>
      <dialog ref={dialogRef} aria-label="Admin menu" onCancel={() => setIsSidebarOpen(false)} onClose={() => setIsSidebarOpen(false)} onClick={(event) => { if (event.target === event.currentTarget) setIsSidebarOpen(false); }} className="fixed inset-y-0 right-auto left-0 m-0 h-dvh max-h-none w-80 max-w-[88vw] border-0 p-0 shadow-2xl backdrop:bg-slate-900/35 backdrop:backdrop-blur-sm">
        <AdminSidebar onClose={() => setIsSidebarOpen(false)} />
      </dialog>
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-18 shrink-0 items-center justify-between gap-3 border-b border-slate-200/60 bg-white/90 px-4 sm:px-7 lg:px-9">
          <div className="flex min-w-0 items-center gap-3">
            <button type="button" onClick={() => setIsSidebarOpen(true)} aria-label="Open navigation" aria-haspopup="dialog" aria-expanded={isSidebarOpen} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-500 focus-visible:outline-2 focus-visible:outline-primary lg:hidden"><Menu size={20} /></button>
            <Link href="/admin/dashboard" aria-label="Najhum admin home" className="lg:hidden"><Image src="/logo/logo.png" alt="Najhum" width={116} height={39} className="h-7 w-auto" /></Link>
            <div className="hidden items-center gap-2 text-xs sm:flex"><span className="text-slate-400">Workspace</span><ChevronRight size={13} className="text-slate-300" aria-hidden="true" /><span className="font-medium text-slate-600">{pageLabel}</span></div>
          </div>
          <Link href="/" className="flex min-h-11 shrink-0 items-center gap-1.5 rounded-xl px-3 text-xs font-medium text-slate-500 transition-colors hover:bg-slate-50 hover:text-primary focus-visible:outline-2 focus-visible:outline-primary"><span className="hidden sm:inline">View website</span><span className="sm:hidden">Website</span><ArrowUpRight size={16} aria-hidden="true" /></Link>
        </header>
        <main ref={mainRef} id="admin-content" tabIndex={-1} className="min-h-0 flex-1 overflow-y-auto overscroll-contain focus:outline-none">
          <div className="mx-auto w-full max-w-[1440px] px-4 py-6 sm:px-7 sm:py-8 lg:px-9 lg:py-9">{children}</div>
        </main>
        <nav aria-label="Mobile workspace navigation" className="grid shrink-0 grid-cols-3 border-t border-slate-200 bg-white px-3 pt-2 pb-[max(8px,env(safe-area-inset-bottom))] lg:hidden">
          {mobileLinks.map(({ name, href, icon: Icon, active }) => <Link key={href} href={href} aria-current={active ? "page" : undefined} className={`flex min-h-12 flex-col items-center justify-center gap-1 rounded-xl text-[10px] font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-primary ${active ? "bg-primary/7 text-primary" : "text-slate-400 hover:text-slate-700"}`}><Icon size={19} aria-hidden="true" />{name}</Link>)}
        </nav>
      </div>
      <Toaster position="top-right" expand={false} richColors />
    </div>
  );
}
