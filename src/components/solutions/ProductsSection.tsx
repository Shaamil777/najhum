import RichText from './RichText';
import Image from 'next/image';
import type { BuilderProduct } from '@/lib/builder/document';
import type { ProductsCarouselContent } from '@/types/section';

export default function ProductsSection({ content, products, editing = false }: { content: ProductsCarouselContent; products: BuilderProduct[]; editing?: boolean }) {
  if (!products.length && !editing) return null;
  return <section className="bg-zinc-50 py-20 border-y border-zinc-200">
    <div className="max-w-7xl mx-auto px-6">
      <div className="mb-10 text-center"><h2 className="text-3xl md:text-4xl font-bold text-zinc-900"><RichText value={content.heading ?? 'Related products'} /></h2><RichText as="div" className="mt-4 text-zinc-500" value={content.description ?? 'Explore the hardware that powers this solution.'} /></div>
      {!products.length ? <div className="p-8 border-2 border-dashed border-zinc-300 rounded-xl text-center text-zinc-500">Published products linked to this solution will appear here. Link them from Products in your dashboard.</div> : <div className="flex gap-6 overflow-x-auto snap-x pb-4">{products.map(product => <article key={product.id} className="snap-start w-72 shrink-0 rounded-2xl border border-zinc-200 bg-white p-5">
        {product.imageUrl && <div className="relative h-44 mb-5"><Image src={product.imageUrl} alt={product.name} fill unoptimized className="object-contain" sizes="288px" /></div>}
        <h3 className="font-bold text-zinc-900">{product.name}</h3><RichText as="div" className="mt-3 text-sm text-zinc-500" value={product.description} />
        <a href={`/products/${encodeURIComponent(product.id)}`} className="mt-5 inline-block text-sm font-semibold text-primary">View product →</a>
      </article>)}</div>}
    </div>
  </section>;
}
