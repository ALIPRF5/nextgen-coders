---
name: deploy
description: Deploy the NEXTGEN site on Vercel free tier (or Cloud Run) — build, env vars, custom domain later.
---

Model: deepseek-chat (V3) — deployment steps are routine.

# deploy

Use this skill only when the site builds cleanly and its tests pass.

## Vercel (recommended, free)
1. Push the code to a GitHub repo (private is fine).
2. In Vercel: import the repo, framework preset Vite.
3. Env vars in the Vercel dashboard (never in the code):
   `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`.
4. Deploy. Open the live URL on a phone and on a computer and
   submit the join form once for real.

## Alternative: Google Cloud Run (free tier, up to 2 apps)
Use AI Studio Build mode's deploy, or build the Docker image and
deploy it to Cloud Run. Same env vars. Good if the site later
needs a small Node backend — the frontend stays the same.

## Rules
- Never commit `.env` or any key to Git. Check `.gitignore`
  contains `.env` before the first push.
- A failed build is fixed in the code, never by changing the
  build settings to skip the failing step.
- Custom domain (e.g. nextgencoders.ma) comes later — ship on the
  free `vercel.app` URL first and change it when the domain exists.
