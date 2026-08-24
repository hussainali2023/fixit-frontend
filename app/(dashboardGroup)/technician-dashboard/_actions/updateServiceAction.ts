/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { isAccessTokenExist } from "@/service/refreshToken";

const getBackendUrl = () =>
  process.env.BACKEND_API_URL ||
  process.env.NEXT_PUBLIC_BACKEND_API_URL ||
  "http://localhost:5000";

export const updateServiceAction = async (serviceId: string, payload: any) => {
  try {
    const accessToken = await isAccessTokenExist();

    if (!accessToken) {
      return {
        success: false,
        message: "User not logged in!",
      };
    }

    const cleanPayload: any = {};
    if (payload.name || payload.title) cleanPayload.name = payload.name || payload.title;
    if (payload.description) cleanPayload.description = payload.description;
    if (payload.price) cleanPayload.price = Number(payload.price);
    if (payload.category) cleanPayload.category = payload.category;

    const res = await fetch(`${getBackendUrl()}/api/services/${serviceId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cleanPayload),
    });

    const result = await res.json();
    return result;
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to update service",
    };
  }
};
