/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { jwtUtils } from "@/utils/jwt";
import { cookies } from "next/headers";

export const getNewAccessToken = async () => {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value || null;

  if (!refreshToken) {
    return {
      success: false,
      message: "Refresh token not found!",
    };
  }

  try {
    const backendUrl =
      process.env.BACKEND_API_URL ||
      process.env.NEXT_PUBLIC_BACKEND_API_URL ||
      "http://localhost:5000";

    const res = await fetch(`${backendUrl}/api/auth/refresh-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }),
      cache: "no-cache",
    });

    if (!res.ok) {
      return { success: false, message: "Token refresh failed" };
    }

    const result = await res.json();
    return result;
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

export const isAccessTokenExist = async () => {
  try {
    const cookieStore = await cookies();
    let accessToken = cookieStore.get("accessToken")?.value || null;
    const refreshToken = cookieStore.get("refreshToken")?.value || null;

    if (!accessToken && !refreshToken) {
      return null;
    }

    const decodedAccessToken = accessToken
      ? jwtUtils.verifyToken(
          accessToken,
          (process.env.JWT_ACCESS_SECRET || process.env.JWT_SECRET || "") as string,
        )
      : null;

    const decodedRefreshToken = refreshToken
      ? jwtUtils.verifyToken(
          refreshToken,
          (process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET || "") as string,
        )
      : null;

    if (!decodedAccessToken?.success && decodedRefreshToken?.success) {
      const result = await getNewAccessToken();

      if (result?.success && result?.data?.accessToken) {
        const newAccessToken = result.data.accessToken;

        cookieStore.set("accessToken", newAccessToken, {
          httpOnly: true,
          maxAge: 60 * 60 * 24,
          sameSite: "lax",
        });

        accessToken = newAccessToken;
      }
    }

    return accessToken;
  } catch (error: any) {
    return null;
  }
};
