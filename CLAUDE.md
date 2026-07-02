# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server (Next.js)
npm run build    # Production build
npm run lint     # Run ESLint
```

No test suite is configured.

## Architecture Overview

This is a **Next.js 16 / React 19** portfolio for Thierno BAH (cybersecurity engineer). It uses the App Router with TypeScript, Tailwind CSS v4, and no backend — all content is static data.

### Content data (`src/data/`)
All portfolio content lives here as static TypeScript arrays:
- `projects.ts` — `Project[]` with `featured` flag and `slug` for routing
- `experience.ts` — `Experience[]` with work history
- `skills.ts` — `Skill[]` with proficiency levels (0–100)

To add/update content, edit these data files. Types are defined in `src/types/index.ts`.

### Pages (`src/app/`)
- `/` — Single-page layout composing all section components
- `/projects` — Project listing with category filter
- `/projects/[slug]` — Dynamic route, slug comes from `src/data/projects.ts`
- `/about`, `/experience`, `/contact` — Standalone pages

### Component layers
- **`src/components/layout/`** — Global shell: `Header`, `Footer`, `Providers` (ThemeProvider), `CustomCursor`, `Preloader`
- **`src/components/sections/`** — Page section components (`Hero`, `About`, `Skills`, `Projects`, `Experience`, `Contact`)
- **`src/components/animations/`** — Framer Motion wrappers: `FadeIn`, `ScaleIn`, `StaggerChildren/StaggerItem`, `HoverCard3D`, `Counter`, `Reveal`, etc.
- **`src/components/3d/`** — Three.js/React Three Fiber scene (`FloatingShapes`) used in the Hero section
- **`src/components/ui/`** — Primitive UI components (`Button`, `Card`, `GlassCard`, `Badge`, `Input`, etc.) built on Radix UI + CVA

### Animation system
Framer Motion variants are centralized in `src/components/animations/motion-wrapper.tsx`. Use `FadeIn`, `StaggerChildren + StaggerItem`, or `ScaleIn` for scroll-triggered animations. All use `viewport={{ once: true }}`.

### Styling
- Tailwind CSS v4 with PostCSS (`postcss.config.mjs`)
- Theme: dark by default (`next-themes`, `defaultTheme="dark"`)
- CSS variables for fonts: `--font-geist-sans`, `--font-geist-mono`
- Utility: `cn()` in `src/lib/utils.ts` (clsx + tailwind-merge)

### Path aliases
`@/` maps to `src/` (configured in `tsconfig.json`).
