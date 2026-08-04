import ProductsHero from "@/components/products/ProductsHero";
import ProductsGrid from "@/components/products/ProductsGrid";
import ProductsWhyChoose from "@/components/products/ProductsWhyChoose";
import ProductsIndustries from "@/components/products/ProductsIndustries";
import ProductsStandards from "@/components/products/ProductsStandards";
import ProductsDeployment from "@/components/products/ProductsDeployment";
import ProductsCta from "@/components/products/ProductsCta";

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