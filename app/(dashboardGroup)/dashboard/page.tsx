import { getMyBookingsAction } from "@/lib/actions/bookingActions";
import { getMyPaymentsAction } from "@/lib/actions/paymentActions";
import { LayoutDashboard, Calendar, CreditCard, PlayCircle } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function CustomerDashboardPage() {
  const [bookingsRes, paymentsRes] = await Promise.all([
    getMyBookingsAction(),
    getMyPaymentsAction(),
  ]);

  const bookings = bookingsRes?.data?.bookings || bookingsRes?.data || [];
  const payments = paymentsRes?.data?.payments || paymentsRes?.data || [];

  const activeBookings = bookings.filter((b: any) => ["ACCEPTED", "PAID", "IN_PROGRESS"].includes(b.status)).length;
  const totalSpent = payments.filter((p: any) => p.status === "COMPLETED").reduce((sum: number, p: any) => sum + (p.amount || 0), 0);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
          Dashboard Overview
        </h1>
        <p className="text-sm text-muted-foreground mt-1">Welcome back to your customer portal</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="premium-card rounded-2xl p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <Calendar className="w-6 h-6 text-primary" />
          </div>
          <div>
            <p className="text-2xl font-black text-foreground">{bookings.length}</p>
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Total Bookings</p>
          </div>
        </div>
        <div className="premium-card rounded-2xl p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0">
            <PlayCircle className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <p className="text-2xl font-black text-emerald-600">{activeBookings}</p>
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Active Jobs</p>
          </div>
        </div>
        <div className="premium-card rounded-2xl p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0">
            <CreditCard className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <p className="text-2xl font-black text-blue-600">₹{totalSpent.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Total Spent</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link href="/dashboard/my-booking" className="premium-card rounded-2xl p-6 group block">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">Manage Bookings</h3>
            <span className="text-primary group-hover:translate-x-1 transition-transform">→</span>
          </div>
          <p className="text-sm text-muted-foreground">Track the status of your service requests, cancel bookings, and leave reviews.</p>
        </Link>
        <Link href="/dashboard/payment-history" className="premium-card rounded-2xl p-6 group block">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">Payment History</h3>
            <span className="text-primary group-hover:translate-x-1 transition-transform">→</span>
          </div>
          <p className="text-sm text-muted-foreground">View all your past transactions and payment details securely.</p>
        </Link>
      </div>
    </div>
  );
}