import { NextResponse } from "next/server";
import twilio from "twilio";

// These should be configured in .env
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const verifyServiceSid = process.env.TWILIO_VERIFY_SERVICE_SID;

export async function POST(req: Request) {
  try {
    const { phone, code } = await req.json();

    if (!phone || !code) {
      return NextResponse.json(
        { error: "Phone number and code are required" },
        { status: 400 }
      );
    }

    if (!accountSid || !authToken || !verifyServiceSid) {
      console.warn("Twilio credentials missing. Mocking success for OTP verify.");
      // MOCK SUCCESS FOR TESTING without credentials (assume 123456 is correct)
      if (code === "123456") {
        return NextResponse.json({ success: true, status: "approved" });
      } else {
        return NextResponse.json(
          { error: "Invalid mock OTP. Use 123456" },
          { status: 400 }
        );
      }
    }

    const client = twilio(accountSid, authToken);

    const verificationCheck = await client.verify.v2
      .services(verifyServiceSid)
      .verificationChecks.create({ to: phone, code });

    if (verificationCheck.status === "approved") {
      return NextResponse.json({ success: true, status: "approved" });
    } else {
      return NextResponse.json(
        { error: "Invalid OTP code" },
        { status: 400 }
      );
    }
  } catch (error: any) {
    console.error("Twilio verify error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to verify OTP" },
      { status: 500 }
    );
  }
}
