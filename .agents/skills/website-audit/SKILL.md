---
name: website-audit
description: Audit any website and judge whether it is good or not — design, UX, performance, accessibility, SEO, mobile, content, and technical health — then deliver a clear verdict with a score and a prioritised fix list.
---

# Website Audit

Model: deepseek-chat for a fast audit; deepseek-reasoner (R1) for a deep audit or when the result is contested.

## What this skill does

Given a website URL, audit it and answer one question: **is this website good or not?**

The audit is evidence-based, not vibes. Every claim must come from something you actually checked (fetched HTML, a Lighthouse run, a screenshot, a link check). Never invent a score or a problem you did not observe.

## How to run the audit

### 1. Get the site

- Fetch the homepage and 2–3 key pages (e.g. About, Contact, a main product/service page) with `curl -L` or a headless browser.
- Take a screenshot at desktop (1440×900) and mobile (390×844) if a browser is available. If you cannot screenshot, say so and judge layout from the HTML/CSS only.
- Note the URL, the date, and whether the site loaded at all. A site that does not load, redirects to a dead page, or shows an error fails the audit outright.

### 2. Check performance and technical health

Run Lighthouse (or `npx lighthouse <url> --only-categories=performance,accessibility,best-practices,seo --output=json`) when available. If Lighthouse is not installed, use `curl` timings and manual checks and say Lighthouse was skipped.

Record, per page:
- Load time and largest contentful paint (LCP). Good: LCP under 2.5s. Bad: over 4s.
- HTTPS present and valid. No HTTPS = fail.
- Broken links and missing images (check the main navigation and footer links; follow at least the top 5).
- Console errors (if a browser is available). Any blocking JS error is a fail.
- Mobile viewport meta tag present. Missing = not mobile-ready.

### 3. Check design and UX

From the screenshots and the CSS:
- **Layout:** is there a clear visual hierarchy (one main headline, one primary action per view)? Is spacing consistent? Does anything overlap, clip, or overflow horizontally on mobile?
- **Typography:** is body text readable (16px or larger, enough line height, enough contrast)? Are there more than 3 font families (a smell)?
- **Colour and contrast:** does text pass contrast against its background (aim for 4.5:1 for body text)? Are colours consistent with one palette?
- **Navigation:** can a first-time visitor find the main pages in under 5 seconds? Is the menu visible on mobile?
- **Call to action:** is there one clear next step (contact, buy, sign up, book)? Is it visible without scrolling on the homepage?

### 4. Check content

- Does the homepage say, in one sentence, what the business does and who it is for? If you cannot tell in 5 seconds, that is a fail.
- Is the content free of placeholder text (Lorem ipsum), typos, and dead dates (e.g. "Copyright 2021")?
- Are contact details (phone, email, address, or a working form) easy to find?
- Is there any trust signal (reviews, clients, certifications, real photos vs stock only)?

### 5. Check accessibility

- Every image has an `alt` attribute (decorative images may use empty alt).
- Headings follow a logical order (one `h1` per page, then `h2`, `h3` — no skipped levels).
- Links have descriptive text (not "click here").
- Forms have labels.
- Colour is not the only way information is conveyed.

### 6. Check SEO basics

- Each page has a unique `<title>` (under 60 characters) and a `meta description` (under 160 characters).
- One `h1` per page, matching the page topic.
- Images have descriptive filenames or alt text.
- The site has a `robots.txt` and a sitemap (check `/robots.txt` and `/sitemap.xml`).

## Scoring

Score each area out of 10, then average:

| Area | Weight |
| --- | --- |
| Performance & technical | 20% |
| Design & visual quality | 20% |
| UX & navigation | 20% |
| Content clarity | 15% |
| Accessibility | 10% |
| SEO basics | 10% |
| Mobile responsiveness | 5% |

**Verdict:**
- **8.0–10 — Good.** Ship it. List only polish items.
- **6.0–7.9 — Okay, needs work.** Usable but has real problems. Fix the top 3.
- **4.0–5.9 — Weak.** Visitors will leave or not trust it. Needs a rebuild of the worst areas.
- **Below 4.0 — Bad.** Do not send traffic to it until the critical fixes are done.

## Output — the audit report

Write the report as a Markdown file named `website-audit-<domain>-<YYYY-MM-DD>.md` in the project folder, and print a short summary in chat. The report must contain:

1. **Verdict line:** "Good / Okay / Weak / Bad — X.X/10" plus one sentence explaining why.
2. **Score table:** each area, its score, and one line of evidence.
3. **Top 3 problems:** the three issues that hurt the site most, each with where it was found and how to fix it.
4. **Quick wins:** up to 5 fixes that take under an hour each.
5. **Full findings:** everything else found, grouped by area, with the evidence (URL, screenshot, Lighthouse score, or HTML snippet).
6. **What is good:** at least two things the site does well. Do not write a report that is only negative.

## Rules

- Never fake a Lighthouse score, a load time, or a screenshot. If a check could not run, write "not checked" and say why.
- Do not judge a site by its industry or by whether you personally like the style. Judge it by the checklist.
- If the site is a single-page demo, a staging link, or under construction, say so up front and score only what exists.
- Keep the report in the user's language when they asked in that language; otherwise write it in English.
- When the user asks "is it good or not" with no URL, ask for the URL first. Do not audit a site you have not been given.
