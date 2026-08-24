/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Wrench, LogOut, User, ChevronDown, ChevronUp } from "lucide-react";
import type { ISidebarItem } from "@/lib/types";
import {
  CUSTOMER_SIDEBAR_ITEMS,
  TECHNICIAN_SIDEBAR_ITEMS,
  ADMIN_SIDEBAR_ITEMS,
} from "../_config/sidebarItems";
import { logoutAction } from "@/app/(authGroup)/_actions/authActions";
import { toast } from "sonner";

interface SidebarProps {
  user: any;
}

export default function DashboardSidebar({ user }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [profileOpen, setProfileOpen] = useState(false);

  const userInfo = user?.data?.user || user?.data?.result || user?.data || null;
  const userRole = userInfo?.role || "CUSTOMER";
  const userName = userInfo?.name || "User";
  const userEmail = userInfo?.email || "";

  let navItems: ISidebarItem[] = CUSTOMER_SIDEBAR_ITEMS;
  if (userRole === "TECHNICIAN") navItems = TECHNICIAN_SIDEBAR_ITEMS;
  else if (userRole === "ADMIN") navItems = ADMIN_SIDEBAR_ITEMS;

  const handleLogout = async () => {
    await logoutAction();
    toast.success("Logged out successfully");
    router.push("/login");
    router.refresh();
  };

  return (
    <Sidebar
      collapsible="icon"
      className="h-screen border-r border-sidebar-border"
      style={{ background: "var(--sidebar)" }}
    >
      {/* Header */}
      <SidebarHeader className="border-b border-sidebar-border p-4 flex flex-row items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shadow-md shrink-0 group-hover:scale-105 transition-transform">
            <Wrench className="w-4 h-4" />
          </div>
          <span
            className="font-bold text-lg text-sidebar-primary group-data-[collapsible=icon]:hidden"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            FixItNow
          </span>
        </Link>
        <SidebarTrigger className="text-sidebar-foreground/60 hover:text-sidebar-foreground cursor-pointer" />
      </SidebarHeader>

      {/* Role Badge */}
      <div className="px-4 py-3 group-data-[collapsible=icon]:hidden border-b border-sidebar-border/50">
        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-sidebar-primary/20 text-sidebar-primary border border-sidebar-primary/30">
          <div className="w-1.5 h-1.5 rounded-full bg-sidebar-primary animate-pulse" />
          {userRole} Panel
        </span>
      </div>

      {/* Nav Items */}
      <SidebarContent className="p-2 mt-1">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-0.5">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/dashboard" &&
                    item.href !== "/technician-dashboard" &&
                    item.href !== "/admin-dashboard" &&
                    pathname.startsWith(item.href));

                return (
                  <SidebarMenuItem key={item.href + item.label}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={item.label}
                      className={`rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150 ${
                        isActive
                          ? "bg-sidebar-primary text-sidebar-primary-foreground font-bold shadow-sm"
                          : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
                      }`}
                    >
                      <Link href={item.href} className="flex items-center gap-3">
                        <Icon className="w-4 h-4 shrink-0" />
                        <span className="group-data-[collapsible=icon]:hidden truncate">
                          {item.label}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer: User profile + Logout */}
      <SidebarFooter className="p-3 border-t border-sidebar-border">
        <div className="group-data-[collapsible=icon]:hidden">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-sidebar-accent transition-all cursor-pointer"
          >
            <div className="w-8 h-8 rounded-xl bg-sidebar-primary/20 text-sidebar-primary flex items-center justify-center font-bold text-sm shrink-0">
              {userName[0]?.toUpperCase() || <User className="w-4 h-4" />}
            </div>
            <div className="flex-1 min-w-0 text-left">
              <p className="text-xs font-bold text-sidebar-foreground truncate">{userName}</p>
              <p className="text-[11px] text-sidebar-foreground/50 truncate">{userEmail}</p>
            </div>
            {profileOpen ? (
              <ChevronUp className="w-3.5 h-3.5 text-sidebar-foreground/40 shrink-0" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5 text-sidebar-foreground/40 shrink-0" />
            )}
          </button>

          {profileOpen && (
            <div className="mt-1 mx-1 rounded-xl overflow-hidden border border-sidebar-border">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2.5 px-3 py-2.5 text-sm text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>

        {/* Collapsed view: just logout icon */}
        <div className="hidden group-data-[collapsible=icon]:flex justify-center">
          <button
            onClick={handleLogout}
            className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-red-500/10 text-red-400 transition-colors cursor-pointer"
            title="Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}