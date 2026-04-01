"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ScanLine, Search, Users, BookOpen } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, labelKey: "dashboard" as const },
  { href: "/dashboard/scan", icon: ScanLine, labelKey: "scan" as const },
  { href: "/dashboard/check", icon: Search, labelKey: "check" as const },
  { href: "/dashboard/community", icon: Users, labelKey: "community" as const },
  { href: "/dashboard/learn", icon: BookOpen, labelKey: "learn" as const },
];

export function BottomNav() {
  const pathname = usePathname();
  const { t } = useLanguage();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden"
      style={{
        background: "rgba(15,23,42,0.95)",
        borderTop: "1px solid rgba(148,163,184,0.15)",
        backdropFilter: "blur(16px)",
      }}
    >
      <div className="flex items-center justify-around px-2 pb-safe">
        {navItems.map(({ href, icon: Icon, labelKey }) => {
          const isActive = pathname === href || (href !== "/dashboard" && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex flex-col items-center gap-1 px-3 py-3 rounded-xl transition-all duration-200 min-w-[60px] min-h-[56px] justify-center",
                isActive ? "text-brand" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <div className="relative">
                <Icon size={22} />
                {isActive && (
                  <div
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                    style={{ background: "#8B5CF6" }}
                  />
                )}
              </div>
              <span className="text-xs font-medium">{t.nav[labelKey]}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export function SideNav() {
  const pathname = usePathname();
  const { t } = useLanguage();

  const allItems = [
    ...navItems,
    { href: "/dashboard/report", icon: null as unknown as typeof LayoutDashboard, labelKey: "report" as const },
    { href: "/dashboard/simulate", icon: null as unknown as typeof LayoutDashboard, labelKey: "simulate" as const },
  ];

  return (
    <nav className="hidden md:flex flex-col gap-1 p-4 w-56">
      {allItems.map(({ href, icon: Icon, labelKey }) => {
        const isActive = pathname === href || (href !== "/dashboard" && pathname.startsWith(href));
        return (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium",
              isActive
                ? "text-white"
                : "text-muted-foreground hover:text-foreground hover:bg-white/5"
            )}
            style={isActive ? { background: "linear-gradient(135deg, #8B5CF620, #3B82F620)", border: "1px solid #8B5CF640" } : {}}
          >
            {Icon && <Icon size={20} />}
            <span>{t.nav[labelKey]}</span>
          </Link>
        );
      })}
    </nav>
  );
}
