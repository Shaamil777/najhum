"use client";

import { Container } from "@/design-system/primitives/layout/Container";
import { Input } from "@/design-system/primitives/forms/Input";
import { Select } from "@/design-system/primitives/forms/Select";
import { Textarea } from "@/design-system/primitives/forms/Textarea";
import { Button } from "@/design-system/primitives/actions/Button";
import { ShieldCheck, Clock, Zap, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactForm() {
  return (
    <section className="relative w-full py-16 sm:py-24 lg:py-32 bg-background overflow-hidden">
      
      {/* Background Grids & Ambient Effects */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_10%,transparent_100%)]" />
      </div>
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <Container size="xl" className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        {/* Left Column - Information */}
        <div className="lg:col-span-5 flex flex-col gap-8 lg:sticky lg:top-32">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-[10px] sm:text-[11px] font-bold text-primary uppercase tracking-[0.2em] block mb-4 flex items-center gap-3">
              <span className="w-8 h-px bg-primary/30" />
              Start Your Project
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-[3.2rem] font-black tracking-tight text-foreground leading-[1.1] mb-6 uppercase">
              How Can We <span className="text-primary">Help?</span>
            </h2>
            <p className="text-base sm:text-lg text-muted leading-relaxed max-w-md">
              Complete the form and our technical lead will reach out to discuss your specific infrastructure and automation requirements.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex flex-col gap-4 mt-4"
          >
            {/* Info Card 1 */}
            <div className="flex items-start gap-4 p-5 sm:p-6 bg-surface border border-border rounded-2xl shadow-sm hover:border-primary/30 transition-colors group">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-all text-primary">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-foreground mb-1 tracking-tight">Direct Access to Experts</h3>
                <p className="text-[13px] sm:text-sm text-muted leading-relaxed">Skip the sales pitch. Talk directly to our solution architects and engineers.</p>
              </div>
            </div>

            {/* Info Card 2 */}
            <div className="flex items-start gap-4 p-5 sm:p-6 bg-surface border border-border rounded-2xl shadow-sm hover:border-primary/30 transition-colors group">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-all text-primary">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-foreground mb-1 tracking-tight">24h Priority Response</h3>
                <p className="text-[13px] sm:text-sm text-muted leading-relaxed">Our team prioritizes enterprise inquiries. Expect a comprehensive response within one business day.</p>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Right Column - Form */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="lg:col-span-7"
        >
          <div className="bg-surface border border-border rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 shadow-xl shadow-black/[0.03] relative overflow-hidden">
            
            {/* Subtle glow inside the form card */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

            <form className="flex flex-col gap-5 sm:gap-6 relative z-10" onSubmit={(e) => e.preventDefault()}>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                <Input 
                  id="fullName" 
                  label="Full Name" 
                  placeholder="John Doe" 
                />
                <Input 
                  id="companyName" 
                  label="Company Name" 
                  placeholder="Enter your organization" 
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                <Input 
                  id="email" 
                  type="email" 
                  label="Business Email" 
                  placeholder="john@company.com" 
                />
                <Input 
                  id="phone" 
                  type="tel" 
                  label="Phone Number" 
                  placeholder="+971 00 000 0000" 
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                <Select
                  id="country"
                  label="Country"
                  placeholder="United Arab Emirates"
                  options={[
                    { value: "ae", label: "United Arab Emirates" },
                    { value: "sa", label: "Saudi Arabia" },
                    { value: "qa", label: "Qatar" },
                    { value: "om", label: "Oman" },
                    { value: "kw", label: "Kuwait" },
                    { value: "bh", label: "Bahrain" },
                  ]}
                />
                <Select
                  id="industry"
                  label="Industry"
                  placeholder="Facility Management"
                  options={[
                    { value: "facility", label: "Facility Management" },
                    { value: "manufacturing", label: "Manufacturing" },
                    { value: "logistics", label: "Logistics & Supply Chain" },
                    { value: "energy", label: "Energy & Utilities" },
                    { value: "other", label: "Other" },
                  ]}
                />
              </div>

              <Select
                id="solution"
                label="Interested Solution"
                placeholder="IoTRICs (Industrial IoT)"
                options={[
                  { value: "iotrics", label: "IoTRICs (Industrial IoT)" },
                  { value: "evoltics", label: "Evoltics (EV Charging)" },
                  { value: "cropifai", label: "Cropifai (AgriTech)" },
                  { value: "general", label: "General Inquiry" },
                ]}
              />

              <Textarea
                id="goals"
                label="What are you trying to monitor, automate, or improve?"
                placeholder="Describe your project goals, challenges, or requirements..."
                rows={4}
              />

              <div className="pt-4 mt-2 border-t border-border/50">
                <Button 
                  variant="primary" 
                  size="lg" 
                  fullWidth 
                  className="py-6 text-base sm:text-lg font-bold shadow-lg shadow-primary/20"
                  icon={<ArrowRight className="w-5 h-5" />}
                  iconPosition="right"
                >
                  Request Consultation
                </Button>
                <div className="flex items-center justify-center gap-2 mt-5 text-muted">
                  <ShieldCheck className="w-4 h-4 opacity-70" />
                  <p className="text-center text-[11px] sm:text-xs font-medium uppercase tracking-wider">
                    Your information is secure. No spam, ever.
                  </p>
                </div>
              </div>

            </form>
          </div>
        </motion.div>

      </Container>
    </section>
  );
}