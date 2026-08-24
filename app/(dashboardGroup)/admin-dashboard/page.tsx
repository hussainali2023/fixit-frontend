import { getUsersAction } from "@/lib/actions/adminActions";
import AdminUserManagementUI from "./_components/adminComponent";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const res = await getUsersAction();
  const users = res?.data?.users || res?.data || [];

  return (
    <div className="py-2">
      <AdminUserManagementUI users={users} />
    </div>
  );
}