# NEXTGEN CODERS — club website

## What this site is
The official website of NEXTGEN CODERS, the student coding club at
EST Laayoune (Morocco). President: Ali El Amrani.
Tagline: "Code smarter, not harder."
Instagram: @nextgen_coders_estl — link every page footer to it.

## Facts to use (do not invent others)
- Launched January 2026. Computer Day 22 Jan 2026. Best Website
  Competition, 1st edition, March 2026. The club built the school's
  new website (August 2026).
- Health-tech hackathon 28–29 October 2026: 31 participants, 9 projects,
  48 hours — organised by the club itself.
- N8N workshop, February 2026: 50 participants, real certificates.
- April hackathon (planned): 6 teams, 25 participants, topic "Build
  the best club website".
- 5 tracks: Web & Full-Stack · AI & Machine Learning · Cybersecurity &
  CTF · Systems & Robotics · UI/UX Design.
- Season 2026/2027 opened alongside Bank of Africa (BMCE Group).

## Pages (build one at a time, test after each)
1. Home — hook "We don't just learn code. We build real things.",
   5 tracks, hackathon numbers (31 / 9 / 48h), join button.
2. About — who we are, timeline (Jan 2026 → today).
3. Tracks — one card per track, what you learn, who it is for.
4. Events — hackathon, N8N workshop, Best Website Competition,
   Computer Day; past events marked as past, next event highlighted.
5. Join — form: name, email, track (pick one of the 5), level
   (beginner / intermediate / advanced), message. Saved to Supabase.
6. Contact — Instagram link, EST Laayoune, email
   nextgencoders.est@gmail.com.

## Design
Black background (#0A0A0A), orange accent #FEA901, white text.
Clean, bold titles; mobile-first (most visitors come from Instagram
on their phone). French first, with an English toggle if it is easy —
if the toggle doubles the work, ship French only and add English later.

## Tech stack
React + Vite + Tailwind CSS. Supabase (free tier) for the join form
and the events list. No backend server of our own. Deploy on Vercel
(free tier).

## Models — which DeepSeek model for what
DeepSeek is not one model; pick the right one per task.
- Planning and architecture (reading this brief, designing the site
  structure, hard decisions): DeepSeek V4 thinking mode, or
  deepseek-reasoner (R1) through the API. It thinks step by step
  before answering.
- Writing code (React components, Tailwind, forms, fixes):
  deepseek-chat (V3 / V3.2). Fast and strong at code — use it for
  most of the building.
- Security-sensitive design (Supabase tables, Row Level Security,
  auth): deepseek-reasoner (R1). Think it through slowly; a security
  mistake is expensive.
- Each skill file says which model fits it best (see the "Model:"
  line at the top). When in doubt, use deepseek-chat; switch to
  deepseek-reasoner only for the hard or risky parts.

## Rules
- Never put API keys, Supabase service keys or passwords in frontend
  code. Only the public Supabase anon key, in an env var.
- Never invent dates, numbers or partners. If a fact is missing, leave
  the field out and say what is missing.
- Keep code simple and readable — a student project, not an enterprise
  app. Short comments, plain patterns.
- After every page: run the testing skill, fix what it finds, then
  move on. Do not build all pages first and test at the end.
