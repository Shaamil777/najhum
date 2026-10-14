import { NextResponse } from "next/server";
import twilio from "twilio";

// These should be configured in .env
// We mock a successful response if they are not provided so the UI can be tested
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const verifyServiceSid = process.env.TWILIO_VERIFY_SERVICE_SID;

function formatE164(phone: string): string {
  const cleaned = phone.trim().replace(/[^\d+]/g, "");
  if (!cleaned.startsWith("+")) {
    return "+" + cleaned;
  }
  return cleaned;
}

export async function POST(req: Request) {
  try {
    const { phone, channel = "whatsapp" } = await req.json();

    if (!phone) {
      return NextResponse.json(
        { error: "Phone number is required" },
        { status: 400 }
      );
    }

    const formattedPhone = formatE164(phone);

    if (!accountSid || !authToken || !verifyServiceSid) {
      console.warn("Twilio credentials missing. Mocking success for OTP send.");
      // MOCK SUCCESS FOR TESTING without credentials
      return NextResponse.json({
        success: true,
        message: "Mock OTP sent (Twilio credentials not configured in .env)",
        mock: true,
      });
    }

    const client = twilio(accountSid, authToken);

    // Try WhatsApp first, with automatic fallback to SMS
    const preferredChannel = channel === "sms" ? "sms" : "whatsapp";
    let verification;

    try {
      verification = await client.verify.v2
        .services(verifyServiceSid)
        .verifications.create({ to: formattedPhone, channel: preferredChannel });
    } catch (err: unknown) {
      const errMessage = err instanceof Error ? err.message : String(err);
      if (preferredChannel === "whatsapp") {
        console.warn("WhatsApp OTP delivery failed, falling back to SMS:", errMessage);
        verification = await client.verify.v2
          .services(verifyServiceSid)
          .verifications.create({ to: formattedPhone, channel: "sms" });
      } else {
        throw err;
      }
    }

    return NextResponse.json({
      success: true,
      status: verification.status,
      channel: verification.channel,
    });
  } catch (error: unknown) {
    console.error("Twilio send error:", error);
    const message = error instanceof Error ? error.message : "Failed to send OTP";
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
