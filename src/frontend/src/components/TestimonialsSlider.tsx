import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";

const testimonials = [
  {
    name: "Priya Sharma",
    service: "Numerology Reading",
    text: "The numerology reading was incredibly accurate and insightful. It helped me understand my life path and make important career decisions with confidence.",
    rating: 5,
  },
  {
    name: "Rajesh Kumar",
    service: "Business Name Analysis",
    text: "After getting my business name analyzed and corrected, I noticed a significant positive shift in my ventures. The guidance was practical and rooted in deep wisdom.",
    rating: 5,
  },
  {
    name: "Anita Desai",
    service: "Reiki Healing",
    text: "The Reiki session was transformative. I felt a deep sense of peace and clarity that I had been seeking for months. The energy work truly made a difference.",
    rating: 5,
  },
];

export default function TestimonialsSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { ref, isVisible } = useScrollReveal();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section className="py-20 bg-deepBlue relative overflow-hidden">
      {/* Mandala Background */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "url(/assets/generated/mandala-bg.dim_1920x1080.png)",
          backgroundSize: "800px",
          backgroundPosition: "center",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div
          ref={ref}
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "'Roboto', sans-serif" }}
          >
            What Our Clients Say
          </h2>
          <p className="text-xl text-beigeBackground/80 max-w-2xl mx-auto">
            Real transformations from souls we've guided
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-2xl p-8 md:p-12 relative">
            <Quote className="absolute top-6 left-6 w-12 h-12 text-goldAccent/20" />

            <div className="relative z-10">
              <div className="flex justify-center mb-4">
                {Array.from(
                  { length: testimonials[currentIndex].rating },
                  (_, i) => i + 1,
                ).map((starNum) => (
                  <Star
                    key={starNum}
                    className="w-6 h-6 fill-goldAccent text-goldAccent"
                  />
                ))}
              </div>

              <p className="text-xl text-gray-700 leading-relaxed mb-8 text-center italic">
                "{testimonials[currentIndex].text}"
              </p>

              <div className="text-center">
                <p
                  className="text-2xl font-bold text-deepBlue"
                  style={{ fontFamily: "'Roboto', sans-serif" }}
                >
                  {testimonials[currentIndex].name}
                </p>
                <p className="text-gray-600">
                  {testimonials[currentIndex].service}
                </p>
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              type="button"
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-goldAccent/10 hover:bg-goldAccent hover:text-white rounded-full flex items-center justify-center transition-all duration-300"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              type="button"
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-goldAccent/10 hover:bg-goldAccent hover:text-white rounded-full flex items-center justify-center transition-all duration-300"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((t, index) => (
              <button
                type="button"
                key={t.name}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "bg-goldAccent w-8" : "bg-white/30"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
