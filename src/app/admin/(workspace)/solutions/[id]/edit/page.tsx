import { notFound } from 'next/navigation';
import SolutionBuilder from '@/components/admin/builder/SolutionBuilder';
import { getBuilderSession } from '@/lib/builder/server';
import { ApiError } from '@/lib/utils/api-error';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Solution page builder' };

export default async function SolutionEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let session;
  try {
    session = await getBuilderSession(id);
  } catch (error) {
    if (error instanceof ApiError && error.statusCode === 404) notFound();
    throw error;
  }
  return <SolutionBuilder solutionId={id} initialSession={session} />;
}
