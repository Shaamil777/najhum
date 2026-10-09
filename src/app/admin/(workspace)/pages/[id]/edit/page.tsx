import { notFound } from 'next/navigation';
import { prisma } from '@/lib/db/prisma';
import PageEditor from './PageEditor';

export default async function EditPageServer({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const page = await prisma.pageContent.findUnique({
    where: { id },
  });

  if (!page) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Edit {page.title}</h1>
        <p className="mt-1 text-sm text-slate-500">
          Modify the raw JSON structure for this page. Changes will be reflected once the frontend is wired.
        </p>
      </div>
      
      <PageEditor page={page} />
    </div>
  );
}
