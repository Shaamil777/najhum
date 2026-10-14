'use client';
import { useEffect, useRef, useState } from 'react';
import { Monitor, Smartphone, Plus, X } from 'lucide-react';
import { makeSection, sectionLibrary } from '@/lib/builder/catalog';
import type { BuilderProduct } from '@/lib/builder/document';
import type { SectionType } from '@/types/section';
import SolutionSection from '@/components/solutions/SolutionSection';
import PreviewFrame from './PreviewFrame';

export default function SectionPreviewModal({ type, products, linkedProducts, onAdd, onClose }: { type: SectionType; products: BuilderProduct[]; linkedProducts: BuilderProduct[]; onAdd: () => void; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [width, setWidth] = useState(1280);
  const [section] = useState(() => makeSection(type, products));
  const template = sectionLibrary.find(item => item.type === type)!;
  useEffect(() => { dialog.current?.showModal(); }, []);
  return <dialog ref={dialog} onCancel={onClose} aria-labelledby="section-preview-heading" className="builder-section-preview-modal">
    <header className="flex justify-between gap-4 items-center p-5 bg-white border-b border-slate-200"><div><h2 id="section-preview-heading" className="!text-base !normal-case !m-0">{template.label} preview</h2><p className="text-xs text-slate-400 mt-1">Prefilled content · fully editable after adding</p></div><div className="flex gap-2"><button aria-label="Desktop section preview" className="builder-icon-button" onClick={() => setWidth(1280)}><Monitor size={17} /></button><button aria-label="Mobile section preview" className="builder-icon-button" onClick={() => setWidth(390)}><Smartphone size={17} /></button><button className="builder-primary-button" onClick={onAdd}><Plus size={15} />Add this section</button><button aria-label="Close section preview" className="builder-icon-button" onClick={onClose}><X size={18} /></button></div></header>
    <PreviewFrame width={width} editing><SolutionSection section={section} editing products={linkedProducts} availableProducts={products} /></PreviewFrame>
  </dialog>;
}
