'use client';

import { useCallback, useEffect, useId, useRef, useState, type ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface PlatformCarouselItem {
  id: string | number;
  title: string;
  description?: string | null;
  imageUrl?: string | null;
  imagePlaceholder?: string;
  href: string;
}

export default function PlatformCardCarousel({ items, title, description, itemLabel, imageFit = 'contain' }: {
  items: PlatformCarouselItem[];
  title: ReactNode;
  description?: string;
  itemLabel: 'product' | 'solution';
  imageFit?: 'contain' | 'cover';
}) {
  const track = useRef<HTMLDivElement>(null);
  const id = useId();
  const [bounds, setBounds] = useState({ left: false, right: false });
  const updateBounds = useCallback(() => {
    const node = track.current;
    if (!node) return;
    const left = node.scrollLeft > 4, right = node.scrollLeft + node.clientWidth < node.scrollWidth - 4;
    setBounds(previous => previous.left === left && previous.right === right ? previous : { left, right });
  }, []);
  useEffect(() => {
    const node = track.current;
    if (!node) return;
    const frame = requestAnimationFrame(updateBounds);
    const observer = new ResizeObserver(updateBounds);
    observer.observe(node);
    node.addEventListener('scroll', updateBounds, { passive: true });
    return () => { cancelAnimationFrame(frame); observer.disconnect(); node.removeEventListener('scroll', updateBounds); };
  }, [items, updateBounds]);
  function move(direction: number) {
    const node = track.current;
    if (!node) return;
    const width = node.firstElementChild?.getBoundingClientRect().width || node.clientWidth;
    const gap = Number.parseFloat(getComputedStyle(node).columnGap) || 0;
    node.scrollBy({ left: direction * (width + gap), behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  }
  const controls = <>
    {([-1, 1] as const).map(direction => {
      const enabled = direction < 0 ? bounds.left : bounds.right;
      return <button key={direction} type="button" onClick={() => move(direction)} disabled={!enabled} aria-label={`${direction < 0 ? 'Previous' : 'Next'} ${itemLabel}`} aria-controls={id} className={cn('w-12 h-12 rounded-full border border-border flex items-center justify-center transition-colors shadow-sm', enabled ? 'text-foreground hover:bg-primary hover:text-white hover:border-primary cursor-pointer' : 'text-muted/30 opacity-40 cursor-not-allowed')}><ArrowRight className={cn('w-5 h-5', direction < 0 && 'rotate-180')}/></button>;
    })}
  </>;
  if (!items.length) return null;
  return <section aria-label={`${itemLabel === 'product' ? 'Product' : 'Solution'} carousel`} className="w-full pt-12 sm:pt-16 lg:pt-20 pb-12 sm:pb-14 lg:pb-16 bg-surface relative overflow-hidden font-sans border-b border-border">
    <div className="container mx-auto px-6 lg:px-16 max-w-[1400px] mb-6 sm:mb-8 lg:mb-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8">
        <h2 className="max-w-2xl text-center md:text-left mx-auto md:mx-0 text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem] font-bold tracking-tight text-foreground leading-tight">{title}</h2>
        <div className="flex items-center justify-center md:justify-end gap-4">
          {description && <p className="text-muted text-base lg:text-lg max-w-sm italic text-left hidden md:block md:mr-6">{description}</p>}
          <div className="hidden lg:flex gap-3 shrink-0">{controls}</div>
        </div>
      </div>
    </div>
    <div id={id} ref={track} role="group" aria-label={`Swipe to explore ${itemLabel}s`} tabIndex={0} onKeyDown={event => { if (event.target !== event.currentTarget) return; if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') { event.preventDefault(); move(event.key === 'ArrowLeft' ? -1 : 1); } }} className="platform-card-track flex gap-6 lg:gap-8 px-6 lg:px-16 py-2 md:py-6 lg:py-12 overflow-x-auto overflow-y-hidden snap-x snap-mandatory w-full scroll-smooth focus-visible:outline-2 focus-visible:outline-primary focus-visible:-outline-offset-2" style={{ scrollbarWidth: 'none' }}>
      {items.map((item, index) => <article key={item.id} className={cn('w-[min(280px,calc(100vw-48px))] md:w-[320px] lg:w-[340px] shrink-0 group snap-center', items.length > 1 && (index % 2 === 0 ? 'lg:-translate-y-8' : 'lg:translate-y-8'))}>
        <div className="bg-background rounded-3xl border border-border overflow-hidden h-[400px] md:h-[440px] lg:h-[480px] flex flex-col group-hover:border-primary/40 group-hover:shadow-xl transition-all duration-300">
          <Link href={item.href} tabIndex={-1} aria-hidden="true" className={cn('h-[55%] w-full relative overflow-hidden border-b border-border/40 shrink-0', item.imagePlaceholder || 'bg-slate-50')}>
            {item.imageUrl ? <Image src={item.imageUrl} alt="" fill unoptimized sizes="(min-width:1024px) 340px, 320px" className={cn('transition-transform duration-300 group-hover:scale-105', imageFit === 'cover' ? 'object-cover' : 'object-contain p-10')}/> : <div className="h-full grid place-items-center text-xs font-semibold uppercase tracking-widest text-muted">{itemLabel === 'product' ? 'Product image' : 'Connected solution'}</div>}
          </Link>
          <div className="flex-1 min-h-0 p-5 md:p-6 flex flex-col bg-background">
            <h3 className="text-base lg:text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2 leading-snug"><Link href={item.href}>{item.title}</Link></h3>
            <p className="text-xs lg:text-sm text-muted leading-relaxed line-clamp-3">{item.description}</p>
            <Link href={item.href} className="inline-flex items-center self-start text-xs font-bold uppercase tracking-wider text-primary mt-auto pt-3 hover:underline">Explore {itemLabel}<ArrowRight className="w-4 h-4 ml-2 shrink-0"/></Link>
          </div>
        </div>
      </article>)}
    </div>
    <div className="flex lg:hidden items-center justify-center gap-4 mt-6">{controls}</div>
  </section>;
}
