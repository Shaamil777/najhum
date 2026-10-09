import { notFound } from 'next/navigation';
import { prisma } from '@/lib/db/prisma';
import ProductForm from '../../components/ProductForm';

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const [product, availableSolutions] = await Promise.all([
    prisma.product.findUnique({
      where: { id },
    }),
    prisma.solution.findMany({
      select: { slug: true, title: true },
      orderBy: { title: 'asc' },
    }),
  ]);

  if (!product) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Edit Product: {product.name}</h1>
        <p className="mt-1 text-sm text-slate-500">
          Modify product details and choose which platforms to showcase it on.
        </p>
      </div>
      
      <ProductForm initialData={product} availableSolutions={availableSolutions} />
    </div>
  );
}
