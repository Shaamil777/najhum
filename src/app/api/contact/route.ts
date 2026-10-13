import { NextRequest, NextResponse } from "next/server";

interface ContactRequestBody {
  fullName: string;
  companyName?: string;
  email: string;
  phoneCountryCode?: string;
  phone?: string;
  country: string;
  industry: string;
  solution: string;
  goals: string;
  captchaAnswer: string;
  captchaExpected: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactRequestBody = await request.json();

    const {
      fullName,
      companyName,
      email,
      phoneCountryCode,
      phone,
      country,
      industry,
      solution,
      goals,
      captchaAnswer,
      captchaExpected,
    } = body;

    // Validate required fields
    if (!fullName || !fullName.trim()) {
      return NextResponse.json(
        { error: "Full Name is required." },
        { status: 400 }
      );
    }

    if (!email || !email.trim()) {
      return NextResponse.json(
        { error: "Business Email is required." },
        { status: 400 }
      );
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    if (!country || !country.trim()) {
      return NextResponse.json(
        { error: "Please select your country." },
        { status: 400 }
      );
    }

    if (!industry || !industry.trim()) {
      return NextResponse.json(
        { error: "Please select your industry." },
        { status: 400 }
      );
    }

    if (!solution || !solution.trim()) {
      return NextResponse.json(
        { error: "Please select an interested solution." },
        { status: 400 }
      );
    }

    if (!goals || !goals.trim()) {
      return NextResponse.json(
        { error: "Please provide details about your project or requirements." },
        { status: 400 }
      );
    }

    // Validate Captcha (case-insensitive)
    if (!captchaAnswer || !captchaExpected) {
      return NextResponse.json(
        { error: "Please complete the captcha verification." },
        { status: 400 }
      );
    }

    if (captchaAnswer.trim().toUpperCase() !== captchaExpected.trim().toUpperCase()) {
      return NextResponse.json(
        { error: "Invalid captcha code. Please try again." },
        { status: 400 }
      );
    }

    const fullPhoneNumber = phone && phone.trim() 
      ? `${phoneCountryCode || "+971"} ${phone.trim()}`
      : "Not provided";

    // Log the contact submission
    console.log("[CONTACT_FORM_SUBMISSION]", {
      timestamp: new Date().toISOString(),
      fullName: fullName.trim(),
      companyName: companyName?.trim() || "Not provided",
      email: email.trim(),
      phone: fullPhoneNumber,
      country: country.trim(),
      industry: industry.trim(),
      solution: solution.trim(),
      goals: goals.trim(),
    });

    return NextResponse.json({
      success: true,
      message: "Thank you for reaching out. Our team has received your enquiry and will respond within 24 hours.",
    });
  } catch (error: unknown) {
    console.error("[CONTACT_API_ERROR]", error);
    const errorMessage = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json(
      { error: "Failed to submit enquiry. " + errorMessage },
      { status: 500 }
    );
  }
}
