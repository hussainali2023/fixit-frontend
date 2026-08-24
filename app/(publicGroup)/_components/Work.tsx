"use client";

import React from "react";
import { Search, CalendarCheck, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    num: "01",
    icon: Search,
    title: "Choose Service & Slot",
    desc: "Browse from electrical, plumbing, or AC repair services and pick your preferred time slot.",
  },
  {
    num: "02",
    icon: CalendarCheck,
    title: "Technician Accepts & Visits",
    desc: "A verified pro accepts your request and arrives at your doorstep with safety equipment.",
  },
  {
    num: "03",
    icon: CheckCircle,
    title: "Job Done & Easy Payment",
    desc: "Inspect the work, pay seamlessly via Cash or Digital Payment, and leave a review.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-16 bg-accent/20 border-y border-border/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-primary tracking-wider uppercase bg-primary/10 px-3.5 py-1 rounded-full border border-primary/20">
            <span>Simple 3-Step Process</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            How Fixit Now Works
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Getting professional home repairs done has never been easier.
          </p>
        </div>

        {/* 3 Step Animated Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((s, idx) => {
            const IconComponent = s.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="bg-card border border-border rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-xl transition-all space-y-4 relative group"
              >
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <span className="text-3xl font-black text-primary/20 group-hover:text-primary/50 transition-colors">
                    {s.num}
                  </span>
                </div>

                <h3 className="text-lg font-extrabold text-foreground group-hover:text-primary transition-colors">
                  {s.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}