# NEXTGEN CODERS — Build Report

> **Historical snapshot (16 November 2026).** The current report is
> [`WEBSITE-REPORT-2026-11-17.md`](./WEBSITE-REPORT-2026-11-17.md). Join
> submissions are now stored in a local SQLite database instead of demo mode.

**Project:** Official website of the NEXTGEN CODERS programming club, EST Laâyoune  
**Report date:** 16 November 2026  
**Status:** Finished local build. Not deployed, no domain, no live form submissions.  
**Tagline:** *Code smarter, not harder.*

---

## 1. In one paragraph

This is a hand-built **React 19 single-page application** bundled with **Vite 8**, styled with **Tailwind CSS 3.4** on top of a custom CSS token system, routed with **React Router 7**, and prepared for an optional **Supabase** backend (events + join requests) without ever requiring one. Every photo and the logo come from the real club, processed into WebP with **Sharp** through a repeatable script. It is bilingual (FR/EN) and dual-theme (dark/light) with no i18n or theming library — both are small custom React contexts. It is tested with **Playwright** on mobile and desktop, audited with **Lighthouse 12**, and deployable to Vercel with one rewrite rule. No UI kit, no CSS framework beyond Tailwind, no animation library, no state manager, no CMS, no server of its own.

---

## 2. Stack at a glance

### Runtime dependencies

| Package | Version | What it does here |
| --- | --- | --- |
| `react` | 19.3.1 | UI, function components and hooks only |
| `react-dom` | 19.3.1 | Client rendering into `#root` |
| `react-router-dom` | 7.18.5 | 8 routes + catch-all 404, `BrowserRouter`, `NavLink`, scroll restoration |
| `@supabase/supabase-js` | 2.119.0 | Optional events read + join-request insert; lazy-loaded chunk |
| `@fontsource-variable/inter` | 5.3.0 | Self-hosted Inter Variable, imported once in `src/main.jsx` |

### Build and tooling dependencies

| Package | Version | What it does here |
| --- | --- | --- |
| `vite` | 8.3.8 | Dev server, production build, code splitting |
| `@vitejs/plugin-react` | 6.3.0 | React fast refresh + JSX transform |
| `tailwindcss` | 3.4.17 | Utility classes mapped to the design tokens |
| `postcss` | 8.5.33 | CSS pipeline |
| `autoprefixer` | 10.6.2 | Vendor prefixes |
| `sharp` | 0.35.5 | Crop, resize, rotate and WebP encoding for every site image |
| `@playwright/test` | 1.65.1 | End-to-end tests, screenshots, OG image rendering |

### Platform and external services

| Tool / service | Role |
| --- | --- |
| Node.js + npm | Install, scripts, build |
| Windows 10/11 + PowerShell | Development and asset scripting environment |
| Microsoft Edge (headless) | Playwright browser (`channel: 'msedge'`), Lighthouse host, screenshot engine |
| Lighthouse 12 | Performance / accessibility / best-practices / SEO audit |
| Supabase (optional) | Postgres tables, RLS policies, event data, join-request storage |
| Vercel | Intended host (config present, nothing deployed) |
| GitHub | Intended source host (no repository initialized yet) |

### Deliberately not used

No TypeScript, Next.js/SSR, Gatsby, Astro, CMS, UI component kit, icon package, animation library (Framer Motion, GSAP), state manager (Redux, Zustand), CSS-in-JS (styled-components, Emotion), analytics, cookie banner, backend server, or `service_role` key.

### By the numbers

| Metric | Value |
| --- | --- |
| Source files | 37 (`.js`, `.jsx`, `.css`) |
| Source lines | ~3,538 |
| Public images | 30 files, ~1.64 MB |
| Routes | 8 + custom 404 |
| Tracks | 5 |
| Events | 6 (5 past, 1 upcoming) |
| Gallery photos | 16, in 4 categories |
| Timeline entries | 7 |
| Languages | 2 (FR default, EN toggle) |
| Themes | 2 (dark default, light toggle) |
| Automated test cases | 40 runs (20 cases × 2 viewports) |
| Main JS bundle | 347.8 kB raw / 103.6 kB gzip |
| Lazy Supabase chunk | 216.0 kB raw / 55.7 kB gzip |
| CSS bundle | 27.7 kB raw |

---

## 3. How it was built

The work was done in a code-first loop, not in a page builder:

1. **Brief and rules** — the club brief (`DEEPSEEK.md`) and the skill pack in `.agents/skills/` defined the design system, frontend rules, backend rules, testing expectations, SEO rules and deployment steps.
2. **Content first** — real club facts, real dates and real photos were put into `src/data/` and `src/i18n/` before styling. No invented members, numbers or partners.
3. **Structure** — one React page per route, shared `Layout`, `Navbar`, `Footer`, `Seo` and reusable cards/buttons.
4. **Design system** — palette, type, 4 px radius and hairline borders defined once as CSS variables and Tailwind tokens, then applied consistently.
5. **Image pipeline** — originals in the club asset folders processed by `scripts/optimize-images.mjs` into `public/images/`; the OG card rendered from HTML by Playwright.
6. **Verification** — Playwright across 390×844 and 1280×800, manual screenshots at 320/390/1440 px, Lighthouse on the production preview, link/image/console checks.
7. **Minimalist pass** — the decorative layer (grid background, glow, orbs, count-up motion, scroll reveals, hover zooms) was removed and replaced with flat surfaces, 1 px lines, generous whitespace and a single calm hero crossfade.

The site was reviewed with the locally installed **website-audit** skill. Result: **8.8/10** — see `website-audit-nextgen-coders-2026-11-16.md`.

---

## 4. Architecture and file map

Client-rendered SPA. No server code, no API routes, no SSR. The only network dependency at runtime is Supabase, and only when its two public environment variables exist.

```text
index.html                  Static shell, theme pre-paint script, default meta/OG tags
vite.config.js              React plugin only
tailwind.config.js          Colors, fonts, 1120px site width, 4px radii
postcss.config.js           Tailwind + Autoprefixer
playwright.config.js        Mobile + desktop projects, Edge, auto dev server
vercel.json                 SPA rewrite: every path -> /index.html
.env.example                Three public env vars, documented
supabase/schema.sql         Tables, constraints, RLS, seed events
scripts/
  optimize-images.mjs       Sharp pipeline for photos and logo
  og-image.mjs              Renders og-template.html to og-image.png
  og-template.html          The 1200x630 social card layout
src/
  main.jsx                  Providers + router + font import
  App.jsx                   Route table
  index.css                 Tokens, base styles, component classes, hero CSS
  components/               Navbar, Footer, Layout, Logo, Seo, toggles, cards, form, icons
  pages/                    Home, About, Tracks, Events, Gallery, Board, Join, Contact, NotFound
  data/                     site, tracks, events, gallery, timeline
  i18n/                     fr.js, en.js, LanguageProvider, useI18n, pick()
  lib/                      theme.jsx, supabase.js, EventsContext.jsx
public/
  images/                   30 WebP/PNG assets
  favicon-32.png, favicon-192.png, apple-touch-icon.png
  og-image.png             1200x630 social card
  robots.txt, sitemap.xml
tests/
  site.spec.js              Pages, navigation, toggles, gallery, board, 404
  join.spec.js              Form validation and demo success
```

### Provider order in `src/main.jsx`

```jsx
<StrictMode>
  <ThemeProvider>
    <LanguageProvider>
      <EventsProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </EventsProvider>
    </LanguageProvider>
  </ThemeProvider>
</StrictMode>
```

`ThemeProvider` and `LanguageProvider` are tiny contexts. `EventsProvider` starts from local data and only replaces it if Supabase is configured and returns rows. The router is plain `BrowserRouter`; `vercel.json` handles refresh-safe deep links in production.

---

## 5. Design system

### Palette

The brand is black `#0A0A0A`, orange `#FEA901` and white. Orange is used for primary actions, focus rings, selection and small accents. In light mode, orange text is darkened to `#965800` so it keeps contrast; the orange itself is unchanged.

| Token | Dark (default) | Light | Use |
| --- | --- | --- | --- |
| `--ink` | `#0A0A0A` | `#FAFAF9` | Page background |
| `--surface` | `#121212` | `#FFFFFF` | Cards, raised panels |
| `--raised` | `#0E0E0E` | `#F5F5F4` | Secondary surfaces |
| `--line` | `#242424` | `#E4E4E1` | 1 px hairline borders |
| `--fg` | `#F5F5F5` | `#121212` | Primary text |
| `--muted` | `#8C8C8C` | `#686863` | Secondary text |
| `--accent-text` | `#FEA901` | `#965800` | Accent text that must stay readable |
| `--accent-soft` | `#141006` | `#FFF8E8` | Tinted accent backgrounds |
| `accent` | `#FEA901` | `#FEA901` | Buttons, focus, selection |
| `night` | `#0A0A0A` | `#0A0A0A` | Text on orange |

CSS variables are stored as RGB triplets so Tailwind can apply opacity (`rgb(var(--line) / <alpha-value>)`).

### Typography

| Role | Choice |
| --- | --- |
| UI and body | **Inter Variable**, self-hosted via Fontsource. No Google Fonts request. |
| Technical labels | System monospace stack (`ui-monospace`, SF Mono, Menlo, Consolas…) |
| Body | 16 px, line-height 1.6 |
| Display headings | Semibold, tracking `-0.03em`, line-height 1.02 |
| Eyebrow labels | Mono, 10 px, uppercase, tracking `0.2em` |
| Text wrapping | `text-wrap: balance` on headings, `pretty` on paragraphs |

### Shape, spacing, layout

- Maximum content width: **1120 px** (`.shell`), with 20 px side padding on mobile and 32 px from `sm`.
- One radius only: **4 px** for cards, inputs and buttons (`rounded-card`, `rounded-control`).
- **1 px hairline borders** instead of shadows. `boxShadow.soft` is intentionally `none`.
- Flat surfaces; no gradients as decoration, no glassmorphism, no grid background, no blurred orbs.
- Selection: orange background with black text.
- Focus: 2 px orange `:focus-visible` outline with offset.
- Sticky 64 px header with a bottom hairline.

### Reusable classes in `src/index.css`

| Class | Purpose |
| --- | --- |
| `.shell` | Centered 1120 px container with responsive padding |
| `.eyebrow` | Small mono uppercase label |
| `.display` | Large tight display heading |
| `.btn` / `.btn-primary` / `.btn-ghost` | Base, orange, hairline-outline buttons |
| `.card` / `.card-hover` | Hairline surface card and its quiet hover border |
| `.link-underline` | Underline link with orange decoration |
| `.input` / `.input-error` | Form field and error state |
| `.pill` | Small mono status tag |
| `.hero-*` | Hero photo stack, crossfade and scrims |

### Motion

Only one piece of motion remains: the hero photo crossfade (7 s per slide, 1.4 s opacity transition). The first slide loads eagerly; the rest are delayed 1.2 s and lazy-loaded. With `prefers-reduced-motion: reduce`, the slideshow never starts, transitions are disabled and smooth scrolling becomes instant. There are no entrance animations, count-ups, parallax effects or scroll reveals. (`CountUp.jsx` still exists as a name but now renders a plain value.)

### Hero treatment

Five real landscape event photos crossfade behind the home headline. A left-to-right scrim keeps copy readable in both themes; below 1024 px the scrim becomes a flat vertical veil because the copy spans the full photo. Light mode uses a white veil, dark mode a black one. Hero copy gets a soft text shadow from `--hero-shadow`, which is also theme-specific.

---

## 6. Pages and features

### Routes

| Route | Page | Main content |
| --- | --- | --- |
| `/` | Home | Hero slideshow, three-step approach, stats, five tracks, next hackathon, club story, CTA |
| `/about` | About | Club origin, timeline (7 milestones), working values |
| `/tracks` | Tracks | Five learning tracks with skills, audience and CTA |
| `/events` | Events | Upcoming event, five past events, participation CTA |
| `/gallery` | Gallery | 16 photos, filterable by All / Hackathons / Workshops / Competitions / Meetings |
| `/board` | Board | President, team note, club stats, photos |
| `/join` | Join | Validated membership form, track/level selection, privacy note |
| `/contact` | Contact | Instagram, email, school location |
| `*` | 404 | Custom not-found page with a way home |

### Global behaviour

- Sticky navbar with active-route underline, language toggle, theme toggle, desktop CTA.
- Mobile menu: toggles `aria-expanded`, closes on route change, closes on Escape, repeats the join CTA.
- Skip-to-content link is the first focusable element.
- Language choice persists in `localStorage` under `ng-lang`; theme persists under `ng-theme`.
- Theme is applied before first paint by a tiny inline script in `index.html`, preventing a flash of the wrong theme.
- `theme-color` meta updates between `#0A0A0A` and `#FAFAF9`.
- Footer repeats navigation, social/contact links, tagline and the 2026 copyright.
- Every page sets its own title, description, canonical, OG and Twitter metadata through `Seo.jsx`.

### Join form

- Fields: name, email, track (5 radio tiles), level (3 radio tiles), optional message.
- Client-side validation: name ≥ 2 characters, email regex, track and level must be valid IDs, message ≤ 1000 characters with a live counter.
- Errors are announced inline next to fields; focus moves to the first invalid field.
- On submit, Supabase is loaded **on demand** and one row is inserted into `join_requests`.
- Without Supabase credentials, the form shows a clear **“Mode démonstration”** banner and a demo success state — it is honest that nothing was saved.
- No honeypot or rate-limiting yet; this is a known gap.

---

## 7. Content and data

All visible copy lives in `src/data/` or `src/i18n/`, never buried in layout logic. Bilingual fields use `{ fr, en }` objects.

### Real club facts used

- Club at **EST Laâyoune**, active since **January 2026**.
- Five tracks: **Web & Full-Stack**, **AI & Machine Learning**, **Cybersecurity & CTF**, **Systems & Robotics**, **UI/UX Design**.
- **Computer Day** — 22 January 2026.
- **n8n workshop** — February 2026, 50 participants, certificates.
- **Best Website Competition** — March 2026, first edition.
- **Health-tech hackathon** — 28–29 October 2026, 31 participants, 9 projects, 48 hours.
- **Meeting with Bank of Africa (BMCE Group)** — November 2026, youth offer, 2026/2027 season.
- **Next hackathon** — April 2027, 6 teams, 25 participants, *date to be confirmed*.
- Board: **Ali El Amrani**, president. No other member is named because no other name was confirmed.
- Contact: `nextgencoders.est@gmail.com` and `@nextgen_coders_estl` on Instagram.

Nothing was invented to fill a gap: the unconfirmed date stays labelled “date à confirmer”, and the board page explicitly says more members will be presented later.

### Data files

| File | Contents |
| --- | --- |
| `src/data/site.js` | Club name, school, tagline, Instagram, email, site URL, level list |
| `src/data/tracks.js` | 5 tracks with bilingual names, descriptions, skills, audience |
| `src/data/events.js` | 6 events with status, bilingual title/date/description, facts, image, alt |
| `src/data/gallery.js` | 16 photos with dimensions, category and bilingual caption/alt |
| `src/data/timeline.js` | 7 dated milestones |
| `src/i18n/fr.js` / `en.js` | Every UI string, meta title/description, board and form copy |

---

## 8. Image pipeline

`scripts/optimize-images.mjs` turns the club’s original folders into web assets. It is reproducible, not a one-off manual export:

```bash
npm run images
# or, when the originals live elsewhere:
node scripts/optimize-images.mjs --assets "C:\path\to\NEXT GEN CODERS FILE"
```

Source folders: `LOGO OF THE CLUB`, `PHOTOS OF HEALTH BIO MEDICAL HACKATHON`, `PHOTOS OF COMPUTING DAY`, `PHOTOS OF N8N FORMATION`, `PHOTOS OF THE HACKATHON OF THE BEST REBUILD OF THE SCHOL WEBSITE`, `PHOTOS OF INTEGRATION JOURNEY`, `PHOTOS OF THE MEETING WITH BMCE`.

What the script does with Sharp:

- Auto-rotates by EXIF.
- Crops event thumbnails to a consistent 16:10 frame with `extract`.
- Caps hero photos at 1600 px wide and encodes WebP at quality 80.
- Caps gallery photos inside 900×1100 at quality 76 (the integration-day photo uses 900×1200).
- Encodes everything with `effort: 6` for a better size/quality trade-off.
- Generates `logo-mark.png` and the favicons from the real club logo.
- Generates `hero-club-sm.webp` as a small reserve/OG photo.

Result: **30 images, ~1.64 MB total**, each under 200 KB. Photos are never AI-generated or passed off as events that did not happen. The April 2027 visual is a typographic poster, not a fake event photo.

The social card is separate: `scripts/og-image.mjs` opens `scripts/og-template.html` in headless Edge at 1200×630 and screenshots it to `public/og-image.png`.

The gallery’s **Rencontres → “Journée d’intégration”** entry now uses `gallery-integration-day.webp` (900×1200, ~69 KB), generated from the third integration-day photo in the same pipeline.

---

## 9. Bilingual system

Custom, about 40 lines, no i18n package:

- `fr.js` and `en.js` export the same object shape.
- `LanguageProvider` holds `lang`, defaults to `fr`, reads `ng-lang` from `localStorage`.
- Every change sets `document.documentElement.lang` and persists the choice.
- `useI18n()` returns `{ lang, setLang, t }`.
- `pick(value, lang)` reads `{ fr, en }` data objects.
- Content data (tracks, events, gallery, timeline) is bilingual at the data level; UI chrome is bilingual in the dictionaries.
- The toggle is a two-state FR/EN control in the navbar.
- Meta titles and descriptions are bilingual too.

No URL-based locale (`/fr`, `/en`), so there is no `hreflang` and one canonical URL per page. That is a deliberate simplicity choice, but it means language is not independently indexable.

---

## 10. Theme system

- Dark is the default club look; light is a full second theme, not an afterthought.
- Tokens live in `:root, [data-theme='dark']` and `[data-theme='light']` in `src/index.css`.
- `ThemeProvider` writes `document.documentElement.dataset.theme` and persists `ng-theme`.
- `index.html` applies the saved theme **before first paint** to avoid a flash.
- `color-scheme` is set per theme so native controls match.
- `theme-color` updates for mobile browser chrome.
- The hero scrim, text shadow, accent text and surfaces all have per-theme values.
- Focus rings and selection stay orange in both themes.

---

## 11. Supabase layer (optional, not active)

No project exists yet and there is no `.env`, so the live site currently runs on local data and demo mode. The integration is ready for credentials:

### `src/lib/supabase.js`

- Reads only `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
- Never references the `service_role` key.
- `isSupabaseConfigured` gates every call.
- The client is imported dynamically, so the 216 kB Supabase chunk is not downloaded on a normal page view.
- `submitJoinRequest()` inserts one row and returns a typed result (`ok`, `not-configured`, `server`, `network`).
- `auth.persistSession` is false: the public site has no login.

### `src/lib/EventsContext.jsx`

- Starts with local events so the first paint has content.
- If configured, selects events ordered by `sort_order` and maps bilingual columns into the local shape.
- Keeps local photography even when text comes from the database.
- Falls back silently to local data on any error.

### `supabase/schema.sql`

| Table | Access |
| --- | --- |
| `join_requests` | Anyone (anon/authenticated) may insert; only authenticated users may select. No update/delete policy. |
| `events` | Public read for anon/authenticated; full write for authenticated. |

Constraints: name 2–80 chars, valid email, track in the five IDs, level in the three levels, message ≤ 1000 chars, indexed by `created_at`. Events have bilingual columns, a status check, JSONB facts and a uniqueness rule. The schema seeds the six current events and is safe to re-run.

Security notes, stated honestly:

- RLS is enabled on both tables.
- The public key is the **anon** key only.
- `join_requests` has no spam protection (no honeypot, no rate limit, no captcha).
- Every authenticated user is treated as an admin, which assumes Supabase sign-ups are disabled (as documented in `SUPABASE_SETUP.md`).
- There is no admin UI; requests are read in the Supabase Table Editor.

---

## 12. SEO

Implemented:

- Unique title and meta description per page, in both languages.
- Canonical per route.
- Open Graph: type, site name, locale, title, description, URL, image, image dimensions, alt.
- Twitter card: `summary_large_image`, title, description.
- `robots.txt` with sitemap reference.
- `sitemap.xml` listing all public routes.
- Descriptive image filenames and alt text.
- Semantic headings: exactly one `<h1>` per page.
- Fast static asset delivery from `public/` and hashed Vite bundles.
- `lang` attribute updates with the language toggle.

Known limits:

- The canonical, sitemap and OG URLs still use the placeholder `https://nextgen-coders.vercel.app`.
- Per-route metadata is applied client-side; the static `index.html` carries correct defaults, but social scrapers that do not run JavaScript will only see those defaults.
- No JSON-LD (`EducationalOrganization`, `Event`) yet.
- No `hreflang`, because language is a client toggle rather than separate URLs.

---

## 13. Accessibility

Verified with Lighthouse 12 (accessibility **100** on home, about and join) and by DOM checks:

- One `<h1>` per page; sensible heading order.
- Skip-to-content link as the first focusable element.
- All images have `alt`; decorative images use empty `alt` and `aria-hidden`.
- Every input and textarea has a label; radio groups use `fieldset` + `legend`.
- Errors are text messages, not colour-only signals, and focus moves to the first invalid field.
- `:focus-visible` outline on every interactive element.
- Mobile menu reports `aria-expanded` and closes with Escape.
- `aria-current` via `NavLink` for the active route.
- `prefers-reduced-motion` disables the hero slideshow and smooth scroll.
- Both themes maintain readable contrast; the light-mode accent text is darkened for that reason.
- Language changes update `document.documentElement.lang`.

Minor: the navbar controls are 36 px tall. That clears the 24 px WCAG target minimum but is below Apple’s 44 px comfort guideline.

---

## 14. Performance

Measured on the **local production preview** (`vite preview`, `http://127.0.0.1:4173`), not on a live host.

| Page | Performance | Accessibility | Best practices | SEO | LCP | CLS | TBT |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Home, mobile | 91 | 100 | 100 | 100 | 3.4 s | 0 | 20 ms |
| Home, desktop | 100 | 100 | 100 | 100 | 0.7 s | 0.006 | 40 ms |
| About, mobile | 81 | 100 | 100 | 100 | 2.1 s | 0 | 700 ms |
| Join, mobile | 90 | 100 | 100 | 100 | 2.1 s | 0.047 | 350 ms |

Home transfer: **~740 KB** — about 584 KB images, 100 KB JS gzip, 47 KB CSS/font, 7 KB other.

Why it is fast:

- Static assets, no server rendering cost.
- One compact app bundle; the heavy Supabase client is a separate lazy chunk.
- Images are WebP, correctly sized, lazy below the fold, with explicit `width`/`height`.
- Hero photos other than the first are delayed 1.2 s.
- Self-hosted fonts avoid third-party connections; browsers fetch only the subsets they need via `unicode-range`.
- No icon font, no animation library, no analytics script.

Main weakness: mobile LCP at 3.4 s on a throttled connection. The five hero WebPs total ~537 KB (`hero-1` 185 KB, `hero-2` 162 KB, `hero-3` 49 KB, `hero-4` 61 KB, `hero-5` 80 KB). The audit’s first quick win is 900 px mobile `srcset` variants plus preloading only the first slide. The logo is also 48 KB at 512 px while rendering at 36 px.

---

## 15. Testing

**Playwright 1.65.1** with Microsoft Edge, two projects:

| Project | Viewport | Extra |
| --- | --- | --- |
| `mobile` | 390×844 | `isMobile`, `hasTouch` |
| `desktop` | 1280×800 | — |

Configuration: 30 s timeout, 7 s expect timeout, trace retained on failure, screenshot only on failure, auto-starts the Vite dev server on `127.0.0.1:5173` with `reuseExistingServer`.

Coverage:

- Every page loads cleanly at both sizes (looped over all 8 public pages).
- Desktop navbar reaches every page.
- Mobile menu opens, navigates and closes.
- Language toggle switches to English and persists after reload.
- Theme toggle switches to light and persists.
- English layout fits a phone on every page.
- Gallery category filters keep only the chosen category.
- Board page names the confirmed president and has a working `mailto:`.
- Unknown URL renders the custom 404 with a way home.
- Join form: empty submit shows every required error, invalid email rejected, valid request reaches demo success, message capped at 1000 characters.

Last full run: **37 passed, 3 skipped (40 runs)**, ~1.2 minutes. The three skips are viewport-specific by design: the desktop navbar test skips on mobile, the mobile menu test skips on desktop, and the English phone-layout test skips on desktop.

---

## 16. Build and deployment readiness

```bash
npm install
npm run dev       # http://127.0.0.1:5173
npm run build     # dist/
npm run preview   # http://127.0.0.1:4173
npm test          # Playwright, mobile + desktop
npm run images    # regenerate every WebP from the club originals
npm run og        # regenerate the 1200x630 social card
```

Production build output:

- `index-*.js` — 347.8 kB raw / 103.6 kB gzip
- `dist-*.js` — 216.0 kB raw / 55.7 kB gzip (lazy Supabase client)
- `index-*.css` — 27.7 kB raw
- Inter Variable WOFF2 subsets — ~214 kB on disk, only matching subsets fetched at runtime
- `dist/` total — ~2.8 MB including all images and fonts

Hosting setup already present:

- `vercel.json` rewrites every path to `/index.html`, so `/about` survives a refresh.
- `.env.example` documents the three variables.
- `README.md` has step-by-step Vercel instructions.
- `SUPABASE_SETUP.md` documents the SQL and auth steps.

Missing before launch:

1. An actual Supabase project and its URL + anon key in Vercel and locally.
2. A Vercel deployment and a real domain.
3. Replacement of `nextgen-coders.vercel.app` in `index.html`, `robots.txt`, `sitemap.xml` and the `VITE_SITE_URL` fallback.
4. A GitHub repository. There is currently **no git repo**, so changes are not versioned or recoverable through git.

---

## 17. Honest limitations

- **Not deployed.** There is no public URL, no HTTPS test, no DNS, no hosting headers.
- **No real form submissions.** The join form runs in demo mode; Supabase has not been configured.
- **Incomplete board.** Only the president is confirmed. The page says the rest will come later rather than inventing names.
- **One unconfirmed date.** The April 2027 hackathon says “date à confirmer”.
- **Client-side metadata.** Per-route canonical and OG updates require JavaScript; the static shell has correct defaults.
- **No structured data.** JSON-LD is not implemented.
- **No privacy page.** The form has a privacy note, but there is no dedicated notice explaining storage and deletion.
- **No admin UI or email notification** for join requests.
- **No spam protection** on the public insert policy.
- **Mobile hero weight** is the main performance cost.
- **Testing environment is headless Edge**, not real iOS/Android hardware. It was not tested with a screen reader on a real device.
- **No analytics**, so there is no traffic or conversion data.

---

## 18. Why it holds together

The site is not impressive because of how many libraries it uses — it is impressive because the same small set of decisions is repeated everywhere:

- one orange, one black, one white, and a token for every shade in between;
- one 4 px radius and one hairline border;
- one container width, one spacing rhythm, one heading style;
- two typefaces, two languages, two themes, one calm animation;
- real photos, real dates, real names only where confirmed;
- a form that tells the truth when it is not connected;
- a build that can regenerate its own images and its own social card;
- tests that cover both phone and desktop, and an audit that documents what is still missing.

That discipline is the “stack” behind the result as much as React, Vite and Tailwind are.
