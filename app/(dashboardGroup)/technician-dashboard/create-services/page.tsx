/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useActionState, useEffect } from "react";
import { Wrench, DollarSign, Tag, FileText, Loader2, CheckCircle } from "lucide-react";
import { createServiceAction } from "@/lib/actions/serviceActions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const CATEGORIES = [
  "AC Repair", "Electrical", "Plumbing", "Cleaning", "Painting",
  "Carpentry", "Pest Control", "Appliance Repair", "Roofing", "General",
];

export default function CreateServicesPage() {
  const router = useRouter();
  const [state, action, pending] = useActionState(createServiceAction, null);

  useEffect(() => {
    if (!state) return;
    if (state.success) {
      toast.success("Service created successfully!");
      router.push("/technician-dashboard/my-services");
      router.refresh();
    } else if (state.message) {
      toast.error(state.message);
    }
  }, [state, router]);

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
          Create a New Service
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Add a service that customers can book from you
        </p>
      </div>

      <form action={action} className="premium-card rounded-2xl p-6 space-y-5">
        {/* Service Name */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
            <Wrench className="w-3.5 h-3.5 text-primary" /> Service Name *
          </label>
          <input
            name="name"
            required
            placeholder="e.g. AC Deep Cleaning & Gas Refill"
            className="input-field"
          />
        </div>

        {/* Description */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-primary" /> Description *
          </label>
          <textarea
            name="description"
            required
            rows={4}
            placeholder="Describe your service in detail..."
            className="input-field resize-none"
          />
        </div>

        {/* Price + Category Row */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5 text-primary" /> Price (₹) *
            </label>
            <input
              name="price"
              type="number"
              required
              min="1"
              placeholder="500"
              className="input-field"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-primary" /> Category
            </label>
            <select name="category" className="input-field">
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={pending}
          className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors disabled:opacity-60 shadow-md cursor-pointer"
        >
          {pending ? (
            <><Loader2 className="w-4 h-4 animate-spin" /> Creating Service...</>
          ) : (
            <><CheckCircle className="w-4 h-4" /> Create Service</>
          )}
        </button>
      </form>
    </div>
  );
}