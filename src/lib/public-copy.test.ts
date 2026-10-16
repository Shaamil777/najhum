import { describe, expect, it } from "vitest";
import { formatPublicCopy, formatPublicText } from "./public-copy";
describe("published copy formatting", () => {
  it("uses canonical names and UK spelling in database copy", () => {
    expect(formatPublicText("IoTRICS and CropifAI optimize energy. Evoltics Optimization.")).toBe("IoTRICs and cropifAI optimise energy. EVOLTICS Optimisation.");
  });
  it("preserves routes, platform keys, model codes and HTML links", () => {
    const value = { slug: "cropifai", platforms: ["iotrics"], model: "IOTRICS-01", href: "/platforms/iotrics", body: '<a href="/images/CropifAI.png">CropifAI</a>', heading: "CropifAI" };
    expect(formatPublicCopy(value)).toEqual({ ...value, heading: "cropifAI", body: '<a href="/images/CropifAI.png">cropifAI</a>' });
  });
});
