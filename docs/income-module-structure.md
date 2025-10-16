# 💰 Appreciation — Income Module Structure Guide

This document describes the architecture and structure for all User Income Systems planned for the Appreciation SaaS project. Do not implement logic now.

## 🧱 Folder Overview

/modules/income/
 │
 ├── referral/ → User-to-user affiliate program
 ├── rewards/ → Reward points earned from appreciation
 ├── creator/ → Creator monetization features
 ├── team/ → Organization/team rewards system
 ├── levels/ → Badge & level progression
 ├── marketplace/ → Digital store for redeeming rewards
 ├── sponsorship/ → Brand-sponsored appreciation campaigns
 └── integrations/ → External integrations (Slack, Discord, etc.)

Each module contains:
- model.ts → TypeScript interfaces/data models
- api.ts → Placeholder exported functions (no implementation)
- ui.tsx → Placeholder React component
- README.md → Module documentation and TODOs

## 🧩 Module Template

/modules/income/[module-name]/
 │
 ├── [module-name].model.ts
 │  - Define TypeScript interfaces for data types
 │
 ├── [module-name].api.ts
 │  - Export placeholder async functions (no logic yet)
 │
 ├── [module-name].ui.tsx
 │  - Export a minimal React component (no real UI)
 │
 └── README.md
    - Describe purpose, planned DB tables, and TODOs

## 🗃️ Database Table Placeholders (to be added later)

| Module | Table Name | Description |
|:--|:--|:--|
| Referral | referrals | Track user referrals and rewards |
| Rewards | reward_points | Store appreciation-based points |
| Creator | creator_earnings | Creator monetization earnings |
| Team | team_rewards, company_plans | Org-based reward distribution |
| Levels | user_levels | Track user levels and badges |
| Marketplace | store_items, transactions | Reward redemption system |
| Sponsorship | sponsorships, sponsor_rewards | Brand-sponsored events |
| Integrations | integration_rewards | Bonus from connected apps |

## 🧠 DAO Integration (Future)

/lib/dao/income/
 │
 ├── referral.dao.ts
 ├── rewards.dao.ts
 ├── creator.dao.ts
 ├── team.dao.ts
 ├── levels.dao.ts
 ├── marketplace.dao.ts
 ├── sponsorship.dao.ts
 └── integrations.dao.ts

Each DAO file will export async functions such as:
- getAll()
- getById(id: string)
- create(data)
- update(id: string, data)
- delete(id: string)

// TODO: Implement in future release. Use Supabase client and env vars:
// NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY

## 🚀 Future Implementation Plan
- Phase 1: Referral System
- Phase 2: Appreciation Rewards
- Phase 3: Creator Monetization
- Phase 4: Team Rewards
- Phase 5: Levels & Badges
- Phase 6: Marketplace
- Phase 7: Sponsorship
- Phase 8: Integrations

## 🧩 Developer Notes
- Keep all files type-safe with TypeScript
- Use environment variables from .env
- Use // TODO: comments to guide future implementation
- Each module must be self-contained and independently deployable
- Do NOT add routes or APIs now; no navigation links; ensure robots/sitemap exclude unfinished pages
