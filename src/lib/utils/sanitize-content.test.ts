import {expect,it} from 'vitest';
import {sanitizeContent} from './sanitize-content';
it('keeps prose and safe links',() => {
 expect(sanitizeContent('<p><strong>Overview</strong></p>')).toContain('<strong>Overview</strong>');
 expect(sanitizeContent('<a href="mailto:info@najhumgroup.com">Contact</a>')).toContain('mailto:');
});
it('removes executable HTML and unsafe links',() => {
 expect(sanitizeContent('<script>alert(1)</script><img src=x onerror="alert(1)"><p onclick="alert(1)">Safe</p><a href="javascript:alert(1)">Bad</a>')).toBe('<p>Safe</p><a>Bad</a>');
});
