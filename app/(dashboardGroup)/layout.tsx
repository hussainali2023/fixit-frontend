import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import DashboardSidebar from "./_components/DashboardSidebar";
import getMe from "@/service/getMe";
import Link from "next/link";
import { Wrench } from "lucide-react";

const DashboardLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const user = await getMe();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <DashboardSidebar user={user} />

        <div className="flex-1 flex flex-col min-w-0">
          
          <header className="flex md:hidden h-14 w-full border-b border-border bg-card/80 backdrop-blur px-4 items-center justify-between sticky top-0 z-40">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="cursor-pointer" />
              <Link href="/" className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  <Wrench className="w-3.5 h-3.5" />
                </div>
                <span className="font-extrabold text-base text-primary">FixItNow</span>
              </Link>
            </div>
          </header>

          <main className="flex-1 p-4 sm:p-6 bg-background overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;