**[Read in English](DESIGN.md)**

# Design — mind-landing

Identidade visual do produto "mind" em si (não tem codinome próprio separado, ao
contrário de outras landings da Café Labs) — estética escura, técnica, "terminal/CLI",
implementada 1:1 a partir de um mockup HTML já aprovado. Todos os tokens abaixo vêm de
`src/app/[locale]/globals.css` (`:root` e o bloco `@media (prefers-color-scheme: light)`).

## Paleta

Tema escuro por padrão (`color-scheme: dark` em `:root`); tema claro só via
`prefers-color-scheme: light` do sistema — não há toggle manual no site.

| Token | Escuro (padrão) | Claro | Uso |
| --- | --- | --- | --- |
| `--bg` | `#0d0d0d` | `#f9f9f7` | fundo da página |
| `--surface` | `#161615` | `#fcfcfb` | cards, terminal/tree, modal |
| `--surface-2` | `#1c1c1a` | `#f1f0ec` | barra do terminal, header no hover |
| `--code-bg` | `#0a0a0a` | `#111110` | blocos de código/comando |
| `--fg` | `#f2f1ec` | `#0b0b0b` | texto principal |
| `--muted` | `#c3c2b7` | `#52514e` | texto secundário |
| `--subtle` | `#8a887f` | `#898781` | texto terciário, legendas |
| `--border` | `rgba(255,255,255,.1)` | `rgba(11,11,11,.1)` | bordas |
| `--green` | `#3fb950` | `#1a7f37` | cor de destaque (accent) — CTAs, prompt, hub do grafo |
| `--green-dim` | `#2ea043` | `#166f30` | variante do verde (declarada; sem uso ativo encontrado — `TODO: confirmar` se ainda é necessária) |
| `--blue` | `#5b9eea` | `#1e5aa8` | declarada; sem uso ativo encontrado nos componentes atuais — `TODO: confirmar` propósito original |

Tints translúcidos (badge do eyebrow, bordas/tags accent, sombra do botão primário,
glow do CTA final) usam `color-mix(in srgb, var(--green) N%, transparent)` em CSS
puro — não a sintaxe de alpha do Tailwind, que mistura em `oklab` e desloca a cor em
relação ao mockup aprovado (ver `docs/ARQUITETURA.pt-br.md` §5).

## Tipografia

Três famílias via `next/font/google`, cada uma numa CSS variable (`layout.tsx`):

| Papel | Fonte | Pesos carregados | Variável |
| --- | --- | --- | --- |
| Display (h1/h2/h3) | Space Grotesk | 500, 600, 700 | `--font-display` |
| Corpo | Inter | 400, 500, 600, 700 | `--font-body` |
| Monoespaçada (terminal, código, prompts) | JetBrains Mono | 400, 500, 600 | `--font-mono` |

`h1`/`h2`/`h3` são sempre `font-weight: 700`, `letter-spacing: -0.02em`. Títulos de
seção seguem a escala `text-4xl` desktop / `text-[28px]` mobile (`max-[860px]`);
o h1 da Hero é maior (`text-[56px]` / `text-4xl` mobile).

## Espaçamento e forma

- `--radius: 14px` — raio padrão de cards, terminal, tree, modal, botões.
- Seções internas usam `py-22` desktop / `py-14` mobile (`max-[860px]`), com
  `border-t border-border` entre seções consecutivas (exceto a Hero).
- Container central: `max-w-[1120px]`, `px-6`.
- Alvos de toque interativos (grafo, botões) respeitam mínimo de `44px`.

## Motion

- `Reveal` (fade-up genérico): `opacity 0→1`, `y: 18px→0`, `0.6s ease-out`, disparado
  uma vez ao entrar em viewport (`whileInView`, `once: true, amount: 0.15`); stagger
  opcional de `90ms` por índice.
- Terminal typewriter / árvore / chips: ver `docs/ARQUITETURA.pt-br.md` §3.
- Tudo respeita `prefers-reduced-motion: reduce` — reset genérico (`* { animation:
  none !important }`) mais o caso especial do grafo SVG (`stroke-dashoffset`, ver
  `docs/ARQUITETURA.pt-br.md` §5) e o "instant, no transition" de `Reveal`/`NodeModal`/`Toast`
  via `useReducedMotion()`.

## Logo

`MindLogo.tsx` (wordmark "MIND" em blocos geométricos) e `src/app/icon.svg`
(favicon) — desenhados pelo Felipe, não pelo mockup original. Ambos usam `var(--fg)` e
`var(--green)` (o SVG do favicon replica os mesmos hex diretamente, já que favicons
não herdam CSS custom properties da página). 2ª versão (2026-07-17) adicionou um
acento de círculo (halo + núcleo verde) dentro da curva do "D". Ao atualizar a logo,
propagar nos três lugares onde ela vive: `MindLogo.tsx` e `icon.svg` aqui, e o card do
mind em `cafelabs-portifolio` (`src/components/ui/mind-logo.tsx`).
