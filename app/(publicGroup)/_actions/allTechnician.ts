const getBackendUrl = () =>
  process.env.BACKEND_API_URL ||
  process.env.NEXT_PUBLIC_BACKEND_API_URL ||
  "http://localhost:5000";

export const getAllTechnician = async (query?: {
  searchTerm?: string;
  location?: string;
  maxPrice?: string;
  page?: number;
  limit?: number;
}) => {
  try {
    const res = await fetch(`${getBackendUrl()}/api/technicians`, {
      headers: {
        "content-type": "application/json",
      },
      next: {
        revalidate: 10,
        tags: ["all-technician"],
      },
    });

    if (!res.ok) {
      return { success: false, data: { technicians: [] } };
    }
    return await res.json();
  } catch (error) {
    console.error("Fetch technician error:", error);
    return { success: false, data: { technicians: [] } };
  }
};