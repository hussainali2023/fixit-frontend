/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useActionState, useEffect } from "react";
import { User, MapPin, Star, Briefcase, Loader2, Save } from "lucide-react";
import { updateTechnicianProfileAction } from "@/lib/actions/technicianActions";
import { toast } from "sonner";

interface Props {
  profile: any;
}

export default function TechnicianProfileForm({ profile }: Props) {
  const [state, action, pending] = useActionState(updateTechnicianProfileAction, null);

  useEffect(() => {
    if (!state) return;
    if (state.success) toast.success("Profile updated successfully!");
    else if (state.message) toast.error(state.message);
  }, [state]);

  return (
    <form action={action} className="premium-card rounded-2xl p-6 space-y-5">
      <h2 className="text-base font-bold text-foreground">Update Profile</h2>

      <div className="space-y-1.5">
        <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
          <Star className="w-3.5 h-3.5 text-primary" /> Skills
        </label>
        <input
          name="skills"
          defaultValue={profile?.skills || ""}
          placeholder="e.g. AC Repair, Electrical, Plumbing"
          className="input-field"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
            <Briefcase className="w-3.5 h-3.5 text-primary" /> Experience (years)
          </label>
          <input
            name="experience"
            type="number"
            min="0"
            defaultValue={profile?.experience || 1}
            className="input-field"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-primary" /> Location
          </label>
          <input
            name="location"
            defaultValue={profile?.location || ""}
            placeholder="e.g. Kolkata, India"
            className="input-field"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="w-full py-3 rounded-xl bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors disabled:opacity-60 cursor-pointer"
      >
        {pending ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</> : <><Save className="w-4 h-4" /> Save Profile</>}
      </button>
    </form>
  );
}
