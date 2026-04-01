"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  GraduationCap,
  Home,
  LayoutDashboard,
  Radar,
  ScanLine,
  ShieldAlert,
  Siren,
  Sparkles,
} from "lucide-react";

import { BottomNav } from "@/components/bottom-nav";
import { MuteToggle } from "@/components/mute-toggle";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/hooks/use-language";

const navItems = [
  { href: "/dashboard", key: "dashboard" as const, icon: LayoutDashboard },
  { href: "/dashboard/scan", key: "scan" as const, icon: ScanLine },
  { href: "/dashboard/check", key: "check" as const, icon: Radar },
  { href: "/dashboard/community", key: "community" as const, icon: Siren },
  { href: "/dashboard/report", key: "report" as const, icon: ShieldAlert },
  { href: "/dashboard/learn", key: "learn" as const, icon: GraduationCap },
  { href: "/dashboard/simulate", key: "simulate" as const, icon: Sparkles },
];

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-app-bg pb-24 md:pb-8">
      <header className="sticky top-0 z-30 border-b border-border bg-app-bg/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 font-heading text-lg font-bold text-text-primary"
          >
            <Home className="size-6 text-accent-brand" />
            Kavach
          </Link>
          <MuteToggle />
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-6xl gap-6 px-4 py-6">
        <aside className="hidden w-56 shrink-0 md:block">
          <nav className="sticky top-24 space-y-1 rounded-2xl border border-border bg-app-card p-3 shadow-card">
            {navItems.map(({ href, key, icon: Icon }) => {
              const active =
                pathname === href ||
                (href !== "/dashboard" && pathname.startsWith(href));
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "flex min-h-touch items-center gap-3 rounded-xl px-3 text-sm font-medium transition-colors",
                    active
                      ? "bg-accent-brand/20 text-accent-brand"
                      : "text-text-secondary hover:bg-muted/50 hover:text-text-primary"
                  )}
                >
                  <Icon className="size-5 shrink-0" />
                  {t.nav[key]}
                </Link>
              );
            })}
          </nav>
        </aside>
        <main className="min-w-0 flex-1">{children}</main>
      </div>
      <BottomNav />
    </div>
  );
}
