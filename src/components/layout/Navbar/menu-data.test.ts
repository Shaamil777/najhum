import { describe, expect, it } from "vitest";
import { buildSolutionGroups } from "./menu-data";

describe("published solution classification", () => {
  it("groups arbitrary published solutions using saved classification", () => {
    const groups = buildSolutionGroups([
      { title: "New sector", slug: "new-sector", metaDescription: null, classification: "INDUSTRY" },
      { title: "New application", slug: "new-application", metaDescription: null, classification: "USE_CASE" },
      { title: "Shared solution", slug: "shared", metaDescription: null, classification: "BOTH" },
    ]);
    expect(groups.industry.items.map(item => item.href)).toEqual(["/solutions/new-sector", "/solutions/shared"]);
    expect(groups.usecase.items.map(item => item.href)).toEqual(["/solutions/new-application", "/solutions/shared"]);
    expect(groups.industry.featured.href).toBe("/solutions/new-sector");
    expect(groups.usecase.featured.href).toBe("/solutions/new-application");
  });
  it("does not force known slugs into a use-case group", () => {
    const groups = buildSolutionGroups([{ title: "Energy", slug: "energy-monitoring", metaDescription: null, classification: "INDUSTRY" }]);
    expect(groups.usecase.items).toEqual([]);
    expect(groups.usecase.featured).toBeUndefined();
  });
  it("does not invent links when no solutions are published", () => {
    const groups = buildSolutionGroups([]);
    expect(groups.industry.items).toEqual([]);
    expect(groups.usecase.items).toEqual([]);
    expect(groups.industry.featured).toBeUndefined();
    expect(groups.usecase.featured).toBeUndefined();
  });
});
