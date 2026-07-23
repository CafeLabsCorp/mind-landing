**[Leia em Português](DEPLOY.pt-br.md)**

# Deploy — mind-landing

## Where it lives

- **Repository:** `CafeLabsCorp/mind-landing` (GitHub, public). Remote
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

The Vercel project is created and connected, and `mind.cafelabs.net` is live
(deploy + DNS done manually by Felipe on 2026-07-15, outside the subagent
workflow that built the site).

**Known operational gotcha:** the connection between Vercel and the
`CafeLabsCorp` GitHub org runs through the "Vercel" GitHub App, which has
dropped at least twice (2026-07-21, 2026-07-23) across all 5 Café Labs sites
on Vercel (this one included) — auto-deploy on push silently stops working
until the app is reinstalled/reauthorized at
[github.com/organizations/CafeLabsCorp/settings/installations](https://github.com/organizations/CafeLabsCorp/settings/installations).
If a push to `main` doesn't show up as a new deployment, check there before
assuming the build itself failed.

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
