import { Link } from '@tanstack/react-router';
import { Sparkles } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/assets/generated/hero-cosmic.dim_1920x1080.png)',
        }}
      >
        <div className="absolute inset-0 bg-deepBlue/70" />
      </div>

      {/* Mandala Background Overlay */}
      <div
        className="absolute inset-0 opacity-20 bg-repeat"
        style={{
          backgroundImage: 'url(/assets/generated/mandala-bg.dim_1920x1080.png)',
          backgroundSize: '600px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-6">
            <Sparkles className="w-16 h-16 text-goldAccent animate-pulse" />
          </div>
          <h1 className="font-serif text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Unlock Your Destiny with Vedic Wisdom
          </h1>
          <p className="text-xl md:text-2xl text-beigeBackground mb-8 leading-relaxed max-w-3xl mx-auto">
            Discover the ancient science of numerology, energy healing, and cosmic alignment. 
            Transform your life through personalized spiritual guidance rooted in timeless Vedic traditions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/book"
              className="bg-goldAccent text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-goldAccent/90 transition-all duration-300 hover:scale-105 shadow-2xl inline-block"
            >
              Book Your Destiny Reading
            </Link>
            <Link
              to="/services"
              className="bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/20 transition-all duration-300 inline-block"
            >
              Explore Services
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-white/50 rounded-full" />
        </div>
      </div>
    </section>
  );
}
