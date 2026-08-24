import { Grid, CheckCircle, Search, Info } from "lucide-react";

export const dynamic = "force-dynamic";

const CATEGORIES = [
  { name: "AC Repair", count: 24, active: true },
  { name: "Electrical", count: 18, active: true },
  { name: "Plumbing", count: 15, active: true },
  { name: "Cleaning", count: 32, active: true },
  { name: "Painting", count: 9, active: true },
  { name: "Carpentry", count: 12, active: true },
  { name: "Pest Control", count: 7, active: true },
  { name: "Appliance Repair", count: 14, active: true },
  { name: "Roofing", count: 3, active: true },
  { name: "General", count: 45, active: true },
];

export default function AdminCategoriesPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
            Service Categories
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage system-wide service categories
          </p>
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex gap-3 text-blue-700 dark:text-blue-300">
        <Info className="w-5 h-5 shrink-0 mt-0.5" />
        <div className="text-sm">
          <p className="font-bold">System Categories</p>
          <p className="mt-1">Categories are currently fixed in this version to maintain consistency across the platform. Future updates will allow dynamic category creation.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {CATEGORIES.map((cat) => (
          <div key={cat.name} className="premium-card rounded-2xl p-4 flex flex-col justify-between h-32">
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <Grid className="w-5 h-5" />
              </div>
              {cat.active && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 text-[10px] font-bold border border-emerald-500/20">
                  <CheckCircle className="w-3 h-3" /> Active
                </span>
              )}
            </div>
            <div>
              <p className="font-bold text-foreground text-sm truncate">{cat.name}</p>
              <p className="text-xs text-muted-foreground font-medium mt-0.5">{cat.count} Active Services</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
