import { beforeEach, describe, expect, it, vi } from "vitest";
const db=vi.hoisted(()=>({solutions:vi.fn(),products:vi.fn(),blogs:vi.fn(),settings:vi.fn(),projects:vi.fn(),portfolioSettings:vi.fn()}));
vi.mock("@/lib/db/prisma",()=>({prisma:{solution:{findMany:db.solutions},product:{findMany:db.products},blogPost:{findMany:db.blogs},blogSettings:{findUnique:db.settings},portfolioProject:{findMany:db.projects},portfolioSettings:{findUnique:db.portfolioSettings}}}));
import sitemap from "./sitemap";
beforeEach(()=>{vi.resetAllMocks();db.blogs.mockResolvedValue([]);db.settings.mockResolvedValue(null);db.projects.mockResolvedValue([]);db.portfolioSettings.mockResolvedValue(null);});
describe("public sitemap",()=>{
  it("includes published products and solutions with their canonical slugs",async()=>{
    db.solutions.mockResolvedValue([{slug:"cold-storage",updatedAt:new Date('2025-11-29')}]);
    db.products.mockResolvedValue([{id:"p1",name:"Najhum UV/IR Flame Detector",updatedAt:new Date('2025-11-29')}]);
    const urls=(await sitemap()).map(entry=>entry.url);
    expect(urls).toContain('https://najhumgroup.com/products/najhum-uv-ir-flame-detector');
    expect(urls).not.toContain('https://najhumgroup.com/demo');
    expect(urls).toContain('https://najhumgroup.com/solutions/cold-storage');
    expect(urls).not.toContain('https://najhumgroup.com/platforms');
    expect(db.solutions).toHaveBeenCalledWith(expect.objectContaining({where:{isDraft:false,contentMode:'HTML',publishedRevisionId:{not:null}}}));
    expect(db.products).toHaveBeenCalledWith(expect.objectContaining({where:{isDraft:false}}));
  });
  it("keeps static pages discoverable if the database is unavailable",async()=>{
    db.solutions.mockRejectedValue(new Error('unavailable'));db.products.mockRejectedValue(new Error('unavailable'));
    const urls=(await sitemap()).map(entry=>entry.url);
    expect(urls).toHaveLength(12);expect(urls).toContain('https://najhumgroup.com/privacy-policy');
  });
});

it('includes only indexable published articles and honours landing-page noindex', async () => {
  db.solutions.mockResolvedValue([]); db.products.mockResolvedValue([]);
  db.blogs.mockResolvedValue([{ slug: 'connected-world', updatedAt: new Date() }]); db.settings.mockResolvedValue({ noIndex: true });
  const urls = (await sitemap()).map(entry => entry.url);
  expect(urls).toContain('https://najhumgroup.com/blogs/connected-world');
  expect(urls).not.toContain('https://najhumgroup.com/blogs');
  expect(db.blogs).toHaveBeenCalledWith(expect.objectContaining({ where: { isDraft: false, noIndex: false, publishedAt: { not: null } } }));
});

it('includes published indexable projects and respects portfolio listing indexing',async()=>{
 db.solutions.mockResolvedValue([]);db.products.mockResolvedValue([]);db.projects.mockResolvedValue([{slug:'connected-campus',updatedAt:new Date()}]);db.portfolioSettings.mockResolvedValue({noIndex:true});
 const urls=(await sitemap()).map(item=>item.url);
 expect(urls).toContain('https://najhumgroup.com/portfolio/connected-campus');expect(urls).not.toContain('https://najhumgroup.com/portfolio');
 expect(db.projects).toHaveBeenCalledWith(expect.objectContaining({where:{isDraft:false,noIndex:false,publishedAt:{not:null},contentMode:'HTML',publishedRevisionId:{not:null}}}));
});
