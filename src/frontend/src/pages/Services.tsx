import { Link } from "@tanstack/react-router";
import ServiceCard from "../components/ServiceCard";
import { useScrollReveal } from "../hooks/useScrollReveal";

const services = [
  {
    id: "numerology",
    name: "Numerology Reading",
    icon: "/assets/generated/service-numerology.dim_256x256.png",
    description:
      "Discover the hidden meanings behind your birth date and life path number. Our comprehensive numerology reading reveals your strengths, challenges, and destiny patterns encoded in the cosmic vibrations of numbers.",
    price: "Starting from ₹2,999",
  },
  {
    id: "name-correction",
    name: "Name Correction",
    icon: "/assets/generated/service-name.dim_256x256.png",
    description:
      "Align your name with favorable cosmic vibrations. Through precise numerological analysis, we suggest optimal name spellings that attract success, prosperity, and positive energy into your life.",
    price: "Starting from ₹3,999",
  },
  {
    id: "lucky-number",
    name: "Lucky Number Selection",
    icon: "/assets/generated/service-lucky.dim_256x256.png",
    description:
      "Identify your personal lucky numbers for important decisions, dates, and ventures. These numbers resonate with your unique energy signature and can enhance success in various life areas.",
    price: "Starting from ₹1,999",
  },
  {
    id: "reiki-healing",
    name: "Reiki & Energy Healing",
    icon: "/assets/generated/service-reiki.dim_256x256.png",
    description:
      "Experience the transformative power of universal life force energy. Our Reiki sessions clear energy blockages, promote deep relaxation, and restore balance to your mind, body, and spirit.",
    price: "Starting from ₹2,499",
  },
  {
    id: "business-name",
    name: "Business Name Analysis",
    icon: "/assets/generated/service-business.dim_256x256.png",
    description:
      "Choose a business name that vibrates with success and prosperity. We analyze numerological compatibility to ensure your business name attracts abundance, customers, and positive opportunities.",
    price: "Starting from ₹4,999",
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {services.map((service, index) => (
              <ServiceCard key={service.id} {...service} delay={index * 100} />
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
