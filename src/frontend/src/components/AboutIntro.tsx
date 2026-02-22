import { Link } from '@tanstack/react-router';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Sparkles, Heart, Star } from 'lucide-react';

export default function AboutIntro() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div
          ref={ref}
          className={`max-w-5xl mx-auto transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-deepBlue mb-6">
                Ancient Wisdom for Modern Souls
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                At Veda Healar, we bridge the timeless wisdom of Vedic traditions with contemporary 
                spiritual needs. Our practice is rooted in the sacred science of numerology, energy 
                healing, and cosmic alignment.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                Through personalized consultations, we help you decode the vibrational patterns that 
                shape your destiny, guiding you toward clarity, purpose, and transformation.
              </p>
              <Link
                to="/about"
                className="inline-block bg-goldAccent text-white px-8 py-3 rounded-lg font-semibold hover:bg-goldAccent/90 transition-all duration-300 hover:scale-105 shadow-lg"
              >
                Learn More About Us
              </Link>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4 bg-beigeBackground p-6 rounded-lg">
                <div className="w-12 h-12 bg-goldAccent/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-goldAccent" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-deepBlue mb-2">
                    Authentic Vedic Practice
                  </h3>
                  <p className="text-gray-700">
                    Rooted in ancient traditions, adapted for modern seekers
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-beigeBackground p-6 rounded-lg">
                <div className="w-12 h-12 bg-goldAccent/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Heart className="w-6 h-6 text-goldAccent" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-deepBlue mb-2">
                    Personalized Guidance
                  </h3>
                  <p className="text-gray-700">
                    Every consultation is tailored to your unique spiritual journey
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-beigeBackground p-6 rounded-lg">
                <div className="w-12 h-12 bg-goldAccent/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Star className="w-6 h-6 text-goldAccent" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-deepBlue mb-2">
                    Proven Results
                  </h3>
                  <p className="text-gray-700">
                    Hundreds of satisfied clients experiencing positive transformation
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
