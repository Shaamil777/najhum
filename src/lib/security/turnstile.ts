/**
 * Cloudflare Turnstile Server-side Verification
 * 
 * Validates Turnstile challenge tokens against Cloudflare's siteverify API.
 * Free tier supports unlimited challenges with privacy-preserving bot defense.
 */

interface TurnstileVerifyResponse {
  success: boolean;
  "error-codes"?: string[];
  challenge_ts?: string;
  hostname?: string;
  action?: string;
  cdata?: string;
}

export interface TurnstileResult {
  success: boolean;
  error?: string;
  errorCodes?: string[];
}

// Cloudflare official universal "Always Passes" test secret key for development & testing
const CLOUDFLARE_TEST_SECRET_KEY = "1x0000000000000000000000000000000AA";

/**
 * Verifies a Cloudflare Turnstile token
 *
 * @param token The token received from the Turnstile client widget
 * @param remoteIp Optional IP address of the client making the request
 * @returns Verification result object
 */
export async function verifyTurnstileToken(
  token: string,
  remoteIp?: string
): Promise<TurnstileResult> {
  if (typeof token !== "string" || !token.trim() || token.length > 2048) {
    return {
      success: false,
      error: "Verification token is missing. Please complete the security check.",
    };
  }

  const secretKey =
    process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY?.trim() ||
    (process.env.NODE_ENV !== "production" ? CLOUDFLARE_TEST_SECRET_KEY : "");

  if (!secretKey || (process.env.NODE_ENV === "production" && /^[123]x0+/.test(secretKey))) {
    console.error("[TURNSTILE_CONFIGURATION_ERROR] A production secret key is required.");
    return { success: false, error: "Security verification is unavailable. Please contact us by email.", errorCodes: ["configuration-error"] };
  }

  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  try {
    const formData = new URLSearchParams();
    formData.append("secret", secretKey);
    formData.append("response", token.trim());
    if (remoteIp) {
      formData.append("remoteip", remoteIp);
    }

    const controller = new AbortController();
    timeoutId = setTimeout(() => controller.abort(), 8000); // 8-second timeout

    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        cache: "no-store",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData.toString(),
        signal: controller.signal,
      }
    );

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.error(
        `[TURNSTILE_API_ERROR] Cloudflare HTTP error ${response.status}: ${response.statusText}`
      );
      return {
        success: false,
        error: "Security verification server could not be reached. Please try again.",
      };
    }

    const data: TurnstileVerifyResponse = await response.json();

    if (!data.success) {
      console.warn("[TURNSTILE_VERIFY_FAILED]", {
        errorCodes: data["error-codes"],
        hostname: data.hostname,
      });

      return {
        success: false,
        error: "Security verification failed. Please refresh and try again.",
        errorCodes: data["error-codes"],
      };
    }

    return {
      success: true,
    };
  } catch (error: unknown) {
    if (error instanceof Error && error.name === "AbortError") {
      console.error("[TURNSTILE_TIMEOUT] Verification request timed out.");
      return {
        success: false,
        error: "Verification timed out. Please check your network connection.",
      };
    }

    console.error("[TURNSTILE_UNEXPECTED_ERROR]", error);
    return {
      success: false,
      error: "An unexpected error occurred during security verification.",
    };
  } finally {
    clearTimeout(timeoutId);
  }
}
