import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Community feed — Kavach",
  description: "Real-time threat reports for your pincode.",
};

export default function CommunityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
