import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useVeduChat } from "@/hooks/useVeduChat";
import { Loader2, Send, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "vedu";
  timestamp: Date;
}

export default function VeduChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [hasGreeted, setHasGreeted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { sendMessage, isProcessing } = useVeduChat({
    onBotResponse: (response: string) => {
      const botMessage: Message = {
        id: Date.now().toString(),
        text: response,
        sender: "vedu",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    },
  });

  // Show greeting when chat is first opened
  useEffect(() => {
    if (isOpen && !hasGreeted) {
      const greetingMessage: Message = {
        id: "greeting",
        text: "Welcome to Vedahealar! I'm Vedu, your personal guide. I can help you learn about our services including Numerology, Name Correction, Lucky Numbers, Reiki Healing, and Business Name Analysis. I can also assist you in booking an appointment. How can I help you today?",
        sender: "vedu",
        timestamp: new Date(),
      };
      setMessages([greetingMessage]);
      setHasGreeted(true);
    }
  }, [isOpen, hasGreeted]);

  // Auto-scroll to bottom when new messages arrive
  // biome-ignore lint/correctness/useExhaustiveDependencies: scroll on message change is intentional
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isProcessing) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    await sendMessage(inputValue);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <>
      {/* Chat Bubble Icon */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 left-6 z-50 w-16 h-16 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all duration-300 group overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #0E1B2A 0%, #1A3A5A 100%)",
            border: "2px solid #E6B65C",
          }}
          aria-label="Open Vedu chat assistant"
        >
          <img
            src="/assets/generated/vedu-bot-icon-transparent.dim_128x128.png"
            alt="Vedu"
            className="w-12 h-12 object-contain group-hover:scale-110 transition-transform"
          />
        </button>
      )}

      {/* Chat Interface */}
      {isOpen && (
        <div className="fixed bottom-6 left-6 z-50 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border-2 border-deepBlue">
          {/* Header */}
          <div className="bg-deepBlue text-white px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full overflow-hidden border-2 border-goldAccent flex items-center justify-center"
                style={{
                  background:
                    "linear-gradient(135deg, #0E1B2A 0%, #1A3A5A 100%)",
                }}
              >
                <img
                  src="/assets/generated/vedu-bot-icon-transparent.dim_128x128.png"
                  alt="Vedu"
                  className="w-8 h-8 object-contain"
                />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg">Vedu</h3>
                <p className="text-xs text-goldAccent">Your Vedic Guide</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-goldAccent transition-colors"
              aria-label="Close chat"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Messages Area */}
          <ScrollArea className="flex-1 px-4 py-4 bg-beigeBackground">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                      message.sender === "user"
                        ? "bg-deepBlue text-white rounded-br-none"
                        : "bg-white text-deepBlue border border-gray-200 rounded-bl-none"
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">
                      {message.text}
                    </p>
                    <p
                      className={`text-xs mt-1 ${
                        message.sender === "user"
                          ? "text-goldAccent"
                          : "text-gray-500"
                      }`}
                    >
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
              {isProcessing && (
                <div className="flex justify-start">
                  <div className="bg-white text-deepBlue border border-gray-200 rounded-2xl rounded-bl-none px-4 py-3">
                    <Loader2 className="w-5 h-5 animate-spin text-goldAccent" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="bg-white border-t border-gray-200 px-4 py-4">
            <div className="flex items-center gap-2">
              <Input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                disabled={isProcessing}
                className="flex-1 border-gray-300 focus:border-goldAccent focus:ring-goldAccent"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isProcessing}
                className="bg-goldAccent hover:bg-goldAccent/90 text-white px-4 py-2"
                size="icon"
              >
                {isProcessing ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
