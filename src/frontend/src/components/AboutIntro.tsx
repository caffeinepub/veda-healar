import { Check } from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollReveal";

export default function AboutIntro() {
  const { ref, isVisible } = useScrollReveal();

  const checklistItems = [
    "Numerology & predictive analysis",
    "Name, number & object alignment",
    "Energy, sound & trauma healing",
    "Vedic switch words and intention work",
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div
          ref={ref}
          className={`max-w-6xl mx-auto transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Left: Portrait Image */}
            <div className="flex justify-center md:justify-start">
              <img
                src="/assets/generated/spiritual-healer-portrait.dim_600x800.jpg"
                alt="Spiritual Healer"
                className="w-full max-w-md object-cover rounded-lg shadow-2xl"
              />
            </div>

            {/* Right: Philosophy Content */}
            <div className="flex flex-col justify-center">
              <h3
                className="text-3xl md:text-4xl font-bold text-deepBlue mb-6"
                style={{ fontFamily: "'Roboto Slab', serif" }}
              >
                Our Core Philosophy
              </h3>

              <p className="text-gray-700 leading-relaxed mb-4">
                Everything in the universe vibrates with energy — numbers,
                names, sounds, objects, and even emotions. When these energies
                are aligned, life flows with ease.
              </p>

              <p className="text-gray-700 leading-relaxed mb-6">
                At VedaHealer, we identify energetic imbalances and correct them
                through:
              </p>

              <ul className="space-y-3 mb-6">
                {checklistItems.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ backgroundColor: "#E6B65C" }}
                    >
                      <Check className="w-4 h-4 text-white" strokeWidth={3} />
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>

              <p className="text-gray-700 leading-relaxed">
                Our goal is not fear-based prediction, but clarity, empowerment,
                and conscious transformation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
