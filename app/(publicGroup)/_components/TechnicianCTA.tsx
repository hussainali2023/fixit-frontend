"use client"

import React from "react";
import Link from "next/link";
import { Briefcase, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function TechnicianCTA() {
  return (
    <section className="py-20 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-3xl bg-gradient-to-br from-primary via-teal-600 to-teal-500 text-white p-8 sm:p-12 lg:p-16 overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.15)]"
        >
          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-white/5 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-white/5 rounded-full blur-[40px] translate-y-1/3 -translate-x-1/4" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold border border-white/15">
                <Briefcase className="w-4 h-4" />
                <span>Earn Extra Income on Your Terms</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.12]">
                Are you a qualified professional? <br className="hidden sm:block" />
                Join FixItNow as a Partner!
              </h2>

              <p className="text-base sm:text-lg text-white/80 max-w-2xl leading-relaxed">
                Join FixItNow, set your own schedule, manage your availability, and grow your business today with guaranteed job requests.
              </p>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <Link href="/auth/register?role=technician">
                  <Button className="bg-white text-primary hover:bg-white/90 text-sm font-bold px-8 py-6 rounded-xl shadow-lg cursor-pointer transition-all hover:scale-[1.03] active:scale-[0.98] flex items-center gap-2">
                    <span>Join as a Pro</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-center lg:justify-end">
              <motion.div 
                whileHover={{ rotate: 1, scale: 1.03 }}
                transition={{ duration: 0.3 }}
                className="bg-white/8 border border-white/15 backdrop-blur-xl p-6 rounded-2xl text-center space-y-3 max-w-xs shadow-[0_8px_32px_rgba(0,0,0,0.1)]"
              >
                <div className="w-16 h-16 rounded-2xl bg-white text-primary font-black text-2xl flex items-center justify-center mx-auto shadow-md">
                  500+
                </div>
                <h4 className="text-lg font-bold">Active Technicians</h4>
                <p className="text-xs text-white/70 leading-relaxed">
                  Join hundreds of technicians earning daily through FixItNow.
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}