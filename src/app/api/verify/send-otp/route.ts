import { NextResponse } from "next/server";
import twilio from "twilio";
import { normalizePhoneNumber, isValidE164 } from "@/lib/utils/phone";

export async function POST(req: Request) {
  try {
    const { phone, countryCode } = await req.json();

    if (!phone) {
      return NextResponse.json(
        { error: "Phone number is required." },
        { status: 400 }
      );
    }

    // Read environment variables dynamically at request time
    const accountSid = process.env.TWILIO_ACCOUNT_SID?.trim();
    const authToken = process.env.TWILIO_AUTH_TOKEN?.trim();
    const verifyServiceSid = process.env.TWILIO_VERIFY_SERVICE_SID?.trim();

    // Robust E.164 normalization stripping local trunk 0s and fixing country code issues
    const formattedPhone = normalizePhoneNumber(phone, countryCode || "+971");

    if (!isValidE164(formattedPhone)) {
      return NextResponse.json(
        { error: "Please enter a valid phone number with the correct country code." },
        { status: 400 }
      );
    }

    if (!accountSid || !authToken || !verifyServiceSid) {
      console.warn("Twilio credentials missing. Mocking success for OTP send.");
      return NextResponse.json({
        success: true,
        formattedPhone,
        message: "Mock OTP sent (Twilio credentials not configured in .env). Use 123456 to verify.",
        mock: true,
      });
    }

    const client = twilio(accountSid, authToken);

    // Brochure verification uses WhatsApp only; surface delivery failures without sending SMS.
    const verification = await client.verify.v2
      .services(verifyServiceSid)
      .verifications.create({ to: formattedPhone, channel: "whatsapp" });

    return NextResponse.json({
      success: true,
      formattedPhone,
      status: verification.status,
      channel: verification.channel,
    });
  } catch (error: unknown) {
    console.error("Twilio send error:", error);

    // Handle known Twilio error codes gracefully
    const twilioErr = error as { code?: number; status?: number; message?: string };
    if (twilioErr?.code === 60200) {
      return NextResponse.json(
        { error: "Invalid phone number. Please check the country code and digits." },
        { status: 400 }
      );
    }
    if (twilioErr?.code === 60203) {
      return NextResponse.json(
        { error: "Maximum send attempts reached for this number. Please wait a few minutes before trying again." },
        { status: 429 }
      );
    }
    if (twilioErr?.code === 60220 || twilioErr?.code === 20429) {
      return NextResponse.json(
        { error: "Rate limit exceeded. Please wait a few moments and try again." },
        { status: 429 }
      );
    }

    const message = error instanceof Error ? error.message : "Failed to send verification code.";
    return NextResponse.json(
      { error: message },
      { status: 400 }
    );
  }
}

