import { Link } from "@tanstack/react-router";
import { useScrollReveal } from "../hooks/useScrollReveal";

const categories = [
  {
    id: "healing-services",
    name: "Healing Services",
    icon: "/assets/generated/service-reiki.dim_256x256.png",
    description:
      "Restore balance and harmony through powerful energy healing and Vedic healing traditions.",
  },
  {
    id: "numerology-services",
    name: "Numerology Services",
    icon: "/assets/generated/service-numerology.dim_256x256.png",
    description:
      "Unlock the cosmic blueprint of your life through the science of numbers.",
  },
  {
    id: "customized-services",
    name: "Customized Services",
    icon: "/assets/generated/service-business.dim_256x256.png",
    description:
      "Personalized consultations combining healing and numerology tailored to your unique needs.",
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

        <div className="grid sm:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {categories.map((cat, index) => (
            <ServiceCard key={cat.id} {...cat} delay={index * 100} />
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
      className={`bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-500 hover:scale-105 flex flex-col ${
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
      <p className="text-gray-700 text-center leading-relaxed text-sm flex-1 mb-4">
        {description}
      </p>
      <Link
        to="/services/$categoryId"
        params={{ categoryId: id }}
        data-ocid={`services.${id}.button`}
        className="block text-center bg-goldAccent text-white px-5 py-2 rounded-lg font-semibold text-sm hover:bg-goldAccent/90 transition-all duration-300 hover:scale-105 shadow"
        style={{ fontFamily: "'Roboto', sans-serif" }}
      >
        View All {name}
      </Link>
    </div>
  );
}
