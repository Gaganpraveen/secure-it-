import type { Metadata } from "next";
import { JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";

import { LanguageToggle } from "@/components/language-toggle";
import { Providers } from "@/components/providers";

import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-plus-jakarta",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kavach — Secure rural digital banking",
  description:
    "Adaptive cybersecurity for rural India: AI message scan, UPI trust check, community alerts, and safety tips.",
  metadataBase: new URL("https://kavach.net"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${plusJakarta.variable} ${jetbrains.variable}`}
    >
      <body className="min-h-screen font-sans antialiased">
        <Providers>
          {children}
          <LanguageToggle />
        </Providers>
      </body>
    </html>
  );
}
