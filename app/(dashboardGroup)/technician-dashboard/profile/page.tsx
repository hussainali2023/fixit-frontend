import { getMeAction } from "@/app/(authGroup)/_actions/authActions";
import TechnicianProfileForm from "../_components/TechnicianProfileForm";
import { User, Mail, Shield } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function TechnicianProfilePage() {
  const meRes = await getMeAction();
  const user = meRes?.data?.user || meRes?.data || null;
  const profile = user?.technicianProfile || null;

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
          My Profile
        </h1>
        <p className="text-sm text-muted-foreground mt-1">Manage your technician profile</p>
      </div>

      {/* User info card */}
      {user && (
        <div className="premium-card rounded-2xl p-5 flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center text-xl font-black shrink-0">
            {user.name?.[0]?.toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-foreground">{user.name}</p>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
              <Mail className="w-3 h-3" /> {user.email}
            </p>
            <span className="inline-flex items-center gap-1 mt-1.5 text-[11px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary">
              <Shield className="w-3 h-3" /> TECHNICIAN
            </span>
          </div>
        </div>
      )}

      <TechnicianProfileForm profile={profile} />
    </div>
  );
}
