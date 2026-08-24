const getBackendUrl = () =>
  process.env.BACKEND_API_URL ||
  process.env.NEXT_PUBLIC_BACKEND_API_URL ||
  "http://localhost:5000";

export const getAllServices = async (query?: {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  location?: string;
}) => {
  try {
    const params = new URLSearchParams();
    if (query?.page) params.append("page", query.page.toString());
    if (query?.limit) params.append("limit", query.limit.toString());
    if (query?.search) params.append("search", query.search);
    if (query?.category) params.append("category", query.category);
    if (query?.location) params.append("location", query.location);

    const queryString = params.toString() ? `?${params.toString()}` : "";
    const res = await fetch(`${getBackendUrl()}/api/services${queryString}`, {
      headers: {
        "content-type": "application/json",
      },
      next: {
        revalidate: 10,
        tags: ["all-services"],
      },
    });

    if (!res.ok) {
      return { success: false, data: { services: [] } };
    }
    return await res.json();
  } catch (error) {
    console.error("Fetch services error:", error);
    return { success: false, data: { services: [] } };
  }
};

export const getAllCategories = async () => {
  try {
    const res = await fetch(`${getBackendUrl()}/api/services`, {
      headers: {
        "content-type": "application/json",
      },
      next: {
        revalidate: 60,
        tags: ["all-categories"],
      },
    });

    if (!res.ok) {
      return { success: false, data: [] };
    }
    const result = await res.json();
    // Extract unique categories from services if no separate category endpoint
    const services = result.data?.services || result.data || [];
    const categories = Array.from(
      new Set(services.map((s: any) => s.category).filter(Boolean)),
    ).map((catName: any, idx: number) => ({
      id: String(idx + 1),
      name: catName,
    }));

    return { success: true, data: categories };
  } catch (error) {
    console.error("Fetch categories error:", error);
    return { success: false, data: [] };
  }
};

export const getAllTechnician = async () => {
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
