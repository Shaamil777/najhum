import {expect,it} from 'vitest';
import {editAssets} from './asset-edits';
import {metadataSchema,type ImportedDocument} from './types';
const original:ImportedDocument={schemaVersion:1,html:'<div><img src="https://media.test/old.webp" alt="Original"><img src="https://media.test/old.webp" alt="Original"><div style="background:url(https://media.test/old.webp)"></div></div>',css:'.hero{background:url(https://media.test/old.webp)}',scripts:['var image="https://media.test/old.webp";'],metadata:metadataSchema.parse({title:'Cold',slug:'cold',seoTitle:'Cold'}),assets:[{path:'assets/sensor.webp',url:'https://media.test/old.webp',storageKey:'old',type:'image/webp',size:100}],warnings:[],sourceName:'page.html',checksum:'original'};
it('replaces all occurrences without mutating the previous revision',()=>{
 const result=editAssets(original,[{storageKey:'old',replacement:{path:'new-file.jpg',url:'https://media.test/new.jpg',storageKey:'new',type:'image/jpeg',size:200},alt:'Updated sensor'}]);
 expect(result.html).not.toContain('old.webp');expect(result.html.match(/alt="Updated sensor"/g)).toHaveLength(2);expect(result.css).toContain('new.jpg');expect(result.scripts[0]).toContain('new.jpg');expect(result.assets[0].path).toBe('assets/sensor.webp');expect(original.html).toContain('old.webp');expect(original.assets[0].storageKey).toBe('old');
});
it('supports alt-text-only changes and keeps the original image URL',()=>{const result=editAssets(original,[{storageKey:'old',alt:'A cold room sensor'}]);expect(result.html).toContain('alt="A cold room sensor"');expect(result.assets[0].url).toBe(original.assets[0].url);expect(result.assets[0].altText).toBe('A cold room sensor');});
it('rejects stale asset edits',()=>{expect(()=>editAssets(original,[{storageKey:'missing',alt:'Test'}])).toThrow('another revision');});
