import SolutionsHero from "@/components/sections/solutions/SolutionsHero";
import SolutionsGrid from "@/components/sections/solutions/SolutionsGrid";
import SolutionsCta from "@/components/sections/solutions/SolutionsCta";

export default function SolutionsPage() {
  return (
    <div className="flex flex-col w-full">
      <SolutionsHero />
      <SolutionsGrid />
      <SolutionsCta />
    </div>
  );
}
