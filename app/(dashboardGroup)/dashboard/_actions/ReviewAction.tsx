"use server";

import { isAccessTokenExist } from "@/service/refreshToken";

const getBackendUrl = () =>
  process.env.BACKEND_API_URL ||
  process.env.NEXT_PUBLIC_BACKEND_API_URL ||
  "http://localhost:5000";

export const createReviewAction = async (payload: {
  bookingId: string;
  serviceId?: string;
  rating: number;
  comment: string;
}) => {
  const token = await isAccessTokenExist();

  if (!token) {
    return { success: false, message: "Unauthorized. Please login again." };
  }

  try {
    const res = await fetch(`${getBackendUrl()}/api/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        bookingId: payload.bookingId,
        rating: Number(payload.rating),
        comment: payload.comment,
      }),
    });

    const data = await res.json();
    return data;
  } catch (error) {
    return { success: false, message: "Failed to submit review" };
  }
};