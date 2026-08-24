/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { cookies } from "next/headers";

const getBaseUrl = () => {
  const url =
    process.env.BACKEND_API_URL ||
    process.env.NEXT_PUBLIC_BACKEND_API_URL ||
    "http://localhost:5000";
  return url.replace(/\/$/, "");
};

async function getToken(): Promise<string | null> {
  try {
    const cookieStore = await cookies();
    return cookieStore.get("accessToken")?.value ?? null;
  } catch {
    return null;
  }
}

export async function apiFetch<T = any>(
  path: string,
  options: RequestInit & { auth?: boolean } = {}
): Promise<{
  success: boolean;
  data?: T;
  message?: string;
  statusCode?: number;
  meta?: any;
}> {
  const { auth = false, headers = {}, ...rest } = options;

  const reqHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    ...(headers as Record<string, string>),
  };

  if (auth) {
    const token = await getToken();
    if (!token) {
      return {
        success: false,
        message: "Not authenticated. Please login.",
        statusCode: 401,
      };
    }
    reqHeaders["Authorization"] = `Bearer ${token}`;
  }

  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  const fullUrl = `${getBaseUrl()}${cleanPath}`;

  try {
    const res = await fetch(fullUrl, {
      ...rest,
      headers: reqHeaders,
    });

    const json = await res
      .json()
      .catch(() => ({ success: false, message: "Invalid JSON response" }));

    if (!res.ok) {
      return {
        success: false,
        message: json?.message || `Request failed with status ${res.status}`,
        statusCode: res.status,
        data: json?.data,
      };
    }

    return {
      success: true,
      message: json?.message || "Operation successful",
      statusCode: res.status,
      data: json?.data !== undefined ? json.data : json,
    };
  } catch (err: any) {
    // Re-throw Next.js navigation errors (like redirect())
    if (err?.message === "NEXT_REDIRECT" || err?.digest?.startsWith("NEXT_REDIRECT")) {
      throw err;
    }
    return {
      success: false,
      message: err?.message || "Network error. Unable to reach backend server.",
      statusCode: 500,
    };
  }
}
