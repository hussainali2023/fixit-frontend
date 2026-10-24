import React from "react";
import Link from "next/link";
import {
  Wrench,
  Phone,
  Mail,
  MapPin,
  Heart,
  ShieldCheck,
  Clock,
  Sparkles,
  ArrowUpRight,
  ExternalLink,
} from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card/90 backdrop-blur-md border-t border-border/50 text-foreground pt-16 pb-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-border/40">
          
          {/* Brand Info (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary via-teal-500 to-emerald-400 flex items-center justify-center text-white shadow-md shadow-primary/20 group-hover:scale-105 transition-transform">
                <Wrench className="w-5 h-5" />
              </div>
              <span
                className="text-2xl font-black tracking-tight text-foreground group-hover:text-primary transition-colors"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Fix<span className="text-primary">ItNow</span>
              </span>
            </Link>

            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              India's trusted on-demand home and commercial repair platform. Connect with verified, background-checked technicians in minutes.
            </p>

            {/* Clickable Direct Contact List */}
            <div className="space-y-2.5 text-xs text-muted-foreground pt-2">
              <a
                href="https://maps.google.com/?q=Kolkata,+India"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 hover:text-primary transition-colors group"
                title="View on Google Maps"
              >
                <MapPin className="w-4 h-4 text-primary shrink-0 group-hover:scale-110 transition-transform" />
                <span>Kolkata, West Bengal, India</span>
                <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity ml-1" />
              </a>

              <a
                href="tel:+919064198653"
                className="flex items-center gap-2.5 hover:text-primary transition-colors group"
                title="Call Customer Helpline"
              >
                <Phone className="w-4 h-4 text-primary shrink-0 group-hover:scale-110 transition-transform" />
                <span className="font-semibold">+91 9064198653</span>
                <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 ml-1">
                  24/7 Live
                </span>
              </a>

              <a
                href="mailto:support@fixitnow.com"
                className="flex items-center gap-2.5 hover:text-primary transition-colors group"
                title="Send Support Email"
              >
                <Mail className="w-4 h-4 text-primary shrink-0 group-hover:scale-110 transition-transform" />
                <span>support@fixitnow.com</span>
              </a>
            </div>
          </div>

          {/* Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold text-foreground uppercase tracking-widest flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-primary" /> Navigation
            </h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-primary transition-colors flex items-center justify-between group">
                  <span>Home</span>
                  <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity text-primary">→</span>
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-primary transition-colors flex items-center justify-between group">
                  <span>Browse Services</span>
                  <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity text-primary">→</span>
                </Link>
              </li>
              <li>
                <Link href="/technicians" className="hover:text-primary transition-colors flex items-center justify-between group">
                  <span>Top Technicians</span>
                  <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity text-primary">→</span>
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary transition-colors flex items-center justify-between group">
                  <span>About Us</span>
                  <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity text-primary">→</span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary transition-colors flex items-center justify-between group">
                  <span>Contact & Support</span>
                  <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity text-primary">→</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Service Categories (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold text-foreground uppercase tracking-widest flex items-center gap-1.5">
              <Wrench className="w-3.5 h-3.5 text-primary" /> Popular Services
            </h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/services?category=AC+Repair"
                  className="hover:text-primary transition-colors flex items-center justify-between group"
                >
                  <span>AC Repair & Servicing</span>
                  <span className="text-xs text-muted-foreground/60 group-hover:text-primary">₹399+</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/services?category=Electrical"
                  className="hover:text-primary transition-colors flex items-center justify-between group"
                >
                  <span>Electrical Wiring & Fixes</span>
                  <span className="text-xs text-muted-foreground/60 group-hover:text-primary">₹249+</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/services?category=Plumbing"
                  className="hover:text-primary transition-colors flex items-center justify-between group"
                >
                  <span>Plumbing & Pipe Repair</span>
                  <span className="text-xs text-muted-foreground/60 group-hover:text-primary">₹199+</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/services?category=Cleaning"
                  className="hover:text-primary transition-colors flex items-center justify-between group"
                >
                  <span>Deep House Cleaning</span>
                  <span className="text-xs text-muted-foreground/60 group-hover:text-primary">₹499+</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/services?category=Painting"
                  className="hover:text-primary transition-colors flex items-center justify-between group"
                >
                  <span>Home Painting & Touch-up</span>
                  <span className="text-xs text-muted-foreground/60 group-hover:text-primary">₹999+</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/services?category=Carpentry"
                  className="hover:text-primary transition-colors flex items-center justify-between group"
                >
                  <span>Carpentry & Furniture</span>
                  <span className="text-xs text-muted-foreground/60 group-hover:text-primary">₹299+</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Portals & Accounts (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold text-foreground uppercase tracking-widest flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-primary" /> Portals & Accounts
            </h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/dashboard"
                  className="hover:text-primary transition-colors flex items-center justify-between group"
                >
                  <span>Customer Dashboard</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:text-primary transition-all" />
                </Link>
              </li>
              <li>
                <Link
                  href="/technician-dashboard"
                  className="hover:text-primary transition-colors flex items-center justify-between group"
                >
                  <span>Technician Portal</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:text-primary transition-all" />
                </Link>
              </li>
              <li>
                <Link
                  href="/admin-dashboard"
                  className="hover:text-primary transition-colors flex items-center justify-between group"
                >
                  <span>Admin Control Center</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:text-primary transition-all" />
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="hover:text-primary transition-colors flex items-center justify-between group"
                >
                  <span>Account Sign In</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:text-primary transition-all" />
                </Link>
              </li>
              <li className="pt-1">
                <Link
                  href="/register?role=technician"
                  className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                >
                  <span>Join as Verified Technician</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar with Clickable Legal Links & Credits */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <p>© {currentYear} FixItNow Inc. All rights reserved.</p>
            <Link href="/privacy" className="hover:text-primary transition-colors underline-offset-4 hover:underline">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-primary transition-colors underline-offset-4 hover:underline">
              Terms of Service
            </Link>
            <Link href="/contact" className="hover:text-primary transition-colors underline-offset-4 hover:underline">
              Support Center
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500 inline-block animate-pulse" />
            <span>by</span>
            <a
              href="mailto:iamhussainali2@gmail.com"
              className="font-bold text-foreground hover:text-primary transition-colors underline-offset-4 hover:underline"
              title="Contact Md Hussain Ali"
            >
              Md Hussain Ali
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}