# Website Audit — NEXTGEN CODERS

**Date:** 16 November 2026  
**Scope:** Local production build (`vite preview`) at `http://127.0.0.1:4173` — the site is not deployed, so there is no public URL or HTTPS certificate to test yet.  
**Pages checked:** `/`, `/about`, `/tracks`, `/events`, `/gallery`, `/board`, `/join`, `/contact`, plus the 404 route.  
**Method:** Lighthouse 12 (mobile + desktop), Playwright screenshots at 1440×900 and 390×844, DOM checks, internal link checks, and manual review of the production source.

## Verdict

**Good — 8.8/10.** The site is visually coherent, fast on desktop, genuinely accessible, and clear about who the club is and what it does. It is held back by launch setup (no deployment, demo-only form, placeholder domain) and a few content gaps, not by design or engineering quality.

## Score table

| Area | Score | Evidence |
| --- | --- | --- |
| Performance & technical (20%) | 8/10 | Lighthouse desktop 100, mobile 91. LCP 0.7 s desktop / 3.4 s throttled mobile; CLS 0; no console errors or failed requests. 740 KB home page, 584 KB of it images. Not deployed, so HTTPS not tested. |
| Design & visual quality (20%) | 9/10 | One clear H1 per page, one primary action above the fold, consistent 4 px / hairline system, two font families, generous spacing, both themes checked. |
| UX & navigation (20%) | 9/10 | All 8 pages reachable from the navbar and footer; mobile menu, skip link, focus rings, language/theme persistence and inline form validation work. |
| Content clarity (15%) | 8/10 | Homepage explains what the club is in one sentence; real event photos and real facts. Board lists only the president; hackathon date is still “date à confirmer”. |
| Accessibility (10%) | 10/10 | Lighthouse accessibility 100 on home, about and join. One H1, all images have alt text, all inputs have labels, no generic link text, reduced-motion support. |
| SEO basics (10%) | 9/10 | Unique titles (24–53 chars) and descriptions (54–147 chars), canonical per page, OG/Twitter tags, robots.txt and sitemap.xml return 200. No JSON-LD; canonical domain is still the placeholder. |
| Mobile responsiveness (5%) | 9/10 | No horizontal overflow at 320, 390 or 1440 px; mobile nav and forms fit. Hero images are heavy on slow mobile connections. |

**Weighted total: 8.75 → 8.8/10.**

## Top 3 problems

1. **The site is not live, and every canonical URL still points at a placeholder.**
   - Where: `src/data/site.js` (`siteUrl` fallback), `index.html` canonical/OG tags, `public/robots.txt`, `public/sitemap.xml`.
   - Evidence: no Vercel/GitHub deployment, no `.env`, all URLs use `https://nextgen-coders.vercel.app`.
   - Fix: deploy to Vercel, set `VITE_SITE_URL` to the real domain, then replace the placeholder in `robots.txt`, `sitemap.xml`, `index.html` and the OG image metadata.

2. **The join form does not save anything and has no spam protection.**
   - Where: `src/components/JoinForm.jsx`, `src/lib/supabase.js`, `.env.example`, `supabase/schema.sql`.
   - Evidence: the form shows “Mode démonstration” because `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` are missing. When enabled, the RLS policy allows anyone to insert unlimited rows.
   - Fix: create the Supabase project, run `supabase/schema.sql`, add the anon key to Vercel and locally, add a honeypot + minimum-fill-time check, and link a short privacy page.

3. **The club story stops at one board member and one unconfirmed date.**
   - Where: `src/pages/Board.jsx`, `src/i18n/fr.js` (`teamNote`), `src/data/events.js` (April 2027 hackathon).
   - Evidence: the board page says more members will be presented later; the next hackathon says “date à confirmer”.
   - Fix: add names, roles and photos for the rest of the bureau, and confirm the April 2027 date — or label sign-ups as open.

## Quick wins (under an hour each)

1. **Cut mobile hero weight.** Hero WebPs are 537 KB total (`hero-1` 185 KB, `hero-2` 162 KB, `hero-3` 49 KB, `hero-4` 61 KB, `hero-5` 80 KB). Generate 900 px mobile variants with `srcset`, and preload only the first slide. This is the main reason mobile LCP is 3.4 s.
2. **Add JSON-LD.** `EducationalOrganization` for the club and `Event` for the April 2027 hackathon; it costs one component and improves search appearance.
3. **Add a privacy page.** The form collects name, email, track, level and message. A one-page notice (what is stored, why, how to delete it, Moroccan law 09-08 contact) closes a real trust gap.
4. **Fix the placeholder domain in one pass.** Replacing `nextgen-coders.vercel.app` across `index.html`, `robots.txt`, `sitemap.xml` and `site.js` takes minutes once the real domain exists.
5. **Trim the logo payload.** `logo-mark.png` is 48 KB at 512 px, but it renders at 36 px. A 72/144 px PNG or WebP would save most of that on every page.

## Full findings

### Performance & technical

- **Lighthouse, production build**
  - Home, mobile: performance 91, accessibility 100, best practices 100, SEO 100. FCP 1.7 s, LCP 3.4 s, CLS 0, TBT 20 ms.
  - Home, desktop: performance 100, accessibility 100, best practices 100, SEO 100. LCP 0.7 s, CLS 0.006, TBT 40 ms.
  - About, mobile: performance 81, LCP 2.1 s, CLS 0, TBT 700 ms (likely Lighthouse variance on a static page).
  - Join, mobile: performance 90, LCP 2.1 s, CLS 0.047, TBT 350 ms.
- **Weight:** 740 KB transferred on the home page — 584 KB images, 100 KB JS (gzip), 47 KB CSS/font, 7 KB other.
- **Animation:** the hero crossfade is the only motion; `prefers-reduced-motion` stops it. Good.
- **Console/network:** zero console errors, zero page errors, zero failed requests on all nine routes.
- **Links:** every internal nav/footer link returns 200.
- **Images:** all 24 referenced image files exist; all lazy images load when scrolled into view.
- **HTTPS:** not tested — local HTTP preview only. A deployed host must provide HTTPS.
- **404:** the catch-all route renders the custom 404 with a working “Retour à l’accueil” action.

### Design & UX

- Clear hierarchy: eyebrow → H1 → lead → primary CTA on every page.
- Minimalist system is consistent: 4 px radius, 1 px borders, flat surfaces, no shadows or decorative grids.
- Two type families only: Inter Variable for UI/body, system mono for small technical labels.
- Navigation is findable immediately; mobile menu opens, closes on route change, and supports Escape.
- Primary CTA “Rejoindre le club” is visible above the fold on the homepage; the same action is always in the navbar.
- Light theme uses a brown accent (`#965800`) instead of orange to keep contrast; this is intentional and passes.
- On tablets the light-mode hero uses a flat white veil so the copy stays readable; the photo is deliberately faint there. If photo impact matters more than copy contrast on tablet, a split text/photo layout is the alternative.
- Minor: theme/language/menu controls are 36 px tall. They clear the 24 px WCAG target minimum but are below Apple’s 44 px comfort target.

### Content

- Homepage answers “what is this?” in one sentence: a programming club at EST Laâyoune with five tracks, workshops, hackathons and real projects.
- No Lorem ipsum, no dead copyright year (footer says 2026).
- Contact routes are easy: Instagram, email and school location are on `/contact` and in the footer.
- Trust signals: real event photography, 31 participants / 9 projects stats, Bank of Africa partner mention.
- Gaps: only Ali El Amrani is named on `/board`; the 2027 hackathon date is unconfirmed; no projects showcase, FAQ, or partner logo strip.
- The join form is honest about demo mode, but a public site should not ship that banner.

### Accessibility

- Lighthouse accessibility 100 on home, about and join.
- One `<h1>` per page; heading order is sensible.
- Every image has alt text; decorative images use empty alt.
- Every input, textarea and radio group has an associated label/legend.
- Focus-visible outlines are present; a skip-to-content link is the first focusable element.
- Colour is not the only signal for form errors (text messages are provided).
- Language attribute updates with the FR/EN toggle.
- Reduced-motion preference is respected for the hero and scrolling.

### SEO

- Unique title and meta description per page, both within recommended lengths.
- Canonical, `og:title`, `og:description`, `og:url`, `og:locale`, Twitter title/description are set per route.
- `robots.txt` and `sitemap.xml` return 200 and list all public routes.
- Missing: JSON-LD structured data; per-page `og:image`; `hreflang` (single URL with a language toggle, so this is optional).
- Canonical/sitemap/OG URLs still use the placeholder domain — fix at deploy time.
- Images have descriptive filenames and alt text.

### Mobile

- No horizontal overflow at 320, 390 or 1440 px on any page.
- Mobile navigation is complete and usable; CTA is repeated inside the menu.
- Hero copy wraps cleanly and remains readable in both themes.
- Forms stack correctly; radio tiles are full-width and labelled.
- Main mobile weakness is payload/LCP, not layout.

## What is good

- **Real identity, not a template.** The photography, bilingual copy and club-specific facts (five tracks, 31 participants, 9 projects, the Bank of Africa meeting) make the site feel like a real club rather than a generic landing page.
- **Disciplined visual system.** The minimalist pass removed the decorative noise while keeping hierarchy and brand recognition; both themes look intentional.
- **Strong accessibility and SEO fundamentals.** Lighthouse 100 for accessibility, best practices and SEO on the key pages, with real labels, alt text, canonicals and a sitemap.
- **Clean technical baseline.** No console errors, no broken links, no layout overflow, and a production build that is fast on desktop.

## What was not checked

- Public HTTPS/TLS, DNS and hosting headers (no deployment).
- Real form submission and Supabase RLS behaviour (no credentials; demo mode only).
- Real-device testing (screenshots and Lighthouse were run in headless Microsoft Edge).
- Backlink/domain authority and Search Console indexing (no public domain).
