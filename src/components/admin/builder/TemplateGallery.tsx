'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Monitor, Smartphone, Tablet, X } from 'lucide-react';
import { makeTemplate, pageTemplates, sectionLabel, type PageTemplateId } from '@/lib/builder/catalog';
import type { BuilderProduct } from '@/lib/builder/document';
import SolutionSection from '@/components/solutions/SolutionSection';
import PreviewFrame from './PreviewFrame';

export default function TemplateGallery({ products, linkedProducts, hasSections, currentCount, onApply, onClose }: {
  products: BuilderProduct[]; linkedProducts: BuilderProduct[]; hasSections: boolean; currentCount: number;
  onApply: (kind: PageTemplateId, mode: 'replace' | 'append') => void; onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [selected, setSelected] = useState<PageTemplateId>('overview');
  const [width, setWidth] = useState(1280);
  const [mode, setMode] = useState<'replace' | 'append'>('append');
  const [reviewedReplacement, setReviewedReplacement] = useState(false);
  const sections = useMemo(() => makeTemplate(selected, products), [selected, products]);
  const template = pageTemplates.find(item => item.id === selected)!;
  const tooMany = hasSections && mode === 'append' && currentCount + sections.length > 60;
  useEffect(() => { dialog.current?.showModal(); }, []);
  return <dialog ref={dialog} onCancel={onClose} aria-labelledby="template-gallery-title" className="builder-section-preview-modal builder-template-gallery">
    <header className="flex items-center justify-between gap-3 p-4 bg-white border-b border-slate-200">
      <div><h2 id="template-gallery-title" className="!text-base !normal-case !m-0">Choose a solution page template</h2><p className="text-xs text-slate-500 mt-1">Preview a complete page, then edit any text, image, or section.</p></div>
      <button aria-label="Close template gallery" className="builder-icon-button" onClick={onClose}><X size={18} /></button>
    </header>
    <div className="builder-template-body">
      <aside className="builder-template-options">
        {pageTemplates.map(item => <button key={item.id} aria-pressed={selected === item.id} className={`builder-template-option ${selected === item.id ? 'active' : ''}`} onClick={() => setSelected(item.id)}><strong>{item.label}</strong><span>{item.description}</span></button>)}
        <p className="text-xs text-slate-500 leading-5 mt-3">Starter content is illustrative. Replace sample project stories, figures, and media before publishing.</p>
      </aside>
      <div className="builder-template-preview">
        <div className="flex flex-wrap items-center justify-between gap-2 px-4 pt-3"><span className="text-xs font-semibold">{template.label} · {sections.length} sections</span><div className="flex gap-1">{[[1280, Monitor, 'Desktop'], [768, Tablet, 'Tablet'], [390, Smartphone, 'Mobile']].map(([size, Icon, label]) => { const DeviceIcon = Icon as typeof Monitor; return <button key={size as number} className={`builder-icon-button ${width === size ? 'active' : ''}`} aria-label={`${label} template preview`} aria-pressed={width === size} onClick={() => setWidth(size as number)}><DeviceIcon size={16} /></button>; })}</div></div>
        <PreviewFrame key={selected} width={width} editing>{sections.map(section => <SolutionSection key={section.id} section={section} editing products={linkedProducts} availableProducts={products} />)}</PreviewFrame>
        <p className="text-[10px] text-slate-500 px-4 pb-3">{sections.map(sectionLabel).join(' → ')}</p>
      </div>
    </div>
    <footer className="builder-template-footer">
      {hasSections && <div className="text-xs text-slate-600"><label className="flex items-center gap-2"><span>Apply template</span><select aria-label="How to apply template" value={mode} onChange={event => { setMode(event.target.value as 'replace' | 'append'); setReviewedReplacement(false); }} className="border border-slate-200 rounded p-2"><option value="append">Add after existing sections</option><option value="replace">Replace existing sections</option></select></label>{mode === 'replace' && <label className="flex items-center gap-2 mt-2"><input type="checkbox" checked={reviewedReplacement} onChange={event => setReviewedReplacement(event.target.checked)} />Replace all {currentCount} current sections. You can undo this change.</label>}{tooMany && <p role="alert" className="text-red-600 mt-2">This would exceed 60 sections. Choose replace or remove sections first.</p>}</div>}
      <button className="builder-primary-button" disabled={tooMany || (hasSections && mode === 'replace' && !reviewedReplacement)} onClick={() => onApply(selected, hasSections ? mode : 'replace')}>Use this template</button>
    </footer>
  </dialog>;
}
