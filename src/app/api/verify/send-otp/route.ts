import { NextResponse } from "next/server";
import twilio from "twilio";

// These should be configured in .env
// We mock a successful response if they are not provided so the UI can be tested
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const verifyServiceSid = process.env.TWILIO_VERIFY_SERVICE_SID;

export async function POST(req: Request) {
  try {
    const { phone } = await req.json();

    if (!phone) {
      return NextResponse.json(
        { error: "Phone number is required" },
        { status: 400 }
      );
    }

    if (!accountSid || !authToken || !verifyServiceSid) {
      console.warn("Twilio credentials missing. Mocking success for OTP send.");
      // MOCK SUCCESS FOR TESTING without credentials
      return NextResponse.json({ success: true, message: "Mock OTP sent" });
    }

    const client = twilio(accountSid, authToken);

    const verification = await client.verify.v2
      .services(verifyServiceSid)
      .verifications.create({ to: phone, channel: "sms" });

    return NextResponse.json({ success: true, status: verification.status });
  } catch (error: any) {
    console.error("Twilio send error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to send OTP" },
      { status: 500 }
    );
  }
}
