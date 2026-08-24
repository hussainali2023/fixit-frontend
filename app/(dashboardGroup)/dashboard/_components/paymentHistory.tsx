/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  CreditCard,
  ShieldCheck,
  DollarSign,
  Calendar,
  CheckCircle2,
  Eye,
  Hash,
  Wrench,
} from "lucide-react";

export default function PaymentHistoryPage({ history = [] }: any) {
  const totalSpent = history.reduce(
    (acc: number, curr: any) => acc + (curr.amount || curr.booking?.totalAmount || 0),
    0
  );

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Header */}
        <div className="border-b border-border pb-4">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 uppercase bg-emerald-50 dark:bg-emerald-950/50 px-3 py-1 rounded-full border border-emerald-200 mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Billing & Payments</span>
          </div>
          <h1 className="text-2xl font-extrabold text-foreground">
            Payment History
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            View all your completed transactions and billing invoices.
          </p>
        </div>

        {/* 2 Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-card border border-border rounded-3xl p-5 shadow-sm space-y-1">
            <p className="text-xs text-muted-foreground font-semibold flex items-center gap-1">
              <DollarSign className="w-4 h-4 text-emerald-600" /> Total Paid Amount
            </p>
            <p className="text-3xl font-extrabold text-foreground">
              ₹{totalSpent}
            </p>
          </div>

          <div className="bg-card border border-border rounded-3xl p-5 shadow-sm space-y-1">
            <p className="text-xs text-muted-foreground font-semibold flex items-center gap-1">
              <CreditCard className="w-4 h-4 text-primary" /> Total Transactions
            </p>
            <p className="text-3xl font-extrabold text-foreground">
              {history.length}
            </p>
          </div>
        </div>

        {/* 🟢 Card-Based Payment History List (No Slider / No Horizontal Scroll) */}
        <div className="space-y-4 pt-2">
          <h2 className="text-sm font-extrabold text-foreground flex items-center gap-2">
            <span>Completed Payment Invoices</span>
            <span className="text-xs text-muted-foreground font-normal">({history.length})</span>
          </h2>

          {history.length > 0 ? (
            history.map((item: any) => (
              <div
                key={item.id || item.transactionId}
                className="bg-card border border-border rounded-3xl p-5 shadow-sm hover:shadow-md transition-all space-y-4"
              >
                {/* Top Row: Separate Transaction ID & Status Badge */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 rounded-xl bg-primary/10 text-primary border border-primary/20">
                      <Hash className="w-4 h-4" />
                    </span>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                        Transaction ID
                      </p>
                      <p className="font-mono text-xs font-extrabold text-primary">
                        {item.transactionId || item.id || "TXN-2026-98234"}
                      </p>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1 text-emerald-600 font-bold bg-emerald-50 dark:bg-emerald-950 px-3 py-1 rounded-full text-xs border border-emerald-200">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Successful
                  </span>
                </div>

                {/* Middle Info Grid: Service Details, Date, Method, Amount */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                  {/* Service Title */}
                  <div className="space-y-1">
                    <p className="text-muted-foreground font-semibold flex items-center gap-1">
                      <Wrench className="w-3.5 h-3.5 text-primary" /> Service Title
                    </p>
                    <p className="font-bold text-foreground line-clamp-1">
                      {item.serviceTitle || item.booking?.service?.title || "Home Repair Service"}
                    </p>
                  </div>

                  {/* Payment Method */}
                  <div className="space-y-1">
                    <p className="text-muted-foreground font-semibold flex items-center gap-1">
                      <CreditCard className="w-3.5 h-3.5 text-primary" /> Payment Method
                    </p>
                    <p className="font-extrabold text-foreground uppercase">
                      {item.paymentMethod || "CARD"}
                    </p>
                  </div>

                  {/* Date */}
                  <div className="space-y-1">
                    <p className="text-muted-foreground font-semibold flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-primary" /> Payment Date
                    </p>
                    <p className="font-bold text-foreground">
                      {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : item.date || "2026-08-01"}
                    </p>
                  </div>

                  {/* Amount */}
                  <div className="space-y-1">
                    <p className="text-muted-foreground font-semibold flex items-center gap-1">
                      <DollarSign className="w-3.5 h-3.5 text-emerald-600" /> Amount Paid
                    </p>
                    <p className="text-base font-extrabold text-emerald-600">
                      ₹{item.amount || item.booking?.totalAmount || 0}
                    </p>
                  </div>
                </div>

                {/* Bottom Action Row: View Details Button */}
                <div className="pt-2 border-t border-border flex justify-end">
                  <Link href={`/dashboard/payment-history/${item.id || item.transactionId}`}>
                    <Button
                      size="sm"
                      variant="outline"
                      className="rounded-2xl text-xs font-bold px-4 py-2 hover:bg-primary hover:text-primary-foreground transition-all cursor-pointer flex items-center gap-1.5 shadow-xs"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Details</span>
                    </Button>
                  </Link>
                </div>

              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-card border border-border rounded-3xl text-xs text-muted-foreground">
              No completed payment history found.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}