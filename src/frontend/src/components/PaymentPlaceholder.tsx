import { CreditCard, Shield } from "lucide-react";

export default function PaymentPlaceholder() {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8 border-2 border-goldAccent/20">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-goldAccent/10 rounded-full flex items-center justify-center">
          <Shield className="w-6 h-6 text-goldAccent" />
        </div>
        <h3 className="font-serif text-2xl font-bold text-deepBlue">
          Secure Payment
        </h3>
      </div>

      <div className="bg-beigeBackground p-6 rounded-lg mb-6">
        <p className="text-gray-700 leading-relaxed mb-4">
          Payment details will be shared after we confirm your consultation
          appointment. We accept multiple payment methods for your convenience:
        </p>
        <div className="flex flex-wrap gap-4 items-center justify-center">
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
            <CreditCard className="w-5 h-5 text-goldAccent" />
            <span className="text-sm font-semibold text-deepBlue">
              Razorpay
            </span>
          </div>
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
            <CreditCard className="w-5 h-5 text-goldAccent" />
            <span className="text-sm font-semibold text-deepBlue">Stripe</span>
          </div>
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
            <CreditCard className="w-5 h-5 text-goldAccent" />
            <span className="text-sm font-semibold text-deepBlue">UPI</span>
          </div>
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
            <CreditCard className="w-5 h-5 text-goldAccent" />
            <span className="text-sm font-semibold text-deepBlue">
              Bank Transfer
            </span>
          </div>
        </div>
      </div>

      <div className="text-center text-sm text-gray-600">
        <p className="flex items-center justify-center gap-2">
          <Shield className="w-4 h-4 text-green-600" />
          All transactions are secure and encrypted
        </p>
      </div>

      {/* Future integration structure (commented for reference) */}
      {/* 
      interface PaymentIntegrationProps {
        amount: number;
        currency: string;
        onSuccess: (paymentId: string) => void;
        onError: (error: Error) => void;
      }
      
      // Razorpay integration example:
      // const handleRazorpayPayment = () => {
      //   const options = {
      //     key: 'YOUR_RAZORPAY_KEY',
      //     amount: amount * 100, // Amount in paise
      //     currency: currency,
      //     name: 'Veda Healar',
      //     description: 'Consultation Booking',
      //     handler: (response) => onSuccess(response.razorpay_payment_id),
      //   };
      //   const rzp = new Razorpay(options);
      //   rzp.open();
      // };
      */}
    </div>
  );
}
