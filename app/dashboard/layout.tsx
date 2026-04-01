"use client";

import { Shield } from "lucide-react";
import Link from "next/link";
import { BottomNav, SideNav } from "@/components/bottom-nav";
import { FloatingLanguageToggle } from "@/components/language-toggle";
import { MuteToggle } from "@/components/voice-button";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#0F172A" }}>
      {/* Top header */}
      <header
        className="flex items-center justify-between px-4 py-3 sticky top-0 z-50"
        style={{
          background: "rgba(15,23,42,0.95)",
          borderBottom: "1px solid rgba(148,163,184,0.1)",
          backdropFilter: "blur(16px)",
        }}
      >
        <Link href="/" className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #8B5CF6, #3B82F6)" }}
          >
            <Shield size={16} className="text-white" />
          </div>
          <span
            className="font-bold text-base"
            style={{
              background: "linear-gradient(135deg, #8B5CF6, #3B82F6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            kavach.net
          </span>
        </Link>
        <div className="flex items-center gap-2">
          <MuteToggle />
        </div>
      </header>

      {/* Main content */}
      <div className="flex flex-1">
        {/* Sidebar (desktop) */}
        <aside
          className="hidden md:flex flex-col"
          style={{
            background: "rgba(15,23,42,0.8)",
            borderRight: "1px solid rgba(148,163,184,0.1)",
            minHeight: "calc(100vh - 56px)",
          }}
        >
          <SideNav />
        </aside>

        {/* Page content */}
        <main className="flex-1 pb-20 md:pb-0 overflow-x-hidden">
          {children}
        </main>
      </div>

      {/* Bottom nav (mobile) */}
      <BottomNav />

      {/* Floating language toggle */}
      <FloatingLanguageToggle />
    </div>
  );
}
