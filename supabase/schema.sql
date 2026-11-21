-- NEXTGEN CODERS — Supabase schema
-- Run this once in Supabase Studio → SQL Editor.
-- Then read SUPABASE_SETUP.md for the manual auth steps.

-- ─────────────────────────────────────────────────────────────
-- join_requests: anyone may insert, only signed-in admins may read
-- ─────────────────────────────────────────────────────────────
create table if not exists public.join_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null
    check (char_length(btrim(name)) between 2 and 80),
  email text not null
    check (char_length(email) <= 254 and email ~* '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]+$'),
  track text not null
    check (track in ('web', 'ai', 'cyber', 'systems', 'design')),
  level text not null
    check (level in ('beginner', 'intermediate', 'advanced')),
  message text
    check (message is null or char_length(message) <= 1000),
  created_at timestamptz not null default now()
);

alter table public.join_requests enable row level security;

drop policy if exists "join_requests_insert_public" on public.join_requests;
create policy "join_requests_insert_public"
  on public.join_requests
  for insert
  to anon, authenticated
  with check (true);

-- There is no public sign-up, so every authenticated user is an admin.
drop policy if exists "join_requests_select_admin" on public.join_requests;
create policy "join_requests_select_admin"
  on public.join_requests
  for select
  to authenticated
  using (true);

-- No update or delete policy: only the Supabase dashboard/service role can edit rows.

create index if not exists join_requests_created_at_idx
  on public.join_requests (created_at desc);

grant insert on public.join_requests to anon, authenticated;
grant select on public.join_requests to authenticated;

-- ─────────────────────────────────────────────────────────────
-- events: public read, admin write. Bilingual columns for FR / EN.
-- The site falls back to src/data/events.js if this table is empty.
-- ─────────────────────────────────────────────────────────────
create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  title_fr text not null,
  title_en text,
  date_label_fr text not null,
  date_label_en text,
  date_note_fr text,
  date_note_en text,
  badge_top text not null default '',
  badge_bottom text not null default '',
  description_fr text not null,
  description_en text,
  status text not null default 'upcoming'
    check (status in ('upcoming', 'past')),
  facts jsonb not null default '[]'::jsonb
    check (jsonb_typeof(facts) = 'array'),
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  unique (title_fr, date_label_fr)
);

alter table public.events enable row level security;

drop policy if exists "events_select_public" on public.events;
create policy "events_select_public"
  on public.events
  for select
  to anon, authenticated
  using (true);

drop policy if exists "events_write_admin" on public.events;
create policy "events_write_admin"
  on public.events
  for all
  to authenticated
  using (true)
  with check (true);

grant select on public.events to anon, authenticated;
grant insert, update, delete on public.events to authenticated;

-- ─────────────────────────────────────────────────────────────
-- Seed the current events (safe to re-run: skips existing ids).
-- ─────────────────────────────────────────────────────────────
insert into public.events
  (title_fr, title_en, date_label_fr, date_label_en, date_note_fr, date_note_en,
   badge_top, badge_bottom, description_fr, description_en, status, facts, sort_order)
values
  (
    'Hackathon santé',
    'Health-tech hackathon',
    '28–29 octobre 2026',
    '28–29 October 2026',
    null, null,
    '28–29', 'OCT. 2026',
    'Un hackathon de 48 heures organisé par le club : 31 participants, 9 projets autour de la santé.',
    'A 48-hour hackathon organised by the club: 31 participants and 9 projects around health.',
    'past',
    '[{"value":"31","label_fr":"participants","label_en":"participants"},{"value":"9","label_fr":"projets","label_en":"projects"},{"value":"48 h","label_fr":"de construction","label_en":"of building"}]'::jsonb,
    50
  ),
  (
    'Best Website Competition',
    'Best Website Competition',
    'mars 2026',
    'March 2026',
    null, null,
    'MAR.', '2026',
    'La première édition de la compétition de sites web du club.',
    'The first edition of the club''s website competition.',
    'past',
    '[{"value":"1re","label_fr":"édition","label_en":"edition"}]'::jsonb,
    40
  ),
  (
    'Rencontre avec Bank of Africa',
    'Meeting with Bank of Africa',
    'novembre 2026',
    'November 2026',
    null, null,
    'NOV.', '2026',
    'Une rencontre avec Bank of Africa (BMCE Group) autour de l''offre jeunesse, dans le cadre de la saison 2026/2027.',
    'A meeting with Bank of Africa (BMCE Group) around their youth offer, as part of the 2026/2027 season.',
    'past',
    '[]'::jsonb,
    55
  ),
  (
    'Atelier n8n',
    'n8n workshop',
    'février 2026',
    'February 2026',
    null, null,
    'FÉV.', '2026',
    'Un atelier sur l''automatisation avec n8n. 50 participants, et de vrais certificats à la sortie.',
    'A workshop on automation with n8n. 50 participants, with real certificates at the end.',
    'past',
    '[{"value":"50","label_fr":"participants","label_en":"participants"}]'::jsonb,
    30
  ),
  (
    'Computer Day',
    'Computer Day',
    '22 janvier 2026',
    '22 January 2026',
    null, null,
    '22', 'JAN. 2026',
    'La journée informatique de l''EST Laâyoune, avec le club.',
    'Computer Day at EST Laayoune, with the club.',
    'past',
    '[]'::jsonb,
    20
  ),
  (
    'Hackathon : le site de l''université, en mieux',
    'Hackathon: the university website, better',
    'avril 2027',
    'April 2027',
    'date à confirmer',
    'date to be confirmed',
    'AVR.', '2027',
    '6 équipes et 25 participants sur un seul sujet : reconstruire le site de l''université, en mieux.',
    '6 teams and 25 participants on a single brief: rebuild the university website, better.',
    'upcoming',
    '[{"value":"6","label_fr":"équipes","label_en":"teams"},{"value":"25","label_fr":"participants","label_en":"participants"}]'::jsonb,
    60
  )
on conflict do nothing;

-- ─────────────────────────────────────────────────────────────
-- Quick check: RLS is on and policies exist.
-- ─────────────────────────────────────────────────────────────
-- select tablename, rowsecurity from pg_tables where schemaname = 'public';
-- select tablename, policyname, cmd, roles from pg_policies where schemaname = 'public';
