/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { Search, MapPin, Filter, SlidersHorizontal, X } from "lucide-react";
import { ServiceCard } from "./ServiceCard";
import type { Category, ServiceItem } from "@/lib/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Pagination } from "@/app/(dashboardGroup)/_components/Pagination";

interface ServiceProps {
  search?: { [key: string]: string | string[] | undefined };
  allServices: ServiceItem[];
  allCategories: Category[];
  meta?: { page: number; totalPage: number };
}

export default function ServicesPage({
  search,
  allServices = [],
  allCategories = [],
  meta = { page: 1, totalPage: 1 },
}: ServiceProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const query = typeof search?.query === "string" ? search.query : "";
  const category =
    typeof search?.category === "string" ? search.category : "All";
  const maxPrice =
    typeof search?.maxPrice === "string" ? search.maxPrice : "All";
  const location =
    typeof search?.location === "string" ? search.location : "All";

  const filteredServices = allServices.filter((serviceItem: any) => {
    const matchesCategory =
      category === "All" || serviceItem?.category?.name === category;

    const matchesQuery =
      !query ||
      serviceItem?.title?.toLowerCase().includes(query.toLowerCase()) ||
      serviceItem?.description?.toLowerCase().includes(query.toLowerCase());

    const matchesPrice =
      maxPrice === "All" || Number(serviceItem?.price) <= Number(maxPrice);

    const matchesLocation =
      location === "All Locations" ||
      location === "All" ||
      !location ||
      serviceItem?.technician?.location
        ?.toLowerCase()
        .includes(location.toLowerCase()) ||
      serviceItem?.location?.toLowerCase().includes(location.toLowerCase());

    return matchesCategory && matchesQuery && matchesPrice && matchesLocation;
  });

  const handleClick = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== "All") {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.set("page", "1");
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-background py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* MAIN CONTENT (SIDEBAR + GRID) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-4">
          {/* LEFT SIDEBAR FILTER PANEL UI */}
          <aside className="lg:col-span-3 bg-card border border-border p-5 rounded-2xl shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h3 className="font-bold text-sm text-foreground flex items-center gap-2">
                <Filter className="w-4 h-4 text-primary" />
                <span>Filters</span>
              </h3>
              <button
                onClick={() => router.replace(pathname)}
                className="text-xs text-destructive hover:underline font-semibold flex items-center gap-1 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" /> Reset
              </button>
            </div>

            {/* Search Input Filter */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">
                Keyword Search
              </label>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
                <input
                  type="text"
                  defaultValue={query}
                  onChange={(e) => handleClick("query", e.target.value)}
                  placeholder="Search wiring, plumbing..."
                  className="w-full bg-background border border-border rounded-xl pl-9 pr-3 py-2 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-foreground">
                Service Category
              </label>
              <div className="space-y-1">
                <button
                  onClick={() => handleClick("category", "All")}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-colors flex items-center justify-between ${category === "All"
                      ? "bg-primary/10 text-primary font-bold border border-primary/20"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground"
                    }`}
                >
                  <span>All Categories</span>
                  {category === "All" && (
                    <span className="w-2 h-2 rounded-full bg-primary" />
                  )}
                </button>

                {allCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleClick("category", cat.name)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-colors flex items-center justify-between ${category === cat.name
                        ? "bg-primary/10 text-primary font-bold border border-primary/20"
                        : "text-muted-foreground hover:bg-accent hover:text-foreground"
                      }`}
                  >
                    <span>{cat.name}</span>
                    {category === cat.name && (
                      <span className="w-2 h-2 rounded-full bg-primary" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Location Selector UI */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">
                Location
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 absolute left-3 top-2.5 text-muted-foreground" />
                <select
                  value={location}
                  onChange={(e) => handleClick("location", e.target.value)}
                  className="w-full bg-background border border-border rounded-xl pl-9 pr-3 py-2 text-xs font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 appearance-none cursor-pointer"
                >
                  <option value="All">All Locations</option>
                  <option value="Dhaka">Dhaka</option>
                  <option value="Gulshan">Gulshan</option>
                  <option value="Banani">Banani</option>
                  <option value="Dhanmondi">Dhanmondi</option>
                </select>
              </div>
            </div>

            {/* Price Filter Options UI */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">
                Max Price Range
              </label>
              <div className="relative">
                <SlidersHorizontal className="w-4 h-4 absolute left-3 top-2.5 text-muted-foreground" />
                <select
                  value={maxPrice}
                  onChange={(e) => handleClick("maxPrice", e.target.value)}
                  className="w-full bg-background border border-border rounded-xl pl-9 pr-3 py-2 text-xs font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 appearance-none cursor-pointer"
                >
                  <option value="All">Any Price</option>
                  <option value="500">Under ₹500</option>
                  <option value="1000">Under ₹1000</option>
                  <option value="2000">Under ₹2000</option>
                </select>
              </div>
            </div>
          </aside>

          {/* RIGHT MAIN DISPLAY SERVICES GRID */}
          <main className="lg:col-span-9 space-y-6">
            <div className="bg-card border border-border p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
              <p className="text-xs font-semibold text-muted-foreground">
                Showing Services in{" "}
                <span className="text-primary font-bold">{category}</span> (
                {filteredServices.length})
              </p>

              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground font-medium">
                  Sort by:
                </span>
                <select className="bg-background border border-border rounded-xl px-3 py-1.5 text-xs font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer">
                  <option>Recommended</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.length > 0 ? (
                filteredServices.map((serviceItem) => (
                  <ServiceCard key={serviceItem.id} service={serviceItem} />
                ))
              ) : (
                <div className="col-span-full text-center py-12 bg-card border border-border rounded-2xl text-xs text-muted-foreground">
                  No services available matching your search criteria.
                </div>
              )}
            </div>
          </main>
        </div>
        <Pagination currentPage={meta?.page || 1} totalPages={meta?.totalPage || 1} />

      </div>
    </div>
  );
}
