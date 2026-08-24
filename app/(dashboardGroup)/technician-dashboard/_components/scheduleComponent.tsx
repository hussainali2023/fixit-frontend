/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useActionState, useEffect } from "react";
import { Clock, Calendar, CheckCircle, Loader2 } from "lucide-react";
import { updateAvailabilityAction } from "@/lib/actions/technicianActions";
import { toast } from "sonner";

export default function TechnicianSchedulePage({ availability }: { availability?: string }) {
  const [state, action, pending] = useActionState(updateAvailabilityAction, null);

  useEffect(() => {
    if (!state) return;
    if (state.success) toast.success("Availability updated successfully");
    else toast.error(state.message || "Failed to update availability");
  }, [state]);

  return (
    <div className="max-w-xl mx-auto space-y-6 px-4">
      <div>
        <h1 className="text-2xl font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
          Availability Schedule
        </h1>
        <p className="text-sm text-muted-foreground mt-1">Set your working hours for customers to see</p>
      </div>

      <form action={action} className="premium-card rounded-2xl p-6 space-y-5">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-primary/10 text-primary border border-primary/20">
          <Calendar className="w-5 h-5 shrink-0" />
          <p className="text-xs font-medium">Keep your schedule updated so customers know when they can book you.</p>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-primary" /> Working Hours / Availability
          </label>
          <textarea
            name="availability"
            defaultValue={availability || ""}
            placeholder="e.g. Mon-Fri: 9 AM to 6 PM. Available for emergency calls on weekends."
            rows={5}
            className="input-field resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={pending}
          className="w-full py-3 rounded-xl bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors disabled:opacity-60 cursor-pointer"
        >
          {pending ? <><Loader2 className="w-4 h-4 animate-spin" /> Updating...</> : <><CheckCircle className="w-4 h-4" /> Save Schedule</>}
        </button>
      </form>
    </div>
  );
}