"use client";

import dynamic from "next/dynamic";

import { Skeleton } from "@/components/ui/skeleton";
import { useLanguage } from "@/hooks/use-language";

const AttackScenario = dynamic(
  () =>
    import("@/components/attack-scenario").then((m) => m.AttackScenario),
  {
    ssr: false,
    loading: () => <Skeleton className="h-64 w-full rounded-2xl" />,
  }
);

export default function SimulatePage() {
  const { t } = useLanguage();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-2xl font-bold text-text-primary">
          {t.simulate.title}
        </h1>
        <p className="mt-1 text-sm text-text-secondary">{t.meta.description}</p>
      </div>

      <AttackScenario
        title={t.simulate.kycTitle}
        description={t.simulate.kycDesc}
        sampleMessage="Dear Customer, Your SBI account will be blocked in 24 hours. Update KYC immediately: http://sbi-kyc-update.in/verify"
        demoScore={92}
        steps={[
          {
            label: "Domain check",
            detail: "Official banks use verified domains, not random .in links.",
          },
          {
            label: "Urgency",
            detail: "Scammers create panic to stop you from thinking.",
          },
          {
            label: "KYC rule",
            detail: "Real KYC happens in app or branch — not via SMS links.",
          },
        ]}
      />

      <AttackScenario
        title={t.simulate.upiTitle}
        description={t.simulate.upiDesc}
        sampleMessage="Income Tax Dept: ₹15,000 refund pending. Approve UPI collect from GOVT-REFUND@ybl to receive."
        demoScore={88}
        steps={[
          {
            label: "Collect request",
            detail: "Verify payee name — government bodies do not collect via random UPI IDs.",
          },
          {
            label: "Refund rule",
            detail: "Refunds credit automatically; they never need an OTP to 'receive'.",
          },
        ]}
      />

      <AttackScenario
        title={t.simulate.vishTitle}
        description={t.simulate.vishDesc}
        sampleMessage="This is RBI cyber cell. Suspicious transaction detected. Confirm your 16 digit card number to unblock account."
        demoScore={96}
        steps={[
          {
            label: "Impersonation",
            detail: "RBI does not call individuals for card numbers.",
          },
          {
            label: "Card data",
            detail: "Full card number + CVV is never asked on phone.",
          },
        ]}
      />
    </div>
  );
}
