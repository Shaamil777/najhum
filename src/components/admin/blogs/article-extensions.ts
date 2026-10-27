import { Node, mergeAttributes } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';

// Keep existing article figures and editable captions in the same HTML format.
export const ArticleFigure = Node.create({
  name: 'articleFigure', group: 'block', content: 'inline*', draggable: true, isolating: true,
  addAttributes() {
    return Object.fromEntries(['src', 'alt', 'width', 'height'].map(name => [name, {
      default: null,
      parseHTML: (element: HTMLElement) => element.querySelector('img')?.getAttribute(name) || null,
    }]));
  },
  parseHTML() {
    return [{ tag: 'figure', getAttrs: (element: HTMLElement) => element.querySelector('img') ? {} : false,
      contentElement: (element: HTMLElement) => element.querySelector('figcaption') || document.createElement('figcaption') }];
  },
  renderHTML({ HTMLAttributes }) {
    return ['figure', {}, ['img', mergeAttributes(HTMLAttributes, { loading: 'lazy' })], ['figcaption', {}, 0]];
  },
});
export const articleExtensions = [
  StarterKit.configure({ trailingNode: false, heading: { levels: [2, 3, 4] }, link: { openOnClick: false, HTMLAttributes: { rel: 'noopener noreferrer' } } }),
  Image.configure({ allowBase64: false }), ArticleFigure,
  Placeholder.configure({ placeholder: ({ node }) => node.type.name === 'heading' ? 'Section heading' : 'Start writing your article…', showOnlyCurrent: true }),
];
