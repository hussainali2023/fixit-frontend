/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import type { CreateBooking } from "@/lib/types";
import { isAccessTokenExist } from "@/service/refreshToken";

const getBackendUrl = () =>
  process.env.BACKEND_API_URL ||
  process.env.NEXT_PUBLIC_BACKEND_API_URL ||
  "http://localhost:5000";

export const BookingAction = async (
  prevState: any,
  formData: FormData,
) => {
  const dateVal = formData.get("bookingDate") || formData.get("scheduledDate");
  const payload = {
    serviceId: formData.get("serviceId"),
    scheduledDate: dateVal ? new Date(String(dateVal)).toISOString() : new Date().toISOString(),
  };

  try {
    const accessToken = await isAccessTokenExist();

    if (!accessToken) {
      return {
        success: false,
        message: "User not logged in!",
      };
    }

    const res = await fetch(`${getBackendUrl()}/api/bookings`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await res.json();
    return result;
  } catch (error: any) {
    if (error.message === "NEXT_REDIRECT") throw error;

    return {
      success: false,
      statusCode: 500,
      message: error.message || "Booking failed",
    };
  }
};
