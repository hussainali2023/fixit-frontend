/* eslint-disable @typescript-eslint/no-explicit-any */
import { getServicesAction } from "@/lib/actions/serviceActions";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  SlidersHorizontal,
  Star,
  MapPin,
  ArrowRight,
  Tag,
  Wrench,
} from "lucide-react";

export const dynamic = "force-dynamic";

interface Props {
  searchParams: Promise<{ search?: string; category?: string; location?: string }>;
}

const CATEGORIES = [
  "All", "AC Repair", "Electrical", "Plumbing", "Cleaning",
  "Painting", "Carpentry", "Pest Control", "Appliance Repair",
];

export default async function ServicesPage({ searchParams }: Props) {
  const params = await searchParams;
  const search = params.search || "";
  const category = params.category || "";
  const location = params.location || "";

  const res = await getServicesAction({ search, category: category === "All" ? "" : category, location });
  const services = res?.data?.services || res?.data || [];

  return (
    <div className="min-h-screen bg-background">
      {/* Page Hero */}
      <div className="hero-bg border-b border-border py-12 px-4">
        <div className="max-w-5xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-primary bg-primary/10 px-3.5 py-1.5 rounded-full border border-primary/20">
            <Wrench className="w-3.5 h-3.5" /> All Services
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
            Find the Right <span className="gradient-text">Service for You</span>
          </h1>
          <p className="text-muted-foreground text-sm max-w-xl mx-auto">
            Browse our wide range of professional home services — all performed by verified experts.
          </p>

          {/* Search Bar */}
          <form className="max-w-2xl mx-auto flex gap-2" method="GET">
            <div className="flex-1 relative">
              <Search className="w-4 h-4 absolute left-4 top-3.5 text-muted-foreground" />
              <input
                name="search"
                defaultValue={search}
                placeholder="Search services (AC, Electrical, Plumbing...)"
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div className="relative">
              <MapPin className="w-4 h-4 absolute left-3.5 top-3.5 text-muted-foreground" />
              <input
                name="location"
                defaultValue={location}
                placeholder="Location"
                className="pl-10 pr-4 py-3 rounded-xl border border-border bg-card text-sm w-36 focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-bold flex items-center gap-2 hover:bg-primary/90 transition-colors"
            >
              <Search className="w-4 h-4" />
              <span className="hidden sm:inline">Search</span>
            </button>
          </form>

          {/* Category Chips */}
          <div className="flex flex-wrap justify-center gap-2 pt-2">
            {CATEGORIES.map((cat) => {
              const active = (cat === "All" && !category) || category === cat;
              return (
                <Link
                  key={cat}
                  href={cat === "All" ? "/services" : `/services?category=${encodeURIComponent(cat)}`}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all border ${active
                      ? "bg-primary text-primary-foreground border-primary shadow-sm"
                      : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground bg-card"
                    }`}
                >
                  {cat}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-muted-foreground">
            <span className="font-bold text-foreground">{services.length}</span> services found
            {search && <> for "<span className="text-primary font-semibold">{search}</span>"</>}
          </p>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <SlidersHorizontal className="w-4 h-4" /> Sorted by newest
          </div>
        </div>

        {services.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {services.map((service: any) => {
              const techUser = service.technician?.user;
              return (
                <Link key={service.id} href={`/services/${service.id}`} className="group block">
                  <div className="premium-card rounded-2xl overflow-hidden flex flex-col h-full">
                    {/* Image */}
                    <div className="relative w-full aspect-[4/3] bg-muted overflow-hidden">
                      <Image
                        unoptimized
                        src={service.image || "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=800"}
                        alt={service.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-bold bg-background/90 backdrop-blur text-foreground border border-border">
                        {service.category || "General"}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-4 flex-1 flex flex-col gap-2">
                      <h3 className="font-bold text-foreground text-sm leading-tight group-hover:text-primary transition-colors line-clamp-2">
                        {service.name}
                      </h3>
                      <p className="text-xs text-muted-foreground line-clamp-2 flex-1">
                        {service.description}
                      </p>

                      {techUser && (
                        <div className="flex items-center gap-2 p-2 rounded-xl bg-muted/50 border border-border">
                          <div className="w-6 h-6 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-[11px] font-bold shrink-0">
                            {techUser.name?.[0]?.toUpperCase()}
                          </div>
                          <span className="text-xs text-muted-foreground truncate">{techUser.name}</span>
                          <MapPin className="w-3 h-3 text-muted-foreground ml-auto shrink-0" />
                          <span className="text-[11px] text-muted-foreground truncate">{service.technician?.location?.split(",")[0]}</span>
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-1 border-t border-border mt-auto">
                        <div>
                          <p className="text-[10px] text-muted-foreground font-medium">Starting from</p>
                          <p className="text-base font-black text-primary">₹{service.price}</p>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-amber-600 font-bold">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          {service.averageRating ? Number(service.averageRating).toFixed(1) : "5.0"}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 rounded-2xl border border-dashed border-border">
            <Search className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
            <p className="font-bold text-foreground">No services found</p>
            <p className="text-sm text-muted-foreground mt-1">Try a different search or category.</p>
            <Link href="/services" className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-bold">
              Clear Filters <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}