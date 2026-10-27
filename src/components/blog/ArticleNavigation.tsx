 'use client';
import { useEffect, useRef, useState } from 'react';
import { Check, Copy, List, ChevronDown } from 'lucide-react';
import type { ArticleHeading } from '@/lib/blog/content';

export default function ArticleNavigation({ headings }: { headings: ArticleHeading[] }) {
  const [active, setActive] = useState('');
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const progress = useRef<HTMLDivElement>(null);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    const body = document.getElementById('journal-article-body');
    if (!body) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = body.getBoundingClientRect();
      const fraction = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / (rect.height + window.innerHeight)));
      if (progress.current) progress.current.style.transform = `scaleX(${fraction})`;
      let current = '';
      for (const heading of headings) { const element = document.getElementById(heading.id); if (element && element.getBoundingClientRect().top <= 160) current = heading.id; }
      setActive(previous => previous === current ? previous : current);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update(); window.addEventListener('scroll', schedule, { passive: true }); window.addEventListener('resize', schedule);
    const elements = body.querySelectorAll('figure, img');
    let observer: IntersectionObserver | undefined;
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver(entries => { for (const entry of entries) if (entry.isIntersecting) { entry.target.classList.add('journal-in-view'); observer?.unobserve(entry.target); } }, { threshold: .08 });
      elements.forEach(element => { element.classList.add('journal-image-reveal'); observer!.observe(element); });
    }
    return () => { window.removeEventListener('scroll', schedule); window.removeEventListener('resize', schedule); if (frame) cancelAnimationFrame(frame); observer?.disconnect(); elements.forEach(element => element.classList.remove('journal-image-reveal')); if (copyTimer.current) clearTimeout(copyTimer.current); };
  }, [headings]);
  async function copyLink() {
    try { await navigator.clipboard.writeText(window.location.href); setCopied(true); setCopyError(false); if (copyTimer.current) clearTimeout(copyTimer.current); copyTimer.current = setTimeout(() => setCopied(false), 2200); }
    catch { setCopyError(true); }
  }
  return <><div className="journal-reading-progress" aria-hidden="true"><div ref={progress}/></div><div className="journal-article-actions"><span>Inside this story</span><button type="button" onClick={copyLink}>{copied ? <Check size={15}/> : <Copy size={15}/>} {copied ? 'Link copied' : 'Copy article link'}</button>{copyError && <span role="status">Copy the address from your browser to share this article.</span>}</div>{!!headings.length && <nav className="journal-toc" aria-label="Table of contents"><details open><summary><span><List size={18} aria-hidden="true"/>Table of contents</span><ChevronDown size={17} aria-hidden="true"/></summary><ol>{headings.map(heading => <li key={heading.id} className={heading.level === 3 ? 'journal-toc-subsection' : undefined}><a href={`#${heading.id}`} aria-current={active === heading.id ? 'location' : undefined} onClick={() => setActive(heading.id)}>{heading.text}</a></li>)}</ol></details></nav>}</>;
}
