/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import Link from "next/link";
import { Star, MapPin, ShieldCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  const imageUrl = service?.image || getServiceImage(service);

  return (
    <div className="group relative rounded-2xl bg-card border border-border overflow-hidden shadow-sm hover:shadow-xl hover:border-primary/40 transition-all duration-300 flex flex-col justify-between">
      <div>
        <div className="relative w-full aspect-[16/10] overflow-hidden bg-muted">
          <Image
            unoptimized
            src={imageUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

          {/* Category Badge */}
          <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold bg-background/90 text-foreground backdrop-blur-md border border-border shadow-sm">
            {categoryName}
          </span>

          {/* Rating Badge */}
          <div className="absolute bottom-3 left-3 flex items-center gap-1 text-white text-xs font-bold bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>
              {service?.averageRating
                ? Number(service.averageRating).toFixed(1)
                : "5.0"}
            </span>
            <span className="text-white/70 font-normal">
              ({service?.totalReviews || 12})
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 space-y-4">
          <Link href={`/services/${service.id}`}>
            <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1 cursor-pointer">
              {title}
            </h3>
          </Link>

          <p className="text-xs text-muted-foreground line-clamp-2">
            {service?.description || "Professional service provided by verified technician."}
          </p>

          {/* Technician Info */}
          {techUser && (
            <div className="flex items-center gap-3 p-2.5 rounded-xl bg-accent/50 border border-border/60">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1">
                  <p className="text-xs font-semibold text-foreground truncate">
                    {techUser.name || "Verified Technician"}
                  </p>
                  <ShieldCheck className="w-3.5 h-3.5 text-primary shrink-0" />
                </div>
                <p className="text-[11px] text-muted-foreground flex items-center gap-0.5 truncate">
                  <MapPin className="w-3 h-3 shrink-0" />{" "}
                  {service?.technician?.location || "Kolkata, India"}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="p-5 flex items-center justify-between gap-2 border-t border-border/60 mt-2 pt-4">
        <div>
          <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
            Starting from
          </p>
          <p className="text-xl font-extrabold text-primary">
            ₹{service?.price || 0}
          </p>
        </div>

        <div className="shrink-0">
          <Link href={`/services/${service?.id}`}>
            <Button
              size="sm"
              className="rounded-xl text-xs font-bold bg-primary hover:bg-primary/90 text-primary-foreground cursor-pointer px-4 flex items-center gap-1"
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