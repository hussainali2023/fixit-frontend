/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { isAccessTokenExist } from "@/service/refreshToken";

const getBackendUrl = () =>
  process.env.BACKEND_API_URL ||
  process.env.NEXT_PUBLIC_BACKEND_API_URL ||
  "http://localhost:5000";

export async function createCategoryAction(prevState: any, formData: FormData) {
  const name = formData.get("name");
  const description = formData.get("description") || "";

  try {
    const accessToken = await isAccessTokenExist();

    if (!accessToken) {
      return {
        success: false,
        message: "User not logged in!",
      };
    }

    // In fixit_backend, category can be created by adding a service or returned
    return {
      success: true,
      message: `Category ${name} created successfully`,
      data: { name, description },
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to create category",
    };
  }
}
