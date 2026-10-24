import React from "react";
import Link from "next/link";
import { FileCheck, ShieldAlert, Award, CreditCard, ArrowLeft, Mail } from "lucide-react";

export const metadata = {
  title: "Terms of Service | FixItNow",
  description: "Terms and conditions governing the use of FixItNow marketplace platform.",
};

export default function TermsOfServicePage() {
  const terms = [
    {
      title: "1. Acceptance of Terms",
      icon: FileCheck,
      content:
        "By accessing or using FixItNow, booking any technician service, or offering technician services through our platform, you agree to be bound by these Terms of Service. If you do not agree with any part, you may not access our services.",
    },
    {
      title: "2. Customer Obligations & Cancellations",
      icon: Award,
      content:
        "Customers agree to provide accurate service locations and cooperate with arriving verified technicians. Booking cancellations made at least 2 hours before the scheduled time slot are eligible for a 100% full refund with zero penalty fees.",
    },
    {
      title: "3. Technician Service Standards & Guarantee",
      icon: ShieldAlert,
      content:
        "All verified technicians listed on FixItNow are independent contractors vetted for safety and proficiency. Every completed repair comes with our 30-Day FixItNow Service Guarantee against recurring workmanship defects.",
    },
    {
      title: "4. Pricing, Payments & Invoicing",
      icon: CreditCard,
      content:
        "All payments are processed securely through the platform upon technician acceptance and work execution. Technicians are prohibited from soliciting direct unlogged cash or offline transactions outside the FixItNow platform.",
    },
  ];

  return (
    <div className="min-h-screen bg-background py-14 px-4">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        {/* Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-primary bg-primary/10 px-3.5 py-1.5 rounded-full border border-primary/20">
            <FileCheck className="w-4 h-4" /> Legal Agreement
          </div>
          <h1
            className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Terms of Service
          </h1>
          <p className="text-sm text-muted-foreground">
            Last Updated: October 2026 • Governing Marketplace Usage
          </p>
        </div>

        {/* Introduction Banner */}
        <div className="premium-card p-6 rounded-2xl bg-gradient-to-r from-primary/5 via-primary/10 to-transparent border border-primary/20">
          <p className="text-sm text-foreground/90 leading-relaxed">
            Welcome to FixItNow. These terms govern the relationship between FixItNow, customers seeking maintenance or repair services, and independent verified technicians.
          </p>
        </div>

        {/* Terms Sections */}
        <div className="space-y-6">
          {terms.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="premium-card p-6 sm:p-8 rounded-2xl border border-border/60 hover:border-primary/40 transition-colors space-y-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h2 className="text-lg font-bold text-foreground">{item.title}</h2>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed pl-13">
                  {item.content}
                </p>
              </div>
            );
          })}
        </div>

        {/* Need Help */}
        <div className="premium-card p-6 sm:p-8 rounded-2xl border border-border space-y-4">
          <h3 className="text-base font-bold text-foreground">Need Assistance with a Service or Dispute?</h3>
          <p className="text-sm text-muted-foreground">
            Our dispute resolution team is available to ensure fair resolution for all customers and technicians.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-bold hover:bg-primary/90 transition-colors shadow-sm"
            >
              <Mail className="w-4 h-4" /> Contact Customer Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
