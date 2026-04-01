-- Run in Supabase SQL editor. Enable RLS and policies per project spec.

create table if not exists threat_reports (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now(),
  message_text text not null,
  sender_info text,
  scam_type text check (scam_type in ('upi_fraud', 'phishing', 'vishing', 'loan_scam', 'kyc_fraud', 'fake_app', 'qr_scam', 'other')),
  risk_score integer check (risk_score >= 0 and risk_score <= 100),
  ai_explanation text,
  ai_explanation_local text,
  language text default 'en' check (language in ('en', 'hi', 'kn')),
  pincode text,
  is_verified boolean default false,
  report_count integer default 1,
  status text default 'active' check (status in ('active', 'resolved', 'false_alarm'))
);

create table if not exists community_alerts (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now(),
  pincode text not null,
  alert_title text not null,
  alert_title_hi text,
  alert_title_kn text,
  description text not null,
  description_hi text,
  description_kn text,
  severity text check (severity in ('low', 'medium', 'high', 'critical')),
  scam_type text,
  affected_count integer default 0,
  is_active boolean default true
);

create table if not exists trust_scores (
  id uuid default gen_random_uuid() primary key,
  identifier text unique not null,
  identifier_type text check (identifier_type in ('phone', 'upi_id')),
  total_reports integer default 0,
  trust_level text default 'unknown' check (trust_level in ('trusted', 'unknown', 'suspicious', 'dangerous')),
  last_reported_at timestamptz,
  is_bank_verified boolean default false
);

create table if not exists banking_safety_tips (
  id uuid default gen_random_uuid() primary key,
  tip_en text not null,
  tip_hi text not null,
  tip_kn text not null,
  category text check (category in ('upi', 'password', 'otp', 'kyc', 'general', 'atm')),
  icon_name text,
  priority integer default 0
);

alter table threat_reports enable row level security;
alter table community_alerts enable row level security;
alter table trust_scores enable row level security;
alter table banking_safety_tips enable row level security;

create policy "threat_reports_insert" on threat_reports for insert with check (true);
create policy "threat_reports_select" on threat_reports for select using (true);

create policy "community_alerts_select" on community_alerts for select using (true);

create policy "trust_scores_select" on trust_scores for select using (true);

create policy "banking_safety_tips_select" on banking_safety_tips for select using (true);
