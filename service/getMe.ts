/* eslint-disable @typescript-eslint/no-explicit-any */
import { cookies } from "next/headers";

const getMe = async () => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return null;
    }

    const backendUrl = (
      process.env.BACKEND_API_URL ||
      process.env.NEXT_PUBLIC_BACKEND_API_URL ||
      "http://localhost:5000"
    ).replace(/\/$/, "");

    const res = await fetch(`${backendUrl}/api/users/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      return null;
    }

    const result = await res.json();
    return result;
  } catch {
    return null;
  }
};

export default getMe;
