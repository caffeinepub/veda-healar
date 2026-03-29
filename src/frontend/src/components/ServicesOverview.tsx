import { Link } from "@tanstack/react-router";
import { useScrollReveal } from "../hooks/useScrollReveal";

const services = [
  {
    id: "numerology",
    name: "Numerology Reading",
    icon: "/assets/generated/service-numerology.dim_256x256.png",
    description:
      "Decode the cosmic vibrations in your birth date and name to reveal your life path and destiny.",
  },
  {
    id: "name-correction",
    name: "Name Correction",
    icon: "/assets/generated/service-name.dim_256x256.png",
    description:
      "Align your name with favorable energies to attract success and prosperity.",
  },
  {
    id: "lucky-number",
    name: "Lucky Number Selection",
    icon: "/assets/generated/service-lucky.dim_256x256.png",
    description:
      "Discover your personal lucky numbers for important decisions and ventures.",
  },
  {
    id: "reiki-healing",
    name: "Reiki & Energy Healing",
    icon: "/assets/generated/service-reiki.dim_256x256.png",
    description:
      "Experience transformative energy healing to restore balance and harmony.",
  },
  {
    id: "business-name",
    name: "Business Name Analysis",
    icon: "/assets/generated/service-business.dim_256x256.png",
    description:
      "Choose a business name that resonates with success and abundance.",
  },
];

export default function ServicesOverview() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal();

  return (
    <section className="py-20 bg-beigeBackground">
      <div className="container mx-auto px-4">
        <div
          ref={headerRef}
          className={`text-center mb-16 transition-all duration-1000 ${
            headerVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <h2
            className="text-4xl md:text-5xl font-bold text-deepBlue mb-4"
            style={{ fontFamily: "'Roboto', sans-serif" }}
          >
            Our Services
          </h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Comprehensive spiritual guidance tailored to your unique journey
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <ServiceCard key={service.id} {...service} delay={index * 100} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/services"
            className="inline-block bg-goldAccent text-white px-8 py-3 rounded-lg font-semibold hover:bg-goldAccent/90 transition-all duration-300 hover:scale-105 shadow-lg"
            style={{ fontFamily: "'Roboto', sans-serif" }}
          >
            View All Services
          </Link>
        </div>
      </div>
    </section>
  );
}

function ServiceCard({
  icon,
  name,
  description,
  delay,
}: {
  icon: string;
  name: string;
  description: string;
  delay: number;
}) {
  const { ref, isVisible } = useScrollReveal();

  return (
    <div
      ref={ref}
      className={`bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-500 hover:scale-105 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-goldAccent/10 p-3 flex items-center justify-center">
        <img src={icon} alt={name} className="w-full h-full object-contain" />
      </div>
      <h3
        className="text-xl font-bold text-deepBlue text-center mb-3"
        style={{ fontFamily: "'Roboto', sans-serif" }}
      >
        {name}
      </h3>
      <p className="text-gray-700 text-center leading-relaxed text-sm">
        {description}
      </p>
    </div>
  );
}
