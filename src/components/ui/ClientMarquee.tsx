"use client";

const placeholderLogos = [
  "Client A",
  "Client B",
  "Client C",
  "Client D",
  "Client E",
  "Client F",
  "Client G",
  "Client H",
];

export default function ClientMarquee() {
  const duplicated = [...placeholderLogos, ...placeholderLogos];

  return (
    <div className="w-full overflow-hidden py-8 border-y border-neutral-200">
      <div className="flex items-center gap-16 animate-marquee whitespace-nowrap">
        {duplicated.map((name, i) => (
          <span
            key={i}
            className="text-sm font-medium tracking-widest uppercase text-neutral-400 shrink-0"
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}
