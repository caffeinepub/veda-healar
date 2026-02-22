import { Link } from '@tanstack/react-router';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Priya Sharma',
    service: 'Numerology Reading',
    text: 'The numerology reading was incredibly accurate and insightful. It helped me understand my life path and make important career decisions with confidence. Highly recommended!',
    rating: 5,
  },
  {
    name: 'Rajesh Kumar',
    service: 'Business Name Analysis',
    text: 'After getting my business name analyzed and corrected, I noticed a significant positive shift in my ventures. The guidance was practical and rooted in deep wisdom.',
    rating: 5,
  },
  {
    name: 'Anita Desai',
    service: 'Reiki Healing',
    text: 'The Reiki session was transformative. I felt a deep sense of peace and clarity that I had been seeking for months. The energy work truly made a difference.',
    rating: 5,
  },
  {
    name: 'Vikram Patel',
    service: 'Name Correction',
    text: 'Changing my name spelling as suggested has brought remarkable positive changes in my personal and professional life. The cosmic alignment is real!',
    rating: 5,
  },
  {
    name: 'Meera Reddy',
    service: 'Lucky Number Selection',
    text: 'Using my lucky numbers for important dates and decisions has been a game-changer. The consultation was detailed and the results speak for themselves.',
    rating: 5,
  },
  {
    name: 'Arjun Singh',
    service: 'Numerology Reading',
    text: 'The depth of knowledge and spiritual insight provided during my reading was exceptional. It gave me clarity on my relationships and life purpose.',
    rating: 5,
  },
];

export default function Testimonials() {
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
              headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-deepBlue mb-6">
              Client Testimonials
            </h1>
            <p className="text-xl text-gray-700 leading-relaxed">
              Real experiences from souls we've had the privilege to guide
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-16 bg-beigeBackground">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} delay={index * 100} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-4xl font-bold text-deepBlue mb-6">
              Begin Your Transformation
            </h2>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              Join hundreds of satisfied clients who have discovered their true path
            </p>
            <Link
              to="/book"
              className="inline-block bg-goldAccent text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-goldAccent/90 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Book Your Consultation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function TestimonialCard({
  name,
  service,
  text,
  rating,
  delay,
}: {
  name: string;
  service: string;
  text: string;
  rating: number;
  delay: number;
}) {
  const { ref, isVisible } = useScrollReveal();

  return (
    <div
      ref={ref}
      className={`bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex items-center justify-between mb-4">
        <Quote className="w-8 h-8 text-goldAccent/30" />
        <div className="flex gap-1">
          {Array.from({ length: rating }).map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-goldAccent text-goldAccent" />
          ))}
        </div>
      </div>
      <p className="text-gray-700 leading-relaxed mb-6 italic">"{text}"</p>
      <div className="border-t border-gray-200 pt-4">
        <p className="font-semibold text-deepBlue">{name}</p>
        <p className="text-sm text-gray-600">{service}</p>
      </div>
    </div>
  );
}
