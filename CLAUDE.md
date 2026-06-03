# MAB Services — Claude Project Instructions

This file is read at the start of every session. All instructions here are **mandatory and always active**.

---

## Project Identity

**MAB Services** is a professional lead-generation website for Mohammed Amine BENZAKOUR, an insurance broker and financial security advisor licensed in Québec (AMF) and Ontario (FSRA). The site is built to generate consultation leads and rank well on Google and AI systems.

- **Domain**: mabservices-ca.com
- **Contact**: 613-261-4428 | sales@mabservices-ca.com
- **Goal**: Convert visitors into free consultation requests

---

## Always-Active Skills

The following three expert skills are active in every conversation for this project. Apply all three perspectives simultaneously when answering any question or writing any code.

@.claude/skills/frontend-architect.md

@.claude/skills/web-designer.md

@.claude/skills/seo-geo-expert.md

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v3 + CSS custom properties |
| i18n | next-intl v3.26 — FR (default) and EN |
| Forms | React Hook Form + Zod + Server Actions |
| Email | Resend (3k/month free) |
| Hosting | Vercel Hobby (free) |
| Analytics | Vercel Analytics (optional) |

---

## Project Structure

```
src/
  app/
    [locale]/              # All pages live under a locale prefix
      layout.tsx           # Locale layout: fonts, Navbar, Footer, JSON-LD
      page.tsx             # Home page
      a-propos/
      assurance-protection/
      epargne-investissement/
      contact/
      confidentialite/
    globals.css            # CSS variables + Tailwind @layer components
    layout.tsx             # Root layout (returns children as-is)
    sitemap.ts             # Auto-generated bilingual sitemap
    robots.ts              # robots.txt with AI crawler allowlist
  components/
    layout/                # Navbar, Footer
    home/                  # Section components (HeroSection, ServicesGrid…)
    forms/                 # ConsultationForm, MasterclassForm
    shared/                # LogoMark, LangSwitcher, ParticleCanvas, JsonLd
  i18n/
    routing.ts             # defineRouting — locales: ['fr', 'en']
    request.ts             # getRequestConfig — loads messages per locale
    navigation.ts          # createNavigation — Link, useRouter, usePathname
  lib/
    validations.ts         # Zod schemas (consultationSchema, masterclassSchema)
    resend.ts              # Resend client + FROM/TO email constants
    schemas.ts             # JSON-LD schema builders
    utils.ts               # cn() helper (clsx + tailwind-merge)
  actions/
    consultation.ts        # Server Action: submit consultation form
    masterclass.ts         # Server Action: submit masterclass registration
  messages/
    fr.json                # French translations (default locale)
    en.json                # English translations
public/
  logo.svg                 # SVG wordmark
  llms.txt                 # GEO entity file for AI crawlers
```

---

## Critical Patterns — Always Follow

### Next.js 15 async params
```typescript
// CORRECT — params is a Promise in Next.js 15
const { locale } = await params;

// WRONG — never access params synchronously
const { locale } = params;
```

### Translation strings with HTML
```typescript
// CORRECT — use t.raw() when the message contains HTML tags (<strong>, <em>)
<p dangerouslySetInnerHTML={{ __html: t.raw('key') as string }} />
<h2 dangerouslySetInnerHTML={{ __html: (t.raw('title') as string).replace(...) }} />

// WRONG — t() parses HTML as ICU Rich Text and throws FORMATTING_ERROR
<p dangerouslySetInnerHTML={{ __html: t('key') }} />
```

### Client vs Server Components
```typescript
// Server Component by default — no directive needed
export default async function InsurancePage() { ... }

// Client Component — only when using hooks, events, or browser APIs
'use client';
export default function ConsultationForm() { ... }

// Dynamic import with ssr:false — ONLY valid inside a Client Component
'use client';
const ParticleCanvas = dynamic(() => import('...'), { ssr: false });
```

### JSON-LD schemas
```typescript
// Add to page JSX (not generateMetadata) using the JsonLd component
import JsonLd from '@/components/shared/JsonLd';
import { faqSchema } from '@/lib/schemas';

return (
  <>
    <JsonLd schema={faqSchema(faqs)} />
    <div>...</div>
  </>
);
```

### Namespace collision in translations
```
// Consultation namespace has BOTH:
//   "email": { "label": "...", "value": "..." }  ← contact info object
//   "emailField": "..."                           ← form field label (renamed to avoid collision)
// Always use t('emailField') for the form label, t('email.label') for contact info
```

---

## CSS Conventions

All design tokens are CSS custom properties defined in `globals.css`:

```
--bg, --bg-2, --bg-3          Background layers
--em, --em-dark, --em-light   Emerald accent shades
--em-subtle, --em-glow        Emerald backgrounds / glows
--border, --border-em         Border colors
--text, --text-2, --text-3    Text hierarchy (mapped as content, content-muted, content-subtle in Tailwind)
--gold                        Gold accent (masterclass badge only)
```

Reusable component classes in `globals.css`:
```
.section / .section-alt       Section padding + alternating backgrounds
.section-label                Small emerald uppercase label with leading line
.section-title                H2 style
.btn / .btn-primary / .btn-outline / .btn-green-dark
.card / .card-hover / .card-accent
.form-input / .form-label
.badge / .badge-dot
.gradient-text
```

Use these classes before creating new ones. New variants extend existing classes.

---

## Sections with IDs (scroll targets)

All home page sections have `id` attributes and `scroll-mt-[70px]` for the fixed navbar:

| ID | Section |
|----|---------|
| `#hero` | HeroSection |
| `#services` | ServicesGrid |
| `#about` | WhySection |
| `#masterclass` | MasterclassSection |
| `#contact` | ConsultationSection |

---

## Environment Variables

| Variable | Where used |
|----------|-----------|
| `RESEND_API_KEY` | `src/lib/resend.ts` — email sending |
| `NEXT_PUBLIC_BASE_URL` | `src/app/[locale]/layout.tsx` — metadataBase |

Never expose secrets in `NEXT_PUBLIC_` variables. `RESEND_API_KEY` is server-only.

---

## What NOT to do

- Never add `console.log` to production code
- Never hardcode `fr` or `en` strings in components — use the `locale` param or `useLocale()` hook
- Never use `<img>` — always `next/image` for raster images
- Never use `<a>` for internal navigation — always next-intl's `<Link>` from `@/i18n/navigation`
- Never write `dangerouslySetInnerHTML` with user-supplied content
- Never commit `.env.local` or any file containing API keys
- Never use `t()` on translation strings that contain HTML — use `t.raw()` instead
- Never put `'use client'` on a layout or page file that doesn't need it — it forces the entire subtree to be client-rendered

---

## Before Every Code Change

1. Does this follow the patterns above?
2. Does it work correctly in both `fr` and `en` locales?
3. Does it maintain the existing design system (tokens, classes, spacing)?
4. Does it have any SEO or GEO impact (metadata, structured data, content)?
5. Is it accessible (contrast, keyboard nav, ARIA)?
6. Run `npm run build` mentally — will TypeScript and Next.js accept this?
