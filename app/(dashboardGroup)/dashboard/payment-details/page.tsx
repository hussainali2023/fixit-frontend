import { redirect } from "next/navigation";

export default function PaymentDetailsRedirectPage() {
  redirect("/dashboard/payment-history");
}
