/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import Link from "next/link";
import { Star, MapPin, ShieldCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

/* ── Category → Image mapping ── */
const CATEGORY_IMAGES: Record<string, string> = {
  electrician:
    "https://gacservices.com/wp-content/uploads/2018/01/electrician-working-on-electrical-panel-circuit-breaker-box.jpg",
  plumber:
    "https://bizeleven.com/assets/img/listing-gallery/68b2d31e9a339.jpg",
  ac: "https://www.sipltraining.com/assets/img/sipl-hvac-course.jpeg",
  cleaning:
    "https://images.jdmagicbox.com/v2/comp/mangalore/w9/0824px824.x824.230623120146.e4w9/catalogue/d-clean-facility-management-pandeshwar-mangalore-residential-cleaning-services-azoc4ikee0.jpg",
};

/** Pick a contextual image based on the service category / name / description */
function getServiceImage(service: any): string {
  const category = (
    typeof service?.category === "string"
      ? service.category
      : service?.category?.name || ""
  ).toLowerCase();
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

interface ServiceCardProps {
  service: any;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const techUser = service?.technician?.user || service?.technician;
  const title = service?.name || service?.title || "Home Service";
  const categoryName =
    typeof service?.category === "string"
      ? service.category
      : service?.category?.name || "General";
  const imageUrl = service?.image || service?.imageUrl || getServiceImage(service);

  return (
    <div className="group relative rounded-2xl bg-card border border-border/60 overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.1)] hover:border-primary/30 transition-all duration-500 flex flex-col justify-between">
      <div>
        <div className="relative w-full aspect-[16/10] overflow-hidden bg-muted">
          <Image
            unoptimized
            src={imageUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

          {/* Category Badge */}
          <span className="absolute top-3 left-3 px-3 py-1 rounded-lg text-[11px] font-semibold bg-background/80 text-foreground backdrop-blur-xl border border-border/30 shadow-sm">
            {categoryName}
          </span>

          {/* Rating Badge */}
          <div className="absolute bottom-3 left-3 flex items-center gap-1 text-white text-xs font-bold bg-black/50 backdrop-blur-xl px-2.5 py-1 rounded-lg border border-white/10">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>
              {service?.averageRating
                ? Number(service.averageRating).toFixed(1)
                : "5.0"}
            </span>
            <span className="text-white/60 font-normal">
              ({service?.totalReviews || 12})
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 space-y-3.5">
          <Link href={`/services/${service.id}`}>
            <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-1 cursor-pointer">
              {title}
            </h3>
          </Link>

          <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
            {service?.description || "Professional service provided by verified technician."}
          </p>

          {/* Technician Info */}
          {techUser && (
            <div className="flex items-center gap-3 p-2.5 rounded-xl bg-muted/40 border border-border/40">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1">
                  <p className="text-xs font-semibold text-foreground truncate">
                    {techUser.name || "Verified Technician"}
                  </p>
                  <ShieldCheck className="w-3.5 h-3.5 text-primary shrink-0" />
                </div>
                <p className="text-[11px] text-muted-foreground flex items-center gap-0.5 truncate mt-0.5">
                  <MapPin className="w-3 h-3 shrink-0" />{" "}
                  {service?.technician?.location || "Kolkata, India"}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="p-5 flex items-center justify-between gap-2 border-t border-border/40 mt-1 pt-4">
        <div>
          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
            Starting from
          </p>
          <p className="text-xl font-extrabold text-primary tracking-tight">
            ₹{service?.price || 0}
          </p>
        </div>

        <div className="shrink-0">
          <Link href={`/services/${service?.id}`}>
            <Button
              size="sm"
              className="rounded-xl text-xs font-bold bg-gradient-to-r from-primary to-teal-500 hover:shadow-md text-white cursor-pointer px-4 flex items-center gap-1.5 transition-all"
            >
              <span>View Details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}