import { Clock, MapPin } from "lucide-react";
import { ThreatReport } from "@/lib/supabase";
import { ScamTypeBadge } from "./scam-type-badge";
import { timeAgo, anonymizeSender, getRiskColor } from "@/lib/utils";

interface ThreatCardProps {
  report: ThreatReport;
}

export function ThreatCard({ report }: ThreatCardProps) {
  const riskColor = getRiskColor(report.risk_score ?? 50);

  return (
    <div
      className="rounded-2xl p-4 transition-all duration-200 hover:scale-[1.01]"
      style={{
        background: "rgba(30,41,59,0.8)",
        border: `1px solid rgba(148,163,184,0.1)`,
        borderLeft: `3px solid ${riskColor}`,
      }}
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex flex-wrap gap-2">
          <ScamTypeBadge type={report.scam_type ?? "other"} />
          {report.risk_score !== undefined && (
            <span
              className="px-2.5 py-1 rounded-full text-xs font-bold font-mono"
              style={{ color: riskColor, background: `${riskColor}20`, border: `1px solid ${riskColor}40` }}
            >
              {report.risk_score}/100
            </span>
          )}
        </div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground whitespace-nowrap shrink-0">
          <Clock size={12} />
          {timeAgo(report.created_at)}
        </div>
      </div>

      <p className="text-sm text-foreground/80 line-clamp-2 mb-2">
        {report.ai_explanation ?? report.message_text}
      </p>

      <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
        {report.sender_info && (
          <span className="font-mono">{anonymizeSender(report.sender_info)}</span>
        )}
        {report.pincode && (
          <span className="flex items-center gap-1">
            <MapPin size={10} />
            {report.pincode}
          </span>
        )}
      </div>
    </div>
  );
}
