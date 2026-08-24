import { getServicesAction } from "@/lib/actions/serviceActions";
import { getTechniciansAction } from "@/lib/actions/technicianActions";
import { HeroSection } from "./_components/HeroSection";
import { HowItWorks } from "./_components/Work";
import { PublicServices } from "./_components/PublicServices";
import { TestimonialsSection } from "./_components/PublicReview";
import { AboutSection } from "./_components/AboutSection";
import { TechnicianCTA } from "./_components/TechnicianCTA";
import { FaqSection } from "./_components/FaqSection";

export default async function HomePage() {
  const [servicesRes] = await Promise.allSettled([
    getServicesAction(),
  ]);

  const services =
    servicesRes.status === "fulfilled"
      ? servicesRes.value?.data?.services || servicesRes.value?.data || []
      : [];

  return (
    <main className="flex-1 min-h-screen">
      <HeroSection />
      <HowItWorks />
      <PublicServices services={services} />
      <TestimonialsSection />
      <AboutSection />
      <TechnicianCTA />
      <FaqSection />
    </main>
  );
}