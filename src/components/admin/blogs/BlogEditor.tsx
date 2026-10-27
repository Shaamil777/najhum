'use client';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import BlogComposer from './BlogComposer';
import BlogArticle from '@/components/blog/BlogArticle';
import { ArrowLeft, Eye, FileText, ImagePlus, Search, Save, Send, Upload } from 'lucide-react';
import type { BlogInput } from '@/lib/blog/schema';
import { siteConfig } from '@/config/site';
type Props = {
    id?: string;
    initialData: BlogInput;
};
export default function BlogEditor({ id, initialData }: Props) {
    const router = useRouter();
    const [data, setData] = useState(initialData);
    const [busy, setBusy] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');
    const [saved, setSaved] = useState('');
    const [tab, setTab] = useState<'details' | 'content' | 'seo' | 'preview'>(id ? 'content' : 'details');
    const [slugEdited, setSlugEdited] = useState(!!id);
    const [tagText, setTagText] = useState(initialData.tags.join(', '));
    const [baseline, setBaseline] = useState(JSON.stringify(initialData));
    const imageInput = useRef<HTMLInputElement>(null);
    const dirty = JSON.stringify(data) !== baseline;
    useEffect(() => { function warn(event: BeforeUnloadEvent) { if (dirty) {
        event.preventDefault();
        event.returnValue = '';
    } } window.addEventListener('beforeunload', warn); return () => window.removeEventListener('beforeunload', warn); }, [dirty]);
    function patch<K extends keyof BlogInput>(key: K, value: BlogInput[K]) { setData(current => ({ ...current, [key]: value })); setSaved(''); }
    function title(value: string) { setData(current => ({ ...current, title: value, ...(!slugEdited ? { slug: value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') } : {}) })); setSaved(''); }
    async function upload(file?: File) {
        if (!file)
            return;
        if (!file.type.startsWith('image/')) {
            setError('Choose an image file.');
            return;
        }
        setUploading(true);
        setError('');
        try {
            const body = new FormData();
            body.append('file', file);
            body.append('folder', 'blogs');
            const response = await fetch('/api/admin/upload', { method: 'POST', body });
            const result = await response.json();
            if (!response.ok)
                throw new Error(result.error || 'Image upload failed.');
            patch('coverImage', result.url);
        }
        catch (error) {
            setError(error instanceof Error ? error.message : 'Upload failed.');
        }
        finally {
            setUploading(false);
            if (imageInput.current)
                imageInput.current.value = '';
        }
    }
    async function save(isDraft: boolean) {
        if (!isDraft && !data.isDraft && !window.confirm('Publish these changes to the live article?'))
            return;
        setBusy(true);
        setError('');
        setSaved('');
        try {
            const payload = { ...data, isDraft };
            const response = await fetch(id ? `/api/admin/blogs/${id}` : '/api/admin/blogs', { method: id ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
            const result = await response.json();
            if (!response.ok)
                throw new Error(result.details?.map((issue: {
                    field: string;
                    message: string;
                }) => `${issue.field}: ${issue.message}`).join(' · ') || result.error || 'Save failed.');
            setData(payload);
            setBaseline(JSON.stringify(payload));
            setSaved(isDraft ? 'Draft saved. This article is private.' : 'Published. Your article is live.');
            if (!id)
                router.replace(`/admin/blogs/${result.post.id}/edit`);
            router.refresh();
        }
        catch (error) {
            setError(error instanceof Error ? error.message : 'Save failed.');
        }
        finally {
            setBusy(false);
        }
    }
    const tabs = [{ id: 'details', label: 'Details & cover', icon: ImagePlus }, { id: 'content', label: 'Write article', icon: FileText }, { id: 'seo', label: 'Search & social', icon: Search }, { id: 'preview', label: 'Preview', icon: Eye }] as const;
    return <div className="blog-admin blog-editor">
      <Link href="/admin/blogs" className="blog-editor-back"><ArrowLeft size={16}/>All articles</Link>
      <header className="blog-admin-head blog-editor-head"><div><p className="blog-admin-eyebrow">Editorial workspace</p><h1>{id ? 'Edit article' : 'Create article'}</h1><p className="blog-admin-subtitle"><span className={`blog-admin-badge ${data.isDraft ? '' : 'published'}`}>{data.isDraft ? 'Draft · private' : 'Published'}</span> {dirty ? 'Unsaved changes' : id ? 'All changes saved' : 'Start with the details, then build your story.'}</p></div><div className="blog-admin-actions"><button type="button" className="blog-admin-button" onClick={() => setTab('preview')}><Eye size={16}/>Preview</button><button type="button" disabled={busy || uploading} className="blog-admin-button" onClick={() => { if (!data.isDraft && !window.confirm('Move this published article to draft? It will disappear from the public journal.')) return; void save(true); }}><Save size={16}/>{busy ? 'Saving…' : data.isDraft ? 'Save draft' : 'Move to draft'}</button><button type="button" disabled={busy || uploading} className="blog-admin-button primary" onClick={() => void save(false)}><Send size={16}/>{data.isDraft ? 'Publish article' : 'Update article'}</button></div></header>
      {error && <p role="alert" className="blog-admin-notice error">{error}</p>}{saved && <p role="status" className="blog-admin-notice success">{saved}</p>}
      <nav aria-label="Article editor" className="blog-editor-tabs">{tabs.map(({id: key, label, icon: Icon}) => <button key={key} type="button" disabled={uploading || busy} aria-current={tab === key ? 'step' : undefined} onClick={() => setTab(key)}><Icon size={17}/>{label}</button>)}</nav>
      {tab === 'details' && <div className="blog-editor-details"><section className="blog-admin-panel"><h2>Article details</h2><div className="blog-field"><label htmlFor="blog-title">Article title</label><textarea className="blog-title-input" id="blog-title" rows={3} value={data.title} maxLength={200} placeholder="Give your idea a headline" onChange={event => title(event.target.value)}/></div><div className="blog-field"><label htmlFor="blog-excerpt">Short introduction</label><textarea id="blog-excerpt" rows={4} maxLength={500} value={data.excerpt} placeholder="What will readers learn?" onChange={event => patch('excerpt', event.target.value)}/><small>{data.excerpt.length}/500 characters · Appears on cards and below the cover.</small></div><div className="blog-editor-field-pair"><div className="blog-field"><label htmlFor="blog-category">Category</label><input type="text" id="blog-category" value={data.category} maxLength={80} onChange={event => patch('category', event.target.value)}/></div><div className="blog-field"><label htmlFor="blog-author">Author</label><input type="text" id="blog-author" value={data.author} maxLength={120} onChange={event => patch('author', event.target.value)}/></div></div><div className="blog-field"><label htmlFor="blog-tags">Topics</label><input type="text" id="blog-tags" value={tagText} onChange={event => { setTagText(event.target.value); patch('tags', [...new Set(event.target.value.split(',').map(tag => tag.trim()).filter(Boolean))]); }}/><small>Separate topics with commas.</small></div><div className="blog-field"><label htmlFor="blog-slug">Article URL</label><input type="text" id="blog-slug" value={data.slug} maxLength={120} onChange={event => { setSlugEdited(true); patch('slug', event.target.value); }}/><small>/blogs/{data.slug || 'your-article-url'} · Changing a published URL changes its public address.</small></div><label className="blog-admin-switch"><input type="checkbox" checked={data.featured} onChange={event => patch('featured', event.target.checked)}/>Show this article first in the journal</label><button className="blog-admin-button primary" type="button" onClick={() => setTab('content')}><FileText size={16}/>Continue to writing</button></section><section className="blog-admin-panel"><h2>Cover image</h2>{data.coverImage ? <img className="blog-admin-cover" src={data.coverImage} alt={data.coverAlt || 'Cover preview'}/> : <div className="blog-cover-empty"><ImagePlus size={32}/><p>Add a landscape cover</p></div>}<input ref={imageInput} type="file" accept="image/*" hidden onChange={event => void upload(event.target.files?.[0])}/><button type="button" className="blog-admin-button mb-5" disabled={busy || uploading} onClick={() => imageInput.current?.click()}><Upload size={16}/>{uploading ? 'Uploading…' : 'Upload cover'}</button><div className="blog-field"><label htmlFor="cover-image">Or paste an image URL</label><input type="text" id="cover-image" value={data.coverImage} onChange={event => patch('coverImage', event.target.value)}/><small>Landscape image, ideally 1600 px wide. Clear to remove.</small></div><div className="blog-field"><label htmlFor="cover-alt">Image description</label><textarea id="cover-alt" rows={3} maxLength={250} value={data.coverAlt} placeholder="Describe the image for readers using assistive technology." onChange={event => patch('coverAlt', event.target.value)}/></div></section></div>}
      <section hidden={tab !== 'content'} className="blog-admin-panel blog-builder-panel"><h2>Write your article</h2><p className="blog-admin-help">Click anywhere in the article to write. Select text to format it, or place your cursor where you want to add an image.</p><BlogComposer value={data.content} onChange={value => patch('content', value)} onUploading={setUploading} disabled={busy}/></section>
      {tab === 'seo' && <section className="blog-admin-panel blog-editor-seo"><h2>Search & social appearance</h2><p className="blog-admin-help">Your title, introduction and cover are used automatically. Override them here when needed.</p><div className="blog-field"><label htmlFor="seo-title">SEO title</label><input type="text" id="seo-title" maxLength={100} value={data.seoTitle} placeholder={data.title || 'Defaults to the article title'} onChange={event => patch('seoTitle', event.target.value)}/><small>{data.seoTitle.length}/100 · Aim for about 50–60 characters.</small></div><div className="blog-field"><label htmlFor="seo-description">SEO description</label><textarea id="seo-description" rows={3} maxLength={300} value={data.seoDescription} placeholder={data.excerpt || 'Defaults to the introduction'} onChange={event => patch('seoDescription', event.target.value)}/><small>{data.seoDescription.length}/300 · Aim for about 150–160 characters.</small></div><div className="blog-field"><label htmlFor="og-image">Social sharing image URL</label><input type="text" id="og-image" value={data.ogImage} placeholder="Defaults to the cover image" onChange={event => patch('ogImage', event.target.value)}/></div><label className="blog-admin-switch"><input type="checkbox" checked={data.noIndex} onChange={event => patch('noIndex', event.target.checked)}/><span>Ask search engines not to index this article<small className="block font-normal text-slate-500">Drafts are always private.</small></span></label><div className="blog-seo-preview"><small>{siteConfig.url}/blogs/{data.slug || 'your-article-url'}</small><strong>{data.seoTitle || data.title || 'Your article title'}</strong><p>{data.seoDescription || data.excerpt || 'Your description will appear here.'}</p></div></section>}
      {tab === 'preview' && <section className="blog-editor-preview"><p className="blog-admin-notice">Live preview of your current changes. Save or publish to apply them.</p><BlogArticle post={{...data, id: id || 'preview', title: data.title || 'Your article title', createdAt: new Date(0), updatedAt: new Date(0), publishedAt: null}}/></section>}
    </div>;
}
