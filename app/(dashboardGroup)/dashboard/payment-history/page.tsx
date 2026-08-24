import { getMyPaymentsAction } from "@/lib/actions/paymentActions";
import { CreditCard, CheckCircle, XCircle, Clock, ExternalLink } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

const PaymentStatusBadge = ({ status }: { status: string }) => {
  const map: Record<string, string> = {
    COMPLETED: "bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300",
    PENDING: "bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300",
    FAILED: "bg-red-100 text-red-800 border-red-300 dark:bg-red-950/60 dark:text-red-300",
  };
  const IconMap: Record<string, any> = {
    COMPLETED: <CheckCircle className="w-3.5 h-3.5" />,
    PENDING: <Clock className="w-3.5 h-3.5" />,
    FAILED: <XCircle className="w-3.5 h-3.5" />,
  };
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold border ${map[status] || map.PENDING}`}>
      {IconMap[status]} {status}
    </span>
  );
};

export default async function PaymentHistoryPage() {
  const res = await getMyPaymentsAction();
  const payments = res?.data?.payments || res?.data || [];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
          Payment History
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          All your transactions in one place
        </p>
      </div>

      {payments.length > 0 ? (
        <div className="premium-card rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left px-5 py-3.5 text-xs font-bold text-muted-foreground uppercase tracking-wider">Service</th>
                  <th className="text-left px-5 py-3.5 text-xs font-bold text-muted-foreground uppercase tracking-wider">Amount</th>
                  <th className="text-left px-5 py-3.5 text-xs font-bold text-muted-foreground uppercase tracking-wider">Date</th>
                  <th className="text-left px-5 py-3.5 text-xs font-bold text-muted-foreground uppercase tracking-wider">Status</th>
                  <th className="text-left px-5 py-3.5 text-xs font-bold text-muted-foreground uppercase tracking-wider">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {payments.map((payment: any) => (
                  <tr key={payment.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                          <CreditCard className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground text-sm">
                            {payment.booking?.service?.name || "Service"}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            #{payment.id.slice(0, 8)}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 font-bold text-foreground">
                      ₹{payment.amount?.toLocaleString() || 0}
                    </td>
                    <td className="px-5 py-4 text-muted-foreground text-xs">
                      {new Date(payment.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-5 py-4">
                      <PaymentStatusBadge status={payment.status} />
                    </td>
                    <td className="px-5 py-4">
                      <Link
                        href={`/dashboard/payment-history/${payment.id}`}
                        className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:text-primary/80 transition-colors"
                      >
                        View <ExternalLink className="w-3 h-3" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="text-center py-16 rounded-2xl border border-dashed border-border">
          <CreditCard className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
          <p className="font-bold text-foreground">No payments yet</p>
          <p className="text-sm text-muted-foreground mt-1">Your payment history will appear here.</p>
        </div>
      )}
    </div>
  );
}
