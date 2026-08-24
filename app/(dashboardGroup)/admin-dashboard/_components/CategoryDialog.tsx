/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useActionState, useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PlusCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { createCategoryAction } from "../_actions/createCategoryAction";

export function CreateCategoryDialog() {
  const [open, setOpen] = useState(false);

  const [state, formAction, isPending] = useActionState(createCategoryAction, null);

  useEffect(() => {
    if (state?.success) {
      toast.success(state?.message || "Category created successfully!");
      setOpen(false);
    } else if (state?.message) {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="rounded-xl text-xs font-bold bg-primary text-white flex items-center gap-1.5 cursor-pointer shadow-sm">
          <PlusCircle className="w-4 h-4" /> Add Category
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md bg-card border border-border rounded-2xl p-6 shadow-xl">
        <DialogHeader className="border-b border-border pb-3">
          <DialogTitle className="text-base font-bold text-foreground">Create New Category</DialogTitle>
        </DialogHeader>

        <form action={formAction} className="space-y-4 pt-3">
          
          {/* name field */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-foreground">Category Name *</label>
            <input
              type="text"
              name="name"
              required
              placeholder="e.g. Electrical Services, Plumbing"
              className="w-full bg-background border border-border rounded-xl px-3 py-2 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

          {/* description field */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-foreground">Description (Optional)</label>
            <input
              type="text"
              name="description"
              placeholder="Short category description..."
              className="w-full bg-background border border-border rounded-xl px-3 py-2 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

          {/* icon field */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-foreground">Icon / Cover Image URL (Optional)</label>
            <input
              type="url"
              name="icon"
              placeholder="https://images.unsplash.com/photo-..."
              className="w-full bg-background border border-border rounded-xl px-3 py-2 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <Button
              type="submit"
              disabled={isPending}
              className="w-full rounded-xl text-xs font-bold bg-primary text-white py-2 flex items-center justify-center gap-2 cursor-pointer"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Saving Category...
                </>
              ) : (
                "Save Category"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}