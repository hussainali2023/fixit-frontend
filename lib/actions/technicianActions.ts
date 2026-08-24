/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { apiFetch } from "@/lib/api";
import { revalidatePath } from "next/cache";

// GET /api/technicians — public
export async function getTechniciansAction() {
  return apiFetch("/api/technicians", { next: { revalidate: 30, tags: ["technicians"] } });
}

// GET /api/technicians/:id — public (includes services, bookings with reviews)
export async function getTechnicianAction(id: string) {
  return apiFetch(`/api/technicians/${id}`, { cache: "no-store" });
}

// PUT /api/technicians/profile — TECHNICIAN only
// Body: { skills?, experience?, location?, availability? }
export async function updateTechnicianProfileAction(prevState: any, formData: FormData) {
  const payload: Record<string, any> = {};
  if (formData.get("skills")) payload.skills = formData.get("skills");
  if (formData.get("experience")) payload.experience = Number(formData.get("experience"));
  if (formData.get("location")) payload.location = formData.get("location");
  if (formData.get("availability")) payload.availability = formData.get("availability");

  const res = await apiFetch("/api/technicians/profile", {
    method: "PUT",
    auth: true,
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  if (res.success) {
    revalidatePath("/technician-dashboard/profile");
    revalidatePath("/technicians");
  }

  return res;
}

// PUT /api/technicians/availability — TECHNICIAN only
// Body: { availability: string }
export async function updateAvailabilityAction(prevState: any, formData: FormData) {
  const availability = formData.get("availability") as string;
  const res = await apiFetch("/api/technicians/availability", {
    method: "PUT",
    auth: true,
    body: JSON.stringify({ availability }),
    cache: "no-store",
  });

  if (res.success) {
    revalidatePath("/technician-dashboard/availability");
    revalidatePath("/technicians");
  }

  return res;
}
