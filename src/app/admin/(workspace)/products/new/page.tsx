import { prisma } from '@/lib/db/prisma';
import ProductForm from '../components/ProductForm';

export default async function NewProductPage() {
  const availableSolutions = await prisma.solution.findMany({
    select: { slug: true, title: true },
    orderBy: { title: 'asc' },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Add New Product</h1>
        <p className="mt-1 text-sm text-slate-500">
          Create a new product and choose which platforms to showcase it on.
        </p>
      </div>
      
      <ProductForm availableSolutions={availableSolutions} />
    </div>
  );
}
