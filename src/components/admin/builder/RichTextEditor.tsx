'use client';
import { useEffect, useId, useRef, useState } from 'react';
import { Bold, Italic, Underline, List, ListOrdered, Link2, Eraser, Strikethrough } from 'lucide-react';
import { sanitizeContent } from '@/lib/utils/sanitize-content';
import { isSafeLink } from '@/lib/utils/content-url';

const escapeText = (value: string) => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('\n', '<br>');
const htmlFor = (value: string) => /<\/?[a-z][\s\S]*>/i.test(value) ? sanitizeContent(value) : escapeText(value);

export default function RichTextEditor({ value, onChange, label, lists = true }: { value: string; onChange: (value: string) => void; label: string; lists?: boolean }) {
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);
  const savedRange = useRef<Range | null>(null);
  const [linkOpen, setLinkOpen] = useState(false);
  const [link, setLink] = useState('/contact');
  const [error, setError] = useState('');
  useEffect(() => {
    const editor = ref.current;
    if (editor && editor.ownerDocument.activeElement !== editor && editor.innerHTML !== htmlFor(value)) editor.innerHTML = htmlFor(value);
  }, [value]);
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
    onChange(editor.innerText.trim() ? sanitizeContent(clone.innerHTML) : '');
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
      {tools.map(([Icon, action, name]) => { const ToolIcon = Icon as typeof Bold; return <button key={action as string} type="button" aria-label={`${name} ${label}`} title={name as string} onMouseDown={event => event.preventDefault()} onClick={() => command(action as string)}><ToolIcon size={13} /></button>; })}
      <button type="button" title="Insert link" aria-label={`Insert link in ${label}`} onMouseDown={event => event.preventDefault()} onClick={() => { remember(); setLinkOpen(!linkOpen); }}><Link2 size={13} /></button>
      <input aria-label={`${label} word color`} type="color" defaultValue="#2563eb" onFocus={remember} onChange={event => command('foreColor', event.target.value)} />
      <select aria-label={`${label} word size`} defaultValue="3" onFocus={remember} onChange={event => command('fontSize', event.target.value)}>{[['1','12'],['2','14'],['3','16'],['4','20'],['5','24'],['6','32'],['7','48']].map(([key,size]) => <option key={key} value={key}>{size}px</option>)}</select>
    </div>
    {linkOpen && <div className="flex gap-2 my-2"><input aria-label={`${label} link destination`} value={link} onChange={event => setLink(event.target.value)} /><button type="button" className="builder-small-button" onClick={() => { if (!isSafeLink(link)) { setError('Use a safe page path or web link.'); return; } command('createLink', link); setLinkOpen(false); setError(''); }}>Apply</button></div>}
    <div ref={ref} id={id} role="textbox" aria-labelledby={`${id}-label`} aria-multiline={lists} contentEditable suppressContentEditableWarning className="rich-editor-content rich-text" onInput={publish} onBlur={() => { publish(); }} onKeyUp={remember} onMouseUp={remember} onPaste={event => { event.preventDefault(); const text = event.clipboardData.getData('text/plain'); command('insertText', text); }} />
    {error && <p role="alert" className="text-xs text-red-600">{error}</p>}
  </div>;
}
