import { beforeEach, describe, expect, it, vi } from "vitest";
const db=vi.hoisted(()=>({findFirst:vi.fn(),findMany:vi.fn()}));
vi.mock("@/lib/db/prisma",()=>({prisma:{product:db}}));
import { getPublishedProductBySlug } from "./published-product";
beforeEach(()=>vi.resetAllMocks());
describe("published product URLs",()=>{
  it("resolves punctuation-normalised product card slugs without exposing drafts",async()=>{
    const product={id:"sensor-1",name:"Najhum UV/IR Flame Detector",isDraft:false};
    db.findFirst.mockResolvedValueOnce(null).mockResolvedValueOnce(product);
    db.findMany.mockResolvedValue([{id:product.id,name:product.name}]);
    expect(await getPublishedProductBySlug("najhum-uv-ir-flame-detector")).toEqual(product);
    expect(db.findMany).toHaveBeenCalledWith({where:{isDraft:false},select:{id:true,name:true}});
    expect(db.findFirst).toHaveBeenLastCalledWith({where:{id:"sensor-1",isDraft:false}});
  });
  it("returns no record for malformed URLs or an unmatched published slug",async()=>{
    expect(await getPublishedProductBySlug("%invalid")).toBeNull();
    expect(db.findFirst).not.toHaveBeenCalled();
    db.findFirst.mockResolvedValue(null);db.findMany.mockResolvedValue([]);
    expect(await getPublishedProductBySlug("missing-product")).toBeNull();
  });
});
