import AboutIntro from "../components/AboutIntro";
import HeroSection from "../components/HeroSection";
import ServicesOverview from "../components/ServicesOverview";
import TestimonialsSlider from "../components/TestimonialsSlider";

export default function Home() {
  return (
    <div className="w-full">
      <HeroSection />
      <ServicesOverview />
      <AboutIntro />
      <TestimonialsSlider />
    </div>
  );
}
