import { getServicesAction } from "@/lib/actions/serviceActions";
import { getMeAction } from "@/app/(authGroup)/_actions/authActions";
import TechnicianServicesListUI from "../_components/TechnicianServicesListUI";

export const dynamic = "force-dynamic";

export default async function MyServicesPage() {
  const [userRes, servicesRes] = await Promise.all([
    getMeAction(),
    getServicesAction()
  ]);

  const user = userRes?.data?.user || userRes?.data || null;
  const techId = user?.technicianProfile?.id;
  const allServices = servicesRes?.data?.services || servicesRes?.data || [];

  // Filter services for this technician
  const myServices = techId
    ? allServices.filter((s: any) => s.technicianId === techId)
    : [];

  return (
    <div className="py-2">
      <TechnicianServicesListUI services={myServices} />
    </div>
  );
}