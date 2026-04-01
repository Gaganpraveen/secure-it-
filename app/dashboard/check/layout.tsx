import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "UPI / phone checker — Kavach",
  description: "Check community trust scores for numbers and UPI IDs.",
};

export default function CheckLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
