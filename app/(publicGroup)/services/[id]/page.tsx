/* eslint-disable @typescript-eslint/no-explicit-any */
import { getServiceAction } from "@/lib/actions/serviceActions";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import BookFormDialog from "../../_components/BookFormDialog";
import {
  Star,
  MapPin,
  ShieldCheck,
  ArrowLeft,
  Wrench,
  Tag,
  DollarSign,
  User,
} from "lucide-react";

/* ── Category → Image mapping (same images as /technicians page) ── */
const CATEGORY_IMAGES: Record<string, string> = {
  electrician:
    "https://gacservices.com/wp-content/uploads/2018/01/electrician-working-on-electrical-panel-circuit-breaker-box.jpg",
  plumber:
    "https://bizeleven.com/assets/img/listing-gallery/68b2d31e9a339.jpg",
  ac: "https://www.sipltraining.com/assets/img/sipl-hvac-course.jpeg",
  cleaning:
    "https://cleaningkarigar.com/assets/service-sofa-DGBCWx4E.png",
};

/** Pick a contextual image based on the service category / name / description */
function getServiceImage(service: any): string {
  const category = (service?.category || "").toLowerCase();
  const name = (service?.name || "").toLowerCase();
  const desc = (service?.description || "").toLowerCase();
  const text = `${category} ${name} ${desc}`;

  if (text.includes("ac") || text.includes("hvac") || text.includes("air condition") || text.includes("cooling") || text.includes("repair"))
    return CATEGORY_IMAGES.ac;
  if (text.includes("plumb") || text.includes("pipe") || text.includes("water"))
    return CATEGORY_IMAGES.plumber;
  if (text.includes("clean") || text.includes("sofa") || text.includes("room") || text.includes("wash"))
    return CATEGORY_IMAGES.cleaning;
  if (text.includes("electric") || text.includes("wiring") || text.includes("circuit"))
    return CATEGORY_IMAGES.electrician;

  return CATEGORY_IMAGES.electrician; // default fallback
}

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ServiceDetailPage({ params }: Props) {
  const { id } = await params;
  const res = await getServiceAction(id);

  if (!res.success || !res.data?.service) return notFound();

  const service = res.data.service;
  const technician = service.technician;
  const techUser = technician?.user;

  return (
    <div className="min-h-screen bg-background">
      {/* Back link */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4">
        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Services
        </Link>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Service Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Hero Image */}
          <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-muted shadow-lg">
            <Image
              unoptimized
              src={service.image || getServiceImage(service)}
              alt={service.name}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            <span className="absolute bottom-4 left-4 px-3 py-1.5 rounded-full text-xs font-bold bg-background/90 backdrop-blur text-foreground border border-border">
              {service.category || "General"}
            </span>
          </div>

          {/* Service Title & Info */}
          <div className="premium-card rounded-2xl p-6 space-y-4">
            <div className="flex items-start justify-between gap-4">
              <h1 className="text-2xl font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
                {service.name}
              </h1>
              <div className="flex items-center gap-1 shrink-0 px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="text-sm font-bold text-amber-700 dark:text-amber-300">
                  {service.averageRating ? Number(service.averageRating).toFixed(1) : "5.0"}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <span className="flex items-center gap-1.5 text-xs font-bold text-primary bg-primary/10 px-3 py-1.5 rounded-full border border-primary/20">
                <Tag className="w-3.5 h-3.5" /> {service.category || "General"}
              </span>
              <span className="flex items-center gap-1.5 text-xs font-bold text-foreground bg-muted px-3 py-1.5 rounded-full border border-border">
                <DollarSign className="w-3.5 h-3.5 text-primary" /> Starting ₹{service.price}
              </span>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
          </div>

          {/* Technician Card */}
          {technician && (
            <div className="premium-card rounded-2xl p-6 space-y-4">
              <h2 className="text-base font-bold text-foreground flex items-center gap-2">
                <Wrench className="w-4 h-4 text-primary" /> About the Technician
              </h2>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center text-xl font-black shrink-0">
                  {techUser?.name?.[0]?.toUpperCase() || <User className="w-6 h-6" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-foreground">{techUser?.name || "Verified Technician"}</p>
                    <ShieldCheck className="w-4 h-4 text-primary" />
                  </div>
                  {technician.location && (
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                      <MapPin className="w-3 h-3" /> {technician.location}
                    </p>
                  )}
                  {technician.skills && (
                    <p className="text-xs text-muted-foreground mt-1">Skills: {technician.skills}</p>
                  )}
                  {technician.experience && (
                    <p className="text-xs text-muted-foreground">
                      {technician.experience} year{technician.experience !== 1 ? "s" : ""} experience
                    </p>
                  )}
                </div>
              </div>

              <Link
                href={`/technicians/${technician.id}`}
                className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:text-primary/80 transition-colors"
              >
                View Full Profile →
              </Link>
            </div>
          )}
        </div>

        {/* Right: Booking CTA */}
        <div className="space-y-4">
          <div className="premium-card rounded-2xl p-6 space-y-5 sticky top-20">
            <div className="text-center space-y-1">
              <p className="text-xs font-medium text-muted-foreground">Starting price</p>
              <p className="text-4xl font-black text-primary">₹{service.price}</p>
            </div>

            <div className="space-y-2 text-xs text-muted-foreground">
              {[
                "Verified professional technician",
                "30-day service warranty",
                "On-time guarantee",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-primary shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <BookFormDialog serviceId={service.id} serviceName={service.name} />
          </div>
        </div>
      </div>
    </div>
  );
}
