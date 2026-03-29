import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { SiFacebook, SiInstagram, SiYoutube } from "react-icons/si";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const appIdentifier =
    typeof window !== "undefined" ? window.location.hostname : "veda-healar";

  return (
    <footer className="bg-deepBlue text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div>
            <div className="mb-4">
              <span
                className="text-2xl font-bold text-yellow-400"
                style={{ fontFamily: "'Roboto', sans-serif" }}
              >
                VedaHealar
              </span>
            </div>
            <p className="text-beigeBackground/80 leading-relaxed">
              Bridging ancient Vedic wisdom with modern spiritual guidance for
              transformation and enlightenment.
            </p>
          </div>

          {/* Contact Section */}
          <div>
            <h3
              className="text-xl font-bold text-goldAccent mb-4"
              style={{ fontFamily: "'Roboto', sans-serif" }}
            >
              Contact Us
            </h3>
            <div className="space-y-2 text-beigeBackground/80">
              <p>Serving clients worldwide through online consultations</p>
              <p>
                <a
                  href="mailto:contact@vedahealar.com"
                  className="hover:text-goldAccent transition-colors"
                >
                  contact@vedahealar.com
                </a>
              </p>
              <p>
                <a
                  href="https://wa.me/917096912557"
                  className="hover:text-goldAccent transition-colors"
                >
                  WhatsApp: +91 7096912557
                </a>
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3
              className="text-xl font-bold text-goldAccent mb-4"
              style={{ fontFamily: "'Roboto', sans-serif" }}
            >
              Quick Links
            </h3>
            <div className="space-y-2">
              <Link
                to="/"
                className="block text-beigeBackground/80 hover:text-goldAccent transition-colors"
              >
                Home
              </Link>
              <Link
                to="/about"
                className="block text-beigeBackground/80 hover:text-goldAccent transition-colors"
              >
                About
              </Link>
              <Link
                to="/services"
                className="block text-beigeBackground/80 hover:text-goldAccent transition-colors"
              >
                Services
              </Link>
              <Link
                to="/testimonials"
                className="block text-beigeBackground/80 hover:text-goldAccent transition-colors"
              >
                Testimonials
              </Link>
              <Link
                to="/contact"
                className="block text-beigeBackground/80 hover:text-goldAccent transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="border-t border-white/10 pt-8 mb-8">
          <div className="flex justify-center gap-6">
            <a
              href="https://www.facebook.com/vedahealar"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-goldAccent transition-all duration-300"
            >
              <SiFacebook className="w-6 h-6" />
            </a>
            <a
              href="https://www.instagram.com/vedahealar/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-goldAccent transition-all duration-300"
            >
              <SiInstagram className="w-6 h-6" />
            </a>
            <a
              href="https://www.youtube.com/@vedahealar"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-goldAccent transition-all duration-300"
            >
              <SiYoutube className="w-6 h-6" />
            </a>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="border-t border-white/10 pt-8 mb-8">
          <p className="text-center text-beigeBackground/70 italic text-sm max-w-3xl mx-auto">
            All services are spiritual guidance based and not medical, legal or
            financial advice.
          </p>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-beigeBackground/70">
            <p>© {currentYear} VedaHealar. All rights reserved.</p>
            <p className="flex items-center gap-2">
              Built with{" "}
              <Heart className="w-4 h-4 text-goldAccent fill-goldAccent" />{" "}
              using{" "}
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                  appIdentifier,
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-goldAccent hover:underline"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
