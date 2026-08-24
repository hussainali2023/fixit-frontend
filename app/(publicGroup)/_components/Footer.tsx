
import React from "react";
import Link from "next/link";
import { Wrench, Phone, Mail, MapPin, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-card border-t border-border text-foreground pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-border/60">

          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-primary-foreground shadow-sm">
                <Wrench className="w-5 h-5" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-primary">
                FixItNow
              </span>
            </Link>

            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
              Your trusted marketplace for reliable home and corporate services. Connect with verified technicians in minutes.
            </p>

            <div className="space-y-2 text-xs text-muted-foreground pt-2">
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary shrink-0" />
                <span>Kolkata, India</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <span>+91 1700-000000</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <span>support@fixitnow.com</span>
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-foreground uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-primary transition-colors">
                  Browse Services
                </Link>
              </li>
              <li>
                <Link href="/technicians" className="hover:text-primary transition-colors">
                  Top Technicians
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Service Categories */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-foreground uppercase tracking-wider">
              Popular Services
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/services?category=plumbing" className="hover:text-primary transition-colors">
                  Plumbing Repair
                </Link>
              </li>
              <li>
                <Link href="/services?category=electrical" className="hover:text-primary transition-colors">
                  Electrical Wiring
                </Link>
              </li>
              <li>
                <Link href="/services?category=ac-repair" className="hover:text-primary transition-colors">
                  AC Servicing
                </Link>
              </li>
              <li>
                <Link href="/services?category=cleaning" className="hover:text-primary transition-colors">
                  House Cleaning
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer & Technician Dashboards */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-foreground uppercase tracking-wider">
              Portals
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/dashboard/customer" className="hover:text-primary transition-colors">
                  Customer Dashboard
                </Link>
              </li>
              <li>
                <Link href="/dashboard/technician" className="hover:text-primary transition-colors">
                  Technician Portal
                </Link>
              </li>
              <li>
                <Link href="/dashboard/admin" className="hover:text-primary transition-colors">
                  Admin Dashboard
                </Link>
              </li>
              <li>
                <Link href="/auth/register?role=technician" className="hover:text-primary transition-colors font-semibold text-primary">
                  Join as Technician
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-muted-foreground gap-4">
          <p>© {new Date().getFullYear()} FixItNow. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built By Md Hussain Ali<Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
          </p>
        </div>

      </div>
    </footer>
  );
}