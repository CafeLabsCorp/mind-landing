**[Read in English](DEPLOY.md)**

# Deploy — mind-landing

## Onde vive

- **Repositório:** `CafeLabsCorp/mind-landing` (GitHub, público). Remote configurado
  em HTTPS (sem SSH neste ambiente).
- **Hospedagem:** Vercel.
- **Domínio:** `mind.cafelabs.net`.

Não há nenhum arquivo de configuração de deploy commitado no repo (sem
`vercel.json`, sem workflow em `.github/workflows/`) — a Vercel detecta e builda
projetos Next.js pela convenção do framework, então o pipeline inteiro (build
command, output, variáveis de ambiente, domínio) é configurado direto no dashboard da
Vercel, fora deste repositório.

## Pipeline

Padrão de projeto Next.js na Vercel via integração Git:

1. Push/merge em `main` → Vercel detecta o webhook do GitHub, builda
   (`npm install && npm run build`) e publica automaticamente.
2. Pull requests (se abertos) geram Preview Deployments com URL própria — não
   aplicável ao fluxo atual do projeto, que trabalha direto em `main` (sem branch de
   feature nem PR, por convenção de trabalho do Felipe).

O projeto na Vercel está criado e conectado, e `mind.cafelabs.net` está no ar (deploy
+ DNS feitos manualmente pelo Felipe em 2026-07-15, fora do fluxo do time de
subagentes que construiu o site).

**Pegadinha operacional conhecida:** a conexão entre a Vercel e a org `CafeLabsCorp`
no GitHub passa pela GitHub App "Vercel", que já caiu pelo menos duas vezes
(2026-07-21, 2026-07-23) nos 5 sites da Café Labs na Vercel (este incluído) — o
auto-deploy no push para de funcionar silenciosamente até a app ser
reinstalada/reautorizada em
[github.com/organizations/CafeLabsCorp/settings/installations](https://github.com/organizations/CafeLabsCorp/settings/installations).
Se um push em `main` não aparecer como novo deployment, checar ali antes de assumir
que o build falhou.

## Ambientes

Só existe produção (`mind.cafelabs.net`). Sem ambiente de staging separado —
consistente com o restante do projeto: landing estática, sem dado de usuário, sem
necessidade de isolar dados entre ambientes.

## Rollback

Não há pipeline customizado — rollback é o padrão da Vercel: reverter para um
deployment anterior direto pelo dashboard (cada build fica disponível como um
deployment imutável, promovível a produção a qualquer momento), ou reverter o commit
em `main` e deixar o próximo build substituir o atual.

## Variáveis de ambiente

Nenhuma variável de ambiente é lida pelo código (`grep` por `process.env` no
`src/` não encontra nenhum uso). `@vercel/analytics` funciona automaticamente em
produção na Vercel, sem chave/configuração manual.
