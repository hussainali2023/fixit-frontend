/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { apiFetch } from "@/lib/api";
import { cookies } from "next/headers";

// POST /api/auth/register — body: { name, email, password, role }
export async function RegisterAction(prevState: any, data: any) {
  // Accept both FormData and plain object (from react-hook-form via startTransition)
  const payload = data instanceof FormData
    ? {
        name: data.get("name"),
        email: data.get("email"),
        password: data.get("password"),
        role: data.get("role") === "TECHNICIAN" ? "TECHNICIAN" : "CUSTOMER",
      }
    : {
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role === "TECHNICIAN" ? "TECHNICIAN" : "CUSTOMER",
      };

  return apiFetch("/api/auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
    cache: "no-store",
  });
}

// POST /api/auth/login — stores cookies, returns user + tokens
export async function LoginAction(prevState: any, data: any) {
  const payload = data instanceof FormData
    ? { email: data.get("email"), password: data.get("password") }
    : { email: data.email, password: data.password };

  const result = await apiFetch<{ user: any; accessToken: string; refreshToken: string }>(
    "/api/auth/login",
    { method: "POST", body: JSON.stringify(payload), cache: "no-store" }
  );

  if (result.success && result.data) {
    const cookieStore = await cookies();
    const { accessToken, refreshToken, user } = result.data;

    if (accessToken) {
      cookieStore.set("accessToken", accessToken, {
        httpOnly: true,
        sameSite: "lax",
        maxAge: 60 * 60 * 24,
        path: "/",
      });
    }
    if (refreshToken) {
      cookieStore.set("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      });
    }
    if (user?.role) {
      cookieStore.set("userRole", user.role, {
        httpOnly: false,
        sameSite: "lax",
        maxAge: 60 * 60 * 24,
        path: "/",
      });
    }
  }

  return result;
}

// Logout — clears all auth cookies
export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");
  cookieStore.delete("userRole");
  return { success: true };
}

// GET /api/users/me
export async function getMeAction() {
  return apiFetch("/api/users/me", { auth: true, cache: "no-store" });
}

// Aliases
export const registerAction = RegisterAction;
export const loginAction = LoginAction;