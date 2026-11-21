---
name: react-frontend
description: React + Vite + Tailwind structure for the NEXTGEN site — pages, routing, state, forms.
---

Model: deepseek-chat (V3) — fast code generation. Switch to deepseek-reasoner (R1) for tricky state or routing logic.

# react-frontend

Use this skill for all frontend code.

## Stack
React 18+ with Vite, Tailwind CSS, react-router-dom. No extra state
library — useState / useEffect only. Keep it simple enough for a
student to explain to a teacher.

## Structure
- `src/pages/` — Home, About, Tracks, Events, Join, Contact (one file
  per page, built one at a time).
- `src/components/` — Navbar, Footer, TrackCard, EventCard, JoinForm.
- `src/data/` — tracks, events and timeline as plain arrays, so text
  changes do not need code changes.
- `src/lib/supabase.js` — the only file that talks to Supabase.

## Rules
- One component, one job. Short components (under ~150 lines).
- Forms: controlled inputs, validate on submit, show a clear success
  message and a clear error message. Disable the submit button while
  sending, so double-clicks do not create two rows.
- Routing: `/`, `/about`, `/tracks`, `/events`, `/join`, `/contact`.
  A wrong URL shows a simple 404 page with a link home.
- No API keys in this code. The Supabase anon key comes from
  `import.meta.env.VITE_SUPABASE_ANON_KEY` only.
- French copy first (see DEEPSEEK.md); keep every user-visible string
  in the page/data file, not buried in logic.
