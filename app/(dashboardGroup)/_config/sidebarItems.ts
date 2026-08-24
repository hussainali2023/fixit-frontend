import { ISidebarItem } from "@/lib/types";
import {
  LayoutDashboard,
  Calendar,
  Wrench,
  Settings,
  Users,
  Grid,
  CreditCard,
  Clock,
  MemoryStickIcon,
  BarChart3,
} from "lucide-react";

export const CUSTOMER_SIDEBAR_ITEMS: ISidebarItem[] = [
  {
    label: "Customer Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "My Bookings",
    href: "/dashboard/my-booking",
    icon: Calendar,
  },
  {
    label: "Payment History",
    href: "/dashboard/payment-history",
    icon: CreditCard,
  },
];

export const TECHNICIAN_SIDEBAR_ITEMS: ISidebarItem[] = [
  {
    label: "Technician Dashboard",
    href: "/technician-dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Create Services",
    href: "/technician-dashboard/create-services",
    icon: Wrench,
  },
  {
    label: "My Services",
    href: "/technician-dashboard/my-services",
    icon: MemoryStickIcon,
  },
  {
    label: "Availability Schedule",
    href: "/technician-dashboard/availability",
    icon: Clock,
  },
  {
    label: "Profile Settings",
    href: "/technician-dashboard/profile",
    icon: Settings,
  },
];

export const ADMIN_SIDEBAR_ITEMS: ISidebarItem[] = [
  {
    label: "Admin Overview",
    href: "/admin-dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Manage Users",
    href: "/admin-dashboard",
    icon: Users,
  },
  {
    label: "Manage Categories",
    href: "/admin-dashboard/category",
    icon: Grid,
  },
  {
    label: "All Bookings",
    href: "/admin-dashboard/bookings",
    icon: Calendar,
  },
];