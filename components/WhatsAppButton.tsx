"use client";

import { MessageCircle } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import { whatsapp } from "@/lib/content";

export function WhatsAppButton() {
  const { t } = useLanguage();
  const href = `https://wa.me/${whatsapp.number}?text=${encodeURIComponent(t.whatsappMessage)}`;

  return (
    <a
      href={href}
      className="focus-ring fixed bottom-5 right-5 z-50 hidden h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-soft transition hover:scale-105 md:inline-flex"
      aria-label="WhatsApp"
      target="_blank"
      rel="noreferrer"
    >
      <MessageCircle size={27} />
    </a>
  );
}
