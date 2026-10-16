import { describe, expect, it } from "vitest";
import { buildMetadata, jsonLdString, pageSchema, seoDescription } from "./seo";
import { pageSeo } from "@/content/page-seo";

describe("public page SEO",()=>{
  it("gives every public page its own canonical and matching social URL",()=>{
    const canonicals=Object.values(pageSeo).map(page=>{
      const metadata=buildMetadata(page);
      expect(metadata.alternates?.canonical).toBe(`https://najhumgroup.com${page.path==='/'?'/':page.path}`);
      expect(metadata.openGraph?.url).toBe(metadata.alternates?.canonical);
      expect(metadata.description).toBeTruthy();
      expect(metadata.keywords).toContain("Najhum");
      return metadata.alternates?.canonical;
    });
    expect(new Set(canonicals).size).toBe(canonicals.length);
  });
  it("keeps descriptions plain and concise without changing visible copy",()=>{
    const result=seoDescription('<p>Connected &amp; intelligent monitoring.</p> '+('A useful description of operational infrastructure. '.repeat(8)));
    expect(result).not.toContain('<');expect(result).toContain('Connected & intelligent monitoring.');expect(result.length).toBeLessThanOrEqual(160);
  });
  it("escapes user-authored structured content so it cannot close its script tag",()=>{
    const content={name:'</script><script>alert(1)</script>'};
    const encoded=jsonLdString(content);
    expect(encoded).not.toContain('<');expect(JSON.parse(encoded)).toEqual(content);
  });
  it("uses real section anchors and the requested legal publication date",()=>{
    const data=pageSchema(pageSeo.privacy,[{id:'section-1',name:'Who we are'}]);
    expect(data['@graph'][0]).toMatchObject({datePublished:'2025-11-29',hasPart:[{'@id':'https://najhumgroup.com/privacy-policy#section-1'}]});
  });
  it("prevents missing or private records from being indexed",()=>{
    const data=buildMetadata({title:'Not available',description:'No published content.',path:'/products/missing',noIndex:true});
    expect(data.robots).toMatchObject({index:false,follow:false,googleBot:{index:false,follow:false}});
  });
});
