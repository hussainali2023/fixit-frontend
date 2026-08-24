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
    <section className="py-16 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Animated Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto space-y-3"
        >
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-500 uppercase bg-amber-50 dark:bg-amber-950/40 px-3.5 py-1 rounded-full border border-amber-200">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <span>Customer Reviews</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-foreground">
            Loved by Thousands of Homeowners
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            See what our customers have to say about their experience with Fixit
            Now.
          </p>
        </motion.div>

        {/* Animated Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="bg-card border border-border rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <Quote className="w-8 h-8 text-primary/30" />
                <p className="text-xs text-muted-foreground leading-relaxed italic">
                  {r.text}
                </p>
              </div>

              <div className="pt-4 border-t border-border flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 border border-primary/20">
                  <Image
                    unoptimized
                    src={r.avatar}
                    alt={r.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-extrabold text-xs text-foreground">
                    {r.name}
                  </h4>
                  <p className="text-[10px] text-muted-foreground">
                    {r.location}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
