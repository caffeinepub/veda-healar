import HeroSection from '../components/HeroSection';
import ServicesOverview from '../components/ServicesOverview';
import AboutIntro from '../components/AboutIntro';
import TestimonialsSlider from '../components/TestimonialsSlider';

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
