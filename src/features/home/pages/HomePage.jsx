import { Footer } from "../../shared/components/Footer";
import { Header } from "../../shared/components/Header";
import { StarBackground } from "../../shared/components/StarBackground";
import { AboutSection } from "../components/sections/AboutSection";
import { ContactSection } from "../components/sections/ContactSection";
import { HeroSection } from "../components/sections/HeroSection";
import { ProjectsSection } from "../components/sections/ProjectsSection";
import { SkillsSection } from "../components/sections/SkillsSection";
import { useScrollAnimations } from "@/app/useScrollAnimations";

export const HomePage = () => {
  useScrollAnimations();

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* Background Effects */}
      <StarBackground />

      {/* Header / Navbar */}
      <Header />

      {/* Main Content */}
      <main className="relative">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};
