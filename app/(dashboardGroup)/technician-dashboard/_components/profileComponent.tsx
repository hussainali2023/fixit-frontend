/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useActionState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { User, MapPin, DollarSign, Briefcase, Award, Save, Clock, Tag } from "lucide-react";
import { toast } from "sonner";
import { updateProfileAction } from "../_actions/profileAction";

interface ProfileFormProps {
  categories: any[];
  defaultCategoryId?: string;
}

export default function ProfileForm({ categories = [], defaultCategoryId }: ProfileFormProps) {
  const [state, formAction, pending] = useActionState(updateProfileAction, null) as any;

  useEffect(() => {
    if (!state) return;

    if (state.success) {
      toast.success(state.message || "Profile updated successfully!");
    } else if (state.message) {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-3xl mx-auto space-y-6">

        {/* Header */}
        <div className="border-b border-border pb-4">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-primary uppercase bg-primary/10 px-3 py-1 rounded-full border border-primary/20 mb-2">
            <User className="w-3.5 h-3.5" />
            <span>Technician Portal</span>
          </div>
          <h1 className="text-2xl font-extrabold text-foreground">Technician Profile Settings</h1>
          <p className="text-xs text-muted-foreground mt-1">
            Update your professional information, skills, and service rates.
          </p>
        </div>

        {/* Profile Form */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
          <form action={formAction} className="space-y-5">

            {/* 1. Location & Rate Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location" className="text-xs font-semibold flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-primary" /> Location
                </Label>
                <Input
                  id="location"
                  name="location"
                  required
                  defaultValue="Dhanmondi, Dhaka"
                  placeholder="e.g. Dhanmondi, Dhaka"
                  className="rounded-xl text-xs"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="rate" className="text-xs font-semibold flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5 text-primary" /> Hourly Rate (₹)
                </Label>
                <Input
                  id="rate"
                  name="rate"
                  type="number"
                  required
                  defaultValue={500}
                  placeholder="e.g. 500"
                  className="rounded-xl text-xs"
                />
              </div>
            </div>

            {/* 2. Experience & Automatic Category Selector */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="experience" className="text-xs font-semibold flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-primary" /> Experience (Years)
                </Label>
                <Input
                  id="experience"
                  name="experience"
                  type="number"
                  required
                  defaultValue={5}
                  placeholder="e.g. 5"
                  className="rounded-xl text-xs"
                />
              </div>

              {/* 🟢 Category ID Automatic Selector Dropdown */}
              <div className="space-y-2">
                <Label htmlFor="categoryId" className="text-xs font-semibold flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-primary" /> Select Specialization Category
                </Label>
                <select
                  id="categoryId"
                  name="categoryId"
                  required
                  defaultValue={defaultCategoryId || (categories[0]?.id || "")}
                  className="w-full bg-background border border-border rounded-xl px-3 py-2.5 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer"
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* 3. Availability & Skills Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="availability" className="text-xs font-semibold flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-primary" /> Availability
                </Label>
                <Input
                  id="availability"
                  name="availability"
                  required
                  defaultValue="Sat-Thu (9:00 AM - 6:00 PM)"
                  placeholder="e.g. Sat-Thu (9:00 AM - 6:00 PM)"
                  className="rounded-xl text-xs"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="skills" className="text-xs font-semibold flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-primary" /> Skills
                </Label>
                <Input
                  id="skills"
                  name="skills"
                  required
                  defaultValue="Home Wiring, Switchboard Repair, Appliance Setup"
                  placeholder="e.g. Home Wiring, Appliance Repair"
                  className="rounded-xl text-xs"
                />
              </div>
            </div>

            {/* 4. Bio */}
            <div className="space-y-2">
              <Label htmlFor="bio" className="text-xs font-semibold">Professional Bio</Label>
              <Textarea
                id="bio"
                name="bio"
                required
                defaultValue="I am a professional electrician specialized in home wiring, electrical appliance setup, and short circuit repairs."
                placeholder="Describe your background and expertise..."
                className="min-h-24 rounded-xl text-xs"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2 flex justify-end">
              <Button
                type="submit"
                disabled={pending}
                className="rounded-xl text-xs font-bold px-6 py-5 shadow-md cursor-pointer flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>{pending ? "Saving Changes..." : "Save Profile Changes"}</span>
              </Button>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
}