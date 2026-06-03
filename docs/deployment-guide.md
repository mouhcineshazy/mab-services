# MAB Services — Deployment & Services Setup Guide

> **Assumption**: Domain `mabservices-ca.com` is already purchased. Node.js ≥ 18 and Git are installed locally.

---

## Table of Contents

1. [GitHub — Push the code](#1-github--push-the-code)
2. [Vercel — Create & deploy the project](#2-vercel--create--deploy-the-project)
3. [Environment variables](#3-environment-variables)
4. [Custom domain — DNS configuration](#4-custom-domain--dns-configuration)
5. [Resend — Email service setup](#5-resend--email-service-setup)
6. [Google Search Console](#6-google-search-console)
7. [Vercel Analytics (optional)](#7-vercel-analytics-optional)
8. [Post-launch checklist](#8-post-launch-checklist)

---

## 1. GitHub — Push the code

### 1.1 Create the GitHub repository

1. Go to [github.com/new](https://github.com/new)
2. Repository name: `MAB-services`
3. Set to **Private** (financial services site — keep code private)
4. **Do not** initialize with README, .gitignore, or license (the project already has these)
5. Click **Create repository**

### 1.2 Push from local

```bash
# Inside the project directory
git add .
git commit -m "Initial commit — MAB Services website"
git remote add origin https://github.com/YOUR_USERNAME/MAB-services.git
git branch -M main
git push -u origin main
```

> Replace `YOUR_USERNAME` with your GitHub username.

---

## 2. Vercel — Create & deploy the project

### 2.1 Create a Vercel account

1. Go to [vercel.com](https://vercel.com) and sign up with your GitHub account
2. Choose the **Hobby** plan (free — sufficient for this project)

### 2.2 Import the GitHub repository

1. From the Vercel dashboard, click **Add New → Project**
2. Click **Import Git Repository**
3. Select the `MAB-services` repository
4. Vercel will auto-detect **Next.js** — no framework configuration needed

### 2.3 Configure the project before first deploy

On the **Configure Project** screen:

| Field | Value |
|-------|-------|
| Project Name | `mab-services` |
| Framework Preset | Next.js (auto-detected) |
| Root Directory | `.` (leave as is) |
| Build Command | `npm run build` (auto-detected) |
| Output Directory | `.next` (auto-detected) |
| Install Command | `npm install` (auto-detected) |

**Add environment variables now** (see §3 before clicking Deploy).

### 2.4 Deploy

Click **Deploy**. The first build takes ~2 minutes. Vercel will give you a preview URL like `mab-services-abc123.vercel.app`.

### 2.5 Subsequent deployments

Every `git push` to `main` triggers an automatic production deployment. Pull requests get their own preview URLs automatically.

---

## 3. Environment variables

These must be set in Vercel **before** the first deploy (or in Settings → Environment Variables after).

### 3.1 Required variables

| Variable | Value | Environment |
|----------|-------|-------------|
| `RESEND_API_KEY` | Your Resend API key (see §5) | Production, Preview |
| `NEXT_PUBLIC_BASE_URL` | `https://mabservices-ca.com` | Production |
| `NEXT_PUBLIC_BASE_URL` | `https://mab-services-xxx.vercel.app` | Preview |

### 3.2 How to add in Vercel

1. Go to your project → **Settings → Environment Variables**
2. For each variable: enter the name, value, and select which environments it applies to
3. Click **Save**
4. **Redeploy** for changes to take effect: Deployments → three-dot menu → **Redeploy**

### 3.3 Local development (.env.local)

Create this file at the project root (already in `.gitignore` — never commit it):

```bash
# .env.local
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

---

## 4. Custom domain — DNS configuration

### 4.1 Add the domain in Vercel

1. Go to your project → **Settings → Domains**
2. Enter `mabservices-ca.com` → click **Add**
3. Also add `www.mabservices-ca.com` → Vercel will offer to redirect it to the apex domain ✓

### 4.2 DNS records to add at your registrar

Log in to wherever you purchased the domain (Namecheap, GoDaddy, Google Domains, etc.) and add these records:

#### Apex domain (`mabservices-ca.com`)

| Type | Name | Value | TTL |
|------|------|-------|-----|
| `A` | `@` | `76.76.21.21` | 3600 |

> Some registrars require an `ALIAS` or `ANAME` record instead of `A` for the apex. If your registrar supports it, use: `ALIAS @ cname.vercel-dns.com`

#### www subdomain

| Type | Name | Value | TTL |
|------|------|-------|-----|
| `CNAME` | `www` | `cname.vercel-dns.com` | 3600 |

### 4.3 Verification & SSL

- DNS propagation takes **5–30 minutes** (up to 48h in rare cases)
- Vercel automatically provisions a **free SSL certificate** (Let's Encrypt) once DNS is verified
- You can check propagation at [dnschecker.org](https://dnschecker.org)
- In Vercel → Settings → Domains, the domain will show a green checkmark when active

### 4.4 Verify it works

```bash
curl -I https://mabservices-ca.com
# Should return: HTTP/2 200
```

---

## 5. Resend — Email service setup

Resend handles the form submission emails (consultation requests and masterclass registrations sent to `sales@mabservices-ca.com`).

### 5.1 Create a Resend account

1. Go to [resend.com](https://resend.com) and sign up (free: 3,000 emails/month)
2. Verify your email address

### 5.2 Add and verify your sending domain

The forms send from `noreply@mabservices-ca.com`. You must verify this domain with Resend.

1. In Resend dashboard → **Domains → Add Domain**
2. Enter `mabservices-ca.com` → click **Add**
3. Resend will show you DNS records to add. Add all of them at your registrar:

#### DNS records for Resend (add these alongside the Vercel records)

| Type | Name | Value |
|------|------|-------|
| `MX` | `send` | `feedback-smtp.us-east-1.amazonses.com` (Resend provides exact value) |
| `TXT` | `resend._domainkey` | `p=...` (DKIM key — Resend provides exact value) |
| `TXT` | `@` | `v=spf1 include:amazonses.com ~all` |

> **Important**: Resend shows the exact values for your account in their dashboard. Use those, not the placeholders above.

4. Click **Verify DNS Records** in Resend after adding them
5. Wait 5–15 minutes for DNS to propagate, then verify

### 5.3 Get your API key

1. Resend dashboard → **API Keys → Create API Key**
2. Name: `MAB Services Production`
3. Permission: **Sending access**
4. Click **Add** — copy the key immediately (shown only once)
5. Paste it as `RESEND_API_KEY` in Vercel environment variables (§3.2)

### 5.4 Test email sending

After deploy, submit the consultation form on the live site and confirm the email arrives at `sales@mabservices-ca.com`. Check spam folder if not received.

If testing locally:

```bash
# .env.local must have RESEND_API_KEY set
npm run dev
# Submit the form on http://localhost:3000/fr/contact
```

### 5.5 Optional: Monitor Resend logs

Resend dashboard → **Logs** shows every email sent, delivered, bounced, or spam-marked. Check this weekly initially.

---

## 6. Google Search Console

Registers the site with Google, allows sitemap submission, and monitors indexing and search performance.

### 6.1 Add the property

1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Click **Add property → Domain** (not URL prefix — Domain covers all subdomains and both http/https)
3. Enter `mabservices-ca.com`
4. Google will ask you to add a DNS TXT record for verification

### 6.2 Verification DNS record

Add this at your registrar:

| Type | Name | Value |
|------|------|-------|
| `TXT` | `@` | `google-site-verification=XXXXXXXXXXXX` (Google provides the exact value) |

> You may already have a TXT record for SPF (`v=spf1...`). Most registrars allow multiple TXT records on `@` — add the Google verification as a separate TXT record.

Click **Verify** in Search Console after adding the record.

### 6.3 Submit both sitemaps

Once verified:

1. Left sidebar → **Sitemaps**
2. Submit: `https://mabservices-ca.com/sitemap.xml`
3. Google will crawl it and discover all 12 locale-versioned URLs

### 6.4 Request indexing for key pages

1. Use the **URL Inspection** tool
2. Enter each key URL and click **Request Indexing**:
   - `https://mabservices-ca.com/fr`
   - `https://mabservices-ca.com/fr/assurance-protection`
   - `https://mabservices-ca.com/fr/epargne-investissement`
   - `https://mabservices-ca.com/fr/a-propos`

Initial indexing takes 1–7 days.

### 6.5 Monitor ongoing

Check Search Console weekly for:
- **Coverage** — any pages with errors or excluded
- **Performance** — clicks, impressions, average position
- **Core Web Vitals** — page speed scores

---

## 7. Vercel Analytics (optional)

Provides privacy-friendly page view and performance metrics without needing Google Analytics.

### 7.1 Enable in Vercel

1. Project → **Analytics tab → Enable**
2. It's free on the Hobby plan (limited to 2,500 data points/month)

### 7.2 Add the package

```bash
npm install @vercel/analytics
```

### 7.3 Add to the locale layout

In `src/app/[locale]/layout.tsx`, add the Analytics component:

```tsx
import { Analytics } from '@vercel/analytics/react';

// Inside the <body>:
<Analytics />
```

This is the only change needed — Vercel handles the rest automatically.

---

## 8. Post-launch checklist

Run through this after the domain is live and verified.

### Technical

- [ ] `https://mabservices-ca.com` loads and redirects to `/fr`
- [ ] `https://www.mabservices-ca.com` redirects to `https://mabservices-ca.com`
- [ ] SSL certificate is valid (green padlock in browser)
- [ ] `https://mabservices-ca.com/sitemap.xml` returns XML with 12 URLs
- [ ] `https://mabservices-ca.com/robots.txt` returns correct rules
- [ ] `https://mabservices-ca.com/llms.txt` is accessible
- [ ] Both EN and FR language switcher works correctly
- [ ] Consultation form sends email to `sales@mabservices-ca.com`
- [ ] Masterclass form sends email to `sales@mabservices-ca.com`

### SEO / GEO

- [ ] Sitemap submitted in Google Search Console
- [ ] Key pages requested for indexing
- [ ] JSON-LD validates at [schema.org/validator](https://validator.schema.org) — paste the page URL
- [ ] Open Graph previews correctly — test at [opengraph.xyz](https://www.opengraph.xyz)
- [ ] `hreflang` tags are correct — test at [technicalseo.com/tools/hreflang](https://technicalseo.com/tools/hreflang/)

### Regulatory (important for financial services)

- [ ] AMF license number added to Footer disclaimer (replace `[XXXXX]`)
- [ ] FSRA license number added to Footer disclaimer (replace `[XXXXX]`)
- [ ] JSON-LD `localBusinessSchema` updated with real license numbers in `hasCredential`

### Business

- [ ] Phone number `613-261-4428` is clickable and calls correctly on mobile
- [ ] Email `sales@mabservices-ca.com` inbox is monitored
- [ ] Form submission notification tested end-to-end
- [ ] Google Search Console verified and sitemap indexed

---

## DNS summary — all records in one place

Here is every DNS record that needs to be added at your registrar:

| Type | Name | Value | Purpose |
|------|------|-------|---------|
| `A` | `@` | `76.76.21.21` | Vercel — apex domain |
| `CNAME` | `www` | `cname.vercel-dns.com` | Vercel — www redirect |
| `TXT` | `@` | `google-site-verification=XXXX` | Google Search Console |
| `TXT` | `@` | `v=spf1 include:amazonses.com ~all` | Resend — SPF |
| `TXT` | `resend._domainkey` | `p=XXXX` (from Resend) | Resend — DKIM |
| `MX` | `send` | (from Resend dashboard) | Resend — bounce handling |

> Replace all `XXXX` values with the exact strings provided by each service.  
> Multiple TXT records on `@` are allowed — add each as a separate record.

---

## Recommended order of operations

```
1. Push code to GitHub
2. Import project in Vercel (without domain yet)
3. Add RESEND_API_KEY env var, deploy, get preview URL
4. Set up Resend domain + get API key, update env var
5. Add custom domain in Vercel → note required DNS records
6. Add ALL DNS records at registrar in one session (Vercel + Resend + Google)
7. Wait 15–30 min for DNS propagation
8. Verify domain in Vercel → SSL auto-provisioned
9. Verify domain in Resend → test form email
10. Add Google Search Console → submit sitemap
11. Run post-launch checklist
```

---

*Last updated: June 2026*
