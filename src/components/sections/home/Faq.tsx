"use client";

import { useId, useState } from "react";
import { Plus, Minus } from "lucide-react";
import { homeContent } from "@/content/home";
import { homeContainer, homeHeading, HomeEyebrow, HomeLink } from "./HomePrimitives";

export default function Faq() {
  const { faq } = homeContent;
  const id = useId();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  return (
    <section aria-labelledby={`${id}-heading`} className="bg-white py-16 sm:py-20 lg:py-28">
      <div className={homeContainer}>
        <HomeEyebrow>{faq.label}</HomeEyebrow>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
          <div>
            <h2 id={`${id}-heading`} className={homeHeading}>Your questions.<br /><span className="text-primary">Answered.</span></h2>
            <p className="mt-6 mb-7 max-w-sm text-base leading-7 text-slate-600">Find out how our platforms fit your infrastructure, industry, and team.</p>
            <HomeLink href="/contact" secondary>Talk to our team</HomeLink>
          </div>
          <div className="space-y-3">
            {faq.items.map((item, index) => {
              const isOpen = openIndex === index;
              const triggerId = `${id}-question-${index}`;
              const panelId = `${id}-answer-${index}`;
              return (
                <div key={item.question} className={`overflow-hidden rounded-2xl border ${isOpen ? "border-blue-200 bg-blue-50/40" : "border-slate-200 bg-white"}`}>
                  <h3 className="normal-case">
                    <button id={triggerId} type="button" aria-expanded={isOpen} aria-controls={panelId} onClick={() => setOpenIndex(isOpen ? null : index)} className="flex min-h-16 w-full items-center justify-between gap-5 rounded-2xl p-5 text-left font-sans text-base leading-6 font-medium text-slate-950 hover:bg-slate-50 focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-blue-600 sm:p-6">
                      {item.question}
                      {isOpen ? <Minus size={20} aria-hidden="true" className="shrink-0 text-blue-600" /> : <Plus size={20} aria-hidden="true" className="shrink-0 text-slate-500" />}
                    </button>
                  </h3>
                  <div id={panelId} role="region" aria-labelledby={triggerId} hidden={!isOpen} className="px-5 pb-6 text-sm leading-7 text-slate-600 sm:px-6">{item.answer}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
