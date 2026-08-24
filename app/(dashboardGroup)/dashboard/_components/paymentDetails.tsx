/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import {
  ShieldCheck,
  CheckCircle2,
  Calendar,
  User,
  Wrench,
  CreditCard,
  MapPin,
  FileText,
  DollarSign,
  Hash,
  Clock,
  Phone,
} from "lucide-react";

interface PaymentDetailsUIProps {
  payment?: any;
}

export default function PaymentDetailsUI({ payment }: PaymentDetailsUIProps) {
  const booking = payment?.booking;
  const service = booking?.service;
  const customer = booking?.customer;
  const technician = booking?.technician;
  const technicianUser = technician?.user;

  return (
    <div className="min-h-screen bg-background py-8 px-4 flex justify-center items-center">
      <div className="max-w-2xl w-full space-y-6">
        {/* Top Header Badge */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-emerald-600 uppercase bg-emerald-50 dark:bg-emerald-950/50 px-3 py-1 rounded-full border border-emerald-200/60 mb-2 shadow-2xs">
              <ShieldCheck className="w-4 h-4" />
              <span>Official Invoice Receipt</span>
            </div>
            <h1 className="text-2xl font-black text-foreground tracking-tight">
              Payment Details
            </h1>
          </div>

          <div className="inline-flex items-center gap-1.5 text-emerald-600 font-bold bg-emerald-50 dark:bg-emerald-950 px-3.5 py-1.5 rounded-full text-xs border border-emerald-200/80 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{payment?.status || "SUCCESS"}</span>
          </div>
        </div>

        {/* Main Invoice Card */}
        <div className="bg-card border border-border rounded-3xl p-6 sm:p-8 shadow-md space-y-6 relative overflow-hidden">
          {/* Highlighted Transaction ID Banner (Overlow Fixed) */}
          <div className="bg-accent/40 border border-border rounded-2xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 overflow-hidden">
            <div className="flex items-start sm:items-center gap-3 max-w-full min-w-0">
              <div className="p-2.5 rounded-xl bg-primary/10 text-primary border border-primary/20 shrink-0">
                <Hash className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground">
                  Transaction Reference
                </p>
                <p className="font-mono text-xs font-extrabold text-primary break-all max-w-full select-all">
                  {payment?.transactionId || payment?.id || "N/A"}
                </p>
              </div>
            </div>

            <div className="text-left sm:text-right w-full sm:w-auto border-t sm:border-t-0 border-border pt-2 sm:pt-0 shrink-0">
              <p className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground">
                Total Amount Paid
              </p>
              <p className="text-2xl font-black text-emerald-600">
                ₹{payment?.amount || booking?.totalAmount || 0}
              </p>
            </div>
          </div>

          {/* Billed To & Service Provider Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-b border-border pb-6 text-xs">
            {/* Customer Info */}
            <div className="bg-background/60 border border-border rounded-2xl p-4 space-y-2">
              <p className="font-extrabold text-muted-foreground flex items-center gap-1.5 uppercase text-[10px] tracking-wider">
                <User className="w-3.5 h-3.5 text-primary" /> Billed To
                (Customer)
              </p>
              <p className="font-extrabold text-foreground text-sm">
                {customer?.name || "Customer"}
              </p>
              <p className="text-muted-foreground">{customer?.email}</p>
              {customer?.phone && (
                <p className="text-muted-foreground flex items-center gap-1">
                  <Phone className="w-3 h-3 text-primary shrink-0" />{" "}
                  {customer?.phone}
                </p>
              )}
              <p className="text-muted-foreground flex items-center gap-1 pt-1">
                <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                <span>{booking?.serviceAddress || "Kolkata, India"}</span>
              </p>
            </div>

            {/* Technician Info */}
            <div className="bg-background/60 border border-border rounded-2xl p-4 space-y-2">
              <p className="font-extrabold text-muted-foreground flex items-center gap-1.5 uppercase text-[10px] tracking-wider">
                <Wrench className="w-3.5 h-3.5 text-primary" /> Service Provider
                (Technician)
              </p>
              <p className="font-extrabold text-foreground text-sm">
                {technicianUser?.name || "Assigned Pro"}
              </p>
              <p className="text-muted-foreground">{technicianUser?.email}</p>
              <p className="text-muted-foreground flex items-center gap-1">
                <MapPin className="w-3 h-3 text-primary shrink-0" />{" "}
                {technician?.location || "Dhaka"}
              </p>
            </div>
          </div>

          {/* Service Items Breakdown */}
          <div className="space-y-3 border-b border-border pb-6 text-xs">
            <p className="font-extrabold text-foreground flex items-center gap-1.5 text-sm">
              <FileText className="w-4 h-4 text-primary" /> Service Breakdown
            </p>

            <div className="bg-background border border-border rounded-2xl p-4 space-y-3">
              <div className="flex justify-between items-center font-bold text-foreground text-sm">
                <span>{service?.title || "Home Repair Service"}</span>
                <span className="text-primary font-black">
                  ₹{service?.price || payment?.amount || 0}
                </span>
              </div>

              {service?.description && (
                <p className="text-muted-foreground text-[11px] line-clamp-2">
                  {service?.description}
                </p>
              )}

              <div className="flex flex-wrap items-center gap-4 text-muted-foreground pt-2 border-t border-border/60 text-xs">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-primary" />
                  Date:{" "}
                  {booking?.bookingDate
                    ? new Date(booking?.bookingDate).toLocaleDateString()
                    : "N/A"}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-primary" />
                  Time: {booking?.timeSlot || "Morning Slot"}
                </span>
              </div>
            </div>
          </div>

          {/* Gateway & Payment Details Footer */}
          <div className="grid grid-cols-2 gap-4 text-xs pt-1">
            <div className="space-y-1">
              <p className="font-extrabold text-muted-foreground flex items-center gap-1 uppercase text-[10px] tracking-wider">
                <CreditCard className="w-3.5 h-3.5 text-primary" /> Payment
                Method
              </p>
              <span className="inline-block px-3 py-1 rounded-xl text-xs font-black uppercase bg-accent border border-border">
                {payment?.paymentMethod || "CARD"}
              </span>
            </div>

            <div className="space-y-1">
              <p className="font-extrabold text-muted-foreground flex items-center gap-1 uppercase text-[10px] tracking-wider">
                <DollarSign className="w-3.5 h-3.5 text-emerald-600" /> Payment
                Status
              </p>
              <span className="inline-block px-3 py-1 rounded-xl text-xs font-black uppercase text-emerald-600 bg-emerald-50 dark:bg-emerald-950 border border-emerald-200">
                {payment?.status || "SUCCESS"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
