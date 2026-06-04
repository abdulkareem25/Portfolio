import { Footer } from "../../shared/components/Footer";
import { Header } from "../../shared/components/Header";
import { StarBackground } from "../../shared/components/StarBackground";
import { AboutSection } from "../../shared/components/sections/AboutSection";
import { ContactSection } from "../../shared/components/sections/ContactSection";
import { HeroSection } from "../../shared/components/sections/HeroSection";
import { ProjectsSection } from "../../shared/components/sections/ProjectsSection";
import { SkillsSection } from "../../shared/components/sections/SkillsSection";

export const HomePage = () => {
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
