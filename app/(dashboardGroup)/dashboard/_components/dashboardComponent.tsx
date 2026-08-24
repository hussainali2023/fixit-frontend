"use client";

import React from "react";
import Link from "next/link";
import { Calendar, Clock, CheckCircle2, Wrench, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { BookingItem } from "@/lib/types";

interface CustomerDashboardProps {
  bookings: BookingItem[];
}

export default function CustomerDashboardUI({ bookings = [] }: CustomerDashboardProps) {
  const totalBookings = bookings.length;
  const activeJobs = bookings.filter(
    (b) => b.status === "REQUESTED" || b.status === "ACCEPTED" || b.status === "PAID"
  ).length;
  const completedJobs = bookings.filter((b) => b.status === "COMPLETED").length;

  const recentBookings = bookings.slice(0, 3);

  return (
    <div className="min-h-screen bg-background py-6 px-4">
      <div className="max-w-5xl mx-auto space-y-6">
        
        <div className="flex justify-between items-center border-b border-border pb-4">
          <div>
            <h1 className="text-xl font-bold text-foreground">Welcome to Dashboard</h1>
            <p className="text-xs text-muted-foreground">Manage your service requests easily.</p>
          </div>
          <Link href="/services">
            <Button size="sm" className="text-xs font-bold gap-2">
              <Wrench className="w-4 h-4" /> Book Service
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-card border border-border space-y-1">
            <div className="flex items-center gap-2 text-primary">
              <Calendar className="w-4 h-4" />
              <span className="text-xs font-semibold">Total Bookings</span>
            </div>
            <p className="text-xl font-bold text-foreground">{totalBookings}</p>
          </div>

          <div className="p-4 rounded-xl bg-card border border-border space-y-1">
            <div className="flex items-center gap-2 text-blue-600">
              <Clock className="w-4 h-4" />
              <span className="text-xs font-semibold">Active Jobs</span>
            </div>
            <p className="text-xl font-bold text-foreground">{activeJobs}</p>
          </div>

          <div className="p-4 rounded-xl bg-card border border-border space-y-1">
            <div className="flex items-center gap-2 text-emerald-600">
              <CheckCircle2 className="w-4 h-4" />
              <span className="text-xs font-semibold">Completed Jobs</span>
            </div>
            <p className="text-xl font-bold text-foreground">{completedJobs}</p>
          </div>
        </div>

        {/* Simple Recent Bookings List */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <h2 className="text-sm font-bold text-foreground">Recent Bookings</h2>
            <Link href="/dashboard/my-booking" className="text-xs text-primary font-bold flex items-center gap-1">
              View All <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-2">
            {recentBookings.length > 0 ? (
              recentBookings.map((b) => (
                <div
                  key={b.id}
                  className="bg-card border border-border rounded-xl p-3 flex justify-between items-center text-xs"
                >
                  <div>
                    <p className="font-bold text-foreground">{b.service?.title || "Service Request"}</p>
                    <p className="text-[11px] text-muted-foreground">{b.bookingDate} • {b.timeSlot}</p>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-accent uppercase">
                    {b.status}
                  </span>
                </div>
              ))
            ) : (
              <div className="text-center py-6 bg-card border border-border rounded-xl text-xs text-muted-foreground">
                No recent bookings found.
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}