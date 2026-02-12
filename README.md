# Valentine's Queen (Next.js 16 + Supabase)

This project has been migrated from Vite to **Next.js 16 (App Router)** and now uses **Supabase** as the backend for candidates and vote casting.

## Stack

- Next.js 16
- React 19
- Supabase Postgres
- Next API routes for backend access from the UI

## Local Run

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy env file and set values:
   ```bash
   cp .env.example .env.local
   ```
3. Run development server:
   ```bash
   npm run dev
   ```

## Required Environment Variables

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `VOTE_HASH_SALT`
- `ADMIN_USERNAME`
- `ADMIN_PASSWORD`
- `ADMIN_SESSION_SECRET`

## Supabase Setup

1. Create a Supabase project.
2. Run SQL migration from:
   - `supabase/migrations/20260212120000_init_voting.sql`
   - `supabase/migrations/20260212145000_fix_cast_vote_vote_count_ambiguity.sql`
   - `supabase/migrations/20260212170000_add_admin_candidate_storage.sql`
3. Confirm tables/functions exist:
   - `public.candidates`
   - `public.votes`
   - `public.cast_vote(...)`
   - `storage bucket: candidate-images`

## Admin Management

- Open `/admin` and log in with `ADMIN_USERNAME` + `ADMIN_PASSWORD`.
- The admin page supports:
  - contender creation
  - image upload to Supabase Storage (`candidate-images`)
  - contender deletion
- Public candidates pages now read only from Supabase and do not use runtime mock fallback data.

## Vote Abuse Protection

Vote casting is server-side and enforced in SQL (`cast_vote`) using hashed identifiers:

- `device_hash` (derived from browser device ID)
- `ip_hash` (derived from request IP)
- `ua_hash` (derived from user-agent)

Current protections:

- 10-second cooldown between votes per device
- Max 10 votes per device per 24 hours
- Max 40 votes per IP per 24 hours
- No repeat vote for same candidate from same device within 24 hours

Note: browser apps cannot reliably read a real MAC address. Device + IP + server-side rate limits are used instead.
