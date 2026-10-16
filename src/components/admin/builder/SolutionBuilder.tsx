'use client';

import { useCallback, useEffect, useLayoutEffect, useReducer, useRef, useState, type DragEvent, type PointerEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { ArrowDown, ArrowLeft, ArrowUp, Check, ChevronRight, Copy, Eye, EyeOff, Globe, GripVertical, Layers, LayoutTemplate, Loader2, Monitor, Plus, Redo2, Save, Settings2, Smartphone, Tablet, Trash2, Undo2, X } from 'lucide-react';
import { builderDocumentSchema, sectionTitle, type BuilderDocument, type BuilderSection, type BuilderSession } from '@/lib/builder/document';
import { editableContent, makeSection, makeTemplate, makePreset, sectionLabel, sectionPresets, sectionLibrary, type SectionPresetId, type PageTemplateId } from '@/lib/builder/catalog';
import { SectionType } from '@/types/section';
import SolutionSection from '@/components/solutions/SolutionSection';
import ContentInspector from './ContentInspector';
import DesignInspector from './DesignInspector';
import PreviewFrame from './PreviewFrame';
import SectionPreviewModal from './SectionPreviewModal';
import TemplateGallery from './TemplateGallery';
import './builder.css';

type History = { document: BuilderDocument; past: BuilderDocument[]; future: BuilderDocument[] };
type Action = { type: 'change' | 'reset'; document: BuilderDocument } | { type: 'undo' | 'redo' };
function historyReducer(state: History, action: Action): History {
  if (action.type === 'reset') return { document: action.document, past: [], future: [] };
  if (action.type === 'change') return { document: action.document, past: [...state.past.slice(-79), state.document], future: [] };
  if (action.type === 'undo' && state.past.length) return { document: state.past[state.past.length - 1], past: state.past.slice(0, -1), future: [state.document, ...state.future] };
  if (action.type === 'redo' && state.future.length) return { document: state.future[0], past: [...state.past, state.document], future: state.future.slice(1) };
  return state;
}
const dragType = 'application/x-najhum-section';

export default function SolutionBuilder({ solutionId, initialSession, localPreview = false }: { solutionId: string; initialSession: BuilderSession; localPreview?: boolean }) {
  const router = useRouter();
  const [session, setSession] = useState(initialSession);
  const [history, dispatch] = useReducer(historyReducer, { document: initialSession.document, past: [], future: [] });
  const doc = history.document;
  const docRef = useRef(doc);
  useLayoutEffect(() => { docRef.current = doc; }, [doc]);
  const [saved, setSaved] = useState(JSON.stringify(initialSession.document));
  const [selectedId, setSelectedId] = useState<string | null>(initialSession.document.sections[0]?.id || null);
  const [leftTab, setLeftTab] = useState<'sections' | 'library'>('sections');
  const [rightTab, setRightTab] = useState<'content' | 'design' | 'page'>('content');
  const [search, setSearch] = useState('');
  const [libraryPreview, setLibraryPreview] = useState<SectionType | SectionPresetId | null>(null);
  const [templateGallery, setTemplateGallery] = useState(false);
  const [width, setWidth] = useState(1280);
  const [preview, setPreview] = useState(false);
  const [busy, setBusy] = useState(false);
  const inFlight = useRef(false);
  const [autosave, setAutosave] = useState(true);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [insertAt, setInsertAt] = useState<number | null>(null);
  const [dropAt, setDropAt] = useState<number | null>(null);
  const pointerDrag = useRef<{ data: { kind: 'new' | 'move'; type?: SectionType | SectionPresetId; id?: string }; start: { x: number; y: number }; moved: boolean; index: number | null } | null>(null);
  const [dragLabel, setDragLabel] = useState<{ x: number; y: number } | null>(null);
  const [confirm, setConfirm] = useState<'discard' | 'publish' | 'unpublish' | 'delete' | null>(null);
  const confirmRef = useRef<HTMLDialogElement>(null);
  useEffect(() => { if (confirm && confirmRef.current && !confirmRef.current.open) confirmRef.current.showModal(); }, [confirm]);
  const selected = doc.sections.find(section => section.id === selectedId);
  const dirty = JSON.stringify(doc) !== saved;
  const validation = builderDocumentSchema.safeParse(doc);
  const errors = validation.success ? [] : validation.error.issues.map(issue => `${issue.path.map(part => typeof part === 'number' ? part + 1 : part).join(' › ')}: ${issue.message}`);

  function change(next: BuilderDocument) { if (JSON.stringify(next) === JSON.stringify(docRef.current)) return; dispatch({ type: 'change', document: next }); setError(''); setMessage(''); }
  function patchSection(id: string, patch: Partial<BuilderSection>) { change({ ...docRef.current, sections: docRef.current.sections.map(section => section.id === id ? { ...section, ...patch } : section) }); }
  function insert(type: SectionType | SectionPresetId, index = insertAt ?? doc.sections.length) {
    if (doc.sections.length >= 60) { setError('A page can contain at most 60 sections.'); return; }
    const section = sectionPresets.some(item => item.id === type) ? makePreset(type as SectionPresetId) : makeSection(type as SectionType, session.availableProducts || []); const sections = [...doc.sections]; sections.splice(index, 0, section);
    change({ ...doc, sections }); setSelectedId(section.id); setRightTab('content'); setLeftTab('sections'); setInsertAt(null);
  }
  function applyTemplate(kind: PageTemplateId, mode: 'replace' | 'append') {
    const sections = makeTemplate(kind, session.availableProducts || []);
    const next = mode === 'append' ? [...doc.sections, ...sections] : sections;
    if (next.length > 60) { setError('A page can contain at most 60 sections. Remove sections or replace the page.'); return; }
    change({ ...doc, sections: next }); setSelectedId(sections[0].id); setRightTab('content'); setLeftTab('sections'); setTemplateGallery(false);
  }
  function move(id: string, index: number) {
    const sections = [...doc.sections]; const from = sections.findIndex(section => section.id === id);
    if (from < 0 || from === index) return;
    const [section] = sections.splice(from, 1); sections.splice(Math.max(0, index), 0, section);
    change({ ...doc, sections });
  }
  function drop(event: DragEvent, index: number) {
    event.preventDefault(); event.stopPropagation(); setDropAt(null);
    try {
      const data = JSON.parse(event.dataTransfer.getData(dragType));
      if (data.kind === 'new' && (sectionLibrary.some(item => item.type === data.type) || sectionPresets.some(item => item.id === data.type))) insert(data.type, index);
      if (data.kind === 'move' && typeof data.id === 'string') {
        const from = doc.sections.findIndex(section => section.id === data.id);
        move(data.id, from < index ? index - 1 : index);
      }
    } catch { /* Ignore drops from outside the editor. */ }
  }
  function drag(event: DragEvent, data: unknown) { event.dataTransfer.setData(dragType, JSON.stringify(data)); event.dataTransfer.effectAllowed = 'copyMove'; }
  // Pointer capture keeps dragging reliable across the iframe and supports touch input.
  function hostPoint(event: PointerEvent) {
    const sourceFrame = (event.target as HTMLElement).ownerDocument.defaultView?.frameElement as HTMLIFrameElement | null;
    if (!sourceFrame) return { x: event.clientX, y: event.clientY };
    const rect = sourceFrame.getBoundingClientRect(); const scale = rect.width / sourceFrame.clientWidth;
    return { x: rect.left + event.clientX * scale, y: rect.top + event.clientY * scale };
  }
  function pointerStart(event: PointerEvent<HTMLElement>, data: { kind: 'new' | 'move'; type?: SectionType | SectionPresetId; id?: string }) {
    if (event.button !== 0) return;
    event.preventDefault(); event.stopPropagation(); event.currentTarget.setPointerCapture(event.pointerId);
    pointerDrag.current = { data, start: hostPoint(event), moved: false, index: null };
  }
  function pointerMove(event: PointerEvent) {
    const active = pointerDrag.current;
    if (!active) return;
    const point = hostPoint(event);
    if (!active.moved && Math.hypot(point.x - active.start.x, point.y - active.start.y) < 5) return;
    active.moved = true; setDragLabel(point);
    let hit = document.elementFromPoint(point.x, point.y);
    let targetY = point.y;
    if (hit instanceof HTMLIFrameElement) {
      const rect = hit.getBoundingClientRect(); const scale = rect.width / hit.clientWidth;
      targetY = (point.y - rect.top) / scale;
      hit = hit.contentDocument?.elementFromPoint((point.x - rect.left) / scale, targetY) || null;
    }
    const zone = hit?.closest('[data-builder-drop-index]');
    const block = hit?.closest('[data-builder-index]');
    let index: number | null = null;
    if (zone) index = Number(zone.getAttribute('data-builder-drop-index'));
    else if (block) { const rect = block.getBoundingClientRect(); index = Number(block.getAttribute('data-builder-index')) + (targetY > rect.top + rect.height / 2 ? 1 : 0); }
    active.index = index; setDropAt(index);
  }
  function pointerEnd(event: PointerEvent) {
    const active = pointerDrag.current;
    pointerDrag.current = null; setDragLabel(null); setDropAt(null);
    if (!active?.moved || active.index === null) return;
    event.preventDefault();
    if (active.data.kind === 'new' && active.data.type) insert(active.data.type, active.index);
    else if (active.data.id) {
      const from = doc.sections.findIndex(section => section.id === active.data.id);
      move(active.data.id, from < active.index ? active.index - 1 : active.index);
    }
  }
  function duplicate(section: BuilderSection) {
    if (doc.sections.length >= 60) return;
    const next = { ...structuredClone(section), id: crypto.randomUUID() }; const sections = [...doc.sections];
    sections.splice(sections.findIndex(item => item.id === section.id) + 1, 0, next);
    change({ ...doc, sections }); setSelectedId(next.id);
  }
  function remove(id: string) {
    const index = doc.sections.findIndex(section => section.id === id); const sections = doc.sections.filter(section => section.id !== id);
    change({ ...doc, sections }); setSelectedId(sections[Math.min(index, sections.length - 1)]?.id || null);
  }

  const persist = useCallback(async (action: 'save' | 'publish' | 'unpublish' = 'save') => {
    if (inFlight.current) return;
    const snapshot = docRef.current;
    const parsed = builderDocumentSchema.safeParse(snapshot);
    if (!parsed.success) { setError('Complete the highlighted fields before saving.'); return; }
    inFlight.current = true; setBusy(true); setError('');
    try {
      let next: BuilderSession;
      if (localPreview) {
        next = { ...session, document: parsed.data, version: session.version + 1, isPublished: action === 'publish' ? true : action === 'unpublish' ? false : session.isPublished, hasDraft: true };
        localStorage.setItem('najhum-builder-local-preview', JSON.stringify(next));
      } else {
        const response = await fetch(`/api/admin/solutions/${solutionId}/builder`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ document: snapshot, version: session.version, baseRevision: session.baseRevision, action }) });
        const result = await response.json();
        if (!response.ok) throw new Error(result.details?.map((detail: { field: string; message: string }) => `${detail.field}: ${detail.message}`).join('; ') || result.error || 'Could not save this page.');
        next = result;
      }
      setSession(next);
      // Compare the editor snapshot, not the normalized response. Never replace typing made during a request.
      setSaved(JSON.stringify(snapshot));
      setMessage(action === 'publish' ? (localPreview ? 'Published in this local preview.' : 'Your solution page is published.') : action === 'unpublish' ? 'Solution unpublished.' : 'Draft saved.');
    } catch (err) { setError(err instanceof Error ? err.message : 'Could not save this page.'); }
    finally { inFlight.current = false; setBusy(false); }
  }, [session, solutionId, localPreview]);

  useEffect(() => {
    if (!autosave || !dirty || busy || error || !validation.success || confirm || templateGallery) return;
    const timeout = setTimeout(() => void persist(), 1600);
    return () => clearTimeout(timeout);
  }, [autosave, dirty, busy, error, doc, persist, validation.success, confirm, templateGallery]);
  useEffect(() => {
    function warn(event: BeforeUnloadEvent) { if (dirty || inFlight.current) { event.preventDefault(); event.returnValue = ''; } }
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [dirty]);
  useEffect(() => {
    function shortcuts(event: KeyboardEvent) {
      if (!(event.ctrlKey || event.metaKey)) return;
      if (event.key.toLowerCase() === 's') { event.preventDefault(); void persist(); }
      const typing = (event.target as HTMLElement).closest('input,textarea,[contenteditable="true"]');
      if (typing) return;
      if (event.key.toLowerCase() === 'z') { event.preventDefault(); dispatch({ type: event.shiftKey ? 'redo' : 'undo' }); }
    }
    window.addEventListener('keydown', shortcuts); return () => window.removeEventListener('keydown', shortcuts);
  }, [persist]);

  async function discard() {
    if (inFlight.current) return;
    inFlight.current = true; setBusy(true); setError('');
    try {
      let next = initialSession;
      if (localPreview) localStorage.removeItem('najhum-builder-local-preview');
      else {
        const response = await fetch(`/api/admin/solutions/${solutionId}/builder`, { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ version: session.version }) });
        const result = await response.json(); if (!response.ok) throw new Error(result.error); next = result;
      }
      setSession(next); dispatch({ type: 'reset', document: next.document }); setSaved(JSON.stringify(next.document)); setSelectedId(next.document.sections[0]?.id || null); setMessage('Draft discarded. Current published content loaded.');
    } catch (err) { setError(err instanceof Error ? err.message : 'Could not discard the draft.'); }
    finally { inFlight.current = false; setBusy(false); }
  }

  async function deleteCurrentSolution() {
    if (inFlight.current) return;
    inFlight.current = true; setBusy(true); setError('');
    try {
      if (localPreview) {
        localStorage.removeItem('najhum-builder-local-preview');
        toast.success('Preview solution deleted');
        router.push('/admin/solutions');
        return;
      }
      const response = await fetch(`/api/admin/solutions/${solutionId}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (!response.ok) {
        const result = await response.json().catch(() => null);
        throw new Error(result?.error || 'Failed to delete solution');
      }
      toast.success('Solution deleted successfully');
      router.push('/admin/solutions');
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Could not delete the solution.';
      setError(msg);
      toast.error(msg);
    } finally {
      inFlight.current = false; setBusy(false);
    }
  }

  function addHere(index: number) { setInsertAt(index); setLeftTab('library'); }
  function renderDropZone(index: number) {
    // The ref-backed drop function is invoked only by this event handler, never during rendering.
    // eslint-disable-next-line react-hooks/refs
    return <div data-builder-drop-index={index} className={`builder-drop-zone ${dropAt === index ? 'is-over' : ''}`} onDragOver={event => { if (event.dataTransfer.types.includes(dragType)) { event.preventDefault(); setDropAt(index); } }} onDragLeave={() => setDropAt(null)} onDrop={event => drop(event, index)}><button type="button" aria-label={`Insert section at position ${index + 1}`} onClick={() => addHere(index)}><Plus size={12} />Add section here</button></div>;
  }

  return <div className="solution-builder" onPointerMove={pointerMove} onPointerUp={pointerEnd} onPointerCancel={() => { pointerDrag.current = null; setDragLabel(null); setDropAt(null); }}>
    <header className="builder-toolbar">
      <div className="flex items-center gap-3 min-w-0"><Link href="/admin/solutions" onClick={event => { if (dirty && !window.confirm('You have unsaved changes. Leave the builder?')) event.preventDefault(); }} className="builder-icon-button" aria-label="Back to solutions"><ArrowLeft size={18} /></Link><div className="min-w-0"><h1 className="!text-sm !font-semibold !normal-case truncate !m-0">{doc.title || 'Untitled solution'}</h1><div className="text-[10px] text-slate-400 mt-1 flex gap-2 items-center"><span className={session.isPublished ? 'text-emerald-600' : 'text-amber-600'}>{session.isPublished ? 'Published' : 'Draft'}</span><span>·</span><span role="status">{busy ? 'Saving…' : dirty ? 'Unsaved changes' : 'All changes saved'}</span></div></div></div>
      <div className="flex items-center gap-1"><button className="builder-icon-button" aria-label="Undo" title="Undo" disabled={!history.past.length} onClick={() => dispatch({ type: 'undo' })}><Undo2 size={17} /></button><button className="builder-icon-button" aria-label="Redo" title="Redo" disabled={!history.future.length} onClick={() => dispatch({ type: 'redo' })}><Redo2 size={17} /></button><span className="builder-toolbar-divider" />{[[1280, Monitor, 'Desktop'], [768, Tablet, 'Tablet'], [390, Smartphone, 'Mobile']].map(([size, Icon, label]) => {
        const DeviceIcon = Icon as typeof Monitor;
        return <button key={size as number} className={`builder-icon-button ${width === size ? 'active' : ''}`} aria-label={`${label} preview`} aria-pressed={width === size} title={`${label} preview`} onClick={() => setWidth(size as number)}><DeviceIcon size={17} /></button>;
      })}</div>
      <div className="flex gap-2 items-center"><button className={`builder-small-button ${preview ? 'active' : ''}`} onClick={() => setPreview(!preview)}><Eye size={15} />{preview ? 'Back to editing' : 'Preview'}</button><button className="builder-small-button" disabled={busy || !dirty || !validation.success} onClick={() => void persist()}><Save size={15} />Save draft</button><button className="builder-primary-button" disabled={busy || !validation.success || !doc.sections.some(section => !section.isDraft)} onClick={() => setConfirm('publish')}>{busy ? <Loader2 size={15} className="animate-spin" /> : <Globe size={15} />}Publish</button><span className="builder-toolbar-divider" /><button className="builder-icon-button text-red-500 hover:text-red-700 hover:bg-red-50" disabled={busy} title="Delete solution" aria-label="Delete solution" onClick={() => setConfirm('delete')}><Trash2 size={16} /></button></div>
    </header>
    {localPreview && <div className="builder-preview-notice">Local builder preview · saves stay in this browser · the live website is untouched</div>}
    {(error || message) && <div className={`builder-alert ${error ? 'is-error' : ''}`} role={error ? 'alert' : 'status'}><span>{error || message}</span><button aria-label="Dismiss notification" onClick={() => { setError(''); setMessage(''); }}><X size={14} /></button></div>}
    <div className={`builder-workspace ${preview ? 'preview-mode' : ''}`}>
      {!preview && <aside className="builder-left-panel">
        <div className="builder-panel-tabs"><button className={leftTab === 'sections' ? 'active' : ''} onClick={() => setLeftTab('sections')}><Layers size={14} />Page outline</button><button className={leftTab === 'library' ? 'active' : ''} onClick={() => setLeftTab('library')}><Plus size={14} />Add sections</button></div>
        <div className="builder-panel-scroll">
          {leftTab === 'sections' ? <>
            <div className="builder-panel-heading">SECTIONS <span>{doc.sections.length}</span></div>
            <p className="text-[11px] text-slate-400 leading-5 mb-4">Drag to arrange your page. Select a section to edit its content.</p>
            <div onDragOver={event => event.preventDefault()} onDrop={event => drop(event, doc.sections.length)}>
              {doc.sections.map((section, index) => <div key={section.id} data-builder-index={index} className={`builder-outline-item ${selectedId === section.id ? 'active' : ''}`} draggable onDragStart={event => drag(event, { kind: 'move', id: section.id })} onDragOver={event => { event.preventDefault(); event.stopPropagation(); setDropAt(index); }} onDrop={event => drop(event, index)}>
                <button className="builder-outline-select" onClick={() => { setSelectedId(section.id); setRightTab('content'); }}><span title="Drag to reorder" style={{ touchAction: 'none' }} onPointerDown={event => pointerStart(event, { kind: 'move', id: section.id })}><GripVertical size={14} className="text-slate-400 shrink-0" /></span><span className="min-w-0 flex-1"><span className="block text-[10px] text-slate-400 uppercase mb-1">{sectionLabel(section)}</span><span className="block truncate text-xs font-medium">{sectionTitle(section)}</span></span>{section.isDraft && <EyeOff size={13} />}</button>
                <div className="builder-outline-actions"><button aria-label={`Move section ${index + 1} up`} disabled={index === 0} onClick={() => move(section.id, index - 1)}><ArrowUp size={12} /></button><button aria-label={`Move section ${index + 1} down`} disabled={index === doc.sections.length - 1} onClick={() => move(section.id, index + 1)}><ArrowDown size={12} /></button></div>
              </div>)}
              {!doc.sections.length && <div className="p-5 text-xs text-slate-400 border border-dashed rounded-lg">Your page is empty. Add a section or choose a template.</div>}
            </div>
            <button className="builder-add-button" onClick={() => addHere(doc.sections.length)}><Plus size={15} />Add section</button><button className="builder-small-button w-full mt-3" onClick={() => setTemplateGallery(true)}><LayoutTemplate size={15} />Choose a page template</button>
            <div className="mt-8 border-t border-slate-100 pt-5"><button className={`builder-small-button w-full ${rightTab === 'page' ? 'active' : ''}`} onClick={() => setRightTab('page')}><Settings2 size={14} />Page settings & SEO<ChevronRight size={13} className="ml-auto" /></button><label className="flex gap-2 text-[11px] text-slate-500 mt-5 items-center"><input type="checkbox" checked={autosave} onChange={event => setAutosave(event.target.checked)} />Autosave draft</label><p className="mt-2 text-[10px] text-slate-400 leading-4">Draft changes stay private until you publish.</p></div>
          </> : <>
            <div className="builder-panel-heading">SECTION LIBRARY</div><input className="builder-search" aria-label="Search sections" placeholder="Search sections…" value={search} onChange={event => setSearch(event.target.value)} />
            {insertAt !== null && <p className="text-[11px] text-primary my-3">Adding at position {insertAt + 1}</p>}
            {[...sectionLibrary.map(item => ({ ...item, key: item.type as SectionType | SectionPresetId })), ...sectionPresets.map(item => ({ ...item, type: 'type' in item ? item.type : SectionType.CUSTOM, key: item.id as SectionType | SectionPresetId }))].filter(item => `${item.label} ${item.description}`.toLowerCase().includes(search.toLowerCase())).map(item => <div key={item.key} className="builder-library-card" draggable onDragStart={event => drag(event, { kind: 'new', type: item.key })}><div className="builder-library-thumbnail" style={{ touchAction: 'none' }} onPointerDown={event => pointerStart(event, { kind: 'new', type: item.key })}><span>{item.mark}</span><div><i /><i /><i /></div></div><div className="flex items-center justify-between gap-2"><div><h3>{item.label}</h3><p>{item.description}</p></div><button aria-label={`Preview ${item.label} section`} className="builder-small-button !p-1.5" onPointerDown={event => event.stopPropagation()} onClick={() => setLibraryPreview(item.key)}><Eye size={14} /></button><button aria-label={`Add ${item.label} section`} title={`Add ${item.label}`} className="builder-icon-button" onClick={() => insert(item.key)}><Plus size={16} /></button></div></div>)}
          </>}
        </div>
      </aside>}
      <section className="builder-center" aria-label="Page canvas">
        <PreviewFrame width={width} editing={!preview} selectedId={selectedId}>
          {!doc.sections.length ? <div className="builder-empty-canvas"><LayoutTemplate size={42} /><h2>Start with your story.</h2><p>Add sections to create your solution page, or start with a template.</p><div className="flex gap-3 justify-center flex-wrap"><button className="builder-primary-button" onClick={() => setTemplateGallery(true)}><LayoutTemplate size={16} />Choose a page template</button><button className="builder-small-button" onClick={() => addHere(0)}>Add individual sections</button></div></div> : <>
            {!preview && renderDropZone(0)}
            {doc.sections.map((section, index) => <div key={section.id}>
              {preview ? !section.isDraft && <SolutionSection section={section} products={session.products} availableProducts={session.availableProducts || []} /> : <div id={`canvas-${section.id}`} data-builder-index={index} className={`builder-canvas-section ${selectedId === section.id ? 'selected' : ''} ${section.isDraft ? 'section-disabled' : ''}`} onClick={() => { setSelectedId(section.id); setRightTab('content'); }}>
                <div className="builder-canvas-controls"><button style={{ touchAction: 'none' }} onPointerDown={event => pointerStart(event, { kind: 'move', id: section.id })} draggable onDragStart={event => drag(event, { kind: 'move', id: section.id })} aria-label={`Drag ${sectionLabel(section)} section`} title="Drag to reorder"><GripVertical size={14} /></button><span>{sectionLabel(section)}{section.isDraft ? ' · hidden' : ''}</span><button aria-label="Duplicate selected section" title="Duplicate section" onClick={event => { event.stopPropagation(); duplicate(section); }}><Copy size={13} /></button><button aria-label="Remove selected section" title="Remove section" onClick={event => { event.stopPropagation(); remove(section.id); }}><Trash2 size={13} /></button></div>
                <SolutionSection section={section} products={session.products} availableProducts={session.availableProducts || []} editing />
              </div>}
              {!preview && renderDropZone(index + 1)}
            </div>)}
          </>}
        </PreviewFrame>
        <footer className="builder-canvas-footer"><span><Check size={12} />Same components as your website</span>{session.isPublished && !localPreview && <a href={`/solutions/${session.document.slug}`} target="_blank" rel="noopener noreferrer">Open live page ↗</a>}</footer>
      </section>
      {!preview && <aside className="builder-right-panel">
        <div className="builder-inspector-heading"><Settings2 size={15} /><span>{rightTab === 'page' ? 'Page settings' : selected ? sectionLabel(selected) : 'Section settings'}</span>{selected && rightTab !== 'page' && <button className="builder-icon-button ml-auto" title={selected.isDraft ? 'Show section' : 'Hide section'} aria-label={selected.isDraft ? 'Show section' : 'Hide section'} onClick={() => patchSection(selected.id, { isDraft: !selected.isDraft })}>{selected.isDraft ? <EyeOff size={14} /> : <Eye size={14} />}</button>}</div>
        {rightTab !== 'page' && <div className="builder-panel-tabs"><button className={rightTab === 'content' ? 'active' : ''} onClick={() => setRightTab('content')}>Content</button><button className={rightTab === 'design' ? 'active' : ''} onClick={() => setRightTab('design')}>Design</button></div>}
        <div className="builder-panel-scroll">
          {rightTab === 'page' ? <>
            <ContentInspector solutionId={solutionId} value={{ title: doc.title, slug: doc.slug, metaDescription: doc.metaDescription }} onChange={value => change({ ...doc, ...(value as Pick<BuilderDocument, 'title' | 'slug' | 'metaDescription'>) })} />
            <p className="text-[11px] text-slate-400 mb-6">Page URL: /solutions/{doc.slug}</p>
            <div className="border-t pt-5 space-y-3"><button className="builder-small-button w-full" disabled={busy} onClick={() => setConfirm('discard')}>Discard draft changes</button>{session.isPublished && <button className="builder-small-button w-full text-red-600" disabled={busy} onClick={() => setConfirm('unpublish')}>Unpublish solution</button>}<button className="builder-small-button w-full text-red-600 hover:bg-red-50 border-red-200" disabled={busy} onClick={() => setConfirm('delete')}>Delete solution</button></div>
          </> : selected ? <>
            {selected.isDraft && <p className="p-3 bg-amber-50 rounded-lg text-xs text-amber-800 mb-4">This section is hidden from the published page.</p>}
            {rightTab === 'content' ? <><p className="text-[11px] text-slate-500 leading-5 mb-4">Section fields are optional. Clear copy, buttons, images, or statistics you don’t need; remove unused items.</p><ContentInspector key={selected.id} solutionId={solutionId} sectionType={selected.type} products={session.availableProducts || []} value={editableContent(selected)} onChange={value => patchSection(selected.id, { content: value as Record<string, unknown> })} /></> : <DesignInspector design={selected.design} onChange={design => patchSection(selected.id, { design })} />}
            <div className="border-t pt-4 mt-6 flex gap-2"><button className="builder-small-button flex-1" disabled={doc.sections.length >= 60} onClick={() => duplicate(selected)}><Copy size={13} />Duplicate</button><button className="builder-small-button text-red-600" onClick={() => remove(selected.id)}><Trash2 size={13} />Remove</button></div>
          </> : <p className="text-xs text-slate-400 leading-6">Select a section in the canvas or outline to edit it.</p>}
          {!!errors.length && <div className="builder-validation" role="alert"><h3>Complete before saving</h3><ul>{errors.map((issue, index) => <li key={index}>{issue}</li>)}</ul></div>}
        </div>
      </aside>}
    </div>
    {templateGallery && <TemplateGallery products={session.availableProducts || []} linkedProducts={session.products} hasSections={!!doc.sections.length} currentCount={doc.sections.length} onApply={applyTemplate} onClose={() => setTemplateGallery(false)} />}
    {libraryPreview && <SectionPreviewModal key={libraryPreview} type={libraryPreview} products={session.availableProducts || []} linkedProducts={session.products} onClose={() => setLibraryPreview(null)} onAdd={() => { insert(libraryPreview); setLibraryPreview(null); }} />}
    {dragLabel && <div className="builder-drag-label" style={{ left: dragLabel.x + 12, top: dragLabel.y + 12 }}><GripVertical size={14} />{dropAt === null ? 'Move onto the canvas or outline' : `Drop at position ${dropAt + 1}`}</div>}
    {confirm && <dialog ref={confirmRef} onCancel={() => setConfirm(null)} aria-labelledby="builder-confirm-title" className="builder-modal"><h2 id="builder-confirm-title">{confirm === 'publish' ? 'Publish this solution?' : confirm === 'unpublish' ? 'Unpublish this solution?' : confirm === 'delete' ? 'Delete this solution?' : 'Discard your draft?'}</h2><p>{confirm === 'publish' ? 'Your current content and design will become visible on the website.' : confirm === 'unpublish' ? 'Visitors will no longer be able to open this solution page. Your draft will be kept.' : confirm === 'delete' ? 'Are you sure you want to delete this solution? This will permanently remove the solution and all associated sections and images. This action cannot be undone.' : 'Your unpublished changes will be removed. The current saved solution content will be loaded.'}</p><div className="flex justify-end gap-3"><button autoFocus className="builder-small-button" onClick={() => setConfirm(null)}>Cancel</button><button className={confirm === 'delete' ? "builder-primary-button !bg-red-600 hover:!bg-red-700 !border-red-600" : "builder-primary-button"} disabled={busy} onClick={() => { const action = confirm; setConfirm(null); if (action === 'delete') void deleteCurrentSolution(); else if (action === 'discard') void discard(); else void persist(action); }}>{confirm === 'publish' ? 'Publish now' : confirm === 'unpublish' ? 'Unpublish' : confirm === 'delete' ? 'Delete permanently' : 'Discard draft'}</button></div></dialog>}
  </div>;
}
