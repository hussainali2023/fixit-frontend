"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Play, Star, ShieldCheck, CheckCircle2, Search, Wrench, Zap, Droplet, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function HeroSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/services?searchTerm=${encodeURIComponent(searchTerm)}`);
    } else {
      router.push("/services");
    }
  };

  return (
    <section className="relative w-full bg-background py-16 lg:py-24 overflow-hidden">

      {/* Premium Ambient Background Glow Blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* LEFT COLUMN: Text, Interactive Search & Actions */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-6 space-y-6 text-left"
          >
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 text-xs font-extrabold text-primary bg-primary/10 px-3.5 py-1.5 rounded-full border border-primary/20 shadow-xs">
              <ShieldCheck className="w-4 h-4" />
              <span>#1 Home Service Marketplace in India</span>
            </div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-3xl sm:text-5xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15]"
            >
              Your Trusted Partner for <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-primary via-emerald-600 to-primary bg-clip-text text-transparent">
                Home & Corporate
              </span> <br className="hidden sm:block" />
              Services
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-base text-muted-foreground max-w-xl font-normal"
            >
              From AC repair to electrical wiring — get background-checked expert technicians at your doorstep within 30 minutes.
            </motion.p>

            {/* 🟢 INTERACTIVE HERO SEARCH BAR */}
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              onSubmit={handleHeroSearch}
              className="relative max-w-lg flex items-center bg-card border border-border p-1.5 rounded-2xl shadow-lg focus-within:ring-2 focus-within:ring-primary/50"
            >
              <Search className="w-5 h-5 absolute left-4 text-muted-foreground" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="What service do you need? (e.g. AC, Electrical, Plumbing)..."
                className="w-full bg-transparent pl-11 pr-28 py-3 text-xs sm:text-sm font-medium text-foreground focus:outline-none"
              />
              <Button
                type="submit"
                className="absolute right-1.5 rounded-xl text-xs font-bold px-4 py-2.5 bg-primary text-white cursor-pointer"
              >
                Search Now
              </Button>
            </motion.form>

            {/* 🟢 POPULAR CATEGORY CHIPS */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-muted-foreground">
              <span>Popular:</span>
              <Link href="/services?searchTerm=AC">
                <span className="inline-flex items-center gap-1 bg-accent/60 hover:bg-primary/10 hover:text-primary px-3 py-1 rounded-full border border-border transition-all cursor-pointer">
                  <Wrench className="w-3 h-3 text-primary" /> AC Repair
                </span>
              </Link>
              <Link href="/services?searchTerm=Electrical">
                <span className="inline-flex items-center gap-1 bg-accent/60 hover:bg-primary/10 hover:text-primary px-3 py-1 rounded-full border border-border transition-all cursor-pointer">
                  <Zap className="w-3 h-3 text-amber-500" /> Electrical
                </span>
              </Link>
              <Link href="/services?searchTerm=Plumbing">
                <span className="inline-flex items-center gap-1 bg-accent/60 hover:bg-primary/10 hover:text-primary px-3 py-1 rounded-full border border-border transition-all cursor-pointer">
                  <Droplet className="w-3 h-3 text-blue-500" /> Plumbing
                </span>
              </Link>
              <Link href="/services?searchTerm=Cleaning">
                <span className="inline-flex items-center gap-1 bg-accent/60 hover:bg-primary/10 hover:text-primary px-3 py-1 rounded-full border border-border transition-all cursor-pointer">
                  <Sparkles className="w-3 h-3 text-emerald-500" /> Cleaning
                </span>
              </Link>
            </div>

            {/* Primary Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <Link href="/services">
                <Button className="text-sm font-bold px-7 py-6 rounded-xl shadow-lg cursor-pointer transition-all hover:scale-[1.03] bg-primary text-white">
                  Book Service Now
                </Button>
              </Link>

              <Link href="/services">
                <Button
                  variant="outline"
                  className="border-primary/40 text-foreground hover:bg-accent text-sm font-semibold px-6 py-6 rounded-xl cursor-pointer transition-all flex items-center gap-2 hover:scale-[1.03]"
                >
                  <Play className="w-4 h-4 fill-primary text-primary" />
                  Explore Services
                </Button>
              </Link>
            </motion.div>

            {/* Hero Trust Counter Metrics Badge */}
            <div className="pt-6 border-t border-border/80 grid grid-cols-3 gap-4">
              <div>
                <p className="text-lg sm:text-2xl font-black text-foreground">5,000+</p>
                <p className="text-[11px] font-semibold text-muted-foreground">Happy Customers</p>
              </div>
              <div>
                <p className="text-lg sm:text-2xl font-black text-primary">1,200+</p>
                <p className="text-[11px] font-semibold text-muted-foreground">Verified Technicians</p>
              </div>
              <div>
                <p className="text-lg sm:text-2xl font-black text-amber-500 flex items-center gap-1">
                  4.9 <Star className="w-4 h-4 fill-amber-400 text-amber-400 inline" />
                </p>
                <p className="text-[11px] font-semibold text-muted-foreground">Average Rating</p>
              </div>
            </div>

          </motion.div>

          {/* RIGHT COLUMN: Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-6 relative flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-lg aspect-4/3 rounded-3xl overflow-hidden shadow-2xl border border-border group">
              <Image
                unoptimized
                src="https://i.ibb.co.com/LXkVj3tq/part-male-construction-worker-329181-3734.avif"
                alt="Home Services Helper"
                fill
                priority
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Floating Verified Badge Card */}
              <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-md p-3.5 rounded-2xl border border-border shadow-lg flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-foreground">Verified Technician</p>
                  <p className="text-[10px] text-muted-foreground">30-Day Service Warranty Included</p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}