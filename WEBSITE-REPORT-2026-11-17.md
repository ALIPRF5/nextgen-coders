# NEXTGEN CODERS — Full Website Report

**Project:** Official website of the NEXTGEN CODERS programming club, EST Laâyoune
**Report date:** 17 November 2026
**Revision:** 18 November 2026 — the `/website` 3D story page was removed at the client's request, together with Three.js, React Three Fiber, its links, sitemap entry and tests. The site is now eight pages plus the 404. Sections below that describe `/website` are kept as a record of the earlier build.

**Revision:** 18 November 2026 (later the same day) — the whole site was restyled in the layout language of **hackclub.com/clubs** (serif display type, white dotted-grid paper, hard offset shadows, rounded perk cards, tilted polaroids, gold band), using the club logo's gold `#FEA901` as the accent instead of Hack Club red. **19 November 2026:** Home now shows the tagline as a full-width gold **motto band** instead of a small pill and an animated marquee, and its hero photo is a smooth four-photo slideshow; Home and Events replace the next-event card with a large **“Coming soon”** panel; the Board page presents the president and the five other board members with the same two-card row (numbered gold card on the left with the member's portrait, name, role, message and contact links on the right) and shows the supplied stats (115 members, 190 Instagram followers, 69 LinkedIn followers). Section 8 and the build table in section 13 describe the current design; earlier design notes are superseded. **20 November 2026:** the join form now saves each request to a local **SQLite** database (`data/nextgen.sqlite`) through `POST /api/join`, readable with `npm run join:list` and exportable with `npm run join:export`; Supabase remains optional. **21 November 2026:** Supabase is configured with the project URL and publishable key in `.env`; join submissions now go to the Supabase `join_requests` table, and the local SQLite database remains as the fallback when credentials are absent.
**Scope:** The whole site — eight routes plus the 404, the design system, the bilingual layer, the data layer, SEO, accessibility, performance, tests and build.
**Status:** Finished local build with a working join database. Not deployed; production join storage needs Supabase or a Node host. No invented dates, members, partners or metrics appear anywhere below.

---

## 1. In one paragraph

The site is a hand-written **single-page application** built with **React 19** and bundled by **Vite 8**. It uses **React Router 7** for the eight routes, **Tailwind CSS 3.4** on top of a custom CSS-variable token system for the visual design, plain **JavaScript (JSX)** for all logic, a small custom **i18n context** for French/English, a small custom **theme context** for dark/light, an optional **Supabase** backend for events and join requests, and a **local SQLite database** (Node's built-in `node:sqlite`, no dependency) behind the join form when Supabase is not configured. Photos and the logo are real club assets optimised to **WebP** with **Sharp**. Everything is tested with **Playwright** on a phone and a desktop viewport.

There is no server of its own, no CMS, no TypeScript, no SSR, no UI kit, no animation library, no state manager and no CSS framework beyond Tailwind. The whole thing is static files that can be hosted anywhere.

---

## 2. The club the site describes

NEXTGEN CODERS is the programming club of **EST Laâyoune**. The site presents:

- **Five tracks** — Web & Full-Stack, AI, Cybersecurity, Systems, Design — each with what you learn, who it is for, and a level range.
- **Six events** — five past (integration day, health hackathon, Best Website Competition, n8n workshop, Computer Day, Bank of Africa meeting) and one upcoming, the **April 2027 hackathon**, whose exact date is still marked *“date à confirmer”*.
- **A board of six people** — president **Ali El Amrani**, vice president **Issam Brahmi**, HR manager **Anas Errafiq**, general secretary **Chaima Labsiri**, community & social media manager **Nezha Azizi** and photographer **Adnan El Idrissi**. Each portrait comes from the club's own `BOARD PHOTOS` folder and is shown in that member's gold card.
- **Club stats supplied by the club** — 115 members, 190 Instagram followers and 69 LinkedIn followers. They are displayed as the Board page's number cards.
- **Sixteen real photos** from club events, filterable by category, plus **six board portraits** from the club's own `BOARD PHOTOS` folder.
- **A join form** that validates on the client and saves each request: to a local **SQLite** database by default, or to Supabase when credentials exist.

The club is the subject of the site. An earlier `/website` page, which explained how the site itself was built in 3D, has been removed.

---

## 3. Languages and technologies

### 3.1 Languages actually used

| Language | Where | What it does |
| --- | --- | --- |
| **JavaScript (ES2022+, JSX)** | all of `src/`, `scripts/`, `tests/`, config files | The only programming language in the app. JSX is the templating syntax inside JavaScript. |
| **CSS** | `src/index.css`, Tailwind output | Design tokens, base styles, component classes, transitions, reduced-motion rules. |
| **HTML** | `index.html` | Document shell, meta tags, `<noscript>` fallback, favicons, theme bootstrap script. |
| **XML** | `public/sitemap.xml` | Eight public URLs for crawlers. |
| **SQL** | `supabase/schema.sql` | Tables, constraints, row-level security policies for the optional backend. |
| **Markdown** | `README.md`, reports | Documentation only; not shipped to the browser. |

No TypeScript, no Python, no PHP, no server-side language in production.

### 3.2 Runtime dependencies

| Package | Version | Role on this site |
| --- | --- | --- |
| `react` / `react-dom` | 19.3.1 | Component model and rendering. |
| `react-router-dom` | 7.18.5 | Client-side routing, nested layout, links, scroll restoration. |
| `@supabase/supabase-js` | 2.119.0 | Optional backend client, loaded only when configured. |
| `@fontsource-variable/inter` | 5.3.0 | Self-hosted Inter variable font; no Google Fonts request. |

Three.js and React Three Fiber were removed with the `/website` page on 18 November 2026, so the site now ships no WebGL engine.

### 3.3 Build and quality dependencies

| Package | Version | Role |
| --- | --- | --- |
| `vite` | 8.3.8 | Dev server, HMR, production bundler, per-route code splitting. |
| `@vitejs/plugin-react` | 6.3.0 | React fast refresh and JSX transform. |
| `tailwindcss` | 3.4.17 | Utility classes generated from `tailwind.config.js`. |
| `postcss` / `autoprefixer` | 8.5.33 / 10.6.2 | Tailwind pipeline and vendor prefixes. |
| `@playwright/test` | 1.65.1 | End-to-end tests on Chromium/Edge at two viewports. |
| `sharp` | 0.35.5 | Image resizing and WebP conversion in `scripts/`. |

### 3.4 Browser APIs used directly

`localStorage` (language, theme), `matchMedia` (reduced motion), `IntersectionObserver` + `MutationObserver` (scroll reveals), `history` via React Router, and the Clipboard/`mailto:` links only where relevant.

---

## 4. How the site works, end to end

```
Browser
  │
  ├─ index.html ................ document shell, meta tags, theme bootstrap
  │
  ├─ /assets/index-*.js ........ React + Router + i18n + theme + shared components
  │     │
  │     ├─ Layout .............. skip link · navbar · <main id="main"> · footer
  │     ├─ Route chunk ......... only the page you asked for (lazy import)
  │     └─ /assets/dist-*.js ... Supabase client, only when the backend is used
  │
  ├─ /assets/index-*.css ....... tokens, base, components, utilities
  ├─ /images/*.webp ............ gallery photos, hero slides, event art, logos
  └─ POST /api/join ............ Vite middleware → data/nextgen.sqlite (dev + preview)
```

1. **First paint.** `index.html` contains an inline script that reads `ng-theme` from `localStorage` and sets `data-theme` **before** React mounts, so a light-mode visitor never sees a dark flash. It also contains a `<noscript>` message in French and English.
2. **Boot.** `src/main.jsx` mounts `<App />` inside the language and theme providers and an error boundary.
3. **Routing.** `App.jsx` wraps every route in `Layout` and `ScrollToTop`. Each page is a `React.lazy` import, so the initial JavaScript does not include pages you have not opened.
4. **Rendering.** Pages are pure React components. They read copy from `src/i18n/{fr,en}.js` and structured data from `src/data/*.js`.
5. **Interaction.** Toggles write to `localStorage`; the join form validates in the browser and posts to the local SQLite API (or Supabase when configured); the gallery filters in memory and opens an accessible lightbox.
6. **No network required.** With no `.env` file the site runs fully from local data and the join form saves to `data/nextgen.sqlite`. Supabase is an upgrade, not a dependency.

### Why a static SPA

- One deploy artefact and no database required to view anything; the join form adds a small local SQLite API during development.
- Route-level code splitting keeps the first load small.
- Copy and data live in JavaScript modules, so there is no CMS to secure and no API to keep alive.
- The trade-off is that HTML is rendered in the browser: social crawlers and no-JS visitors get the shell plus the meta tags in `index.html`, not per-page server HTML. Canonical, OG and description tags are still correct once JavaScript runs.

---

## 5. Project architecture

```
NEXT GEN CODERS FILE/
├─ index.html                  document shell, meta, no-JS fallback, theme bootstrap
├─ vite.config.js              Vite + React plugin
├─ tailwind.config.js          tokens → Tailwind colours, fonts, radii, 1440 px shell
├─ postcss.config.js           Tailwind + autoprefixer
├─ playwright.config.js        Edge, 390×844 and 1280×800, dev-server reuse
├─ vercel.json                 SPA rewrite: every path → index.html
├─ .env.example                VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY, VITE_SITE_URL
├─ supabase/schema.sql         tables, checks, RLS policies
├─ public/
│  ├─ images/                  36 files: 32 WebP photos + logo/icon PNGs
│  ├─ favicon-32.png · favicon-192.png · apple-touch-icon.png
│  ├─ og-image.png             1200×630 social card
│  ├─ robots.txt · sitemap.xml
├─ scripts/
│  ├─ optimize-images.mjs      resizes originals → WebP
│  └─ og-image.mjs             builds the OG card with Sharp + the logo
├─ src/
│  ├─ main.jsx                 providers + mount
│  ├─ App.jsx                  lazy routes
│  ├─ index.css                tokens, base, component classes
│  ├─ components/              19 files: 18 shared components + the icon set
│  ├─ data/                    site, tracks, events, gallery, timeline
│  ├─ i18n/                    fr.js, en.js, index.jsx (context + pick())
│  ├─ lib/                     theme.jsx, supabase.js, EventsContext.jsx
│  ├─ pages/                   Home, About, Tracks, Events, Gallery, Board, Join,
│  │                           Contact, NotFound
└─ tests/                      site.spec.js, join.spec.js
```

**Size:** 41 files under `src/`, about **3,550 lines** of JavaScript/JSX/CSS. That is small enough to read end to end, which is why the project has no abstractions it does not need.

---

## 6. The pages

Every page uses the same shell: sticky 64 px navbar, bordered sections, a `CtaBand` near the end where it fits, and the footer. Each page calls `<Seo page="…" path="…" />`, which sets title, description, Open Graph, Twitter and canonical tags.

| Route | Page | What it contains |
| --- | --- | --- |
| `/` | Home | Oversized serif hero, a smooth four-photo slideshow in a polaroid frame, a full-width gold motto band, what the club is, the five tracks, a large **“Coming soon”** band in place of the next event, an about band, and a join CTA. |
| `/about` | About | The club's story, what it does, how it works, values, and a call to join. |
| `/tracks` | Tracks | The five tracks in detail: description, what you learn, who it is for, level pills. |
| `/events` | Events | Upcoming event highlighted, past events listed with photos and badges; data can come from Supabase and falls back to local data. |
| `/gallery` | Gallery | 16 photos, filter buttons for all/hackathons/workshops/competitions/meetings, live photo count, accessible lightbox. |
| `/board` | Board | The president and the five other board members, each in the same two-card row: numbered gold card at left with the member's portrait, white card at right with name, role, message and contact links. The club's organisation is explained without inventing seats. |
| `/join` | Join | The join form: name, email, track, level, message; client-side validation, error messages tied to inputs, a local-database notice, success state. |
| `/contact` | Contact | Instagram, email, school location, and a short practical note. |
| `*` | NotFound | A real 404 page with links back home and to the main sections. |

Navigation policy: the desktop navbar has **eight** items (Home, About, Tracks, Events, Gallery, Board, Join, Contact), and the same eight links appear in the footer and mobile menu.

---

## 7. The `/website` page in depth (removed)

> **Removed on 18 November 2026.** This section is kept as a record of the earlier build. The route, page, `src/three/` scene, links, sitemap entry, tests and the Three.js/React Three Fiber dependencies no longer exist in the project.

This was the only WebGL page, and it explained the site while you scrolled through it.

### 7.1 Structure

```
<div data-story>                          ← the scroll track (5 chapters tall)
  ├─ sticky viewport                      ← the 3D canvas stays pinned under the navbar
  │    ├─ <Canvas> (lazy)                 ← WebGL world
  │    ├─ gradient scrim                  ← keeps text readable over geometry
  │    └─ "01 / 05" progress readout
  └─ scrolling content                    ← chapters laid over the pinned canvas
       ├─ intro                           ← title, lead, motion toggle
       ├─ 01 Le club
       ├─ 02 Les événements
       ├─ 03 Le design
       ├─ 04 La technique
       └─ 05 Les coulisses
     </div>
<CtaBand>                                  ← "La suite, c'est le club."
```

The old **chapter 06 “La vérité”** was removed at the client's request. The progress indicator was changed from `/ 06` to `/ 05`, the chapter calculation from `* 6` to `* 5`, the sixth 3D piece (`TruthStacks`) was deleted from the scene, and the ending was replaced by a `CtaBand` that reuses the “La suite, c'est le club.” copy. The bilingual `truth` block was removed from both dictionaries and replaced with a small `website.outro` block.

### 7.2 Scroll → camera

- A passive `scroll` listener computes `progress = -storyTop / (storyHeight - viewportHeight)`, clamped to 0–1, and stores it in a **ref** (no re-render per pixel).
- The same handler updates the chapter number for the “01 / 05” readout.
- `CameraRig` reads the ref every frame, maps progress onto **six keyframes**, and uses `smoothstep` between them so velocity is continuous at each stop.
- Each keyframe has a desktop position/target and a **compact** variant (extra distance, lower target) so the object sits in the free space above the text on phones.
- Between keyframes the camera lifts by `sin(π·t) × 2.4` and pulls back by `sin(π·t) × 4.5`, so it arcs over the geometry instead of flying through it.
- `MathUtils.damp` smooths position and look-at target (`lambda = 4.5`, or `40` when motion is reduced).
- FOV is `40°` on desktop and `56°` on compact screens; fog runs from `14` to `34` units in the current theme background colour.

The scene objects sit at fixed depths - browser `0`, club `-12`, events `-27.4`, design `-40`, stack `-52`, photos `-65` - and the camera walks that corridor.

The chapter-02 ring also turns with progress (`(p − 0.4) × 4π`), so the event photos orbit as you scroll, and the whole ring fades in and out around its chapter so it never lingers behind another piece.

### 7.3 What is in the 3D world

Everything is **procedural geometry**: no external `.glb`/`.fbx` models, no downloaded assets, and no textures except the real event photos on the chapter-02 ring and the gallery photos on the photo wall.

| Chapter | Object | Built from |
| --- | --- | --- |
| Intro | Browser frame with a dark screen and a hairline chrome bar | boxes, planes, thin accent strips |
| 01 Club | Wireframe icosahedron with a solid core and five orbiting nodes | `icosahedronGeometry`, `torusGeometry`, lines |
| 02 Events | Five real event photos on a ring that turns with the scroll; the upcoming hackathon has no poster yet, so it stays in the DOM text | planes + textures, thin torus, axis line |
| 03 Design | A cube showing accent, night, white and surface faces | `boxGeometry` with per-face materials |
| 04 Stack | Four stacked plates (React, Vite, Tailwind, Three) with connector pins | boxes, outlines, thin bars |
| 05 Backstage | Four photo plates using real gallery images | `TextureLoader` inside `Suspense` |
| — | Database lock and envelope beside the photo wall | boxes, torus, planes |

Lighting is a small rig: ambient, a gold directional light, and one point light near the stack. The palette is derived from the active theme, so the 3D world switches with dark/light mode instead of staying dark on a light page.

Text is **never** rendered in WebGL. All copy lives in DOM panels above the canvas, which keeps it selectable, translatable, searchable and accessible.

### 7.4 Loading, fallbacks and performance

- `WebsiteScene` is imported with `React.lazy`, so Three.js and R3F land in a separate **936 kB / 247 kB gzip** chunk that only `/website` requests.
- The canvas only mounts if `supportsWebGL()` passes; otherwise a static SVG isometric fallback is shown.
- `Suspense` shows the same fallback while the chunk loads.
- Rendering pauses (`frameloop="never"`) when the story is off-screen (`IntersectionObserver`, 240 px margin) or the tab is hidden (`visibilitychange`).
- Pixel ratio is capped at `[1, 1.5]`; antialiasing is on; `powerPreference: 'high-performance'`.
- `prefers-reduced-motion` is respected on first load, and a **manual toggle** in the intro overrides it. The choice is stored under `ng-motion`. In reduced mode damping is near-instant (the camera snaps between stops) and decorative CSS animation is disabled.
- On mobile the camera is compact and the DOM panels sit at the bottom, leaving the upper half of the screen for geometry.

---

## 8. Design system

### 8.1 Tokens

`src/index.css` defines CSS variables on `:root` / `[data-theme='light']` and `[data-theme='dark']`. The site opens in **light** by default: a white canvas over a faint dotted grid, in the layout language of **hackclub.com/clubs**, carried by the club's own gold instead of Hack Club red. Dark mode is one click away.

| Token | Light (default) | Dark | Use |
| --- | --- | --- | --- |
| `--ink` | `255 255 255` | `23 23 29` | page background |
| `--surface` | `255 255 255` | `30 30 38` | cards and panels |
| `--raised` | `247 246 242` | `27 27 34` | alternate bands |
| `--line` | `224 221 213` | `57 57 68` | hairlines |
| `--fg` | `23 23 29` | `253 253 251` | primary text |
| `--muted` | `61 61 69` | `187 187 196` | secondary text |
| `--accent` | `254 169 1` | `254 169 1` | brand gold `#FEA901`, backgrounds and bands |
| `--accent-text` | `138 82 0` | `255 202 84` | accessible amber for gold text on the canvas |
| `--accent-soft` | `255 244 220` | `58 42 10` | tinted notices and warning banners |
| `--shadow` | `23 23 29` | `0 0 0` | hard offset shadows |

Gold is now the main accent, not a rare detail: the join buttons, motto band, CTA bands, event badges, active gallery filter, sticker labels and page eyebrows all sit on `#FEA901`. Because gold is a light colour, anything on a gold background is set in **ink `#17171D`**, never white — this holds for the buttons, the motto band, the CTA bands, the Events “Coming soon” panel and the join stickers. White text only appears on the ink/night blocks (footer, dark CTA card, dark buttons).

Supporting card tints are warm and muted so they never compete with the gold: `sun #FFD166`, `sky #8ECAE6`, `grape #CDB4F6`, `mint #A7E8C4`, `blush #FFC2D1`, `tangerine #FFC27A`. They are used as `.perk-*` backgrounds with ink text, and on the About, Tracks, Board and Contact cards. Text selection is gold on ink; focus rings are 3 px gold with a 3 px offset.

### 8.2 Shape and type

- **Radius:** cards, perks and panels use `rounded-card` (`18px`); buttons, inputs, filters and tags use `rounded-control` (`10px`); stickers and the back-to-top button are full pills.
- **Borders and shadows:** borders are 2 px at 10–15 % ink; buttons and stickers carry a hard offset shadow (`3px 4px 0`), cards a short stacked shadow, and photos a white polaroid frame with a 3 px ink border and a deep drop shadow. Nothing is flat and hairline-thin like the earlier editorial build.
- **Paper:** `.paper` draws the dotted grid (`radial-gradient` dots, 24 px pitch) used behind the hero, page headers, the footer and the CTA sections.
- **Shell:** `max-width: 1280px`, `px-5` on mobile, `px-8` from `sm`, `px-10` from `lg`.
- **Display type:** **Fraunces**, a variable serif self-hosted from `public/fonts/` (OFL licence), weight 600 with `opsz`/`WONK` variation settings, line-height `0.96` and tracking `-0.035em`. Hero and section titles are set with `clamp()` so they scale from phone to desktop without media-query jumps.
- **Body type:** **Inter Variable**, self-hosted through `@fontsource-variable/inter`, 16.5 px / 1.6.
- **Micro-labels:** `.eyebrow` and `.meta` are 11 px uppercase, widely tracked, paired with a small gold dot or sparkle.
- **Classes:** `.shell`, `.paper`, `.eyebrow`, `.meta`, `.display`, `.display-tight`, `.btn`, `.btn-primary`, `.btn-outline`, `.btn-invert`, `.btn-on-accent`, `.btn-ghost`, `.btn-sm`, `.card`, `.card-hover`, `.perk`, `.perk-yellow`, `.perk-blue`, `.perk-purple`, `.perk-mint`, `.perk-pink`, `.perk-orange`, `.link-underline`, `.input`, `.input-error`, `.pill`, `.rule`, `.photo-frame`, `.sticker`, `.wave`, plus the `[data-reveal]` utility.

### 8.3 Theming

`src/lib/theme.jsx` is a ~40-line context. It reads `ng-theme`, **defaults to light**, writes `document.documentElement.dataset.theme`, updates `<meta name="theme-color">`, and exposes `theme`, `setTheme`, `toggle`. The inline script in `index.html` applies the saved theme before first paint, which avoids a flash.

Dark mode is a token swap, not a separate stylesheet: the canvas becomes ink `#17171D`, surfaces lift to `#1E1E26`, and the gold stays `#FEA901` while gold text brightens to `#FFCA54` for contrast. The `.perk-*` cards deliberately keep their warm tints and ink text in both themes, and `.photo-frame` keeps a white paper background (its border lightens to `#FDFDFB`) so polaroid captions stay readable.

---

## 9. French first, English on demand

- `src/i18n/index.jsx` holds a context with `lang`, `setLang` and the full dictionary `t`.
- Two dictionaries, `fr.js` and `en.js`, are plain nested objects mirroring each other: navigation, common labels, per-page copy, meta titles/descriptions, form messages, footer and 404.
- The default is **French**. `document.documentElement.lang` follows the choice, and the choice persists in `localStorage` under `ng-lang`.
- Structured data (`src/data/*.js`) stores bilingual values as `{ fr, en }`; `pick(value, lang)` returns the right one, falling back to French if English is missing.
- The toggle sits in the navbar on desktop and in the mobile menu; changing language does not reload the page.
- The Playwright suite checks that the toggle switches to English, remembers it after reload, and that **the English version does not overflow a 390 px phone on any of the eight routes**.

There is no i18n library, no message compiler and no route prefix (`/en/...`). For two languages and one client-rendered app, a context and two objects are enough.

---

## 10. Data and the optional backend

### 10.1 Local data

| File | Contents |
| --- | --- |
| `src/data/site.js` | Club name, school, tagline, Instagram, email, `siteUrl`, level list. |
| `src/data/tracks.js` | 5 tracks with bilingual name, tagline, learn list, audience, level. |
| `src/data/events.js` | 6 events: 1 upcoming (April 2027, date to confirm), 5 past, each with bilingual title/date/description, badge, image. |
| `src/data/gallery.js` | 16 photos with intrinsic width/height, category, bilingual caption and alt text. |
| `src/data/timeline.js` | Milestones used by the About page. |

This is the source of truth for a visitor. Nothing is fetched to render the site.

### 10.2 Supabase, when configured

`src/lib/supabase.js` creates the client **lazily** and only if `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` exist. The library therefore lands in its own **216 kB / 56 kB gzip** chunk and is never downloaded by visitors when the backend is off.

`supabase/schema.sql` defines:

- **`join_requests`** — insert allowed to anyone, read restricted to authenticated admins; checks on name length, email shape, track, level and message length.
- **`events`** — public read, admin write; bilingual columns (`title_fr`, `title_en`, `date_label_fr`, …), status, facts, badge, ordering.

`src/lib/EventsContext.jsx` loads events from Supabase when available and maps rows to the same shape as the local file. If the request fails or the table is empty, the local events are used, so the Events page never breaks. The upcoming April 2027 event remains in the data, but Home and Events deliberately show a **“Coming soon”** panel instead of promoting an unconfirmed date.

### 10.3 The local SQLite database (fallback)

When Supabase is not configured, the join form posts to **`POST /api/join`**, handled by a small Vite middleware (`server/join-api.js`) in both `npm run dev` and `npm run preview`. The middleware validates the payload again (never trusting the browser), applies a simple per-IP rate limit, and inserts the row through `server/join-store.js`, which uses Node's built-in **`node:sqlite`** driver. No extra dependency and no second process are needed.

The `join_requests` table stores only the information from the form:

| Column | Type | Notes |
| --- | --- | --- |
| `id` | integer | primary key, autoincrement |
| `name` | text | 2–120 characters |
| `email` | text | lower-cased, basic shape check |
| `track` | text | one of the five track IDs |
| `level` | text | `beginner`, `intermediate`, `advanced` |
| `message` | text | optional, ≤ 1000 characters |
| `created_at` | text | ISO-8601 timestamp set by the server |

The database file is `data/nextgen.sqlite` (WAL mode). It and the `data/` folder are created on the first insert and ignored by Git. `JOIN_DB_PATH` can point to another file. Two commands read it without opening a SQL client:

```bash
npm run join:list                  # table of the latest 50 submissions
npm run join:export                # CSV in data/join-requests-YYYY-MM-DD.csv
```

`src/lib/join.js` probes `GET /api/join` when the Join page opens. If the API is absent — for example on a purely static host — the form shows a notice inviting the visitor to email instead, rather than pretending the request was saved.

### 10.4 The join form

`src/components/JoinForm.jsx`:

- Fields: name, email, track, level, message; grouped in fieldsets with labels.
- Validation runs on submit and on change after the first attempt: name ≥ 2 characters, email matches a conservative pattern, track must be one of the five IDs, level one of three, message ≤ 1000 characters.
- Errors are rendered next to the field and referenced with `aria-describedby`/`aria-invalid`.
- With Supabase configured, it inserts into `join_requests` and shows a success state.
- Without credentials it posts to `/api/join`, which saves the request in SQLite; the success state is only shown after the server confirms the insert.
- If the local API cannot be reached, the form says so and offers the club email address.

---

## 11. SEO

- **Per page:** unique `<title>` and meta description, OG title/description/url/locale, Twitter title/description, canonical URL built from `SITE.siteUrl + path`.
- **Document shell:** `lang="fr"`, viewport, `theme-color`, favicons (32, 192, Apple touch icon), OG type/site name/image plus 1200×630 dimensions and alt text.
- **Structured files:** `robots.txt` allows everything and points at the sitemap; `sitemap.xml` lists the eight public URLs (`/`, `/about`, `/tracks`, `/events`, `/gallery`, `/board`, `/join`, `/contact`).
- **Social card:** `og-image.png` is generated by `scripts/og-image.mjs` with Sharp from the real logo and the tagline.
- **Honest limitation:** because the app renders on the client, crawlers that do not execute JavaScript see the shell and its default meta, not per-route HTML. A deploy could add prerendering if that matters for the club's search visibility.

---

## 12. Accessibility

- **Skip link** to `<main id="main">` as the first focusable element.
- **Landmarks:** `<header>`, `<nav aria-label>`, `<main>`, `<footer>`, `<section>` with headings in order.
- **Keyboard:** visible 3 px gold focus ring; the mobile menu closes on `Escape`; the lightbox supports `Escape`, `ArrowLeft`, `ArrowRight` and has a labelled dialog (`role="dialog"`, `aria-modal`).
- **Forms:** real `<label>`s, fieldsets, `aria-invalid`, error text linked to inputs, no placeholder-only labels.
- **Images:** every gallery, hero and event image has bilingual alt text describing the actual scene; decorative shapes are `aria-hidden`.
- **Motion:** `prefers-reduced-motion` disables the scroll-reveal transitions; there is no looping animation left on the page.
- **Contrast:** gold backgrounds (buttons, motto band, CTA bands, badges) always carry ink `#17171D` text rather than white; gold text on the light canvas uses a darker amber (`--accent-text: 138 82 0`), and the dark theme brightens it to `#FFCA54`.
- **Language:** the `lang` attribute changes with the toggle, so screen readers switch pronunciation.

---

## 13. Performance and build output

Production build (`npm run build`, Vite 8):

| Asset | Raw | Gzip |
| --- | --- | --- |
| `index-*.css` | 47.04 kB | 9.19 kB |
| `index-*.js` (React, Router, i18n, theme, shared UI) | 269.40 kB | 85.55 kB |
| `icons-*.js` (shared icon set) | 35.02 kB | 12.04 kB |
| `dist-*.js` (Supabase client, only when configured) | 216.01 kB | 55.68 kB |
| `Home-*.js` | 13.50 kB | 3.95 kB |
| `Join-*.js` | 10.83 kB | 3.35 kB |
| `About-*.js` | 6.82 kB | 2.18 kB |
| `Gallery-*.js` (page) | 6.70 kB | 2.35 kB |
| `Board-*.js` | 7.05 kB | 2.36 kB |
| `gallery-*.js` (data) | 5.19 kB | 1.41 kB |
| `Events-*.js` | 5.02 kB | 1.77 kB |
| `Contact-*.js` | 3.84 kB | 1.01 kB |

Why it stays reasonable:

- Every page is a lazy route, so a visitor who only reads `/about` never downloads the gallery or the form.
- Images are WebP, sized for their slot; the largest is **184 kB** (`hero-1.webp`), and 32 of the 36 files in `public/images` are WebP.
- The hero uses a single preloaded WebP; every other image is lazy-loaded and sized for its slot.
- Fonts are self-hosted, so there is no third-party font request: Fraunces ships as two `woff2` subsets (**121 kB** Latin, **105 kB** Latin-extended) and is only fetched when the display face is used.

---

## 14. Quality: tests and checks

`playwright.config.js` runs **Edge** against the dev server, reusing it when already running, at:

- **mobile** — 390×844, `isMobile`, touch;
- **desktop** — 1280×800.

The suite has **40 test cases** built from 20 test definitions (one loop covers eight pages), each run on both projects. The final run is:

```
35 passed, 5 skipped
```

Without Supabase the run is **37 passed, 3 skipped**. With Supabase configured, the two local-SQLite persistence cases skip themselves so the tests never write into the club's real `join_requests` table; the Supabase write path was verified manually with one test submission (HTTP 201).

The three skips are intentional and viewport-specific: desktop navbar (skipped on mobile), mobile menu (skipped on desktop), English phone-fit check (mobile only).

What is covered:

- Every page loads with a level-1 heading, no console errors, and no horizontal overflow.
- Desktop navbar reaches every route; the mobile menu opens, navigates and closes.
- Language toggle switches to English and survives reload; English fits a 390 px phone on all eight routes.
- Theme toggle switches to light and survives reload.
- Gallery filters keep only the chosen category (the count assertion is now race-safe with `expect.poll`).
- The board page names the confirmed president and the five other board members.
- An unknown URL shows the 404 page with a way home.
- The join form: empty submit shows every error, invalid email is rejected, the message is capped at 1000 characters, and — when Supabase is not configured — a valid request shows the success state, is read back from `data/nextgen.sqlite`, then the test row is deleted.

Additional QA already performed: the final production build passes and the suite above was re-run after the gold restyle (**37 passed, 3 skipped**); every route was screenshotted in light and dark at 1440 px and checked at 390 px with no horizontal overflow; the mobile menu, gallery filters/lightbox and join-form success state were verified visually. The earlier `/website` page was screenshotted at seven scroll positions on desktop and phone before it was removed, and no console errors were reported. The earlier audit scored the site **8.8/10** (`website-audit-nextgen-coders-2026-11-16.md`); that score predates the gold restyle.

---

## 15. Tooling scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Vite dev server with HMR. |
| `npm run build` | Production build into `dist/`. |
| `npm run preview` | Serves the built `dist/` locally. |
| `npm test` | Playwright suite (both projects). |
| `npm run test:ui` | Playwright interactive UI. |
| `npm run images` | `scripts/optimize-images.mjs` — resize originals to WebP. |
| `npm run og` | `scripts/og-image.mjs` — rebuild the 1200×630 social card. |
| `npm run join:list` | Read the latest join requests from the local SQLite database. |
| `npm run join:export` | Export every join request to a UTF-8 CSV file. |

---

## 16. Limits and what is not done

These are stated plainly because the site itself does not pretend otherwise:

1. **Not deployed.** No domain, no hosting account attached. Canonical URLs, OG URLs, `robots.txt` and `sitemap.xml` all still point at the placeholder `https://nextgen-coders.vercel.app`.
2. **Local-only storage by default.** Without Supabase, join requests are saved in `data/nextgen.sqlite` on the machine running the site. A purely static deployment has no `/api/join`, so production needs Supabase (or a Node host).
3. **No admin UI.** Requests are read with `npm run join:list`, exported with `npm run join:export`, or viewed in the Supabase Table Editor.
4. **April 2027 hackathon date** is still “date à confirmer”. The event stays in `src/data/events.js`, but Home and Events show a “Coming soon” panel rather than a date that is not fixed.
5. **No CMS.** Copy changes require editing `src/i18n/*.js` or `src/data/*.js` and rebuilding.
6. **Client-rendered SEO.** Per-page tags are applied after JavaScript runs; there is no SSR/prerender.
7. **No image CDN.** Images are static WebP in `public/images`, not transformed per device.
8. **Browser support.** Modern evergreen browsers with ES modules; old browsers get the no-script message rather than a broken page.
9. **Image count wording.** The folder holds **36 image files, 32 of them WebP** (plus logo/icon PNGs). Earlier copy said “30 images WebP”; the current copy states the exact split, now including the six board portraits.

---

## 17. How to run and deploy

```bash
# from the project folder
npm install
npm run dev            # http://localhost:5173

npm run build          # dist/
npm run preview        # serve dist/ locally

npm test               # 40 Playwright cases, 2 viewports
npm run join:list      # read local join requests
npm run join:export    # export them to CSV
```

Optional backend:

```bash
copy .env.example .env
# fill VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY (anon key only)
# run supabase/schema.sql in Supabase Studio → SQL Editor
```

Deployment, when the club is ready: any static host works. `vercel.json` already contains the only rule needed for a SPA:

```json
{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
```

Then update `VITE_SITE_URL`, the canonical/OG URLs in `index.html`, and the URLs in `public/sitemap.xml` and `public/robots.txt` to the real domain.

---

## 18. Summary

| Question | Answer |
| --- | --- |
| What is it? | A bilingual, dual-theme, static React SPA for the NEXTGEN CODERS club. |
| Main language | JavaScript (JSX), with CSS/HTML and a little SQL for the optional backend. |
| Framework | React 19 + React Router 7, bundled by Vite 8. |
| Styling | Tailwind CSS 3.4 over a custom CSS-variable token system; light-first near-white canvas, 1 px hairlines, pill controls, `#FEA901` used sparingly. |
| Content | 5 tracks, 6 events, 16 photos, 6 board members, 8 routes + 404. |
| Languages | French default, English toggle, both complete. |
| Backend | Supabase (events + join requests) configured; local SQLite as fallback. |
| Quality | 40 Playwright cases: 35 passed, 5 skipped with Supabase active (37/3 without); production build passes; 8.8/10 audit. |
| Status | Built, tested and linked to Supabase; not deployed. |

*Code smarter, not harder.*
