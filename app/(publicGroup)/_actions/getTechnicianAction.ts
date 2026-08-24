/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

const getBackendUrl = () =>
  process.env.BACKEND_API_URL ||
  process.env.NEXT_PUBLIC_BACKEND_API_URL ||
  "http://localhost:5000";

export const getSingleTechnicianAction = async (technicianId: string) => {
  try {
    const res = await fetch(`${getBackendUrl()}/api/technicians/${technicianId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    const result = await res.json();
    return result;
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to fetch technician details",
      data: null,
    };
  }
};