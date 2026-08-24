/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { apiFetch } from "@/lib/api";
import { revalidatePath } from "next/cache";

// POST /api/bookings — CUSTOMER only
// Body: { serviceId: uuid, scheduledDate: ISO date string }
export async function createBookingAction(prevState: any, formData: FormData) {
  const serviceId = formData.get("serviceId") as string;
  const dateStr = formData.get("scheduledDate") || formData.get("bookingDate");

  if (!serviceId || !dateStr) {
    return { success: false, message: "Service and date are required." };
  }

  const scheduledDate = new Date(String(dateStr)).toISOString();

  const res = await apiFetch("/api/bookings", {
    method: "POST",
    auth: true,
    body: JSON.stringify({ serviceId, scheduledDate }),
    cache: "no-store",
  });

  if (res.success) {
    revalidatePath("/dashboard/my-booking");
    revalidatePath("/dashboard");
    revalidatePath("/technician-dashboard");
    revalidatePath("/admin-dashboard/bookings");
  }

  return res;
}

// GET /api/bookings/my — CUSTOMER only
export async function getMyBookingsAction() {
  return apiFetch("/api/bookings/my", { auth: true, cache: "no-store" });
}

// GET /api/bookings — ADMIN or TECHNICIAN (with fallback for Vercel 403 restriction)
export async function getAllBookingsAction() {
  const res = await apiFetch("/api/bookings", { auth: true, cache: "no-store" });
  if (res.success && res.data?.bookings) return res;

  // Fallback for TECHNICIAN role if /api/bookings returns 403 on Vercel deployment
  try {
    const meRes = await apiFetch("/api/users/me", { auth: true, cache: "no-store" });
    const user = meRes?.data?.user;
    const techId = user?.technicianProfile?.id;

    if (techId) {
      const techRes = await apiFetch(`/api/technicians/${techId}`, { cache: "no-store" });
      const tech = techRes?.data?.technician;
      if (tech) {
        const servicesMap = new Map((tech.services || []).map((s: any) => [s.id, s]));
        const bookings = (tech.bookings || []).map((b: any) => ({
          ...b,
          service: b.service || servicesMap.get(b.serviceId) || null,
          technician: tech,
        }));
        return { success: true, data: { bookings } };
      }
    }
  } catch {
    // If fallback fails, return original response
  }

  return res;
}

// GET /api/bookings/:id — any authenticated user
export async function getBookingAction(id: string) {
  return apiFetch(`/api/bookings/${id}`, { auth: true, cache: "no-store" });
}

// PATCH /api/bookings/status/:id
// Allowed statuses: ACCEPTED, DECLINED, IN_PROGRESS, COMPLETED, CANCELLED
export async function updateBookingStatusAction(id: string, status: string) {
  const res = await apiFetch(`/api/bookings/status/${id}`, {
    method: "PATCH",
    auth: true,
    body: JSON.stringify({ status }),
    cache: "no-store",
  });

  if (res.success) {
    revalidatePath("/dashboard/my-booking");
    revalidatePath("/dashboard");
    revalidatePath("/technician-dashboard");
    revalidatePath("/admin-dashboard/bookings");
  }

  return res;
}
