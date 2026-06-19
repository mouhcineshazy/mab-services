# MAB Services — Deployment & Services Setup Guide

> **Assumption**: Domain `mabservices-ca.com` is purchased via Google Domains (now Squarespace Domains). Node.js ≥ 18 and Git are installed locally.

---

## Table of Contents

1. [GitHub — Push the code](#1-github--push-the-code)
2. [Netlify — Create & deploy the project](#2-netlify--create--deploy-the-project)
3. [Environment variables](#3-environment-variables)
4. [Custom domain — Connect Google Domains to Netlify](#4-custom-domain--connect-google-domains-to-netlify)
5. [Resend — Email service setup](#5-resend--email-service-setup)
6. [Google Search Console](#6-google-search-console)
7. [Analytics (optional)](#7-analytics-optional)
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
git branch -M master
git push -u origin master
```

> Replace `YOUR_USERNAME` with your GitHub username.

---

## 2. Netlify — Create & deploy the project

### 2.1 Create a Netlify account

1. Go to [netlify.com](https://netlify.com) and sign up with your GitHub account
2. The **Free** plan is sufficient for this project (300 build minutes/month, 100GB bandwidth)

### 2.2 Import the GitHub repository

1. From the Netlify dashboard, click **Add new site → Import an existing project**
2. Choose **GitHub** as the Git provider
3. Authorize Netlify to access your repositories
4. Select the `MAB-services` repository

### 2.3 Configure the build settings

Netlify auto-detects Next.js. Confirm these settings:

| Field | Value |
|-------|-------|
| Branch to deploy | `master` |
| Build command | `npm run build` |
| Publish directory | `.next` |
| Node version | `24` (set under Site settings → Build & deploy → Environment) |

**Add environment variables before clicking Deploy** (see §3).

### 2.4 Deploy

Click **Deploy site**. The first build takes ~3 minutes. Netlify gives you a temporary URL like `mab-services-abc123.netlify.app`.

### 2.5 Subsequent deployments

Every `git push` to `master` triggers an automatic production deployment. You can also trigger manually: **Deploys → Trigger deploy → Deploy site**.

---

## 3. Environment variables

Set these in **Netlify → Site configuration → Environment variables** before the first deploy.

### 3.1 Required variables

| Variable | Value | Type |
|----------|-------|------|
| `RESEND_API_KEY` | Your Resend API key (see §5) | Secret |
| `RESEND_FROM_EMAIL` | `MAB Services <consultations@mabservices-ca.com>` | Plain text |
| `RESEND_TO_EMAIL` | `sales@mabservices-ca.com` | Plain text |
| `NEXT_PUBLIC_BASE_URL` | `https://mabservices-ca.com` | Plain text |
| `CAL_API_KEY` | Your Cal.com API key | Secret |
| `NEXT_PUBLIC_CAL_USERNAME` | Your Cal.com username | Plain text |
| `NEXT_PUBLIC_CAL_EVENT_SLUG` | Masterclass event slug (e.g. `masterclass-gratuite`) | Plain text |
| `NEXT_PUBLIC_CAL_CONSULTATION_SLUG` | Consultation event slug (e.g. `consultation-gratuite`) | Plain text |

> **Secret vs Plain text**: Use **Secret** only for `RESEND_API_KEY` and `CAL_API_KEY`. All `NEXT_PUBLIC_` variables must be **Plain text** — marking them Secret causes Netlify's secrets scanner to block the build.

### 3.2 How to add in Netlify

1. Go to **Site configuration → Environment variables → Add a variable**
2. Enter the key name, value, and select the type (Secret or Plain text)
3. Click **Save**
4. **Redeploy** for changes to take effect: Deploys → Trigger deploy → Deploy site

### 3.3 Local development (.env.local)

Create this file at the project root (already in `.gitignore` — never commit it):

```bash
# .env.local — copy from .env.local.example and fill in real values
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx
RESEND_FROM_EMAIL=MAB Services <consultations@mabservices-ca.com>
RESEND_TO_EMAIL=sales@mabservices-ca.com
NEXT_PUBLIC_BASE_URL=http://localhost:3000
CAL_API_KEY=cal_live_xxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_CAL_USERNAME=your-cal-username
NEXT_PUBLIC_CAL_EVENT_SLUG=your-masterclass-slug
NEXT_PUBLIC_CAL_CONSULTATION_SLUG=your-consultation-slug
```

---

## 4. Custom domain — Connect Google Domains to Netlify

Your domain `mabservices-ca.com` was purchased through Google Domains, which has been migrated to **Squarespace Domains**. You log in at [domains.squarespace.com](https://domains.squarespace.com) using your Google account.

There are two approaches. **Option A (recommended)** delegates DNS fully to Netlify and is simpler long-term.

---

### Option A — Use Netlify DNS (recommended)

This lets Netlify manage all your DNS records automatically, including SSL.

#### Step 1 — Add the domain in Netlify

1. Go to **Site configuration → Domain management → Add a domain**
2. Enter `mabservices-ca.com` → click **Verify** → **Add domain**
3. Also add `www.mabservices-ca.com` (Netlify will redirect it to the apex automatically)
4. Netlify will display **4 nameservers** — copy them, e.g.:
   ```
   dns1.p0X.nsone.net
   dns2.p0X.nsone.net
   dns3.p0X.nsone.net
   dns4.p0X.nsone.net
   ```

#### Step 2 — Change nameservers in Squarespace Domains

1. Go to [domains.squarespace.com](https://domains.squarespace.com) and sign in with your Google account
2. Click on `mabservices-ca.com`
3. In the left sidebar click **DNS**
4. Scroll to **Nameservers** → click **Edit**
5. Switch from **Squarespace nameservers** to **Custom nameservers**
6. Enter the 4 Netlify nameservers from Step 1
7. Click **Save**

#### Step 3 — Wait for propagation

- Nameserver changes propagate in **15 minutes to 24 hours**
- Once active, Netlify automatically provisions a free SSL certificate
- In Netlify → Domain management, the domain shows a green checkmark when live

---

### Option B — Keep Squarespace DNS, point manually

Use this if you don't want to change nameservers.

#### Step 1 — Get Netlify's IP

In Netlify → Domain management → add your domain. Netlify will show the required DNS values.

#### Step 2 — Add records in Squarespace Domains

1. Go to [domains.squarespace.com](https://domains.squarespace.com) → click your domain → **DNS**
2. Scroll to **Custom records** → click **Add record**
3. Add these records:

**Apex domain (`mabservices-ca.com`)**

| Type | Host | Value | TTL |
|------|------|-------|-----|
| `A` | `@` | `75.2.60.5` | 3600 |
| `AAAA` | `@` | `2600:1f14:e22:d200::1` | 3600 |

**www subdomain**

| Type | Host | Value | TTL |
|------|------|-------|-----|
| `CNAME` | `www` | `YOUR-SITE-NAME.netlify.app` | 3600 |

> Replace `YOUR-SITE-NAME` with your actual Netlify subdomain (shown in Netlify → Domain management).

#### Step 3 — Verify in Netlify

Once DNS propagates, Netlify provisions SSL automatically. Check propagation at [dnschecker.org](https://dnschecker.org).

---

### 4.3 Verify the domain is live

```bash
curl -I https://mabservices-ca.com
# Should return: HTTP/2 200
```

---

## 5. Resend — Email service setup

Resend sends consultation form submissions to `sales@mabservices-ca.com`.

### 5.1 Create a Resend account

1. Go to [resend.com](https://resend.com) and sign up (free: 3,000 emails/month)
2. Verify your email address

### 5.2 Add and verify your sending domain

Emails send from `consultations@mabservices-ca.com`. You must verify this domain with Resend first.

1. Resend dashboard → **Domains → Add Domain**
2. Enter `mabservices-ca.com` → click **Add**
3. Resend shows DNS records to add — add all of them at your registrar:

| Type | Name | Value |
|------|------|-------|
| `MX` | `send` | Resend provides the exact value |
| `TXT` | `resend._domainkey` | `p=...` (DKIM key — Resend provides exact value) |
| `TXT` | `@` | `v=spf1 include:amazonses.com ~all` |

> Use the exact values from your Resend dashboard — the values above are placeholders.  
> If using **Option A (Netlify DNS)**, add these records directly in Netlify → Domain management → DNS records.  
> If using **Option B (Squarespace DNS)**, add them in Squarespace Domains → DNS → Custom records.

4. Click **Verify DNS Records** in Resend — wait 5–15 minutes

### 5.3 Get your API key

1. Resend dashboard → **API Keys → Create API Key**
2. Name: `MAB Services Production`
3. Permission: **Sending access**
4. Click **Add** — copy the key immediately (shown only once)
5. Paste it as `RESEND_API_KEY` in Netlify environment variables (§3.2)

### 5.4 Test email sending

After deploy, submit the consultation form on the live site and confirm the email arrives at `sales@mabservices-ca.com`.

> **Before the domain is verified**: Resend restricts sending to your own Resend account email. Temporarily set `RESEND_TO_EMAIL` to your Resend account email to test, then revert once the domain is verified.

### 5.5 Monitor Resend logs

Resend dashboard → **Logs** shows every email sent, delivered, bounced, or spam-flagged. Check this during initial launch.

---

## 6. Google Search Console

Registers the site with Google for indexing monitoring and sitemap submission.

### 6.1 Add the property

1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Click **Add property → Domain**
3. Enter `mabservices-ca.com`
4. Google asks for a DNS TXT record for verification

### 6.2 Verification DNS record

| Type | Name | Value |
|------|------|-------|
| `TXT` | `@` | `google-site-verification=XXXXXXXXXXXX` (Google provides the exact value) |

Add this record alongside the others (multiple TXT records on `@` are allowed).

Click **Verify** in Search Console after adding the record.

### 6.3 Submit both sitemaps

Once verified:

1. Left sidebar → **Sitemaps**
2. Submit: `https://mabservices-ca.com/sitemap.xml`
3. Google discovers all locale-versioned URLs automatically

### 6.4 Request indexing for key pages

1. Use the **URL Inspection** tool
2. Enter each key URL and click **Request Indexing**:
   - `https://mabservices-ca.com/fr`
   - `https://mabservices-ca.com/fr/assurance-protection`
   - `https://mabservices-ca.com/fr/epargne-investissement`
   - `https://mabservices-ca.com/fr/a-propos`

Initial indexing takes 1–7 days.

### 6.5 Monitor ongoing

Check Search Console weekly for **Coverage** errors, **Performance** (clicks/impressions), and **Core Web Vitals**.

---

## 7. Analytics (optional)

Netlify includes basic free analytics (visits, bandwidth) visible in the Netlify dashboard — no setup needed.

For richer privacy-friendly analytics, [Plausible.io](https://plausible.io) is recommended (paid, ~$9/month). Add the script to `src/app/[locale]/layout.tsx` via `next/script`:

```tsx
import Script from 'next/script';

<Script
  defer
  data-domain="mabservices-ca.com"
  src="https://plausible.io/js/script.js"
  strategy="afterInteractive"
/>
```

Also add `https://plausible.io` to `connect-src` in the CSP in `next.config.ts`.

---

## 8. Post-launch checklist

### Technical

- [ ] `https://mabservices-ca.com` loads and redirects to `/fr` or `/en`
- [ ] `https://www.mabservices-ca.com` redirects to `https://mabservices-ca.com`
- [ ] SSL certificate is valid (green padlock in browser)
- [ ] `https://mabservices-ca.com/sitemap.xml` returns XML
- [ ] `https://mabservices-ca.com/robots.txt` returns correct rules
- [ ] `https://mabservices-ca.com/llms.txt` is accessible
- [ ] Both EN and FR language switcher works correctly
- [ ] Consultation form sends email to `sales@mabservices-ca.com`
- [ ] Cal.com booking buttons open the popup correctly
- [ ] Masterclass countdown displays when a future slot is configured

### SEO / GEO

- [ ] Sitemap submitted in Google Search Console
- [ ] Key pages requested for indexing
- [ ] JSON-LD validates at [validator.schema.org](https://validator.schema.org)
- [ ] Open Graph previews correctly at [opengraph.xyz](https://www.opengraph.xyz)
- [ ] `hreflang` tags correct at [technicalseo.com/tools/hreflang](https://technicalseo.com/tools/hreflang/)

### Regulatory (important for financial services)

- [ ] AMF license number added to Footer disclaimer (replace `[XXXXX]`)
- [ ] FSRA license number added to Footer disclaimer (replace `[XXXXX]`)
- [ ] JSON-LD `localBusinessSchema` updated with real license numbers

### Business

- [ ] Phone number `613-261-4428` is clickable and calls correctly on mobile
- [ ] `sales@mabservices-ca.com` inbox is monitored
- [ ] Form submission tested end-to-end
- [ ] Google Search Console verified and sitemap indexed
- [ ] Google My Business profile created and linked to `mabservices-ca.com`

---

## DNS summary — all records in one place

> Add all these at your DNS provider (Netlify DNS or Squarespace Domains depending on chosen option).

| Type | Name | Value | Purpose |
|------|------|-------|---------|
| `A` | `@` | `75.2.60.5` | Netlify — apex domain (Option B only) |
| `AAAA` | `@` | `2600:1f14:e22:d200::1` | Netlify — apex IPv6 (Option B only) |
| `CNAME` | `www` | `YOUR-SITE.netlify.app` | Netlify — www redirect (Option B only) |
| `TXT` | `@` | `google-site-verification=XXXX` | Google Search Console |
| `TXT` | `@` | `v=spf1 include:amazonses.com ~all` | Resend — SPF |
| `TXT` | `resend._domainkey` | `p=XXXX` (from Resend) | Resend — DKIM |
| `MX` | `send` | (from Resend dashboard) | Resend — bounce handling |

> Replace all `XXXX` values with exact strings provided by each service.  
> Multiple TXT records on `@` are allowed — add each as a separate record.  
> If using **Option A (Netlify DNS)**, skip the A/AAAA/CNAME rows — Netlify adds them automatically.

---

## Recommended order of operations

```
1. Push code to GitHub
2. Import project in Netlify — get preview URL (e.g. mab-services.netlify.app)
3. Add all environment variables in Netlify
4. Set up Resend: create API key, add domain, copy DNS records
5. Choose DNS option (A or B) and add ALL DNS records in one session
   (Netlify records + Resend records + Google verification)
6. Change nameservers in Squarespace Domains (Option A)
   OR add A/CNAME records in Squarespace Domains (Option B)
7. Wait 15–60 min for DNS propagation
8. Verify domain in Netlify → SSL auto-provisioned
9. Verify domain in Resend → test form email
10. Add Google Search Console → submit sitemap
11. Run post-launch checklist
```

---

*Last updated: June 2026*
