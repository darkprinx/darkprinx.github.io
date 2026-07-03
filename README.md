# Abdullah Al Masud Tushar — Portfolio

**Concept: Order out of chaos.** The hero is a full-screen installation where
~700 emerald fragments drift as a tangled swarm, then magnetically assemble
into words — TUSHAR / BUILDS / SCALES / SHIPS — hold, dissolve back into
chaos, and reform. The cursor bends the field; clicking detonates a shockwave
the system heals from. The same fragment language runs through the whole
site: a mosaic portrait that assembles on scroll, a career timeline that
draws itself, tilt-reactive capability cards, magnetic buttons, and a custom
cursor. No stack logos, no code clichés — just the engineering persona:
chaos goes in, systems come out.

**Stack:** Vite · React 19 · TypeScript · GSAP (ScrollTrigger). The hero
swarm and mosaic portrait are hand-rolled canvas 2D.

**Identity:** colors and English typography follow luminaryacademybd.com —
cream `#F1EFE8`, ink `#2C2C2A`, emerald `#00AE8D`, deep greens
`#008A71 / #006655 / #0A4F3A`, tints `#A8DDD4 / #E6F7F4`, line `#CFCECA`.
Type: Poppins (display/UI) + Lato (body), via Google Fonts.

## Setup & run

```bash
npm install
npm run dev        # local dev server (http://localhost:5173)
```

## Build & preview

```bash
npm run build      # type-checks, then outputs static site to dist/
npm run preview    # serve the production build locally
```

## Add your photo

Drop a portrait at **`public/portrait.jpg`** (roughly 4:5, ≥800px wide).
The About section's mosaic animation picks it up automatically — tiles fly
in, assemble, and get the emerald duotone treatment. Until then an on-brand
placeholder renders from `public/portrait-placeholder.svg`.

## Deployment

`dist/` is a fully static site — deploy anywhere:

- **Netlify / Vercel:** build command `npm run build`, output directory `dist`.
- **GitHub Pages:** set `base: '/<repo-name>/'` in `vite.config.ts` first.
- Any static host or S3 + CloudFront works the same way.

## Editing content

All copy, links, and career data live in **`src/data/profile.ts`**:

- `identity` — name, role, email, phone, links, headline, positioning
- `formationWords` — the words the hero swarm spells out
- `stats` — the hero ticker facts
- `about` — facets, philosophy quote, spec-card rows
- `portrait` — image path and alt text
- `clusters` / `practiceBus` — the capability system
- `timeline` — companies, roles, periods, engagement bullets
- `systems` — case studies (context / built / impact / stack, optional link)
- `principles` — the "How I Build" stages
- `contact` — closing copy and CTA label

Other easy swaps: `public/favicon.svg`, `public/og.svg` (replace with a
1200×630 PNG for widest social-card support), and the title/meta in
`index.html`.

## Accessibility & motion

- `prefers-reduced-motion` renders a complete static hero (the swarm already
  settled into TUSHAR), a static ticker, an assembled portrait, and no
  reveals — content first, always.
- Semantic landmarks, skip link, visible focus states, ARIA labels on the
  canvas scenes; the custom cursor is an overlay, never a replacement, and
  disabled on touch devices.
- Canvases pause when offscreen or the tab is hidden and clamp
  device-pixel-ratio on low-power devices.
