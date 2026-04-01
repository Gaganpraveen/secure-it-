"use client";

import { useEffect, useMemo, useState } from "react";

import { SafetyTipCard } from "@/components/safety-tip-card";
import { Skeleton } from "@/components/ui/skeleton";
import { TIP_CATEGORIES } from "@/lib/constants";
import { useLanguage } from "@/hooks/use-language";

type TipRow = {
  id: string;
  tip_en: string;
  tip_hi: string;
  tip_kn: string;
  category: string;
};

export default function LearnPage() {
  const { t } = useLanguage();
  const [tips, setTips] = useState<TipRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      try {
        const res = await fetch("/api/safety-tips");
        const json = await res.json();
        if (!cancelled) setTips(json.tips ?? []);
      } catch {
        if (!cancelled) setTips([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  const grouped = useMemo(() => {
    const g: Record<string, TipRow[]> = {};
    for (const c of TIP_CATEGORIES) g[c] = [];
    for (const tip of tips) {
      if (!g[tip.category]) g[tip.category] = [];
      g[tip.category].push(tip);
    }
    return g;
  }, [tips]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-2xl font-bold text-text-primary">
          {t.learn.title}
        </h1>
      </div>

      <section className="rounded-2xl border border-accent-info/30 bg-accent-info/10 p-4">
        <h2 className="font-heading text-lg font-semibold text-accent-info">
          {t.learn.bankingRights}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-text-primary">
          {t.learn.bankingRightsText}
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-lg font-semibold text-text-primary">
          {t.learn.categories}
        </h2>
        {loading ? (
          <Skeleton className="h-40 w-full rounded-2xl" />
        ) : (
          TIP_CATEGORIES.map((cat) => (
            <div key={cat} className="space-y-2">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-text-secondary">
                {cat}
              </h3>
              {(grouped[cat] ?? []).map((tip) => (
                <SafetyTipCard
                  key={tip.id}
                  tipEn={tip.tip_en}
                  tipHi={tip.tip_hi}
                  tipKn={tip.tip_kn}
                  category={cat}
                />
              ))}
            </div>
          ))
        )}
      </section>
    </div>
  );
}
