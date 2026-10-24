"use client";

import React from "react";
import Image from "next/image";
import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";

export function TestimonialsSection() {
  const reviews = [
    {
      name: "Tanzim Ahmed",
      location: "Dhanmondi, Dhaka",
      text: "Found a certified electrician on Fixit Now within 30 minutes! Rofiq brother fixed our main switchboard issue in no time. Outstanding service!",
      rating: 5,
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200",
    },
    {
      name: "Nusrat Jahan",
      location: "Gulshan, Dhaka",
      text: "Booked an AC master servicing. The technician arrived right on time, provided transparent pricing, and left the room spotless after finishing.",
      rating: 5,
      avatar:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200",
    },
    {
      name: "Mahmud Hasan",
      location: "Banani, Dhaka",
      text: "The online payment and 30-day service warranty give complete peace of mind. Whenever I need home repairs, Fixit Now is my go-to platform!",
      rating: 5,
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200",
    },
  ];

  return (
    <section className="py-20 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto space-y-4"
        >
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400 uppercase bg-amber-50 dark:bg-amber-950/40 px-4 py-1.5 rounded-full border border-amber-200/60 dark:border-amber-800/50">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <span>Customer Reviews</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            Authentic Customer Feedback
          </h2>
          <p className="text-sm text-muted-foreground">
            See what our customers have to say about their experience with FixIt
            Now.
          </p>
        </motion.div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              whileHover={{ y: -4, transition: { duration: 0.25 } }}
              className="bg-card border border-border/60 rounded-2xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] transition-all duration-500 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <Quote className="w-7 h-7 text-primary/20" />
                <p className="text-sm text-muted-foreground leading-relaxed">
                  &ldquo;{r.text}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-border/40 flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 border-2 border-primary/15">
                  <Image
                    unoptimized
                    src={r.avatar}
                    alt={r.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-foreground">
                    {r.name}
                  </h4>
                  <p className="text-[11px] text-muted-foreground">
                    {r.location}
                  </p>
                </div>
                <div className="ml-auto flex items-center gap-0.5">
                  {[...Array(r.rating)].map((_, j) => (
                    <Star key={j} className="w-3 h-3 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
