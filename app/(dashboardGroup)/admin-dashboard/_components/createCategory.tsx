/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useActionState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tag, PlusCircle } from "lucide-react";
import { toast } from "sonner";
import { createCategoryAction } from "../_actions/createCategoryAction";

interface CategoryUIProps {
  categories: any[];
}

export default function CategoryFormUI({ categories = [] }: CategoryUIProps) {
  const [state, formAction, pending] = useActionState(createCategoryAction, null) as any;

  useEffect(() => {
    if (!state) return;

    if (state.success) {
      toast.success(state.message || "Category created successfully!");
    } else if (state.message) {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="border-b border-border pb-4">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-primary uppercase bg-primary/10 px-3 py-1 rounded-full border border-primary/20 mb-2">
            <Tag className="w-3.5 h-3.5" />
            <span>Admin Portal</span>
          </div>
          <h1 className="text-2xl font-extrabold text-foreground">Category Management</h1>
          <p className="text-xs text-muted-foreground mt-1">
            Create new service categories and view existing categories.
          </p>
        </div>

        {/* 1. Create Category Form */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-foreground">Add New Category</h2>

          <form action={formAction} className="space-y-4">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-xs font-semibold">Category Name</Label>
                <Input
                  id="name"
                  name="name"
                  required
                  placeholder="e.g. AC Repair"
                  className="rounded-xl text-xs"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="icon" className="text-xs font-semibold">Icon / Image URL</Label>
                <Input
                  id="icon"
                  name="icon"
                  placeholder="e.g. https://images.unsplash.com/..."
                  className="rounded-xl text-xs"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-xs font-semibold">Category Description</Label>
              <Textarea
                id="description"
                name="description"
                required
                placeholder="e.g. Professional AC servicing, gas refilling, and cooling repair."
                className="min-h-20 rounded-xl text-xs"
              />
            </div>

            <div className="flex justify-end pt-2">
              <Button
                type="submit"
                disabled={pending}
                className="rounded-xl text-xs font-bold px-6 py-5 shadow-md flex items-center gap-2 cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" />
                <span>{pending ? "Creating Category..." : "Create Category"}</span>
              </Button>
            </div>

          </form>
        </div>

        {/* 2. Existing Categories Grid */}
        <div className="space-y-4">
          <h2 className="text-base font-bold text-foreground">All Existing Categories ({categories.length})</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {categories.length > 0 ? (
              categories.map((cat) => (
                <div key={cat.id} className="p-4 rounded-2xl bg-card border border-border space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                      <Tag className="w-4 h-4" />
                    </div>
                    <h3 className="font-bold text-sm text-foreground">{cat.name}</h3>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2">{cat.description || "No description provided."}</p>
                </div>
              ))
            ) : (
              <p className="text-xs text-muted-foreground col-span-full py-4 text-center">
                No categories created yet.
              </p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}