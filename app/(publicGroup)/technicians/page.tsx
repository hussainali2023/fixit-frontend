/* eslint-disable @typescript-eslint/no-explicit-any */
import { getTechniciansAction } from "@/lib/actions/technicianActions";
import Link from "next/link";
import { User, MapPin, Briefcase, Star, Search, Wrench, ArrowRight } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function TechniciansPage() {
  const res = await getTechniciansAction();
  const technicians = res?.data?.technicians || res?.data || [];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="hero-bg border-b border-border py-12 px-4">
        <div className="max-w-5xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-primary bg-primary/10 px-3.5 py-1.5 rounded-full border border-primary/20">
            <User className="w-3.5 h-3.5" /> Expert Professionals
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
            Our Verified <span className="gradient-text">Technicians</span>
          </h1>
          <p className="text-muted-foreground text-sm max-w-xl mx-auto">
            Find and hire the best professionals for your home maintenance needs.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {technicians.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {technicians.map((tech: any) => {
              const techUser = tech.user;
              return (
                <Link key={tech.id} href={`/technicians/${tech.id}`} className="group block">
                  <div className="premium-card rounded-2xl overflow-hidden p-5 flex flex-col h-full space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center text-2xl font-black shrink-0 group-hover:scale-105 transition-transform duration-300">
                        {techUser?.name?.[0]?.toUpperCase() || <User className="w-8 h-8" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-foreground text-lg truncate group-hover:text-primary transition-colors">
                          {techUser?.name || "Technician"}
                        </h3>
                        <div className="flex items-center gap-1 text-xs text-amber-600 font-bold mt-1">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          5.0 <span className="text-muted-foreground font-medium ml-1">({tech.reviews?.length || 0} reviews)</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 flex-1">
                      {tech.skills && (
                        <div className="flex items-start gap-2 text-sm text-muted-foreground">
                          <Wrench className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          <span className="line-clamp-2">{tech.skills}</span>
                        </div>
                      )}
                      {tech.location && (
                        <div className="flex items-start gap-2 text-sm text-muted-foreground">
                          <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{tech.location}</span>
                        </div>
                      )}
                      {tech.experience && (
                        <div className="flex items-start gap-2 text-sm text-muted-foreground">
                          <Briefcase className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          <span>{tech.experience} year{tech.experience !== 1 ? "s" : ""} exp.</span>
                        </div>
                      )}
                    </div>

                    <div className="pt-4 border-t border-border mt-auto flex items-center justify-between">
                      <p className="text-xs font-bold text-muted-foreground">
                        {tech.services?.length || 0} Services
                      </p>
                      <span className="text-xs font-bold text-primary group-hover:underline">
                        View Profile →
                      </span>
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
            <p className="text-sm text-muted-foreground mt-1">Check back later for newly joined professionals.</p>
          </div>
        )}
      </div>
    </div>
  );
}