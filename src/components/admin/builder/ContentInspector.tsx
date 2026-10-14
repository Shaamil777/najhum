'use client';

import { useId, useState } from 'react';
import { ArrowDown, ArrowUp, ImageIcon, Plus, Trash2, Upload } from 'lucide-react';
import ImageBrowserModal from '@/components/admin/images/ImageBrowserModal';
import RichTextEditor from './RichTextEditor';
import { SectionType } from '@/types/section';
import type { BuilderProduct } from '@/lib/builder/document';
import { sectionLibrary, arrayLimits, arrayTemplates } from '@/lib/builder/catalog';

const labelFor = (key: string) => key.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/^./, letter => letter.toUpperCase());
const selectOptions: Record<string, string[]> = {
  bodyFormat: ['text', 'html'],
  imagePosition: ['left', 'right'],
  theme: ['light', 'dark'],
  chartType: ['bar', 'comparison-bars', 'telemetry-stream'],
  layout: ['contained', 'full-width', 'cinema', 'card', 'split-left', 'split-right'],
  aspectRatio: ['16:9', '4:3', '21:9', 'auto'],
  displayMode: ['solution-tagged', 'all', 'manual'],
  columns: ['2', '3', '4'],
};

function ImageField({ value, onChange, solutionId, label }: { value: string; onChange: (value: string) => void; solutionId: string; label: string }) {
  const id = useId();
  const [browsing, setBrowsing] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  async function upload(file?: File) {
    if (!file) return;
    setUploading(true); setError('');
    try {
      const body = new FormData(); body.append('file', file); body.append('solutionId', solutionId);
      const response = await fetch('/api/admin/images', { method: 'POST', body });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Upload failed.');
      onChange(result.url);
    } catch (err) { setError(err instanceof Error ? err.message : 'Upload failed.'); }
    finally { setUploading(false); }
  }
  return <div className="builder-field">
    <label htmlFor={id}>{label}</label><input id={id} value={value} placeholder="https://…" onChange={event => onChange(event.target.value)} />
    <div className="flex gap-2 mt-2"><button type="button" onClick={() => setBrowsing(true)} className="builder-small-button"><ImageIcon size={13} />Library</button><label className="builder-small-button cursor-pointer"><Upload size={13} />{uploading ? 'Uploading…' : 'Upload'}<input aria-label={`Upload ${label}`} type="file" accept="image/jpeg,image/png,image/webp,image/gif" disabled={uploading} className="hidden" onChange={event => void upload(event.target.files?.[0])} /></label></div>
    {error && <p role="alert" className="text-xs text-red-600 mt-2">{error}</p>}
    <ImageBrowserModal isOpen={browsing} onClose={() => setBrowsing(false)} onSelect={onChange} currentUrl={value} solutionId={solutionId} />
  </div>;
}

export default function ContentInspector({ value, onChange, field = '', solutionId, sectionType, products = [] }: { value: unknown; onChange: (value: unknown) => void; field?: string; solutionId: string; sectionType?: SectionType; products?: BuilderProduct[] }) {
  const id = useId();
  const label = labelFor(field);
  if (field === 'productIds' && Array.isArray(value)) return <div className="builder-field"><label>Choose products ({value.length}/12)</label><p className="text-xs text-slate-400 mb-3">Each card opens the selected product’s detail page.</p>{products.length ? <div className="max-h-80 overflow-auto space-y-2">{products.map(product => <label key={product.id} className="flex gap-2 items-start p-3 rounded-lg border border-slate-200 text-xs"><input type="checkbox" checked={value.includes(product.id)} disabled={!value.includes(product.id) && value.length >= 12} onChange={event => onChange(event.target.checked ? [...value, product.id] : value.filter(id => id !== product.id))} /><span>{product.name}</span></label>)}</div> : <p className="p-3 bg-amber-50 text-xs text-amber-800 rounded-lg">Create a published product in the Products dashboard first. This section shows sample cards until a real product is available.</p>}</div>;
  if (field === 'rawData' || field === '_design') return null;
  if (Array.isArray(value)) {
    const limit = arrayLimits[field] || 20;
    return <div className="builder-array">
      <div className="flex items-center justify-between mb-3"><span className="text-xs font-semibold">{label} <span className="text-slate-400">{value.length}/{limit}</span></span><button type="button" className="builder-small-button" disabled={value.length >= limit} onClick={() => {
        const template = JSON.parse(JSON.stringify(arrayTemplates[field] ?? value[0] ?? 'New item'));
        if (field === 'tabs' || field === 'items') template.id = `${field}-${crypto.randomUUID().slice(0, 8)}`;
        onChange([...value, template]);
      }}><Plus size={13} />Add</button></div>
      {value.map((item, index) => <div key={index} className="builder-array-item">
        <div className="flex justify-between items-center mb-3"><span className="text-[10px] uppercase font-semibold text-slate-400">Item {index + 1}</span><div className="flex gap-1">{[[-1, ArrowUp], [1, ArrowDown]].map(([direction, Icon]) => {
          const delta = direction as number; const MoveIcon = Icon as typeof ArrowUp;
          return <button key={delta} type="button" className="builder-icon-button" aria-label={`Move ${label} item ${index + 1} ${delta < 0 ? 'up' : 'down'}`} disabled={index + delta < 0 || index + delta >= value.length} onClick={() => { const items = [...value]; [items[index], items[index + delta]] = [items[index + delta], items[index]]; onChange(items); }}><MoveIcon size={12} /></button>;
        })}<button type="button" aria-label={`Remove ${label} item ${index + 1}`} className="builder-icon-button" onClick={() => onChange(value.filter((_, position) => position !== index))}><Trash2 size={12} /></button></div></div>
        <ContentInspector field={typeof item === 'string' ? 'text' : ''} value={item} solutionId={solutionId} sectionType={sectionType} products={products} onChange={next => onChange(value.map((existing, position) => position === index ? next : existing))} />
      </div>)}
    </div>;
  }
  if (value && typeof value === 'object') return <div>{Object.entries(value).map(([key, item]) => <ContentInspector key={key} field={key} value={item} solutionId={solutionId} sectionType={sectionType} products={products} onChange={next => onChange({ ...value, [key]: next })} />)}</div>;
  if (typeof value === 'string') {
    if (sectionType && ['heading', 'title', 'description', 'subheading', 'bodyText', 'bodyHtml', 'quote', 'summary', 'solutionDetails', 'info', 'infoTitle', 'text'].includes(field)) return <RichTextEditor label={label} value={value} onChange={onChange} lists={!['heading', 'title', 'infoTitle', 'text'].includes(field)} />;
    if (['backgroundImage', 'image', 'avatar', 'poster', 'imageUrl', 'posterUrl'].includes(field)) return <ImageField value={value} onChange={onChange} solutionId={solutionId} label={label} />;
    if (selectOptions[field]) return <div className="builder-field"><label htmlFor={id}>{label}</label><select id={id} value={value} onChange={event => onChange(event.target.value)}>{selectOptions[field].map(option => <option key={option}>{option}</option>)}</select></div>;
    const multiline = /description|body|subheading|summary|quote|details|text$/i.test(field) && !/button|cta/i.test(field);
    return <div className="builder-field"><label htmlFor={id}>{label}</label>{multiline ? <textarea id={id} value={value} rows={field === 'bodyHtml' ? 7 : 3} onChange={event => onChange(event.target.value)} /> : <input id={id} value={value} onChange={event => onChange(event.target.value)} />}{field === 'bodyHtml' && <p className="text-[10px] text-slate-400 mt-1">Safe HTML: paragraphs, lists, formatting, and links.</p>}</div>;
  }
  if (typeof value === 'number') return <div className="builder-field"><label htmlFor={id}>{label}</label><input id={id} type="number" value={value} onChange={event => onChange(Number(event.target.value))} /></div>;
  if (typeof value === 'boolean') return <label className="flex gap-2 text-xs mb-4"><input type="checkbox" checked={value} onChange={event => onChange(event.target.checked)} />{label}</label>;
  return null;
}
