"use client";

import React, { useEffect, useRef, useState, useImperativeHandle, forwardRef } from "react";
import { ShieldCheck, RefreshCw, AlertCircle } from "lucide-react";
import { Label } from "@/design-system/primitives/typography/Label";

export interface ContactTurnstileRef {
  reset: () => void;
}

interface ContactTurnstileProps {
  onVerify: (token: string) => void;
  onExpire?: () => void;
  onError?: (error: string) => void;
  error?: string;
  label?: string;
  required?: boolean;
}

// Cloudflare official universal "Always Passes" test site key for development & testing
const CLOUDFLARE_TEST_SITE_KEY = "1x00000000000000000000AA";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: string | HTMLElement,
        options: {
          sitekey: string;
          callback: (token: string) => void;
          "error-callback"?: (error: unknown) => void;
          "expired-callback"?: () => void;
          theme?: "light" | "dark" | "auto";
          size?: "normal" | "compact" | "flexible";
          retry?: "auto" | "never";
          "retry-interval"?: number;
        }
      ) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
    onloadTurnstileCallback?: () => void;
  }
}

const ContactTurnstile = forwardRef<ContactTurnstileRef, ContactTurnstileProps>(
  ({ onVerify, onExpire, onError, error, label = "Security Verification", required = true }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const widgetIdRef = useRef<string | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [loadError, setLoadError] = useState(false);

    const siteKey =
      process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY?.trim() ||
      CLOUDFLARE_TEST_SITE_KEY;

    useImperativeHandle(ref, () => ({
      reset: () => {
        if (typeof window !== "undefined" && window.turnstile && widgetIdRef.current) {
          try {
            window.turnstile.reset(widgetIdRef.current);
          } catch (e) {
            console.error("[TURNSTILE_RESET_ERROR]", e);
          }
        }
      },
    }));

    useEffect(() => {
      let isMounted = true;

      // Function to render the Turnstile widget
      const renderWidget = () => {
        if (!containerRef.current || !window.turnstile) return;

        // Clean up previous widget if any
        if (widgetIdRef.current) {
          try {
            window.turnstile.remove(widgetIdRef.current);
          } catch {
            // Ignore error on cleanup
          }
          widgetIdRef.current = null;
        }

        try {
          const id = window.turnstile.render(containerRef.current, {
            sitekey: siteKey,
            theme: "auto",
            size: "flexible",
            callback: (token: string) => {
              if (isMounted) {
                onVerify(token);
              }
            },
            "expired-callback": () => {
              if (isMounted) {
                onExpire?.();
              }
            },
            "error-callback": (err) => {
              console.warn("[TURNSTILE_WIDGET_ERROR]", err);
              if (isMounted) {
                onError?.("Security challenge encountered an error. Please reload.");
              }
            },
          });

          widgetIdRef.current = id;
          if (isMounted) {
            setIsLoaded(true);
            setLoadError(false);
          }
        } catch (e) {
          console.error("[TURNSTILE_RENDER_EXCEPTION]", e);
          if (isMounted) {
            setLoadError(true);
          }
        }
      };

      // Load Turnstile explicit script if not already present
      if (typeof window !== "undefined") {
        if (window.turnstile) {
          renderWidget();
        } else {
          const existingScript = document.querySelector(
            'script[src^="https://challenges.cloudflare.com/turnstile/v0/api.js"]'
          );

          if (!existingScript) {
            const script = document.createElement("script");
            script.src =
              "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
            script.async = true;
            script.defer = true;
            script.onload = () => {
              if (isMounted) {
                renderWidget();
              }
            };
            script.onerror = () => {
              console.error("[TURNSTILE_SCRIPT_LOAD_FAIL]");
              if (isMounted) {
                setLoadError(true);
                onError?.("Could not load Cloudflare Turnstile script.");
              }
            };
            document.head.appendChild(script);
          } else {
            // Script already exists, wait for turnstile object
            const interval = setInterval(() => {
              if (window.turnstile) {
                clearInterval(interval);
                if (isMounted) {
                  renderWidget();
                }
              }
            }, 100);

            return () => {
              clearInterval(interval);
            };
          }
        }
      }

      return () => {
        isMounted = false;
        if (widgetIdRef.current && window.turnstile) {
          try {
            window.turnstile.remove(widgetIdRef.current);
          } catch {
            // Ignore error
          }
          widgetIdRef.current = null;
        }
      };
    }, [siteKey, onVerify, onExpire, onError]);

    return (
      <div className="flex flex-col gap-2 w-full">
        {label && (
          <Label variant={error ? "error" : required ? "required" : "default"}>
            {label}
          </Label>
        )}

        <div className="relative min-h-[66px] w-full rounded-sm overflow-hidden bg-surface border border-border flex items-center justify-start p-2 transition-colors">
          {/* Fallback loading indicator before Turnstile renders */}
          {!isLoaded && !loadError && (
            <div className="flex items-center gap-2.5 px-3 py-2 text-xs text-muted select-none">
              <ShieldCheck className="w-4 h-4 text-primary animate-pulse" />
              <span>Initializing Cloudflare security verification...</span>
            </div>
          )}

          {/* Network / blocker error fallback */}
          {loadError && (
            <div className="flex items-center justify-between w-full px-3 py-2 text-xs text-danger bg-danger/5 rounded-sm">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>Security widget failed to load. Please disable ad-blockers or reload.</span>
              </div>
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="p-1 hover:text-foreground transition-colors"
                title="Reload page"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Container where Cloudflare Turnstile mounts its iframe */}
          <div
            ref={containerRef}
            className={`w-full ${!isLoaded ? "hidden" : "block"}`}
          />
        </div>

        {error && (
          <span role="alert" className="text-xs text-danger font-medium flex items-center gap-1.5 mt-0.5">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            {error}
          </span>
        )}
      </div>
    );
  }
);

ContactTurnstile.displayName = "ContactTurnstile";

export default ContactTurnstile;
