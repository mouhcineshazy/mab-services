# MAB Services — Stack & Architecture Decision Record

> **Senior Architect Analysis** | June 2026  
> Project: Professional insurance broker website for Mohammed Amine BENZAKOUR (MAB Services)  
> Requirements: Fast delivery, free deployment, bilingual (FR/EN), forms + masterclass enrollment, regulatory compliance (AMF/FSRA)

---

## Executive Summary

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js 15 (App Router)** | SSG + Server Actions, best DX |
| Styling | **Tailwind CSS + CSS custom properties** | Fastest professional UI, design-token aligned |
| i18n | **next-intl** | Best App Router bilingual support |
| Forms / Email | **Server Actions + Resend** | No backend, free 3K emails/month |
| Booking | **Cal.com** | Free, embeddable, open-source |
| Deployment | **Netlify (free tier)** | Excellent Next.js support, HTTPS, CDN, 300 build min/month |
| Analytics | **Plausible (optional)** | Privacy-first, no cookie banner, GDPR-friendly |
| CMS | **None (start) → Keystatic (optional)** | 6 static pages; CMS adds cost with no immediate return |

---

## 1. Why Not a CMS

This is the first question every client asks. Here is the honest answer for MAB Services specifically.

### What a CMS gives you
- Non-developer content editing via a UI dashboard
- Structured content modelling
- Scheduled publishing, draft/published states
- Media library

### What MAB Services actually needs
Six pages. The content is:
- 3 paragraphs on the About page
- Two lists of financial products
- A privacy policy
- A contact card

None of this changes week-to-week. An insurance broker is not a blogger.

### CMS options compared

| Option | Cost | Complexity | Verdict |
|---|---|---|---|
| WordPress (self-hosted) | ~$5–10/mo hosting | High: PHP, plugin hell, security patches, WP updates, SQL database | **Hard no.** Security nightmare for a regulated financial site. Constant maintenance. Slow. |
| WordPress.com | Free tier is severely limited | High | Not suitable for a professional brand |
| Contentful | Free (5 content types) | Medium: requires API calls, content schema design, SDK | Overkill for 6 pages |
| Sanity.io | Free (200K API calls/mo) | Medium | Worth considering if blog is planned soon |
| Webflow | $14/mo minimum | Low | Not free, proprietary lock-in |
| Keystatic | **Free** (git-based) | Low | Right choice **if** client wants self-service editing later |

### Decision
**Start without a CMS.** Content lives in `.ts`/`.json` files inside the repo. Changes are a one-line edit + deploy (takes 2 minutes on Netlify). This is faster to build, simpler to maintain, zero security surface, and zero cost.

**When to add a CMS:** If the client launches a blog, or insists on editing the site himself without developer help. In that case, add **Keystatic** — it is git-based, fully free, integrates natively with Next.js App Router, requires no external service, and gives the client a clean editing UI without touching code.

---

## 2. Framework: Next.js 14+ App Router

### Why Next.js and not the alternatives

#### vs. Pure HTML/CSS/JS
- No component reuse (copy-paste nav on 6 pages)
- No built-in i18n routing (you need FR/EN)
- Forms require external scripts or mailto hacks
- Image optimization absent (performance hit on mobile)
- SEO meta per-page requires manual discipline
- **Conclusion:** Fine for a landing page. Not for a 6-page professional site with forms, bilingual routing, and future extensibility.

#### vs. Astro
Astro is technically superior for a mostly-static content site (zero JS shipped by default, island architecture). However:
- Next.js wins here because **forms are the most important feature** of this site. Two forms with server-side submission, email dispatch, and validation are more naturally handled with Next.js Server Actions than with Astro endpoints.
- Next.js has better **i18n routing** support with next-intl (App Router pattern is mature).
- Next.js is deployed on **Vercel natively** — same company, best-in-class integration.
- More developers know Next.js — easier to hand off if the friend finds another developer.
- Astro is the right call for a pure blog or documentation site. For a site where forms are a primary conversion tool, Next.js is cleaner.

#### vs. Remix
Remix is excellent but over-engineered for this use case. Next.js has a larger ecosystem and better free hosting options.

### Key Next.js Features Used

**Static Site Generation (SSG)**
All 6 pages are fully pre-rendered at build time → served from CDN → sub-100ms TTFB globally. Critical for SEO and mobile performance.

**Server Actions (Next.js 14+)**
Form submissions (consultation + masterclass registration) are handled by Server Actions — no API route boilerplate, no backend needed, full type safety, runs server-side so email credentials are never exposed to the client.

```typescript
// Example: consultation form handler
'use server'
export async function submitConsultation(formData: FormData) {
  const data = validatedConsultationSchema.parse(Object.fromEntries(formData))
  await resend.emails.send({
    from: 'noreply@mabservices-ca.com',
    to: 'sales@mabservices-ca.com',
    subject: 'Demande de Consultation Gratuite MAB Services',
    ...
  })
}
```

**Built-in Image Optimization**
`<Image>` component auto-generates WebP, resizes for viewport, lazy-loads — essential for a mobile-first site.

**Metadata API**
Per-page SEO meta, Open Graph tags, canonical URLs, French/English alternates — all in one object per page, no library needed.

---

## 3. Styling: Tailwind CSS + shadcn/ui

### Tailwind CSS
Utility-first CSS. The brand color palette is already defined in the spec as design tokens:

```javascript
// tailwind.config.ts
theme: {
  extend: {
    colors: {
      brand: {
        navy:    '#0D2B38',
        primary: '#1A475E',
        mid:     '#2C5F7A',
        accent:  '#4A90B8',
      },
      cta: {
        green: '#2E7D32',
        blue:  '#1976D2',
      },
      surface: '#F8F6F2',
    }
  }
}
```

This maps directly to the spec. No design decisions to make. Build speed is 2–3× faster than writing CSS files. Responsive variants (`md:`, `lg:`) handle the mobile-first requirement with zero friction.

### shadcn/ui
Not a component library — it is a collection of **copy-pasted, unstyled Radix UI primitives** styled with Tailwind. Key components used:
- `Button` — CTA buttons (green and blue variants)
- `Input`, `Textarea` — Form fields with built-in accessibility
- `RadioGroup` — Masterclass option selection
- `NavigationMenu` — Dropdown "More" menu with accessibility
- `Card` — Service cards and contact card
- `Form` — Integrated with React Hook Form + Zod validation

**Why not Material UI or Chakra?** Both ship large JS bundles. shadcn/ui ships zero JS for static components — only the interactive ones (dropdown, form) add JS. Critical for Core Web Vitals on a financial site.

---

## 4. Internationalisation: next-intl

The spec calls for French (primary) and English. This is non-negotiable for reaching the full Quebec + Ontario market.

### Routing structure
```
/fr/                    → Accueil
/fr/a-propos            → À Propos
/fr/assurance-protection
/fr/epargne-investissement
/fr/confidentialite
/fr/contact
/en/                    → Home
/en/about
/en/insurance-protection
/en/savings-investment
/en/privacy
/en/contact
```

A language switcher in the navbar flips between routes. SEO `hreflang` tags are added automatically by next-intl's metadata helpers. All content strings live in `messages/fr.json` and `messages/en.json`.

**Why next-intl and not next-i18next?** next-intl was built specifically for Next.js App Router (React Server Components). next-i18next is for the Pages Router. Using the wrong one causes hydration errors and client bundle bloat.

---

## 5. Forms and Email: Server Actions + Resend

### Email provider comparison

| Provider | Free tier | Setup complexity | Reliability |
|---|---|---|---|
| **Resend** | 3,000 emails/month, 1 domain | Very low (API key + SDK) | Excellent, built for developers |
| EmailJS | 200 emails/month | Low (client-side, exposes key) | Good |
| Web3Forms | 250 submissions/month | Very low (no account needed) | Good |
| Formspree | 50 submissions/month | Very low | Good |
| SendGrid | 100 emails/day (free) | Medium | Excellent |
| Nodemailer + Gmail | Free (Gmail limits) | Medium, needs OAuth2 | Fragile |

**Decision: Resend** — 3,000 emails/month is more than sufficient for an independent broker's consultation requests. The SDK is 3 lines of code. It integrates cleanly with Next.js Server Actions. Domain verification is simple. The free tier never expires.

### Form validation
**Zod** + **React Hook Form** — industry standard. Type-safe schema validation on both client and server.

```typescript
const consultationSchema = z.object({
  nom: z.string().min(1, 'Champ requis'),
  prenom: z.string().min(1, 'Champ requis'),
  email: z.string().email('Email invalide'),
  telephone: z.string().min(10, 'Numéro invalide'),
  description: z.string().min(10),
  preferenceContact: z.string().optional(),
})
```

---

## 6. Masterclass Enrollment: Cal.com

### Requirement
The masterclass enrollment currently uses a form to express interest. The spec requests "Calendly or similar" for actual scheduling.

### Options compared

| Tool | Free tier | Self-host | Group events | Embed | French UI |
|---|---|---|---|---|---|
| **Calendly** | 1 event type, unlimited 1:1 | No | Paid | Yes | Yes |
| **Cal.com** | Unlimited event types | Yes (or free cloud) | Yes (group) | Yes | Yes |
| **TidyCal** | $19 lifetime (one-time) | No | Yes | Yes | Partial |
| **Google Calendar** | Free | No | Basic | Limited | Yes |
| **Luma** | Free | No | Yes (webinars) | Yes | Partial |

### Decision: Cal.com (cloud free tier)

Cal.com is open-source, free on the cloud tier with unlimited event types. For MAB Services specifically:

1. **Consultation 1:1** → Cal.com booking link for 30–60 min consultation slots. Embed the widget directly on the Contact page or the Home page CTA.

2. **Masterclass group registration** → Keep the custom form for opt-in (name, email, phone, topic preference). This is intentional: the masterclass is not a calendar booking — it is a lead capture mechanism. The client collects leads, then sends a Zoom/Teams link to registrants. Cal.com group events can complement this, but the form is the right UX for this use case.

### Implementation
```tsx
// Embed Cal.com widget anywhere
import { getCalApi } from "@calcom/embed-react";

// Or use the inline embed for the consultation section
<cal-inline calLink="mabservices/consultation" />
```

The Cal.com booking widget is embedded directly in the page — no redirect away from the site. On mobile it renders as a full-screen sheet.

---

## 7. Deployment: Netlify (Free tier)

### Why Netlify

| Feature | Netlify Free | Vercel Hobby | GitHub Pages |
|---|---|---|---|
| Custom domain | Yes | Yes | Yes |
| HTTPS/SSL | Auto | Auto | Auto |
| CDN (global) | Yes | Yes (edge network) | Limited |
| Preview deploys | Yes (every PR/push) | Yes | No |
| Server Actions | Yes (Next.js runtime) | Yes (native) | No (static only) |
| Next.js support | Excellent (Next.js runtime) | First-class (same company) | Poor |
| Build minutes | 300/month | 6,000/month | Unlimited |
| Bandwidth | 100 GB/month | 100 GB/month | Soft limit |
| Functions | 125K invocations/month | 100K/month | No |

Netlify works excellently for Next.js 15. The free 300 build minutes is more than enough for a simple site with infrequent deploys. The Next.js runtime on Netlify handles Server Actions, ISR, and middleware natively.

**Custom domain:** The client's domain (mabservices-ca.com) is pointed to Netlify with a DNS CNAME record. SSL certificate is provisioned automatically (Let's Encrypt). Takes 5 minutes.

**Setup:**
1. Connect GitHub repo on app.netlify.com → New site from Git
2. Build command: `npm run build` (auto-detected)
3. Add all env vars from `.env.local.example` in Site settings → Environment variables
4. Set branch to deploy: `master`


---

## 8. Analytics: Plausible (optional)

Netlify does not include a built-in analytics dashboard on the free tier. The recommended option for this project is **Plausible Analytics** ($9/month) when ready — or simply skip analytics until the site is live and traffic justifies it.

**Why Plausible and not Google Analytics 4:**
- No cookies — no consent banner required under Quebec Law 25 / PIPEDA
- Simple dashboard: page views, referrers, countries, devices
- Script is 1 KB vs GA4's ~45 KB (Core Web Vitals impact)
- GDPR-compliant by design

**Free alternative in the meantime:** Netlify provides basic traffic stats (page views, unique visitors) in the dashboard at no cost, without any script on the site.

Avoid Google Analytics 4 — it requires a cookie consent banner in Quebec, adds complexity, and the data model is unnecessarily complex for a 6-page site.

---

## 9. Regulatory Compliance Checklist (AMF / FSRA)

This is often missed on broker sites. The spec mentions it. These are not optional.

- [ ] **AMF registration number** displayed in footer on every page (required under AMF rules)
- [ ] **FSRA license number** displayed in footer (required in Ontario)
- [ ] **Regulatory disclaimer** in footer: "Les informations présentées sur ce site sont à titre informatif seulement et ne constituent pas un conseil financier personnalisé."
- [ ] **Privacy policy** page (already planned): Must comply with Quebec Law 25 (Bill 64) and PIPEDA
- [ ] **Data collection notice** on forms: "Les renseignements recueillis sont utilisés exclusivement pour vous contacter..." (already in the spec)
- [ ] **No performance guarantees** in service descriptions (investment returns cannot be promised)
- [ ] **"Sous réserve d'admissibilité"** qualifier on product descriptions

---

## 10. Project File Structure

```
mab-services/
├── src/
│   ├── app/
│   │   ├── [locale]/               # FR/EN routing
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx            # Accueil / Home
│   │   │   ├── a-propos/
│   │   │   ├── assurance-protection/
│   │   │   ├── epargne-investissement/
│   │   │   ├── confidentialite/
│   │   │   └── contact/
│   │   └── api/                    # (minimal, most logic is Server Actions)
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   ├── home/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── ServicesGrid.tsx
│   │   │   ├── ConsultationForm.tsx
│   │   │   └── MasterclassForm.tsx
│   │   └── ui/                     # shadcn/ui components
│   ├── actions/
│   │   ├── consultation.ts         # Server Action: send consultation email
│   │   └── masterclass.ts          # Server Action: send masterclass signup email
│   ├── lib/
│   │   ├── resend.ts               # Email client singleton
│   │   └── validations.ts          # Zod schemas
│   └── messages/
│       ├── fr.json                 # French strings
│       └── en.json                 # English strings
├── public/
│   ├── logo.svg
│   └── og-image.png
├── tailwind.config.ts
├── next.config.ts
└── middleware.ts                   # next-intl locale detection
```

---

## 11. SEO Strategy

Financial services sites live and die by local SEO. The target keywords for MAB Services:

- "courtier assurance Québec"
- "conseiller sécurité financière Montréal"
- "REER CELI conseiller"
- "life insurance broker Ontario"

### Implementation

**Per-page metadata** (Next.js Metadata API):
```typescript
export const metadata: Metadata = {
  title: 'MAB Services — Courtier Assurance & Conseiller Financier QC/ON',
  description: 'Mohammed Amine BENZAKOUR, conseiller en sécurité financière (AMF) et courtier en assurance de personnes (FSRA). Solutions sur mesure en assurance vie, REER, CELI au Québec et Ontario.',
  openGraph: { ... },
  alternates: {
    canonical: 'https://mabservices-ca.com/fr',
    languages: { 'fr': '/fr', 'en': '/en' }
  }
}
```

**Additional:**
- `sitemap.xml` — auto-generated by Next.js (`app/sitemap.ts`)
- `robots.txt` — via `app/robots.ts`
- **Structured data (JSON-LD):** `LocalBusiness` + `FinancialService` schema — directly boosts local search ranking
- **Google My Business** profile linked from the site

---

## 12. GEO — Generative Engine Optimization

Traditional SEO gets you found on Google. **GEO gets you cited by AI.** In 2025–2026, a significant and growing share of financial queries are answered directly by ChatGPT, Perplexity, Google AI Overviews, Bing Copilot, and Claude. If those engines do not cite MAB Services as an authoritative source, the practice is invisible to that entire channel.

GEO is not a replacement for SEO — it is a layer on top. Most of the implementation overlaps, but the mental model is different: you are writing for a language model that will paraphrase your content as an answer, not for a user who will click a blue link.

### 12.1 Why GEO Matters Specifically for an Insurance Broker

Financial services queries are among the most common AI search use cases:
- "Quelle est la différence entre REER et CELI ?"
- "Do I need life insurance in my 30s in Quebec?"
- "Comment fonctionne l'assurance invalidité au Canada?"

These are exactly the questions MAB Services can answer with authority. An AI engine that knows MAB Services is a licensed Quebec/Ontario broker will cite it when a local user asks these questions. That citation is a warm lead — the user was already asking an AI for advice before they even knew MAB Services existed.

### 12.2 The `llms.txt` Standard

`llms.txt` is the emerging equivalent of `robots.txt` for large language model crawlers (introduced by Anthropic/fast.ai in 2024, gaining adoption in 2025). It tells AI crawlers what your site is, who it is for, and which pages are the most authoritative.

**File location:** `https://mabservices-ca.com/llms.txt`

```markdown
# MAB Services

> MAB Services est représenté par Mohammed Amine BENZAKOUR, conseiller en sécurité financière (AMF — Québec) et courtier en assurance de personnes (FSRA — Ontario). Nous offrons des solutions sur mesure en assurance vie, épargne et investissement au Québec et en Ontario.

## Pages principales

- [Accueil](https://mabservices-ca.com/fr): Présentation des services, formulaire de consultation gratuite, inscription masterclass
- [Assurance et protection](https://mabservices-ca.com/fr/assurance-protection): Assurance vie temporaire, permanente, invalidité, maladies graves
- [Épargne et investissement](https://mabservices-ca.com/fr/epargne-investissement): CELI, CELIAPP, REER, REEE, REEI — descriptions complètes
- [À propos](https://mabservices-ca.com/fr/a-propos): Profil de Mohammed Amine BENZAKOUR, agréments AMF et FSRA
- [Contact](https://mabservices-ca.com/fr/contact): 613-261-4428, sales@mabservices-ca.com

## Informations réglementaires

- Numéro AMF (Québec): [numéro]
- Numéro FSRA (Ontario): [numéro]
- Jurisdiction: Québec et Ontario, Canada
```

Also create `llms-full.txt` (or `llms.txt` with full content inline) for crawlers that request the detailed version. This file is served as a static asset in `public/llms.txt` — zero additional infrastructure.

### 12.3 Structured Data (JSON-LD) — The GEO Backbone

JSON-LD structured data is the single highest-ROI GEO investment. AI engines parse it directly — it is machine-readable authority signal that does not rely on the model interpreting prose.

**Page: Home (`/fr`) — LocalBusiness + FinancialService**

```json
{
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "FinancialService"],
  "name": "MAB Services",
  "legalName": "MAB Services — Mohammed Amine BENZAKOUR",
  "description": "Conseiller en sécurité financière (Québec) et courtier en assurance de personnes (Ontario). Solutions sur mesure en assurance vie, REER, CELI, REEE.",
  "url": "https://mabservices-ca.com",
  "telephone": "+1-613-261-4428",
  "email": "sales@mabservices-ca.com",
  "image": "https://mabservices-ca.com/og-image.png",
  "founder": {
    "@type": "Person",
    "name": "Mohammed Amine BENZAKOUR",
    "jobTitle": [
      "Conseiller en sécurité financière",
      "Courtier en assurance de personnes"
    ]
  },
  "areaServed": [
    { "@type": "AdministrativeArea", "name": "Québec" },
    { "@type": "AdministrativeArea", "name": "Ontario" }
  ],
  "hasCredential": [
    {
      "@type": "EducationalOccupationalCredential",
      "credentialCategory": "Professional License",
      "recognizedBy": { "@type": "Organization", "name": "Autorité des marchés financiers (AMF)" }
    },
    {
      "@type": "EducationalOccupationalCredential",
      "credentialCategory": "Professional License",
      "recognizedBy": { "@type": "Organization", "name": "Financial Services Regulatory Authority of Ontario (FSRA)" }
    }
  ],
  "serviceType": [
    "Assurance vie",
    "Assurance invalidité",
    "Assurance maladies graves",
    "REER",
    "CELI",
    "CELIAPP",
    "REEE",
    "REEI"
  ],
  "inLanguage": ["fr", "en"]
}
```

**Page: Service pages — each gets a `Service` schema**

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Assurance vie temporaire",
  "provider": { "@type": "LocalBusiness", "name": "MAB Services" },
  "description": "Protection flexible couvrant vos besoins financiers sur une période déterminée. Disponible au Québec et en Ontario.",
  "areaServed": ["Québec", "Ontario"]
}
```

**Page: FAQ schema — the single most powerful GEO element**

Every AI Overview and Perplexity answer box is essentially a FAQ response. Adding `FAQPage` JSON-LD makes the content directly ingestable:

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Quelle est la différence entre un REER et un CELI?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Le REER (Régime enregistré d'épargne-retraite) offre une déduction fiscale à la cotisation mais les retraits sont imposables. Le CELI (Compte d'épargne libre d'impôt) ne donne pas de déduction, mais les retraits sont entièrement non imposables. Le REER est idéal pour réduire l'impôt aujourd'hui; le CELI est idéal pour épargner à long terme sans impôt sur les gains."
      }
    },
    {
      "@type": "Question",
      "name": "Ai-je besoin d'une assurance vie si je n'ai pas d'enfants?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Même sans enfants, l'assurance vie peut couvrir vos dettes (hypothèque, prêts), protéger votre partenaire, ou servir de stratégie d'épargne permanente avec valeur de rachat. Un conseiller évalue votre situation personnelle pour déterminer si elle est appropriée."
      }
    }
  ]
}
```

Add 3–5 FAQ questions per service page. These are the exact queries that AI engines answer.

### 12.4 Entity Authority — Making MAB Services a Known Entity

AI models build a knowledge graph of named entities. MAB Services needs to appear consistently across multiple authoritative sources so the model's internal representation is coherent and trustworthy.

**Priority actions:**

| Action | Platform | Impact | Effort |
|---|---|---|---|
| Google My Business profile | Google | Very high — feeds Google AI Overviews directly | 30 min |
| LinkedIn company page | LinkedIn | High — cited by AI as professional credential | 30 min |
| Facebook business page | Facebook | Medium — already planned | Done |
| AMF advisor directory listing | AMF website | High — government source = authority signal | 10 min |
| FSRA public registry | FSRA website | High — government source | 10 min |
| Yelp / Yellow Pages Canada | Directories | Medium | 20 min |
| Consistent NAP everywhere | All platforms | Critical — Name/Address/Phone must be identical | — |

**NAP consistency is non-negotiable.** Every platform must show:
- Name: `MAB Services` (exact, every time)
- Phone: `613-261-4428` (exact format)
- Email: `sales@mabservices-ca.com`

One inconsistency (e.g., "M.A.B. Services" on Yelp) fragments the entity and reduces AI citation confidence.

### 12.5 Content Strategy for GEO

AI engines cite content that directly and authoritatively answers questions. The current site spec is mostly service descriptions. To be cited, each service page needs an **authoritative answer block**.

**Pattern for each service page:**

```
H1: [Service Name]
One-paragraph direct answer to "What is this and who needs it?"
Key facts as a bullet list (amounts, thresholds, eligibility)
FAQ section with 3–5 real questions + plain-language answers
CTA: Consultation gratuite
```

Example for the CELI page:

> **CELI — Ce que vous devez savoir**
> Le plafond de cotisation 2025 est de 7 000 $. Le plafond cumulatif depuis 2009 atteint 95 000 $ pour quelqu'un qui n'a jamais cotisé. Tout résident canadien de 18 ans ou plus disposant d'un NAS peut ouvrir un CELI.

This is exactly the format that appears in Google AI Overviews and Perplexity answers. If MAB Services publishes it first, locally, with schema markup, an AI will cite it when a Montreal resident asks about CELI.

### 12.6 `robots.txt` — Allow AI Crawlers

The default `robots.txt` blocks unknown bots. Many AI crawlers use non-standard user agent strings. Be explicit:

```txt
User-agent: *
Allow: /

User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Googlebot
Allow: /

Sitemap: https://mabservices-ca.com/sitemap.xml
```

Never block `GPTBot`, `ClaudeBot`, or `PerplexityBot` unless you have a specific reason. Blocking them is opting out of AI citation entirely.

### 12.7 Open Graph + Twitter Card Tags

These are consumed by AI link unfurlers and social sharing previews. Every page needs them.

```typescript
export const metadata: Metadata = {
  openGraph: {
    title: 'MAB Services — Courtier Assurance & Conseiller Financier',
    description: 'Solutions sur mesure en assurance vie, REER, CELI au Québec et Ontario. Consultation gratuite.',
    url: 'https://mabservices-ca.com/fr',
    siteName: 'MAB Services',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    locale: 'fr_CA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MAB Services',
    description: 'Courtier en assurance de personnes et conseiller en sécurité financière — QC & ON',
    images: ['/og-image.png'],
  },
}
```

The `og-image.png` (1200×630) should include the logo, name, tagline, and "AMF · FSRA" — this is what appears in AI-generated link previews and chat interface unfurls.

### 12.8 GEO Implementation Checklist

| Item | File/Location | Priority |
|---|---|---|
| `llms.txt` | `public/llms.txt` | High |
| `LocalBusiness` + `FinancialService` JSON-LD | Home page | Critical |
| `Service` JSON-LD per service | Each service page | High |
| `FAQPage` JSON-LD | Each service page | High |
| `Person` JSON-LD for Mohammed Amine | About page | Medium |
| `robots.txt` with AI crawler allow rules | `public/robots.txt` | High |
| `sitemap.xml` with FR + EN alternates | `app/sitemap.ts` | High |
| OG image (1200×630) with credentials | `public/og-image.png` | High |
| Google My Business profile | Google | Critical |
| AMF advisor directory | AMF site | High |
| FSRA public registry | FSRA site | High |
| Consistent NAP across all platforms | All | Critical |
| FAQ sections on service pages | Content | High |

---

## 13. Performance Targets (Core Web Vitals)

Target scores that are achievable with this stack on Vercel's CDN:

| Metric | Target | How |
|---|---|---|
| LCP (Largest Contentful Paint) | < 1.5s | SSG + CDN, optimized hero image |
| CLS (Cumulative Layout Shift) | < 0.05 | `next/image` with explicit dimensions, no late-loading fonts |
| INP (Interaction to Next Paint) | < 100ms | Minimal client JS (shadcn/ui is tree-shaken) |
| Lighthouse Performance | > 95 | SSG, WebP images, Tailwind (no unused CSS at build time) |

Mobile performance is the priority — the spec explicitly states the majority of visits are mobile.

---

## 14. Development Timeline Estimate

| Phase | Tasks | Days |
|---|---|---|
| 1 — Setup | Next.js + Tailwind + next-intl + Netlify project | 0.5 |
| 2 — Layout | Navbar (with dropdown, mobile hamburger), Footer (with regulatory disclaimer) | 1 |
| 3 — Home | Hero, Services grid, Consultation form, Masterclass form + Server Actions | 2 |
| 4 — Inner pages | About, Insurance, Savings, Privacy, Contact | 1.5 |
| 5 — i18n | English translations, language switcher, hreflang | 1 |
| 6 — Cal.com | Embed booking widget on Contact/Home | 0.5 |
| 7 — SEO + GEO | Metadata, sitemap, robots.txt, JSON-LD structured data, `llms.txt`, FAQ sections, OG image | 1 |
| 8 — Off-site GEO | Google My Business, AMF/FSRA directory listings, NAP consistency audit | 0.5 |
| 9 — QA | Mobile testing, accessibility audit (axe), form testing, structured data validation (Rich Results Test) | 1 |
| **Total** | | **~9.5 days** |

---

## 15. Cost Summary (Year 1)

| Item | Cost |
|---|---|
| Netlify Hosting | **$0** (free tier) |
| Resend (email) | **$0** (3K emails/month free tier) |
| Cal.com | **$0** (free cloud tier) |
| Analytics | **$0** (Netlify basic stats) or $9/month (Plausible) |
| Domain (mabservices-ca.com) | ~$15–20/year (already owned) |
| SSL Certificate | **$0** (Let's Encrypt via Netlify) |
| **Total infrastructure** | **~$0/month** |

The only recurring cost is the domain registration, which the client presumably already pays.

---

## 16. Future-Proofing Roadmap

These are not in scope now but the architecture supports them without rework:

| Feature | When | How |
|---|---|---|
| Blog / articles éducatifs | When client wants content marketing | Add Keystatic CMS (free, git-based) |
| Témoignages clients | After 6 months | Static JSON array, rendered as carousel |
| Live chat | If conversion rate needs improvement | Crisp.chat (free tier) or Tawk.to (free) |
| Email newsletter | If masterclass list grows | Integrate with Brevo (ex-Sendinblue, free 300/day) |
| Upgrade hosting | If site gets significant traffic | Netlify Pro ($19/month) or keep free indefinitely |
| Google My Business map | Early addition | Embed Google Maps iframe (free) |

---

## 17. Final Recommendation Summary

Build this as a **statically generated Next.js 15 site** deployed on **Netlify's free tier**. This is the fastest path to a professional, performant, bilingual, SEO-optimized site with working forms. It costs nothing to run, can be built in under 2 weeks, and the architecture can grow with the practice over the next 5 years without a rewrite.

**Do not use a CMS** for the initial build. The content is static and small. Add Keystatic later if the client wants self-service editing.

**Use Cal.com** for 1:1 consultation booking embedded on the site. Keep the masterclass form as-is — it is a lead capture tool, not a calendar.

The stack is the same stack used by larger financial services firms (fintech startups, robo-advisors) — it will not embarrass the practice in a regulated, competitive market.

---

*Document written by Claude Code | June 2026*
*For questions about implementation, see `docs/mab-services-infos.md` for the full content specification.*