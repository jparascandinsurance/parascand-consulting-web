# parascandconsulting.business — website

The marketing site for **Parascand Consulting LLC**. Static HTML/CSS, served by Caddy, deployable on Railway, Fly.io, Render, or any container host.

Domain: **parascandconsulting.business**
Stack: Static HTML + Caddy (containerized)
Pattern mirrored from: `/Documents/Claude/Projects/Notary/website/`

---

## What's in here

```
website/
├── index.html              # Home
├── voice-ai.html           # Voice AI deep-dive
├── restaurants.html        # Restaurant Phone AI (featured niche)
├── dental.html             # Dental Voice AI
├── real-estate.html        # Real Estate Voice AI
├── healthcare.html         # Healthcare Voice AI (HIPAA-aware)
├── automation.html         # Workflow automation & agents
├── services.html           # All services index
├── pricing.html            # $297 / $497 / Enterprise pricing
├── about.html              # Founder bio (James Parascand)
├── contact.html            # Calendly + Web3Forms lead form
├── faq.html                # Global FAQ
├── styles.css              # Single shared stylesheet
├── images/                 # Logo + page imagery
├── sitemap.xml             # Search-engine sitemap
├── robots.txt              # Crawler directives
├── Caddyfile               # Caddy server config
├── Dockerfile              # Container build (Caddy base image)
├── railway.toml            # Railway deploy config
├── .gitignore
└── README.md               # This file
```

---

## Local preview

The simplest way to preview locally is the built-in Python HTTP server. From this folder:

```bash
python3 -m http.server 8080
```

Then open <http://localhost:8080>. Note: this won't honor the Caddy redirect rules (`.html` stripping, extensionless URLs). To preview the production behavior exactly:

```bash
# Requires Caddy installed locally: brew install caddy
PORT=8080 caddy run --config Caddyfile --adapter caddyfile
```

---

## Deploy to Railway

1. Push this folder to a GitHub repo (e.g. `parascand/parascand-consulting-web`).
2. In Railway, **New Project → Deploy from GitHub repo** → pick the repo.
3. Railway auto-detects `Dockerfile` and builds it. No extra config needed; `railway.toml` sets the health-check path.
4. Add a custom domain in the Railway dashboard → **Settings → Domains → Custom Domain** → enter `parascandconsulting.business`. Railway will issue a TLS cert via Let's Encrypt automatically.
5. Update DNS at the domain registrar:
   - `CNAME` record on `www` pointing to the Railway-provided host
   - `A` records on apex pointing to Railway's anycast IPs (Railway gives you the exact records to paste)

The `Caddyfile` listens on `:{$PORT}` which Railway populates at runtime, so no port config is needed.

---

## Before going live — fill these in

Search the codebase for `YOUR_*_HERE` and `(571) 332-3829` (placeholder phone) to find every spot that needs the real value:

| Item                          | Where it lives                                | What to do                                                                 |
| ----------------------------- | --------------------------------------------- | -------------------------------------------------------------------------- |
| **Web3Forms access key**      | `contact.html` (`value="YOUR_WEB3FORMS_..."`) | Sign up at <https://web3forms.com>, get the key, paste it in.              |
| **Calendly embed**            | `contact.html` (`.calendly-embed` block)      | Set up <https://calendly.com>, replace the placeholder div with the embed. |
| **Phone number**              | All pages — `(571) 332-3829` is a placeholder | Set up Google Voice (or replacement) and replace globally.                 |
| **OG image**                  | `og-image.jpg` referenced in head             | Drop a 1200×630 png/jpg into `images/og-image.jpg`.                        |
| **LinkedIn URL on About**     | `about.html`                                  | Already set to `https://www.linkedin.com/in/james-parascand` — verify.     |

---

## Pricing summary (locked, May 2026)

Headline packages featured on `pricing.html`, `index.html`, `services.html`, and referenced by every niche page:

- **Front Desk Assistant — $297/month.** AI voice agent + website chatbot + SMS + email automation + managed GoHighLevel CRM workspace + pre-built workflows + free website updates. Unlimited usage (fair-use).
- **Front Desk + Growth — $497/month.** Everything above PLUS unlimited social posting (IG, FB, X, TikTok, LinkedIn) + Facebook Ads Manager + Google Local Service Ads management. *Ad spend not included.*
- **Enterprise / Custom — quote on request.** Multi-location, fractional CAIO, MCP server builds, custom integrations.

Vertical overlays (added on top of the $297 base):

- Restaurant: +$499 setup, +$399/mo (POS integration)
- Dental: +$799 setup, +$499/mo (PMS integration)
- Healthcare (BAA): +$1,499 setup, +$799/mo (EHR integration, BAA-backed)

---

## SEO

- Each page has unique title, meta description, OG tags, Twitter card, canonical URL, and JSON-LD schema.
- The home page declares `Organization` + `ProfessionalService` + `FAQPage` schema.
- Vertical pages each declare `Service` + `FAQPage` schema.
- `sitemap.xml` is checked in and referenced from `robots.txt`.
- Submit the sitemap to Google Search Console after first deploy: <https://search.google.com/search-console>.

---

## Brand & style

- Colors: navy `#1B4F8C` · navy-deep `#0F3A66` · sky `#5EA1D1` · cream `#F5EFE2` · gold `#C9A961` (accents). Defined in `:root` of `styles.css`.
- Typography: **Cormorant Garamond** (display, all headings) + **Inter** (body, UI). Loaded from Google Fonts.
- Logo: `images/parascand-consulting-logo.jpg`.
- Voice: confident, plain-spoken, operator-credible. Not tech-bro. Not hypey.

---

## Pages and what each does (one-liner)

- `index.html` — Home. Hero, problem framing, 11 services grid, vertical highlights (restaurants, dental, real estate, healthcare), pricing teaser (both packages + bundle math), founder block, process, FAQ.
- `voice-ai.html` — Deep-dive on voice agents: how it works, integrations, sample script, FAQ. Linked from index hero CTA.
- `restaurants.html` — Featured niche. ROI math, POS integration honesty, sample transcript, pricing.
- `dental.html` — PMS-integrated dental flow. Insurance scripts, recall automation.
- `real-estate.html` — Lead qualification, showing booking, kanban SVG mockup, sample call transcript.
- `healthcare.html` — HIPAA-aware deployment. Compliance posture, sample appointment call, patient call log mockup.
- `automation.html` — Workflow automation tooling matrix (Zapier vs. Make vs. n8n vs. custom). Flow diagram SVG.
- `services.html` — All 11 services in an organized grid, links to deep-dive pages.
- `pricing.html` — Three-tier comparison, vertical overlays, à la carte vs. bundled math table.
- `about.html` — Founder bio, principles, the operating portfolio (notary, insurance, etc.).
- `contact.html` — Calendly placeholder + Web3Forms lead form.
- `faq.html` — Global FAQ across pricing, scope, tech, security, the firm.

---

## Updates

To make a content change, edit the HTML directly and push to GitHub. Railway auto-redeploys on push. For larger structural changes (new vertical, new pricing tier), update:

1. The page itself.
2. `sitemap.xml` if adding a new URL.
3. The footer link grids on every page (find/replace).
4. The header nav if the URL is top-level.
5. JSON-LD schema on `index.html` if changing the service catalog.
