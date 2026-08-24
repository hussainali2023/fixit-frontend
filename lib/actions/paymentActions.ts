/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { apiFetch } from "@/lib/api";
import { redirect } from "next/navigation";

// POST /api/payments/checkout/:bookingId — CUSTOMER only
// Returns { checkoutUrl: string } → redirect to Stripe
export async function checkoutAction(bookingId: string) {
  const result = await apiFetch(`/api/payments/checkout/${bookingId}`, {
    method: "POST",
    auth: true,
    cache: "no-store",
  });

  if (result.success && result.data?.checkoutUrl) {
    redirect(result.data.checkoutUrl);
  }

  return result;
}

// GET /api/payments/my — CUSTOMER only
export async function getMyPaymentsAction() {
  return apiFetch("/api/payments/my", { auth: true, cache: "no-store" });
}

// GET /api/payments/:id — CUSTOMER or ADMIN
export async function getPaymentAction(id: string) {
  return apiFetch(`/api/payments/${id}`, { auth: true, cache: "no-store" });
}
