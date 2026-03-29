import { CheckCircle2 } from "lucide-react";
import { useState } from "react";
import BookingForm from "../components/BookingForm";
import PaymentPlaceholder from "../components/PaymentPlaceholder";
import { useScrollReveal } from "../hooks/useScrollReveal";

export default function BookConsultation() {
  const [isSubmitted, setIsSubmitted] = useState(false);
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
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-deepBlue mb-6">
              Book Your Consultation
            </h1>
            <p className="text-xl text-gray-700 leading-relaxed">
              Take the first step toward spiritual clarity and transformation
            </p>
          </div>
        </div>
      </section>

      {/* Booking Form Section */}
      <section className="py-16 bg-beigeBackground">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {!isSubmitted ? (
              <>
                <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                  <h2 className="font-serif text-3xl font-bold text-deepBlue mb-6">
                    Consultation Details
                  </h2>
                  <div className="space-y-4 text-gray-700 mb-8">
                    <p className="leading-relaxed">
                      Our consultations are conducted online via video call,
                      making spiritual guidance accessible from anywhere in the
                      world. Each session is personalized to your unique needs
                      and questions.
                    </p>
                    <div className="bg-goldAccent/10 border-l-4 border-goldAccent p-4 rounded">
                      <p className="font-semibold text-deepBlue mb-2">
                        What to Expect:
                      </p>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        <li>
                          Personalized analysis based on your birth details
                        </li>
                        <li>Detailed insights and recommendations</li>
                        <li>Written report sent after consultation</li>
                        <li>Follow-up support via email</li>
                      </ul>
                    </div>
                  </div>
                  <BookingForm onSuccess={() => setIsSubmitted(true)} />
                </div>
                <PaymentPlaceholder />
              </>
            ) : (
              <div className="bg-white rounded-lg shadow-lg p-12 text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-12 h-12 text-green-600" />
                </div>
                <h2 className="font-serif text-3xl font-bold text-deepBlue mb-4">
                  Booking Request Received!
                </h2>
                <p className="text-xl text-gray-700 mb-6 leading-relaxed">
                  Thank you for choosing Veda Healar. We have received your
                  consultation request.
                </p>
                <div className="bg-beigeBackground p-6 rounded-lg mb-8">
                  <p className="text-gray-700 leading-relaxed">
                    Our team will review your request and contact you within 24
                    hours to confirm your appointment time and share payment
                    details. Please check your email (including spam folder) for
                    our response.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="text-goldAccent hover:text-goldAccent/80 font-semibold transition-colors"
                >
                  Book Another Consultation
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
