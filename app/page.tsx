"use client";

import Link from "next/link";
import { Radar, ScanLine, Users } from "lucide-react";

import { ShieldStatus } from "@/components/shield-status";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getTranslations } from "@/lib/i18n";

export default function HomePage() {
  const t = getTranslations("en");

  return (
    <div className="min-h-screen bg-app-bg">
      <header className="border-b border-border bg-app-bg/90">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <span className="font-heading text-xl font-bold text-text-primary">
            Kavach
          </span>
          <Link
            href="/dashboard"
            className={buttonVariants({
              className: "min-h-touch rounded-[12px] text-lg",
            })}
          >
            {t.landing.cta}
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-12 px-4 py-12">
        <section className="flex flex-col items-center gap-8 text-center md:flex-row md:text-left">
          <div className="flex flex-1 flex-col items-center gap-6 md:items-start">
            <p className="rounded-pill border border-accent-brand/40 bg-accent-brand/10 px-4 py-1 text-sm font-medium text-accent-brand">
              secure it · Digital Trust
            </p>
            <h1 className="font-heading text-3xl font-bold leading-tight text-text-primary md:text-4xl">
              {t.landing.tagline}
            </h1>
            <p className="max-w-xl text-lg text-text-secondary">
              {t.meta.description}
            </p>
            <Link
              href="/dashboard"
              className={buttonVariants({
                className:
                  "min-h-touch rounded-[12px] px-8 text-lg font-semibold",
              })}
            >
              {t.landing.cta}
            </Link>
          </div>
          <div className="flex flex-1 justify-center">
            <ShieldStatus level="safe" className="scale-110" />
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <Card className="border-border bg-app-card shadow-card">
            <CardHeader>
              <ScanLine className="mb-2 size-10 text-accent-brand" />
              <CardTitle className="text-text-primary">
                {t.landing.feature1Title}
              </CardTitle>
              <CardDescription className="text-text-secondary">
                {t.landing.feature1Desc}
              </CardDescription>
            </CardHeader>
            <CardContent />
          </Card>
          <Card className="border-border bg-app-card shadow-card">
            <CardHeader>
              <Radar className="mb-2 size-10 text-accent-info" />
              <CardTitle className="text-text-primary">
                {t.landing.feature2Title}
              </CardTitle>
              <CardDescription className="text-text-secondary">
                {t.landing.feature2Desc}
              </CardDescription>
            </CardHeader>
            <CardContent />
          </Card>
          <Card className="border-border bg-app-card shadow-card">
            <CardHeader>
              <Users className="mb-2 size-10 text-accent-safe" />
              <CardTitle className="text-text-primary">
                {t.landing.feature3Title}
              </CardTitle>
              <CardDescription className="text-text-secondary">
                {t.landing.feature3Desc}
              </CardDescription>
            </CardHeader>
            <CardContent />
          </Card>
        </section>
      </main>
    </div>
  );
}
