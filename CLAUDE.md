# CLAUDE.md

Guidance for AI coding assistants working in this repository.

## Project Overview.
- Stack: React 18 + Vite + TypeScript + Tailwind CSS + Framer Motion
- Routing: `react-router-dom`
- Public assets: `public/images`
- Key pages: `src/pages/HomePage.tsx`, `src/pages/WorkPage.tsx`, `src/pages/AboutPage.tsx`, `src/pages/ProjectsPage.tsx`, `src/pages/VisionPage.tsx`, `src/pages/ContactPage.tsx`
- Key components: `HeroSection`, `PhotoFrame`, `ParticleField`, `MorphingLayout`, `CareerTimeline`

## Dev Setup

```bash
npm install
npm run dev     # start Vite dev server
npm run build   # production build to dist/
npm run preview # preview built site
```

## Recent Functional Changes (from chat)

- Career timeline logos wired to actual images in `public/images`.
- Floating skill badges added around the home-page photo; larger, smooth orbits, never cross the photo.
- Horizontal scrollbar removed across the site.

## Career Timeline Logos

- Mapping file: `src/components/CareerTimeline.tsx` — constant `ORGANIZATION_LOGOS`.
- Current mappings (paths are under `/images`, resolved from `public/images`):
  - Caucasus University → `CU-SiteLogo.png`
  - Free University, Tbilisi → `Free_logo_ENG.png`
  - Ilia State University → `ilia.png`
  - Agency of Agricultural Projects Management → `RDA-Logo.png`
  - JSC SavvY → `savvy.png`
  - Girchi (Parliament of Georgia) → `girchi.jpg`
  - EPAM Systems → `epam-1.png`
  - 9 Tones Distribution → `9t.png`
  - Bitcamp → `bitcamp.png`
- Notes:
  - Keys must match the `org` strings in `TIMELINE` to render a logo.
  - The component hides a logo automatically if the file is missing (onError handler).

## Floating Skills Around Photo (Home)

- Files:
  - `src/components/PhotoFrame.tsx` — renders the profile photo and includes `FloatingSkills`.
  - `src/components/FloatingSkills.tsx` — renders animated skill badges.
- Behavior:
  - Badges orbit smoothly around the photo center on circular paths and gently “bob”。
  - Badges never cross into the photo area (orbit radius keeps them outside).
  - Always visible; no fade-out. Pointer-events are disabled.
  - Sizes are ~20% larger for readability.
- Skills configured:
  - MS Excel, Java, SQL, SP Boot, OAuth, GCP, Finance, OM, Docker, Kubernetes, Blockchain.
- Tuning:
  - Radius/distance: in `FloatingSkills.tsx` via the `orbits` computation (currently base radius increased by ~44% from 170–210px → ~245–302px effective, then a further +20% as requested; adjust there if needed).
  - Speed: `duration` in `orbits` controls one full rotation (currently ~28–42s for slower motion).
  - Add/remove skills: edit the `skills` array and optionally add an inline SVG in `Icon`.
  - To use brand assets instead of inline SVGs, swap the `Icon` output with an `<img src="/images/..." />` per key.

## Horizontal Scrollbar Removal

- File: `src/styles/index.css`
- Applied `overflow-x: hidden` on `html` and `body` to prevent wide absolute/animated layers from forcing horizontal scroll.

## Particle Field (Background)

- File: `src/components/ParticleField.tsx`
- Abstract, interconnected blue dots following the cursor. Independent from floating skill badges.

## Deployment Notes (GCP VM + Docker)

If remote deploys over SSH time out while pulling the container image:

- Increase SSH step timeout to 900–1200s.
- Set Docker/Compose timeouts before pulls:
  - `export DOCKER_CLIENT_TIMEOUT=900`
  - `export COMPOSE_HTTP_TIMEOUT=900`
- Pre-pull explicitly to show progress and fail fast: `docker pull "$IMAGE_PATH:$COMMIT_SHA"`.
- Confirm Artifact Registry read access and tag presence:
  - `gcloud artifacts docker images list $IMAGE_PATH --include-tags | grep $COMMIT_SHA`

## General Guidance

- Structure code by feature with small, focused components.
- Keep assets in `public/images` and reference via `/images/...`.
- Use Framer Motion for animations already present; match style and easing.
- Tailwind is configured; prefer utility classes over custom CSS where practical.

## Future Scope

SavvY Projects upload/viewer (described below) is not implemented in the current codebase and should be treated as planned work/specification if needed later.

### SavvY Projects Component Requirements (Planned)

- Admin-only uploads (localStorage guard), supports PPT/PDF up to 50MB.
- Cover extraction (first page) for grid preview; simulated professional layout if needed.
- Uploaded projects appear in the grid with badges; full multi-page viewer in a modal.
- Robust error logging around open/view logic.
- Security: restrict upload surface, validate types/sizes.

## Testing Checklist

- Cross-browser and responsive layout checks.
- Lighthouse performance and accessibility.
- Verify timeline logos load (or hide gracefully if missing).
- Home hero animations render smoothly; no horizontal scroll.

