import { Navbar } from "@/components/shared/navbar";
import { Footer } from "./_components/Footer";
import getMe from "@/service/getMe";

const HomeLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const user = await getMe();

  return (
    <div className="min-h-full flex flex-col">
      <Navbar user={user} />

      <main className="flex-1">{children}</main>

      <Footer />
    </div>
  );
};

export default HomeLayout;