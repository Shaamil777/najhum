import { describe, it, expect } from "vitest";
import { normalizePhoneNumber, isValidE164 } from "./phone";

describe("phone normalization and E.164 validation", () => {
  it("normalizes UAE local numbers with leading zero", () => {
    expect(normalizePhoneNumber("0501234567", "+971")).toBe("+971501234567");
    expect(normalizePhoneNumber("050 123 4567", "+971")).toBe("+971501234567");
    expect(normalizePhoneNumber("501234567", "+971")).toBe("+971501234567");
  });

  it("handles numbers already with + prefix and redundant trunk zero", () => {
    expect(normalizePhoneNumber("+971501234567", "+971")).toBe("+971501234567");
    expect(normalizePhoneNumber("+9710501234567", "+971")).toBe("+971501234567");
  });

  it("handles numbers typed with country code but missing + prefix", () => {
    expect(normalizePhoneNumber("971501234567", "+971")).toBe("+971501234567");
    expect(normalizePhoneNumber("9710501234567", "+971")).toBe("+971501234567");
  });

  it("handles international 00 prefix", () => {
    expect(normalizePhoneNumber("00971501234567", "+971")).toBe("+971501234567");
    expect(normalizePhoneNumber("009710501234567", "+971")).toBe("+971501234567");
  });

  it("handles other countries and dial codes with hyphens", () => {
    expect(normalizePhoneNumber("07123456789", "+44")).toBe("+447123456789");
    expect(normalizePhoneNumber("9876543210", "+91")).toBe("+919876543210");
    expect(normalizePhoneNumber("1234567", "+1-684")).toBe("+16841234567");
  });

  it("validates standard E.164 format", () => {
    expect(isValidE164("+971501234567")).toBe(true);
    expect(isValidE164("+447123456789")).toBe(true);
    expect(isValidE164("0501234567")).toBe(false);
    expect(isValidE164("+0123456")).toBe(false);
    expect(isValidE164("")).toBe(false);
  });
});
