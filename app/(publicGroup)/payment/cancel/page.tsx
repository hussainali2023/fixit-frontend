import React from "react";
import Link from "next/link";
import { XCircle, ArrowRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PaymentCancelPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-card border border-border rounded-3xl p-8 text-center space-y-6 shadow-xl animate-in fade-in zoom-in-95 duration-300">
        
        {/* Failed Icon */}
        <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-950/50 text-red-600 flex items-center justify-center mx-auto shadow-inner">
          <XCircle className="w-10 h-10" />
        </div>

        {/* Failed Text */}
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-red-600 bg-red-50 dark:bg-red-950 px-3 py-1 rounded-full border border-red-200">
            Payment Cancelled
          </span>
          <h1 className="text-2xl font-extrabold text-foreground pt-1">
            Payment Failed
          </h1>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Your payment was cancelled or failed. Your booking status has been marked as <strong className="text-red-600">FAILED</strong>. You can try paying again from your dashboard.
          </p>
        </div>

        {/* Actions */}
        <div className="pt-2 space-y-3">
          <Link href="/dashboard" className="block w-full">
            <Button className="w-full rounded-2xl font-bold text-xs py-5 bg-primary hover:bg-primary/90 text-primary-foreground shadow-md flex items-center justify-center gap-2 cursor-pointer">
              <Calendar className="w-4 h-4" />
              <span>Return to Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

      </div>
    </div>
  );
}
