"use client";

import { cn } from "@/lib/utils";
import type { AppLanguage } from "@/lib/constants";
import { useLanguage } from "@/hooks/use-language";

const FLAGS: Record<AppLanguage, string> = {
  en: "🇬🇧",
  hi: "🇮🇳",
  kn: "ಕ",
};

export function LanguageToggle({ className }: { className?: string }) {
  const { language, setLanguage } = useLanguage();

  const items: { code: AppLanguage; label: string }[] = [
    { code: "en", label: "EN" },
    { code: "hi", label: "HI" },
    { code: "kn", label: "KN" },
  ];

  return (
    <div
      className={cn(
        "fixed bottom-4 right-4 z-50 flex max-w-[calc(100vw-2rem)] flex-wrap items-center gap-1 rounded-pill border border-border bg-app-card/95 px-2 py-2 shadow-card backdrop-blur",
        className
      )}
      role="group"
      aria-label="Language"
    >
      {items.map((item) => (
        <button
          key={item.code}
          type="button"
          onClick={() => setLanguage(item.code)}
          className={cn(
            "min-h-touch min-w-touch rounded-pill px-3 text-sm font-medium transition-colors",
            language === item.code
              ? "bg-accent-brand text-white"
              : "text-text-secondary hover:bg-muted/50 hover:text-text-primary"
          )}
        >
          <span className="mr-1" aria-hidden>
            {FLAGS[item.code]}
          </span>
          {item.label}
        </button>
      ))}
    </div>
  );
}
