import { revalidatePath } from 'next/cache';
import { getSolutionById } from '@/lib/db/queries/solutions';

export function revalidateSolutions(slug?: string) {
  if (slug) revalidatePath(`/solutions/${slug}`);
  revalidatePath('/solutions');
  for (const platform of ['iotrics', 'evoltics', 'cropifai']) revalidatePath(`/platforms/${platform}`);
  revalidatePath('/sitemap.xml');
}

export async function revalidateSolutionById(id: string) {
  const solution = await getSolutionById(id);
  revalidateSolutions(solution?.slug);
}
