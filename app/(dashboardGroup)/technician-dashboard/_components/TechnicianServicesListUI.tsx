/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useTransition } from "react";
import { Edit2, Trash2, Loader2, Wrench, Tag, DollarSign, AlertCircle } from "lucide-react";
import { updateServiceAction, deleteServiceAction } from "@/lib/actions/serviceActions";
import { toast } from "sonner";
import Image from "next/image";

function ServiceCard({ service, onDelete, onUpdate }: { service: any, onDelete: (id: string) => void, onUpdate: (id: string, payload: any) => void }) {
  const [isEditing, setIsEditing] = useState(false);
  const [pending, startTransition] = useTransition();
  const [name, setName] = useState(service.name);
  const [price, setPrice] = useState(service.price);

  const handleSave = () => {
    startTransition(async () => {
      const payload = { name, price: Number(price) };
      const res = await updateServiceAction(service.id, payload);
      if (res.success) {
        toast.success("Service updated");
        onUpdate(service.id, payload);
        setIsEditing(false);
      } else {
        toast.error(res.message || "Update failed");
      }
    });
  };

  const handleDelete = () => {
    if (!confirm("Are you sure you want to delete this service?")) return;
    startTransition(async () => {
      const res = await deleteServiceAction(service.id);
      if (res.success) {
        toast.success("Service deleted");
        onDelete(service.id);
      } else {
        toast.error(res.message || "Delete failed");
      }
    });
  };

  return (
    <div className="premium-card rounded-2xl overflow-hidden flex flex-col">
      <div className="relative w-full aspect-[16/9] bg-muted">
        <Image
          unoptimized
          src={service.image || "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=600"}
          alt={service.name}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-bold bg-background/90 backdrop-blur text-foreground border border-border">
          {service.category || "General"}
        </span>
      </div>

      <div className="p-5 flex-1 flex flex-col gap-4">
        {isEditing ? (
          <div className="space-y-3">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-field py-2 text-sm"
            />
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="input-field py-2 text-sm"
            />
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                disabled={pending}
                className="flex-1 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-bold disabled:opacity-60"
              >
                {pending ? "Saving..." : "Save"}
              </button>
              <button
                onClick={() => setIsEditing(false)}
                disabled={pending}
                className="flex-1 py-2 rounded-xl border border-border text-xs font-bold"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <div>
              <h3 className="font-bold text-foreground text-sm line-clamp-2">{service.name}</h3>
              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{service.description}</p>
            </div>

            <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
              <span className="text-sm font-black text-primary">₹{service.price}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsEditing(true)}
                  className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-600 flex items-center justify-center hover:bg-blue-500/20 transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={handleDelete}
                  disabled={pending}
                  className="w-8 h-8 rounded-lg bg-destructive/10 text-destructive flex items-center justify-center hover:bg-destructive/20 transition-colors disabled:opacity-60"
                >
                  {pending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function TechnicianServicesListUI({ services: initialServices }: { services: any[] }) {
  const [services, setServices] = useState(initialServices);

  const handleDelete = (id: string) => {
    setServices((prev) => prev.filter((s) => s.id !== id));
  };

  const handleUpdate = (id: string, payload: any) => {
    setServices((prev) => prev.map((s) => s.id === id ? { ...s, ...payload } : s));
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 px-4">
      <div>
        <h1 className="text-2xl font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
          My Services
        </h1>
        <p className="text-sm text-muted-foreground mt-1">Manage the services you offer to customers</p>
      </div>

      {services.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} onDelete={handleDelete} onUpdate={handleUpdate} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 rounded-2xl border border-dashed border-border">
          <Wrench className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
          <p className="font-bold text-foreground">No services listed yet</p>
          <p className="text-sm text-muted-foreground mt-1">Create your first service to start getting bookings.</p>
        </div>
      )}
    </div>
  );
}
