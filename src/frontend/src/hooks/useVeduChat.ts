import { useState } from "react";
import { toast } from "sonner";
import { useVeduQueries } from "./useQueries";

interface BookingData {
  name?: string;
  email?: string;
  phone?: string;
  date?: string;
  time?: string;
  service?: string;
  message?: string;
}

interface UseVeduChatProps {
  onBotResponse: (response: string) => void;
}

export function useVeduChat({ onBotResponse }: UseVeduChatProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [bookingData, setBookingData] = useState<BookingData>({});
  const [bookingStep, setBookingStep] = useState<number>(-1);
  const [userId] = useState(
    () => `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
  );

  const { startBookingSession, processBookingResponse } = useVeduQueries();

  const services = [
    "Numerology Reading",
    "Name Correction",
    "Lucky Number Selection",
    "Reiki & Energy Healing",
    "Business Name Analysis",
  ];

  const bookingQuestions = [
    { key: "name", question: "What is your name?" },
    { key: "email", question: "Can you please share your email address?" },
    { key: "phone", question: "Could you provide your phone number?" },
    {
      key: "date",
      question:
        "When would you like to schedule your appointment? (Please provide the date in YYYY-MM-DD format)",
    },
    {
      key: "time",
      question:
        "What time would you prefer? (Please provide time in HH:MM format, e.g., 14:30)",
    },
    {
      key: "service",
      question: `Which service are you interested in? Please choose from:\n${services.map((s, i) => `${i + 1}. ${s}`).join("\n")}`,
    },
    {
      key: "message",
      question:
        "Is there anything specific you would like to address during the consultation? (Optional - you can skip this)",
    },
  ];

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone.replace(/\D/g, ""));
  };

  const validateDate = (date: string): boolean => {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) return false;
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selectedDate >= today;
  };

  const validateTime = (time: string): boolean => {
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    return timeRegex.test(time);
  };

  const submitBookingToGoogleSheets = async (data: BookingData) => {
    try {
      const scriptUrl =
        "https://script.google.com/macros/s/AKfycbyNX8QzL8z7as3uaxUlXylX62hNZ4kx7Pt32mQKe9b1HSZCgD0fRgb2CicRVH7qQabvQQ/exec";

      await fetch(scriptUrl, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,
          date: data.date,
          time: data.time,
          service: data.service,
          message: data.message || "",
          timestamp: new Date().toISOString(),
        }),
      });

      return true;
    } catch (error) {
      console.error("Booking submission error:", error);
      return false;
    }
  };

  const handleBookingFlow = async (userInputParam: string) => {
    let userInput = userInputParam;
    const currentQuestion = bookingQuestions[bookingStep];

    if (!currentQuestion) {
      return "Something went wrong. Let me restart the booking process.";
    }

    const key = currentQuestion.key as keyof BookingData;
    let validationError = "";

    // Validate input based on the current step
    switch (key) {
      case "name":
        if (userInput.trim().length < 2) {
          validationError =
            "Please provide a valid name with at least 2 characters.";
        }
        break;
      case "email":
        if (!validateEmail(userInput)) {
          validationError =
            "Please provide a valid email address (e.g., name@example.com).";
        }
        break;
      case "phone":
        if (!validatePhone(userInput)) {
          validationError = "Please provide a valid 10-digit phone number.";
        }
        break;
      case "date":
        if (!validateDate(userInput)) {
          validationError =
            "Please provide a valid future date in YYYY-MM-DD format (e.g., 2026-03-15).";
        }
        break;
      case "time":
        if (!validateTime(userInput)) {
          validationError =
            "Please provide a valid time in HH:MM format (e.g., 14:30).";
        }
        break;
      case "service": {
        const serviceIndex = Number.parseInt(userInput) - 1;
        if (serviceIndex >= 0 && serviceIndex < services.length) {
          userInput = services[serviceIndex];
        } else if (
          !services.some((s) =>
            s.toLowerCase().includes(userInput.toLowerCase()),
          )
        ) {
          validationError = `Please choose a valid service number (1-${services.length}) or name.`;
        }
        break;
      }
      case "message": {
        // Message is optional, allow skip
        if (
          userInput.toLowerCase().includes("skip") ||
          userInput.toLowerCase().includes("no")
        ) {
          userInput = "";
        }
        break;
      }
    }

    if (validationError) {
      return `${validationError}\n\n${currentQuestion.question}`;
    }

    // Store the validated data
    const updatedBookingData = { ...bookingData, [key]: userInput };
    setBookingData(updatedBookingData);

    // Process with backend
    try {
      await processBookingResponse.mutateAsync({
        userId,
        response: userInput,
      });
    } catch (error) {
      console.error("Backend processing error:", error);
    }

    // Move to next step
    const nextStep = bookingStep + 1;
    setBookingStep(nextStep);

    // Check if booking is complete
    if (nextStep >= bookingQuestions.length) {
      const success = await submitBookingToGoogleSheets(updatedBookingData);

      if (success) {
        setBookingStep(-1);
        setBookingData({});
        return `Perfect! Your booking request has been submitted successfully. 🎉\n\nHere's a summary:\n• Name: ${updatedBookingData.name}\n• Email: ${updatedBookingData.email}\n• Phone: ${updatedBookingData.phone}\n• Date: ${updatedBookingData.date}\n• Time: ${updatedBookingData.time}\n• Service: ${updatedBookingData.service}\n\nWe will contact you soon to confirm your appointment. Is there anything else I can help you with?`;
      }
      setBookingStep(-1);
      setBookingData({});
      return "I encountered an issue submitting your booking. Please try contacting us via WhatsApp or phone at 7096912557. How else can I assist you?";
    }

    // Ask next question
    return bookingQuestions[nextStep].question;
  };

  const getServiceInfo = (serviceName: string): string => {
    const serviceDetails: { [key: string]: string } = {
      numerology:
        "Numerology Reading analyzes your birth chart and numbers to provide insights into your life path, strengths, challenges, and opportunities. Our comprehensive consultation is priced at ₹5,799 and includes a detailed report. Would you like to book a session?",
      "name correction":
        "Name Correction service helps align your name with favorable numerological vibrations. We analyze your current name and suggest corrections that can bring positive energy. Pricing ranges from ₹2,500 to ₹9,000 depending on complexity. Interested in learning more?",
      "lucky number":
        "Lucky Number Selection identifies the most auspicious numbers for you based on your birth details and numerological chart. These numbers can be used for important decisions, dates, and more. Would you like to discover your lucky numbers?",
      reiki:
        "Reiki & Energy Healing sessions promote deep relaxation, stress reduction, and energy balance. Our experienced practitioners help clear energy blockages and restore harmony. Sessions are priced at ₹1,999. Would you like to schedule a healing session?",
      "business name":
        "Business Name Analysis evaluates your business name for numerological compatibility and success potential. We provide recommendations for optimal business names that align with prosperity. Pricing ranges from ₹2,500 to ₹9,000. Shall we analyze your business name?",
    };

    for (const [key, info] of Object.entries(serviceDetails)) {
      if (serviceName.toLowerCase().includes(key)) {
        return info;
      }
    }

    return "We offer five main services:\n\n1. Numerology Reading (₹5,799)\n2. Name Correction (₹2,500 - ₹9,000)\n3. Lucky Number Selection\n4. Reiki & Energy Healing (₹1,999)\n5. Business Name Analysis (₹2,500 - ₹9,000)\n\nWhich service would you like to know more about?";
  };

  const sendMessage = async (message: string) => {
    setIsProcessing(true);

    try {
      // If in booking flow, continue with booking questions
      if (bookingStep >= 0) {
        const response = await handleBookingFlow(message);
        onBotResponse(response);
        setIsProcessing(false);
        return;
      }

      const lowerMessage = message.toLowerCase();

      // Check for booking intent
      if (
        lowerMessage.includes("book") ||
        lowerMessage.includes("appointment") ||
        lowerMessage.includes("schedule") ||
        lowerMessage.includes("consultation")
      ) {
        try {
          await startBookingSession.mutateAsync(userId);
          setBookingStep(0);
          onBotResponse(
            `Great! I'll help you book an appointment. Let me gather some information.\n\n${bookingQuestions[0].question}`,
          );
        } catch (error) {
          console.error("Failed to start booking session:", error);
          onBotResponse(
            `I'd be happy to help you book an appointment! Let's get started.\n\n${bookingQuestions[0].question}`,
          );
          setBookingStep(0);
        }
      }
      // Check for service information requests
      else if (
        lowerMessage.includes("service") ||
        lowerMessage.includes("numerology") ||
        lowerMessage.includes("reiki") ||
        lowerMessage.includes("name correction") ||
        lowerMessage.includes("lucky number") ||
        lowerMessage.includes("business name")
      ) {
        const response = getServiceInfo(lowerMessage);
        onBotResponse(response);
      }
      // Check for pricing information
      else if (
        lowerMessage.includes("price") ||
        lowerMessage.includes("cost") ||
        lowerMessage.includes("fee")
      ) {
        onBotResponse(
          "Here's our pricing:\n\n" +
            "• Numerology Reading: ₹5,799\n" +
            "• Reiki & Energy Healing: ₹1,999\n" +
            "• Name Correction: ₹2,500 - ₹9,000\n" +
            "• Business Name Analysis: ₹2,500 - ₹9,000\n" +
            "• Lucky Number Selection: Contact for pricing\n\n" +
            "Would you like to book a consultation?",
        );
      }
      // General help
      else if (
        lowerMessage.includes("help") ||
        lowerMessage.includes("what can you do")
      ) {
        onBotResponse(
          "I can help you with:\n\n" +
            "• Learning about our Vedic services (Numerology, Reiki, Name Correction, Lucky Numbers, Business Name Analysis)\n" +
            "• Providing pricing information\n" +
            "• Booking appointments\n" +
            "• Answering questions about consultations\n\n" +
            "What would you like to know more about?",
        );
      }
      // Contact information
      else if (
        lowerMessage.includes("contact") ||
        lowerMessage.includes("phone") ||
        lowerMessage.includes("whatsapp")
      ) {
        onBotResponse(
          "You can reach us at:\n\n" +
            "📱 Phone/WhatsApp: +91 7096912557\n" +
            "📧 Email: Available on our contact page\n" +
            "📍 Instagram: @vedahealar\n\n" +
            "Would you like to book an appointment?",
        );
      }
      // Default response
      else {
        onBotResponse(
          "I'm here to help you with information about Vedahealar's services and booking appointments. You can ask me about:\n\n" +
            "• Our services (Numerology, Reiki, Name Correction, etc.)\n" +
            "• Pricing information\n" +
            "• Booking a consultation\n" +
            "• Contact details\n\n" +
            "What would you like to know?",
        );
      }
    } catch (error) {
      console.error("Error processing message:", error);
      onBotResponse(
        "I apologize, but I encountered an error. Please try again or contact us directly at +91 7096912557.",
      );
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    sendMessage,
    isProcessing,
  };
}
