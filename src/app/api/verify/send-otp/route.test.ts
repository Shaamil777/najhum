import { afterEach, beforeEach, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({ create: vi.fn() }));
vi.mock("twilio", () => ({
  default: () => ({ verify: { v2: { services: () => ({ verifications: { create: mocks.create } }) } } }),
}));
import { POST } from "./route";

const request = (channel?: string) => new Request("https://example.test/api/verify/send-otp", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ phone: "+971501234567", channel }),
});

beforeEach(() => {
  vi.resetAllMocks();
  vi.stubEnv("TWILIO_ACCOUNT_SID", "test-account");
  vi.stubEnv("TWILIO_AUTH_TOKEN", "test-token");
  vi.stubEnv("TWILIO_VERIFY_SERVICE_SID", "test-service");
  vi.spyOn(console, "error").mockImplementation(() => {});
});
afterEach(() => { vi.unstubAllEnvs(); vi.restoreAllMocks(); });

it.each([undefined, "whatsapp", "sms"])("uses WhatsApp even when the client channel is %s", async (channel) => {
  mocks.create.mockResolvedValue({ status: "pending", channel: "whatsapp" });
  const response = await POST(request(channel));
  expect(response.status).toBe(200);
  expect(mocks.create).toHaveBeenCalledExactlyOnceWith({ to: "+971501234567", channel: "whatsapp" });
  expect(await response.json()).toMatchObject({ channel: "whatsapp", success: true });
});

it("reports WhatsApp delivery failure without retrying through SMS", async () => {
  mocks.create.mockRejectedValue(new Error("WhatsApp delivery unavailable"));
  const response = await POST(request("whatsapp"));
  expect(response.status).toBe(400);
  expect(mocks.create).toHaveBeenCalledTimes(1);
  expect(await response.json()).toMatchObject({ error: "WhatsApp delivery unavailable" });
});
