import { LoginForm } from "@/components/admin/auth/LoginForm";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ShieldCheck } from "lucide-react";

export const metadata = { title: "Admin sign in", description: "Sign in to the Najhum content workspace." };

export default function LoginPage() {
  return (
    <div data-theme="light" className="relative isolate flex min-h-svh flex-col overflow-hidden bg-[#f6f8fc] text-slate-900">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -right-40 -top-48 h-[640px] w-[640px] rounded-full bg-primary/8 blur-[100px]" />
        <div className="absolute -bottom-72 -left-48 h-[640px] w-[640px] rounded-full bg-primary/6 blur-[100px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] bg-[size:24px_24px] opacity-25 [mask-image:linear-gradient(to_bottom,transparent,black)]" />
      </div>
      <header className="flex items-center justify-between gap-4 px-6 py-6 sm:px-10 sm:py-8">
        <Link href="/" aria-label="Najhum home" className="rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
          <Image src="/logo/logo.png" alt="Najhum" width={160} height={53} priority className="h-9 w-auto sm:h-10" />
        </Link>
        <Link href="/" className="inline-flex items-center gap-1.5 rounded-md text-xs font-medium text-slate-500 transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary sm:text-sm">
          Back to website <ArrowUpRight size={15} aria-hidden="true" />
        </Link>
      </header>
      <main className="flex flex-1 items-center justify-center px-5 py-8 sm:px-8 sm:py-12">
        <section aria-labelledby="login-heading" className="relative w-full max-w-[460px] overflow-hidden rounded-[28px] border border-white bg-white p-7 shadow-[0_24px_80px_-24px_rgba(15,23,42,0.18)] sm:p-10">
          <div aria-hidden="true" className="absolute inset-x-10 top-0 h-[3px] rounded-b-full bg-gradient-to-r from-primary/10 via-primary to-primary/10" />
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-primary/15 bg-primary/7 text-primary">
              <ShieldCheck size={22} strokeWidth={1.7} aria-hidden="true" />
            </div>
            <span className="text-[11px] font-semibold tracking-[0.18em] text-slate-500 uppercase">Najhum admin</span>
          </div>
          <h1 id="login-heading" className="font-display normal-case text-[34px] leading-tight font-semibold tracking-tight sm:text-[38px]">Welcome back<span className="text-primary">.</span></h1>
          <p className="mt-3 mb-8 text-sm leading-6 text-slate-500">Sign in to manage your solutions and bring your next idea to life.</p>
          <LoginForm />
          <p className="mt-7 border-t border-slate-100 pt-6 text-center text-xs leading-5 text-slate-400">For authorized Najhum team members.</p>
        </section>
      </main>
      <footer className="px-6 pb-6 text-center text-[11px] tracking-wide text-slate-400 sm:pb-8">Najhum Technologies LLC <span className="mx-2 text-slate-300">/</span> Digital excellence. Sustainable progress.</footer>
    </div>
  );
}
