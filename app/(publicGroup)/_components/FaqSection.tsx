"use client"
import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: "Do I pay before or after the service is completed?",
    answer: "Once the technician accepts your booking request, you can safely complete the payment via our online gateway. After payment confirmation, the technician begins the service.",
  },
  {
    question: "What is the cancellation policy for bookings?",
    answer: "You can easily cancel your booking from your Customer Dashboard anytime before the service status changes to IN_PROGRESS.",
  },
  {
    question: "How are technicians background-verified?",
    answer: "Every technician on FixItNow undergoes mandatory background verification, including National ID (NID) checks, prior work experience certificates, and physical skill assessments before approval.",
  },
  {
    question: "What happens if I am not satisfied with the repair work?",
    answer: "Our 24/7 support team is always ready to assist. If you face any issues or dissatisfaction with the work, report it via your dashboard or support hotline for a quick re-service or refund evaluation.",
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-4 mb-14"
        >
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-primary tracking-wider uppercase bg-primary/8 px-4 py-1.5 rounded-full border border-primary/15">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            Frequently Asked Questions
          </h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className={`rounded-2xl bg-card border transition-all duration-300 overflow-hidden ${
                  isOpen ? "border-primary/20 shadow-[0_4px_16px_rgba(0,0,0,0.06)]" : "border-border/50 shadow-[0_1px_3px_rgba(0,0,0,0.03)]"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-semibold text-foreground hover:text-primary transition-colors duration-200 focus:outline-none"
                >
                  <span className="text-[15px] sm:text-base">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-primary" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed border-t border-border/30 pt-3">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}