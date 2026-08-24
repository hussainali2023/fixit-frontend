import React from "react";
import Link from "next/link";
import {
  Wrench,
  ShieldCheck,
  Award,
  ArrowRight,
  HeartHandshake,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  const stats = [
    { label: "Completed Services", value: "5,000+" },
    { label: "Verified Technicians", value: "200+" },
    { label: "Satisfied Customers", value: "4,800+" },
    { label: "Service Categories", value: "15+" },
  ];

  const values = [
    {
      title: "Verified Professionals",
      desc: "Every technician on FixItNow undergoes thorough background verification and skill testing.",
      icon: ShieldCheck,
    },
    {
      title: "Transparent Pricing",
      desc: "No hidden charges. Clear upfront pricing before any work starts.",
      icon: Award,
    },
    {
      title: "Fast & Reliable",
      desc: "Instant booking with guaranteed arrival on your preferred time slot.",
      icon: HeartHandshake,
    },
  ];

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-6xl mx-auto space-y-16">

        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-primary uppercase bg-primary/10 px-3.5 py-1 rounded-full border border-primary/20">
            <Wrench className="w-4 h-4" />
            <span>About FixItNow</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black text-foreground tracking-tight leading-tight">
            Your Trusted Home Service & Repair Partner
          </h1>

          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            FixItNow is India’s leading digital platform connecting homeowners with certified, background-checked technicians for electrical, plumbing, AC servicing, and appliance repairs.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((item, idx) => (
            <div
              key={idx}
              className="bg-card border border-border rounded-3xl p-6 text-center shadow-sm space-y-1"
            >
              <p className="text-3xl sm:text-4xl font-black text-primary">{item.value}</p>
              <p className="text-xs font-bold text-muted-foreground">{item.label}</p>
            </div>
          ))}
        </div>

        {/* Mission & Core Values */}
        <div className="space-y-8 pt-4">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="text-2xl font-black text-foreground">Why Choose FixItNow?</h2>
            <p className="text-xs text-muted-foreground">We prioritize quality, safety, and customer satisfaction in every repair job.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((val, idx) => {
              const IconComp = val.icon;
              return (
                <div
                  key={idx}
                  className="bg-card border border-border rounded-3xl p-6 shadow-sm space-y-3 hover:shadow-md transition-all"
                >
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary border border-primary/20 flex items-center justify-center">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h3 className="font-extrabold text-base text-foreground">{val.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{val.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Banner */}
        <div className="bg-card border border-border rounded-3xl p-8 sm:p-12 text-center space-y-4 shadow-md relative overflow-hidden">
          <h2 className="text-2xl sm:text-3xl font-black text-foreground">Need Urgent Home Repairs?</h2>
          <p className="text-xs text-muted-foreground max-w-lg mx-auto">
            Book an expert technician today and get your home appliances fixed with guaranteed satisfaction.
          </p>
          <div className="pt-2 flex justify-center">
            <Link href="/services">
              <Button className="rounded-2xl font-bold text-xs px-6 py-5 bg-primary hover:bg-primary/90 text-primary-foreground shadow-md flex items-center gap-2 cursor-pointer">
                <span>Browse All Services</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}