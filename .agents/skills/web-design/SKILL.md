---
name: web-design
description: Design system for the NEXTGEN CODERS site — black and orange identity, mobile-first Tailwind, accessible.
---

Model: deepseek-chat (V3) — fast, great for layout and Tailwind. Switch to deepseek-reasoner (R1) only if a design or accessibility trade-off needs careful thinking.

# web-design

Use this skill whenever you create or restyle a page or component.

## Design tokens
- Background: #0A0A0A (near-black). Surface: #161616. Text: #FFFFFF.
- Accent: #FEA901 (club orange). Use it for buttons, highlights and
  key numbers only — never as a page background.
- Font: system stack (Inter if installed, else system-ui, sans-serif).
  Titles bold, tight line-height; body 16px minimum, line-height 1.6.
- Radius: 12px cards, 8px buttons. One shadow style, subtle.

## Layout rules
- Mobile-first: design at 390px wide first, then add the desktop
  layout (max width 1100px, centred). Every page must work with no
  horizontal scroll on a phone.
- One clear action per screen (usually "Join the club").
- Real photos / the club logo where they exist; never hotlink images
  from other sites. Optimise every image (WebP, under 200 KB).

## Accessibility (do not skip)
- Contrast: orange #FEA901 on black is fine for large text and
  buttons; for small body text use white.
- Every image has alt text. Every form field has a label.
- Keyboard: buttons and links must be reachable and visible on focus.

## What not to do
- No purple/blue gradients, no glassmorphism, no stock-photo hero
  that says nothing about the club. No more than 2 font families.
