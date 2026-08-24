/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { ServiceCard } from "./ServiceCard";
import Link from "next/link";
import { ArrowRight, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function PublicServices({ services = [] }: { services: any[] }) {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6"
        >
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-primary tracking-wider uppercase bg-primary/10 px-3.5 py-1 rounded-full border border-primary/20">
              <Wrench className="w-3.5 h-3.5" />
              <span>Our Services</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight">
              Explore Our Professional Services
            </h2>

            <p className="text-muted-foreground text-sm sm:text-base">
              From plumbing and electrical repairs to AC servicing and deep
              cleaning — get background-checked experts at your doorstep.
            </p>
          </div>

          <Link href="/services" className="shrink-0">
            <Button
              variant="outline"
              className="rounded-xl flex items-center gap-2 font-semibold hover:scale-105 transition-transform"
            >
              <span>View All Services</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {services.slice(0, 4).map((service: any) => (
            <motion.div key={service.id} variants={itemVariants}>
              <ServiceCard service={service} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}