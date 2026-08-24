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
import {
  Calendar,
  Clock,
  MapPin,
  User,
  Wrench,
  DollarSign,
  Eye,
  FileText,
  Phone,
} from "lucide-react";
import { getBookingDetailsAction } from "../_actions/GetBookingDetails";

interface BookingDetailsDialogProps {
  bookingId: string;
  initialBooking?: any;
}

export function BookingDetailsDialog({ bookingId, initialBooking }: BookingDetailsDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [booking, setBooking] = useState<any>(initialBooking || null);

  const handleOpenChange = async (isOpen: boolean) => {
    setOpen(isOpen);
    if (isOpen && !booking) {
      setLoading(true);
      const res = await getBookingDetailsAction(bookingId);
      const bk = res?.data?.booking || res?.data || res?.result;
      if (bk) setBooking(bk);
      setLoading(false);
    }
  };

  const data = booking || initialBooking;
  const service = data?.service;
  const customer = data?.customer;
  const technicianUser = data?.technician?.user || data?.technician;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      {/* Trigger Button */}
      <DialogTrigger asChild>
        <Button
          size="sm"
          variant="outline"
          className="rounded-xl text-[11px] font-bold h-8 px-3 hover:bg-primary hover:text-primary-foreground transition-all cursor-pointer inline-flex items-center gap-1.5 shadow-2xs"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>View Details</span>
        </Button>
      </DialogTrigger>

      {/* Modal Dialog Content */}
      <DialogContent className="max-w-lg rounded-3xl p-6 sm:p-8 space-y-5">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg font-black text-foreground">
            <FileText className="w-5 h-5 text-primary" />
            <span>Booking Request Breakdown</span>
          </DialogTitle>
        </DialogHeader>

        {loading ? (
          <div className="py-12 text-center text-xs text-muted-foreground animate-pulse">
            Loading booking details...
          </div>
        ) : (
          <div className="space-y-5 text-xs">

            {/* Status & Amount Banner */}
            <div className="bg-accent/40 border border-border p-4 rounded-2xl flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold text-muted-foreground uppercase">Booking Status</p>
                <span className={`inline-block px-2.5 py-0.5 mt-1 rounded-full text-[10px] font-extrabold uppercase border border-border ${data?.status === "COMPLETED" || data?.status === "PAID"
                  ? "bg-emerald-100 text-emerald-700"
                  : data?.status === "ACCEPTED"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-amber-100 text-amber-700"
                  }`}>
                  {data?.status || "REQUESTED"}
                </span>
              </div>

              <div className="text-right">
                <p className="text-[10px] font-bold text-muted-foreground uppercase">Total Amount</p>
                <p className="text-xl font-black text-emerald-600 flex items-center justify-end">
                  <DollarSign className="w-4 h-4" /> ₹{data?.totalPrice || data?.totalAmount || service?.price || 0}
                </p>
              </div>
            </div>

            {/* Service Info */}
            <div className="bg-background border border-border p-4 rounded-2xl space-y-1.5">
              <p className="font-extrabold text-foreground text-sm flex items-center gap-1.5">
                <Wrench className="w-4 h-4 text-primary" />
                {service?.name || service?.title || "Service Repair"}
              </p>
              {service?.description && (
                <p className="text-muted-foreground text-[11px] line-clamp-2">{service?.description}</p>
              )}
            </div>

            {/* Customer & Technician Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Customer */}
              <div className="bg-card border border-border p-3.5 rounded-2xl space-y-1">
                <p className="font-extrabold text-muted-foreground uppercase text-[10px] flex items-center gap-1">
                  <User className="w-3 h-3 text-primary" /> Customer Info
                </p>
                <p className="font-bold text-foreground">{customer?.name || "Customer"}</p>
                <p className="text-muted-foreground">{customer?.email}</p>
                {customer?.phone && (
                  <p className="text-muted-foreground flex items-center gap-1">
                    <Phone className="w-3 h-3 text-primary" /> {customer?.phone}
                  </p>
                )}
              </div>

              {/* Technician */}
              <div className="bg-card border border-border p-3.5 rounded-2xl space-y-1">
                <p className="font-extrabold text-muted-foreground uppercase text-[10px] flex items-center gap-1">
                  <Wrench className="w-3 h-3 text-primary" /> Technician Info
                </p>
                <p className="font-bold text-foreground">{technicianUser?.name || "Assigned Pro"}</p>
                <p className="text-muted-foreground">{technicianUser?.email}</p>
              </div>
            </div>

            {/* Timing & Location */}
            <div className="space-y-2 border-t border-border pt-3">
              <div className="flex items-center gap-4 text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-primary" /> Scheduled:{" "}
                  {data?.scheduledDate
                    ? new Date(data.scheduledDate).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" })
                    : data?.bookingDate || "N/A"}
                </span>
              </div>

              <div className="flex items-start gap-1 text-muted-foreground pt-1">
                <MapPin className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                <span>Address: {data?.serviceAddress || "Kolkata, India"}</span>
              </div>
            </div>

          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}