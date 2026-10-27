// @vitest-environment jsdom
import { afterEach, describe, expect, it } from 'vitest';
import { Editor } from '@tiptap/core';
import { articleExtensions } from './article-extensions';
import { sanitizeBlogContent } from '@/lib/blog/content';
const editors: Editor[] = [];
function create(content: string) { const editor = new Editor({ extensions: articleExtensions, content }); editors.push(editor); return editor; }
afterEach(() => editors.splice(0).forEach(editor => editor.destroy()));
describe('article writing document', () => {
 it('keeps existing figures, captions, links, lists and headings when editing nearby text', () => {
 const editor = create('<p>Original introduction</p><h2>Heading</h2><figure><img src="/factory.jpg" alt="Factory" width="1600"><figcaption>A <strong>working</strong> site</figcaption></figure><ul><li><p>First item</p></li></ul><p><a href="/contact">Contact us</a></p><blockquote><p>A useful idea</p></blockquote><img src="/second.jpg" alt="Second image">');
 editor.commands.insertContentAt(1, 'Updated ');
 const html = sanitizeBlogContent(editor.getHTML());
 const document = new DOMParser().parseFromString(html,'text/html');
 expect(document.querySelector('p')?.textContent).toBe('Updated Original introduction');
 expect(document.querySelector('h2')?.textContent).toBe('Heading');
 expect(document.querySelector('figure img')?.getAttribute('src')).toBe('/factory.jpg');
 expect(document.querySelector('figure img')?.getAttribute('alt')).toBe('Factory');
 expect(document.querySelector('figcaption strong')?.textContent).toBe('working');
 expect(document.querySelector('a')?.getAttribute('href')).toBe('/contact');
 expect(document.querySelector('li')?.textContent).toBe('First item');
 expect(document.querySelector('blockquote')?.textContent).toBe('A useful idea');
 expect(document.querySelectorAll('img')).toHaveLength(2);
 });
 it('supports a figure without a caption and undoing document changes', () => {
 const editor = create('<p>Before</p><figure><img src="/photo.jpg" alt="Photo"></figure>');
 expect(editor.getHTML()).toContain('src="/photo.jpg"');
 editor.commands.insertContentAt(1,'After ');
 expect(editor.getText()).toContain('After Before');
 editor.commands.undo();
 expect(editor.getText()).not.toContain('After Before');
 expect(editor.getHTML()).toContain('src="/photo.jpg"');
 });
});
