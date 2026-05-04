"use client";

import { Header } from "@/components/Header";
import { LanguageProvider } from "@/components/LanguageProvider";
import { MobileBottomBar } from "@/components/MobileBottomBar";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { whatsapp } from "@/lib/content";

export function SiteFrame({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <Header />
      <main>{children}</main>
      <footer className="border-t border-graphite/10 bg-graphite pb-24 pt-10 text-ceramic md:pb-10">
        <div className="section-shell flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xl font-black">Niki Keramik</p>
            <p className="mt-1 text-sm text-ceramic/70">{whatsapp.location}</p>
          </div>
          <div className="flex flex-wrap gap-3 text-sm font-semibold text-ceramic/80">
            <a href={`tel:${whatsapp.display.replaceAll(" ", "")}`}>{whatsapp.display}</a>
            <a href={whatsapp.facebook} target="_blank" rel="noreferrer">
              Facebook
            </a>
          </div>
        </div>
      </footer>
      <WhatsAppButton />
      <MobileBottomBar />
    </LanguageProvider>
  );
}
