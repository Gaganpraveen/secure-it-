import { NextResponse } from "next/server";
import { z } from "zod";

import { analyzeMessageWithClaude } from "@/lib/claude";
import {
  createAnonServerClient,
  createServiceRoleClient,
} from "@/lib/supabase";

const SCAM_TYPES = [
  "upi_fraud",
  "phishing",
  "vishing",
  "loan_scam",
  "kyc_fraud",
  "fake_app",
  "qr_scam",
  "other",
] as const;

function normalizeScamType(raw: string | undefined): (typeof SCAM_TYPES)[number] {
  if (raw && (SCAM_TYPES as readonly string[]).includes(raw)) {
    return raw as (typeof SCAM_TYPES)[number];
  }
  return "other";
}

const bodySchema = z.object({
  message_text: z.string().min(1).max(12000),
  sender_info: z.string().max(256).optional().nullable(),
  scam_type: z
    .enum([
      "upi_fraud",
      "phishing",
      "vishing",
      "loan_scam",
      "kyc_fraud",
      "fake_app",
      "qr_scam",
      "other",
    ])
    .optional(),
  pincode: z.string().min(6).max(8),
  language: z.enum(["en", "hi", "kn"]),
  channel: z
    .enum(["sms", "call", "whatsapp", "qr", "other"])
    .optional(),
});

function inferIdentifierType(id: string): "phone" | "upi_id" {
  if (id.includes("@")) return "upi_id";
  return "phone";
}

function trustLevelFromCount(count: number): "suspicious" | "dangerous" {
  if (count >= 3) return "dangerous";
  return "suspicious";
}

export async function POST(request: Request) {
  try {
    const json: unknown = await request.json();
    const parsed = bodySchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const {
      message_text,
      sender_info,
      scam_type: bodyScamType,
      pincode,
      language,
    } = parsed.data;

    let scam_type: (typeof SCAM_TYPES)[number] = bodyScamType ?? "other";
    let risk_score: number | null = null;
    let ai_explanation: string | null = null;
    let ai_explanation_local: string | null = null;

    try {
      const ai = await analyzeMessageWithClaude(message_text);
      scam_type = normalizeScamType(
        ai.scam_type && ai.scam_type !== "none" ? ai.scam_type : scam_type
      );
      risk_score = ai.risk_score;
      ai_explanation = ai.explanation_en;
      ai_explanation_local =
        language === "hi"
          ? ai.explanation_hi
          : language === "kn"
            ? ai.explanation_kn
            : ai.explanation_en;
    } catch (e) {
      console.error("AI attach to report failed:", e);
    }

    const supabase = createAnonServerClient();
    if (!supabase) {
      return NextResponse.json(
        { error: "Database not configured" },
        { status: 503 }
      );
    }

    const { data: inserted, error: insertError } = await supabase
      .from("threat_reports")
      .insert({
        message_text,
        sender_info: sender_info ?? null,
        scam_type,
        risk_score,
        ai_explanation,
        ai_explanation_local,
        language,
        pincode,
      })
      .select("id")
      .single();

    if (insertError || !inserted) {
      console.error(insertError);
      return NextResponse.json(
        { error: "Could not save report", code: insertError?.code },
        { status: 500 }
      );
    }

    const idKey = (sender_info ?? "").trim();
    const service = createServiceRoleClient();
    if (idKey && service) {
      const type = inferIdentifierType(idKey);
      const { data: existing } = await service
        .from("trust_scores")
        .select("id, total_reports")
        .eq("identifier", idKey)
        .maybeSingle();

      const now = new Date().toISOString();
      if (existing) {
        const nextCount = (existing.total_reports ?? 0) + 1;
        await service
          .from("trust_scores")
          .update({
            total_reports: nextCount,
            trust_level: trustLevelFromCount(nextCount),
            last_reported_at: now,
            identifier_type: type,
          })
          .eq("id", existing.id);
      } else {
        await service.from("trust_scores").insert({
          identifier: idKey,
          identifier_type: type,
          total_reports: 1,
          trust_level: "suspicious",
          last_reported_at: now,
        });
      }
    }

    return NextResponse.json({ ok: true, id: inserted.id });
  } catch (e) {
    console.error("POST /api/report:", e);
    return NextResponse.json(
      { error: "report_failed" },
      { status: 500 }
    );
  }
}
