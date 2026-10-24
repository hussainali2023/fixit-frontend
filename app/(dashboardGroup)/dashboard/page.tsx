import { getMyBookingsAction } from "@/lib/actions/bookingActions";
import { getMyPaymentsAction } from "@/lib/actions/paymentActions";
import {
  Calendar,
  CreditCard,
  PlayCircle,
  Wrench,
  ArrowRight,
  ShieldCheck,
  Clock,
  Sparkles,
  Users,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default async function CustomerDashboardPage() {
  const [bookingsRes, paymentsRes] = await Promise.all([
    getMyBookingsAction(),
    getMyPaymentsAction(),
  ]);

  const bookings = bookingsRes?.data?.bookings || bookingsRes?.data || [];
  const payments = paymentsRes?.data?.payments || paymentsRes?.data || [];

  const activeBookings = bookings.filter((b: any) =>
    ["ACCEPTED", "PAID", "IN_PROGRESS"].includes(b.status)
  ).length;

  const totalSpent = payments
    .filter((p: any) => p.status === "COMPLETED")
    .reduce((sum: number, p: any) => sum + (p.amount || 0), 0);

  const recentBookings = bookings.slice(0, 3);

  return (
    <div className="max-w-5xl mx-auto space-y-8 py-2">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/50 pb-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20 mb-1">
            <Sparkles className="w-3.5 h-3.5" /> Customer Dashboard
          </div>
          <h1
            className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Dashboard Overview
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage your service requests, track active technician visits, and view invoices.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/services">
            <Button className="rounded-xl text-xs font-bold px-4 py-2.5 bg-gradient-to-r from-primary to-teal-500 text-white shadow-sm hover:shadow-md transition-all flex items-center gap-2">
              <Wrench className="w-3.5 h-3.5" /> Book New Service
            </Button>
          </Link>
          <Link href="/technicians">
            <Button variant="outline" className="rounded-xl text-xs font-semibold px-4 py-2.5 border-border hover:bg-muted transition-all flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5" /> Technicians
            </Button>
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="premium-card rounded-2xl p-5 flex items-center gap-4 bg-gradient-to-br from-card to-primary/5">
          <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 border border-primary/20 shadow-xs">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-black text-foreground">{bookings.length}</p>
            <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">
              Total Bookings
            </p>
          </div>
        </div>

        <div className="premium-card rounded-2xl p-5 flex items-center gap-4 bg-gradient-to-br from-card to-emerald-500/5">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-500/20 shadow-xs">
            <PlayCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-black text-emerald-600">{activeBookings}</p>
            <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">
              Active In-Progress
            </p>
          </div>
        </div>

        <div className="premium-card rounded-2xl p-5 flex items-center gap-4 bg-gradient-to-br from-card to-teal-500/5">
          <div className="w-12 h-12 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center shrink-0 border border-teal-500/20 shadow-xs">
            <CreditCard className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-black text-teal-600 dark:text-teal-400">
              ₹{totalSpent.toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">
              Total Paid Out
            </p>
          </div>
        </div>
      </div>

      {/* Quick Action Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Link href="/dashboard/my-booking" className="premium-card rounded-2xl p-6 group block">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <Calendar className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-foreground text-base group-hover:text-primary transition-colors">
                My Bookings & Appointments
              </h3>
            </div>
            <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed pl-12">
            Track real-time status of service requests, manage upcoming technician visits, and submit reviews after completion.
          </p>
        </Link>

        <Link href="/dashboard/payment-history" className="premium-card rounded-2xl p-6 group block">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                <CreditCard className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-foreground text-base group-hover:text-primary transition-colors">
                Payment History & Invoices
              </h3>
            </div>
            <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed pl-12">
            View all completed transactions, digital receipts, and verified payment invoices processed through FixItNow.
          </p>
        </Link>
      </div>

      {/* Recent Bookings Snapshot */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-foreground flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary" />
            <span>Recent Booking Activity</span>
          </h2>
          <Link
            href="/dashboard/my-booking"
            className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {recentBookings.length > 0 ? (
          <div className="space-y-3">
            {recentBookings.map((b: any) => (
              <div
                key={b.id}
                className="premium-card p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <Wrench className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground text-sm">
                      {b.service?.name || "Service Request"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {b.scheduledDate
                        ? new Date(b.scheduledDate).toLocaleDateString("en-US", {
                            weekday: "short",
                            month: "short",
                            day: "numeric",
                          })
                        : "Scheduled"} • ₹{b.totalPrice || 0}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 sm:ml-auto">
                  <span
                    className={`inline-flex px-2.5 py-1 rounded-full text-[11px] font-bold border uppercase ${
                      b.status === "COMPLETED"
                        ? "badge-completed"
                        : b.status === "ACCEPTED"
                        ? "badge-accepted"
                        : b.status === "IN_PROGRESS"
                        ? "badge-in_progress"
                        : "badge-requested"
                    }`}
                  >
                    {b.status?.replace("_", " ")}
                  </span>
                  <Link
                    href="/dashboard/my-booking"
                    className="text-xs font-semibold text-primary hover:underline"
                  >
                    Details →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 rounded-2xl border border-dashed border-border p-6 bg-card/40">
            <Wrench className="w-8 h-8 text-muted-foreground/60 mx-auto mb-2" />
            <p className="font-bold text-sm text-foreground">No bookings made yet</p>
            <p className="text-xs text-muted-foreground mt-1">
              Ready to fix or upgrade something in your home? Book our certified technicians today.
            </p>
            <div className="mt-4">
              <Link href="/services">
                <Button size="sm" className="rounded-xl text-xs font-bold px-4 py-2">
                  Browse Available Services
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Safety & Guarantee Banner */}
      <div className="premium-card p-5 rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shrink-0 shadow-sm">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <p className="font-bold text-sm text-foreground">FixItNow 30-Day Service Guarantee</p>
            <p className="text-xs text-muted-foreground">Every completed job is backed by our customer satisfaction warranty.</p>
          </div>
        </div>
        <Link href="/about">
          <Button variant="outline" size="sm" className="rounded-xl text-xs font-semibold border-primary/30 text-primary hover:bg-primary/10 shrink-0">
            Learn More
          </Button>
        </Link>
      </div>
    </div>
  );
}