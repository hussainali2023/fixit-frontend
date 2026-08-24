/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Wrench,
  Menu,
  X,
  LogOut,
  LayoutDashboard,
  User,
  ChevronDown,
} from "lucide-react";
import { logoutAction } from "@/app/(authGroup)/_actions/authActions";
import { toast } from "sonner";

interface NavbarProps {
  user: any;
}

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Technicians", href: "/technicians" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Navbar({ user }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const userInfo = user?.data?.user || user?.data?.result || user?.data || null;
  const isLoggedIn = !!userInfo;
  const role = userInfo?.role;

  const dashboardHref =
    role === "TECHNICIAN"
      ? "/technician-dashboard"
      : role === "ADMIN"
        ? "/admin-dashboard"
        : "/dashboard";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setDropdownOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    await logoutAction();
    toast.success("Logged out successfully");
    router.push("/login");
    router.refresh();
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-xl border-b border-border shadow-sm"
          : "bg-background/80 backdrop-blur-md border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-9 h-9 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <Wrench className="w-4.5 h-4.5" />
            </div>
            <span
              className="text-xl font-bold"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              <span className="text-primary">FixIt</span>
              <span className="text-foreground">Now</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right: Auth + User */}
          <div className="flex items-center gap-3">
            {isLoggedIn ? (
              <div className="relative hidden md:block">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl border border-border bg-card hover:bg-muted transition-all text-sm font-semibold text-foreground cursor-pointer"
                >
                  <div className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                    {userInfo?.name?.[0]?.toUpperCase() || <User className="w-3.5 h-3.5" />}
                  </div>
                  <span className="max-w-[100px] truncate">{userInfo?.name}</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-card border border-border rounded-2xl shadow-xl py-2 z-50 animate-fade-in">
                    <div className="px-4 py-2 border-b border-border mb-1">
                      <p className="text-xs font-bold text-foreground truncate">{userInfo?.name}</p>
                      <p className="text-[11px] text-muted-foreground truncate">{userInfo?.email}</p>
                      <span className="inline-block mt-1 text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                        {role}
                      </span>
                    </div>
                    <Link
                      href={dashboardHref}
                      className="flex items-center gap-2.5 px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                    >
                      <LayoutDashboard className="w-4 h-4 text-primary" />
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Link
                  href="/login"
                  className="px-4 py-2 rounded-xl text-sm font-semibold text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
                >
                  Log In
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 rounded-xl text-sm font-bold bg-primary text-primary-foreground hover:bg-primary/90 shadow-md transition-all hover:scale-[1.02]"
                >
                  Get Started
                </Link>
              </div>
            )}

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-xl border border-border bg-card cursor-pointer"
            >
              {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background/98 backdrop-blur-xl px-4 py-4 space-y-1 animate-fade-in">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                pathname === link.href
                  ? "bg-primary/10 text-primary font-bold"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}

          <div className="pt-2 border-t border-border mt-2">
            {isLoggedIn ? (
              <>
                <div className="px-4 py-2 mb-1">
                  <p className="text-sm font-bold text-foreground">{userInfo?.name}</p>
                  <p className="text-xs text-muted-foreground">{userInfo?.email}</p>
                </div>
                <Link
                  href={dashboardHref}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium text-foreground hover:bg-muted"
                >
                  <LayoutDashboard className="w-4 h-4 text-primary" /> Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium text-destructive hover:bg-destructive/10"
                >
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-2">
                <Link href="/login" className="block px-4 py-3 rounded-xl text-sm font-semibold text-center border border-border">
                  Log In
                </Link>
                <Link href="/register" className="block px-4 py-3 rounded-xl text-sm font-bold text-center bg-primary text-primary-foreground">
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}