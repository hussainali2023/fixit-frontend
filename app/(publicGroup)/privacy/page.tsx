import React from "react";
import Link from "next/link";
import { ShieldCheck, Lock, Eye, FileText, ArrowLeft, Mail, Phone } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | FixItNow",
  description: "Learn how FixItNow collects, uses, and safeguards your personal data.",
};

export default function PrivacyPolicyPage() {
  const sections = [
    {
      title: "1. Information We Collect",
      icon: Eye,
      content:
        "When you register or book services on FixItNow, we collect information including your full name, email address, phone number, physical service location/address, and booking requests. For verified technicians, we additionally collect identity verification proofs, trade certifications, and payout bank information.",
    },
    {
      title: "2. How We Use Your Information",
      icon: FileText,
      content:
        "We use your personal data to facilitate booking appointments, match you with qualified nearby technicians, process secure payments, provide real-time job status notifications, and continuously improve our service marketplace. We do not sell your personal data to any third-party advertisers.",
    },
    {
      title: "3. Data Security & Storage",
      icon: Lock,
      content:
        "All data transmissions are encrypted using industry-standard SSL/TLS protocols. Sensitive credentials like passwords are hash-encrypted using bcrypt. Payment transactions are securely handled through certified PCI-compliant gateways; FixItNow never stores raw credit/debit card numbers on our servers.",
    },
    {
      title: "4. Sharing with Technicians & Partners",
      icon: ShieldCheck,
      content:
        "Only essential contact and location information is shared with the assigned technician upon service booking confirmation to enable them to reach your venue and execute the repair job. Technicians are legally bound by our strict non-disclosure and privacy terms.",
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
            <ShieldCheck className="w-4 h-4" /> Data Privacy & Protection
          </div>
          <h1
            className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            FixItNow Privacy Policy
          </h1>
          <p className="text-sm text-muted-foreground">
            Last Updated: October 2026 • Effective Date: January 1, 2026
          </p>
        </div>

        {/* Introduction Banner */}
        <div className="premium-card p-6 rounded-2xl bg-gradient-to-r from-primary/5 via-primary/10 to-transparent border border-primary/20">
          <p className="text-sm text-foreground/90 leading-relaxed">
            At <strong>FixItNow</strong>, accessible from fixitnow.com, your privacy is one of our top priorities. This Privacy Policy document outlines the types of information that is collected and recorded by FixItNow and how we use and protect it.
          </p>
        </div>

        {/* Policy Sections */}
        <div className="space-y-6">
          {sections.map((sec, idx) => {
            const Icon = sec.icon;
            return (
              <div
                key={idx}
                className="premium-card p-6 sm:p-8 rounded-2xl border border-border/60 hover:border-primary/40 transition-colors space-y-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h2 className="text-lg font-bold text-foreground">{sec.title}</h2>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed pl-13">
                  {sec.content}
                </p>
              </div>
            );
          })}
        </div>

        {/* Contact info for privacy requests */}
        <div className="premium-card p-6 sm:p-8 rounded-2xl border border-border space-y-4">
          <h3 className="text-base font-bold text-foreground">Questions or Data Requests?</h3>
          <p className="text-sm text-muted-foreground">
            If you wish to access, rectify, or delete your personal records from our platform, reach out to our privacy officer directly:
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <a
              href="mailto:support@fixitnow.com"
              className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-primary/10 text-primary text-xs font-bold hover:bg-primary/20 transition-colors"
            >
              <Mail className="w-4 h-4" /> support@fixitnow.com
            </a>
            <a
              href="tel:+919064198653"
              className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-muted text-foreground text-xs font-bold hover:bg-muted/80 transition-colors"
            >
              <Phone className="w-4 h-4" /> +91 9064198653
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
