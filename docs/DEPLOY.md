**[Leia em Português](DEPLOY.pt-br.md)**

# Deploy — mind-landing

## Where it lives

- **Repository:** `CafeLabsDev/mind-landing` (GitHub, public). Remote
  configured over HTTPS (no SSH in this environment).
- **Hosting:** Vercel.
- **Domain:** `mind.cafelabs.net`.

There is no deploy configuration file committed in the repo (no
`vercel.json`, no workflow under `.github/workflows/`) — Vercel detects and
builds Next.js projects by framework convention, so the entire pipeline
(build command, output, environment variables, domain) is configured
directly in the Vercel dashboard, outside this repository.

## Pipeline

Standard Next.js-on-Vercel project via Git integration:

1. Push/merge to `main` → Vercel detects the GitHub webhook, builds
   (`npm install && npm run build`), and publishes automatically.
2. Pull requests (if opened) generate Preview Deployments with their own URL —
   not applicable to the project's current workflow, which works directly on
   `main` (no feature branch nor PR, per Felipe's working convention).

`TODO: confirmar`: whether the Vercel project is already actually
created/connected and whether the `mind.cafelabs.net` domain already points
to it. There is no way to verify this from the repository (no Vercel
credential/API available in this environment) — the last known update in
Felipe's knowledge vault records the repository created and pushed, but the
deploy itself and the DNS being "on Felipe," outside the workflow of the
subagent team that built the site.

## Environments

Only production exists (`mind.cafelabs.net`). No separate staging
environment — consistent with the rest of the project: static landing, no
user data, no need to isolate data between environments.

## Rollback

There is no custom pipeline — rollback is Vercel's default: revert to a
previous deployment directly from the dashboard (every build stays available
as an immutable deployment, promotable to production at any time), or revert
the commit on `main` and let the next build replace the current one.

## Environment variables

No environment variable is read by the code (`grep` for `process.env` in
`src/` finds no usage). `@vercel/analytics` works automatically in production
on Vercel, with no manual key/configuration.
