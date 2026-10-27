'use client';
import { Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
export default function DeletePostButton({ id, title }: {
    id: string;
    title: string;
}) {
    const router = useRouter();
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState('');
    async function remove() {
        if (!window.confirm(`Permanently delete “${title}”? This cannot be undone.`))
            return;
        setBusy(true);
        setError('');
        try {
            const response = await fetch(`/api/admin/blogs/${id}`, { method: 'DELETE' });
            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Could not delete the article.');
            }
            router.refresh();
        }
        catch (error) {
            setError(error instanceof Error ? error.message : 'Delete failed.');
        }
        finally {
            setBusy(false);
        }
    }
    return <><button type="button" className="blog-admin-button danger" disabled={busy} onClick={remove}><Trash2 size={15}/>{busy ? 'Deleting…' : 'Delete'}</button>{error && <p role="alert" className="text-xs text-red-600">{error}</p>}</>;
}
