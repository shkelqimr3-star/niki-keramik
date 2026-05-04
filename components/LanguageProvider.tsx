"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { copy, type Lang } from "@/lib/content";

type LanguageContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (typeof copy)[Lang];
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("sq");

  useEffect(() => {
    const saved = window.localStorage.getItem("niki-lang");
    if (saved === "sq" || saved === "sr") {
      setLangState(saved);
      return;
    }

    if (window.navigator.language.toLowerCase().startsWith("sr")) {
      setLangState("sr");
    }
  }, []);

  const setLang = (nextLang: Lang) => {
    setLangState(nextLang);
    window.localStorage.setItem("niki-lang", nextLang);
    document.documentElement.lang = nextLang;
  };

  const value = useMemo(() => ({ lang, setLang, t: copy[lang] }), [lang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }

  return context;
}
