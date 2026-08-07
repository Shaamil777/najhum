import { AntiMetalButton } from "@/components/ui/anti-metal-button";
import Link from "next/link";

export function CTAButton() {
  return (
    <div className="hidden md:inline-flex focus-visible:outline-none">
      <Link href="/contact" className="focus-visible:outline-none">
        <AntiMetalButton 
          label="Contact" 
          accentFrom="#4c3bcf" 
          accentTo="#5a48df" 
          dotColor="#ffffff"
        />
      </Link>
    </div>
  );
}
