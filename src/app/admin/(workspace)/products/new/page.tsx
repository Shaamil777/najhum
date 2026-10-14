import { prisma } from '@/lib/db/prisma';
import ProductForm from '../components/ProductForm';

export const dynamic = 'force-dynamic';

export default async function NewProductPage() {
  let availableSolutions: Array<{ slug: string; title: string }> = [];

  try {
    availableSolutions = await prisma.solution.findMany({
      select: { slug: true, title: true },
      orderBy: { title: 'asc' },
    });
  } catch (error) {
    console.error('Failed to load solutions for new product page:', error);
  }

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
