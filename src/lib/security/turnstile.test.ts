import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { verifyTurnstileToken } from "./turnstile";
const fetchMock = vi.fn();
beforeEach(() => {
  vi.stubEnv("NODE_ENV", "production");
  vi.stubEnv("CLOUDFLARE_TURNSTILE_SECRET_KEY", "example-real-secret");
  vi.stubGlobal("fetch", fetchMock);
  fetchMock.mockReset();
  vi.spyOn(console, "warn").mockImplementation(() => {});
  vi.spyOn(console, "error").mockImplementation(() => {});
});
afterEach(() => { vi.restoreAllMocks(); vi.unstubAllEnvs(); vi.unstubAllGlobals(); });
it("does not call Cloudflare without a usable token", async () => {
  expect((await verifyTurnstileToken("")).success).toBe(false);
  expect((await verifyTurnstileToken("x".repeat(2049))).success).toBe(false);
  expect(fetchMock).not.toHaveBeenCalled();
});
it.each(["", "1x0000000000000000000000000000000AA", "2x0000000000000000000000000000000AA"])("rejects missing or test production secrets: %s", async secret => {
  vi.stubEnv("CLOUDFLARE_TURNSTILE_SECRET_KEY", secret);
  expect(await verifyTurnstileToken("token")).toMatchObject({ success: false, errorCodes: ["configuration-error"] });
  expect(fetchMock).not.toHaveBeenCalled();
});
it("posts each token to Siteverify using the server secret", async () => {
  fetchMock.mockResolvedValue(new Response(JSON.stringify({ success: true })));
  expect(await verifyTurnstileToken(" token ", "192.0.2.1")).toEqual({ success: true });
  const [url, options] = fetchMock.mock.calls[0];
  expect(url).toBe("https://challenges.cloudflare.com/turnstile/v0/siteverify");
  expect(options.method).toBe("POST");
  expect(options.cache).toBe("no-store");
  expect(Object.fromEntries(new URLSearchParams(options.body))).toEqual({ secret: "example-real-secret", response: "token", remoteip: "192.0.2.1" });
});
it("rejects expired or reused tokens", async () => {
  fetchMock.mockResolvedValue(new Response(JSON.stringify({ success: false, "error-codes": ["timeout-or-duplicate"] })));
  expect(await verifyTurnstileToken("expired-token")).toMatchObject({ success: false, errorCodes: ["timeout-or-duplicate"] });
});
it("fails closed if Cloudflare is unavailable", async () => {
  fetchMock.mockResolvedValue(new Response("Unavailable", { status: 503 }));
  expect((await verifyTurnstileToken("token")).success).toBe(false);
});
