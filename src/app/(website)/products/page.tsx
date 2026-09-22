import ProductsHero from "@/components/sections/products/ProductsHero";
import ProductsGrid from "@/components/sections/products/ProductsGrid";
import Cta from "@/components/sections/home/Cta"; // Reusing the global CTA from home

export default function ProductsPage() {
  return (
    <div className="flex flex-col w-full">
      <ProductsHero />
      <ProductsGrid />
      <Cta />
    </div>
  );
}