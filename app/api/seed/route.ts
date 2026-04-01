import { NextResponse } from "next/server";

import {
  SEED_ALERTS,
  SEED_THREAT_REPORTS,
  SEED_TIPS,
  SEED_TRUST,
} from "@/lib/seed-data";
import { createServiceRoleClient } from "@/lib/supabase";

export async function POST() {
  try {
    const supabase = createServiceRoleClient();
    if (!supabase) {
      return NextResponse.json(
        { error: "SUPABASE_SERVICE_ROLE_KEY required for seeding" },
        { status: 503 }
      );
    }

    const threatRows = SEED_THREAT_REPORTS.map((r) => ({
      message_text: r.message_text,
      sender_info: r.sender_info,
      scam_type: r.scam_type,
      risk_score: r.risk_score,
      ai_explanation: r.ai_explanation,
      ai_explanation_local: r.ai_explanation_local,
      language: r.language,
      pincode: r.pincode,
      status: "active" as const,
    }));

    const { error: tErr } = await supabase.from("threat_reports").insert(threatRows);
    if (tErr) {
      console.error(tErr);
      return NextResponse.json(
        { error: "seed_threat_reports_failed", message: tErr.message },
        { status: 500 }
      );
    }

    const { error: aErr } = await supabase.from("community_alerts").insert(
      SEED_ALERTS.map((a) => ({
        ...a,
        is_active: true,
      }))
    );
    if (aErr) {
      console.error(aErr);
      return NextResponse.json(
        { error: "seed_alerts_failed", message: aErr.message },
        { status: 500 }
      );
    }

    const { error: tipErr } = await supabase.from("banking_safety_tips").insert(
      SEED_TIPS.map((t) => ({
        tip_en: t.tip_en,
        tip_hi: t.tip_hi,
        tip_kn: t.tip_kn,
        category: t.category,
        icon_name: t.icon_name,
        priority: t.priority,
      }))
    );
    if (tipErr) {
      console.error(tipErr);
      return NextResponse.json(
        { error: "seed_tips_failed", message: tipErr.message },
        { status: 500 }
      );
    }

    const { error: trErr } = await supabase.from("trust_scores").insert(
      SEED_TRUST.map((x) => ({
        identifier: x.identifier,
        identifier_type: x.identifier_type,
        total_reports: x.total_reports,
        trust_level: x.trust_level,
        last_reported_at: new Date().toISOString(),
      }))
    );
    if (trErr) {
      console.error(trErr);
      return NextResponse.json(
        { error: "seed_trust_failed", message: trErr.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      counts: {
        threat_reports: threatRows.length,
        community_alerts: SEED_ALERTS.length,
        banking_safety_tips: SEED_TIPS.length,
        trust_scores: SEED_TRUST.length,
      },
    });
  } catch (e) {
    console.error("POST /api/seed:", e);
    return NextResponse.json({ error: "seed_failed" }, { status: 500 });
  }
}
