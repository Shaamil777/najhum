"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { FileText, X } from "lucide-react";

interface BrochureDownloadButtonProps {
  brochureUrl?: string | null;
  className?: string;
  size?: "default" | "sm" | "lg" | "icon";
}

export default function BrochureDownloadButton({
  brochureUrl,
  className = "",
  size = "default"
}: BrochureDownloadButtonProps) {
  const [showModal, setShowModal] = useState(false);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
      setPhone("");
      setOtp("");
    }
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) {
      setError("Please enter a valid phone number.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/verify/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send OTP");
      setStep("otp");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp) {
      setError("Please enter the OTP.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/verify/check-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, code: otp }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Invalid OTP");
      
      // Success
      localStorage.setItem("is_phone_verified", "true");
      setShowModal(false);
      window.open(brochureUrl!, "_blank");
    } catch (err: any) {
      setError(err.message);
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
        <FileText className="w-4 h-4" /> Request Brochure
      </Button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden relative">
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {step === "phone" ? "Verify your number" : "Enter Verification Code"}
              </h2>
              <p className="text-gray-500 mb-6">
                {step === "phone" 
                  ? "Please enter your phone number to download the brochure."
                  : `We sent a verification code to ${phone}.`
                }
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
                      Phone Number (include country code)
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1234567890"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Sending..." : "Send Code"}
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
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                      required
                      maxLength={6}
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Verifying..." : "Verify & Download"}
                  </Button>
                  <button 
                    type="button" 
                    onClick={() => setStep("phone")}
                    className="w-full text-center text-sm text-blue-600 hover:text-blue-800 mt-4 font-medium"
                  >
                    Change phone number
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
