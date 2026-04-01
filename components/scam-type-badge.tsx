import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const LABELS: Record<string, string> = {
  upi_fraud: "UPI fraud",
  phishing: "Phishing",
  vishing: "Vishing",
  loan_scam: "Loan scam",
  kyc_fraud: "KYC fraud",
  fake_app: "Fake app",
  qr_scam: "QR scam",
  other: "Other",
  none: "None",
};

export function ScamTypeBadge({
  type,
  className,
}: {
  type: string;
  className?: string;
}) {
  const label = LABELS[type] ?? type.replace(/_/g, " ");
  return (
    <Badge
      variant="secondary"
      className={cn(
        "rounded-pill border border-border bg-secondary/80 px-3 py-1 text-xs capitalize text-text-primary",
        className
      )}
    >
      {label}
    </Badge>
  );
}
