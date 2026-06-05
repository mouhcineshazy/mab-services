# MAB Services

[![CI](https://github.com/mouhcineshazy/mab-services/actions/workflows/ci.yml/badge.svg)](https://github.com/mouhcineshazy/mab-services/actions/workflows/ci.yml)
[![Netlify Status](https://api.netlify.com/api/v1/badges/dde82410-7298-40d0-9834-f47705b059dc/deploy-status)](https://app.netlify.com/projects/mab-services/deploys)

Professional lead-generation website for **Mohammed Amine BENZAKOUR** — insurance broker and financial security advisor licensed in Québec (AMF) and Ontario (FSRA). The site converts visitors into free consultation requests and ranks on Google and AI search engines for local insurance and financial planning queries.

**Live:** [mabservices-ca.com](https://mabservices-ca.com)

---

## What it does

- Presents insurance and savings/investment services in French and English
- Captures consultation leads via a contact form (emails delivered through Resend)
- Hosts a free masterclass with live Cal.com booking and countdown timer
- Provides bilingual SEO with structured data (JSON-LD), sitemap, and `llms.txt` for AI citation
- Enforces regulatory compliance copy required by AMF (Québec) and FSRA (Ontario)

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 — App Router, Server Actions, SSG |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v3 + CSS custom properties |
| i18n | next-intl v4 — FR and EN, default EN |
| Forms | React Hook Form + Zod + Server Actions |
| Email | Resend (3 000 emails/month free) |
| Booking | Cal.com (popup embed, free tier) |
| Hosting | Netlify (free tier) |
| CI | GitHub Actions — lint → typecheck → build |

---

## Architecture

```
src/
├── app/
│   ├── [locale]/               # All pages under locale prefix (/fr, /en)
│   │   ├── layout.tsx          # Fonts, Navbar, Footer, JSON-LD, HashScrollHandler
│   │   ├── page.tsx            # Home — Hero, TrustStrip, Services, Why, Stats, Masterclass, Consultation
│   │   ├── a-propos/
│   │   ├── assurance-protection/
│   │   ├── epargne-investissement/
│   │   ├── contact/
│   │   └── confidentialite/
│   ├── globals.css             # CSS variables + Tailwind @layer components
│   ├── sitemap.ts              # Auto-generated bilingual sitemap
│   └── robots.ts               # robots.txt — allows AI crawlers (GPTBot, ClaudeBot, Perplexity)
├── components/
│   ├── layout/                 # Navbar (dropdown, mobile, Cal.com CTA), Footer
│   ├── home/                   # Section components (Hero, Services, Masterclass, Consultation…)
│   ├── forms/                  # ConsultationForm (React Hook Form + Zod)
│   └── shared/                 # LogoMark, LangSwitcher, CalPopupButton, CountdownTimer, icons
├── actions/
│   └── consultation.ts         # Server Action — validates + sends email via Resend
├── lib/
│   ├── calcom.ts               # Cal.com slot API + shared CAL_LINK constants
│   ├── schemas.ts              # JSON-LD schema builders (LocalBusiness, FAQ, Service…)
│   ├── validations.ts          # Zod schemas
│   ├── resend.ts               # Resend client
│   ├── constants.ts            # BASE_URL
│   ├── scroll-target.ts        # Cross-page hash scroll coordination
│   └── utils.ts                # cn() + escapeHtml()
├── i18n/
│   ├── routing.ts              # defineRouting — locales: ['fr', 'en'], default: 'en'
│   ├── request.ts              # getRequestConfig
│   └── navigation.ts           # next-intl Link, useRouter, usePathname
└── messages/
    ├── fr.json                 # French translations
    └── en.json                 # English translations
```

**Key patterns:**
- Pages and layouts are **Server Components** by default; `'use client'` added only for hooks/events
- Forms submit through **Server Actions** — no API routes, secrets never reach the browser
- Cal.com is a **popup modal** triggered by a styled button — design stays consistent regardless of Cal.com theme
- `MasterclassSection` is **async** — fetches the next available slot from Cal.com API at build/ISR time (`revalidate: 3600`)
- Locale routing: `usePathname()` from next-intl returns the path **without** locale prefix (`/a-propos`, not `/fr/a-propos`)

---

## Local Development

```bash
# Install dependencies
npm install

# Copy env file and fill in your values
cp .env.local.example .env.local

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — redirects to `/en` or `/fr` based on browser language.

### Environment Variables

| Variable | Description |
|---|---|
| `RESEND_API_KEY` | Resend API key — [resend.com](https://resend.com) |
| `RESEND_TO_EMAIL` | Inbox that receives consultation leads |
| `NEXT_PUBLIC_BASE_URL` | Production URL, no trailing slash |
| `CAL_API_KEY` | Cal.com API key (server-only) — used to fetch next masterclass slot |
| `NEXT_PUBLIC_CAL_USERNAME` | Cal.com username |
| `NEXT_PUBLIC_CAL_EVENT_SLUG` | Slug of the masterclass group event |
| `NEXT_PUBLIC_CAL_CONSULTATION_SLUG` | Slug of the 1:1 consultation event |

---

## CI / CD

GitHub Actions runs on every push and pull request to `master`:

```
lint → typecheck → build
```

Lint and typecheck run in parallel. Build only runs when both pass. The Next.js build cache is preserved between runs to cut rebuild time by ~60%.

Netlify deploys automatically on every push to `master` once CI passes.

---

## Deployment

Hosted on **Netlify** (free tier). Connected to this GitHub repo — every push to `master` triggers a new deploy.

**To deploy from scratch:**
1. Connect this repo on [app.netlify.com](https://app.netlify.com)
2. Netlify auto-detects Next.js — no config file needed
3. Add all variables from `.env.local.example` in Site settings → Environment variables
4. Set production branch to `master`
