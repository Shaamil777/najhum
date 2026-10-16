import { describe,expect,it } from 'vitest';
import { rankSearch,searchableText,recommendedPages } from './search';
describe('website search',()=>{
 it('ranks title matches and matches every query word',()=>{ const entries=[...recommendedPages,{title:'Cold storage',href:'/solutions/cold-storage',description:'Cold chain intelligence',category:'Solutions' as const,keywords:'door temperature humidity compressor'}]; expect(rankSearch(entries,'cold storage')[0].href).toBe('/solutions/cold-storage'); expect(rankSearch(entries,'temperature door')[0].title).toBe('Cold storage'); expect(rankSearch(entries,'temperature unknown')).toEqual([]); });
 it('filters categories and strips searchable HTML without leaking design or image URLs',()=>{expect(rankSearch(recommendedPages,'','Platforms')).toHaveLength(3); const text=searchableText({heading:'<b>Water</b>',bodyHtml:'<p>Leak monitoring</p>',imageUrl:'https://private.test/photo.jpg',_design:{background:'#000000'}});expect(text).toContain('Leak monitoring');expect(text).not.toContain('private.test');expect(text).not.toContain('#000000');});
});
