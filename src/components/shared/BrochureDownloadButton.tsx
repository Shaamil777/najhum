"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Download, X, ChevronDown, RotateCcw } from "lucide-react";
import { ALL_COUNTRY_CODES } from "@/content/countryDialCodes";
import { normalizePhoneNumber, isValidE164 } from "@/lib/utils/phone";

interface BrochureDownloadButtonProps {
  brochureUrl?: string | null;
  productName?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
  label?: string;
}

export default function BrochureDownloadButton({
  brochureUrl,
  productName,
  className = "",
  size = "md",
  label = "Download Brochure",
}: BrochureDownloadButtonProps) {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [phoneCountryCode, setPhoneCountryCode] = useState("+971");
  const [phone, setPhone] = useState("");
  const [submittedPhone, setSubmittedPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [error, setError] = useState("");

  // Countdown timer for resend
  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => {
      setCooldown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  const handleDownloadClick = () => {
    if (!brochureUrl) {
      alert("No brochure available for this product.");
      return;
    }
    const isVerified = localStorage.getItem("is_phone_verified");
    if (isVerified === "true") {
      window.open(brochureUrl, "_blank");
    } else {
      setShowModal(true);
      setStep("phone");
      setError("");
      setName("");
      setPhone("");
      setPhoneCountryCode("+971");
      setSubmittedPhone("");
      setOtp("");
      setCooldown(0);
    }
  };

  const handleSendOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }

    const cleanDigits = phone.trim().replace(/[^\d]/g, "");
    if (!cleanDigits || cleanDigits.length < 5) {
      setError("Please enter a valid mobile number.");
      return;
    }

    const fullPhone = normalizePhoneNumber(phone, phoneCountryCode);
    if (!isValidE164(fullPhone)) {
      setError("Please verify the country code and phone number format.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/verify/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          phone: fullPhone, 
          countryCode: phoneCountryCode,
          channel: "whatsapp"
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send verification code.");

      const activePhone = data.formattedPhone || fullPhone;
      setSubmittedPhone(activePhone);
      setStep("otp");
      setCooldown(30); // 30s resend cooldown
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to send verification code.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (cooldown > 0 || resending) return;
    setResending(true);
    setError("");

    try {
      const targetPhone = submittedPhone || normalizePhoneNumber(phone, phoneCountryCode);
      const res = await fetch("/api/verify/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          phone: targetPhone, 
          countryCode: phoneCountryCode,
          channel: "whatsapp"
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to resend code.");

      setCooldown(30);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to resend code.";
      setError(msg);
    } finally {
      setResending(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = otp.trim();

    if (!cleanCode) {
      setError("Please enter the 6-digit verification code.");
      return;
    }

    setLoading(true);
    setError("");

    const targetPhone = submittedPhone || normalizePhoneNumber(phone, phoneCountryCode);

    try {
      const res = await fetch("/api/verify/check-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: targetPhone,
          countryCode: phoneCountryCode,
          code: cleanCode,
          name: name.trim(),
          productName,
          brochureUrl,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Invalid verification code.");

      // Success
      localStorage.setItem("is_phone_verified", "true");
      setShowModal(false);
      window.open(brochureUrl!, "_blank");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Invalid verification code.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        onClick={handleDownloadClick}
        variant="outline"
        size={size}
        className={`gap-2 ${className}`}
      >
        <Download className="w-4 h-4" /> {label}
      </Button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {step === "phone" ? "Mobile Verification" : "Enter Verification Code"}
              </h2>
              <p className="text-gray-500 mb-6 text-sm">
                {step === "phone"
                  ? "Enter your name and WhatsApp number to receive your OTP and download the brochure."
                  : `We sent a 6-digit verification code via WhatsApp to ${submittedPhone || phone}.`}
              </p>

              {error && (
                <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-md border border-red-100">
                  {error}
                </div>
              )}

              {step === "phone" ? (
                <form onSubmit={handleSendOtp} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      className="w-full h-10 px-4 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-900"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      WhatsApp Number *
                    </label>
                    <div className="flex gap-2">
                      <div className="relative w-24 shrink-0">
                        {/* Visible clean badge: JUST THE NUMBER, matching contact form */}
                        <div
                          className="w-full h-10 px-3 flex items-center justify-between text-sm rounded-md bg-white border border-gray-300 text-gray-900 pointer-events-none"
                          aria-hidden="true"
                        >
                          <span className="font-medium text-gray-900">{phoneCountryCode}</span>
                          <ChevronDown className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                        </div>
                        {/* Invisible full native select with all countries */}
                        <select
                          id="modalPhoneCountryCode"
                          value={phoneCountryCode}
                          onChange={(e) => setPhoneCountryCode(e.target.value)}
                          aria-label="Country Dial Code"
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        >
                          {ALL_COUNTRY_CODES.map((c, idx) => (
                            <option key={`${c.name}-${c.code}-${idx}`} value={c.code}>
                              {c.name} ({c.code})
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="flex-1 min-w-0">
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="50 123 4567"
                          className="w-full h-10 px-4 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-900"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <Button type="submit" className="w-full cursor-pointer" disabled={loading}>
                    {loading ? "Sending Code..." : "Send WhatsApp Code"}
                  </Button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtp} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      6-Digit Code
                    </label>
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="123456"
                      className="w-full h-10 px-4 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-900 tracking-widest text-center text-lg font-mono"
                      required
                      maxLength={6}
                      autoFocus
                    />
                  </div>

                  <Button type="submit" className="w-full cursor-pointer" disabled={loading}>
                    {loading ? "Verifying..." : "Verify & Download Brochure"}
                  </Button>

                  <div className="flex items-center justify-between pt-2">
                    <button
                      type="button"
                      onClick={handleResendOtp}
                      disabled={cooldown > 0 || resending}
                      className={`text-xs inline-flex items-center gap-1 font-medium transition-colors ${
                        cooldown > 0 || resending
                          ? "text-gray-400 cursor-not-allowed"
                          : "text-blue-600 hover:text-blue-800 cursor-pointer"
                      }`}
                    >
                      <RotateCcw className={`w-3 h-3 ${resending ? "animate-spin" : ""}`} />
                      {cooldown > 0 ? `Resend code in ${cooldown}s` : "Resend code"}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setStep("phone");
                        setError("");
                      }}
                      className="text-xs text-gray-500 hover:text-gray-700 font-medium cursor-pointer"
                    >
                      Change number
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

