'use client';
import { useEffect, useId, useRef, useState } from 'react';
import { Bold, Italic, Underline, List, ListOrdered, Link2, Eraser, Strikethrough, ImagePlus, Upload } from 'lucide-react';
import { sanitizeContent } from '@/lib/utils/sanitize-content';
import { sanitizeBlogContent } from '@/lib/blog/content';
import { isSafeLink, isSafeMediaUrl } from '@/lib/utils/content-url';

const escapeText = (value: string) => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('\n', '<br>');
const htmlFor = (value: string, clean = sanitizeContent) => /<\/?[a-z][\s\S]*>/i.test(value) ? clean(value) : escapeText(value);

export default function RichTextEditor({ value, onChange, label, lists = true, headings = false }: { value: string; onChange: (value: string) => void; label: string; lists?: boolean; headings?: boolean }) {
  const clean = headings ? sanitizeBlogContent : sanitizeContent;
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);
  const savedRange = useRef<Range | null>(null);
  const [linkOpen, setLinkOpen] = useState(false);
  const [link, setLink] = useState('/contact');
  const [error, setError] = useState('');
  const [imageOpen, setImageOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState('');
  const [imageAlt, setImageAlt] = useState('');
  const [imageCaption, setImageCaption] = useState('');
  const [imageBusy, setImageBusy] = useState(false);
  const imageFile = useRef<HTMLInputElement>(null);
  const escapeAttribute = (text: string) => escapeText(text).replaceAll('"', '&quot;');
  async function uploadInlineImage(file?: File) {
    if (!file) return;
    if (!file.type.startsWith('image/')) { setError('Choose an image file.'); return; }
    setImageBusy(true); setError('');
    try {
      const data = new FormData(); data.append('file', file); data.append('folder', 'blogs');
      const response = await fetch('/api/admin/upload', { method: 'POST', body: data });
      const result = await response.json(); if (!response.ok) throw new Error(result.error || 'Image upload failed.');
      setImageSrc(result.url);
    } catch (error) { setError(error instanceof Error ? error.message : 'Image upload failed.'); }
    finally { setImageBusy(false); if (imageFile.current) imageFile.current.value = ''; }
  }
  function insertImage() {
    if (!isSafeMediaUrl(imageSrc)) { setError('Use a local image path or an HTTP(S) image URL.'); return; }
    if (!imageAlt.trim()) { setError('Add an image description for accessibility.'); return; }
    const caption = imageCaption.trim() ? `<figcaption>${escapeText(imageCaption.trim())}</figcaption>` : '';
    command('insertHTML', `<figure><img src="${escapeAttribute(imageSrc)}" alt="${escapeAttribute(imageAlt.trim())}" loading="lazy">${caption}</figure><p><br></p>`);
    setImageOpen(false); setImageSrc(''); setImageAlt(''); setImageCaption(''); setError('');
  }
  useEffect(() => {
    const editor = ref.current;
    if (editor && editor.ownerDocument.activeElement !== editor && editor.innerHTML !== htmlFor(value, clean)) editor.innerHTML = htmlFor(value, clean);
  }, [value, clean]);
  function remember() {
    const selection = window.getSelection();
    if (selection?.rangeCount && ref.current?.contains(selection.anchorNode)) savedRange.current = selection.getRangeAt(0).cloneRange();
  }
  function publish() {
    const editor = ref.current;
    if (!editor) return;
    // Browser formatting commands may create legacy <font> elements; persist safe spans instead.
    const clone = editor.cloneNode(true) as HTMLElement;
    clone.querySelectorAll('font').forEach(font => {
      const span = document.createElement('span');
      const color = font.getAttribute('color'); const size = font.getAttribute('size');
      if (color) span.style.color = color;
      if (size) span.style.fontSize = `${({ '1': 12, '2': 14, '3': 16, '4': 20, '5': 24, '6': 32, '7': 48 } as Record<string, number>)[size] || 16}px`;
      span.innerHTML = font.innerHTML; font.replaceWith(span);
    });
    onChange(editor.innerText.trim() || (headings && editor.querySelector('img')) ? clean(clone.innerHTML) : '');
    remember();
  }
  function command(name: string, argument?: string) {
    const editor = ref.current;
    if (!editor) return;
    editor.focus();
    const selection = window.getSelection();
    if (savedRange.current && editor.contains(savedRange.current.commonAncestorContainer)) { selection?.removeAllRanges(); selection?.addRange(savedRange.current); }
    document.execCommand(name, false, argument); publish();
  }
  const tools = [[Bold, 'bold', 'Bold'], [Italic, 'italic', 'Italic'], [Underline, 'underline', 'Underline'], [Strikethrough, 'strikeThrough', 'Strikethrough'], ...(lists ? [[List, 'insertUnorderedList', 'Bulleted list'], [ListOrdered, 'insertOrderedList', 'Numbered list']] : []), [Eraser, 'removeFormat', 'Clear formatting']] as const;
  return <div className="builder-field"><label id={`${id}-label`}>{label}</label>
    <div className="rich-editor-toolbar" aria-label={`${label} formatting`}>
      {headings && <select aria-label={`${label} paragraph style`} defaultValue="p" onFocus={remember} onChange={event => command('formatBlock', event.target.value)}><option value="p">Paragraph</option><option value="h2">Heading 2</option><option value="h3">Heading 3</option><option value="blockquote">Quote</option></select>}
      {tools.map(([Icon, action, name]) => { const ToolIcon = Icon as typeof Bold; return <button key={action as string} type="button" aria-label={`${name} ${label}`} title={name as string} onMouseDown={event => event.preventDefault()} onClick={() => command(action as string)}><ToolIcon size={13} /></button>; })}
      <button type="button" title="Insert link" aria-label={`Insert link in ${label}`} onMouseDown={event => event.preventDefault()} onClick={() => { remember(); setLinkOpen(!linkOpen); }}><Link2 size={13} /></button>
      {headings && <button type="button" title="Insert image" aria-label={`Insert image in ${label}`} onMouseDown={event => event.preventDefault()} onClick={() => { remember(); setImageOpen(!imageOpen); setError(''); }}><ImagePlus size={15}/></button>}
      <input aria-label={`${label} word color`} type="color" defaultValue="#2563eb" onFocus={remember} onChange={event => command('foreColor', event.target.value)} />
      <select aria-label={`${label} word size`} defaultValue="3" onFocus={remember} onChange={event => command('fontSize', event.target.value)}>{[['1','12'],['2','14'],['3','16'],['4','20'],['5','24'],['6','32'],['7','48']].map(([key,size]) => <option key={key} value={key}>{size}px</option>)}</select>
    </div>
    {linkOpen && <div className="flex gap-2 my-2"><input aria-label={`${label} link destination`} value={link} onChange={event => setLink(event.target.value)} /><button type="button" className="builder-small-button" onClick={() => { if (!isSafeLink(link)) { setError('Use a safe page path or web link.'); return; } command('createLink', link); setLinkOpen(false); setError(''); }}>Apply</button></div>}
    {headings && imageOpen && <div className="blog-inline-image-form" role="group" aria-label="Insert article image">
      <p>Add an image at the current cursor position.</p>
      <input ref={imageFile} type="file" accept="image/*" hidden onChange={event => void uploadInlineImage(event.target.files?.[0])}/>
      <button type="button" className="builder-small-button" disabled={imageBusy} onClick={() => imageFile.current?.click()}><Upload size={14}/>{imageBusy ? 'Uploading…' : 'Upload image'}</button>
      <label htmlFor={`${id}-image-src`}>Image URL</label><input id={`${id}-image-src`} value={imageSrc} placeholder="Or paste an image URL" onChange={event => setImageSrc(event.target.value)}/>
      <label htmlFor={`${id}-image-alt`}>Image description</label><input id={`${id}-image-alt`} value={imageAlt} onChange={event => setImageAlt(event.target.value)}/>
      <label htmlFor={`${id}-image-caption`}>Caption (optional)</label><input id={`${id}-image-caption`} value={imageCaption} onChange={event => setImageCaption(event.target.value)}/>
      <div><button type="button" className="builder-small-button" disabled={imageBusy} onClick={insertImage}>Insert image</button><button type="button" className="builder-small-button" onClick={() => { setImageOpen(false); setError(''); }}>Cancel</button></div>
    </div>}
    <div ref={ref} id={id} role="textbox" aria-labelledby={`${id}-label`} aria-multiline={lists} contentEditable suppressContentEditableWarning className="rich-editor-content rich-text" onInput={publish} onBlur={() => { publish(); }} onKeyUp={remember} onMouseUp={remember} onPaste={event => { event.preventDefault(); const text = event.clipboardData.getData('text/plain'); command('insertText', text); }} />
    {error && <p role="alert" className="text-xs text-red-600">{error}</p>}
  </div>;
}
