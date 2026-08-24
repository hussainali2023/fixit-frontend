import type { LucideProps } from "lucide-react";
import type { ForwardRefExoticComponent, RefAttributes } from "react";

export type Role = "CUSTOMER" | "TECHNICIAN" | "ADMIN";
export type UserRole = Role;

export type BookingStatus =
  | "REQUESTED"
  | "ACCEPTED"
  | "DECLINED"
  | "PAID"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED";

export type PaymentStatus = "PENDING" | "COMPLETED" | "FAILED";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  isBanned?: boolean;
  phone?: string;
  createdAt?: string;
  updatedAt?: string;
  technicianProfile?: TechnicianProfile | null;
}

export interface TechnicianProfile {
  id: string;
  userId: string;
  skills: string;
  experience: number;
  location: string;
  availability: string;
  createdAt?: string;
  updatedAt?: string;
  user?: User;
  services?: ServiceItem[];
  bookings?: BookingItem[];
}

export interface ServiceItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category?: string;
  technicianId: string;
  createdAt?: string;
  updatedAt?: string;
  technician?: TechnicianProfile;
  bookings?: BookingItem[];
  // Compatibility aliases
  title?: string;
  duration?: string;
  image?: string;
}

export interface Payment {
  id: string;
  bookingId: string;
  amount: number;
  status: PaymentStatus;
  transactionId: string;
  createdAt?: string;
  updatedAt?: string;
  booking?: BookingItem;
}

export interface Review {
  id: string;
  bookingId: string;
  customerId: string;
  rating: number;
  comment: string;
  createdAt?: string;
  updatedAt?: string;
  booking?: BookingItem;
  customer?: User;
}

export interface BookingItem {
  id: string;
  serviceId: string;
  customerId: string;
  technicianId: string;
  scheduledDate: string;
  totalPrice: number;
  status: BookingStatus;
  createdAt?: string;
  updatedAt?: string;
  service?: ServiceItem;
  customer?: User;
  technician?: TechnicianProfile;
  payment?: Payment | null;
  review?: Review | null;
  // Compatibility fields
  bookingDate?: string;
  timeSlot?: string;
  serviceAddress?: string;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  statusCode?: number;
  message: string;
  data: T;
}

export type LoginResponse = {
  success: boolean;
  statusCode?: number;
  message: string;
  data?: {
    accessToken?: string;
    refreshToken?: string;
    user?: User;
  };
};

export type RegisterApiResponse = {
  success: boolean;
  statusCode?: number;
  message: string;
  data?: any;
};

export type CreateBooking = {
  serviceId: string;
  technicianId?: string;
  scheduledDate?: string;
  bookingDate?: string;
  timeSlot?: string;
  serviceAddress?: string;
};

export interface ISidebarItem {
  label: string;
  href: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
}
