"use client";

import { MessageCircle } from "lucide-react";

export default function WhatsAppFloatButton() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919876543210";
  const defaultMessage = encodeURIComponent(
    "Hello Petals by Smira Concierge, I would like to inquire about your collections."
  );

  return (
    <a
      href={`https://wa.me/${whatsappNumber}?text=${defaultMessage}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-transform hover:scale-110 flex items-center justify-center group"
      aria-label="Chat with Petals by Smira Concierge on WhatsApp"
    >
      <MessageCircle className="h-7 w-7" />
      <span className="absolute right-full mr-4 bg-white text-gray-800 text-sm py-1 px-3 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        Chat with Concierge
      </span>
    </a>
  );
}
