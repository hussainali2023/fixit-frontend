/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  CheckCircle,
  XCircle,
  PlayCircle,
  Clock,
  Wrench,
  Calendar,
  User,
  DollarSign,
  Loader2,
  AlertCircle,
  Package,
} from "lucide-react";
import { toast } from "sonner";
import { updateBookingStatusAction } from "@/lib/actions/bookingActions";

const StatusBadge = ({ status }: { status: string }) => {
  const map: Record<string, string> = {
    REQUESTED: "badge-requested",
    ACCEPTED: "badge-accepted",
    DECLINED: "badge-declined",
    PAID: "badge-paid",
    IN_PROGRESS: "badge-in_progress",
    COMPLETED: "badge-completed",
    CANCELLED: "badge-cancelled",
  };
  return (
    <span className={`inline-flex px-2.5 py-1 rounded-full text-[11px] font-bold border uppercase ${map[status] || "badge-requested"}`}>
      {status?.replace("_", " ")}
    </span>
  );
};

function JobCard({ booking, onUpdate }: { booking: any; onUpdate: (id: string, status: string) => void }) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();
  const status = booking.status as string;

  const handleAction = (newStatus: string) => {
    startTransition(async () => {
      const res = await updateBookingStatusAction(booking.id, newStatus);
      if (res.success) {
        toast.success(`Booking ${newStatus.toLowerCase().replace("_", " ")} successfully`);
        onUpdate(booking.id, newStatus);
        router.refresh();
      } else {
        toast.error(res.message || "Action failed");
      }
    });
  };

  const customer = booking.customer;
  const service = booking.service;
  const scheduledDate = booking.scheduledDate
    ? new Date(booking.scheduledDate).toLocaleDateString("en-US", {
      weekday: "short", month: "short", day: "numeric", year: "numeric",
    })
    : "N/A";

  return (
    <div className="premium-card rounded-2xl overflow-hidden">
      <div className="p-5 space-y-4">
        {/* Service + Status */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <Wrench className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-bold text-foreground text-sm">{service?.name || "Service"}</h3>
              <p className="text-xs text-muted-foreground">{service?.category || "General"}</p>
            </div>
          </div>
          <StatusBadge status={status} />
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-2.5">
          {customer?.name && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <User className="w-3.5 h-3.5 text-primary shrink-0" />
              <span className="truncate">{customer.name}</span>
            </div>
          )}
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar className="w-3.5 h-3.5 text-primary shrink-0" />
            <span>{scheduledDate}</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-foreground">
            <DollarSign className="w-3.5 h-3.5 text-primary shrink-0" />
            <span>₹{booking.totalPrice || 0}</span>
          </div>
          {booking.payment?.status && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="w-3.5 h-3.5 text-primary shrink-0" />
              <span>Payment: {booking.payment.status}</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2 pt-1 border-t border-border">
          {status === "REQUESTED" && (
            <>
              <button
                onClick={() => handleAction("ACCEPTED")}
                disabled={pending}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 transition-colors disabled:opacity-60 cursor-pointer"
              >
                {pending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <CheckCircle className="w-3.5 h-3.5" />}
                Accept
              </button>
              <button
                onClick={() => handleAction("DECLINED")}
                disabled={pending}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border border-destructive/30 text-destructive hover:bg-destructive/10 transition-colors disabled:opacity-60 cursor-pointer"
              >
                {pending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <XCircle className="w-3.5 h-3.5" />}
                Decline
              </button>
            </>
          )}
          {status === "PAID" && (
            <button
              onClick={() => handleAction("IN_PROGRESS")}
              disabled={pending}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-blue-600 text-white hover:bg-blue-700 transition-colors disabled:opacity-60 cursor-pointer"
            >
              {pending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <PlayCircle className="w-3.5 h-3.5" />}
              Start Job
            </button>
          )}
          {status === "IN_PROGRESS" && (
            <button
              onClick={() => handleAction("COMPLETED")}
              disabled={pending}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-60 cursor-pointer"
            >
              {pending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <CheckCircle className="w-3.5 h-3.5" />}
              Mark Completed
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function TechnicianDashboardUI({ bookings: initialBookings }: { bookings: any[] }) {
  const [bookings, setBookings] = useState(initialBookings);
  const [filter, setFilter] = useState("ALL");

  const onUpdate = (id: string, status: string) => {
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)));
  };

  const statuses = ["ALL", "REQUESTED", "ACCEPTED", "PAID", "IN_PROGRESS", "COMPLETED", "DECLINED", "CANCELLED"];
  const filtered = filter === "ALL" ? bookings : bookings.filter((b) => b.status === filter);

  // Stats
  const stats = {
    total: bookings.length,
    pending: bookings.filter((b) => b.status === "REQUESTED").length,
    active: bookings.filter((b) => ["ACCEPTED", "PAID", "IN_PROGRESS"].includes(b.status)).length,
    completed: bookings.filter((b) => b.status === "COMPLETED").length,
    earnings: bookings
      .filter((b) => b.status === "COMPLETED" || b.status === "IN_PROGRESS")
      .reduce((sum, b) => sum + (b.totalPrice || 0), 0),
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
          My Jobs
        </h1>
        <p className="text-sm text-muted-foreground mt-1">Manage your incoming and active service requests</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Jobs", value: stats.total, color: "text-foreground", icon: Package },
          { label: "Pending", value: stats.pending, color: "text-amber-600", icon: Clock },
          { label: "Active", value: stats.active, color: "text-blue-600", icon: PlayCircle },
          { label: "Earnings", value: `₹${stats.earnings.toLocaleString()}`, color: "text-emerald-600", icon: DollarSign },
        ].map(({ label, value, color, icon: Icon }) => (
          <div key={label} className="premium-card rounded-2xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center shrink-0">
              <Icon className={`w-5 h-5 ${color}`} />
            </div>
            <div>
              <p className={`text-lg font-black ${color}`}>{value}</p>
              <p className="text-xs text-muted-foreground">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div className="flex gap-2 flex-wrap">
        {statuses.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer border ${filter === s
                ? "bg-primary text-primary-foreground border-primary shadow-sm"
                : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
              }`}
          >
            {s.replace("_", " ")}
          </button>
        ))}
      </div>

      {/* Jobs Grid */}
      {filtered.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {filtered.map((booking) => (
            <JobCard key={booking.id} booking={booking} onUpdate={onUpdate} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 rounded-2xl border border-dashed border-border">
          <AlertCircle className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
          <p className="font-bold text-foreground">No jobs found</p>
          <p className="text-sm text-muted-foreground mt-1">
            {filter !== "ALL" ? `No ${filter.replace("_", " ")} jobs` : "Bookings from customers will appear here."}
          </p>
        </div>
      )}
    </div>
  );
}