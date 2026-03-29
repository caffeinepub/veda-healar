import { Link, useLocation } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/services", label: "Services" },
    { path: "/testimonials", label: "Testimonials" },
    { path: "/contact", label: "Contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-lg" : "bg-white/95 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src="/assets/generated/logo.dim_400x400.png"
              alt="Veda Healar"
              className="h-12 w-12 object-contain transition-transform duration-300 group-hover:scale-110"
            />
            <span
              className="text-2xl font-bold text-deepBlue"
              style={{ fontFamily: "'Roboto', sans-serif" }}
            >
              Veda Healar
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-medium transition-colors duration-300 relative ${
                  isActive(link.path)
                    ? "text-goldAccent"
                    : "text-gray-700 hover:text-goldAccent"
                }`}
                data-ocid={`nav.${link.label.toLowerCase()}.link`}
              >
                {link.label}
                {isActive(link.path) && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-goldAccent" />
                )}
              </Link>
            ))}
            <Link
              to="/book"
              className="bg-goldAccent text-white px-6 py-2 rounded-lg font-semibold hover:bg-goldAccent/90 transition-all duration-300 hover:scale-105 shadow-md"
              style={{ fontFamily: "'Roboto', sans-serif" }}
              data-ocid="nav.book.button"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-deepBlue hover:text-goldAccent transition-colors"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="container mx-auto px-4 py-6 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block py-2 font-medium transition-colors ${
                  isActive(link.path)
                    ? "text-goldAccent"
                    : "text-gray-700 hover:text-goldAccent"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/book"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block bg-goldAccent text-white px-6 py-3 rounded-lg font-semibold text-center hover:bg-goldAccent/90 transition-all duration-300 shadow-md"
              style={{ fontFamily: "'Roboto', sans-serif" }}
            >
              Book Now
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
