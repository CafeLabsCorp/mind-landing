**[Leia em Português](ARQUITETURA.pt-br.md)**

# Architecture — mind-landing

Single-page static site (Next.js App Router), no backend, no content route
besides the one page — duplicated per locale by next-intl (`/pt`, `/en`) — and
no state that survives a reload. The real complexity of the project is
entirely in UI animation/timing, i18n routing, and the accessibility of its
few interactive elements (node graph, modal, copy CTAs) — not in data or infra.

## 1. Page composition

`src/app/[locale]/page.tsx` stacks the sections in a fixed order, one per
component:

```
SiteHeader → Hero → ConceptSection → FeaturesSection → ProofSection
→ HowToStart → FinalCta → Footer
```

There is no client-side routing and only one real page — but it lives under
the `[locale]` dynamic segment (`src/app/[locale]/`), so next-intl serves it
twice, at `/pt` and `/en` (see §6). `src/app/[locale]/layout.tsx` defines
fonts, resolves per-locale metadata (`generateMetadata`), and mounts
`NextIntlClientProvider` wrapping `ToastProvider` (global context) and
`<Analytics />` (`@vercel/analytics`) once, at the top. `src/app/icon.svg`
(favicon) is intentionally kept outside `[locale]` — Vercel's build breaks if
it moves back inside (commit `6342c53`).

Each section is self-contained (title + copy + whatever is specific to it);
the only piece truly reused across sections is `Reveal` (fade-up on-scroll)
and `GitHubLink` (instrumented link to the repository).

## 2. State flow — where it exists and why

The project has no application state (no server data, nothing persisted). The
state that exists is local to each interactive piece:

- **`ToastProvider` (`src/components/Toast.tsx`)** — the app's only React
  context. Exposes `useToast().showToast(message)`; renders a single message
  at a time (disappears on its own after `TOAST_DURATION` = 2200ms). Used only
  by the copy-command flow.
- **`useCloneCopy` (`src/lib/useCloneCopy.ts`)** — the hook behind the two
  "Copy setup commands" buttons (Hero and FinalCta, one hook instance each,
  parameterized by `location: "hero" | "final_cta"`). Always fires the
  analytics event on click (the attempt to copy is the conversion signal, not
  the success of `navigator.clipboard`); if the Clipboard API fails, it
  activates `showFallback` — the Hero then reveals a `<pre>` with the
  selectable text instead of failing silently. The text itself comes from
  `useSetupCommands` (`src/lib/useSetupCommands.ts`), which combines the
  fixed git/shell commands (`buildSetupCommands`, `src/lib/site.ts`) with the
  two translated `# ` comments (`SetupCommands` namespace in
  `messages/{locale}.json`), so the copied block reads naturally in whichever
  locale the page is in.
- **`InteractiveGraph` (`src/components/InteractiveGraph.tsx`)** — orchestrates
  `NodeGraph` (the graph's SVG) and `NodeModal` (example dialog). Holds
  `activeNode` and which element triggered the opening (`lastFocused`), to
  return focus to it when the modal closes — via keyboard (Escape), backdrop
  click, or close button.
- **`ProofSection` (`src/components/ProofSection.tsx`)** — the project's most
  complex timing state machine; see §3.
- **`SiteHeader`** — just a `scrolled` boolean (via a `scroll` listener) to
  toggle the `.scrolled` class (bottom border + slightly extra blur opacity).

## 3. `ProofSection`: typewriter terminal + tree reveal + chip cascade

Fires once, when the terminal enters the viewport (`useInView(..., { once:
true, amount: 0.3 })` from Framer Motion) — `started.current` ensures it does
not restart on subsequent scrolls.

Sequence, in order:

1. **Typewriter**: types `TERMINAL_LINES` (the real setup sequence for
   `mind-template`, manual fork with two remotes) character by character,
   10ms per character, 130ms pause between lines. When the last line finishes,
   it turns on the blinking cursor (`showCursor`).
2. At 1700ms after start: reveals the `TREE_LINES` (folder tree) lines in a
   cascade, 90ms between each.
3. At 2900ms after start: activates the Skill chips phase
   (`skillPhaseActive`), highlighting the final "Claude reads 1 file" chip.

All `setTimeout`/`setInterval` calls are collected in arrays and cleared in
the `useEffect` cleanup — avoids firing after unmount.

**Historical bug fixed (commit `2b68198`):** the index of the line being typed
was read *inside* the functional updater of `setLines`, but `lineIndex` was
incremented synchronously in the same `setInterval` callback. Since React only
runs the updater after the callback finishes, on the last character of each
line the updater already saw the incremented index — writing the full text at
the position of the *next* line instead of the current one, cutting off the
last character of the right line and duplicating the wrong one. Fix: capture
`currentLineIndex` before the `setLines` call, and use it inside the updater.
Relevant for anyone touching this function again: any refactor that reads a
mutable outer variable inside a React functional updater carries the same
risk.

## 4. Interactive graph (`NodeGraph` + `NodeModal`)

The graph's SVG is purely decorative (`aria-hidden`, `focusable="false"`) —
the real interaction happens on transparent HTML buttons stacked at the same
coordinates (`.node-hit-layer` / `.node-hit`, `44×44px`, the recommended
minimum touch target size). This gives native button semantics (focus order,
Enter/Space activation, screen-reader name) for free, without duplicating
accessibility logic on top of SVG elements. **Do not merge the two layers** —
this is intentional, it replicates the mockup 1:1.

`NodeModal` implements a manual focus trap (Tab/Shift+Tab kept between the
first and last focusable element of the dialog) and closes on Escape or
backdrop click; it respects `prefers-reduced-motion` via
`useReducedMotion()` from Framer Motion, turning off entry/exit animations
instead of merely speeding them up.

Graph data (`src/lib/graph-data.ts`) uses generic node names (Mind, Projects,
Tasks, Studies, Personal, Knowledge, Hobby, Company) — a product decision:
never expose real content or names from Felipe's personal vault on the public
landing.

## 5. Non-obvious technical decisions

- **`color-mix()` in plain CSS, not Tailwind's alpha syntax**
  (`globals.css`, comment at the top of the file): Tailwind's alpha modifier
  mixes in `oklab`, which slightly shifts colors relative to the
  `color-mix(in srgb, ...)` that the approved mockup uses as source of truth.
  That's why some tints (eyebrow badge, primary button shadow, accent
  borders/tags, final CTA glow) remain plain CSS instead of becoming Tailwind
  utilities — it's not dead or forgotten code, it's intentional.
- **`prefers-reduced-motion` and the SVG graph**: the generic reset
  (`* { animation: none !important }`) by itself left the graph's edges and
  nodes invisible, because zeroing only `opacity` doesn't reset the edges'
  `stroke-dashoffset` — it stays stuck at the initial (undrawn) value of the
  disabled `draw` animation. The `prefers-reduced-motion` rule in
  `globals.css` resets both properties together because of this (inline
  comment documents why).
- **`HEADER_HEIGHT_PX = 77` in `Hero.tsx`**: a measured value (not computed
  via CSS/JS) of the `SiteHeader`'s rendered height, used only so the Hero
  fills exactly `100dvh` minus the header. If the header's padding/height
  changes, this number needs to be re-measured manually — there is no
  automatic sync mechanism.
- **Terminal-style scroll indicator, not a generic arrow** (commit
  `c49858e`): the first version was a bouncing arrow, nearly identical to the
  indicator on the sibling landing `dindin-landing` built in the same cycle;
  it was redone reusing the "CLI" visual language the site already uses in
  `ProofSection` — a green `$` prompt + blinking cursor (the same `.cursor`
  class as the terminal), instead of inventing a new animation. It's part of
  Café Labs' structural landing pattern (100dvh hero + scroll indicator +
  quick access to the product) — see the knowledge node
  `cafelabs/padroes-landing.md` in Felipe's `mind` vault.
- **The graph never becomes `display: none` on mobile**: on screens
  `<=860px` it is moved to after the CTAs (not hidden) — a reduced set of
  nodes (`.leaf-extra` hidden), but it stays clickable with `>=44px` targets.
- **Content is sourced from the approved mockup, not from the code**: any
  change to copy, palette, or animation timing should first be reconciled
  with the original HTML mockup (not versioned in this repo — `TODO:
  confirmar` where it lives today) before freely changing the component.
- **Known bug — three hardcoded references still point to the wrong GitHub
  org**: `https://github.com/CafeLabsDev/mind-template` appears in
  `src/lib/site.ts` (`GITHUB_REPO_URL`, plus the git-clone line inside
  `buildSetupCommands`) and again, independently, in
  `src/components/ProofSection.tsx` (`buildSetupLines`, the fake terminal
  typed in §3). The real repositories now live under `CafeLabsCorp`
  (`git remote -v` on this repo resolves to `CafeLabsCorp/mind-landing`; see
  `mind/projetos/repos.md`). Net effect on the live site: the
  header/hero/footer GitHub links (`GitHubLink`), the git-clone line copied by
  both "Copy setup commands" buttons, and the git-clone line typed out in the
  `ProofSection` terminal demo all point at a stale org. This needs a code fix
  in both files (and a re-check that `README_SETUP_URL`'s anchor still
  matches after the swap), not a docs one — flagged here so whoever picks it
  up doesn't have to rediscover it.

## 6. Internationalization (next-intl)

Two locales, `pt` (default) and `en`, both always prefixed in the URL
(`/pt`, `/en` — next-intl's default `localePrefix: "always"`, not overridden
in `src/i18n/routing.ts`). Visiting `/` triggers `src/proxy.ts`
(the next-intl middleware) to redirect to the best-matching locale — cookie
first, then `Accept-Language`, falling back to `pt`.

- **`src/i18n/routing.ts`** — declares `locales: ["pt", "en"]` and
  `defaultLocale: "pt"`. Single source of truth for every other i18n piece.
- **`src/i18n/request.ts`** — resolves the active locale per request and
  loads the matching `messages/{locale}.json` (used server-side, e.g. in
  `generateMetadata`).
- **`src/i18n/navigation.ts`** — re-exports `Link`, `useRouter`,
  `usePathname`, `getPathname` wrapped by `createNavigation(routing)`, so
  in-app navigation stays locale-aware without manually prefixing paths.
  Used by `LanguageSwitcher` (`src/components/ui/language-switcher.tsx`,
  rendered in `SiteHeader`) to swap `pt` ⇄ `en` while keeping the current
  path.
- **`messages/en.json` / `messages/pt.json`** — one namespace per section
  (`Hero`, `ConceptSection`, `ProofSection`, `CloneCopy`, `SetupCommands`,
  `LanguageSwitcher`, etc.), kept in sync (same key set in both files as of
  this audit).
- **`src/app/[locale]/layout.tsx`** — validates the incoming `locale` param
  against `routing.locales` (`notFound()` otherwise) and wraps the tree in
  `NextIntlClientProvider` so client components can call `useTranslations`.

This is unrelated to the EN/PT split of `README.md`/`docs/*.md` in this
repository — that's documentation for humans/tools reading the repo;
next-intl is the live site's own UI language switch, for end users.

## 7. Instrumentation

Two conversion events (`@vercel/analytics`, via `src/lib/analytics.ts`):
`copy_clone_command` (click on the setup copy buttons) and `click_github`
(click on any link to the repository). Both carry `location` to distinguish
Hero, header, final section, and footer from one another. Reference targets
(not enforced in code, just as product context): GitHub click above 3% of
pageviews; copy rate at least half the click rate.
