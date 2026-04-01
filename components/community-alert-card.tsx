import { AlertTriangle, Users, Clock } from "lucide-react";
import { CommunityAlert } from "@/lib/supabase";
import { getSeverityColor, timeAgo } from "@/lib/utils";
import { Language } from "@/lib/constants";
import { VoiceButton } from "./voice-button";

interface CommunityAlertCardProps {
  alert: CommunityAlert;
  language?: Language;
}

export function CommunityAlertCard({ alert, language = "en" }: CommunityAlertCardProps) {
  const severityColor = getSeverityColor(alert.severity ?? "medium");

  const getTitle = () => {
    if (language === "hi" && alert.alert_title_hi) return alert.alert_title_hi;
    if (language === "kn" && alert.alert_title_kn) return alert.alert_title_kn;
    return alert.alert_title;
  };

  const getDescription = () => {
    if (language === "hi" && alert.description_hi) return alert.description_hi;
    if (language === "kn" && alert.description_kn) return alert.description_kn;
    return alert.description;
  };

  const severityLabels: Record<string, string> = {
    low: "LOW", medium: "MEDIUM", high: "HIGH", critical: "CRITICAL"
  };

  return (
    <div
      className="rounded-2xl p-4 transition-all duration-200"
      style={{
        background: "rgba(30,41,59,0.9)",
        border: `1px solid ${severityColor}30`,
        borderLeft: `4px solid ${severityColor}`,
      }}
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-center gap-2">
          <AlertTriangle size={16} style={{ color: severityColor }} />
          <span
            className="text-xs font-bold px-2 py-0.5 rounded-full"
            style={{ color: severityColor, background: `${severityColor}20` }}
          >
            {severityLabels[alert.severity ?? "medium"]}
          </span>
        </div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Clock size={12} />
          {timeAgo(alert.created_at)}
        </div>
      </div>

      <h3 className="font-bold text-foreground mb-1">{getTitle()}</h3>
      <p className="text-sm text-muted-foreground mb-3">{getDescription()}</p>

      <div className="flex items-center justify-between">
        {(alert.affected_count ?? 0) > 0 && (
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Users size={12} />
            {alert.affected_count} affected
          </span>
        )}
        <VoiceButton text={`${getTitle()}. ${getDescription()}`} variant="compact" />
      </div>
    </div>
  );
}
