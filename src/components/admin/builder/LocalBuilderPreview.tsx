'use client';
import { useEffect, useState } from 'react';
import SolutionBuilder from './SolutionBuilder';
import { builderDocumentSchema, type BuilderSession } from '@/lib/builder/document';
import { previewDocument } from '@/lib/builder/catalog';

export default function LocalBuilderPreview() {
  const [session, setSession] = useState<BuilderSession | null>(null);
  useEffect(() => {
    let initial: BuilderSession = { document: previewDocument(), version: 0, baseRevision: '0'.repeat(64), isPublished: false, hasDraft: false, products: [] };
    try {
      const stored = JSON.parse(localStorage.getItem('najhum-builder-local-preview') || 'null');
      if (stored && builderDocumentSchema.safeParse(stored.document).success) initial = { ...initial, ...stored };
    } catch { /* A corrupt development preview should not prevent the editor from loading. */ }
    // Restore this browser-only preview after hydration.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSession(initial);
  }, []);
  return session ? <SolutionBuilder solutionId="local-preview" initialSession={session} localPreview /> : <p>Loading builder preview…</p>;
}
