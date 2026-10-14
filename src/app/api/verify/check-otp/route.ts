import { NextResponse } from "next/server";
import twilio from "twilio";
import { prisma } from "@/lib/db/prisma";

// These should be configured in .env
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
    const { phone, code, name, productName, brochureUrl } = await req.json();

    if (!phone || !code) {
      return NextResponse.json(
        { error: "Phone number and code are required" },
        { status: 400 }
      );
    }

    const formattedPhone = formatE164(phone);
    const customerName = (name && typeof name === "string" && name.trim()) ? name.trim() : "Brochure Visitor";

    // 1. Check if Twilio is configured
    if (!accountSid || !authToken || !verifyServiceSid) {
      console.warn("Twilio credentials missing. Mocking success for OTP verify.");
      // MOCK SUCCESS FOR TESTING without credentials (assume 123456 is correct)
      if (code === "123456") {
        try {
          await prisma.customer.create({
            data: {
              name: customerName,
              phone: formattedPhone,
              productName: productName || undefined,
              brochureUrl: brochureUrl || undefined,
              source: "brochure_download",
              verified: true,
            },
          });
        } catch (dbErr) {
          console.error("Failed to save mock customer to DB:", dbErr);
        }
        return NextResponse.json({ success: true, status: "approved", mock: true });
      } else {
        return NextResponse.json(
          { error: "Invalid mock OTP. Use 123456" },
          { status: 400 }
        );
      }
    }

    // 2. Real Twilio verification
    const client = twilio(accountSid, authToken);

    const verificationCheck = await client.verify.v2
      .services(verifyServiceSid)
      .verificationChecks.create({ to: formattedPhone, code });

    if (verificationCheck.status === "approved") {
      try {
        await prisma.customer.create({
          data: {
            name: customerName,
            phone: formattedPhone,
            productName: productName || undefined,
            brochureUrl: brochureUrl || undefined,
            source: "brochure_download",
            verified: true,
          },
        });
      } catch (dbErr) {
        console.error("Failed to save customer lead to DB:", dbErr);
      }

      return NextResponse.json({ success: true, status: "approved" });
    } else {
      return NextResponse.json(
        { error: "Invalid OTP code" },
        { status: 400 }
      );
    }
  } catch (error: unknown) {
    console.error("Twilio verify error:", error);
    const message = error instanceof Error ? error.message : "Failed to verify OTP";
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
