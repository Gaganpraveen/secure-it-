import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type ThreatReport = {
  id: string;
  created_at: string;
  message_text: string;
  sender_info?: string;
  scam_type?: string;
  risk_score?: number;
  ai_explanation?: string;
  ai_explanation_local?: string;
  language?: string;
  pincode?: string;
  is_verified?: boolean;
  report_count?: number;
  status?: string;
};

export type CommunityAlert = {
  id: string;
  created_at: string;
  pincode: string;
  alert_title: string;
  alert_title_hi?: string;
  alert_title_kn?: string;
  description: string;
  description_hi?: string;
  description_kn?: string;
  severity?: string;
  scam_type?: string;
  affected_count?: number;
  is_active?: boolean;
};

export type TrustScore = {
  id: string;
  identifier: string;
  identifier_type?: string;
  total_reports: number;
  trust_level: string;
  last_reported_at?: string;
  is_bank_verified?: boolean;
};

export type SafetyTip = {
  id: string;
  tip_en: string;
  tip_hi: string;
  tip_kn: string;
  category: string;
  icon_name?: string;
  priority?: number;
};
