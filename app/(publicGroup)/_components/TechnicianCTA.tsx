"use client"

import React from "react";
import Link from "next/link";
import { Briefcase, Calendar, ShieldCheck, ArrowRight, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function TechnicianCTA() {
  return (
    <section className="py-16 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-3xl bg-gradient-to-r from-primary via-primary/90 to-primary/80 text-primary-foreground p-8 sm:p-12 lg:p-16 overflow-hidden shadow-2xl"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-xs font-semibold">
                <Briefcase className="w-4 h-4" />
                <span>Earn Extra Income on Your Terms</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                Are you a qualified professional? <br className="hidden sm:block" />
                Join FixItNow as a Partner!
              </h2>

              <p className="text-base sm:text-lg text-primary-foreground/90 max-w-2xl font-normal leading-relaxed">
                Join FixItNow, set your own schedule, manage your availability, and grow your business today with guaranteed job requests.
              </p>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <Link href="/auth/register?role=technician">
                  <Button className="bg-white text-primary hover:bg-white/90 text-sm font-bold px-8 py-6 rounded-xl shadow-lg cursor-pointer transition-all hover:scale-105 flex items-center gap-2">
                    <span>Join as a Pro</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-center lg:justify-end">
              <motion.div 
                whileHover={{ rotate: 2, scale: 1.05 }}
                className="bg-white/10 border border-white/20 backdrop-blur-md p-6 rounded-2xl text-center space-y-3 max-w-xs shadow-xl"
              >
                <div className="w-16 h-16 rounded-full bg-white text-primary font-black text-2xl flex items-center justify-center mx-auto shadow-md">
                  500+
                </div>
                <h4 className="text-lg font-bold">Active Technicians</h4>
                <p className="text-xs text-primary-foreground/80">
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