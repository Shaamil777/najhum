import Link from 'next/link';
import { ArrowUpRight, BookOpen, ArrowLeft, CalendarDays, Clock3, UserRound } from 'lucide-react';
import { Container } from '@/design-system/primitives/layout/Container';
import type { BlogPost } from '@prisma/client';
import { readingMinutes, presentArticle } from '@/lib/blog/content';
import ArticleNavigation from './ArticleNavigation';
import './blog.css';
export function PostImage({ src, alt }: { src: string; alt: string }) {
  return <div className={`journal-image ${src ? '' : 'journal-placeholder'}`}>{src ? <img src={src} alt={alt} loading="lazy" decoding="async"/> : <span className="journal-placeholder-icon"><BookOpen size={32} strokeWidth={1.4} aria-hidden="true"/></span>}</div>;
}
export function PostCard({ post }: { post: BlogPost }) {
  return <article className="journal-card"><Link className="journal-card-media" href={`/blogs/${post.slug}`} aria-label={post.title}><PostImage src={post.coverImage} alt={post.coverAlt}/></Link><div className="journal-card-copy"><span className="journal-tag">{post.category}</span><h2><Link href={`/blogs/${post.slug}`}>{post.title}</Link></h2><p>{post.excerpt}</p><PostMeta post={post}/><Link href={`/blogs/${post.slug}`} className="journal-read">Read the story <ArrowUpRight size={17} aria-hidden="true"/></Link></div></article>;
}
export function PostMeta({ post }: { post: BlogPost }) {
  return <div className="journal-meta"><span><UserRound size={13} aria-hidden="true"/>{post.author}</span>{post.publishedAt && <time dateTime={post.publishedAt.toISOString()}><CalendarDays size={13} aria-hidden="true"/>{post.publishedAt.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'Asia/Kolkata' })}</time>}<span><Clock3 size={13} aria-hidden="true"/>{readingMinutes(post.content)} min read</span></div>;
}
export default function BlogArticle({ post, preview = false }: { post: BlogPost; preview?: boolean }) {
  const presentation = presentArticle(post.content);
  return <>{preview && <div className="journal-preview-banner">Admin preview · {post.isDraft ? 'Draft — visible only to administrators' : 'Published article'} · Saved content</div>}<div className="journal journal-article"><Container size="full" padded={false} className="journal-wrap"><article className="journal-article-shell"><Link className="journal-back" href="/blogs"><ArrowLeft size={15} aria-hidden="true"/>Back to the journal</Link><header className="journal-article-head"><span className="journal-tag">{post.category}</span><h1>{post.title}</h1><PostMeta post={post}/></header>{post.coverImage && <figure className="journal-cover"><img src={post.coverImage} alt={post.coverAlt} fetchPriority="high" decoding="async"/></figure>}<div className="journal-reading-column"><p className="journal-deck">{post.excerpt}</p><ArticleNavigation headings={presentation.headings}/><div id="journal-article-body" className="journal-article-body" dangerouslySetInnerHTML={{ __html: presentation.html }}/><footer className="journal-article-footer"><div className="journal-filters">{post.tags.map(tag => <span className="journal-chip" key={tag}>{tag}</span>)}</div><Link className="journal-read" href="/blogs"><ArrowLeft size={16} aria-hidden="true"/>Explore more stories</Link></footer></div></article></Container></div></>;
}
