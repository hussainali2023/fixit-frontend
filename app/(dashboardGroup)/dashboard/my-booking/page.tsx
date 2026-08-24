import { getMyBookingsAction } from "@/lib/actions/bookingActions";
import CustomerBookingListUI from "../_components/bookingComponents";

export const dynamic = "force-dynamic";

export default async function MyBookingPage() {
  const res = await getMyBookingsAction();
  const bookings = res?.data?.bookings || res?.data || [];

  return (
    <div className="py-2">
      <CustomerBookingListUI bookings={bookings} />
    </div>
  );
}