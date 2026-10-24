"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  Wrench,
  Zap,
  Droplet,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  CreditCard,
  UserCheck,
  ArrowRight,
  Briefcase,
  HelpCircle,
  FileCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function HeroSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/services?search=${encodeURIComponent(searchTerm)}`);
    } else {
      router.push("/services");
    }
  };

  const platformFeatures = [
    {
      step: "01",
      icon: Search,
      title: "Browse Real Services",
      desc: "Explore verified listings with transparent upfront pricing for AC, electrical, plumbing, and cleaning.",
    },
    {
      step: "02",
      icon: Calendar,
      title: "Schedule Your Slot",
      desc: "Choose your preferred service date. The technician confirms arrival before any work starts.",
    },
    {
      step: "03",
      icon: CreditCard,
      title: "Secure Digital Payment",
      desc: "Pay safely online only after technician confirmation. Download verifiable PDF receipts anytime.",
    },
    {
      step: "04",
      icon: Briefcase,
      title: "Earn as a Technician",
      desc: "Skilled professionals can register, create service offerings, set availability, and manage client jobs.",
    },
  ];

  return (
    <section className="relative w-full bg-background py-14 lg:py-20 overflow-hidden border-b border-border/40">
      {/* Ambient Glow Elements */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/8 rounded-full blur-[100px] pointer-events-none -translate-y-1/3" />
      <div className="absolute bottom-0 right-1/6 w-[450px] h-[450px] bg-amber-400/6 rounded-full blur-[90px] pointer-events-none translate-y-1/3" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* LEFT COLUMN: Clear explanation & search */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-6 text-left"
          >
            {/* Mission Badge */}
            <div className="inline-flex items-center gap-2 text-xs font-bold text-primary bg-primary/10 px-4 py-2 rounded-full border border-primary/20">
              <ShieldCheck className="w-4 h-4" />
              <span>Verified On-Demand Repair & Maintenance Marketplace</span>
            </div>

            {/* Main Headline */}
            <h1
              className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-foreground leading-[1.14]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Fix Your Home & Office Repairs with{" "}
              <span className="bg-gradient-to-r from-primary via-teal-500 to-cyan-500 bg-clip-text text-transparent">
                Verified Experts
              </span>
            </h1>

            {/* What this site is and what it works for */}
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              <strong>FixItNow</strong> is a transparent service marketplace connecting homeowners and corporate offices directly with skilled, background-checked technicians. Whether you need electrical wiring, AC servicing, plumbing repairs, or deep cleaning — find, schedule, and pay verified professionals with zero hidden charges.
            </p>

            {/* Search Bar */}
            <form
              onSubmit={handleHeroSearch}
              className="relative max-w-xl flex items-center bg-card border border-border/70 p-1.5 rounded-2xl shadow-sm focus-within:shadow-md focus-within:border-primary/40 transition-all duration-300"
            >
              <Search className="w-5 h-5 absolute left-4 text-muted-foreground/60" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search services (e.g. AC Repair, Electrical, Plumbing)..."
                className="w-full bg-transparent pl-11 pr-28 py-3 text-xs sm:text-sm font-medium text-foreground focus:outline-none placeholder:text-muted-foreground/50"
              />
              <Button
                type="submit"
                className="absolute right-1.5 rounded-xl text-xs font-bold px-4 py-2.5 bg-gradient-to-r from-primary to-teal-500 text-white cursor-pointer shadow-sm hover:shadow-md transition-all"
              >
                Search Services
              </Button>
            </form>

            {/* Popular Services Quick Chips */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-muted-foreground">
              <span className="text-foreground/70">Popular Categories:</span>
              <Link href="/services?category=AC+Repair">
                <span className="inline-flex items-center gap-1.5 bg-muted/60 hover:bg-primary/10 hover:text-primary px-3 py-1.5 rounded-full border border-border/50 transition-all cursor-pointer">
                  <Wrench className="w-3 h-3 text-primary" /> AC Repair
                </span>
              </Link>
              <Link href="/services?category=Electrical">
                <span className="inline-flex items-center gap-1.5 bg-muted/60 hover:bg-amber-500/10 hover:text-amber-600 px-3 py-1.5 rounded-full border border-border/50 transition-all cursor-pointer">
                  <Zap className="w-3 h-3 text-amber-500" /> Electrical
                </span>
              </Link>
              <Link href="/services?category=Plumbing">
                <span className="inline-flex items-center gap-1.5 bg-muted/60 hover:bg-sky-500/10 hover:text-sky-600 px-3 py-1.5 rounded-full border border-border/50 transition-all cursor-pointer">
                  <Droplet className="w-3 h-3 text-sky-500" /> Plumbing
                </span>
              </Link>
              <Link href="/services?category=Cleaning">
                <span className="inline-flex items-center gap-1.5 bg-muted/60 hover:bg-emerald-500/10 hover:text-emerald-600 px-3 py-1.5 rounded-full border border-border/50 transition-all cursor-pointer">
                  <Sparkles className="w-3 h-3 text-emerald-500" /> Cleaning
                </span>
              </Link>
            </div>

            {/* Direct Role Action CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link href="/services">
                <Button className="rounded-xl font-bold text-xs px-6 py-5 bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm flex items-center gap-2">
                  <span>Browse All Services</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/register?role=technician">
                <Button variant="outline" className="rounded-xl font-semibold text-xs px-5 py-5 border-border hover:bg-muted/70 flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-primary" />
                  <span>Join as Technician</span>
                </Button>
              </Link>
            </div>

            {/* Real Trust Pillars (Replacing fake stats/ratings) */}
            <div className="pt-6 border-t border-border/50 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="flex items-center gap-2 text-foreground font-semibold">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                <span>Verified Technicians</span>
              </div>
              <div className="flex items-center gap-2 text-foreground font-semibold">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                <span>Upfront Pricing</span>
              </div>
              <div className="flex items-center gap-2 text-foreground font-semibold">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                <span>Secure Payments</span>
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Interactive Platform Guide (Replaces the Image) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-6"
          >
            <div className="premium-card rounded-3xl p-6 sm:p-8 bg-card border border-border/80 shadow-lg space-y-6">
              
              {/* Card Header */}
              <div className="flex items-center justify-between pb-4 border-b border-border/60">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider">
                    <FileCheck className="w-4 h-4" />
                    <span>How FixItNow Works</span>
                  </div>
                  <h2 className="text-xl font-extrabold text-foreground tracking-tight">
                    Your Complete Service Hub
                  </h2>
                </div>
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                  Step-by-Step
                </span>
              </div>

              {/* 4 Clear Step Features */}
              <div className="space-y-3.5">
                {platformFeatures.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.step}
                      className="p-3.5 rounded-2xl bg-muted/40 hover:bg-muted/80 border border-border/50 hover:border-primary/30 transition-all flex items-start gap-3.5 group"
                    >
                      <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 font-black text-xs group-hover:scale-105 transition-transform">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="font-bold text-xs sm:text-sm text-foreground group-hover:text-primary transition-colors">
                            {item.title}
                          </h3>
                          <span className="text-[10px] font-black font-mono text-muted-foreground/60">
                            STEP {item.step}
                          </span>
                        </div>
                        <p className="text-[11px] sm:text-xs text-muted-foreground mt-0.5 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Two Role Options Footer */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-border/60">
                <Link
                  href="/services"
                  className="p-3.5 rounded-2xl bg-primary/5 hover:bg-primary/10 border border-primary/20 transition-all block group"
                >
                  <p className="text-xs font-bold text-primary flex items-center justify-between">
                    <span>For Customers</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </p>
                  <p className="text-[11px] text-muted-foreground mt-1">
                    Book repairs & get doorstep visits with upfront prices.
                  </p>
                </Link>

                <Link
                  href="/register?role=technician"
                  className="p-3.5 rounded-2xl bg-muted/60 hover:bg-muted border border-border transition-all block group"
                >
                  <p className="text-xs font-bold text-foreground flex items-center justify-between">
                    <span>For Technicians</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </p>
                  <p className="text-[11px] text-muted-foreground mt-1">
                    List your skills, accept jobs, and earn on your schedule.
                  </p>
                </Link>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}