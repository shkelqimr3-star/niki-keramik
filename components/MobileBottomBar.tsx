"use client";

import Link from "next/link";
import { MessageCircle, Phone, Send } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import { whatsapp } from "@/lib/content";

export function MobileBottomBar() {
  const { t } = useLanguage();
  const whatsappHref = `https://wa.me/${whatsapp.number}?text=${encodeURIComponent(t.whatsappMessage)}`;

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-3 border-t border-graphite/10 bg-white/95 p-2 shadow-soft backdrop-blur md:hidden" aria-label="Mobile quick actions">
      <a href={whatsappHref} target="_blank" rel="noreferrer" className="flex flex-col items-center justify-center gap-1 rounded-lg px-2 py-2 text-xs font-black text-graphite">
        <MessageCircle size={20} className="text-[#25D366]" />
        WhatsApp
      </a>
      <Link href="/oferta" className="flex flex-col items-center justify-center gap-1 rounded-lg bg-water px-2 py-2 text-xs font-black text-white">
        <Send size={20} />
        {t.hero.quote}
      </Link>
      <a href={`tel:${whatsapp.display.replaceAll(" ", "")}`} className="flex flex-col items-center justify-center gap-1 rounded-lg px-2 py-2 text-xs font-black text-graphite">
        <Phone size={20} className="text-water" />
        {t.nav.contact}
      </a>
    </nav>
  );
}
