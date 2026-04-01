"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  GraduationCap,
  Home,
  Radar,
  ScanLine,
  Users,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { useLanguage } from "@/hooks/use-language";

const items = [
  { href: "/dashboard", key: "dashboard" as const, icon: Home },
  { href: "/dashboard/scan", key: "scan" as const, icon: ScanLine },
  { href: "/dashboard/check", key: "check" as const, icon: Radar },
  { href: "/dashboard/community", key: "community" as const, icon: Users },
  { href: "/dashboard/learn", key: "learn" as const, icon: GraduationCap },
] as const;

export function BottomNav() {
  const pathname = usePathname();
  const { t } = useLanguage();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-app-bg/95 backdrop-blur md:hidden"
      aria-label="Primary"
    >
      <ul className="mx-auto flex max-w-lg items-stretch justify-between px-1 py-2">
        {items.map(({ href, key, icon: Icon }) => {
          const active =
            pathname === href ||
            (href !== "/dashboard" && pathname.startsWith(href));
          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                className={cn(
                  "flex min-h-touch flex-col items-center justify-center gap-1 rounded-xl text-xs font-medium transition-colors",
                  active
                    ? "text-accent-brand"
                    : "text-text-secondary hover:text-text-primary"
                )}
              >
                <Icon className="size-6" aria-hidden />
                <span className="truncate px-0.5 text-[11px]">
                  {t.nav[key]}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
