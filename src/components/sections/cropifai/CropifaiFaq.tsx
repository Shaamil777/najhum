"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

export const cropifaiFaqData = {
  label: "FAQ",
  headline: "Frequently Asked Questions",
  items: [
    {
      question: "What does it measure?",
      answer: "Soil moisture, irrigation flow, valve position and field conditions, on one dashboard."
    },
    {
      question: "Can it control irrigation, or only report it?",
      answer: "Both. Valve control and scheduling run from the platform, with manual override."
    },
    {
      question: "Does it work without site connectivity?",
      answer: "Yes. LoRaWAN covers large sites on low power; satellite is available where there is no cellular service."
    }
  ]
};

export default function CropifaiFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleOpen = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full bg-white py-16 sm:py-24 lg:py-32 overflow-hidden relative font-sans border-t border-zinc-200">
      {/* Background ambient grids matching light mode design */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] bg-[size:32px_32px] opacity-10 z-0 pointer-events-none [mask-image:radial-gradient(circle,white,transparent_70%)]" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[linear-gradient(to_right,#10b981_1px,transparent_1px),linear-gradient(to_bottom,#10b981_1px,transparent_1px)] bg-[size:32px_32px] opacity-[0.04] z-0 pointer-events-none [mask-image:radial-gradient(circle,white,transparent_70%)]" />

      <div className="max-w-[1000px] mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16 relative z-20">
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4 flex items-center gap-4 before:h-px before:w-8 before:bg-primary/20 after:h-px after:w-8 after:bg-primary/20">
            {cropifaiFaqData.label}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-zinc-900 mb-6">
            {cropifaiFaqData.headline}
          </h2>
        </div>

        {/* Accordion Container */}
        <div className="flex flex-col gap-4">
          {cropifaiFaqData.items.map((item, index) => {
            const isOpen = openIndex === index;
            
            return (
              <div 
                key={index} 
                className={`border rounded-2xl transition-colors duration-300 ${
                  isOpen ? 'border-primary/25 bg-emerald-50/20' : 'border-zinc-200 bg-white hover:border-zinc-300 shadow-sm hover:shadow-md'
                }`}
              >
                <button
                  onClick={() => toggleOpen(index)}
                  className="w-full flex items-center justify-between text-left px-5 py-5 sm:px-6 sm:py-6 focus-visible:outline-none"
                >
                  <span className={`text-base sm:text-lg font-bold pr-8 transition-colors duration-300 ${
                    isOpen ? 'text-primary' : 'text-zinc-900'
                  }`}>
                    {item.question}
                  </span>
                  
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-300 shadow-sm ${
                    isOpen ? 'bg-primary text-white' : 'bg-zinc-50 border border-zinc-200 text-zinc-500'
                  }`}>
                    {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                  </div>
                </button>
                
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 sm:px-8 pb-8 pt-0 text-zinc-600 font-medium leading-relaxed max-w-3xl text-sm sm:text-base">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
