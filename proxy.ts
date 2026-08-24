import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const AUTH_ROUTES = ["/login", "/register"];
const PUBLIC_ROUTES = ["/", "/services", "/technicians", "/about", "/contact", "/payment"];

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const accessToken = request.cookies.get("accessToken")?.value;

  let userRole: string | null = null;
  if (accessToken) {
    try {
      const decoded = jwt.decode(accessToken) as any;
      if (decoded && decoded.role) {
        userRole = decoded.role;
      }
    } catch {
      // Ignore token decode errors in middleware
    }
  }

  const isPublicRoute = PUBLIC_ROUTES.some(
    (route) => pathname === route || (route !== "/" && pathname.startsWith(route + "/"))
  );
  const isAuthRoute = AUTH_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );

  // If not logged in & trying to access protected dashboard -> redirect to login
  if (!accessToken && !isPublicRoute && !isAuthRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If logged in & trying to access login/register -> redirect to appropriate dashboard
  if (accessToken && isAuthRoute) {
    if (userRole === "TECHNICIAN") {
      return NextResponse.redirect(new URL("/technician-dashboard", request.url));
    }
    if (userRole === "ADMIN") {
      return NextResponse.redirect(new URL("/admin-dashboard", request.url));
    }
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Role authorization checks
  if (pathname.startsWith("/dashboard") && userRole && userRole !== "CUSTOMER") {
    if (userRole === "TECHNICIAN") return NextResponse.redirect(new URL("/technician-dashboard", request.url));
    if (userRole === "ADMIN") return NextResponse.redirect(new URL("/admin-dashboard", request.url));
  } else if (pathname.startsWith("/technician-dashboard") && userRole && userRole !== "TECHNICIAN") {
    if (userRole === "CUSTOMER") return NextResponse.redirect(new URL("/dashboard", request.url));
    if (userRole === "ADMIN") return NextResponse.redirect(new URL("/admin-dashboard", request.url));
  } else if (pathname.startsWith("/admin-dashboard") && userRole && userRole !== "ADMIN") {
    if (userRole === "CUSTOMER") return NextResponse.redirect(new URL("/dashboard", request.url));
    if (userRole === "TECHNICIAN") return NextResponse.redirect(new URL("/technician-dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|favicon.ico|_next/image|.*\\.png$).*)"],
};
