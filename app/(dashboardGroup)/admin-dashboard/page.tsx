import { getUsersAction, getAdminBookingsAction } from "@/lib/actions/adminActions";
import { getServicesAction } from "@/lib/actions/serviceActions";
import AdminDashboardConsoleUI from "./_components/adminComponent";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [usersRes, bookingsRes, servicesRes] = await Promise.all([
    getUsersAction(),
    getAdminBookingsAction(),
    getServicesAction(),
  ]);

  const users = usersRes?.data?.users || usersRes?.data || [];
  const bookings = bookingsRes?.data?.bookings || bookingsRes?.data || [];
  const services = servicesRes?.data?.services || servicesRes?.data || [];

  return (
    <div className="py-2">
      <AdminDashboardConsoleUI
        initialUsers={users}
        initialBookings={bookings}
        initialServices={services}
      />
    </div>
  );
}