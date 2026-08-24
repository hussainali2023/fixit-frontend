import { getAllBookingsAction } from "@/lib/actions/bookingActions";
import TechnicianDashboardUI from "./_components/DashboardUi";

export const dynamic = "force-dynamic";

export default async function TechnicianDashboardPage() {
  const res = await getAllBookingsAction();
  // Backend auto-filters by technician when role is TECHNICIAN
  const bookings = res?.data?.bookings || res?.data || [];

  return (
    <div className="py-2">
      <TechnicianDashboardUI bookings={bookings} />
    </div>
  );
}