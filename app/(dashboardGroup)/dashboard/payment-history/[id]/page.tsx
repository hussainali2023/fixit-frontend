import { getPaymentAction } from "@/lib/actions/paymentActions";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Wrench, Receipt, CheckCircle, Clock, XCircle } from "lucide-react";
import ReceiptActions from "../../_components/ReceiptActions";

export const dynamic = "force-dynamic";

const StatusBadge = ({ status }: { status: string }) => {
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
    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border ${map[status] || map.PENDING}`}>
      {IconMap[status]} {status}
    </span>
  );
};

interface Props {
  params: Promise<{ id: string }>;
}

export default async function PaymentDetailsPage({ params }: Props) {
  const { id } = await params;
  const res = await getPaymentAction(id);

  if (!res.success || !res.data?.payment) {
    return notFound();
  }

  const payment = res.data.payment;
  const booking = payment.booking;
  const service = booking?.service;
  const dateStr = new Date(payment.createdAt).toLocaleDateString("en-US", {
    weekday: "short", month: "long", day: "numeric", year: "numeric",
    hour: "2-digit", minute: "2-digit"
  });

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between print:hidden">
        <Link
          href="/dashboard/payment-history"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to History
        </Link>

        <ReceiptActions
          paymentId={payment.id}
          transactionId={payment.transactionId}
          amount={payment.amount}
          serviceName={service?.name}
          date={dateStr}
          status={payment.status}
        />
      </div>

      <div className="premium-card rounded-3xl overflow-hidden print:border-none print:shadow-none print:bg-white print:text-black">
        <div className="bg-primary/5 border-b border-border p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <Receipt className="w-7 h-7" />
            </div>
            <div>
              <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Payment Receipt</p>
              <h1 className="text-2xl font-black text-foreground mt-0.5">₹{payment.amount?.toLocaleString()}</h1>
            </div>
          </div>
          <StatusBadge status={payment.status} />
        </div>

        <div className="p-6 sm:p-8 space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-1">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Transaction ID</p>
              <p className="text-sm font-medium text-foreground font-mono bg-muted px-2 py-1 rounded-md inline-block break-all">
                {payment.transactionId || "N/A"}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Payment Date</p>
              <p className="text-sm font-medium text-foreground flex items-center gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                {dateStr}
              </p>
            </div>
          </div>

          <div className="border-t border-border pt-6">
            <h3 className="text-base font-bold text-foreground mb-4 flex items-center gap-2">
              <Wrench className="w-4 h-4 text-primary" /> Service Details
            </h3>

            <div className="bg-muted/30 rounded-2xl p-5 border border-border">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-bold text-foreground text-lg">{service?.name || "Service"}</p>
                  <p className="text-xs text-muted-foreground mt-1">Booking ID: {booking?.id}</p>
                </div>
                <p className="text-lg font-black text-foreground">₹{service?.price || payment.amount}</p>
              </div>
            </div>
          </div>

          <div className="border-t border-border pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs text-muted-foreground text-center sm:text-left">
              If you have any issues with this payment, please contact our support team.
            </p>
            <ReceiptActions
              paymentId={payment.id}
              transactionId={payment.transactionId}
              amount={payment.amount}
              serviceName={service?.name}
              date={dateStr}
              status={payment.status}
            />
          </div>
        </div>
      </div>
    </div>
  );
}