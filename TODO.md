# Notes & to-do

Things set aside while building the v2 of the portfolio (`feat/portfolio-v2`).

## SEO and sharing

- [ ] **LinkedIn URL**: add it to `PROFILES` in `src/data/site.ts` (schema.org `sameAs`).
- [ ] **Social links**: the contact card icons (X, LinkedIn, GitHub, Slack) still point to `#`.
- [ ] **Share image** (Open Graph, 1200 × 630 px): provide one, or compose a simple one
      (logo + name over the starry sky), then add it to the metadata.
- [ ] **Review the new copy** in `messages/fr.json` and `messages/en.json`:
      What I Do intro, `Services.*.details` / `moreTags`, the page meta description
      (`Metadata.description`) and each section's `metaDescription`.
- [ ] **Works case studies**: one page per project (context, role, result). The biggest
      SEO lever for a portfolio, and what convinces recruiters most.
- [ ] After deploying: check the structured data with Google's Rich Results Test.

## Content

- [ ] Zigoh experience: its description duplicates Delaveine's (`Experience.items.zigoh`).
- [ ] Experience highlights: add concrete results where possible (figures, scope, impact),
      e.g. for E.Leclerc / Voyages E.Leclerc (`Experience.items.*.highlights`).
- [ ] Experience stack tags: check the tools listed per position (`stack` in `src/data/experience.ts`).
- [ ] Resume and portfolio PDFs to link from the Who I Am buttons.
- [ ] `/legal` page (linked from the footer, not created yet).
- [ ] Contact form: no backend yet (the form doesn't send anything).

## Decisions pending

- [ ] Language detection: a visitor whose browser remembered English is redirected from a
      French link (`/qui-suis-je` → `/en/who-i-am`). next-intl default; can be turned off so
      shared links always win.
- [ ] Cursor: give it a skill star on the arrival screen, or group Cursor and Claude Code
      in an "AI" card in the skills grid?
- [ ] Header navigation (component exists but is disabled in the layout).

## Before going live

- [ ] Production build check (`pnpm build`, with the dev server stopped, then `rm -rf .next`
      before restarting dev): confirm the section pages are statically generated.
- [ ] Hugeicons Pro token as an environment variable on the hosting platform
      (registry configured in `.npmrc`).
- [ ] Mobile pass (glide between sections on mobile, `svh` units, real-device testing of
      the hero landing).
