/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { apiFetch } from "@/lib/api";
import { revalidatePath } from "next/cache";

// GET /api/services — public, with optional filters
export async function getServicesAction(query?: {
  search?: string;
  category?: string;
  location?: string;
}) {
  const params = new URLSearchParams();
  if (query?.search) params.set("search", query.search);
  if (query?.category) params.set("category", query.category);
  if (query?.location) params.set("location", query.location);
  const qs = params.toString() ? `?${params}` : "";

  return apiFetch(`/api/services${qs}`, {
    next: { revalidate: 30, tags: ["services"] },
  });
}

// GET /api/services/:id — public
export async function getServiceAction(id: string) {
  return apiFetch(`/api/services/${id}`, { cache: "no-store" });
}

// POST /api/services — TECHNICIAN only
export async function createServiceAction(prevState: any, formData: FormData) {
  const payload = {
    name: formData.get("name"),
    description: formData.get("description"),
    price: Number(formData.get("price")),
    category: formData.get("category") || "General",
  };
  const res = await apiFetch("/api/services", {
    method: "POST",
    auth: true,
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  if (res.success) {
    revalidatePath("/technician-dashboard/my-services");
    revalidatePath("/services");
  }

  return res;
}

// PATCH /api/services/:id — TECHNICIAN only
export async function updateServiceAction(
  id: string,
  payload: { name?: string; description?: string; price?: number; category?: string }
) {
  const res = await apiFetch(`/api/services/${id}`, {
    method: "PATCH",
    auth: true,
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  if (res.success) {
    revalidatePath("/technician-dashboard/my-services");
    revalidatePath("/services");
  }

  return res;
}

// DELETE /api/services/:id — TECHNICIAN only
export async function deleteServiceAction(id: string) {
  const res = await apiFetch(`/api/services/${id}`, {
    method: "DELETE",
    auth: true,
    cache: "no-store",
  });

  if (res.success) {
    revalidatePath("/technician-dashboard/my-services");
    revalidatePath("/services");
  }

  return res;
}
