import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Safety hub — Kavach",
  description: "Banking safety tips in your language with voice read-aloud.",
};

export default function LearnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
