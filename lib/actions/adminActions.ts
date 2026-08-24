/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { apiFetch } from "@/lib/api";

// GET /api/users (admin: /api/admin/users maps to same router)
export async function getUsersAction() {
  return apiFetch("/api/users", { auth: true, cache: "no-store" });
}

// PATCH /api/users/:id — body: { isBanned: boolean }
export async function updateUserStatusAction(userId: string, isBanned: boolean) {
  return apiFetch(`/api/users/${userId}`, {
    method: "PATCH",
    auth: true,
    body: JSON.stringify({ isBanned }),
    cache: "no-store",
  });
}

// GET /api/admin/bookings (maps to same bookingRouter)
export async function getAdminBookingsAction() {
  return apiFetch("/api/admin/bookings", { auth: true, cache: "no-store" });
}
