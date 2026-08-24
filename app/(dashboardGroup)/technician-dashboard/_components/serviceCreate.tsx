/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useActionState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Wrench, PlusCircle, Tag, Clock, DollarSign, ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { createServices } from "../_actions/serviceCreateAction";

interface CreateServiceFormProps {
  categories: any[];
}

export default function CreateServiceForm({ categories = [] }: CreateServiceFormProps) {
  const [state, formAction, pending] = useActionState(createServices, null) as any;

  useEffect(() => {
    if (!state) return;

    if (state.success) {
      toast.success(state.message || "Service created successfully!");
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
            <Wrench className="w-3.5 h-3.5" />
            <span>Technician Portal</span>
          </div>
          <h1 className="text-2xl font-extrabold text-foreground">Create New Service</h1>
          <p className="text-xs text-muted-foreground mt-1">
            Fill out the form below to add a new service offering.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
          <form action={formAction} className="space-y-5">

            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title" className="text-xs font-semibold flex items-center gap-1">
                <Wrench className="w-3.5 h-3.5 text-primary" /> Service Title
              </Label>
              <Input
                id="title"
                name="title"
                required
                placeholder="e.g. Electry Line Repair"
                className="rounded-xl text-xs"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image" className="text-xs font-semibold flex items-center gap-1">
                <ImageIcon className="w-3.5 h-3.5 text-primary" /> Service Cover Image URL
              </Label>
              <Input
                id="image"
                name="image"
                placeholder="e.g. https://images.unsplash.com/photo-1621905251189-08b45d6a269e"
                className="rounded-xl text-xs"
              />
            </div>

            {/* Category Dropdown */}
            <div className="space-y-2">
              <Label htmlFor="categoryId" className="text-xs font-semibold flex items-center gap-1">
                <Tag className="w-3.5 h-3.5 text-primary" /> Select Category
              </Label>
              <select
                id="categoryId"
                name="categoryId"
                required
                className="w-full bg-background border border-border rounded-xl px-3 py-2.5 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer"
              >
                <option value="">-- Choose Category --</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Price & Duration Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price" className="text-xs font-semibold flex items-center gap-1">
                  <DollarSign className="w-3.5 h-3.5 text-primary" /> Price (₹)
                </Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  required
                  placeholder="e.g. 800"
                  className="rounded-xl text-xs"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration" className="text-xs font-semibold flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-primary" /> Duration
                </Label>
                <Input
                  id="duration"
                  name="duration"
                  required
                  placeholder="e.g. 1.5 hours"
                  className="rounded-xl text-xs"
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description" className="text-xs font-semibold">Service Description</Label>
              <Textarea
                id="description"
                name="description"
                required
                placeholder="e.g. Fixing all electry line issues."
                className="min-h-24 rounded-xl text-xs"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2 flex justify-end">
              <Button
                type="submit"
                disabled={pending}
                className="rounded-xl text-xs font-bold px-6 py-5 shadow-md flex items-center gap-2 cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" />
                <span>{pending ? "Creating Service..." : "Create Service"}</span>
              </Button>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
}