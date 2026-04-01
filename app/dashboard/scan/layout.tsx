import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Message scanner — Kavach",
  description: "AI-powered SMS and WhatsApp scam detection.",
};

export default function ScanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
