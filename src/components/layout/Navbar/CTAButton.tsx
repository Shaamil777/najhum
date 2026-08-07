import { AntiMetalButton } from "@/components/ui/anti-metal-button";
import Link from "next/link";

export function CTAButton() {
  return (
    <Link href="/contact" className="hidden md:inline-flex focus-visible:outline-none">
      <AntiMetalButton 
        label="Contact" 
        accentFrom="var(--color-primary)" 
        accentTo="var(--color-primary)" 
        dotColor="#ffffff"
        className="dark" // Force light mode gradient on the dark variant if needed, or just let it adapt
      />
    </Link>
  );
}
