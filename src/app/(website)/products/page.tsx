import ProductsHero from "@/components/sections/products/ProductsHero";
import ProductsGrid from "@/components/sections/products/ProductsGrid";
import ProductsWhyChoose from "@/components/sections/products/ProductsWhyChoose";
import ProductsIndustries from "@/components/sections/products/ProductsIndustries";
import ProductsStandards from "@/components/sections/products/ProductsStandards";
import ProductsDeployment from "@/components/sections/products/ProductsDeployment";
import ProductsCta from "@/components/sections/products/ProductsCta";

export default function ProductsPage() {
  return (
    <div className="flex flex-col w-full">
      <ProductsHero />
      <ProductsGrid />
      <ProductsWhyChoose />
      <ProductsIndustries />
      <ProductsStandards />
      <ProductsDeployment />
      <ProductsCta />
    </div>
  );
}