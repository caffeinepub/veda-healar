import { Link } from "@tanstack/react-router";
import { useScrollReveal } from "../hooks/useScrollReveal";

const categories = [
  {
    id: "healing-services",
    name: "Healing Services",
    icon: "/assets/generated/service-reiki.dim_256x256.png",
    description:
      "Experience transformative healing that restores balance to your mind, body, and spirit through powerful energy work and Vedic healing traditions.",
  },
  {
    id: "numerology-services",
    name: "Numerology Services",
    icon: "/assets/generated/service-numerology.dim_256x256.png",
    description:
      "Discover the hidden meanings in your numbers — from your birth date to your name — and unlock the cosmic blueprint of your life's journey.",
  },
  {
    id: "customized-services",
    name: "Customized Services",
    icon: "/assets/generated/service-business.dim_256x256.png",
    description:
      "Personalized consultations tailored specifically to your unique needs, combining multiple healing and numerology modalities for a holistic approach.",
  },
];

export default function Services() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal();

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
              Our Services
            </h1>
            <p className="text-xl text-gray-700 leading-relaxed">
              Transformative spiritual guidance tailored to your unique journey
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-beigeBackground">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {categories.map((cat, index) => (
              <CategoryCard key={cat.id} {...cat} delay={index * 100} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2
              className="text-4xl font-bold text-deepBlue mb-6"
              style={{ fontFamily: "'Roboto', sans-serif" }}
            >
              Ready to Begin Your Journey?
            </h2>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              Book a consultation today and discover the transformative power of
              Vedic wisdom
            </p>
            <Link
              to="/book"
              className="inline-block bg-goldAccent text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-goldAccent/90 transition-all duration-300 hover:scale-105 shadow-lg"
              style={{ fontFamily: "'Roboto', sans-serif" }}
            >
              Book Your Consultation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function CategoryCard({
  id,
  icon,
  name,
  description,
  delay,
}: {
  id: string;
  icon: string;
  name: string;
  description: string;
  delay: number;
}) {
  const { ref, isVisible } = useScrollReveal();

  return (
    <div
      ref={ref}
      className={`bg-white rounded-lg shadow-lg p-8 hover:shadow-2xl transition-all duration-500 hover:scale-105 flex flex-col ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-goldAccent/10 p-4 flex items-center justify-center">
        <img src={icon} alt={name} className="w-full h-full object-contain" />
      </div>
      <h3
        className="text-2xl font-bold text-deepBlue text-center mb-4"
        style={{ fontFamily: "'Roboto', sans-serif" }}
      >
        {name}
      </h3>
      <p className="text-gray-700 text-center leading-relaxed flex-1 mb-6">
        {description}
      </p>
      <Link
        to="/services/$categoryId"
        params={{ categoryId: id }}
        data-ocid={`services.${id}.button`}
        className="block text-center bg-goldAccent text-white px-5 py-2 rounded-lg font-semibold hover:bg-goldAccent/90 transition-all duration-300 hover:scale-105 shadow"
        style={{ fontFamily: "'Roboto', sans-serif" }}
      >
        View All {name}
      </Link>
    </div>
  );
}
