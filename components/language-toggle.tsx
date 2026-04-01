"use client";

import { useLanguage } from "@/hooks/use-language";
import { Language, LANGUAGE_MAP } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-1 rounded-full p-1" style={{ background: "rgba(30,41,59,0.9)", border: "1px solid rgba(148,163,184,0.2)" }}>
      {(["en", "hi", "kn"] as Language[]).map((lang) => (
        <button
          key={lang}
          onClick={() => setLanguage(lang)}
          className={cn(
            "px-3 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 min-h-[36px]",
            language === lang
              ? "text-white shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
          style={
            language === lang
              ? { background: "linear-gradient(135deg, #8B5CF6, #3B82F6)" }
              : {}
          }
        >
          {LANGUAGE_MAP[lang].flag} {LANGUAGE_MAP[lang].label}
        </button>
      ))}
    </div>
  );
}

export function FloatingLanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <div
      className="fixed bottom-24 right-4 z-50 flex flex-col gap-1 p-1 rounded-2xl shadow-lg md:bottom-6"
      style={{ background: "rgba(15,23,42,0.95)", border: "1px solid rgba(148,163,184,0.2)", backdropFilter: "blur(12px)" }}
    >
      {(["en", "hi", "kn"] as Language[]).map((lang) => (
        <button
          key={lang}
          onClick={() => setLanguage(lang)}
          className={cn(
            "w-12 h-12 rounded-xl text-sm font-bold transition-all duration-200 flex flex-col items-center justify-center gap-0.5",
            language === lang
              ? "text-white"
              : "text-muted-foreground hover:text-foreground"
          )}
          style={
            language === lang
              ? { background: "linear-gradient(135deg, #8B5CF6, #3B82F6)" }
              : {}
          }
        >
          <span>{LANGUAGE_MAP[lang].flag}</span>
          <span className="text-xs">{LANGUAGE_MAP[lang].label}</span>
        </button>
      ))}
    </div>
  );
}
