/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { apiFetch } from "@/lib/api";

// POST /api/reviews — CUSTOMER only
// Body: { bookingId: uuid, rating: 1-5, comment: string }
export async function createReviewAction(prevState: any, formData: FormData) {
  const payload = {
    bookingId: formData.get("bookingId"),
    rating: Number(formData.get("rating")),
    comment: formData.get("comment"),
  };

  if (!payload.bookingId || !payload.rating || !payload.comment) {
    return { success: false, message: "All fields are required." };
  }

  return apiFetch("/api/reviews", {
    method: "POST",
    auth: true,
    body: JSON.stringify(payload),
    cache: "no-store",
  });
}

// GET /api/reviews — public (query: serviceId?, technicianId?)
export async function getReviewsAction(query?: { serviceId?: string; technicianId?: string }) {
  const params = new URLSearchParams();
  if (query?.serviceId) params.set("serviceId", query.serviceId);
  if (query?.technicianId) params.set("technicianId", query.technicianId);
  const qs = params.toString() ? `?${params}` : "";
  return apiFetch(`/api/reviews${qs}`, { cache: "no-store" });
}
