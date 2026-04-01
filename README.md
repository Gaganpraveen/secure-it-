# 🛡️ kavach.net — Adaptive Cybersecurity for Rural Digital Banking

> **"Your money speaks your language. So does your security."**

AI-powered cybersecurity framework protecting rural Indian digital banking users from UPI fraud, phishing, vishing, and other scams.

## 🚀 Tech Stack

- **Next.js 14** (App Router, TypeScript)
- **Tailwind CSS** (Custom dark theme)
- **Supabase** (PostgreSQL + Auth + Realtime)
- **Anthropic Claude** (`claude-sonnet-4-5`) for AI threat analysis
- **Web Speech API** for multilingual voice alerts (EN/हिंदी/ಕನ್ನಡ)
- **Recharts** for visualizations
- **Lucide React** for icons

## 📱 Features

### 🔍 AI Message Scanner (Hero Feature)
- Paste any suspicious SMS or WhatsApp message
- Get instant AI analysis with risk score (0-100)
- Red flags listed, banking rules explained
- Voice read-aloud in English, Hindi, or Kannada
- One-click report to community

### ✅ UPI/Phone Trust Checker
- Check any phone number or UPI ID
- Community-powered trust scores
- Recent reports timeline

### 📡 Community Feed (Real-time)
- Supabase Realtime updates — live fraud alerts from your area
- Trending scam types
- Pincode-based filtering

### 🚨 Report Scam
- 5-step guided form
- Auto AI analysis on submission
- Helps community in real-time

### 📚 Safety Hub
- Categorized banking safety tips (UPI, OTP, KYC, ATM, Password, General)
- Voice read-aloud for all tips
- Banking rights section (RBI guidelines)

### 🎮 Attack Simulator (Demo Killer)
- 3 interactive scenarios: KYC Scam, UPI Refund Trick, Voice Call Trap
- Step-by-step simulation with live threat detection
- Auto voice warning on threat detection

## 🗄️ Database Setup (Supabase)

1. Create a new Supabase project
2. Run the SQL in `supabase-schema.sql` in the SQL editor
3. Copy your project URL and anon key

## ⚙️ Setup & Running

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local
# Fill in your Supabase URL, anon key, and Anthropic API key

# Run development server
npm run dev

# Seed demo data (after setting up Supabase)
curl -X POST http://localhost:3000/api/seed
```

## 🌐 Deployment (Vercel)

1. Push to GitHub
2. Import to Vercel
3. Set environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `ANTHROPIC_API_KEY`
4. Deploy!
5. After deployment, call `POST /api/seed` to populate demo data

## 🌍 Languages Supported

- 🇬🇧 English
- 🇮🇳 Hindi (हिंदी)
- 🇮🇳 Kannada (ಕನ್ನಡ)

All UI strings, AI explanations, and safety tips are available in all three languages.

## 📞 Emergency Contacts

- **Cyber Crime Helpline**: 1930
- **RBI Helpline**: 14440
- **Report online**: [cybercrime.gov.in](https://cybercrime.gov.in)

---

Built for **Hackathon 2026** | Protecting rural India from digital banking fraud
