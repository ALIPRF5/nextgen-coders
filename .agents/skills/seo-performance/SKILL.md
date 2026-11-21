---
name: seo-performance
description: SEO and performance for the NEXTGEN site — meta tags, Open Graph, speed, images.
---

Model: deepseek-chat (V3) — meta tags and performance fixes are routine.

# seo-performance

Use this skill before launch, and re-check after any big change.

## SEO basics
- Every page: a unique `<title>` (under 60 characters) and a
  `meta description` (under 160 characters), in French.
- Open Graph tags on every page: title, description, image
  (1200x630, the club logo on black/orange), so links look right
  on Instagram and WhatsApp.
- One `<h1>` per page. Semantic tags: header, main, footer.
- `sitemap.xml` and `robots.txt` at the root.

## Performance (target: loads in under 3s on a phone)
- Images: WebP, under 200 KB each, `loading="lazy"` below the fold.
- No font files heavier than needed; system fonts preferred.
- Build output: `npm run build` must pass, and the total JavaScript
  for the home page should stay small — no library added for one
  small feature.
- Check with Lighthouse (in Chrome DevTools) and fix the red items
  first; a score is not the goal, a fast page on a real phone is.
