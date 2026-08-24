import { Navbar } from "@/components/shared/navbar";


const HomeLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {


  return (
    <div className="min-h-full flex flex-col">
      <Navbar />

      <main className="flex-1">{children}</main>

      
    </div>
  );
};

export default HomeLayout;