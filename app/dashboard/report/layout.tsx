import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Report a scam — Kavach",
  description: "Report suspicious messages and help protect your community.",
};

export default function ReportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
