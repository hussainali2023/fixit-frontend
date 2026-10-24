/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useTransition } from "react";
import Image from "next/image";
import {
  Users,
  ShieldAlert,
  ShieldCheck,
  Search,
  Loader2,
  Mail,
  User,
  Wrench,
  AlertCircle,
  Calendar,
  CreditCard,
  Layers,
  Database,
  Server,
  Activity,
  CheckCircle2,
  XCircle,
  Clock,
  Trash2,
  ExternalLink,
  RefreshCw,
  Sparkles,
  ArrowUpRight,
  TrendingUp,
  Cpu,
  Lock,
} from "lucide-react";
import { toast } from "sonner";
import { updateUserStatusAction } from "@/lib/actions/adminActions";
import { updateBookingStatusAction } from "@/lib/actions/bookingActions";
import { deleteServiceAction } from "@/lib/actions/serviceActions";

interface AdminDashboardProps {
  initialUsers: any[];
  initialBookings?: any[];
  initialServices?: any[];
}

export default function AdminDashboardConsoleUI({
  initialUsers = [],
  initialBookings = [],
  initialServices = [],
}: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<
    "overview" | "users" | "bookings" | "services" | "backend"
  >("overview");

  // State
  const [users, setUsers] = useState(initialUsers);
  const [bookings, setBookings] = useState(initialBookings);
  const [services, setServices] = useState(initialServices);

  // Filters & Search
  const [userSearch, setUserSearch] = useState("");
  const [userRoleFilter, setUserRoleFilter] = useState("ALL");
  const [bookingSearch, setBookingSearch] = useState("");
  const [bookingStatusFilter, setBookingStatusFilter] = useState("ALL");
  const [serviceSearch, setServiceSearch] = useState("");

  // Transitions
  const [pending, startTransition] = useTransition();
  const [loadingUserId, setLoadingUserId] = useState<string | null>(null);
  const [loadingBookingId, setLoadingBookingId] = useState<string | null>(null);
  const [loadingServiceId, setLoadingServiceId] = useState<string | null>(null);

  // Live Ping State
  const [pingStatus, setPingStatus] = useState<"idle" | "checking" | "online" | "error">("online");
  const [pingLatency, setPingLatency] = useState<number>(142);

  // KPI Calculations
  const totalUsers = users.length;
  const customersCount = users.filter((u) => u.role === "CUSTOMER").length;
  const techniciansCount = users.filter((u) => u.role === "TECHNICIAN").length;
  const adminsCount = users.filter((u) => u.role === "ADMIN").length;
  const bannedCount = users.filter((u) => u.isBanned).length;
  const activeUsersCount = totalUsers - bannedCount;

  const totalBookings = bookings.length;
  const completedBookings = bookings.filter((b) => b.status === "COMPLETED").length;
  const inProgressBookings = bookings.filter((b) =>
    ["ACCEPTED", "PAID", "IN_PROGRESS"].includes(b.status)
  ).length;
  const cancelledBookings = bookings.filter((b) =>
    ["CANCELLED", "DECLINED"].includes(b.status)
  ).length;

  const totalRevenue = bookings
    .filter((b) => b.status === "COMPLETED" || b.status === "PAID")
    .reduce((sum, b) => sum + (b.totalPrice || b.amount || 0), 0);

  // User Actions
  const handleToggleBan = (userId: string, currentBanned: boolean) => {
    setLoadingUserId(userId);
    startTransition(async () => {
      const res = await updateUserStatusAction(userId, !currentBanned);
      setLoadingUserId(null);
      if (res.success) {
        setUsers((prev) =>
          prev.map((u) => (u.id === userId ? { ...u, isBanned: !currentBanned } : u))
        );
        toast.success(!currentBanned ? "User account suspended/banned." : "User unbanned successfully.");
      } else {
        toast.error(res.message || "Failed to update user status.");
      }
    });
  };

  // Booking Actions
  const handleUpdateBookingStatus = (bookingId: string, status: string) => {
    setLoadingBookingId(bookingId);
    startTransition(async () => {
      const res = await updateBookingStatusAction(bookingId, status);
      setLoadingBookingId(null);
      if (res.success) {
        setBookings((prev) =>
          prev.map((b) => (b.id === bookingId ? { ...b, status } : b))
        );
        toast.success(`Booking status changed to ${status.replace("_", " ")}.`);
      } else {
        toast.error(res.message || "Failed to update booking status.");
      }
    });
  };

  // Service Actions
  const handleDeleteService = (serviceId: string) => {
    if (!confirm("Are you sure you want to remove this service from the platform?")) return;
    setLoadingServiceId(serviceId);
    startTransition(async () => {
      const res = await deleteServiceAction(serviceId);
      setLoadingServiceId(null);
      if (res.success) {
        setServices((prev) => prev.filter((s) => s.id !== serviceId));
        toast.success("Service removed from marketplace.");
      } else {
        toast.error(res.message || "Failed to delete service.");
      }
    });
  };

  // Live Ping Test
  const handleTestPing = async () => {
    setPingStatus("checking");
    const startTime = Date.now();
    try {
      const backendUrl =
        process.env.NEXT_PUBLIC_BACKEND_API_URL || "https://fixit-backend-five.vercel.app";
      await fetch(`${backendUrl}/api/services`, { cache: "no-store" });
      const elapsed = Date.now() - startTime;
      setPingLatency(elapsed);
      setPingStatus("online");
      toast.success(`Backend server responsive (${elapsed}ms latency)`);
    } catch {
      setPingStatus("error");
      toast.error("Backend health ping failed");
    }
  };

  // Filtered Lists
  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name?.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.email?.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.id?.toLowerCase().includes(userSearch.toLowerCase());
    const matchesRole =
      userRoleFilter === "ALL"
        ? true
        : userRoleFilter === "BANNED"
        ? u.isBanned
        : u.role === userRoleFilter;
    return matchesSearch && matchesRole;
  });

  const filteredBookings = bookings.filter((b) => {
    const matchesSearch =
      b.customer?.name?.toLowerCase().includes(bookingSearch.toLowerCase()) ||
      b.technician?.user?.name?.toLowerCase().includes(bookingSearch.toLowerCase()) ||
      b.service?.name?.toLowerCase().includes(bookingSearch.toLowerCase()) ||
      b.id?.toLowerCase().includes(bookingSearch.toLowerCase());
    const matchesStatus =
      bookingStatusFilter === "ALL" ? true : b.status === bookingStatusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredServices = services.filter((s) => {
    return (
      s.name?.toLowerCase().includes(serviceSearch.toLowerCase()) ||
      s.category?.toLowerCase().includes(serviceSearch.toLowerCase()) ||
      s.description?.toLowerCase().includes(serviceSearch.toLowerCase()) ||
      s.technician?.user?.name?.toLowerCase().includes(serviceSearch.toLowerCase())
    );
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-16">
      {/* ── 1. Top Enterprise Control Center Header ── */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-card border border-border/70 p-6 rounded-3xl shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Live Production Cluster
            </span>
            <span className="text-muted-foreground">•</span>
            <span className="text-[11px] text-muted-foreground font-mono">
              v1.0.0 (Express/Prisma/PostgreSQL)
            </span>
          </div>
          <h1
            className="text-2xl sm:text-3xl font-black text-foreground tracking-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Platform Administration Console
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Complete platform observability, user governance, service moderation, and backend telemetry.
          </p>
        </div>

        {/* Server Telemetry Badge with Live Ping */}
        <div className="flex items-center gap-3">
          <div className="bg-muted/60 border border-border px-3.5 py-2 rounded-2xl flex items-center gap-3 text-xs">
            <div className="flex items-center gap-1.5 font-mono text-[11px]">
              <Server className="w-3.5 h-3.5 text-primary" />
              <span className="text-muted-foreground">API Latency:</span>
              <span className="font-bold text-foreground">{pingLatency}ms</span>
            </div>
            <button
              onClick={handleTestPing}
              disabled={pingStatus === "checking"}
              className="p-1 rounded-lg hover:bg-background text-muted-foreground hover:text-primary transition-colors cursor-pointer"
              title="Ping Backend Server"
            >
              <RefreshCw
                className={`w-3.5 h-3.5 ${pingStatus === "checking" ? "animate-spin" : ""}`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* ── 2. Top Executive Metrics (KPIs) ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {/* Total Users */}
        <div className="premium-card rounded-2xl p-4 sm:p-5 flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Total Accounts
            </span>
            <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <Users className="w-4.5 h-4.5" />
            </div>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-black text-foreground">{totalUsers}</p>
            <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground font-semibold mt-1">
              <span className="text-emerald-600 font-bold">{customersCount} Customers</span> •
              <span className="text-teal-600 font-bold">{techniciansCount} Techs</span> •
              <span className="text-amber-600 font-bold">{adminsCount} Admins</span>
            </div>
          </div>
        </div>

        {/* Bookings & Active Jobs */}
        <div className="premium-card rounded-2xl p-4 sm:p-5 flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Total Bookings
            </span>
            <div className="w-9 h-9 rounded-xl bg-teal-500/10 text-teal-600 flex items-center justify-center">
              <Calendar className="w-4.5 h-4.5" />
            </div>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-black text-foreground">{totalBookings}</p>
            <div className="flex items-center gap-1.5 text-[10px] font-semibold mt-1">
              <span className="text-teal-600 font-bold">{inProgressBookings} Active</span> •
              <span className="text-emerald-600 font-bold">{completedBookings} Completed</span>
            </div>
          </div>
        </div>

        {/* Platform GMV / Revenue */}
        <div className="premium-card rounded-2xl p-4 sm:p-5 flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Platform Volume
            </span>
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
              <TrendingUp className="w-4.5 h-4.5" />
            </div>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-black text-emerald-600">
              ₹{totalRevenue.toLocaleString()}
            </p>
            <p className="text-[10px] text-muted-foreground font-medium mt-1">
              Completed transactions volume
            </p>
          </div>
        </div>

        {/* Catalog Services */}
        <div className="premium-card rounded-2xl p-4 sm:p-5 flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Active Services
            </span>
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
              <Layers className="w-4.5 h-4.5" />
            </div>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-black text-foreground">{services.length}</p>
            <div className="flex items-center gap-1 text-[10px] text-muted-foreground font-medium mt-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              <span>Cataloged across categories</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── 3. Navigation Workspace Tabs ── */}
      <div className="flex items-center gap-1.5 border-b border-border/60 pb-1 overflow-x-auto">
        {[
          { id: "overview", label: "Executive Overview", icon: Activity },
          { id: "users", label: `Users Governance (${users.length})`, icon: Users },
          { id: "bookings", label: `Bookings Moderation (${bookings.length})`, icon: Calendar },
          { id: "services", label: `Service Catalog (${services.length})`, icon: Wrench },
          { id: "backend", label: "Backend & API Architecture", icon: Server },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ── 4. TAB CONTENTS ── */}

      {/* TAB 1: EXECUTIVE OVERVIEW */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Booking Status Distribution */}
            <div className="lg:col-span-7 premium-card p-6 rounded-3xl space-y-4">
              <h2 className="text-base font-bold text-foreground flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                <span>Bookings Status Pipeline</span>
              </h2>

              <div className="space-y-3">
                {[
                  {
                    status: "COMPLETED",
                    count: completedBookings,
                    color: "bg-emerald-500",
                    label: "Completed Jobs",
                  },
                  {
                    status: "IN_PROGRESS",
                    count: bookings.filter((b) => b.status === "IN_PROGRESS").length,
                    color: "bg-teal-500",
                    label: "In Progress / Active",
                  },
                  {
                    status: "PAID",
                    count: bookings.filter((b) => b.status === "PAID").length,
                    color: "bg-sky-500",
                    label: "Paid & Scheduled",
                  },
                  {
                    status: "ACCEPTED",
                    count: bookings.filter((b) => b.status === "ACCEPTED").length,
                    color: "bg-blue-500",
                    label: "Technician Accepted",
                  },
                  {
                    status: "REQUESTED",
                    count: bookings.filter((b) => b.status === "REQUESTED").length,
                    color: "bg-amber-500",
                    label: "Requested (Awaiting Conf.)",
                  },
                  {
                    status: "CANCELLED",
                    count: cancelledBookings,
                    color: "bg-rose-500",
                    label: "Cancelled / Declined",
                  },
                ].map((item) => {
                  const percent = totalBookings > 0 ? (item.count / totalBookings) * 100 : 0;
                  return (
                    <div key={item.status} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-foreground">{item.label}</span>
                        <span className="font-bold text-muted-foreground">
                          {item.count} ({percent.toFixed(0)}%)
                        </span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                        <div
                          className={`h-full ${item.color} rounded-full transition-all duration-500`}
                          style={{ width: `${Math.max(percent, item.count > 0 ? 4 : 0)}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick System Diagnostics */}
            <div className="lg:col-span-5 premium-card p-6 rounded-3xl space-y-4">
              <h2 className="text-base font-bold text-foreground flex items-center gap-2">
                <Cpu className="w-4 h-4 text-primary" />
                <span>Backend Architecture Status</span>
              </h2>

              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-2xl bg-muted/40 border border-border flex items-center justify-between">
                  <span className="text-muted-foreground">Target Endpoint</span>
                  <span className="font-mono font-bold text-primary truncate max-w-[200px]">
                    fixit-backend-five.vercel.app
                  </span>
                </div>
                <div className="p-3 rounded-2xl bg-muted/40 border border-border flex items-center justify-between">
                  <span className="text-muted-foreground">Database Engine</span>
                  <span className="font-bold text-foreground">PostgreSQL 16 (Prisma Client)</span>
                </div>
                <div className="p-3 rounded-2xl bg-muted/40 border border-border flex items-center justify-between">
                  <span className="text-muted-foreground">Auth Architecture</span>
                  <span className="font-bold text-foreground">JWT (Access + Refresh)</span>
                </div>
                <div className="p-3 rounded-2xl bg-muted/40 border border-border flex items-center justify-between">
                  <span className="text-muted-foreground">Payment Processor</span>
                  <span className="font-bold text-foreground">Stripe Hosted Checkout</span>
                </div>
                <div className="p-3 rounded-2xl bg-muted/40 border border-border flex items-center justify-between">
                  <span className="text-muted-foreground">Admin Account Governance</span>
                  <span className="font-bold text-emerald-600">Active (Full Perms)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Bookings Stream */}
          <div className="premium-card p-6 rounded-3xl space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-foreground flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                <span>Recent Platform Activity Stream</span>
              </h2>
              <button
                onClick={() => setActiveTab("bookings")}
                className="text-xs font-bold text-primary hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>View All In Bookings</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="divide-y divide-border/60">
              {bookings.slice(0, 5).map((b: any) => (
                <div
                  key={b.id}
                  className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold shrink-0">
                      <Wrench className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-bold text-foreground text-sm">
                        {b.service?.name || "Service Request"}
                      </p>
                      <p className="text-muted-foreground">
                        Customer: <span className="text-foreground font-semibold">{b.customer?.name || "User"}</span> •
                        Tech: <span className="text-foreground font-semibold">{b.technician?.user?.name || "Assigned"}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-bold text-foreground">₹{b.totalPrice || 0}</span>
                    <span
                      className={`inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-bold border uppercase ${
                        b.status === "COMPLETED"
                          ? "badge-completed"
                          : b.status === "IN_PROGRESS"
                          ? "badge-in_progress"
                          : b.status === "PAID"
                          ? "badge-paid"
                          : "badge-requested"
                      }`}
                    >
                      {b.status?.replace("_", " ")}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: USER GOVERNANCE (USER MANAGEMENT) */}
      {activeTab === "users" && (
        <div className="space-y-4">
          {/* Controls Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {/* Role Filter Chips */}
            <div className="flex flex-wrap gap-1.5">
              {[
                { id: "ALL", label: `All Users (${users.length})` },
                { id: "CUSTOMER", label: `Customers (${customersCount})` },
                { id: "TECHNICIAN", label: `Technicians (${techniciansCount})` },
                { id: "ADMIN", label: `Admins (${adminsCount})` },
                { id: "BANNED", label: `Banned (${bannedCount})` },
              ].map((rf) => (
                <button
                  key={rf.id}
                  onClick={() => setUserRoleFilter(rf.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                    userRoleFilter === rf.id
                      ? "bg-primary text-primary-foreground border-primary shadow-xs"
                      : "bg-card border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {rf.label}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-2.5 text-muted-foreground" />
              <input
                type="text"
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                placeholder="Search by name, email, or ID..."
                className="pl-9 pr-4 py-2 rounded-xl border border-border bg-card text-xs w-64 focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
            </div>
          </div>

          {/* Users Table */}
          <div className="premium-card rounded-2xl overflow-hidden border border-border">
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-border bg-muted/40">
                    <th className="text-left px-5 py-3.5 font-bold text-muted-foreground uppercase tracking-wider">
                      User Profile
                    </th>
                    <th className="text-left px-5 py-3.5 font-bold text-muted-foreground uppercase tracking-wider">
                      Role
                    </th>
                    <th className="text-left px-5 py-3.5 font-bold text-muted-foreground uppercase tracking-wider">
                      Joined Date
                    </th>
                    <th className="text-left px-5 py-3.5 font-bold text-muted-foreground uppercase tracking-wider">
                      Status
                    </th>
                    <th className="text-right px-5 py-3.5 font-bold text-muted-foreground uppercase tracking-wider">
                      Governance
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((u) => (
                      <tr key={u.id} className="hover:bg-muted/30 transition-colors">
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold shrink-0">
                              {u.name?.[0]?.toUpperCase() || <User className="w-4 h-4" />}
                            </div>
                            <div>
                              <p className="font-bold text-foreground text-sm">{u.name || "Unnamed User"}</p>
                              <p className="text-muted-foreground text-[11px] flex items-center gap-1 font-mono">
                                <Mail className="w-3 h-3" /> {u.email}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-3.5">
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                              u.role === "ADMIN"
                                ? "bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300"
                                : u.role === "TECHNICIAN"
                                ? "bg-teal-100 text-teal-800 border-teal-300 dark:bg-teal-950/60 dark:text-teal-300"
                                : "bg-sky-100 text-sky-800 border-sky-300 dark:bg-sky-950/60 dark:text-sky-300"
                            }`}
                          >
                            {u.role === "ADMIN" ? (
                              <ShieldCheck className="w-3 h-3" />
                            ) : u.role === "TECHNICIAN" ? (
                              <Wrench className="w-3 h-3" />
                            ) : (
                              <User className="w-3 h-3" />
                            )}
                            {u.role}
                          </span>
                        </td>
                        <td className="px-5 py-3.5 text-muted-foreground">
                          {u.createdAt
                            ? new Date(u.createdAt).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })
                            : "N/A"}
                        </td>
                        <td className="px-5 py-3.5">
                          {u.isBanned ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/10 text-rose-600 border border-rose-500/20">
                              <ShieldAlert className="w-3 h-3" /> Banned
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                              <ShieldCheck className="w-3 h-3" /> Active
                            </span>
                          )}
                        </td>
                        <td className="px-5 py-3.5 text-right">
                          {u.role !== "ADMIN" && (
                            <button
                              onClick={() => handleToggleBan(u.id, u.isBanned)}
                              disabled={loadingUserId === u.id}
                              className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer disabled:opacity-60 ${
                                u.isBanned
                                  ? "bg-emerald-600 text-white hover:bg-emerald-700"
                                  : "bg-destructive text-white hover:bg-destructive/90"
                              }`}
                            >
                              {loadingUserId === u.id ? (
                                <Loader2 className="w-3 h-3 animate-spin" />
                              ) : u.isBanned ? (
                                <ShieldCheck className="w-3 h-3" />
                              ) : (
                                <ShieldAlert className="w-3 h-3" />
                              )}
                              <span>{u.isBanned ? "Unban User" : "Ban Account"}</span>
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="text-center py-12 text-muted-foreground">
                        <AlertCircle className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
                        No users matching filter criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: BOOKINGS OPERATIONS */}
      {activeTab === "bookings" && (
        <div className="space-y-4">
          {/* Controls Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex flex-wrap gap-1.5">
              {[
                "ALL",
                "REQUESTED",
                "ACCEPTED",
                "PAID",
                "IN_PROGRESS",
                "COMPLETED",
                "CANCELLED",
              ].map((st) => (
                <button
                  key={st}
                  onClick={() => setBookingStatusFilter(st)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                    bookingStatusFilter === st
                      ? "bg-primary text-primary-foreground border-primary shadow-xs"
                      : "bg-card border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {st.replace("_", " ")}
                </button>
              ))}
            </div>

            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-2.5 text-muted-foreground" />
              <input
                type="text"
                value={bookingSearch}
                onChange={(e) => setBookingSearch(e.target.value)}
                placeholder="Search customer, tech, or service..."
                className="pl-9 pr-4 py-2 rounded-xl border border-border bg-card text-xs w-64 focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
            </div>
          </div>

          {/* Bookings Table */}
          <div className="premium-card rounded-2xl overflow-hidden border border-border">
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-border bg-muted/40">
                    <th className="text-left px-5 py-3.5 font-bold text-muted-foreground uppercase tracking-wider">
                      Service
                    </th>
                    <th className="text-left px-5 py-3.5 font-bold text-muted-foreground uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="text-left px-5 py-3.5 font-bold text-muted-foreground uppercase tracking-wider">
                      Technician
                    </th>
                    <th className="text-left px-5 py-3.5 font-bold text-muted-foreground uppercase tracking-wider">
                      Price
                    </th>
                    <th className="text-left px-5 py-3.5 font-bold text-muted-foreground uppercase tracking-wider">
                      Status
                    </th>
                    <th className="text-right px-5 py-3.5 font-bold text-muted-foreground uppercase tracking-wider">
                      Admin Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredBookings.length > 0 ? (
                    filteredBookings.map((b) => (
                      <tr key={b.id} className="hover:bg-muted/30 transition-colors">
                        <td className="px-5 py-3.5">
                          <p className="font-bold text-foreground text-sm">
                            {b.service?.name || "Service Booking"}
                          </p>
                          <p className="text-[11px] text-muted-foreground">
                            {b.scheduledDate
                              ? new Date(b.scheduledDate).toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                })
                              : "Unscheduled"}
                          </p>
                        </td>
                        <td className="px-5 py-3.5">
                          <p className="font-semibold text-foreground">
                            {b.customer?.name || "Customer"}
                          </p>
                          <p className="text-[10px] text-muted-foreground truncate max-w-[150px]">
                            {b.customer?.email}
                          </p>
                        </td>
                        <td className="px-5 py-3.5">
                          <p className="font-semibold text-foreground">
                            {b.technician?.user?.name || "Assigned Pro"}
                          </p>
                          <p className="text-[10px] text-muted-foreground">
                            {b.technician?.location || "Kolkata"}
                          </p>
                        </td>
                        <td className="px-5 py-3.5 font-bold text-foreground text-sm">
                          ₹{b.totalPrice || 0}
                        </td>
                        <td className="px-5 py-3.5">
                          <span
                            className={`inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-bold border uppercase ${
                              b.status === "COMPLETED"
                                ? "badge-completed"
                                : b.status === "IN_PROGRESS"
                                ? "badge-in_progress"
                                : b.status === "PAID"
                                ? "badge-paid"
                                : "badge-requested"
                            }`}
                          >
                            {b.status?.replace("_", " ")}
                          </span>
                        </td>
                        <td className="px-5 py-3.5 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {b.status !== "COMPLETED" && (
                              <button
                                onClick={() => handleUpdateBookingStatus(b.id, "COMPLETED")}
                                disabled={loadingBookingId === b.id}
                                className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white text-[11px] font-bold hover:bg-emerald-700 cursor-pointer"
                                title="Force Mark Completed"
                              >
                                Complete
                              </button>
                            )}
                            {b.status !== "CANCELLED" && (
                              <button
                                onClick={() => handleUpdateBookingStatus(b.id, "CANCELLED")}
                                disabled={loadingBookingId === b.id}
                                className="px-2 py-1 rounded-lg border border-destructive/30 text-destructive text-[11px] font-bold hover:bg-destructive/10 cursor-pointer"
                                title="Cancel Booking"
                              >
                                Cancel
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="text-center py-12 text-muted-foreground">
                        <AlertCircle className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
                        No bookings found matching criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: SERVICE CATALOG MODERATION (With Server Images) */}
      {activeTab === "services" && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h2 className="text-base font-bold text-foreground flex items-center gap-2">
              <Layers className="w-4 h-4 text-primary" />
              <span>Catalog Services ({services.length})</span>
            </h2>

            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-2.5 text-muted-foreground" />
              <input
                type="text"
                value={serviceSearch}
                onChange={(e) => setServiceSearch(e.target.value)}
                placeholder="Search services or categories..."
                className="pl-9 pr-4 py-2 rounded-xl border border-border bg-card text-xs w-64 focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
            </div>
          </div>

          {/* Services Grid with Images from Server */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredServices.map((service: any) => {
              const imageUrl =
                service.image ||
                service.imageUrl ||
                "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=800";
              const techUser = service.technician?.user;

              return (
                <div
                  key={service.id}
                  className="premium-card rounded-2xl overflow-hidden border border-border flex flex-col justify-between"
                >
                  {/* Image from Server */}
                  <div className="relative w-full aspect-[16/10] bg-muted overflow-hidden">
                    <Image
                      unoptimized
                      src={imageUrl}
                      alt={service.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold bg-background/90 backdrop-blur text-foreground border border-border">
                      {service.category || "General"}
                    </span>
                    <span className="absolute bottom-3 left-3 text-xs font-mono font-bold text-white drop-shadow">
                      {service.image ? "🖼️ Server Image Link" : "Preset Fallback"}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-foreground text-sm line-clamp-1">
                        {service.name}
                      </h3>
                      <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                        {service.description}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-border flex items-center justify-between text-xs">
                      <div>
                        <p className="text-[10px] text-muted-foreground">Technician</p>
                        <p className="font-bold text-foreground truncate max-w-[120px]">
                          {techUser?.name || "Independent"}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] text-muted-foreground">Price</p>
                        <p className="font-black text-primary text-sm">₹{service.price}</p>
                      </div>
                    </div>

                    {/* Delete action */}
                    <div className="pt-2 flex justify-end">
                      <button
                        onClick={() => handleDeleteService(service.id)}
                        disabled={loadingServiceId === service.id}
                        className="px-3 py-1.5 rounded-xl border border-destructive/30 text-destructive text-[11px] font-bold hover:bg-destructive/10 transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        {loadingServiceId === service.id ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Trash2 className="w-3.5 h-3.5" />
                        )}
                        <span>Remove Service</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 5: BACKEND & API ARCHITECTURE VISUALIZER */}
      {activeTab === "backend" && (
        <div className="space-y-6">
          <div className="premium-card p-6 rounded-3xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-foreground flex items-center gap-2">
                  <Database className="w-4 h-4 text-primary" />
                  <span>Backend Architecture & Live Endpoints Registry</span>
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Production REST API endpoints on <strong>https://fixit-backend-five.vercel.app</strong>
                </p>
              </div>
              <a
                href="https://fixit-backend-five.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 rounded-xl bg-primary/10 text-primary text-xs font-bold hover:bg-primary/20 flex items-center gap-1.5 transition-colors"
              >
                <span>Live Server Root</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Endpoints Table */}
            <div className="overflow-x-auto rounded-2xl border border-border">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-muted/50 border-b border-border">
                    <th className="text-left px-4 py-3 font-bold text-muted-foreground uppercase">Method</th>
                    <th className="text-left px-4 py-3 font-bold text-muted-foreground uppercase">Endpoint Route</th>
                    <th className="text-left px-4 py-3 font-bold text-muted-foreground uppercase">Access Level</th>
                    <th className="text-left px-4 py-3 font-bold text-muted-foreground uppercase">Operation Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    { method: "GET", route: "/api/services", auth: "Public", desc: "Retrieve filtered service listings (search, category, location)" },
                    { method: "POST", route: "/api/services", auth: "TECHNICIAN", desc: "Create new service offering with cover image link" },
                    { method: "PATCH", route: "/api/services/:id", auth: "TECH / ADMIN", desc: "Update existing service title, price, or image link" },
                    { method: "DELETE", route: "/api/services/:id", auth: "TECH / ADMIN", desc: "Remove service offering from public catalog" },
                    { method: "GET", route: "/api/users", auth: "ADMIN", desc: "Retrieve all registered customers, technicians, and admins" },
                    { method: "PATCH", route: "/api/users/:id", auth: "ADMIN", desc: "Update user account status (Ban / Unban toggle)" },
                    { method: "GET", route: "/api/admin/bookings", auth: "ADMIN", desc: "Full inspection of all platform booking appointments" },
                    { method: "PATCH", route: "/api/bookings/status/:id", auth: "ALL ROLES", desc: "Update booking lifecycle (ACCEPT, IN_PROGRESS, COMPLETED)" },
                    { method: "POST", route: "/api/payments/checkout/:id", auth: "CUSTOMER", desc: "Generate secure Stripe checkout redirect session" },
                    { method: "POST", route: "/webhook", auth: "Stripe Signature", desc: "Handle asynchronous Stripe checkout completion webhook" },
                  ].map((ep) => (
                    <tr key={ep.route + ep.method} className="hover:bg-muted/30">
                      <td className="px-4 py-3">
                        <span
                          className={`font-mono font-bold text-[10px] px-2 py-0.5 rounded ${
                            ep.method === "GET"
                              ? "bg-sky-500/10 text-sky-600 border border-sky-500/20"
                              : ep.method === "POST"
                              ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20"
                              : ep.method === "PATCH"
                              ? "bg-amber-500/10 text-amber-600 border border-amber-500/20"
                              : "bg-rose-500/10 text-rose-600 border border-rose-500/20"
                          }`}
                        >
                          {ep.method}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-mono font-bold text-foreground">{ep.route}</td>
                      <td className="px-4 py-3">
                        <span className="font-semibold text-muted-foreground">{ep.auth}</span>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{ep.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
