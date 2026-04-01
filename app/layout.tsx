import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/hooks/use-language";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Kavach.net — Adaptive Cybersecurity for Rural Digital Banking",
  description: "AI-powered cybersecurity framework protecting rural Indian digital banking users from UPI fraud, phishing, and vishing attacks.",
  keywords: "cybersecurity, UPI fraud, phishing, rural banking, India, AI security",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased min-h-screen" style={{ background: "#0F172A", color: "#F1F5F9" }}>
        <LanguageProvider>
          {children}
          <Toaster position="top-center" richColors />
        </LanguageProvider>
      </body>
    </html>
  );
}
