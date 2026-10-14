"use client";

import { useEffect, useState, useCallback, useId } from "react";
import { RotateCw, ShieldCheck } from "lucide-react";
import { Label } from "@/design-system/primitives/typography/Label";
import { cn } from "@/lib/utils";

interface ContactCaptchaProps {
  value: string;
  onChange: (value: string) => void;
  onCodeChange: (code: string) => void;
  error?: string;
  id?: string;
  label?: string;
  required?: boolean;
}

const CHAR_SET = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";

function generateRandomCode(length = 5): string {
  let result = "";
  for (let i = 0; i < length; i++) {
    result += CHAR_SET.charAt(Math.floor(Math.random() * CHAR_SET.length));
  }
  return result;
}

export default function ContactCaptcha({
  value,
  onChange,
  onCodeChange,
  error,
  id: customId,
  label,
  required = true,
}: ContactCaptchaProps) {
  const generatedId = useId();
  const inputId = customId || `captcha-input-${generatedId}`;
  
  const [code, setCode] = useState<string>("");
  const [isRotating, setIsRotating] = useState(false);
  const [mounted, setMounted] = useState(false);

  const refreshCaptcha = useCallback(() => {
    setIsRotating(true);
    const newCode = generateRandomCode(5);
    setCode(newCode);
    onCodeChange(newCode);
    setTimeout(() => setIsRotating(false), 500);
  }, [onCodeChange]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const initialCode = generateRandomCode(5);
    setCode(initialCode);
    onCodeChange(initialCode);
  }, [onCodeChange]);

  // Derived character details for deterministic SVG rendering
  const chars = code.split("").map((char, index) => {
    const seed = (char.charCodeAt(0) * (index + 3)) % 100;
    const rotate = ((seed % 30) - 15); // -15deg to +15deg
    const yOffset = 24 + ((seed % 8) - 4); // 20 to 28
    return { char, rotate, yOffset, x: 18 + index * 24 };
  });

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <Label
          htmlFor={inputId}
          variant={error ? "error" : required ? "required" : "default"}
        >
          {label}
        </Label>
      )}

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        {/* Captcha Display Box */}
        <div className="flex items-center gap-2">
          <div 
            className="relative h-11 px-3 bg-surface border border-border rounded-sm flex items-center justify-center select-none overflow-hidden shadow-inner shrink-0 w-36"
            title="Security Captcha"
            aria-hidden="true"
          >
            {/* Ambient noise background */}
            <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(ellipse_at_center,var(--color-primary)_0%,transparent_70%)]" />

            {mounted && code ? (
              <svg 
                viewBox="0 0 144 38" 
                className="w-full h-full select-none"
                style={{ filter: "contrast(110%)" }}
              >
                {/* Wavy noise lines */}
                <path 
                  d="M 5,18 Q 35,5 72,20 T 140,15" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="1.2" 
                  className="text-primary/30" 
                />
                <path 
                  d="M 8,28 Q 45,35 72,12 T 136,26" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="1" 
                  className="text-primary/20" 
                />
                <circle cx="25" cy="8" r="1.5" className="fill-primary/25" />
                <circle cx="68" cy="30" r="1.5" className="fill-primary/25" />
                <circle cx="115" cy="9" r="1.5" className="fill-primary/25" />

                {/* Distorted letters */}
                {chars.map(({ char, rotate, yOffset, x }, idx) => (
                  <text
                    key={idx}
                    x={x}
                    y={yOffset}
                    transform={`rotate(${rotate}, ${x}, ${yOffset})`}
                    textAnchor="middle"
                    className="font-mono font-black text-lg fill-foreground"
                    style={{
                      letterSpacing: "2px",
                      userSelect: "none",
                    }}
                  >
                    {char}
                  </text>
                ))}
              </svg>
            ) : (
              <div className="flex items-center gap-1 text-xs text-muted">
                <ShieldCheck className="w-4 h-4 animate-pulse text-primary" />
                <span>Loading...</span>
              </div>
            )}
          </div>

          {/* Refresh Button */}
          <button
            type="button"
            onClick={refreshCaptcha}
            title="Generate new captcha code"
            aria-label="Refresh captcha code"
            className="h-11 w-11 rounded-sm border border-border bg-surface flex items-center justify-center text-muted hover:text-foreground hover:border-primary/40 transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <RotateCw className={cn("w-4 h-4 transition-transform duration-500", isRotating && "rotate-180")} />
          </button>
        </div>

        {/* Input Field */}
        <div className="flex-1 min-w-0">
          <input
            id={inputId}
            name="captchaAnswer"
            type="text"
            required={required}
            autoComplete="off"
            maxLength={6}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Enter captcha code"
            aria-label="Enter captcha code shown"
            className={cn(
              "w-full h-11 px-4 text-sm rounded-sm bg-surface border font-sans text-foreground placeholder:text-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-colors",
              error ? "border-danger focus-visible:ring-danger" : "border-border"
            )}
          />
        </div>
      </div>

      {error && (
        <span role="alert" className="text-xs text-danger font-medium">
          {error}
        </span>
      )}
    </div>
  );
}
