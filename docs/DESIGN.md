**[Leia em Português](DESIGN.pt-br.md)**

# Design — mind-landing

Visual identity of the "mind" product itself (it has no separate codename of
its own, unlike other Café Labs landings) — dark, technical, "terminal/CLI"
aesthetic, implemented 1:1 from an already-approved HTML mockup. All tokens
below come from `src/app/[locale]/globals.css` (`:root` and the
`@media (prefers-color-scheme: light)` block).

## Palette

Dark theme by default (`color-scheme: dark` on `:root`); light theme only via
the system's `prefers-color-scheme: light` — there is no manual toggle on the
site.

| Token | Dark (default) | Light | Use |
| --- | --- | --- | --- |
| `--bg` | `#0d0d0d` | `#f9f9f7` | page background |
| `--surface` | `#161615` | `#fcfcfb` | cards, terminal/tree, modal |
| `--surface-2` | `#1c1c1a` | `#f1f0ec` | terminal bar, header on hover |
| `--code-bg` | `#0a0a0a` | `#111110` | code/command blocks |
| `--fg` | `#f2f1ec` | `#0b0b0b` | main text |
| `--muted` | `#c3c2b7` | `#52514e` | secondary text |
| `--subtle` | `#8a887f` | `#898781` | tertiary text, captions |
| `--border` | `rgba(255,255,255,.1)` | `rgba(11,11,11,.1)` | borders |
| `--green` | `#3fb950` | `#1a7f37` | accent color — CTAs, prompt, graph hub |
| `--green-dim` | `#2ea043` | `#166f30` | variant of green (declared; no active use found — `TODO: confirmar` if it's still needed) |
| `--blue` | `#5b9eea` | `#1e5aa8` | declared; no active use found in current components — `TODO: confirmar` original purpose |

Translucent tints (eyebrow badge, accent borders/tags, primary button shadow,
final CTA glow) use `color-mix(in srgb, var(--green) N%, transparent)` in
plain CSS — not Tailwind's alpha syntax, which mixes in `oklab` and shifts the
color relative to the approved mockup (see `docs/ARQUITETURA.md` §5).

## Typography

Three font families via `next/font/google`, each in its own CSS variable
(`layout.tsx`):

| Role | Font | Weights loaded | Variable |
| --- | --- | --- | --- |
| Display (h1/h2/h3) | Space Grotesk | 500, 600, 700 | `--font-display` |
| Body | Inter | 400, 500, 600, 700 | `--font-body` |
| Monospace (terminal, code, prompts) | JetBrains Mono | 400, 500, 600 | `--font-mono` |

`h1`/`h2`/`h3` are always `font-weight: 700`, `letter-spacing: -0.02em`.
Section titles follow the `text-4xl` desktop / `text-[28px]` mobile
(`max-[860px]`) scale; the Hero's h1 is larger (`text-[56px]` / `text-4xl`
mobile).

## Spacing and shape

- `--radius: 14px` — default radius for cards, terminal, tree, modal, buttons.
- Inner sections use `py-22` desktop / `py-14` mobile (`max-[860px]`), with
  `border-t border-border` between consecutive sections (except the Hero).
- Central container: `max-w-[1120px]`, `px-6`.
- Interactive touch targets (graph, buttons) respect a `44px` minimum.

## Motion

- `Reveal` (generic fade-up): `opacity 0→1`, `y: 18px→0`, `0.6s ease-out`,
  triggered once on entering the viewport (`whileInView`, `once: true, amount:
  0.15`); optional `90ms` stagger per index.
- Terminal typewriter / tree / chips: see `docs/ARQUITETURA.md` §3.
- Everything respects `prefers-reduced-motion: reduce` — generic reset
  (`* { animation: none !important }`) plus the SVG graph's special case
  (`stroke-dashoffset`, see `docs/ARQUITETURA.md` §5) and the "instant, no
  transition" behavior of `Reveal`/`NodeModal`/`Toast` via
  `useReducedMotion()`.

## Logo

`MindLogo.tsx` (the "MIND" wordmark in geometric blocks) and
`src/app/icon.svg` (favicon) — designed by Felipe, not by the original
mockup. Both use `var(--fg)` and `var(--green)` (the favicon's SVG replicates
the same hex values directly, since favicons don't inherit the page's CSS
custom properties). 2nd version (2026-07-17) added a circle accent (halo +
green core) inside the curve of the "D". When updating the logo, propagate it
in the three places it lives: `MindLogo.tsx` and `icon.svg` here, and the
mind card in `cafelabs-portifolio`
(`src/components/ui/mind-logo.tsx`).
