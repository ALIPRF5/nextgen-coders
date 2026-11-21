---
name: backend-data
description: Supabase backend for the NEXTGEN site — join form storage, events list, admin login. Free tier.
---

Model: deepseek-reasoner (R1) for the data model and Row Level Security rules — a security mistake here is expensive. Use deepseek-chat (V3) for the routine Supabase queries.

# backend-data

Use this skill for anything that stores or reads data.

## Service
Supabase, free tier. One project. Tables:
- `join_requests` — id, name, email, track, level, message,
  created_at. Insert allowed for everyone; read allowed only for
  logged-in admins (Row Level Security).
- `events` — id, title, date, description, status (upcoming/past),
  created_at. Read allowed for everyone; write only for admins.

## Auth
- Admin login only (email + password, Supabase Auth). No public
  sign-up on the site. Visitors never need an account.
- Never expose the Supabase service_role key. It stays in the
  Supabase dashboard only. The frontend uses the anon key only.

## Rules
- Turn on Row Level Security on every table before going live, and
  test it: a visitor must NOT be able to read `join_requests`.
- Validate on the server side too (Supabase check constraints or
  a database function): email must look like an email, track must
  be one of the 5 tracks.
- Never store passwords, payment data or ID numbers. If a field is
  not needed for joining the club, do not collect it.
- Keep a note of what the admin must do by hand in Supabase:
  create the tables, enable RLS, create the admin user.
