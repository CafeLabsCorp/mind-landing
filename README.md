[Leia em Português](README.pt-br.md)

# mind-landing

Single landing page for [mind-template](https://github.com/CafeLabsCorp/mind-template),
the generic/open-source mirror of Felipe's personal knowledge vault (Markdown + git,
integrated with Claude Code). Static site (Next.js), no backend or user data — it just
promotes the project, explains the concept, and points to the GitHub repository. Target
audience: devs who already use Claude Code and are comfortable with Markdown + git, not
the general note-taking-app crowd.

Implemented 1:1 from an already-approved HTML mockup — palette, typography, interactive
graph, animations, and accessibility specified there are the visual and content source
of truth (see [docs/DESIGN.md](docs/DESIGN.md) and [docs/ARQUITETURA.md](docs/ARQUITETURA.md)).

## Stack

| Layer | Technology |
| --- | --- |
| Framework | Next.js 16 (App Router), React 19 |
| Styling | Tailwind CSS v4 (tokens via `@theme inline`) + occasional plain CSS (see [docs/ARQUITETURA.md](docs/ARQUITETURA.md)) |
| Animation | Framer Motion (`whileInView`, `AnimatePresence`) |
| Fonts | Space Grotesk (display), Inter (body), JetBrains Mono (mono) via `next/font/google` |
| Analytics | `@vercel/analytics` (custom events) |
| Deploy | Vercel — see [docs/DEPLOY.md](docs/DEPLOY.md) |

Same stack pattern as the institutional site (`cafelabs-portifolio`) and the sibling
landing (`dindin-landing`).

## Prerequisites

- Node.js — `TODO: confirm` minimum required version (no `engines` field in
  `package.json`; the current development environment uses Node 20).
- npm (uses `package-lock.json`, not pnpm/yarn).

## Running locally

```bash
npm install
npm run dev     # http://localhost:3000
npm run lint    # eslint
npm run build   # production build
npm run start   # serve the production build
```

## Folder structure

```
src/
├── app/                # App Router: layout, single page, globals.css, favicon
├── components/         # One component per landing section + reusable pieces
│   ├── Hero.tsx, ConceptSection.tsx, FeaturesSection.tsx, ProofSection.tsx,
│   │   HowToStart.tsx, FinalCta.tsx, Footer.tsx, SiteHeader.tsx  — page sections
│   ├── InteractiveGraph.tsx, NodeGraph.tsx, NodeModal.tsx        — hero node graph
│   └── GitHubLink.tsx, Reveal.tsx, Toast.tsx, MindLogo.tsx, icons.tsx — shared pieces
└── lib/                # site.ts (constants/copy), graph-data.ts (graph nodes),
                         # analytics.ts, useCloneCopy.ts (copy CTA hook)
```

The single page (`src/app/page.tsx`) composes the sections in order: Header → Hero →
Concept → Features → Proof (terminal) → How to start → Final CTA → Footer. Details of
each piece in [docs/ARQUITETURA.md](docs/ARQUITETURA.md).

## Analytics

`@vercel/analytics` instrumented with two custom events (see
[src/lib/analytics.ts](src/lib/analytics.ts)):

- `copy_clone_command` — click on the "Copy setup commands" button (primary CTA; event
  name kept from the old copy, the copied content is now the full setup block — manual
  fork, two remotes).
- `click_github` — click on any link to GitHub, with a `location` prop
  (`header` | `hero` | `final_cta` | `footer`) to tell the origin apart.

Both carry the `location` prop to compare CTA positions against each other.

## Deploy

Vercel, domain `mind.cafelabs.net`, repository `CafeLabsCorp/mind-landing` (public).
Details in [docs/DEPLOY.md](docs/DEPLOY.md).

## Docs

- [docs/ARQUITETURA.md](docs/ARQUITETURA.md) — how the page is assembled, state flow,
  technical and non-obvious decisions.
- [docs/DESIGN.md](docs/DESIGN.md) — palette, typography, and visual identity tokens.
- [docs/DEPLOY.md](docs/DEPLOY.md) — deploy pipeline and domain.
