/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createReviewAction } from "../_actions/ReviewAction";

interface ReviewDialogProps {
  bookingId: string;
  serviceId?: string;
  isReviewed?: boolean;
}

export function ReviewDialog({ bookingId, serviceId, isReviewed = false }: ReviewDialogProps) {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  
  // 🟢 ১. একবার রিভিউ দিলে স্থায়ীভাবে বাটনটি লক রাখার স্টেট
  const [hasReviewed, setHasReviewed] = useState(isReviewed);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await createReviewAction({
      bookingId,
      serviceId,
      rating,
      comment,
    });

    setLoading(false);

    if (res?.success) {
      toast.success("Thank you for your valuable feedback!");
      setHasReviewed(true); // 🟢 রিভিউ সম্পূর্ণ হলে বাটন লক করে দেওয়া হলো
      setOpen(false);
      router.refresh();
    } else {
      toast.error(res?.message || "Failed to submit review or already reviewed!");
    }
  };

  // 🟢 ২. রিভিউ অলরেডি দেওয়া থাকলে সবুজ "✓ Reviewed" ব্যাজ দেখাবে
  if (hasReviewed) {
    return (
      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-3 py-1.5 rounded-xl border border-emerald-200 shadow-xs">
        <CheckCircle2 className="w-3.5 h-3.5" /> Reviewed
      </span>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-600 text-white flex items-center gap-1.5 cursor-pointer">
          <Star className="w-3.5 h-3.5 fill-white" />
          <span>Leave Review</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="rounded-2xl max-w-md">
        <DialogHeader>
          <DialogTitle className="text-base font-bold">Rate & Review Service</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div className="space-y-1 text-center">
            <label className="text-xs font-semibold text-muted-foreground">Select Rating</label>
            <div className="flex items-center justify-center gap-1 py-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-1 focus:outline-none transition-transform hover:scale-110 cursor-pointer"
                >
                  <Star
                    className={`w-7 h-7 ${
                      (hoverRating || rating) >= star
                        ? "text-amber-400 fill-amber-400"
                        : "text-muted-foreground/30"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold">Your Feedback</label>
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
              placeholder="Tell us about your experience with the technician..."
              className="rounded-xl text-xs min-h-24"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="rounded-xl text-xs font-semibold"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="rounded-xl text-xs font-bold bg-primary text-white"
            >
              {loading ? "Submitting..." : "Submit Review"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}