'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, X, ArrowUpRight, Loader2 } from 'lucide-react';
import { recommendedPages, type SearchEntry } from '@/lib/search';

export default function UniversalSearch({ open, onClose }: { open: boolean; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null), input = useRef<HTMLInputElement>(null);
  const [query,setQuery] = useState('');
  const [results,setResults] = useState<SearchEntry[]>(recommendedPages.slice(0,6));
  const [busy,setBusy] = useState(false), [error,setError] = useState(false), [partial,setPartial] = useState(false), [active,setActive] = useState(-1), [retry,setRetry] = useState(0);
  const router = useRouter();
  useEffect(() => { const node = dialog.current; if (open && !node?.open) { node?.showModal(); input.current?.focus(); } else if (!open && node?.open) node.close(); },[open]);
  useEffect(() => {
    if (!open) return;
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      setBusy(true); setError(false); setActive(-1);
      try { const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`, { signal: controller.signal }); if (!response.ok) throw new Error('Search unavailable'); const data = await response.json(); setResults(data.results.slice(0,query.trim() ? 8 : 6)); setPartial(data.partial); }
      catch (err) { if ((err as Error).name !== 'AbortError') { setError(true); setResults([]); } }
      finally { if (!controller.signal.aborted) setBusy(false); }
    },query ? 250 : 0);
    return () => { clearTimeout(timer); controller.abort(); };
  },[query,open,retry]);
  useEffect(() => { if (active >= 0) dialog.current?.querySelector(`#site-search-result-${active}`)?.scrollIntoView({block:'nearest'}); },[active]);
  useEffect(() => { if (!open) return; const previous = document.body.style.overflow; document.body.style.overflow = 'hidden'; return () => { document.body.style.overflow = previous; }; },[open]);
  return <dialog ref={dialog} onCancel={onClose} onClick={event => { if (event.target === event.currentTarget) onClose(); }} aria-labelledby="site-search-title" className="site-search-dialog" data-theme="light">
    <h2 id="site-search-title" className="sr-only">Search Najhum</h2>
    <div className="site-search-input-row">
      <Search size={21} aria-hidden="true"/>
      <label htmlFor="site-search-input" className="sr-only">Search the website</label>
      <input ref={input} id="site-search-input" role="combobox" aria-autocomplete="list" aria-expanded={open} aria-controls="site-search-results" aria-activedescendant={active >= 0 ? `site-search-result-${active}` : undefined} autoComplete="off" placeholder="Search solutions, products, blogs…" value={query} onChange={event => { setQuery(event.target.value); setActive(-1); }} onKeyDown={event => {
        if (event.key === 'ArrowDown') { event.preventDefault(); setActive(index => Math.min(index+1,results.length-1)); }
        if (event.key === 'ArrowUp') { event.preventDefault(); setActive(index => results.length ? Math.max(index-1,0) : -1); }
        if (event.key === 'Enter' && results[active]) { event.preventDefault(); onClose(); router.push(results[active].href); }
      }}/>
      {busy && <Loader2 size={17} className="animate-spin" aria-hidden="true"/>}
      {query && <button type="button" aria-label="Clear search" className="site-search-icon" onClick={() => { setQuery(''); setActive(-1); input.current?.focus(); }}><X size={15}/></button>}
      <button type="button" aria-label="Close search" onClick={onClose} className="site-search-close"><span className="hidden sm:inline">Esc</span><X size={18} className="sm:hidden" aria-hidden="true"/></button>
    </div>
    <div className="site-search-body">
      <p className="site-search-status" role="status" aria-live="polite">{busy ? 'Searching…' : error ? 'Search is unavailable. Please try again.' : query ? `${results.length} results` : 'Quick links'}</p>
      <ul id="site-search-results" role="listbox" aria-label="Search results" aria-busy={busy} className="site-search-results">{results.map((item,index) => <li key={item.href} role="presentation"><Link id={`site-search-result-${index}`} role="option" aria-selected={index === active} href={item.href} onMouseEnter={() => setActive(index)} onClick={onClose} className={`site-search-result ${active === index ? 'is-active' : ''}`}><span className="site-search-result-title">{item.title}</span><span className="site-search-result-category">{item.category}</span><ArrowUpRight size={16} aria-hidden="true"/></Link></li>)}</ul>
      {!busy && !results.length && <div className="site-search-empty"><p>{error ? 'Explore our solutions or try again in a moment.' : 'No matches. Try a blog topic, industry, product, or platform name.'}</p>{error && <button onClick={() => setRetry(value => value+1)}>Try again</button>}<Link href={`/solutions?q=${encodeURIComponent(query)}`} onClick={onClose}>Explore solutions <ArrowUpRight size={14}/></Link><Link href="/blogs" onClick={onClose}>Explore blogs <ArrowUpRight size={14}/></Link></div>}
      {partial && !busy && <p className="site-search-status">Some results are temporarily unavailable.</p>}
    </div>
  </dialog>;
}
