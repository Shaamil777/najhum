"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const evolticsFaqData = {
  label: "FAQ",
  headline: "Frequently Asked Questions",
  items: [
    {
      question: "What is Evoltics?",
      answer: "Evoltics is a full-service EV charging solutions provider offering CPO licensing, regulatory approvals, charger supply, installation, CPMS software, mobile app solutions, and annual maintenance services."
    },
    {
      question: "What is CPMS?",
      answer: "CPMS (Charge Point Management System) is Evoltics’ IoT-enabled platform for managing EV charging infrastructure. It allows operators to monitor chargers, manage users and revenue, view real-time charging data, integrate hardware, and manage their charging network from a single platform."
    },
    {
      question: "What is a CPO licence and why is it required?",
      answer: "A Charge Point Operator (CPO) licence gives an organization the legal right to commercially operate EV charging stations, collect revenue from drivers, and participate in the UAE’s regulated e-mobility ecosystem. Evoltics assists with application preparation, compliance, documentation, authority liaison, and post-approval support."
    },
    {
      question: "Which regulatory approvals does Evoltics manage?",
      answer: "Evoltics manages EV charging-related approvals across DEWA, TAQA, and FEWA, including technical submissions, inspections, grid integration, metering, compliance documentation, and final approvals depending on the location."
    },
    {
      question: "What is the Green Carbon System?",
      answer: "The Green Carbon System is an upcoming Evoltics feature designed to reward eco-conscious EV drivers with carbon credits based on their charging activity. The document specifically states that drivers can earn carbon credits for every kWh charged through Evoltics."
    }
  ]
};

export default function EvolticsFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleOpen = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full bg-white py-16 sm:py-24 lg:py-32 overflow-hidden relative font-sans">
      
      {/* Background ambient grids matching the rest of the site's light mode */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] bg-[size:32px_32px] opacity-10 z-0 pointer-events-none [mask-image:radial-gradient(circle,white,transparent_70%)]" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[linear-gradient(to_right,#60a5fa_1px,transparent_1px),linear-gradient(to_bottom,#60a5fa_1px,transparent_1px)] bg-[size:32px_32px] opacity-[0.05] z-0 pointer-events-none [mask-image:radial-gradient(circle,white,transparent_70%)]" />

      <div className="max-w-[1000px] mx-auto px-6 lg:px-12 relative z-10 lg:scale-[0.85] xl:scale-[0.9] 2xl:scale-100 lg:origin-top transition-transform duration-300 lg:-mb-32 xl:-mb-16 2xl:mb-0">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16 relative z-20">
          <span className="text-sm font-semibold tracking-widest text-primary uppercase mb-4 flex items-center gap-4 before:h-px before:w-8 before:bg-primary/20 after:h-px after:w-8 after:bg-primary/20">
            {evolticsFaqData.label}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[3.2rem] font-black tracking-tight text-foreground leading-[1.1] mb-6 uppercase">
            {evolticsFaqData.headline}
          </h2>
        </div>

        {/* Accordion Container */}
        <div className="flex flex-col gap-4">
          {evolticsFaqData.items.map((item, index) => {
            const isOpen = openIndex === index;
            
            return (
              <div 
                key={index} 
                className={`border rounded-2xl transition-colors duration-300 ${
                  isOpen ? 'border-primary/20 bg-primary/5' : 'border-border/60 bg-white hover:border-border shadow-sm hover:shadow-md'
                }`}
              >
                <button
                  onClick={() => toggleOpen(index)}
                  className="w-full flex items-center justify-between text-left px-5 py-5 sm:px-6 sm:py-6 focus-visible:outline-none"
                >
                  <span className={`text-base sm:text-lg font-bold pr-8 transition-colors duration-300 ${
                    isOpen ? 'text-primary' : 'text-foreground'
                  }`}>
                    {item.question}
                  </span>
                  
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-300 shadow-sm ${
                    isOpen ? 'bg-primary text-white' : 'bg-surface-alt border border-border text-muted'
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
                      <div className="px-6 sm:px-8 pb-8 pt-0 text-muted text-sm sm:text-base leading-relaxed max-w-3xl">
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
