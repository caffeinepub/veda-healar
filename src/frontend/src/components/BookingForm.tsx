import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

interface BookingFormProps {
  onSuccess: () => void;
}

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  preferredDate: string;
  preferredTime: string;
  service: string;
  message: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  preferredDate?: string;
  preferredTime?: string;
  service?: string;
}

const services = [
  { id: 'numerology', name: 'Numerology Reading' },
  { id: 'name-correction', name: 'Name Correction' },
  { id: 'lucky-number', name: 'Lucky Number Selection' },
  { id: 'reiki-healing', name: 'Reiki & Energy Healing' },
  { id: 'business-name', name: 'Business Name Analysis' },
];

export default function BookingForm({ onSuccess }: BookingFormProps) {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    preferredDate: '',
    preferredTime: '',
    service: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const submitMutation = useMutation({
    mutationFn: async (data: FormData) => {
      // Google Apps Script Web App URL
      const scriptUrl = 'https://script.google.com/macros/s/AKfycbyNX8QzL8z7as3uaxUlXylX62hNZ4kx7Pt32mQKe9b1HSZCgD0fRgb2CicRVH7qQabvQQ/exec';
      
      const response = await fetch(scriptUrl, {
        method: 'POST',
        mode: 'no-cors', // Required for Google Apps Script
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.fullName,
          email: data.email,
          phone: data.phone,
          date: data.preferredDate,
          time: data.preferredTime,
          service: data.service,
          message: data.message,
          timestamp: new Date().toISOString(),
        }),
      });

      // Note: With no-cors mode, we can't read the response
      // We assume success if no error is thrown
      return { success: true };
    },
    onSuccess: () => {
      toast.success('Booking request submitted successfully! We will contact you soon.');
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        preferredDate: '',
        preferredTime: '',
        service: '',
        message: '',
      });
      onSuccess();
    },
    onError: (error) => {
      console.error('Submission error:', error);
      toast.error('Failed to submit booking. Please try contacting us via WhatsApp.');
    },
  });

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    const phoneRegex = /^\d{10}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    if (!formData.preferredDate) {
      newErrors.preferredDate = 'Preferred date is required';
    } else {
      const selectedDate = new Date(formData.preferredDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        newErrors.preferredDate = 'Please select a future date';
      }
    }

    if (!formData.preferredTime) {
      newErrors.preferredTime = 'Preferred time is required';
    }

    if (!formData.service) {
      newErrors.service = 'Please select a service';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      submitMutation.mutate(formData);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Full Name */}
      <div>
        <label htmlFor="fullName" className="block text-sm font-semibold text-deepBlue mb-2">
          Full Name *
        </label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-goldAccent focus:border-transparent ${
            errors.fullName ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Enter your full name"
        />
        {errors.fullName && (
          <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-deepBlue mb-2">
          Email Address *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-goldAccent focus:border-transparent ${
            errors.email ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="your@email.com"
        />
        {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className="block text-sm font-semibold text-deepBlue mb-2">
          Phone Number *
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-goldAccent focus:border-transparent ${
            errors.phone ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="10-digit phone number"
        />
        {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
      </div>

      {/* Preferred Date */}
      <div>
        <label htmlFor="preferredDate" className="block text-sm font-semibold text-deepBlue mb-2">
          Preferred Consultation Date *
        </label>
        <input
          type="date"
          id="preferredDate"
          name="preferredDate"
          value={formData.preferredDate}
          onChange={handleChange}
          min={new Date().toISOString().split('T')[0]}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-goldAccent focus:border-transparent ${
            errors.preferredDate ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.preferredDate && (
          <p className="mt-1 text-sm text-red-500">{errors.preferredDate}</p>
        )}
      </div>

      {/* Preferred Time */}
      <div>
        <label htmlFor="preferredTime" className="block text-sm font-semibold text-deepBlue mb-2">
          Preferred Consultation Time *
        </label>
        <input
          type="time"
          id="preferredTime"
          name="preferredTime"
          value={formData.preferredTime}
          onChange={handleChange}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-goldAccent focus:border-transparent ${
            errors.preferredTime ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.preferredTime && (
          <p className="mt-1 text-sm text-red-500">{errors.preferredTime}</p>
        )}
      </div>

      {/* Service Selection */}
      <div>
        <label htmlFor="service" className="block text-sm font-semibold text-deepBlue mb-2">
          Select Service *
        </label>
        <select
          id="service"
          name="service"
          value={formData.service}
          onChange={handleChange}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-goldAccent focus:border-transparent ${
            errors.service ? 'border-red-500' : 'border-gray-300'
          }`}
        >
          <option value="">Choose a service...</option>
          {services.map((service) => (
            <option key={service.id} value={service.name}>
              {service.name}
            </option>
          ))}
        </select>
        {errors.service && <p className="mt-1 text-sm text-red-500">{errors.service}</p>}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-deepBlue mb-2">
          Additional Message (Optional)
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-goldAccent focus:border-transparent resize-none"
          placeholder="Tell us more about your requirements..."
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={submitMutation.isPending}
        className="w-full bg-goldAccent text-white px-6 py-4 rounded-lg font-semibold text-lg hover:bg-goldAccent/90 transition-all duration-300 hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
      >
        {submitMutation.isPending ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Submitting...
          </>
        ) : (
          'Book Consultation'
        )}
      </button>

      <p className="text-sm text-gray-600 text-center">
        By submitting this form, you agree to be contacted regarding your consultation request.
      </p>
    </form>
  );
}
