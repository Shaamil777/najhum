 'use client';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import { NodeSelection } from '@tiptap/pm/state';
import { Bold, Italic, Underline, List, ListOrdered, Quote, Minus, ImagePlus, Link2, Unlink, Undo2, Redo2, PanelLeft, X, Upload, Trash2 } from 'lucide-react';
import { articleExtensions } from './article-extensions';
import { sanitizeBlogContent } from '@/lib/blog/content';
import { isSafeLink, isSafeMediaUrl } from '@/lib/utils/content-url';

type Props = { value: string; onChange: (value: string) => void; onUploading?: (busy: boolean) => void; disabled?: boolean };
type ImageFields = { src: string; alt: string; caption: string };
export default function BlogComposer({ value, onChange, onUploading, disabled = false }: Props) {
  const emitted = useRef(value);
  const [outline, setOutline] = useState(false);
  const [panel, setPanel] = useState<'image' | 'link' | null>(null);
  const [image, setImage] = useState<ImageFields>({ src: '', alt: '', caption: '' });
  const [link, setLink] = useState('');
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);
  const imageTarget = useRef<{ from: number; to: number } | null>(null);
  const insertAt = useRef(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const fileInput = useRef<HTMLInputElement>(null);
  const editor = useEditor({
    extensions: articleExtensions, content: sanitizeBlogContent(value), immediatelyRender: false,
    shouldRerenderOnTransaction: true,
    editorProps: { attributes: { role: 'textbox', 'aria-label': 'Article content', 'aria-multiline': 'true', class: 'blog-document-content' },
      transformPastedHTML: sanitizeBlogContent,
      handleClickOn: (view, _pos, node, nodePos, event) => {
        if (event.target instanceof HTMLImageElement && ['articleFigure', 'image'].includes(node.type.name)) {
          view.dispatch(view.state.tr.setSelection(NodeSelection.create(view.state.doc, nodePos))); return true;
        }
        return false;
      } },
    onUpdate: ({ editor }) => { const html = sanitizeBlogContent(editor.getHTML()); emitted.current = html; onChange(html); },
  });
  useEffect(() => { if (editor && value !== emitted.current) { emitted.current = value; editor.commands.setContent(sanitizeBlogContent(value), { emitUpdate: false }); } }, [editor, value]);
  useEffect(() => { editor?.setEditable(!disabled && !uploading, false); }, [editor, disabled, uploading]);
  useEffect(() => { if (panel && dialog.current && !dialog.current.open) dialog.current.showModal(); }, [panel]);
  function closePanel() { if (uploading) return; dialog.current?.close(); setPanel(null); setError(''); editor?.commands.focus(); }
  function openImage() {
    if (!editor) return;
    const { selection } = editor.state;
    let target: { from: number; to: number } | null = null;
    let fields: ImageFields = { src: '', alt: '', caption: '' };
    const selected = selection instanceof NodeSelection ? selection.node : null;
    if (selected && (selected.type.name === 'image' || selected.type.name === 'articleFigure')) {
      target = { from: selection.from, to: selection.to }; fields = { src: selected.attrs.src || '', alt: selected.attrs.alt || '', caption: selected.textContent };
    } else {
      for (let depth = selection.$from.depth; depth > 0; depth--) {
        const node = selection.$from.node(depth);
        if (node.type.name === 'articleFigure') { const from = selection.$from.before(depth); target = { from, to: from + node.nodeSize }; fields = { src: node.attrs.src || '', alt: node.attrs.alt || '', caption: node.textContent }; break; }
      }
    }
    imageTarget.current = target; insertAt.current = selection.from; setImage(fields); setError(''); setPanel('image');
  }
  function applyImage(event: FormEvent) {
    event.preventDefault(); if (!editor) return;
    if (!isSafeMediaUrl(image.src)) { setError('Upload an image or enter a valid image URL.'); return; }
    if (!image.alt.trim()) { setError('Describe the image for readers using assistive technology.'); return; }
    const figure = { type: 'articleFigure', attrs: { src: image.src, alt: image.alt.trim() }, content: image.caption ? [{ type: 'text', text: image.caption }] : [] };
    if (imageTarget.current) editor.chain().focus().insertContentAt(imageTarget.current, figure).run();
    else editor.chain().focus().insertContentAt(insertAt.current, [figure, { type: 'paragraph' }]).run();
    closePanel();
  }
  function applyLink(event: FormEvent) {
    event.preventDefault(); if (!editor) return;
    if (!isSafeLink(link)) { setError('Enter a page path, section anchor, or valid web link.'); return; }
    const chain = editor.chain().focus().extendMarkRange('link');
    if (editor.state.selection.empty && !editor.isActive('link')) chain.insertContent({ type: 'text', text: link, marks: [{ type: 'link', attrs: { href: link } }] }).run();
    else chain.setLink({ href: link }).run();
    closePanel();
  }
  async function upload(file?: File) {
    if (!file) return;
    if (!file.type.startsWith('image/')) { setError('Choose an image file.'); return; }
    setUploading(true); onUploading?.(true); setError('');
    try { const body = new FormData(); body.append('file', file); body.append('folder', 'blogs');
      const response = await fetch('/api/admin/upload', { method: 'POST', body }); const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Image upload failed.');
      setImage(current => ({ ...current, src: result.url }));
    } catch (error) { setError(error instanceof Error ? error.message : 'Upload failed.'); }
    finally { setUploading(false); onUploading?.(false); if (fileInput.current) fileInput.current.value = ''; }
  }
  if (!editor) return <p className="blog-admin-help" role="status">Opening your writing canvas…</p>;
  const locked = disabled || uploading;
  const headings: { text: string; pos: number; level: number }[] = [];
  editor.state.doc.descendants((node, pos) => { if (node.type.name === 'heading') headings.push({ text: node.textContent, pos, level: node.attrs.level }); });
  const words = editor.getText().split(/\s+/).filter(Boolean).length;
  const style = editor.isActive('heading') ? `h${editor.getAttributes('heading').level}` : 'p';
  const tools = [
    { label: 'Bold', icon: Bold, active: editor.isActive('bold'), run: () => editor.chain().focus().toggleBold().run() },
    { label: 'Italic', icon: Italic, active: editor.isActive('italic'), run: () => editor.chain().focus().toggleItalic().run() },
    { label: 'Underline', icon: Underline, active: editor.isActive('underline'), run: () => editor.chain().focus().toggleUnderline().run() },
    { label: 'Bullet list', icon: List, active: editor.isActive('bulletList'), run: () => editor.chain().focus().toggleBulletList().run() },
    { label: 'Numbered list', icon: ListOrdered, active: editor.isActive('orderedList'), run: () => editor.chain().focus().toggleOrderedList().run() },
    { label: 'Quote', icon: Quote, active: editor.isActive('blockquote'), run: () => editor.chain().focus().toggleBlockquote().run() },
  ];
  return <div className="blog-document">
    <div className="blog-document-toolbar" role="group" aria-label="Article formatting">
      <button type="button" aria-label="Undo" title="Undo (Ctrl/Cmd+Z)" disabled={locked || !editor.can().undo()} onClick={() => editor.chain().focus().undo().run()}><Undo2 size={17}/></button>
      <button type="button" aria-label="Redo" title="Redo (Ctrl/Cmd+Shift+Z)" disabled={locked || !editor.can().redo()} onClick={() => editor.chain().focus().redo().run()}><Redo2 size={17}/></button>
      <span className="blog-toolbar-separator"/>
      <select aria-label="Text style" disabled={locked} value={style} onChange={event => { if (event.target.value === 'p') editor.chain().focus().setParagraph().run(); else editor.chain().focus().setHeading({ level: Number(event.target.value.slice(1)) as 2 | 3 | 4 }).run(); }}><option value="p">Paragraph</option><option value="h2">Heading 2</option><option value="h3">Heading 3</option><option value="h4">Heading 4</option></select>
      {tools.map(({ label, icon: Icon, active, run }) => <button key={label} type="button" title={label} aria-label={label} aria-pressed={active} disabled={locked} onMouseDown={event => event.preventDefault()} onClick={run}><Icon size={17}/></button>)}
      <span className="blog-toolbar-separator"/>
      <button type="button" aria-label="Insert or edit link" title="Insert or edit link" aria-pressed={editor.isActive('link')} disabled={locked} onClick={() => { setLink(editor.getAttributes('link').href || ''); setError(''); setPanel('link'); }}><Link2 size={17}/></button>
      <button type="button" aria-label="Insert or edit image" title="Insert or edit image" disabled={locked} onClick={openImage}><ImagePlus size={17}/><span>{editor.isActive('articleFigure') || editor.isActive('image') ? 'Edit image' : 'Image'}</span></button>
      <button type="button" aria-label="Insert divider" title="Insert divider" disabled={locked} onClick={() => editor.chain().focus().setHorizontalRule().run()}><Minus size={17}/></button>
      <button type="button" className="blog-outline-toggle" aria-label="Toggle article outline" title="Article outline" aria-pressed={outline} onClick={() => setOutline(!outline)}><PanelLeft size={17}/></button>
    </div>
    <div className={`blog-document-layout ${outline ? 'with-outline' : ''}`}>
      {outline && <aside className="blog-document-outline" aria-label="Article outline"><strong>On this page</strong><p>Headings create your table of contents automatically.</p>{headings.length ? <ol>{headings.map(heading => <li key={heading.pos} className={heading.level > 2 ? 'subheading' : ''}><button type="button" disabled={locked} onClick={() => editor.chain().focus().setTextSelection(heading.pos + 1).scrollIntoView().run()}>{heading.text || 'Untitled heading'}</button></li>)}</ol> : <p>Add a heading using the text style menu.</p>}</aside>}
      <EditorContent editor={editor}/>
    </div>
    <footer className="blog-document-footer"><span>{words} {words === 1 ? 'word' : 'words'} · {Math.max(1, Math.ceil(words / 220))} min read</span><span>Write directly here. Use the toolbar to format text or add an image.</span></footer>
    {panel && <dialog ref={dialog} className="blog-insert-dialog" aria-labelledby="blog-insert-title" onCancel={event => { event.preventDefault(); closePanel(); }} onClick={event => { if (event.target === event.currentTarget) closePanel(); }}>
      <form onSubmit={panel === 'image' ? applyImage : applyLink}><header><div><span className="blog-admin-eyebrow">{panel === 'image' ? 'Article image' : 'Article link'}</span><h2 id="blog-insert-title">{panel === 'image' ? imageTarget.current ? 'Edit image' : 'Add an image' : 'Add or edit a link'}</h2></div><button type="button" className="blog-admin-button" aria-label="Close dialog" disabled={uploading} onClick={closePanel}><X size={17}/></button></header>
      {panel === 'image' ? <><input ref={fileInput} hidden type="file" accept="image/*" onChange={event => void upload(event.target.files?.[0])}/>{image.src && <img className="blog-insert-image-preview" src={image.src} alt={image.alt || 'Image preview'}/>}<button type="button" className="blog-admin-button" disabled={uploading} onClick={() => fileInput.current?.click()}><Upload size={16}/>{uploading ? 'Uploading…' : 'Upload image'}</button><div className="blog-field"><label htmlFor="document-image-url">Or use an image URL</label><input id="document-image-url" type="text" value={image.src} disabled={uploading} onChange={event => setImage({ ...image, src: event.target.value })}/></div><div className="blog-field"><label htmlFor="document-image-alt">Image description (alt text)</label><input id="document-image-alt" type="text" value={image.alt} disabled={uploading} onChange={event => setImage({ ...image, alt: event.target.value })}/></div><div className="blog-field"><label htmlFor="document-image-caption">Caption (optional)</label><input id="document-image-caption" type="text" value={image.caption} disabled={uploading} onChange={event => setImage({ ...image, caption: event.target.value })}/><small>You can also edit the caption directly below the image.</small></div></> : <div className="blog-field"><label htmlFor="document-link-url">Link destination</label><input id="document-link-url" type="text" value={link} placeholder="https://example.com or /contact" onChange={event => setLink(event.target.value)}/></div>}
      {error && <p className="blog-admin-notice error" role="alert">{error}</p>}
      <footer>{panel === 'image' && imageTarget.current && <button type="button" className="blog-admin-button danger" disabled={uploading} onClick={() => { editor.chain().focus().deleteRange(imageTarget.current!).run(); closePanel(); }}><Trash2 size={15}/>Remove image</button>}{panel === 'link' && editor.isActive('link') && <button type="button" className="blog-admin-button" onClick={() => { editor.chain().focus().extendMarkRange('link').unsetLink().run(); closePanel(); }}><Unlink size={15}/>Remove link</button>}<button type="button" className="blog-admin-button" disabled={uploading} onClick={closePanel}>Cancel</button><button type="submit" className="blog-admin-button primary" disabled={uploading}>{panel === 'image' ? imageTarget.current ? 'Update image' : 'Insert image' : 'Apply link'}</button></footer>
      </form></dialog>}
  </div>;
}
