import { getAdminBookingsAction } from "@/lib/actions/adminActions";
import { Calendar, User, Wrench, DollarSign, AlertCircle } from "lucide-react";

export const dynamic = "force-dynamic";

const StatusBadge = ({ status }: { status: string }) => {
  const map: Record<string, string> = {
    REQUESTED: "badge-requested",
    ACCEPTED: "badge-accepted",
    DECLINED: "badge-declined",
    PAID: "badge-paid",
    IN_PROGRESS: "badge-in_progress",
    COMPLETED: "badge-completed",
    CANCELLED: "badge-cancelled",
  };
  return (
    <span className={`inline-flex px-2.5 py-1 rounded-full text-[11px] font-bold border uppercase ${map[status] || "badge-requested"}`}>
      {status?.replace("_", " ")}
    </span>
  );
};

export default async function AdminBookingsPage() {
  const res = await getAdminBookingsAction();
  const bookings = res?.data?.bookings || res?.data || [];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
          All Bookings
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          {bookings.length} total bookings across the platform
        </p>
      </div>

      {bookings.length > 0 ? (
        <div className="premium-card rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/40">
                  {["Customer", "Service", "Technician", "Date", "Amount", "Status"].map((h) => (
                    <th key={h} className="text-left px-5 py-3.5 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {bookings.map((item: any) => (
                  <tr key={item.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-xs shrink-0">
                          {item.customer?.name?.[0]?.toUpperCase() || <User className="w-3.5 h-3.5" />}
                        </div>
                        <div>
                          <p className="font-semibold text-foreground text-sm">{item.customer?.name || "Customer"}</p>
                          <p className="text-xs text-muted-foreground">{item.customer?.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1.5">
                        <Wrench className="w-3.5 h-3.5 text-primary shrink-0" />
                        <span className="font-semibold text-foreground text-sm">{item.service?.name || "Service"}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-sm text-muted-foreground">
                      {item.technician?.user?.name || "—"}
                    </td>
                    <td className="px-5 py-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-primary shrink-0" />
                        {item.scheduledDate
                          ? new Date(item.scheduledDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
                          : "N/A"}
                      </div>
                    </td>
                    <td className="px-5 py-4 font-bold text-foreground">
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-3.5 h-3.5 text-primary shrink-0" />
                        ₹{item.totalPrice || item.service?.price || 0}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <StatusBadge status={item.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="text-center py-16 rounded-2xl border border-dashed border-border">
          <AlertCircle className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
          <p className="font-bold text-foreground">No bookings found</p>
        </div>
      )}
    </div>
  );
}
