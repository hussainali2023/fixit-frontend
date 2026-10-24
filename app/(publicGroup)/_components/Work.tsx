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
    color: "from-primary/15 to-teal-400/10",
    iconColor: "text-primary",
  },
  {
    num: "02",
    icon: CalendarCheck,
    title: "Technician Accepts & Visits",
    desc: "A verified pro accepts your request and arrives at your doorstep with safety equipment.",
    color: "from-amber-400/15 to-orange-300/10",
    iconColor: "text-amber-500",
  },
  {
    num: "03",
    icon: CheckCircle,
    title: "Job Done & Easy Payment",
    desc: "Inspect the work, pay seamlessly via Cash or Digital Payment, and leave a review.",
    color: "from-emerald-400/15 to-green-300/10",
    iconColor: "text-emerald-500",
  },
];

export function HowItWorks() {
  return (
    <section className="py-20 bg-muted/30 border-y border-border/40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-primary tracking-wider uppercase bg-primary/8 px-4 py-1.5 rounded-full border border-primary/15">
            <span>Simple 3-Step Process</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            How FixIt Now Works
          </h2>
          <p className="text-sm text-muted-foreground max-w-lg mx-auto">
            Getting professional home repairs done has never been easier.
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {steps.map((s, idx) => {
            const IconComponent = s.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                className="bg-card border border-border/60 rounded-2xl p-7 sm:p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] transition-all duration-500 space-y-5 relative group"
              >
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${s.color} ${s.iconColor} flex items-center justify-center`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <span className="text-3xl font-black text-border group-hover:text-primary/30 transition-colors duration-300">
                    {s.num}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                  {s.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}