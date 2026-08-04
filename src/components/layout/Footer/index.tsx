import { FooterCTA } from "./FooterCTA";
import { FooterLinks } from "./FooterLinks";

export default function Footer() {
  return (
    <footer className="w-full bg-neutral-950 text-white border-t border-white/10 flex flex-col">
      <FooterCTA />
      <FooterLinks />
      <div className="w-full py-6 text-center text-xs text-neutral-600 border-t border-white/5">
        &copy; {new Date().getFullYear()} Najhum Technologies. All rights reserved.
      </div>
    </footer>
  );
}
