import { describe, expect, it } from "vitest";
import { buildSolutionGroups } from "./menu-data";

describe("published navigation destinations", () => {
  it("uses published solutions without adding unavailable default links", () => {
    const groups = buildSolutionGroups([{ title: "Custom site monitoring", slug: "custom-site", metaDescription: "A custom published solution" }]);
    expect(groups.industry.items.map(item => item.href)).toEqual(["/solutions/custom-site"]);
    expect(groups.usecase.items).toEqual([]);
    expect(groups.industry.featured.href).toBe("/solutions/custom-site");
    expect(groups.usecase.featured.href).toBe("/solutions/custom-site");
  });
  it("includes only use cases whose destination is published", () => {
    const groups = buildSolutionGroups([{ title: "Energy", slug: "energy-monitoring", metaDescription: null }]);
    expect(groups.usecase.items.map(item => item.href)).toEqual(["/solutions/energy-monitoring"]);
    expect(groups.usecase.featured.href).toBe("/solutions/energy-monitoring");
  });
  it("provides working default destinations while published content loads", () => {
    const groups = buildSolutionGroups([]);
    expect(groups.industry.items).toHaveLength(5);
    expect(groups.usecase.items).toHaveLength(5);
    expect(groups.industry.featured.href).toBe("/solutions/hospitality");
    expect(groups.usecase.featured.href).toBe("/solutions/cold-storage");
  });
});
