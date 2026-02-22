import { Link } from '@tanstack/react-router';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Mail, MapPin, Phone, Clock } from 'lucide-react';
import { SiFacebook, SiInstagram, SiYoutube } from 'react-icons/si';

export default function Contact() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal();
  const { ref: contentRef, isVisible: contentVisible } = useScrollReveal();

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
              Get In Touch
            </h1>
            <p className="text-xl text-gray-700 leading-relaxed">
              We're here to guide you on your spiritual journey
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-beigeBackground">
        <div className="container mx-auto px-4">
          <div
            ref={contentRef}
            className={`max-w-5xl mx-auto transition-all duration-1000 delay-200 ${
              contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="grid md:grid-cols-2 gap-8">
              {/* Contact Details */}
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="font-serif text-3xl font-bold text-deepBlue mb-8">
                  Contact Information
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-goldAccent/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-goldAccent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-deepBlue mb-1">Location</h3>
                      <p className="text-gray-700">
                        Serving clients worldwide through online consultations
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-goldAccent/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-goldAccent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-deepBlue mb-1">WhatsApp</h3>
                      <a
                        href="https://wa.me/917096912557"
                        className="text-goldAccent hover:text-goldAccent/80 transition-colors"
                      >
                        +91 7096912557
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-goldAccent/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-goldAccent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-deepBlue mb-1">Email</h3>
                      <a
                        href="mailto:contact@vedahealar.com"
                        className="text-goldAccent hover:text-goldAccent/80 transition-colors"
                      >
                        contact@vedahealar.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-goldAccent/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-goldAccent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-deepBlue mb-1">Availability</h3>
                      <p className="text-gray-700">
                        Monday - Saturday: 10:00 AM - 7:00 PM IST
                        <br />
                        Sunday: By appointment only
                      </p>
                    </div>
                  </div>
                </div>

                {/* Social Media */}
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h3 className="font-semibold text-deepBlue mb-4">Follow Us</h3>
                  <div className="flex gap-4">
                    <a
                      href="#"
                      className="w-10 h-10 bg-goldAccent/10 rounded-full flex items-center justify-center hover:bg-goldAccent hover:text-white transition-all duration-300"
                    >
                      <SiFacebook className="w-5 h-5" />
                    </a>
                    <a
                      href="#"
                      className="w-10 h-10 bg-goldAccent/10 rounded-full flex items-center justify-center hover:bg-goldAccent hover:text-white transition-all duration-300"
                    >
                      <SiInstagram className="w-5 h-5" />
                    </a>
                    <a
                      href="#"
                      className="w-10 h-10 bg-goldAccent/10 rounded-full flex items-center justify-center hover:bg-goldAccent hover:text-white transition-all duration-300"
                    >
                      <SiYoutube className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Quick Message Form */}
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="font-serif text-3xl font-bold text-deepBlue mb-8">
                  Send a Message
                </h2>
                <form className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-deepBlue mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-goldAccent focus:border-transparent"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-deepBlue mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-goldAccent focus:border-transparent"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-deepBlue mb-2">
                      Message
                    </label>
                    <textarea
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-goldAccent focus:border-transparent resize-none"
                      placeholder="How can we help you?"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-goldAccent text-white px-6 py-3 rounded-lg font-semibold hover:bg-goldAccent/90 transition-all duration-300 hover:scale-105 shadow-lg"
                  >
                    Send Message
                  </button>
                </form>
                <p className="text-sm text-gray-600 mt-4 text-center">
                  For consultation bookings, please use our{' '}
                  <Link to="/book" className="text-goldAccent hover:underline">
                    booking form
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
