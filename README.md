# Anonymous Appreciation Board

A production-ready, full-stack SaaS web app built with Next.js 15, TypeScript, TailwindCSS, and Supabase.

## Features
- User magic link auth (Supabase Auth)
- Create personal link: `/u/username`
- Public appreciation form (no sign-in)
- User dashboard: list and copy share link
- Admin dashboard: users, messages, analytics (Recharts)
- SEO: Metadata API, OG, Twitter, JSON-LD

## Tech Stack
- Next.js 15 (App Router)
- Supabase (Auth, Database, Storage-ready)
- TailwindCSS
- Recharts
- Deployable on Vercel (custom domain ready)

## Getting Started
1. Clone and install dependencies
```bash
pnpm i # or npm i or yarn
```

2. Configure environment variables
- Copy `.env.example` to `.env.local`
- Set `SUPABASE_URL` and `SUPABASE_ANON_KEY`
- Optionally set `NEXT_PUBLIC_SITE_URL` (defaults to `http://localhost:3000`)

3. Create database schema
- Open Supabase SQL editor and run `supabase/schema.sql`

4. Run dev server
```bash
pnpm dev # or npm run dev
```

## Auth & Profiles
- On first login, ensure a row is present in `users` with the email and role `user` or `admin`.
- Admins can access `/admin` and subpages.

## Deployment on Vercel
- Import the repo to Vercel
- Set environment variables:
  - SUPABASE_URL
  - SUPABASE_ANON_KEY
  - NEXT_PUBLIC_SITE_URL (your domain URL)
- Build command: `next build`
- Output: default
- Add your custom domain and set it as primary

## Future Work
- Pricing and Stripe integration (routes and UI placeholders can be added later)
- Spam prevention (rate limit, captcha)
- Moderation tools for admins

## License
MIT
