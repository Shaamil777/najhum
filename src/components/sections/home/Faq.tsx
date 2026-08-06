import React from "react";
import { HelpCircle } from "lucide-react";

const faqData = [
  {
    question: "What is a credit?",
    answer: "A credit is an action GMHQ associates completes for you for research purposes.\n\nAI can find you emails, company descriptions, phone numbers and any publicly available information."
  },
  {
    question: "Is there a free trial?",
    answer: "Yes. You will be able to access GMHQ with 100 credits for free on signup with all the features included."
  },
  {
    question: "Can GodmodeHQ run autonomously for manual research?",
    answer: "All things you can run at GMHQ, can be run by \"The Sales Associate\". It is an agent customised for your product's data."
  },
  {
    question: "What does the Enterprise package entail for outreach?",
    answer: "It entails custom development with your enterprise data, data security compliance for SOC-2 type compliance and team level access permissions."
  },
  {
    question: "Do you have an API for integration?",
    answer: "We do custom integrations on a per request basis. Please reach out to team@troylabs.io discuss"
  },
  {
    question: "What integrations with multiple sources do you have?",
    answer: "Hubspot, Salesforce, Slack, Notion, Outlook, Gmail, Linkedin and Twitter. More integrations are underway."
  }
];

export default function Faq() {
  return (
    <section className="py-24 md:py-32 bg-[#ffffff]">
      <div className="w-full max-w-full mx-auto px-8 lg:px-16">
        
        <h2 className="text-4xl md:text-5xl font-bold text-[#0f172a] tracking-tight mb-16 md:mb-24">
          Frequently Asked Questions
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 lg:gap-x-16 gap-y-16">
          {faqData.map((item, index) => (
            <div key={index} className="flex flex-col">
              <div className="flex items-start gap-3 mb-4">
                <HelpCircle className="w-5 h-5 text-neutral-600 shrink-0 mt-0.5" strokeWidth={2} />
                <h3 className="text-lg font-bold text-neutral-900 leading-snug">
                  {item.question}
                </h3>
              </div>
              <div className="pl-8">
                <p className="text-[15px] text-neutral-600 leading-relaxed whitespace-pre-line">
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}