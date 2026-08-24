"use client";

import React from "react";
import { Download, Copy, Printer } from "lucide-react";
import { toast } from "sonner";

interface ReceiptActionsProps {
  paymentId: string;
  transactionId?: string;
  amount: number | string;
  serviceName?: string;
  date?: string;
  status?: string;
}

export default function ReceiptActions({
  paymentId,
  transactionId,
  amount,
  serviceName = "Service",
  date,
  status = "COMPLETED",
}: ReceiptActionsProps) {
  const handlePrint = () => {
    window.print();
  };

  const handleCopy = () => {
    const text = `--- FIXITNOW PAYMENT RECEIPT ---
Receipt ID: #${paymentId}
Transaction ID: ${transactionId || "N/A"}
Service: ${serviceName}
Amount: ₹${amount}
Date: ${date || new Date().toLocaleDateString()}
Status: ${status}

Thank you for choosing FixItNow!`;

    navigator.clipboard.writeText(text);
    toast.success("Receipt details copied to clipboard!");
  };

  return (
    <div className="flex flex-wrap items-center gap-3 print:hidden">
      <button
        type="button"
        onClick={handleCopy}
        className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-card text-foreground text-xs font-bold hover:bg-accent transition-colors cursor-pointer"
      >
        <Copy className="w-3.5 h-3.5 text-primary" />
        Copy Details
      </button>

      <button
        type="button"
        onClick={handlePrint}
        className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-bold hover:bg-primary/90 transition-colors shadow-md cursor-pointer"
      >
        <Printer className="w-3.5 h-3.5" />
        Print / Download Receipt
      </button>
    </div>
  );
}
