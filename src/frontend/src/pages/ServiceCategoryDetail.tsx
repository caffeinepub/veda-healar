import { Link } from "@tanstack/react-router";
import { useScrollReveal } from "../hooks/useScrollReveal";

const categoryData: Record<
  string,
  {
    name: string;
    description: string;
    services: { title: string; description: string }[];
  }
> = {
  "healing-services": {
    name: "Healing Services",
    description:
      "Experience transformative healing that restores balance to your mind, body, and spirit through powerful energy work and Vedic healing traditions.",
    services: [
      {
        title: "Reiki Healing",
        description:
          "Channel universal life-force energy to restore harmony and release energy blockages, promoting deep physical and emotional healing.",
      },
      {
        title: "Sound Healing",
        description:
          "Harness the therapeutic power of sacred sound vibrations to dissolve stress, align your energy centers, and restore inner harmony.",
      },
      {
        title: "Healing with Rudraksha",
        description:
          "Use the divine energies of Rudraksha beads to purify your aura, enhance spiritual protection, and promote holistic well-being.",
      },
      {
        title: "Crystal Healing",
        description:
          "Work with the natural vibrational frequencies of crystals to clear energy blockages, balance chakras, and amplify positive energy.",
      },
      {
        title: "Vedic Switchwords",
        description:
          "Unlock the power of ancient Vedic switchwords to reprogram your subconscious, shift energy patterns, and manifest your deepest desires.",
      },
      {
        title: "Energy Circles",
        description:
          "Harness the geometric power of sacred energy circles to amplify intentions, dissolve karmic patterns, and attract divine blessings.",
      },
      {
        title: "Aura Healing",
        description:
          "Cleanse and strengthen your energetic aura to shield you from negative influences, restore vitality, and elevate your overall well-being.",
      },
      {
        title: "Chakra Healing",
        description:
          "Balance and activate all seven chakras to remove energy blockages, harmonize your life force, and unlock your highest potential.",
      },
      {
        title: "Panchkosha Healing",
        description:
          "Work through all five layers of your being — physical, energetic, mental, wisdom, and bliss — for deep and lasting holistic transformation.",
      },
      {
        title: "Innerchild Healing",
        description:
          "Reconnect with and heal your inner child to release past wounds, dissolve limiting beliefs, and reclaim your innate joy and wholeness.",
      },
    ],
  },
  "numerology-services": {
    name: "Numerology Services",
    description:
      "Discover the hidden meanings in your numbers — from your birth date to your name — and unlock the cosmic blueprint of your life's journey.",
    services: [
      {
        title: "Mobile Numerology",
        description:
          "Discover how your mobile number's vibration influences your luck, communication, and opportunities in daily life.",
      },
      {
        title: "Name Numerology",
        description:
          "Analyze the vibrational frequency of your name and understand how it influences your personality, relationships, and destiny.",
      },
      {
        title: "Phonology",
        description:
          "Explore the sound vibrations of your spoken name and how they resonate with your birth chart to shape your life experiences.",
      },
      {
        title: "Prashna Answer Method",
        description:
          "Get precise answers to your burning questions using an ancient numerology-based divination technique that decodes cosmic timing.",
      },
      {
        title: "Wrist Watch Analysis",
        description:
          "Learn how the number on your watch face can subtly influence your daily energy, decision-making, and luck cycles.",
      },
      {
        title: "Astrology Insights",
        description:
          "Receive personalized astrological readings that reveal your cosmic blueprint, planetary influences, and the timing of key life events.",
      },
    ],
  },
  "customized-services": {
    name: "Customized Services",
    description:
      "Personalized consultations tailored specifically to your unique needs, combining multiple healing and numerology modalities for a holistic approach.",
    services: [
      {
        title: "Full Spiritual Consultation",
        description:
          "A comprehensive session covering your energy field, numerology profile, and personalized spiritual guidance for all areas of life.",
      },
      {
        title: "Business Name Analysis",
        description:
          "Ensure your business name carries the right vibration for success, prosperity, and alignment with your entrepreneurial vision.",
      },
      {
        title: "Name Correction",
        description:
          "Fine-tune or modify your name spelling to harmonize its numerological vibration with your birth chart for greater life flow.",
      },
      {
        title: "Combined Healing + Numerology Session",
        description:
          "The best of both worlds — a deeply integrative session blending energy healing with numerological insights for profound transformation.",
      },
      {
        title: "Personalized Remedy Plan",
        description:
          "Receive a tailored action plan with specific remedies, affirmations, colors, and practices to elevate your vibration and manifest your goals.",
      },
    ],
  },
};

export default function ServiceCategoryDetail({
  categoryId,
}: {
  categoryId: string;
}) {
  const category = categoryData[categoryId];
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal();

  if (!category) {
    return (
      <div className="min-h-screen pt-32 pb-16 flex flex-col items-center justify-center">
        <h1
          className="text-4xl font-bold text-deepBlue mb-6"
          style={{ fontFamily: "'Roboto', sans-serif" }}
        >
          Category Not Found
        </h1>
        <Link
          to="/services"
          className="bg-goldAccent text-white px-6 py-3 rounded-lg font-semibold hover:bg-goldAccent/90 transition-all"
        >
          ← Back to Services
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Header */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-b from-deepBlue/5 to-transparent">
        <div className="container mx-auto px-4">
          <div
            ref={headerRef}
            className={`text-center max-w-3xl mx-auto transition-all duration-1000 ${
              headerVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <Link
              to="/services"
              data-ocid="category.back_button"
              className="inline-flex items-center gap-2 text-goldAccent hover:text-goldAccent/80 font-semibold mb-8 transition-colors"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              ← Back to Services
            </Link>
            <h1
              className="text-5xl md:text-6xl font-bold text-deepBlue mb-6"
              style={{ fontFamily: "'Roboto', sans-serif" }}
            >
              {category.name}
            </h1>
            <p
              className="text-xl text-gray-700 leading-relaxed"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              {category.description}
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-beigeBackground">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {category.services.map((service, index) => (
              <ServiceDetailCard
                key={service.title}
                title={service.title}
                description={service.description}
                delay={index * 100}
                index={index + 1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2
            className="text-4xl font-bold text-deepBlue mb-6"
            style={{ fontFamily: "'Roboto', sans-serif" }}
          >
            Ready to Start?
          </h2>
          <p
            className="text-xl text-gray-700 mb-8"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Book your {category.name} session today
          </p>
          <Link
            to="/book"
            data-ocid="category.book_button"
            className="inline-block bg-goldAccent text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-goldAccent/90 transition-all duration-300 hover:scale-105 shadow-lg"
            style={{ fontFamily: "'Roboto', sans-serif" }}
          >
            Book Your Consultation
          </Link>
        </div>
      </section>
    </div>
  );
}

function ServiceDetailCard({
  title,
  description,
  delay,
  index,
}: {
  title: string;
  description: string;
  delay: number;
  index: number;
}) {
  const { ref, isVisible } = useScrollReveal();

  return (
    <div
      ref={ref}
      data-ocid={`service.item.${index}`}
      className={`bg-white rounded-xl shadow-lg p-8 flex flex-col hover:shadow-2xl transition-all duration-500 hover:scale-105 border-t-4 border-goldAccent ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <h3
        className="text-xl font-bold text-deepBlue mb-3"
        style={{ fontFamily: "'Roboto', sans-serif" }}
      >
        {title}
      </h3>
      <p
        className="text-gray-700 leading-relaxed text-sm flex-1 mb-6"
        style={{ fontFamily: "'Poppins', sans-serif" }}
      >
        {description}
      </p>
      <Link
        to="/book"
        data-ocid={`service.book_button.${index}`}
        className="inline-block bg-goldAccent text-white text-center px-5 py-2 rounded-lg font-semibold text-sm hover:bg-goldAccent/90 transition-all duration-300 hover:scale-105 shadow"
        style={{ fontFamily: "'Roboto', sans-serif" }}
      >
        Book Now
      </Link>
    </div>
  );
}
