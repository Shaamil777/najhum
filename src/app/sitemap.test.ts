import { beforeEach, describe, expect, it, vi } from "vitest";
const db=vi.hoisted(()=>({solutions:vi.fn(),products:vi.fn()}));
vi.mock("@/lib/db/prisma",()=>({prisma:{solution:{findMany:db.solutions},product:{findMany:db.products}}}));
import sitemap from "./sitemap";
beforeEach(()=>vi.resetAllMocks());
describe("public sitemap",()=>{
  it("includes published products and solutions with their canonical slugs",async()=>{
    db.solutions.mockResolvedValue([{slug:"cold-storage",updatedAt:new Date('2025-11-29')}]);
    db.products.mockResolvedValue([{id:"p1",name:"Najhum UV/IR Flame Detector",updatedAt:new Date('2025-11-29')}]);
    const urls=(await sitemap()).map(entry=>entry.url);
    expect(urls).toContain('https://najhumgroup.com/products/najhum-uv-ir-flame-detector');
    expect(urls).toContain('https://najhumgroup.com/solutions/cold-storage');
    expect(urls).not.toContain('https://najhumgroup.com/platforms');
    expect(db.solutions).toHaveBeenCalledWith(expect.objectContaining({where:{isDraft:false}}));
    expect(db.products).toHaveBeenCalledWith(expect.objectContaining({where:{isDraft:false}}));
  });
  it("keeps static pages discoverable if the database is unavailable",async()=>{
    db.solutions.mockRejectedValue(new Error('unavailable'));db.products.mockRejectedValue(new Error('unavailable'));
    const urls=(await sitemap()).map(entry=>entry.url);
    expect(urls).toHaveLength(10);expect(urls).toContain('https://najhumgroup.com/privacy-policy');
  });
});
