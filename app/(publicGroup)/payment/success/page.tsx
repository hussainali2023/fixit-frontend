import React from "react";
import Link from "next/link";
import { CheckCircle2, ArrowRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import ReceiptActions from "@/app/(dashboardGroup)/dashboard/_components/ReceiptActions";

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-card border border-border rounded-3xl p-8 text-center space-y-6 shadow-xl animate-in fade-in zoom-in-95 duration-300">
        
        {/* Success Icon */}
        <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle2 className="w-10 h-10 animate-bounce" />
        </div>

        {/* Success Text */}
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-3 py-1 rounded-full border border-emerald-200">
            Payment Verified
          </span>
          <h1 className="text-2xl font-extrabold text-foreground pt-1">
            Payment Successful!
          </h1>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Thank you! Your payment has been received successfully and your booking status is now updated to <strong className="text-emerald-600">PAID</strong>.
          </p>
        </div>

        {/* Download & Copy Receipt Actions */}
        <div className="flex justify-center pt-2">
          <ReceiptActions
            paymentId="PAYMENT-VERIFIED"
            amount="PAID"
            serviceName="FixItNow Service Booking"
            status="COMPLETED"
          />
        </div>

        {/* Navigation Actions */}
        <div className="pt-2 space-y-3">
          <Link href="/dashboard/my-booking" className="block w-full">
            <Button className="w-full rounded-2xl font-bold text-xs py-5 bg-emerald-600 hover:bg-emerald-700 text-white shadow-md flex items-center justify-center gap-2 cursor-pointer">
              <Calendar className="w-4 h-4" />
              <span>Go to My Bookings</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

      </div>
    </div>
  );
}