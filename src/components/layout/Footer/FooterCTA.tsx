import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function FooterCTA() {
  return (
    <div className="w-full py-16 px-8 lg:px-16 border-b border-white/10 flex flex-col items-center text-center">
      <h3 className="text-3xl font-black uppercase tracking-tight mb-6">
        Ready to Build the Future?
      </h3>
      <p className="text-neutral-400 text-sm max-w-xl mb-8 leading-relaxed">
        Join the revolution in digital infrastructure, industrial IoT, and sustainable technology.
      </p>
      <Link href="/contact">
        <Button variant="primary" size="lg">Start Your Project</Button>
      </Link>
    </div>
  );
}
