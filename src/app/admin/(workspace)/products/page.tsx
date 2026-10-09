import Link from 'next/link';
import { prisma } from '@/lib/db/prisma';
import { Plus, Edit2, Package, Tag } from 'lucide-react';

export default async function ProductsList() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Products</h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage your individual products and select which platforms showcase them.
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-primary"
        >
          <Plus size={18} />
          New Product
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex flex-col rounded-xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md"
          >
            <div className="p-5 flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-blue-600 overflow-hidden">
                  {product.imageUrl ? (
                    <img src={product.imageUrl} alt={product.name} className="h-full w-full object-cover" />
                  ) : (
                    <Package size={24} />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">{product.name}</h3>
                  <p className="text-xs text-slate-500 line-clamp-1">{product.description}</p>
                </div>
              </div>
              
              <div className="mt-4 flex flex-wrap gap-2">
                {product.platforms.map((p) => (
                  <span key={p} className="inline-flex items-center gap-1 px-2 py-1 bg-slate-100 text-slate-600 text-[10px] uppercase tracking-wider font-semibold rounded-md border border-slate-200">
                    <Tag size={10} />
                    {p}
                  </span>
                ))}
                {product.platforms.length === 0 && (
                  <span className="text-xs text-slate-400 italic">No platforms selected</span>
                )}
              </div>
            </div>
            
            <div className="flex border-t border-slate-100 bg-slate-50/50 p-3 rounded-b-xl">
              <Link
                href={`/admin/products/${product.id}/edit`}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50 transition-colors"
              >
                <Edit2 size={16} />
                Edit Product
              </Link>
            </div>
          </div>
        ))}
      </div>
      
      {products.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 p-12 text-center">
          <Package className="mx-auto h-12 w-12 text-slate-400" />
          <h3 className="mt-4 text-sm font-semibold text-slate-900">No products found</h3>
          <p className="mt-1 text-sm text-slate-500 mb-6">
            Get started by creating a new product to showcase on your platforms.
          </p>
          <Link
            href="/admin/products/new"
            className="flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-primary"
          >
            <Plus size={18} />
            Add First Product
          </Link>
        </div>
      )}
    </div>
  );
}
