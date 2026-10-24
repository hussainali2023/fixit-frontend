"use client"

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Clock, DollarSign, Headphones, ArrowRight, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function AboutSection() {
  const features = [
    { icon: ShieldCheck, title: "100% Verified Professionals", description: "Every technician undergoes background checks.", color: "from-primary/15 to-teal-400/10", iconColor: "text-primary" },
    { icon: Clock, title: "Instant & Flexible Booking", description: "Choose exact time slots fitting your schedule.", color: "from-amber-400/15 to-orange-300/10", iconColor: "text-amber-500" },
    { icon: DollarSign, title: "Transparent Pricing", description: "No hidden charges or surprise costs.", color: "from-emerald-400/15 to-green-300/10", iconColor: "text-emerald-500" },
    { icon: Headphones, title: "24/7 Dedicated Support", description: "Our team is available round-the-clock.", color: "from-sky-400/15 to-blue-300/10", iconColor: "text-sky-500" },
  ];

  return (
    <section className="py-20 lg:py-28 bg-muted/25 border-y border-border/30 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT: Image */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 relative"
          >
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.12)] border border-border/40">
              <Image
                unoptimized
                src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1200&auto=format&fit=crop"
                alt="FixItNow Technician"
                fill
                className="object-cover"
              />
            </div>

            <motion.div 
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="absolute -bottom-5 -right-2 sm:right-6 p-4 sm:p-5 rounded-2xl bg-card/95 backdrop-blur-xl border border-border/40 shadow-[0_8px_32px_rgba(0,0,0,0.1)] flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/15 to-teal-400/10 text-primary flex items-center justify-center shrink-0">
                <Award className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-xl font-extrabold text-foreground tracking-tight">Verified</p>
                <p className="text-xs text-muted-foreground font-medium">Certified Technicians</p>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT: Content */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 space-y-8 text-left"
          >
            <div>
              <span className="text-xs font-bold tracking-wider text-primary uppercase bg-primary/8 px-4 py-1.5 rounded-full border border-primary/15">
                About FixItNow
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight mt-4 leading-[1.15]">
                Redefining Home Services with <span className="text-primary">Trust & Quality</span>
              </h2>
            </div>

            <p className="text-base text-muted-foreground leading-relaxed">
              FixItNow is a modern marketplace designed to seamlessly connect homeowners with certified, top-rated technicians with quality guarantees.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -3 }}
                    transition={{ duration: 0.2 }}
                    className="p-4 rounded-xl bg-card border border-border/50 hover:border-primary/25 transition-all duration-300 space-y-2.5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)]"
                  >
                    <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${item.color} ${item.iconColor} flex items-center justify-center`}>
                      <Icon className="w-4.5 h-4.5" />
                    </div>
                    <h4 className="text-sm font-bold text-foreground">{item.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>
                  </motion.div>
                );
              })}
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link href="/services">
                <Button className="rounded-xl font-bold px-6 py-6 flex items-center gap-2 cursor-pointer shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all bg-gradient-to-r from-primary to-teal-500 text-white">
                  <span>Explore All Services</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}