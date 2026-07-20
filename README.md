# mind-landing

Landing page única do [mind-template](https://github.com/CafeLabsDev/mind-template),
o espelho genérico/open source do vault de conhecimento pessoal (Markdown + git,
integrado ao Claude Code) do Felipe. Site estático (Next.js), sem backend nem dado de
usuário — só divulga o projeto, explica o conceito e aponta pro repositório no GitHub.
Público-alvo: dev que já usa Claude Code e está confortável com Markdown + git, não o
público geral de apps de note-taking.

Implementada 1:1 a partir de um mockup HTML já aprovado — paleta, tipografia, grafo
interativo, animações e acessibilidade especificados ali são a fonte de verdade visual
e de conteúdo (ver [docs/DESIGN.md](docs/DESIGN.md) e [docs/ARQUITETURA.md](docs/ARQUITETURA.md)).

## Stack

| Camada | Tecnologia |
| --- | --- |
| Framework | Next.js 16 (App Router), React 19 |
| Estilo | Tailwind CSS v4 (tokens via `@theme inline`) + CSS puro pontual (ver [docs/ARQUITETURA.md](docs/ARQUITETURA.md)) |
| Animação | Framer Motion (`whileInView`, `AnimatePresence`) |
| Fontes | Space Grotesk (display), Inter (corpo), JetBrains Mono (mono) via `next/font/google` |
| Analytics | `@vercel/analytics` (eventos customizados) |
| Deploy | Vercel — ver [docs/DEPLOY.md](docs/DEPLOY.md) |

Mesmo padrão de stack do site institucional (`cafelabs-portifolio`) e da landing irmã
(`dindin-landing`).

## Pré-requisitos

- Node.js — `TODO: confirmar` versão mínima exigida (sem `engines` no `package.json`;
  o ambiente de desenvolvimento atual usa Node 20).
- npm (usa `package-lock.json`, não pnpm/yarn).

## Rodando localmente

```bash
npm install
npm run dev     # http://localhost:3000
npm run lint    # eslint
npm run build   # build de produção
npm run start   # serve o build de produção
```

## Estrutura de pastas

```
src/
├── app/                # App Router: layout, página única, globals.css, favicon
├── components/         # Um componente por seção da landing + peças reutilizáveis
│   ├── Hero.tsx, ConceptSection.tsx, FeaturesSection.tsx, ProofSection.tsx,
│   │   HowToStart.tsx, FinalCta.tsx, Footer.tsx, SiteHeader.tsx  — seções da página
│   ├── InteractiveGraph.tsx, NodeGraph.tsx, NodeModal.tsx        — grafo de nós da hero
│   └── GitHubLink.tsx, Reveal.tsx, Toast.tsx, MindLogo.tsx, icons.tsx — peças comuns
└── lib/                # site.ts (constantes/copy), graph-data.ts (nós do grafo),
                         # analytics.ts, useCloneCopy.ts (hook do CTA de copiar)
```

Página única (`src/app/page.tsx`) compõe as seções em ordem: Header → Hero → Conceito →
Features → Prova (terminal) → Como começar → CTA final → Footer. Detalhe de cada peça
em [docs/ARQUITETURA.md](docs/ARQUITETURA.md).

## Analytics

`@vercel/analytics` instrumentado com dois eventos customizados (ver
[src/lib/analytics.ts](src/lib/analytics.ts)):

- `copy_clone_command` — clique no botão "Copiar comandos de setup" (CTA primário;
  nome do evento mantido do texto antigo, o conteúdo copiado agora é o bloco de setup
  completo — fork manual, dois remotes).
- `click_github` — clique em qualquer link pro GitHub, com prop `location`
  (`header` | `hero` | `final_cta` | `footer`) pra diferenciar a origem.

Ambos carregam a prop `location` pra comparar as posições dos CTAs entre si.

## Deploy

Vercel, domínio `mind.cafelabs.net`, repositório `CafeLabsDev/mind-landing` (público).
Detalhes em [docs/DEPLOY.md](docs/DEPLOY.md).

## Docs

- [docs/ARQUITETURA.md](docs/ARQUITETURA.md) — como a página é montada, fluxo de estado,
  decisões técnicas e não-óbvias.
- [docs/DESIGN.md](docs/DESIGN.md) — paleta, tipografia e tokens de identidade visual.
- [docs/DEPLOY.md](docs/DEPLOY.md) — pipeline e domínio de deploy.
