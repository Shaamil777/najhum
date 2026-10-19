/**
 * Phone number normalization and E.164 validation utilities
 */

/**
 * Normalizes any user-entered phone number and country dial code into clean E.164 format.
 * 
 * Handles common edge cases:
 * - Local trunk zeros: UAE "050 123 4567" + "+971" -> "+971501234567"
 * - Already typed full number: "+971 50 123 4567" -> "+971501234567"
 * - Country code typed without plus: "971501234567" + "+971" -> "+971501234567"
 * - International "00" prefix: "00971501234567" -> "+971501234567"
 * - Dial codes with hyphens in list: "+1-684" -> "+1684"
 * - Extraneous spaces, parentheses, dashes
 */
export function normalizePhoneNumber(rawPhone: string, countryCode = "+971"): string {
  if (!rawPhone || typeof rawPhone !== "string") return "";

  const trimmed = rawPhone.trim();
  if (!trimmed) return "";

  // Normalize country dial code: keep only '+' and digits (e.g. "+1-684" -> "+1684")
  const cleanCountryDigits = countryCode.replace(/[^\d]/g, "");
  const cleanCountryCode = cleanCountryDigits ? `+${cleanCountryDigits}` : "+971";

  // Case 1: Phone starts with '+' (User already typed full international number)
  if (trimmed.startsWith("+")) {
    const cleaned = "+" + trimmed.replace(/[^\d]/g, "");
    // Remove local trunk zero after country code if present (e.g. "+971050..." -> "+97150...")
    if (cleanCountryDigits && cleaned.startsWith(`${cleanCountryCode}0`)) {
      return `${cleanCountryCode}${cleaned.slice((cleanCountryCode + "0").length)}`;
    }
    return cleaned;
  }

  // Case 2: Phone starts with international '00' prefix (e.g. "0097150...")
  if (trimmed.startsWith("00")) {
    const cleaned = "+" + trimmed.slice(2).replace(/[^\d]/g, "");
    if (cleanCountryDigits && cleaned.startsWith(`${cleanCountryCode}0`)) {
      return `${cleanCountryCode}${cleaned.slice((cleanCountryCode + "0").length)}`;
    }
    return cleaned;
  }

  // Extract all digits from user input
  let digits = trimmed.replace(/[^\d]/g, "");
  if (!digits) return "";

  // Case 3: User typed country code digits without plus (e.g. "971501234567" with code "+971")
  if (cleanCountryDigits && digits.startsWith(cleanCountryDigits)) {
    let localPart = digits.slice(cleanCountryDigits.length);
    // Strip trunk zero if present (e.g. "971050..." -> "50...")
    localPart = localPart.replace(/^0+/, "");
    return `${cleanCountryCode}${localPart}`;
  }

  // Case 4: Standard local input, strip leading trunk zero (e.g. "0501234567" -> "501234567")
  digits = digits.replace(/^0+/, "");

  return `${cleanCountryCode}${digits}`;
}

/**
 * Validates whether a phone number matches standard E.164 format:
 * '+' followed by 7 to 15 digits, starting with a non-zero digit.
 */
export function isValidE164(phone: string): boolean {
  if (!phone || typeof phone !== "string") return false;
  return /^\+[1-9]\d{6,14}$/.test(phone);
}
