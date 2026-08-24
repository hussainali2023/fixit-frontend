/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useTransition } from "react";
import {
  Calendar,
  Clock,
  Wrench,
  CreditCard,
  XCircle,
  Star,
  CheckCircle,
  AlertCircle,
  ChevronRight,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import { updateBookingStatusAction } from "@/lib/actions/bookingActions";
import { checkoutAction } from "@/lib/actions/paymentActions";
import { createReviewAction } from "@/lib/actions/reviewActions";

// Booking status badge
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
  const cls = map[status] || "badge-requested";
  return (
    <span className={`inline-flex px-2.5 py-1 rounded-full text-[11px] font-bold border uppercase ${cls}`}>
      {status?.replace("_", " ")}
    </span>
  );
};

// Review Dialog
function ReviewDialog({
  bookingId,
  onDone,
}: {
  bookingId: string;
  onDone: () => void;
}) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!comment.trim()) return toast.error("Please write a review.");
    setLoading(true);
    const fd = new FormData();
    fd.set("bookingId", bookingId);
    fd.set("rating", String(rating));
    fd.set("comment", comment);
    const res = await createReviewAction(null, fd);
    setLoading(false);
    if (res.success) {
      toast.success("Review submitted! Thank you.");
      onDone();
    } else {
      toast.error(res.message || "Failed to submit review.");
    }
  };

  return (
    <div className="mt-4 p-4 bg-muted/50 rounded-2xl border border-border space-y-3">
      <p className="text-xs font-bold text-foreground">Leave a Review</p>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((s) => (
          <button key={s} onClick={() => setRating(s)} className="cursor-pointer">
            <Star
              className={`w-5 h-5 transition-colors ${s <= rating ? "fill-amber-400 text-amber-400" : "text-border"}`}
            />
          </button>
        ))}
      </div>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Share your experience..."
        className="w-full input-field resize-none h-20 text-xs"
      />
      <button
        onClick={submit}
        disabled={loading}
        className="w-full py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors disabled:opacity-60"
      >
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
        Submit Review
      </button>
    </div>
  );
}

// Booking Card
function BookingCard({ booking, onRefresh }: { booking: any; onRefresh: () => void }) {
  const [showReview, setShowReview] = useState(false);
  const [pending, startTransition] = useTransition();

  const service = booking.service;
  const status = booking.status as string;
  const scheduledDate = booking.scheduledDate
    ? new Date(booking.scheduledDate).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    })
    : "N/A";

  const canCancel = !["IN_PROGRESS", "COMPLETED", "CANCELLED", "DECLINED"].includes(status);
  const canPay = status === "ACCEPTED" && !booking.payment?.status;
  const canReview = status === "COMPLETED" && !booking.review;

  const handleCancel = () => {
    startTransition(async () => {
      const res = await updateBookingStatusAction(booking.id, "CANCELLED");
      if (res.success) {
        toast.success("Booking cancelled.");
        onRefresh();
      } else {
        toast.error(res.message || "Failed to cancel.");
      }
    });
  };

  const handlePay = () => {
    startTransition(async () => {
      const res = await checkoutAction(booking.id);
      if (!res?.success) {
        toast.error(res?.message || "Payment checkout failed.");
      }
    });
  };

  return (
    <div className="premium-card rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="p-5 flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <Wrench className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-bold text-foreground text-sm leading-tight">
              {service?.name || "Service Booking"}
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">{service?.category || "General"}</p>
          </div>
        </div>
        <StatusBadge status={status} />
      </div>

      {/* Details */}
      <div className="px-5 pb-4 grid grid-cols-2 gap-3">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Calendar className="w-3.5 h-3.5 text-primary shrink-0" />
          <span>{scheduledDate}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <CreditCard className="w-3.5 h-3.5 text-primary shrink-0" />
          <span className="font-bold text-foreground">₹{booking.totalPrice || 0}</span>
        </div>
        {booking.technician?.user?.name && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground col-span-2">
            <Clock className="w-3.5 h-3.5 text-primary shrink-0" />
            <span>Tech: {booking.technician.user.name}</span>
          </div>
        )}
      </div>

      {/* Actions */}
      {(canCancel || canPay || canReview) && (
        <div className="px-5 pb-5 flex flex-wrap gap-2 border-t border-border pt-4">
          {canPay && (
            <button
              onClick={handlePay}
              disabled={pending}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-60 cursor-pointer"
            >
              {pending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <CreditCard className="w-3.5 h-3.5" />}
              Pay Now
            </button>
          )}
          {canCancel && !canPay && (
            <button
              onClick={handleCancel}
              disabled={pending}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold border border-destructive/30 text-destructive hover:bg-destructive/10 transition-colors disabled:opacity-60 cursor-pointer"
            >
              {pending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <XCircle className="w-3.5 h-3.5" />}
              Cancel
            </button>
          )}
          {canReview && (
            <button
              onClick={() => setShowReview(!showReview)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold border border-amber-300 text-amber-700 hover:bg-amber-50 dark:hover:bg-amber-950/30 transition-colors cursor-pointer"
            >
              <Star className="w-3.5 h-3.5" />
              Leave Review
            </button>
          )}
        </div>
      )}

      {showReview && (
        <div className="px-5 pb-5">
          <ReviewDialog bookingId={booking.id} onDone={() => { setShowReview(false); onRefresh(); }} />
        </div>
      )}
    </div>
  );
}

// Main Customer Bookings UI
export default function CustomerBookingListUI({ bookings: initialBookings }: { bookings: any[] }) {
  const [bookings, setBookings] = useState(initialBookings);
  const [filter, setFilter] = useState<string>("ALL");

  const statuses = ["ALL", "REQUESTED", "ACCEPTED", "PAID", "IN_PROGRESS", "COMPLETED", "CANCELLED", "DECLINED"];

  const filtered = filter === "ALL" ? bookings : bookings.filter((b) => b.status === filter);

  // Pull fresh data without full page reload
  const refresh = async () => {
    // Just trigger visual update — server refresh handled by router.refresh() where possible
    window.location.reload();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
          My Bookings
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Track and manage all your service bookings
        </p>
      </div>

      {/* Filter Tabs */}
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

      {/* Bookings Grid */}
      {filtered.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {filtered.map((booking) => (
            <BookingCard key={booking.id} booking={booking} onRefresh={refresh} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 rounded-2xl border border-dashed border-border">
          <AlertCircle className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
          <p className="font-bold text-foreground">No bookings found</p>
          <p className="text-sm text-muted-foreground mt-1">
            {filter !== "ALL" ? `No ${filter.replace("_", " ")} bookings` : "You haven't made any bookings yet."}
          </p>
          {filter === "ALL" && (
            <a
              href="/services"
              className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-bold hover:bg-primary/90 transition-colors"
            >
              Browse Services <ChevronRight className="w-4 h-4" />
            </a>
          )}
        </div>
      )}
    </div>
  );
}
