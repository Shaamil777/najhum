"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowUpRight, LayoutDashboard, Layers, Plus, X, LayoutTemplate, Package } from "lucide-react";
import { LogoutButton } from "@/components/admin/auth/LogoutButton";

export default function AdminSidebar({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();
  const navigation = [
    { name: "Overview", href: "/admin/dashboard", icon: LayoutDashboard, active: pathname === "/admin/dashboard" },
    { name: "Solutions", href: "/admin/solutions", icon: Layers, active: pathname.startsWith("/admin/solutions") },
    { name: "Pages", href: "/admin/pages", icon: LayoutTemplate, active: pathname.startsWith("/admin/pages") },
    { name: "Products", href: "/admin/products", icon: Package, active: pathname.startsWith("/admin/products") },
  ];
  return (
    <div className="flex h-full flex-col border-r border-slate-200/70 bg-white">
      <div className="flex h-20 shrink-0 items-center justify-between px-6">
        <Link href="/admin/dashboard" onClick={onClose} aria-label="Najhum admin home" className="rounded-md focus-visible:outline-2 focus-visible:outline-primary">
          <Image src="/logo/logo.png" alt="Najhum" width={148} height={49} priority className="h-9 w-auto" />
        </Link>
        {onClose && <button type="button" onClick={onClose} aria-label="Close navigation" className="flex h-11 w-11 items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-primary"><X size={20} /></button>}
      </div>
      <div className="px-6 pt-2 pb-6"><span className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] font-semibold tracking-[0.16em] text-slate-500 uppercase">Content workspace</span></div>
      <nav aria-label="Admin navigation" className="flex-1 overflow-y-auto px-4">
        <p className="mb-3 px-3 text-[10px] font-semibold tracking-[0.16em] text-slate-400 uppercase">Workspace</p>
        <ul className="space-y-1.5">
          {navigation.map(({ name, href, icon: Icon, active }) => <li key={href}>
            <Link href={href} onClick={onClose} aria-current={active ? "page" : undefined} className={`flex min-h-12 items-center gap-3 rounded-xl border px-3 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-primary ${active ? "border-primary/10 bg-primary/7 text-primary" : "border-transparent text-slate-500 hover:bg-slate-50 hover:text-slate-900"}`}>
              <Icon size={19} strokeWidth={1.8} aria-hidden="true" />{name}{active && <span aria-hidden="true" className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" />}
            </Link>
          </li>)}
        </ul>
        <Link href="/admin/solutions/new" onClick={onClose} className="mt-6 flex min-h-11 items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 px-3 text-sm font-medium text-slate-600 transition-colors hover:border-primary hover:bg-primary/5 hover:text-primary focus-visible:outline-2 focus-visible:outline-primary"><Plus size={17} aria-hidden="true" />New solution</Link>
      </nav>
      <div className="m-4 mt-8 rounded-2xl border border-slate-100 bg-slate-50 p-4">
        <p className="text-xs font-semibold text-slate-700">From workspace to website</p>
        <p className="mt-1 text-xs leading-5 text-slate-500">See how your published pages look to visitors.</p>
        <Link href="/solutions" onClick={onClose} className="mt-3 flex min-h-10 items-center gap-2 text-xs font-semibold text-primary focus-visible:outline-2 focus-visible:outline-primary">View live solutions <ArrowUpRight size={15} aria-hidden="true" /></Link>
      </div>
      <div className="border-t border-slate-100 px-4 py-4">
        <div className="mb-3 flex items-center gap-3 px-2">
          <div aria-hidden="true" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">NA</div>
          <div><p className="text-xs font-semibold text-slate-700">Administrator</p><p className="text-[11px] text-slate-400">Najhum team</p></div>
        </div>
        <LogoutButton />
      </div>
    </div>
  );
}
