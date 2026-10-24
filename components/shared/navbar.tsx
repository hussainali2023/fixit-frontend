/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
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
import { ModeToggle } from "./Mode";

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
  const userPhoto = userInfo?.image || userInfo?.technicianProfile?.profilePhoto;

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
      className={`sticky top-0 z-50 w-full transition-all duration-500 ${
        scrolled
          ? "bg-background/80 backdrop-blur-2xl border-b border-border/60 shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
          : "bg-background/50 backdrop-blur-lg border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-teal-400 text-primary-foreground flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:scale-105 transition-all duration-300">
              <Wrench className="w-4.5 h-4.5" />
            </div>
            <span
              className="text-xl font-bold tracking-tight"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              <span className="text-primary">FixIt</span>
              <span className="text-foreground">Now</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-0.5">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-2 rounded-lg text-[13px] font-semibold transition-all duration-200 ${
                    isActive
                      ? "text-primary bg-primary/8"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right: Theme + Auth + User */}
          <div className="flex items-center gap-2">
            <ModeToggle />

            {isLoggedIn ? (
              <div className="relative hidden md:block">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-border/70 bg-card/60 backdrop-blur-sm hover:bg-muted/60 transition-all text-sm font-semibold text-foreground cursor-pointer"
                >
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 text-primary flex items-center justify-center font-bold text-xs relative overflow-hidden border border-border/50">
                    {userPhoto ? (
                      <Image
                        unoptimized
                        src={userPhoto}
                        alt={userInfo?.name || "User"}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      userInfo?.name?.[0]?.toUpperCase() || <User className="w-3.5 h-3.5" />
                    )}
                  </div>
                  <span className="max-w-[100px] truncate">{userInfo?.name}</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-muted-foreground transition-transform duration-300 ${dropdownOpen ? "rotate-180" : ""}`} />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-card/95 backdrop-blur-2xl border border-border/60 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] py-2 z-50 animate-fade-in">
                    <div className="px-4 py-2.5 border-b border-border/50 mb-1">
                      <p className="text-xs font-bold text-foreground truncate">{userInfo?.name}</p>
                      <p className="text-[11px] text-muted-foreground truncate mt-0.5">{userInfo?.email}</p>
                      <span className="inline-block mt-1.5 text-[10px] font-bold uppercase px-2 py-0.5 rounded-md bg-primary/10 text-primary tracking-wider">
                        {role}
                      </span>
                    </div>
                    <Link
                      href={dashboardHref}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-foreground hover:bg-muted/50 transition-colors rounded-lg mx-1"
                    >
                      <LayoutDashboard className="w-4 h-4 text-primary" />
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-destructive hover:bg-destructive/8 transition-colors rounded-lg mx-1"
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
                  className="px-4 py-2 rounded-lg text-sm font-semibold text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-all"
                >
                  Log In
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 rounded-xl text-sm font-bold bg-gradient-to-r from-primary to-teal-500 text-primary-foreground shadow-md hover:shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  Get Started
                </Link>
              </div>
            )}

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-xl border border-border/60 bg-card/60 backdrop-blur-sm cursor-pointer hover:bg-muted/50 transition-colors"
            >
              {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-2xl px-4 py-4 space-y-1 animate-fade-in">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                pathname === link.href
                  ? "bg-primary/8 text-primary font-bold"
                  : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}

          <div className="pt-2 border-t border-border/50 mt-2">
            {isLoggedIn ? (
              <>
                <div className="px-4 py-2 mb-1 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 text-primary flex items-center justify-center font-bold text-sm relative overflow-hidden border border-border/50 shrink-0">
                    {userPhoto ? (
                      <Image
                        unoptimized
                        src={userPhoto}
                        alt={userInfo?.name || "User"}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      userInfo?.name?.[0]?.toUpperCase() || <User className="w-4 h-4" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-foreground truncate">{userInfo?.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{userInfo?.email}</p>
                  </div>
                </div>
                <Link
                  href={dashboardHref}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium text-foreground hover:bg-muted/50"
                >
                  <LayoutDashboard className="w-4 h-4 text-primary" /> Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium text-destructive hover:bg-destructive/8"
                >
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-2">
                <Link href="/login" className="block px-4 py-3 rounded-xl text-sm font-semibold text-center border border-border/60">
                  Log In
                </Link>
                <Link href="/register" className="block px-4 py-3 rounded-xl text-sm font-bold text-center bg-gradient-to-r from-primary to-teal-500 text-primary-foreground shadow-md">
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