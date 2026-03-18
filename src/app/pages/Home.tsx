import { Navbar } from "../components/Navbar";
import { HeroSection } from "../components/HeroSection";
import { AboutSection } from "../components/AboutSection";
import { ServicesSection } from "../components/ServicesSection";
import { TrainersSection } from "../components/TrainersSection";
import { PricingSection } from "../components/PricingSection";
import { ContactSection } from "../components/ContactSection";
import { Footer } from "../components/Footer";
import { useTheme } from "../context/ThemeContext";

export function Home() {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen transition-colors duration-500 ${
      theme === 'dark' 
        ? 'bg-[#040304] text-[#f1f0eb]' 
        : 'bg-[#f1f0eb] text-[#040304]'
    }`}>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <TrainersSection />
        <PricingSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}