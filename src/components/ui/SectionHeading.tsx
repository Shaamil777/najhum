import * as React from "react";

interface SectionHeadingProps {
  badge?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export default function SectionHeading({
  badge,
  title,
  description,
  align = "center",
  className = "",
}: SectionHeadingProps) {
  const alignmentClass = align === "center" ? "items-center text-center mx-auto" : "items-start text-left";

  return (
    <div className={`flex flex-col max-w-3xl ${alignmentClass} ${className}`}>
      {badge && (
        <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 px-4 py-1.5 text-xs font-medium text-neutral-600 mb-6">
          <span className="h-1.5 w-1.5 rounded-full bg-neutral-400" />
          <span>{badge}</span>
        </div>
      )}

      <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight uppercase text-neutral-900">
        {title}
      </h2>

      {description && (
        <p className="mt-6 text-sm sm:text-base text-neutral-500 leading-relaxed max-w-2xl">
          {description}
        </p>
      )}
    </div>
  );
}
