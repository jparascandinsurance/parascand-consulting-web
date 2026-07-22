# Parascand Consulting Website

Static, SEO-optimized multi-page site. No build step — just upload the folder to any static host
(Netlify, Vercel, GitHub Pages, Cloudflare Pages) or import into your website builder.

## Contact / booking wired in
- Email: james@parascandconsulting.business
- Phone: (571) 536-7388
- Booking widget (GoHighLevel): https://api.leadconnectorhq.com/widget/booking/VQuniYoJ7vn3LjvP5avu

Every "Book" button links to /book.html which embeds your GHL calendar. Contact page also embeds it.

## Pages
- Home (index.html), Book (book.html), About, Contact
- /services/  — 12 service pages + index
- /industries/ — 14 industry pages + index
- /locations/ — 29 city pages + index
- Service x City landing pages at root: <service>-in-<city>.html (145 pages)

## SEO built in
- Unique <title> + meta description per page
- Canonical + Open Graph tags
- JSON-LD: ProfessionalService (LocalBusiness), FAQPage, BreadcrumbList
- sitemap.xml + robots.txt
- Semantic headings, internal linking, mobile responsive

## AI / LLM optimization (GEO / AEO)
Optimized to be understood and cited by AI answer engines (ChatGPT, Perplexity, Google AI Overviews, Claude, etc.):
- llms.txt at site root — a curated, LLM-friendly summary of the business, services, industries, locations and blog (llmstxt.org format)
- robots.txt explicitly welcomes AI crawlers (GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, anthropic-ai, PerplexityBot, Google-Extended, Applebot-Extended, CCBot, Amazonbot, and more)
- Organization + WebSite schema on the homepage (entity, founder, areaServed, knowsAbout, sameAs)
- Service schema on every service page (provider, areaServed, audience)
- "Quick answer" summary box on each service page — crisp, extractable text for AI Overviews & featured snippets
- max-snippet / max-image-preview meta so engines can quote full answers
- Author + publisher signals (E-E-A-T) via BlogPosting schema and bylines

## Logo
The header/footer currently use a scalable SVG recreation of your logo at assets/logo-emblem.svg
(globe emblem) plus a serif "PARASCAND / CONSULTING LLC" wordmark. It's also the favicon.

To use your EXACT original logo instead: drop your file into the /assets folder named `logo.png`
(or logo.svg / logo.jpg / logo.webp). The site auto-detects it and shows it in the header + footer
in place of the emblem+wordmark — no code changes needed (a transparent PNG works best on the dark theme).

## To edit
Change data/copy in generate.py and re-run:  python3 generate.py
(Assets in /assets: style.css, main.js, logo-emblem.svg.)

## Before going live (checklist)
1. Enable the free SSL certificate for the domain in IONOS (fixes the "not secure" warning). The .htaccess forces HTTPS, so SSL MUST be active first or the site won't load.
2. Upload the ENTIRE folder including the hidden `.htaccess` file (it handles HTTPS + www redirect, caching, gzip, HSTS, and the 404 page). Make sure your upload tool shows hidden/dotfiles.
3. Primary URL is now https://www.parascandconsulting.business — the .htaccess 301-redirects http and the bare root to it (canonicalization).
4. Google Analytics: replace G-XXXXXXXXXX in generate.py (SITE ga_id) with your real GA4 Measurement ID, then re-run generate.py. Leave blank to omit analytics.
5. Enable the CDN in IONOS (see below) for the www subdomain.
6. Optional: add an og:image share image and verify the site in Google Search Console (submit sitemap.xml).

## Files that fix common SEO audit items
- .htaccess — HTTPS + www canonical redirects, cache headers (CSS/JS/images/fonts), gzip, HSTS, 404
- 404.html — branded custom error page
- favicon.ico + assets/apple-touch-icon.png — favicon in all formats
- Non-render-blocking CSS/fonts (async load + inline critical CSS)
