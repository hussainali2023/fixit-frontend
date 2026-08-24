/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useActionState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Calendar, Loader2, CheckCircle, Wrench } from "lucide-react";
import { createBookingAction } from "@/lib/actions/bookingActions";
import { toast } from "sonner";
import Link from "next/link";

interface Props {
  serviceId: string;
  serviceName: string;
}

export default function BookFormDialog({ serviceId, serviceName }: Props) {
  const [open, setOpen] = useState(false);
  const [state, action, pending] = useActionState(createBookingAction, null);

  // Min date = tomorrow
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  useEffect(() => {
    if (!state) return;
    if (state.success) {
      toast.success("Booking submitted! Waiting for technician confirmation.");
      setOpen(false);
    } else if (state.message) {
      if (state.statusCode === 401) {
        toast.error("Please login to book a service.");
      } else {
        toast.error(state.message);
      }
    }
  }, [state]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center gap-2 hover:bg-primary/90 shadow-md transition-all hover:scale-[1.02] cursor-pointer">
          <Calendar className="w-4 h-4" /> Book This Service
        </button>
      </DialogTrigger>

      <DialogContent className="max-w-md rounded-3xl p-6 sm:p-8">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg font-bold text-foreground">
            <Wrench className="w-5 h-5 text-primary" />
            Book Service
          </DialogTitle>
        </DialogHeader>

        <div className="mt-2 mb-4 p-3.5 bg-muted/50 rounded-xl border border-border">
          <p className="text-xs font-medium text-muted-foreground">You are booking:</p>
          <p className="font-bold text-foreground mt-0.5">{serviceName}</p>
        </div>

        <form action={action} className="space-y-4">
          {/* Hidden serviceId */}
          <input type="hidden" name="serviceId" value={serviceId} />

          {/* Scheduled Date */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-primary" /> Scheduled Date *
            </label>
            <input
              type="date"
              name="scheduledDate"
              required
              min={minDate}
              className="input-field"
            />
            <p className="text-[11px] text-muted-foreground">
              Select a date for the service. Must be at least tomorrow.
            </p>
          </div>

          {/* Info */}
          <div className="p-3.5 bg-primary/5 rounded-xl border border-primary/10 text-xs text-muted-foreground space-y-1">
            <p>✅ The technician will review your request and accept/decline.</p>
            <p>💳 Payment is initiated after the technician accepts.</p>
          </div>

          <button
            type="submit"
            disabled={pending}
            className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors disabled:opacity-60 shadow-md cursor-pointer"
          >
            {pending ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Submitting Booking...</>
            ) : (
              <><CheckCircle className="w-4 h-4" /> Submit Booking Request</>
            )}
          </button>

          <p className="text-center text-xs text-muted-foreground">
            Need an account?{" "}
            <Link href="/login" className="text-primary font-bold hover:underline">
              Login here
            </Link>
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}
