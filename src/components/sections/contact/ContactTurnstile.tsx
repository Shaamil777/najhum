"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { AlertCircle, RefreshCw, ShieldCheck } from "lucide-react";
import { Label } from "@/design-system/primitives/typography/Label";

export interface ContactTurnstileRef { reset: () => void }
interface ContactTurnstileProps {
  onVerify: (token: string) => void;
  onExpire?: () => void;
  onError?: (error: string) => void;
  error?: string;
  label?: string;
  required?: boolean;
}

declare global {
  interface Window {
    turnstile?: {
      render: (container: string | HTMLElement, options: {
        sitekey: string;
        callback: (token: string) => void;
        "error-callback"?: (error: unknown) => void;
        "expired-callback"?: () => void;
        theme?: "light" | "dark" | "auto";
        size?: "normal" | "compact" | "flexible";
        retry?: "auto" | "never";
        "retry-interval"?: number;
      }) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
    onloadTurnstileCallback?: () => void;
  }
}
const TEST_SITE_KEY = "1x00000000000000000000AA";

const ContactTurnstile = forwardRef<ContactTurnstileRef, ContactTurnstileProps>(
  ({ onVerify, onExpire, onError, error, label = "Security Verification", required = true }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const widgetIdRef = useRef<string | null>(null);
    const callbacks = useRef({ onVerify, onExpire, onError });
    const [isLoaded, setIsLoaded] = useState(false);
    const [loadError, setLoadError] = useState(false);
    const configuredKey = process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY?.trim();
    const siteKey = configuredKey || (process.env.NODE_ENV !== "production" ? TEST_SITE_KEY : "");
    const invalidConfiguration = !siteKey || (process.env.NODE_ENV === "production" && /^[123]x0+/.test(siteKey));

    // Form callbacks change on every render. Keep the widget and its token intact.
    useEffect(() => { callbacks.current = { onVerify, onExpire, onError }; }, [onVerify, onExpire, onError]);
    useImperativeHandle(ref, () => ({ reset: () => {
      callbacks.current.onExpire?.();
      if (window.turnstile && widgetIdRef.current !== null) window.turnstile.reset(widgetIdRef.current);
    } }), []);

    useEffect(() => {
      if (invalidConfiguration) return;
      let disposed = false;
      let rendered = false;
      let poll: ReturnType<typeof setInterval> | undefined;
      let timeout: ReturnType<typeof setTimeout> | undefined;
      const fail = (message: string) => {
        if (disposed) return;
        clearInterval(poll);
        clearTimeout(timeout);
        setLoadError(true);
        callbacks.current.onError?.(message);
      };
      const render = () => {
        if (disposed || rendered || !containerRef.current || !window.turnstile) return;
        rendered = true;
        clearInterval(poll);
        clearTimeout(timeout);
        try {
          widgetIdRef.current = window.turnstile.render(containerRef.current, {
            sitekey: siteKey, theme: "light", size: "flexible",
            callback: token => { if (!disposed) { setLoadError(false); callbacks.current.onVerify(token); } },
            "expired-callback": () => { if (!disposed) callbacks.current.onExpire?.(); },
            "error-callback": code => {
              if (disposed) return;
              const errorCode = String(code);
              const message = errorCode === "110200"
                ? "This hostname is not authorised for security verification. Please contact us by email."
                : `Security verification could not complete (code ${errorCode}). Please retry or reload.`;
              callbacks.current.onError?.(message);
            },
          });
          setIsLoaded(true);
          setLoadError(false);
        } catch { fail("Security verification could not start. Please reload the page."); }
      };
      let script = document.querySelector<HTMLScriptElement>('script[src^="https://challenges.cloudflare.com/turnstile/v0/api.js"]');
      const scriptError = () => fail("Could not load Cloudflare security verification. Please reload or check your connection.");
      if (!script) {
        script = document.createElement("script");
        script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
      }
      script.addEventListener("error", scriptError);
      if (window.turnstile) render();
      else {
        poll = setInterval(render, 100);
        timeout = setTimeout(() => fail("Security verification took too long to load. Please reload or check your connection."), 15000);
      }
      return () => {
        disposed = true;
        clearInterval(poll);
        clearTimeout(timeout);
        script?.removeEventListener("error", scriptError);
        if (widgetIdRef.current !== null && window.turnstile) {
          try { window.turnstile.remove(widgetIdRef.current); } catch { /* Already removed by Cloudflare. */ }
          widgetIdRef.current = null;
        }
      };
    }, [siteKey, invalidConfiguration]);

    return <div className="flex flex-col gap-2 w-full">
      {label && <Label variant={error ? "error" : required ? "required" : "default"}>{label}</Label>}
      <div className="relative min-h-[80px] w-full rounded-sm bg-surface border border-border p-2">
        {!isLoaded && !loadError && !invalidConfiguration && <div className="absolute inset-0 flex items-center gap-2.5 px-3 text-xs text-muted pointer-events-none"><ShieldCheck className="w-4 h-4 text-primary animate-pulse" /><span>Initializing Cloudflare security verification...</span></div>}
        {(loadError || invalidConfiguration) && <div role="alert" className="flex items-center justify-between gap-3 px-3 py-2 text-xs text-danger"><AlertCircle size={16} className="shrink-0" /><span>{invalidConfiguration ? "Security verification is not configured. Please contact us by email." : "Security widget failed to load. Please reload or check your connection."}</span><button type="button" onClick={() => window.location.reload()} title="Reload page" aria-label="Reload security verification" className="p-2 shrink-0"><RefreshCw size={16} /></button></div>}
        <div ref={containerRef} className="w-full" />
      </div>
      {error && <span role="alert" className="text-xs text-danger font-medium flex items-center gap-1.5 mt-0.5"><AlertCircle size={14} className="shrink-0" />{error}</span>}
    </div>;
  }
);
ContactTurnstile.displayName = "ContactTurnstile";
export default ContactTurnstile;
