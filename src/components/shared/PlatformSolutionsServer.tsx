import { getSolutionsByPlatform } from "@/lib/db/queries/solutions";
import PlatformSolutionsCarousel from "./PlatformSolutionsCarousel";

interface PlatformSolutionsServerProps {
  platformId: "iotrics" | "evoltics" | "cropifai" | string;
  title?: string;
  eyebrow?: string;
  description?: string;
}

export default async function PlatformSolutionsServer({
  platformId,
  title,
  eyebrow,
  description,
}: PlatformSolutionsServerProps) {
  let solutions;
  try {
    solutions = await getSolutionsByPlatform(platformId, true);
  } catch (error) {
    console.error(`Failed to load solutions for platform "${platformId}":`, error);
    return null;
  }

  if (!solutions || solutions.length === 0) {
    return null;
  }

  return (
    <PlatformSolutionsCarousel
      solutions={solutions}
      platformId={platformId}
      title={title}
      eyebrow={eyebrow}
      description={description}
    />
  );
}
