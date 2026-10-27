import { describe, expect, it } from "vitest";
import { getProductClassification } from "./product-classification";
import { matchesProductCategory } from "./product-filters";

describe("saved product classifications", () => {
  it("preserves saved platform selections even when a brochure model matches", () => {
    const classification = getProductClassification({ name: "Najhum AI Occupancy Sensor", platforms: ["iotrics", "evoltics", "cropifai"], details: { model: "NT321" } });
    expect(classification).toEqual({ platforms: ["iotrics", "evoltics", "cropifai"], category: "Hardware" });
    expect(matchesProductCategory(classification, "Hardware")).toBe(true);
    expect(matchesProductCategory(classification, "evoltics")).toBe(true);
  });
  it("does not restore brochure platforms when an administrator clears the selections", () => {
    const classification = getProductClassification({ name: "Najhum AI Occupancy Sensor", platforms: [], details: { model: "NT321" } });
    expect(classification.platforms).toEqual([]);
    expect(matchesProductCategory(classification, "iotrics")).toBe(false);
  });
  it("preserves explicitly categorised non-catalogue software", () => {
    const classification = getProductClassification({ name: "Site analytics", platforms: ["IoTRICs"], details: { category: "Software" } });
    expect(matchesProductCategory(classification, "Software")).toBe(true);
    expect(matchesProductCategory(classification, "iotrics")).toBe(true);
    expect(matchesProductCategory(classification, "Hardware")).toBe(false);
  });
  it("does not invent classifications for an unknown product", () => {
    const classification = getProductClassification({ name: "New equipment", platforms: ["evoltics"] });
    expect(classification).toEqual({ platforms: ["evoltics"], category: "Other" });
    expect(matchesProductCategory(classification, "All")).toBe(true);
  });
});
