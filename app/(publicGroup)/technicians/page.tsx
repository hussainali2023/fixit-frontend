/* eslint-disable @typescript-eslint/no-explicit-any */
import { getTechniciansAction } from "@/lib/actions/technicianActions";
import Link from "next/link";
import Image from "next/image";
import { User, MapPin, Briefcase, Star, Search, Wrench, ArrowRight, Shield } from "lucide-react";

export const dynamic = "force-dynamic";

/* ── helpers ── */

const CATEGORY_IMAGES: Record<string, string> = {
  electrician:
    "https://gacservices.com/wp-content/uploads/2018/01/electrician-working-on-electrical-panel-circuit-breaker-box.jpg",
  plumber:
    "https://bizeleven.com/assets/img/listing-gallery/68b2d31e9a339.jpg",
  ac: "https://www.sipltraining.com/assets/img/sipl-hvac-course.jpeg",
  cleaning:
    "https://cleaningkarigar.com/assets/service-sofa-DGBCWx4E.png",
};

/** Map technician skills text to a category image */
function getTechImage(skills?: string): string {
  if (!skills) return CATEGORY_IMAGES.electrician; // default fallback
  const s = skills.toLowerCase();
  if (s.includes("electric") || s.includes("wiring") || s.includes("circuit"))
    return CATEGORY_IMAGES.electrician;
  if (s.includes("plumb") || s.includes("pipe") || s.includes("water"))
    return CATEGORY_IMAGES.plumber;
  if (s.includes("ac") || s.includes("hvac") || s.includes("air condition") || s.includes("cooling"))
    return CATEGORY_IMAGES.ac;
  if (s.includes("clean") || s.includes("sofa") || s.includes("room") || s.includes("wash"))
    return CATEGORY_IMAGES.cleaning;
  return CATEGORY_IMAGES.electrician;
}

/** Derive a short category label from skills */
function getTechCategory(skills?: string): string {
  if (!skills) return "Technician";
  const s = skills.toLowerCase();
  if (s.includes("electric") || s.includes("wiring") || s.includes("circuit")) return "Electrician";
  if (s.includes("plumb") || s.includes("pipe") || s.includes("water")) return "Plumber";
  if (s.includes("ac") || s.includes("hvac") || s.includes("air condition") || s.includes("cooling")) return "AC Technician";
  if (s.includes("clean") || s.includes("sofa") || s.includes("room") || s.includes("wash")) return "Cleaning Technician";
  return "Technician";
}

/** Extract reviews from bookings array, just like the detail page does */
function getReviews(tech: any): any[] {
  return (tech.bookings || []).flatMap((b: any) => (b.review ? [b.review] : []));
}

/** Compute average rating from reviews */
function getAvgRating(reviews: any[]): number {
  if (reviews.length === 0) return 0;
  const sum = reviews.reduce((acc: number, r: any) => acc + (r.rating || 0), 0);
  return Math.round((sum / reviews.length) * 10) / 10;
}

/* ── page ── */

export default async function TechniciansPage() {
  const res = await getTechniciansAction();
  const technicians = res?.data?.technicians || res?.data || [];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="hero-bg border-b border-border py-14 px-4">
        <div className="max-w-5xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-primary bg-primary/10 px-3.5 py-1.5 rounded-full border border-primary/20">
            <Shield className="w-3.5 h-3.5" /> Verified Professionals
          </div>
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Our Expert <span className="gradient-text">Technicians</span>
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Browse our curated roster of skilled professionals — each verified,
            reviewed, and ready to help.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {technicians.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {technicians.map((tech: any) => {
              const techUser = tech.user;
              const reviews = getReviews(tech);
              const avgRating = getAvgRating(reviews);
              const category = getTechCategory(tech.skills);
              const imgUrl = getTechImage(tech.skills);

              return (
                <Link
                  key={tech.id}
                  href={`/technicians/${tech.id}`}
                  className="group block"
                  id={`tech-card-${tech.id}`}
                >
                  <div className="premium-card rounded-2xl overflow-hidden flex flex-col h-full">
                    {/* ── Image banner ── */}
                    <div className="relative w-full h-44 overflow-hidden bg-muted">
                      <Image
                        unoptimized
                        src={imgUrl}
                        alt={category}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                      {/* Category badge */}
                      <span className="absolute top-3 left-3 text-[11px] font-bold text-white bg-primary/90 backdrop-blur-sm px-3 py-1 rounded-full border border-white/20">
                        {category}
                      </span>

                      {/* Rating overlay bottom-right */}
                      {reviews.length > 0 && (
                        <div className="absolute bottom-3 right-3 flex items-center gap-1 text-xs font-bold text-white bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-full">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                          {avgRating}
                        </div>
                      )}
                    </div>

                    {/* ── Body ── */}
                    <div className="p-5 flex flex-col flex-1 space-y-3">
                      {/* Name + avatar row */}
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-lg font-black shrink-0 group-hover:scale-105 transition-transform duration-300">
                          {techUser?.name?.[0]?.toUpperCase() || (
                            <User className="w-5 h-5" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-foreground text-base truncate group-hover:text-primary transition-colors">
                            {techUser?.name || "Technician"}
                          </h3>
                          <div className="flex items-center gap-1 text-xs text-amber-600 font-bold mt-0.5">
                            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                            {reviews.length > 0 ? avgRating : "New"}{" "}
                            <span className="text-muted-foreground font-medium ml-1">
                              ({reviews.length} review{reviews.length !== 1 ? "s" : ""})
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Details */}
                      <div className="space-y-1.5 flex-1">
                        {tech.skills && (
                          <div className="flex items-start gap-2 text-sm text-muted-foreground">
                            <Wrench className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                            <span className="line-clamp-2 text-xs">{tech.skills}</span>
                          </div>
                        )}
                        {tech.location && (
                          <div className="flex items-start gap-2 text-sm text-muted-foreground">
                            <MapPin className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                            <span className="line-clamp-1 text-xs">{tech.location}</span>
                          </div>
                        )}
                        {tech.experience && (
                          <div className="flex items-start gap-2 text-sm text-muted-foreground">
                            <Briefcase className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                            <span className="text-xs">
                              {tech.experience} year{tech.experience !== 1 ? "s" : ""} exp.
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Footer */}
                      <div className="pt-3 border-t border-border mt-auto flex items-center justify-between">
                        <p className="text-[11px] font-bold text-muted-foreground">
                          {tech.services?.length || 0} Service{(tech.services?.length || 0) !== 1 ? "s" : ""}
                        </p>
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-primary group-hover:gap-2 transition-all duration-300">
                          View Profile <ArrowRight className="w-3.5 h-3.5" />
                        </span>
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
            <p className="font-bold text-foreground">No technicians found</p>
            <p className="text-sm text-muted-foreground mt-1">
              Check back later for newly joined professionals.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}