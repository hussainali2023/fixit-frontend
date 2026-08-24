import { Footer } from "@/components/shared/footer";
import { Navbar } from "@/components/shared/navbar";

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <div className="min-h-full flex flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}