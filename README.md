# secure it (Kavach)

Adaptive cybersecurity for rural digital banking: AI message scanning, UPI/phone trust checks, community alerts, and multilingual voice guidance.

## Setup

1. `npm install`
2. Copy `.env.example` to `.env.local` and fill in Supabase and Anthropic keys.
3. In Supabase SQL editor, run `supabase/schema.sql`.
4. `POST /api/seed` once (requires `SUPABASE_SERVICE_ROLE_KEY`) to load demo data.
5. `npm run dev` — open [http://localhost:3000](http://localhost:3000)

## Deploy (Vercel)

Set environment variables in the Vercel project: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `ANTHROPIC_API_KEY`, `SUPABASE_SERVICE_ROLE_KEY`.

## Security

Do not commit API keys. Rotate any key that was exposed in chat or issues.
