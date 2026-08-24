/* eslint-disable @typescript-eslint/no-explicit-any */
import { getTechnicianAction } from "@/lib/actions/technicianActions";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  User,
  MapPin,
  Briefcase,
  Star,
  ArrowLeft,
  Wrench,
  MessageSquare,
  Shield,
  Clock,
} from "lucide-react";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ id: string }>;
}

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

function getTechImage(skills?: string): string {
  if (!skills) return CATEGORY_IMAGES.electrician;
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

function getTechCategory(skills?: string): string {
  if (!skills) return "Technician";
  const s = skills.toLowerCase();
  if (s.includes("electric") || s.includes("wiring") || s.includes("circuit")) return "Electrician";
  if (s.includes("plumb") || s.includes("pipe") || s.includes("water")) return "Plumber";
  if (s.includes("ac") || s.includes("hvac") || s.includes("air condition") || s.includes("cooling")) return "AC Technician";
  if (s.includes("clean") || s.includes("sofa") || s.includes("room") || s.includes("wash")) return "Cleaning Technician";
  return "Technician";
}

function getAvgRating(reviews: any[]): number {
  if (reviews.length === 0) return 0;
  const sum = reviews.reduce((acc: number, r: any) => acc + (r.rating || 0), 0);
  return Math.round((sum / reviews.length) * 10) / 10;
}

/* ── page ── */

export default async function TechnicianDetailPage({ params }: Props) {
  const { id } = await params;
  const res = await getTechnicianAction(id);

  if (!res.success || !res.data?.technician) return notFound();

  const tech = res.data.technician;
  const techUser = tech.user;
  const services = tech.services || [];
  const reviews = (tech.bookings || []).flatMap((b: any) =>
    b.review ? [b.review] : []
  );
  const avgRating = getAvgRating(reviews);
  const category = getTechCategory(tech.skills);
  const imgUrl = getTechImage(tech.skills);

  return (
    <div className="min-h-screen bg-background">
      {/* ── Hero banner ── */}
      <div className="relative w-full h-56 sm:h-64 lg:h-72 overflow-hidden bg-muted">
        <Image
          unoptimized
          src={imgUrl}
          alt={category}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />

        {/* Back button */}
        <div className="absolute top-4 left-4 z-10">
          <Link
            href="/technicians"
            className="inline-flex items-center gap-2 text-sm font-medium text-white bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full hover:bg-black/60 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>
        </div>

        {/* Category badge */}
        <span className="absolute top-4 right-4 z-10 text-xs font-bold text-white bg-primary/90 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/20">
          {category}
        </span>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-12 -mt-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ── Left: Tech Info ── */}
          <div className="lg:col-span-1 space-y-6">
            <div className="premium-card rounded-3xl p-6 text-center">
              {/* Avatar */}
              <div className="w-24 h-24 mx-auto rounded-3xl bg-primary/10 text-primary flex items-center justify-center text-4xl font-black mb-4 border-4 border-background shadow-lg">
                {techUser?.name?.[0]?.toUpperCase() || (
                  <User className="w-10 h-10" />
                )}
              </div>

              <h1
                className="text-xl font-bold text-foreground"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {techUser?.name || "Verified Technician"}
              </h1>

              <div className="inline-flex items-center gap-1.5 mt-2 text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
                <Shield className="w-3 h-3" /> {category}
              </div>

              {/* Rating */}
              <div className="flex items-center justify-center gap-1.5 mt-4">
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star
                      key={idx}
                      className={`w-4 h-4 ${
                        idx < Math.round(avgRating)
                          ? "fill-amber-400 text-amber-400"
                          : "text-border"
                      }`}
                    />
                  ))}
                </div>
                <span className="font-bold text-foreground text-sm ml-1">
                  {reviews.length > 0 ? avgRating : "New"}
                </span>
                <span className="text-muted-foreground text-xs">
                  ({reviews.length} review{reviews.length !== 1 ? "s" : ""})
                </span>
              </div>
            </div>

            {/* Overview card */}
            <div className="premium-card rounded-3xl p-6 space-y-4">
              <h3 className="text-sm font-bold text-foreground border-b border-border pb-2 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-primary" /> Overview
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3 text-muted-foreground">
                  <Wrench className="w-4 h-4 text-primary shrink-0" />
                  <span>{tech.skills || "General skills"}</span>
                </div>
                <div className="flex items-start gap-3 text-muted-foreground">
                  <MapPin className="w-4 h-4 text-primary shrink-0" />
                  <span>{tech.location || "Location not provided"}</span>
                </div>
                <div className="flex items-start gap-3 text-muted-foreground">
                  <Clock className="w-4 h-4 text-primary shrink-0" />
                  <span>
                    {tech.experience || 0} year{tech.experience !== 1 ? "s" : ""}{" "}
                    experience
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right: Services & Reviews ── */}
          <div className="lg:col-span-2 space-y-6">
            <h2
              className="text-2xl font-bold text-foreground"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Offered Services
            </h2>

            {services.length > 0 ? (
              <div className="grid sm:grid-cols-2 gap-4">
                {services.map((service: any) => (
                  <Link
                    key={service.id}
                    href={`/services/${service.id}`}
                    className="group"
                  >
                    <div className="premium-card rounded-2xl p-4 flex gap-4 h-full">
                      <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-muted">
                        <Image
                          unoptimized
                          src={
                            service.image ||
                            "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=200"
                          }
                          alt={service.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-col">
                        <h4 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors line-clamp-2">
                          {service.name}
                        </h4>
                        <p className="text-[11px] text-muted-foreground mt-1 px-2 py-0.5 rounded-full bg-muted self-start">
                          {service.category || "General"}
                        </p>
                        <p className="text-sm font-black text-primary mt-auto">
                          ₹{service.price}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center bg-muted/30 rounded-2xl border border-dashed border-border">
                <p className="text-muted-foreground text-sm">
                  No services listed yet.
                </p>
              </div>
            )}

            <h2
              className="text-2xl font-bold text-foreground mt-8"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Customer Reviews
            </h2>

            {reviews.length > 0 ? (
              <div className="space-y-4">
                {reviews.map((review: any, i: number) => (
                  <div key={i} className="premium-card rounded-2xl p-5">
                    <div className="flex items-center gap-1 mb-2">
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <Star
                          key={idx}
                          className={`w-4 h-4 ${
                            idx < review.rating
                              ? "fill-amber-400 text-amber-400"
                              : "text-border"
                          }`}
                        />
                      ))}
                      <span className="ml-2 text-xs font-bold text-foreground">
                        {review.rating}/5
                      </span>
                    </div>
                    <p className="text-sm text-foreground italic">
                      &quot;{review.comment}&quot;
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      Reviewed on{" "}
                      {new Date(review.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center bg-muted/30 rounded-2xl border border-dashed border-border">
                <MessageSquare className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground text-sm">No reviews yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
