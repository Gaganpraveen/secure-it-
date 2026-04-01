import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Attack simulator — Kavach",
  description: "Interactive demos of common banking scams and how Kavach detects them.",
};

export default function SimulateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
