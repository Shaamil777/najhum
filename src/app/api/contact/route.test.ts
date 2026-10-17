import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";
const mocks = vi.hoisted(() => ({ verify: vi.fn(), create: vi.fn() }));
vi.mock("@/lib/security/turnstile", () => ({ verifyTurnstileToken: mocks.verify }));
vi.mock("@/lib/db/prisma", () => ({ prisma: { customer: { create: mocks.create } } }));
import { POST } from "./route";
const valid = { fullName: "Test Person", email: "person@example.test", country: "UAE", industry: "Test", solution: "IoTRICs", goals: "Verification test" };
const request = (extra: object) => new NextRequest("https://example.test/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...valid, ...extra }) });
beforeEach(() => { vi.resetAllMocks(); vi.spyOn(console, "log").mockImplementation(() => {}); });
afterEach(() => vi.restoreAllMocks());
it("rejects legacy client-supplied captcha answers without a verified token", async () => {
  mocks.verify.mockResolvedValue({ success: false, error: "Missing token" });
  expect((await POST(request({ captchaAnswer: "PASS", captchaExpected: "PASS" }))).status).toBe(400);
  expect(mocks.verify).toHaveBeenCalledWith("", undefined);
  expect(mocks.create).not.toHaveBeenCalled();
});
it("does not save a lead when Siteverify fails", async () => {
  mocks.verify.mockResolvedValue({ success: false });
  expect((await POST(request({ turnstileToken: "invalid" }))).status).toBe(400);
  expect(mocks.create).not.toHaveBeenCalled();
});
it("reports unavailable configuration without accepting the enquiry", async () => {
  mocks.verify.mockResolvedValue({ success: false, errorCodes: ["configuration-error"] });
  expect((await POST(request({ turnstileToken: "token" }))).status).toBe(503);
  expect(mocks.create).not.toHaveBeenCalled();
});
it("accepts a submission only after server verification succeeds", async () => {
  mocks.verify.mockResolvedValue({ success: true });
  mocks.create.mockResolvedValue({ id: "test-lead" });
  expect((await POST(request({ turnstileToken: "verified-token" }))).status).toBe(200);
  expect(mocks.verify).toHaveBeenCalledWith("verified-token", undefined);
  expect(mocks.create).toHaveBeenCalledOnce();
});
