---
name: testing
description: Playwright testing for the NEXTGEN site — open every page in a real browser, click everything, screenshot bugs.
---

Model: deepseek-chat (V3) for running tests and fixing failures. Switch to deepseek-reasoner (R1) if a bug is hard to find.

# testing

Use this skill after building each page, before starting the next one.

## Setup
Playwright with Chromium. `npx playwright test` runs the suite.
Two viewports: mobile 390x844 and desktop 1280x800.

## What to test, every page
1. The page loads (no blank page, no console errors).
2. Navbar links go to the right pages; footer Instagram link works.
3. The page has no horizontal scroll on mobile.
4. Images all load (no broken-image icons).
5. Join form: empty submit shows errors; a valid submit shows the
   success message; the row appears in Supabase.
6. Take a screenshot of each page at both sizes and look at it —
   a screenshot you never look at is not a test.

## When a test fails
Fix the code, re-run that test, and say in one line what the bug was
and what changed. Do not mark a page "done" while its tests fail.
Do not change the test to make a real bug pass.
