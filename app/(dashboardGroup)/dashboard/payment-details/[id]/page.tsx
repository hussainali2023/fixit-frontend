import { redirect } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function PaymentDetailsIdRedirectPage({ params }: Props) {
  const { id } = await params;
  redirect(`/dashboard/payment-history/${id}`);
}
