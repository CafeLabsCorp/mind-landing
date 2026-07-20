# Deploy — mind-landing

## Onde vive

- **Repositório:** `CafeLabsDev/mind-landing` (GitHub, público). Remote configurado
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

`TODO: confirmar`: se o projeto Vercel já está de fato criado/conectado e o domínio
`mind.cafelabs.net` já aponta pra ele. Não há como verificar isso a partir do
repositório (nenhuma credencial/API da Vercel disponível neste ambiente) — a última
atualização conhecida no vault de conhecimento do Felipe registra o repositório criado
e com push feito, mas o deploy em si e o DNS ficando "por conta do Felipe", fora do
fluxo do time de subagentes que construiu o site.

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
