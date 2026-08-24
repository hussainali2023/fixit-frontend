"use client"

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Clock, DollarSign, Headphones, ArrowRight, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function AboutSection() {
  const features = [
    { icon: ShieldCheck, title: "100% Verified Professionals", description: "Every technician undergoes background checks." },
    { icon: Clock, title: "Instant & Flexible Booking", description: "Choose exact time slots fitting your schedule." },
    { icon: DollarSign, title: "Transparent Pricing", description: "No hidden charges or surprise costs." },
    { icon: Headphones, title: "24/7 Dedicated Support", description: "Our team is available round-the-clock." },
  ];

  return (
    <section className="py-16 lg:py-24 bg-accent/30 border-y border-border/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT: Image Animated Slide In */}
          <motion.div 
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-border">
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
              transition={{ duration: 0.5, delay: 0.4 }}
              className="absolute -bottom-6 -right-2 sm:right-6 p-4 sm:p-5 rounded-2xl bg-card border border-border shadow-xl flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <Award className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-extrabold text-foreground">99.8%</p>
                <p className="text-xs text-muted-foreground font-medium">On-Time Satisfaction</p>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT: Content Animated Slide In */}
          <motion.div 
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 space-y-8 text-left"
          >
            <div>
              <span className="text-xs font-bold tracking-wider text-primary uppercase bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                About FixItNow
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight mt-3 leading-[1.2]">
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
                    whileHover={{ y: -5 }}
                    className="p-4 rounded-xl bg-card border border-border/80 hover:border-primary/40 transition-all space-y-2"
                  >
                    <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <h4 className="text-sm font-bold text-foreground">{item.title}</h4>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </motion.div>
                );
              })}
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link href="/services">
                <Button className="rounded-xl font-bold px-6 py-6 flex items-center gap-2 cursor-pointer shadow-md hover:scale-105 transition-all">
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