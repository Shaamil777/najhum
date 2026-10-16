import { AntiMetalButton } from "@/components/ui/anti-metal-button";
import Link from "next/link";

export function CTAButton() {
  return (
    <div className="hidden md:inline-flex focus-visible:outline-none">
      <Link href="/contact" className="focus-visible:outline-none">
        <AntiMetalButton
          label="Contact Us"
          accentFrom="#167DE4"
          accentTo="#0F5FB0"
          dotColor="#ffffff"
        />
      </Link>
    </div>
  );
}
