import type { BookingStatus } from "./types";

export const BOOKING_STATUS_STYLES: Record<
  BookingStatus,
  { label: string; className: string }
> = {
  REQUESTED: {
    label: "Requested",
    className:
      "bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950 dark:text-amber-300",
  },
  ACCEPTED: {
    label: "Accepted",
    className:
      "bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950 dark:text-blue-300",
  },
  DECLINED: {
    label: "Declined",
    className:
      "bg-red-100 text-red-800 border-red-300 dark:bg-red-950 dark:text-red-300",
  },
  PAID: {
    label: "Paid",
    className:
      "bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950 dark:text-purple-300",
  },
  IN_PROGRESS: {
    label: "In Progress",
    className:
      "bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300",
  },
  COMPLETED: {
    label: "Completed",
    className:
      "bg-gray-100 text-gray-800 border-gray-300 dark:bg-gray-800 dark:text-gray-300",
  },
  CANCELLED: {
    label: "Cancelled",
    className:
      "bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950 dark:text-rose-300",
  },
};
