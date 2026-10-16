import { Container } from "@/design-system/primitives/layout/Container";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ProductsHero() {
  return (
    <section id="products-hero" aria-label="Products Hero" className="w-full relative overflow-hidden bg-[#f8faff] pt-16 pb-8 lg:pt-24 lg:pb-12">
      {/* Abstract Background Shape */}
      <div className="absolute top-0 right-0 w-[50%] h-full bg-gradient-to-bl from-[#e5eeff] to-transparent rounded-bl-full z-0 opacity-70"></div>

      <Container size="full" className="relative z-10 px-4 lg:px-12 max-w-[1440px]">
        <div className="max-w-3xl flex flex-col items-start text-left">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-8 h-[2px] bg-primary"></div>
            <span className="text-xs font-bold tracking-widest text-muted uppercase">Products</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-[3.5rem] font-bold text-foreground mb-6 tracking-tight leading-[1.1] font-display">
            Innovative Solutions <br />
            <span className="text-primary">for a Smarter Tomorrow</span>
          </h1>
          
          <p className="text-lg text-muted max-w-xl leading-relaxed mb-10">
            Explore our complete range of products designed to deliver reliability, performance, and real-world impact.
          </p>
          
          <div className="flex items-center">
            <Link
              href="/contact#contact-form"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-foreground hover:bg-neutral-800 text-white px-8 py-3.5 rounded-full font-semibold text-sm transition-all"
            >
              <span>Request a Demo</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
