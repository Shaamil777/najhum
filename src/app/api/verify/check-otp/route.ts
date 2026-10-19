import { NextResponse } from "next/server";
import twilio from "twilio";
import { prisma } from "@/lib/db/prisma";
import { normalizePhoneNumber } from "@/lib/utils/phone";

export async function POST(req: Request) {
  try {
    const { phone, countryCode, code, name, productName, brochureUrl } = await req.json();

    if (!phone || !code) {
      return NextResponse.json(
        { error: "Phone number and verification code are required." },
        { status: 400 }
      );
    }

    // Read environment variables dynamically at request time
    const accountSid = process.env.TWILIO_ACCOUNT_SID?.trim();
    const authToken = process.env.TWILIO_AUTH_TOKEN?.trim();
    const verifyServiceSid = process.env.TWILIO_VERIFY_SERVICE_SID?.trim();

    // Use identical normalization logic to match the registered verification session
    const formattedPhone = normalizePhoneNumber(phone, countryCode || "+971");
    const customerName = (name && typeof name === "string" && name.trim()) ? name.trim() : "Brochure Visitor";
    const cleanCode = String(code).trim();

    // 1. Check if Twilio is configured
    if (!accountSid || !authToken || !verifyServiceSid) {
      console.warn("Twilio credentials missing. Mocking success for OTP verify.");
      if (cleanCode === "123456") {
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
          { error: "Invalid mock OTP. Please enter 123456" },
          { status: 400 }
        );
      }
    }

    // 2. Real Twilio verification check
    const client = twilio(accountSid, authToken);

    try {
      const verificationCheck = await client.verify.v2
        .services(verifyServiceSid)
        .verificationChecks.create({ to: formattedPhone, code: cleanCode });

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
          { error: "Incorrect verification code. Please try again." },
          { status: 400 }
        );
      }
    } catch (checkErr: unknown) {
      const twilioErr = checkErr as { code?: number; status?: number; message?: string };

      // Twilio error 20404: Session expired, already verified, or phone number mismatch
      if (twilioErr?.code === 20404 || twilioErr?.status === 404) {
        return NextResponse.json(
          { error: "Verification code has expired or is invalid. Please request a new code." },
          { status: 400 }
        );
      }

      // Twilio error 60202: Max verification attempts reached
      if (twilioErr?.code === 60202) {
        return NextResponse.json(
          { error: "Maximum verification attempts exceeded. Please request a new code." },
          { status: 400 }
        );
      }

      throw checkErr;
    }
  } catch (error: unknown) {
    console.error("Twilio verify error:", error);
    const message = error instanceof Error ? error.message : "Failed to verify OTP code.";
    return NextResponse.json(
      { error: message },
      { status: 400 }
    );
  }
}

