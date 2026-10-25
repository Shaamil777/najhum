'use client';

import { useId, useState } from 'react';
import { ArrowDown, ArrowUp, ImageIcon, Plus, Trash2, Upload } from 'lucide-react';
import ImageBrowserModal from '@/components/admin/images/ImageBrowserModal';
import { imageRecommendation } from '@/lib/builder/media';
import RichTextEditor from './RichTextEditor';
import { SectionType } from '@/types/section';
import type { BuilderProduct } from '@/lib/builder/document';
import { arrayLimits, arrayTemplates } from '@/lib/builder/catalog';

const fieldLabels: Record<string, string> = { mediaRatio: 'Image shape', headingAlign: 'Heading alignment', columns: 'Cards per row (desktop)', mediaCards: 'Hero image cards', imageAlt: 'Image description', eyebrow: 'Section label', tableColumns: 'Table columns', tableRows: 'Table rows', tableCaption: 'Table caption', cells: 'Cells', bodyHtml: 'Introduction text', entries: 'Items', ctaText: 'Button text', ctaLink: 'Button destination', imagePosition: 'Desktop image position', fit: 'Image display', altText: 'Image description', productIds: 'Selected products' };
const optionLabels: Record<string, string> = { INDUSTRY: 'By industry', USE_CASE: 'By use case', BOTH: 'Both industry and use case', 'hero-faded': 'Hero with side-fade image', centered: 'Centered banner', 'hero-split': 'Split image hero', 'hero-video': 'Background video hero', 'hero-editorial': 'Image card hero', 'image-cards': 'Image cards', 'overlay-cards': 'Text over image cards', 'image-bento': 'Featured image mosaic', 'split-stories': 'Alternating image and text', 'video-cards': 'Video cards', 'rich-text': 'Text only', 'case-studies': 'Project stories', resources: 'Guides and downloads', statistics: 'Key numbers', 'faded-image-cards': 'Faded image cards · About style', 'image-banner': 'Background image banner', full: 'Full image overlay', side: 'Image fading from the side', table: 'Data table', faq: 'Frequently asked questions', light: 'White', soft: 'Soft gray', dark: 'Dark', cover: 'Fill frame (crop edges)', contain: 'Fit whole image', auto: 'Original ratio (diagrams)', 'split-left': 'Text left, image right', 'split-right': 'Text right, image left' };
const labelFor = (key: string) => fieldLabels[key] || key.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/^./, letter => letter.toUpperCase());
const selectOptions: Record<string, string[]> = {
  classification: ['INDUSTRY', 'USE_CASE', 'BOTH'],
  overlayStyle: ['full', 'side'],
  headingAlign: ['left', 'center'],
  mediaRatio: ['16:9', '4:3', '1:1', '3:4'],
  fit: ['cover', 'contain'],
  bodyFormat: ['text', 'html'],
  imagePosition: ['left', 'right'],
  theme: ['light', 'dark'],
  chartType: ['bar', 'comparison-bars', 'telemetry-stream'],
  layout: ['contained', 'full-width', 'cinema', 'card', 'split-left', 'split-right'],
  aspectRatio: ['16:9', '4:3', '21:9', 'auto'],
  displayMode: ['solution-tagged', 'all', 'manual'],
  columns: ['2', '3', '4'],
};

function ImageField({ value, onChange, solutionId, label, recommendation }: { value: string; onChange: (value: string) => void; solutionId: string; label: string; recommendation: string }) {
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
    <p className="builder-media-guidance">{recommendation}</p>
    <div className="flex gap-2 mt-2"><button type="button" onClick={() => setBrowsing(true)} className="builder-small-button"><ImageIcon size={13} />Library</button><label className="builder-small-button cursor-pointer"><Upload size={13} />{uploading ? 'Uploading…' : 'Upload'}<input aria-label={`Upload ${label}`} type="file" accept="image/jpeg,image/png,image/webp,image/gif" disabled={uploading} className="hidden" onChange={event => void upload(event.target.files?.[0])} /></label></div>
    {error && <p role="alert" className="text-xs text-red-600 mt-2">{error}</p>}
    <ImageBrowserModal isOpen={browsing} onClose={() => setBrowsing(false)} onSelect={onChange} currentUrl={value} solutionId={solutionId} />
  </div>;
}

export default function ContentInspector({ value, onChange, field = '', solutionId, sectionType, products = [], mediaLayout, mediaAspectRatio }: { value: unknown; onChange: (value: unknown) => void; field?: string; solutionId: string; sectionType?: SectionType; products?: BuilderProduct[]; mediaLayout?: string; mediaAspectRatio?: string }) {
  const id = useId();
  const label = field === 'backgroundImage' && sectionType === SectionType.HERO ? (mediaLayout === 'hero-split' ? 'Hero image' : mediaLayout === 'hero-video' ? 'Video cover image' : 'Background image') : labelFor(field);
  const options = field === 'layout' ? (sectionType === SectionType.HERO ? ['centered', 'hero-split', 'hero-video', 'hero-editorial', 'hero-faded'] : sectionType === SectionType.IMAGE ? ['contained', 'full-width', 'card', 'split-left', 'split-right'] : sectionType === SectionType.VIDEO ? ['contained', 'cinema', 'split-right'] : ['rich-text', 'faq', 'case-studies', 'resources', 'statistics', 'image-cards', 'overlay-cards', 'image-bento', 'split-stories', 'video-cards', 'table', 'faded-image-cards', 'image-banner']) : field === 'theme' && sectionType === SectionType.CUSTOM ? ['light', 'soft', 'dark'] : selectOptions[field];
  if (field === 'productIds' && Array.isArray(value)) return <div className="builder-field"><label>Choose products ({value.length}/12)</label><p className="text-xs text-slate-400 mb-3">Each card opens the selected product’s detail page.</p>{products.length ? <div className="max-h-80 overflow-auto space-y-2">{products.map(product => <label key={product.id} className="flex gap-2 items-start p-3 rounded-lg border border-slate-200 text-xs"><input type="checkbox" checked={value.includes(product.id)} disabled={!value.includes(product.id) && value.length >= 12} onChange={event => onChange(event.target.checked ? [...value, product.id] : value.filter(id => id !== product.id))} /><span>{product.name}</span></label>)}</div> : <p className="p-3 bg-amber-50 text-xs text-amber-800 rounded-lg">Create a published product in the Products dashboard first. This section shows sample cards until a real product is available.</p>}</div>;
  if (sectionType === SectionType.HERO && (field === 'mediaCards' && mediaLayout !== 'hero-editorial' || field === 'videoUrl' && mediaLayout !== 'hero-video' || field === 'backgroundImage' && mediaLayout === 'hero-editorial')) return null;
  if (sectionType === SectionType.CUSTOM && (field === 'columns' && ['faq', 'rich-text', 'split-stories'].includes(mediaLayout || '') || field === 'mediaRatio' && ['faq', 'rich-text', 'statistics', 'resources', 'video-cards'].includes(mediaLayout || ''))) return null;
  if (field === 'videoUrl') return <div className="builder-field"><label htmlFor={id}>Video URL</label><input id={id} value={typeof value === 'string' ? value : ''} placeholder={mediaLayout === 'hero-video' ? 'https://…/background.mp4' : 'YouTube, Vimeo, or a hosted MP4/WebM'} onChange={event => onChange(event.target.value)} /><p className="builder-media-guidance">{mediaLayout === 'hero-video' ? 'Hosted MP4 or WebM · 16:9 · 1920 × 1080 px. Use a short, muted loop; visitors can pause it. YouTube and Vimeo work in Video or Video cards.' : '16:9 landscape video. Add a 1600 × 900 px cover image. Leave the URL blank to show a neutral video box.'}</p></div>;
  if (field === 'id' || field === 'rawData' || field === '_design') return null;
  if (Array.isArray(value)) {
    const limit = arrayLimits[field] || 20;
    return <div className="builder-array"><p className="text-[10px] text-slate-400 leading-4 mb-3">Move items up or down to change their order. Cards wrap automatically; mobile follows this order.</p>
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
        <ContentInspector field={typeof item === 'string' ? 'text' : ''} value={item} solutionId={solutionId} sectionType={sectionType} products={products} mediaLayout={mediaLayout} mediaAspectRatio={mediaAspectRatio} onChange={next => onChange(value.map((existing, position) => position === index ? next : existing))} />
      </div>)}
    </div>;
  }
  if (value && typeof value === 'object') return <div>{Object.entries(value).filter(([key]) => { const layout = 'layout' in value ? value.layout : undefined; if (key === 'entries') return !['rich-text', 'table', 'image-banner'].includes(String(layout)); if (key.startsWith('table')) return layout === 'table'; if ('layout' in value && sectionType === SectionType.CUSTOM && ['backgroundImage', 'imageAlt', 'overlayStyle', 'buttonText', 'buttonLink'].includes(key)) return layout === 'image-banner'; return true; }).map(([key, item]) => <ContentInspector key={key} field={key} value={item} solutionId={solutionId} sectionType={sectionType} products={products} mediaLayout={'layout' in value && typeof value.layout === 'string' ? value.layout : mediaLayout} mediaAspectRatio={'aspectRatio' in value && typeof value.aspectRatio === 'string' ? value.aspectRatio : 'mediaRatio' in value && typeof value.mediaRatio === 'string' ? value.mediaRatio : mediaAspectRatio} onChange={next => onChange({ ...value, [key]: next })} />)}</div>;
  if (typeof value === 'string') {
    if (sectionType && ['heading', 'title', 'description', 'subheading', 'bodyText', 'bodyHtml', 'quote', 'summary', 'solutionDetails', 'info', 'infoTitle', 'text'].includes(field)) return <RichTextEditor label={label} value={value} onChange={onChange} lists={!['heading', 'title', 'infoTitle', 'text'].includes(field)} />;
    if (['backgroundImage', 'image', 'secondaryImage', 'avatar', 'poster', 'imageUrl', 'posterUrl'].includes(field)) return <ImageField value={value} onChange={onChange} solutionId={solutionId} label={label} recommendation={imageRecommendation(field, sectionType, mediaLayout, mediaAspectRatio)} />;
    if (options) return <div className="builder-field"><label htmlFor={id}>{label}</label><select id={id} value={value} onChange={event => onChange(event.target.value)}>{options.map(option => <option key={option} value={option}>{optionLabels[option] || option}</option>)}</select></div>;
    const multiline = /description|body|subheading|summary|quote|details|text$/i.test(field) && !/button|cta/i.test(field);
    return <div className="builder-field"><label htmlFor={id}>{label}</label>{multiline ? <textarea id={id} value={value} rows={field === 'bodyHtml' ? 7 : 3} onChange={event => onChange(event.target.value)} /> : <input id={id} value={value} onChange={event => onChange(event.target.value)} />}{field === 'bodyHtml' && <p className="text-[10px] text-slate-400 mt-1">Safe HTML: paragraphs, lists, formatting, and links.</p>}</div>;
  }
  if (typeof value === 'number' && options) return <div className="builder-field"><label htmlFor={id}>{label}</label><select id={id} value={value} onChange={event => onChange(Number(event.target.value))}>{options.map(option => <option key={option} value={option}>{option}</option>)}</select></div>;
  if (typeof value === 'number' || value === null && ['value', 'secondaryValue'].includes(field)) return <div className="builder-field"><label htmlFor={id}>{label}</label><input id={id} type="number" value={value ?? ''} onChange={event => onChange(event.target.value === '' ? null : Number(event.target.value))} /></div>;
  if (typeof value === 'boolean') return <label className="flex gap-2 text-xs mb-4"><input type="checkbox" checked={value} onChange={event => onChange(event.target.checked)} />{label}</label>;
  return null;
}
