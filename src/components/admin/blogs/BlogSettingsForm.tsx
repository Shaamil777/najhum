'use client';
import { ArrowLeft, ArrowUpRight, Save } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { BlogSettingsInput } from '@/lib/blog/schema';
export default function BlogSettingsForm({ initialData }: {
    initialData: BlogSettingsInput;
}) {
    const [data, setData] = useState(initialData);
    const [busy, setBusy] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();
    async function save(event: React.SubmitEvent<HTMLFormElement>) { event.preventDefault(); setBusy(true); setMessage(''); setError(''); try {
        const response = await fetch('/api/admin/blog-settings', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
        const result = await response.json();
        if (!response.ok)
            throw new Error(result.details?.map((issue: {
                field: string;
                message: string;
            }) => `${issue.field}: ${issue.message}`).join(' · ') || result.error || 'Could not save settings.');
        setMessage('Page settings saved.');
        router.refresh();
    }
    catch (error) {
        setError(error instanceof Error ? error.message : 'Save failed.');
    }
    finally {
        setBusy(false);
    } }
    return <form className="blog-admin" onSubmit={save}><Link href="/admin/blogs" className="blog-editor-back"><ArrowLeft size={16}/>All articles</Link><header className="blog-admin-head mt-5"><div><p className="blog-admin-eyebrow">The journal · Page settings</p><h1>Set the first impression.</h1><p className="blog-admin-subtitle">Edit the public journal headline and its appearance in search and social shares.</p></div><button disabled={busy} className="blog-admin-button primary" type="submit"><Save size={16}/>{busy ? 'Saving…' : 'Save page settings'}</button></header>{error && <p className="blog-admin-notice error" role="alert">{error}</p>}{message && <p className="blog-admin-notice success" role="status">{message}</p>}<div className="blog-admin-layout"><section className="blog-admin-panel"><h2>Page introduction</h2>{([['heading', 'Journal headline'], ['introduction', 'Introduction'], ['seoTitle', 'SEO title'], ['seoDescription', 'SEO description'], ['ogImage', 'Social sharing image URL']] as const).map(([key, label]) => <div className="blog-field" key={key}><label htmlFor={key}>{label}</label>{key === 'introduction' || key === 'seoDescription' ? <textarea id={key} rows={3} maxLength={key === 'introduction' ? 500 : 300} value={data[key]} onChange={event => setData({ ...data, [key]: event.target.value })}/> : <input id={key} type="text" maxLength={key === 'heading' ? 160 : key === 'seoTitle' ? 100 : 2000} value={data[key]} onChange={event => setData({ ...data, [key]: event.target.value })}/>}</div>)}<label className="blog-admin-switch"><input type="checkbox" checked={data.noIndex} onChange={event => setData({ ...data, noIndex: event.target.checked })}/>Ask search engines not to index the journal landing page</label><p className="blog-admin-help">Article indexing is controlled separately in each article’s SEO settings. Canonical URLs and article structured data are generated automatically.</p></section><aside className="blog-admin-panel"><h2>Search appearance</h2><div className="blog-seo-preview"><small>/blogs</small><strong>{data.seoTitle}</strong><p>{data.seoDescription}</p></div><h2 className="mt-8">Editorial layout</h2><p className="blog-admin-help">The journal displays a compact story grid: three cards per row on desktop and one per row on mobile. Prioritised articles appear first. Categories come from your published articles. Cover images and excerpts are managed in each article.</p><Link className="blog-admin-button mt-5" href="/blogs" target="_blank">View journal <ArrowUpRight size={16}/></Link></aside></div></form>;
}
