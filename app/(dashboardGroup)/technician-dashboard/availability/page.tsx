import { getMeAction } from "@/app/(authGroup)/_actions/authActions";
import TechnicianSchedulePage from "../_components/scheduleComponent";

export const dynamic = "force-dynamic";

export default async function AvailabilityPage() {
  const meRes = await getMeAction();
  const profile = meRes?.data?.user?.technicianProfile;
  const availability = profile?.availability;

  return (
    <div className="py-4">
      <TechnicianSchedulePage availability={availability} />
    </div>
  );
}
