import SolutionsHero from "@/components/solutions/SolutionsHero";
import SolutionsGrid from "@/components/solutions/SolutionsGrid";
import SolutionsCta from "@/components/solutions/SolutionsCta";

export default function SolutionsPage() {
  return (
    <div className="flex flex-col w-full">
      <SolutionsHero />
      <SolutionsGrid />
      <SolutionsCta />
    </div>
  );
}
