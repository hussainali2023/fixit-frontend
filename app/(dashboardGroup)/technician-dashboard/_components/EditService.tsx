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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Edit3, Wrench, DollarSign, Clock, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { updateServiceAction } from "../_actions/updateServiceAction";

interface EditServiceDialogProps {
  service: any;
  onSuccess?: () => void;
}

export function EditServiceDialog({ service, onSuccess }: EditServiceDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState(service?.title || "");
  const [price, setPrice] = useState(service?.price || 0);
  const [duration, setDuration] = useState(service?.duration || "");
  const [image, setImage] = useState(service?.image || "");
  const [description, setDescription] = useState(service?.description || "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      title,
      price: Number(price),
      duration,
      image,
      description,
    };

    const res = await updateServiceAction(service.id, payload);

    if (res?.success) {
      toast.success("Service updated successfully!");
      setOpen(false);
      if (onSuccess) onSuccess();
    } else {
      toast.error(res?.message || "Failed to update service");
    }

    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          variant="outline"
          className="rounded-xl text-[11px] font-bold h-8 px-3 hover:bg-primary hover:text-primary-foreground transition-all cursor-pointer flex items-center gap-1.5"
        >
          <Edit3 className="w-3.5 h-3.5" />
          <span>Edit</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-lg rounded-3xl p-6 sm:p-8 space-y-4">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg font-black text-foreground">
            <Wrench className="w-5 h-5 text-primary" />
            <span>Edit Service Details</span>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs pt-2">
          {/* Title */}
          <div className="space-y-1.5">
            <Label htmlFor="edit-title" className="text-xs font-semibold">Service Title</Label>
            <Input
              id="edit-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="rounded-xl text-xs"
            />
          </div>

          {/* Image URL */}
          <div className="space-y-1.5">
            <Label htmlFor="edit-image" className="text-xs font-semibold flex items-center gap-1">
              <ImageIcon className="w-3.5 h-3.5 text-primary" /> Image URL
            </Label>
            <Input
              id="edit-image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://..."
              className="rounded-xl text-xs"
            />
          </div>

          {/* Price & Duration */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="edit-price" className="text-xs font-semibold flex items-center gap-1">
                <DollarSign className="w-3.5 h-3.5 text-primary" /> Price (₹)
              </Label>
              <Input
                id="edit-price"
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                required
                className="rounded-xl text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="edit-duration" className="text-xs font-semibold flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-primary" /> Duration
              </Label>
              <Input
                id="edit-duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                required
                className="rounded-xl text-xs"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <Label htmlFor="edit-description" className="text-xs font-semibold">Description</Label>
            <Textarea
              id="edit-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="min-h-20 rounded-xl text-xs"
            />
          </div>

          {/* Actions */}
          <div className="pt-3 flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="rounded-xl text-xs"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="rounded-xl text-xs font-bold px-5"
            >
              {loading ? "Updating..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}