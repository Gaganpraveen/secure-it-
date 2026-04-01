"use client";

import { Toaster } from "@/components/ui/sonner";
import { LanguageProvider } from "@/hooks/use-language";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      {children}
      <Toaster richColors position="top-center" />
    </LanguageProvider>
  );
}
