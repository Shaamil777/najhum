"use client";

import { useState } from "react";

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqSectionProps {
  title?: string;
  items: FaqItem[];
}

export default function FaqSection({ title = "Frequently Asked Questions", items }: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full py-16 px-8 lg:px-16 border-y border-neutral-200">
      <div className="max-w-3xl mx-auto">
        <p className="text-sm font-medium tracking-widest uppercase text-neutral-500 mb-8 text-center">
          {title}
        </p>

        <div className="flex flex-col divide-y divide-neutral-200 border-y border-neutral-200">
          {items.map((item, index) => (
            <button
              key={index}
              onClick={() => toggle(index)}
              className="w-full text-left py-5 px-4 flex items-start justify-between gap-4 cursor-pointer transition-colors hover:bg-neutral-50"
            >
              <span className="text-sm font-medium text-neutral-700">
                {item.question}
              </span>
              <span className="text-neutral-400 text-lg shrink-0 leading-none">
                {openIndex === index ? "−" : "+"}
              </span>
            </button>
          ))}
        </div>

        {/* Expanded answer rendered below the list for the active item */}
        {openIndex !== null && (
          <div className="mt-4 p-4 border border-neutral-200 bg-neutral-50">
            <p className="text-sm text-neutral-600 leading-relaxed">
              {items[openIndex].answer}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
