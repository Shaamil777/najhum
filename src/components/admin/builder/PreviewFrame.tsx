'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

// Styles are copied imperatively into the separate preview document, outside React's tree.
function syncFrameStyles(frameDocument: Document) {
  frameDocument.head.querySelectorAll('[data-builder-style]').forEach(element => element.remove());
  document.head.querySelectorAll('style, link[rel="stylesheet"]').forEach(element => {
    const clone = element.cloneNode(true) as HTMLElement;
    clone.setAttribute('data-builder-style', 'true'); frameDocument.head.appendChild(clone);
  });
  frameDocument.documentElement.className = document.documentElement.className;
  frameDocument.documentElement.setAttribute('data-theme', 'light');
}


export default function PreviewFrame({ width, children, editing, selectedId }: { width: number; children: ReactNode; editing: boolean; selectedId?: string | null }) {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [target, setTarget] = useState<HTMLElement | null>(null);
  const [available, setAvailable] = useState(800);
  useEffect(() => {
    // A cached srcdoc can finish loading before React hydrates the onLoad handler.
    // Initialize here as well so reloading a saved draft always restores the canvas.
    const root = frameRef.current?.contentDocument?.getElementById('builder-root');
    if (root) setTarget(root);
  }, []);
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const observer = new ResizeObserver(entries => setAvailable(entries[0].contentRect.width));
    observer.observe(container);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!target) return;
    const doc = frameRef.current?.contentDocument;
    if (!doc) return;
    const frameDocument: Document = doc;
    const sync = () => syncFrameStyles(frameDocument);
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(document.head, { childList: true, subtree: true, characterData: true });
    return () => observer.disconnect();
  }, [target]);
  useEffect(() => {
    if (selectedId && editing) frameRef.current?.contentDocument?.getElementById(`canvas-${selectedId}`)?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }, [selectedId, editing, target]);
  const scale = Math.min(1, Math.max(0.2, (available - 32) / width));
  return <div ref={containerRef} className="builder-frame-area">
    <div className="builder-device-label">{width}px · {Math.round(scale * 100)}% · {editing ? 'Edit canvas' : 'Preview'}</div>
    <div style={{ width: width * scale, height: 760 * scale, margin: '0 auto' }}>
      <iframe ref={frameRef} title="Solution page live preview" sandbox="allow-same-origin allow-scripts allow-presentation" srcDoc={'<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"></head><body style="margin:0;background:white"><div id="builder-root"></div></body></html>'} onLoad={() => setTarget(frameRef.current?.contentDocument?.getElementById('builder-root') || null)} style={{ width, height: 760, transform: `scale(${scale})`, transformOrigin: 'top left', border: 0, background: 'white', borderRadius: 8, boxShadow: '0 12px 48px #0f172a15' }} />
    </div>
    {target && createPortal(<div className={editing ? 'builder-editing' : ''} onClickCapture={event => { if ((event.target as HTMLElement).closest('a')) event.preventDefault(); }}>
      {children}
    </div>, target)}
  </div>;
}
