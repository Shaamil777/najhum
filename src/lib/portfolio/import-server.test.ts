import { beforeEach,expect,it,vi } from 'vitest';
import { metadataSchema,type ImportedDocument } from '@/lib/solution-import/types';
const m=vi.hoisted(()=>({solution:{findUnique:vi.fn(),findUniqueOrThrow:vi.fn(),create:vi.fn(),update:vi.fn()},revision:{findFirst:vi.fn(),findMany:vi.fn(),create:vi.fn(),deleteMany:vi.fn()},cleanup:vi.fn(),transaction:vi.fn()}));
vi.mock('@/lib/db/prisma',()=>({prisma:{portfolioProject:m.solution,portfolioRevision:m.revision,$transaction:m.transaction}}));
vi.mock('@/lib/solution-import/storage-cleanup',()=>({cleanUnusedImportAssets:m.cleanup}));
import {savePortfolioImport as saveImport,publishPortfolioImport as publishImport} from './import-server';
const doc:ImportedDocument={schemaVersion:1,html:'<h1>Cold</h1>',css:'',scripts:[],metadata:metadataSchema.parse({title:'Cold',slug:'cold-storage',seoTitle:'Cold SEO',productIds:['door']}),assets:[],warnings:[],sourceName:'page.html',checksum:'test'};
beforeEach(()=>{vi.resetAllMocks();m.transaction.mockImplementation(fn=>fn({portfolioProject:m.solution,portfolioRevision:m.revision}));m.solution.findUnique.mockResolvedValue({id:'solution',slug:'old',publishedRevisionId:'live'});m.solution.findUniqueOrThrow.mockResolvedValue({id:'solution',slug:'old',publishedRevisionId:'live'});m.revision.findFirst.mockResolvedValue(null);m.revision.findMany.mockResolvedValue([]);m.revision.create.mockResolvedValue({id:'draft',number:2});m.cleanup.mockResolvedValue(undefined);});
it('replaces the previous working draft while leaving the live page untouched',async()=>{
 m.revision.findFirst.mockResolvedValue({id:'old-draft',number:1});m.revision.findMany.mockResolvedValue([{id:'old-draft',document:doc}]);
 await saveImport('solution',doc,'admin','old-draft');
 expect(m.revision.findMany).toHaveBeenCalledWith({where:{projectId:'solution',id:{notIn:['live']}}});
 expect(m.revision.deleteMany).toHaveBeenCalledWith({where:{id:{in:['old-draft']}}});
 expect(m.solution.update).toHaveBeenCalledWith({where:{id:'solution'},data:{updatedAt:expect.any(Date)}});expect(m.cleanup).toHaveBeenCalledWith([doc]);
 expect(m.revision.create.mock.calls[0][0].data.document.metadata.productIds).toEqual([]);
});
it('rejects stale draft saves before replacing any content',async()=>{m.revision.findFirst.mockResolvedValue({id:'newer',number:2});await expect(saveImport('solution',doc,'admin','older')).rejects.toThrow('newer draft');expect(m.revision.create).not.toHaveBeenCalled();expect(m.revision.deleteMany).not.toHaveBeenCalled();});
it('does not publish a document belonging to another solution',async()=>{await expect(publishImport('solution','other')).rejects.toThrow();expect(m.solution.update).not.toHaveBeenCalled();});
it('publishes the latest draft and removes the superseded live copy',async()=>{
 m.revision.findFirst.mockResolvedValue({id:'draft',document:doc});m.revision.findMany.mockResolvedValue([{id:'live',document:doc}]);
 await publishImport('solution','draft');
 expect(m.solution.update).toHaveBeenCalledWith(expect.objectContaining({data:expect.objectContaining({slug:'cold-storage',publishedRevisionId:'draft',isDraft:false})}));
 expect(m.revision.deleteMany).toHaveBeenCalledWith({where:{projectId:'solution',id:{not:'draft'}}});expect(m.cleanup).toHaveBeenCalledWith([doc]);
});
it('rejects publishing a draft which another administrator has replaced',async()=>{
 m.revision.findFirst.mockResolvedValueOnce({id:'old',document:doc}).mockResolvedValueOnce({id:'new'});
 await expect(publishImport('solution','old')).rejects.toThrow('draft changed');expect(m.solution.update).not.toHaveBeenCalled();
});
