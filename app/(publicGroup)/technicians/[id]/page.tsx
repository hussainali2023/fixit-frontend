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
} from "lucide-react";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function TechnicianDetailPage({ params }: Props) {
  const { id } = await params;
  const res = await getTechnicianAction(id);

  if (!res.success || !res.data?.technician) return notFound();

  const tech = res.data.technician;
  const techUser = tech.user;
  const services = tech.services || [];

  // Flatten reviews from bookings
  const reviews = (tech.bookings || []).flatMap((b: any) => b.review ? [b.review] : []);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4">
        <Link
          href="/technicians"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Technicians
        </Link>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Tech Info */}
        <div className="lg:col-span-1 space-y-6">
          <div className="premium-card rounded-3xl p-6 text-center">
            <div className="w-24 h-24 mx-auto rounded-3xl bg-primary/10 text-primary flex items-center justify-center text-4xl font-black mb-4">
              {techUser?.name?.[0]?.toUpperCase() || <User className="w-10 h-10" />}
            </div>
            <h1 className="text-xl font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
              {techUser?.name || "Verified Technician"}
            </h1>
            <p className="text-sm text-muted-foreground mt-1">Professional Technician</p>

            <div className="flex items-center justify-center gap-1 mt-3">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="font-bold text-foreground text-sm">5.0</span>
              <span className="text-muted-foreground text-sm">({reviews.length} Reviews)</span>
            </div>
          </div>

          <div className="premium-card rounded-3xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-foreground border-b border-border pb-2">Overview</h3>
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
                <Briefcase className="w-4 h-4 text-primary shrink-0" />
                <span>{tech.experience || 0} year(s) experience</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Services & Reviews */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-2xl font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
            Offered Services
          </h2>

          {services.length > 0 ? (
            <div className="grid sm:grid-cols-2 gap-4">
              {services.map((service: any) => (
                <Link key={service.id} href={`/services/${service.id}`} className="group">
                  <div className="premium-card rounded-2xl p-4 flex gap-4 h-full">
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-muted">
                      <Image
                        unoptimized
                        src={service.image || "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=200"}
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
                      <p className="text-sm font-black text-primary mt-auto">₹{service.price}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center bg-muted/30 rounded-2xl border border-dashed border-border">
              <p className="text-muted-foreground text-sm">No services listed yet.</p>
            </div>
          )}

          <h2 className="text-2xl font-bold text-foreground mt-8" style={{ fontFamily: "var(--font-heading)" }}>
            Customer Reviews
          </h2>

          {reviews.length > 0 ? (
            <div className="space-y-4">
              {reviews.map((review: any, i: number) => (
                <div key={i} className="premium-card rounded-2xl p-5">
                  <div className="flex items-center gap-1 mb-2">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star key={idx} className={`w-4 h-4 ${idx < review.rating ? "fill-amber-400 text-amber-400" : "text-border"}`} />
                    ))}
                  </div>
                  <p className="text-sm text-foreground italic">"{review.comment}"</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Reviewed on {new Date(review.createdAt).toLocaleDateString()}
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
  );
}
