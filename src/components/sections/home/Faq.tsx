"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { homeContent } from "@/content/home";
import { Plus, Minus } from "lucide-react";

export default function Faq() {
  const { faq } = homeContent;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleOpen = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full bg-white py-16 sm:py-24 lg:py-32 overflow-hidden relative font-poppins">
      {/* Background ambient grids matching the rest of the site's light mode */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] bg-[size:32px_32px] opacity-10 z-0 pointer-events-none [mask-image:radial-gradient(circle,white,transparent_70%)]" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[linear-gradient(to_right,#60a5fa_1px,transparent_1px),linear-gradient(to_bottom,#60a5fa_1px,transparent_1px)] bg-[size:32px_32px] opacity-[0.05] z-0 pointer-events-none [mask-image:radial-gradient(circle,white,transparent_70%)]" />

      <div className="max-w-[1000px] mx-auto px-6 lg:px-12 relative z-10 lg:scale-[0.85] xl:scale-[0.9] 2xl:scale-100 lg:origin-top transition-transform duration-300 lg:-mb-32 xl:-mb-16 2xl:mb-0">
        
        {/* Header (matching WhyChoose & Analytics styling) */}
        <div className="flex flex-col items-center text-center mb-16 relative z-20">
          <span className="text-sm font-semibold tracking-widest text-primary uppercase mb-4 flex items-center gap-4 before:h-px before:w-8 before:bg-blue-200 after:h-px after:w-8 after:bg-blue-200">
            {faq.label}
          </span>
          <h2 className="font-poppins normal-case text-3xl sm:text-4xl lg:text-6xl font-bold tracking-tight text-zinc-900 mb-6">
            {faq.headline}
          </h2>
        </div>

        {/* Accordion Container */}
        <div className="flex flex-col gap-4">
          {faq.items.map((item, index) => {
            const isOpen = openIndex === index;
            
            return (
              <div 
                key={index} 
                className={`border rounded-2xl transition-colors duration-300 ${
                  isOpen ? 'border-primary/20 bg-blue-50/30' : 'border-zinc-200 bg-white hover:border-zinc-300 shadow-sm hover:shadow-md'
                }`}
              >
                <button
                  onClick={() => toggleOpen(index)}
                  className="w-full flex items-center justify-between text-left px-5 py-4 sm:px-6 sm:py-5 focus-visible:outline-none"
                >
                  <span className={`text-base sm:text-lg font-medium pr-8 transition-colors duration-300 ${
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
                      <div className="px-6 sm:px-8 pb-8 pt-0 text-zinc-500 leading-relaxed max-w-3xl">
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