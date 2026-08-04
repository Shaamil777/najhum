import * as React from "react";

export function Card({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={`bg-white border border-neutral-200 rounded-sm overflow-hidden flex flex-col ${className}`}>
      {children}
    </div>
  );
}

export function CardHeader({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={`p-6 flex flex-col space-y-1.5 ${className}`}>
      {children}
    </div>
  );
}

export function CardTitle({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return (
    <h3 className={`text-xl font-bold uppercase tracking-tight text-neutral-900 ${className}`}>
      {children}
    </h3>
  );
}

export function CardDescription({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return (
    <p className={`text-sm text-neutral-500 leading-relaxed ${className}`}>
      {children}
    </p>
  );
}

export function CardContent({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={`p-6 pt-0 flex-1 ${className}`}>
      {children}
    </div>
  );
}
