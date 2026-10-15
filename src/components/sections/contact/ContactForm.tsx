"use client";

import { Container } from "@/design-system/primitives/layout/Container";
import { Input } from "@/design-system/primitives/forms/Input";
import { Select } from "@/design-system/primitives/forms/Select";
import { Textarea } from "@/design-system/primitives/forms/Textarea";
import { Label } from "@/design-system/primitives/typography/Label";
import { Button } from "@/design-system/primitives/actions/Button";
import { 
  ShieldCheck, 
  Clock, 
  Zap, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  Loader2,
  Mail,
  RotateCcw,
  ChevronDown
} from "lucide-react";
import { motion } from "framer-motion";
import { useState, useRef, type FormEvent } from "react";
import { siteConfig } from "@/config/site";
import { contactContent } from "@/content/contact";
import { ALL_COUNTRY_CODES, ALL_COUNTRY_OPTIONS } from "@/content/countryDialCodes";
import ContactTurnstile, { type ContactTurnstileRef } from "./ContactTurnstile";

export default function ContactForm() {
  const { form: formContent } = contactContent;

  const [phoneCountryCode, setPhoneCountryCode] = useState("+971");
  const [phone, setPhone] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileError, setTurnstileError] = useState("");
  const turnstileRef = useRef<ContactTurnstileRef>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submittedData, setSubmittedData] = useState<{
    fullName: string;
    email: string;
    companyName?: string;
  } | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitError("");
    setTurnstileError("");

    // Validate Turnstile
    if (!turnstileToken) {
      setTurnstileError("Please complete the Cloudflare security verification.");
      return;
    }

    const form = event.currentTarget;
    const data = new FormData(form);

    const payload = {
      fullName: String(data.get("fullName") || "").trim(),
      companyName: String(data.get("companyName") || "").trim(),
      email: String(data.get("email") || "").trim(),
      phoneCountryCode,
      phone: phone.trim(),
      country: String(data.get("country") || "").trim(),
      industry: String(data.get("industry") || "").trim(),
      solution: String(data.get("solution") || "").trim(),
      goals: String(data.get("goals") || "").trim(),
      turnstileToken,
    };

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const resJson = await response.json();

      if (!response.ok) {
        throw new Error(resJson.error || "Failed to submit enquiry. Please try again.");
      }

      setSubmittedData({
        fullName: payload.fullName,
        email: payload.email,
        companyName: payload.companyName,
      });
      setSubmitSuccess(true);
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : "An unexpected error occurred.";
      setSubmitError(errorMsg);
      // Reset Turnstile on error so user can re-verify
      turnstileRef.current?.reset();
      setTurnstileToken("");
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleReset() {
    setSubmitSuccess(false);
    setSubmitError("");
    setTurnstileError("");
    setTurnstileToken("");
    turnstileRef.current?.reset();
    setPhone("");
    setSubmittedData(null);
  }

  return (
    <section id="contact-form" className="relative w-full py-16 sm:py-24 lg:py-32 bg-background overflow-hidden scroll-mt-20 sm:scroll-mt-28">
      
      {/* Background Grids & Ambient Effects */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_10%,transparent_100%)]" />
      </div>
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <Container size="xl" className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        {/* Left Column - Information (Aligned starting height with form box) */}
        <div className="lg:col-span-5 flex flex-col gap-8">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-[10px] sm:text-[11px] font-bold text-primary uppercase tracking-[0.2em] block mb-4 flex items-center gap-3">
              <span className="w-8 h-px bg-primary/30" />
              {formContent.badge}
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-[3.2rem] font-black tracking-tight text-foreground leading-[1.1] mb-6 uppercase">
              {formContent.titlePart1}<span className="text-primary">{formContent.titlePart2}</span>
            </h2>
            <p className="text-base sm:text-lg text-muted leading-relaxed max-w-md">
              {formContent.description}
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="flex flex-col gap-4 mt-2"
          >
            {formContent.infoCards.map((card, idx) => {
              const Icon = card.iconName === "ShieldCheck" ? ShieldCheck : (card.iconName === "Clock" ? Clock : Zap);
              return (
                <div key={idx} className="flex items-start gap-4 p-5 sm:p-6 bg-surface border border-border rounded-2xl shadow-sm hover:border-primary/30 transition-colors group">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-all text-primary">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-foreground mb-1 tracking-tight">{card.title}</h3>
                    <p className="text-[13px] sm:text-sm text-muted leading-relaxed">{card.desc}</p>
                  </div>
                </div>
              );
            })}
          </motion.div>

        </div>

        {/* Right Column - Form Box (Starts at same height as left title) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="lg:col-span-7"
        >
          <div className="bg-surface border border-border rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 shadow-xl shadow-black/[0.03] relative overflow-hidden">
            
            {/* Subtle glow inside the form card */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

            {submitSuccess ? (
              /* Success State Display */
              <div className="flex flex-col items-center text-center py-8 relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-foreground uppercase tracking-tight mb-3">
                  Enquiry Submitted
                </h3>
                <p className="text-muted text-base max-w-md leading-relaxed mb-6">
                  Thank you, <span className="text-foreground font-semibold">{submittedData?.fullName}</span>. We have received your consultation enquiry and our engineering architects will reach out to you within one business day.
                </p>

                <div className="p-4 bg-background-alt border border-border rounded-xl text-left w-full max-w-md mb-8 text-xs text-muted space-y-1.5">
                  <p><span className="text-foreground font-medium">Contact:</span> {submittedData?.email}</p>
                  {submittedData?.companyName && (
                    <p><span className="text-foreground font-medium">Organization:</span> {submittedData.companyName}</p>
                  )}
                  <p><span className="text-foreground font-medium">Status:</span> Received & Queued for Priority Review</p>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-md">
                  <Button
                    type="button"
                    variant="primary"
                    size="lg"
                    fullWidth
                    onClick={handleReset}
                    icon={<RotateCcw className="w-4 h-4" />}
                  >
                    Submit Another Enquiry
                  </Button>
                  <a
                    href={`mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(`Enquiry follow-up: ${submittedData?.fullName}`)}`}
                    className="w-full sm:w-auto text-xs font-semibold text-muted hover:text-primary transition-colors py-2 flex items-center justify-center gap-1.5"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    Email directly
                  </a>
                </div>
              </div>
            ) : (
              /* Form */
              <form className="flex flex-col gap-5 sm:gap-6 relative z-10" onSubmit={handleSubmit}>
                
                {submitError && (
                  <div className="p-4 rounded-xl bg-danger/10 border border-danger/30 text-danger text-sm flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                    <span>{submitError}</span>
                  </div>
                )}

                {/* Row 1: Full Name & Company Name (With labels above boxes) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                  <Input 
                    id="fullName" 
                    name="fullName" 
                    label="Full Name"
                    required 
                    maxLength={150} 
                    autoComplete="name"
                    placeholder="Enter your name" 
                  />
                  <Input 
                    id="companyName" 
                    name="companyName" 
                    label="Company Name"
                    maxLength={150} 
                    autoComplete="organization"
                    placeholder="Enter company name (optional)" 
                  />
                </div>

                {/* Row 2: Business Email & Phone Number (With labels above boxes) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                  <Input 
                    id="email" 
                    name="email" 
                    label="Business Email"
                    required 
                    maxLength={254} 
                    autoComplete="email"
                    type="email" 
                    placeholder="Enter business email" 
                  />
                  
                  {/* Phone with Country Dial Code Select (No flag/icon, just number display) */}
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="flex gap-2">
                      <div className="relative w-24 shrink-0">
                        {/* Visible clean badge: JUST THE NUMBER, no flag, no icon, never truncated */}
                        <div 
                          className="w-full h-11 px-3 flex items-center justify-between text-sm rounded-sm bg-surface border border-border text-foreground font-sans pointer-events-none"
                          aria-hidden="true"
                        >
                          <span className="font-medium text-foreground">{phoneCountryCode}</span>
                          <ChevronDown className="w-3.5 h-3.5 text-muted shrink-0" />
                        </div>
                        {/* Invisible full native select with all countries */}
                        <select
                          id="phoneCountryCode"
                          name="phoneCountryCode"
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
                          id="phone"
                          name="phone"
                          type="tel"
                          maxLength={30}
                          autoComplete="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="Phone number"
                          aria-label="Phone Number"
                          className="w-full h-11 px-4 text-sm rounded-sm bg-surface border border-border text-foreground font-sans placeholder:text-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-colors"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Row 3: Country & Industry (With labels above boxes) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                  <Select
                    id="country"
                    name="country" 
                    label="Country"
                    required
                    placeholder="Select your country"
                    defaultValue=""
                    options={ALL_COUNTRY_OPTIONS}
                  />
                  <Select
                    id="industry"
                    name="industry" 
                    label="Industry"
                    required
                    placeholder="Select your industry"
                    defaultValue=""
                    options={[
                      { value: "Facility Management", label: "Facility Management" },
                      { value: "Manufacturing & Industrial", label: "Manufacturing & Industrial" },
                      { value: "Logistics & Supply Chain", label: "Logistics & Supply Chain" },
                      { value: "Energy & Utilities", label: "Energy & Utilities" },
                      { value: "Smart Agriculture", label: "Smart Agriculture" },
                      { value: "Real Estate & Smart Buildings", label: "Real Estate & Smart Buildings" },
                      { value: "Other", label: "Other" },
                    ]}
                  />
                </div>

                {/* Row 4: Interested Solution (With label above box) */}
                <Select
                  id="solution"
                  name="solution" 
                  label="Interested Solution"
                  required
                  placeholder="Select interested solution"
                  defaultValue=""
                  options={[
                    { value: "IoTRICs (Industrial IoT)", label: "IoTRICs (Industrial IoT Platform)" },
                    { value: "Evoltics (EV Charging)", label: "Evoltics (EV Charging Infrastructure)" },
                    { value: "Cropifai (AgriTech)", label: "Cropifai (Precision AgriTech)" },
                    { value: "Turnkey Automation & Sensing", label: "Turnkey Automation & Sensing" },
                    { value: "General Consultation", label: "General Consultation & Partnership" },
                  ]}
                />

                {/* Row 5: Goals / Message (With label above box) */}
                <Textarea
                  id="goals"
                  name="goals" 
                  label="What are you trying to monitor, automate, or improve?"
                  required 
                  maxLength={1500}
                  placeholder="Describe your project goals, challenges, or requirements..."
                  rows={4}
                />

                {/* Row 6: Security Verification (Cloudflare Turnstile) */}
                <div className="pt-1">
                  <ContactTurnstile
                    ref={turnstileRef}
                    label="Security Verification"
                    required
                    onVerify={(token) => {
                      setTurnstileToken(token);
                      setTurnstileError("");
                    }}
                    onExpire={() => {
                      setTurnstileToken("");
                      setTurnstileError("Security verification expired. Please verify again.");
                    }}
                    onError={(msg) => {
                      setTurnstileToken("");
                      setTurnstileError(msg);
                    }}
                    error={turnstileError}
                  />
                </div>

                {/* Submit Action */}
                <div className="pt-2 mt-1 border-t border-border/50">
                  <Button 
                    type="submit"
                    variant="primary" 
                    size="lg" 
                    fullWidth 
                    disabled={isSubmitting}
                    className="py-6 text-base sm:text-lg font-bold shadow-lg shadow-primary/20"
                    icon={isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <ArrowRight className="w-5 h-5" />}
                    iconPosition="right"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Enquiry"}
                  </Button>
                  
                  <div className="flex items-center justify-center gap-2 mt-5 text-muted">
                    <ShieldCheck className="w-4 h-4 opacity-70" />
                    <p className="text-center text-[11px] sm:text-xs font-medium uppercase tracking-wider">
                      Your information is secure. No spam, ever.
                    </p>
                  </div>
                </div>

              </form>
            )}
          </div>
        </motion.div>

      </Container>
    </section>
  );
}
