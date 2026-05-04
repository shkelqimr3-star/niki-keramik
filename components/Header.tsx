"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Phone, X } from "lucide-react";
import { useState } from "react";
import { languages, routes, whatsapp, type Lang } from "@/lib/content";
import { useLanguage } from "@/components/LanguageProvider";

export function Header() {
  const pathname = usePathname();
  const { lang, setLang, t } = useLanguage();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-graphite/10 bg-ceramic/92 backdrop-blur">
      <div className="section-shell flex h-20 items-center justify-between gap-4">
        <Link href="/" className="focus-ring flex min-w-0 items-center gap-3 rounded-lg" onClick={() => setOpen(false)}>
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-graphite text-lg font-black text-ceramic">
            NK
          </span>
          <span className="min-w-0">
            <span className="block text-lg font-black tracking-wide text-graphite">Niki Keramik</span>
            <span className="block truncate text-xs font-semibold uppercase text-concrete">{t.serviceArea}</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
          {routes.map((route) => {
            const active = pathname === route.href;
            return (
              <Link
                key={route.href}
                href={route.href}
                className={`focus-ring rounded-lg px-3 py-2 text-sm font-semibold transition ${
                  active ? "bg-graphite text-ceramic" : "text-graphite hover:bg-graphite/5"
                }`}
              >
                {t.nav[route.key]}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <LanguageSwitch lang={lang} setLang={setLang} />
          <a
            href={`tel:${whatsapp.display.replaceAll(" ", "")}`}
            className="focus-ring inline-flex items-center gap-2 rounded-lg bg-water px-4 py-3 text-sm font-bold text-white shadow-soft transition hover:bg-water/90"
          >
            <Phone size={18} />
            {whatsapp.display}
          </a>
        </div>

        <button
          type="button"
          className="focus-ring inline-grid h-11 w-11 place-items-center rounded-lg border border-graphite/15 bg-white lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-graphite/10 bg-ceramic lg:hidden">
          <div className="section-shell grid gap-2 py-4">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className="rounded-lg px-3 py-3 text-sm font-bold text-graphite hover:bg-graphite/5"
                onClick={() => setOpen(false)}
              >
                {t.nav[route.key]}
              </Link>
            ))}
            <div className="flex items-center justify-between gap-3 border-t border-graphite/10 pt-3">
              <LanguageSwitch lang={lang} setLang={setLang} />
              <a className="text-sm font-bold text-water" href={`tel:${whatsapp.display.replaceAll(" ", "")}`}>
                {whatsapp.display}
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}

function LanguageSwitch({ lang, setLang }: { lang: Lang; setLang: (lang: Lang) => void }) {
  return (
    <div className="inline-flex rounded-lg border border-graphite/15 bg-white p-1" aria-label="Language switcher">
      {(Object.keys(languages) as Lang[]).map((item) => (
        <button
          key={item}
          type="button"
          className={`focus-ring rounded-md px-3 py-2 text-sm font-black transition ${
            lang === item ? "bg-graphite text-ceramic" : "text-concrete hover:text-graphite"
          }`}
          onClick={() => setLang(item)}
        >
          {languages[item]}
        </button>
      ))}
    </div>
  );
}
