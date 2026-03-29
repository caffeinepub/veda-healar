import { Heart, Sparkles, Star } from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollReveal";

export default function About() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal();
  const { ref: contentRef, isVisible: contentVisible } = useScrollReveal();
  const { ref: missionRef, isVisible: missionVisible } = useScrollReveal();

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-deepBlue/5 to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <div
            ref={headerRef}
            className={`text-center max-w-4xl mx-auto transition-all duration-1000 ${
              headerVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h1
              className="text-5xl md:text-6xl font-bold text-deepBlue mb-6"
              style={{ fontFamily: "'Roboto', sans-serif" }}
            >
              About Veda Healar
            </h1>
            <p className="text-xl text-gray-700 leading-relaxed">
              Bridging Ancient Vedic Wisdom with Modern Spiritual Guidance
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div
            ref={contentRef}
            className={`max-w-4xl mx-auto transition-all duration-1000 delay-200 ${
              contentVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed mb-6">
                Veda Healar is a sacred space where ancient Vedic wisdom meets
                contemporary spiritual needs. Our practice is rooted in the
                timeless traditions of numerology, energy healing, and cosmic
                alignment, offering guidance to those seeking clarity, purpose,
                and transformation.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                Through the profound science of numerology, we decode the
                vibrational patterns that shape your destiny. Each number
                carries a unique frequency, and understanding these frequencies
                allows us to unlock the hidden potential within your name, birth
                date, and life path.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Our approach combines traditional Vedic practices with intuitive
                healing modalities, including Reiki energy work and personalized
                consultations. We believe that every soul has a divine
                blueprint, and our mission is to help you align with your
                highest purpose.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-16 bg-beigeBackground">
        <div className="container mx-auto px-4">
          <div
            ref={missionRef}
            className={`max-w-5xl mx-auto transition-all duration-1000 delay-300 ${
              missionVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h2
              className="text-4xl font-bold text-deepBlue text-center mb-12"
              style={{ fontFamily: "'Roboto', sans-serif" }}
            >
              Our Guiding Principles
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                <div className="w-16 h-16 bg-goldAccent/10 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <Sparkles className="w-8 h-8 text-goldAccent" />
                </div>
                <h3
                  className="text-2xl font-bold text-deepBlue text-center mb-4"
                  style={{ fontFamily: "'Roboto', sans-serif" }}
                >
                  Authenticity
                </h3>
                <p className="text-gray-700 text-center leading-relaxed">
                  We honor the ancient traditions while adapting them to serve
                  modern seekers with integrity and genuine care.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                <div className="w-16 h-16 bg-goldAccent/10 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <Heart className="w-8 h-8 text-goldAccent" />
                </div>
                <h3
                  className="text-2xl font-bold text-deepBlue text-center mb-4"
                  style={{ fontFamily: "'Roboto', sans-serif" }}
                >
                  Compassion
                </h3>
                <p className="text-gray-700 text-center leading-relaxed">
                  Every consultation is approached with empathy, understanding,
                  and a deep commitment to your spiritual wellbeing.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                <div className="w-16 h-16 bg-goldAccent/10 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <Star className="w-8 h-8 text-goldAccent" />
                </div>
                <h3
                  className="text-2xl font-bold text-deepBlue text-center mb-4"
                  style={{ fontFamily: "'Roboto', sans-serif" }}
                >
                  Transformation
                </h3>
                <p className="text-gray-700 text-center leading-relaxed">
                  We guide you toward meaningful change, helping you align with
                  your true purpose and highest potential.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2
              className="text-4xl font-bold text-deepBlue text-center mb-12"
              style={{ fontFamily: "'Roboto', sans-serif" }}
            >
              Our Expertise
            </h2>
            <div className="space-y-6">
              <div className="border-l-4 border-goldAccent pl-6 py-2">
                <h3
                  className="text-2xl font-bold text-deepBlue mb-2"
                  style={{ fontFamily: "'Roboto Slab', serif" }}
                >
                  Vedic Numerology
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Deep understanding of the cosmic vibrations encoded in
                  numbers, names, and dates, drawing from ancient Vedic texts
                  and modern interpretations.
                </p>
              </div>
              <div className="border-l-4 border-goldAccent pl-6 py-2">
                <h3
                  className="text-2xl font-bold text-deepBlue mb-2"
                  style={{ fontFamily: "'Roboto Slab', serif" }}
                >
                  Energy Healing
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Certified Reiki practitioners with years of experience in
                  channeling universal life force energy for healing and
                  balance.
                </p>
              </div>
              <div className="border-l-4 border-goldAccent pl-6 py-2">
                <h3
                  className="text-2xl font-bold text-deepBlue mb-2"
                  style={{ fontFamily: "'Roboto Slab', serif" }}
                >
                  Name Correction & Analysis
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Specialized techniques for optimizing name vibrations to
                  attract prosperity, success, and positive energy into your
                  life.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
