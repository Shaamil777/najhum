import Link from 'next/link';
import { prisma } from '@/lib/db/prisma';
import { Plus, Edit2, LayoutTemplate } from 'lucide-react';

export default async function PagesList() {
  const pages = await prisma.pageContent.findMany({
    orderBy: { title: 'asc' },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Pages</h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage the raw JSON structure for static pages across the website.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {pages.map((page) => (
          <div
            key={page.id}
            className="flex flex-col rounded-xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md"
          >
            <div className="p-5 flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  <LayoutTemplate size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">{page.title}</h3>
                  <p className="text-xs text-slate-500">/{page.slug}</p>
                </div>
              </div>
              <div className="text-xs text-slate-500">
                Last updated: {new Date(page.updatedAt).toLocaleDateString()}
              </div>
            </div>
            
            <div className="flex border-t border-slate-100 bg-slate-50/50 p-3 rounded-b-xl">
              <Link
                href={`/admin/pages/${page.id}/edit`}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50 transition-colors"
              >
                <Edit2 size={16} />
                Edit JSON Data
              </Link>
            </div>
          </div>
        ))}
      </div>
      
      {pages.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 p-12 text-center">
          <LayoutTemplate className="mx-auto h-12 w-12 text-slate-400" />
          <h3 className="mt-4 text-sm font-semibold text-slate-900">No pages found</h3>
          <p className="mt-1 text-sm text-slate-500">
            Run the seed script to import pages.
          </p>
        </div>
      )}
    </div>
  );
}
