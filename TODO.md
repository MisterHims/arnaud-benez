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
- [x] Legal notice page (`/mentions-legales`, `/en/legal-notice`), published as a private
      individual (no address shown, LCEN art. 6-III-2).
  - [ ] **Hosting provider**: fill `HOSTING` in `src/data/site.ts` once chosen (name,
        address, phone); the page shows "to be completed" until then.
  - [ ] Personal data section: once the contact form's sending service is chosen, name it
        there (the data goes through it).
- [ ] Contact form: no backend yet (the form doesn't send anything).

## Decisions pending

- [x] Language detection: every URL now carries its language (`/fr/…`, `/en/…`), so a shared
      link always opens in its own language; only the bare domain (`/`) picks one (cookie,
      then browser language, French otherwise).
- [ ] Cursor: give it a skill star on the arrival screen, or group Cursor and Claude Code
      in an "AI" card in the skills grid?

## Before going live

- [ ] **Client logos weight** (Lighthouse, 2026-11-08): the logos are inline SVG (`Logo.tsx`,
      ~190 KB, also in the JS bundle) and the Trusted By band renders each one 4 times:
      ~600 KB of SVG in the home page HTML. Serve them as static files (cached once) or a
      sprite, and simplify the heaviest (one is 48 KB).

- [x] Production build check (2026-11-08, in a separate copy): passes, the section pages
      are statically generated (SSG).
- [ ] Hugeicons Pro token as an environment variable on the hosting platform
      (registry configured in `.npmrc`).
- [x] Mobile pass (390 / 360 px phones, 768 / 1024 px tablets): no sideways scroll, stacked
      Who I Am and Contact, readable section titles, contact card sized by its content,
      skills grid fitting, `svh` units for the hero and sections.
  - [ ] Test on a real phone (the browser bar, the hero landing by touch, the glide).
  - [x] Skills names on touch: tapping a logo shows its name in place of the category title.
- [x] Mobile: the skills now come as a swipeable strip under the Experience title.
