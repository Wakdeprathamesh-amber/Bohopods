# Boho Pods

Premium showcase website for **Boho Pods** — plug-n-play prefab luxury cabins & glamping pods.
A pure UI/UX marketing site (no backend, no database, no e-commerce): every CTA routes to
WhatsApp for enquiries and site visits.

Built around the flagship **Gatsby** pod, with product pages for the full range, an interactive
native flip-book brochure, ROI/process/location infographics, and a cinematic hero.

## Tech stack

- **Next.js 16** (App Router, Turbopack, SSG) + **React 19**
- **Tailwind CSS v4** (design tokens in `app/globals.css`)
- **Motion** (`motion/react`) for animation
- **react-pageflip** for the brochure viewer
- Fully static-generated; SEO via JSON-LD, `sitemap.ts`, `robots.ts`

## Local development

```bash
npm install
npm run dev        # http://localhost:3000
```

## Production build

```bash
npm run build
npm start          # serves the built app (honours $PORT)
```

## Project structure

| Path | What's inside |
|------|---------------|
| `app/` | Routes — home, `/pods`, `/pods/[slug]`, `/brochure`, SEO files |
| `components/` | UI + `components/sections/*` (homepage sections) |
| `lib/` | `site.ts` (config, WhatsApp helpers), `pods.ts` (pod data) |
| `public/` | Deployed assets — pod renders, brochure pages, icons |
| `docs/` | Brand, product, UX & hero-film documentation |

> **Note:** `media/` (working source originals — raw renders, PDFs, the hero-film
> source frames) is **git-ignored** because it exceeds GitHub's file-size limits.
> The site references only `public/`. Keep `media/` backed up separately.

## Deploy

A [`render.yaml`](./render.yaml) blueprint is included for one-click deploys on
[Render](https://render.com). See the deploy steps in the project handover notes, or
Render's [Next.js guide](https://render.com/docs/deploy-nextjs-app).
