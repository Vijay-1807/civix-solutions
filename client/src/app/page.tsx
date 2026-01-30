import { FloatingHeader } from "@/components/ui/floating-header";
import { HeroSection } from "@/components/landing/HeroSection";
import { ProjectsSection } from "@/components/landing/ProjectsSection";
import { ClientsSection } from "@/components/landing/ClientsSection";
import { Newsletter } from "@/components/landing/Newsletter";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="w-full px-4"><FloatingHeader /></div>
      <main className="flex-grow">
        <HeroSection />
        <ProjectsSection />
        <ClientsSection />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
