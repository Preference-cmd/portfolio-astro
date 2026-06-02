# portfolio-astro

A **Swiss-editorial** portfolio template built with Astro + React + Tailwind v4,
deployable to Cloudflare Workers. Bilingual (EN / 中文) out of the box,
Cloudflare KV-backed for remote content, fork-and-customize in under
ten minutes.

> For AI-agent or contributor contracts (data flow rules, editing
> constraints, PII protocol), see [`AGENTS.md`](./AGENTS.md). This
> README is for humans.

## Stack

- **Astro 5** + **React 19** (client islands)
- **Tailwind CSS v4** with `@theme` tokens in `src/styles/global.css`
- **Inter** (self-hosted variable font) + **Instrument Serif** for
  editorial accent
- **Cloudflare Workers** for deploy, **Cloudflare KV** for remote
  resume / project data
- **TypeScript** end-to-end, **pnpm** for package management

## Quick start

```bash
# 1. Use this template on GitHub (or fork), then clone
git clone <your-fork-url> portfolio-astro
cd portfolio-astro

# 2. Install + run
pnpm install
pnpm dev          # → http://localhost:4321
```

That's the whole local loop. The dev server reads from
`src/data/example/*` so it works without any Cloudflare setup.

To deploy to your own Cloudflare Workers, see [Deploy](#deploy)
below.

## What you get

- **Editorial layout** — 12-col grid, hairline borders, mono labels,
  mixed grotesk + italic serif (see `Hero.tsx`, the right column of
  `Contact.tsx`, and the project list in `Projects.tsx` for the
  cadence)
- **Theme toggle** in the header with system-preference detection
  and `localStorage` persistence
- **Bilingual** routing — `/` is English, `/zh` is Chinese, both
  `/resume` routes render to a printable resume view
- **Scroll-anchored sections** with active-section highlighting in
  the header (`#/about`, `#/projects`, etc.)
- **Sticky project panel** — the left list scrolls, the right detail
  panel updates as each project enters the viewport
- **KV-backed content** (optional) — `pnpm build:with-kv` fetches
  live data from Cloudflare KV; without it, `pnpm build` falls
  back to local JSON

## Customization

Most forks only touch these files:

| What | Where |
|---|---|
| Name, contact, work history, projects | `src/data/example/en/resume.json`, `src/data/example/zh/resume.zh.json`, `src/data/example/en/projects.json`, `src/data/example/zh/projects.json` |
| Hero greeting, section subtitles | `src/i18n/en.json`, `src/i18n/zh.json` |
| Color palette | `src/styles/global.css` (`@theme` block) |
| "Deploy this template" button target | `TEMPLATE_REPO_URL` at the top of `src/components/Hero.tsx` |
| Cloudflare project name | `name` in `wrangler.toml` |

The example data ships as `Alex Chen` / `陈亚历` with
`hello@alex-chen.dev` and `+1 (555) 123-4567` so the template
demonstrates the data shape without shipping anyone's real contact
info.

If you want to wire Cloudflare KV as your live data source, see
[Data architecture](#data-architecture) below.

## Data architecture

```
┌────────────────┐
│ src/i18n/      │  Always read first. UI strings, "Available For"
│ en.json        │  list, section labels, button text. Both locales
│ zh.json        │  required for any new visible string.
└───────┬────────┘
        │
        ▼
┌────────────────┐
│ src/data/kv/   │  Cloudflare KV mirror. Gitignored.
│ en/resume.json │  Fetched at build by `scripts/fetch-kv-data.ts`.
│ zh/...         │  Use this for content that changes often
└───────┬────────┘  (resume, projects, hero copy).
        │              ↓ missing at build time
        ▼
┌────────────────┐
│ src/data/      │  Local fallback. Tracked in git.
│ example/       │  Same shape as the KV data; the dev server
│ en/...         │  and `pnpm build` use this when no KV fetch
│ zh/...         │  has happened.
└────────────────┘
```

The merge pattern (used in `Hero.tsx` and `Contact.tsx`) is the
canonical way to add a new field:

```ts
const merged = {
  ...i18nDefaults,   // i18n is the source of truth
  ...resumeOverride, // KV may override individual fields
};
```

i18n provides the field's default value, KV overrides when present.
If a field is meant to be i18n-only, keep it under `t.*` and don't
read it from KV. If a field is meant to be live-editable, route
it through `resume.*` and merge.

## Deploy

The included `.github/workflows/deploy.yml` deploys to Cloudflare
Workers on every push to `main`. It needs three GitHub repository
secrets (Settings → Secrets and variables → Actions):

| Secret | Where to get it |
|---|---|
| `CLOUDFLARE_API_TOKEN` | Cloudflare dashboard → My Profile → API Tokens → Create Token → "Edit Cloudflare Workers" template |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare dashboard → right sidebar of any Workers page |
| `CLOUDFLARE_KV_NAMESPACE_ID` | `wrangler kv namespace create PORTFOLIO_KV` outputs this ID |

To enable KV-backed content:

```bash
# 1. Create the namespace once
pnpm exec wrangler kv namespace create PORTFOLIO_KV

# 2. Edit the example data files to your real content, then push
#    the same files to KV with `pnpm seed:kv` (or wrangler kv key put).

# 3. From then on, `pnpm build:with-kv` (or push to main) will
#    fetch from KV at build time.
```

The deploy workflow then runs `pnpm build:with-kv` and calls
`wrangler deploy`. Live data → live site, automatically.

If you'd rather not use GitHub Actions, `pnpm build:with-kv` and
`pnpm exec wrangler deploy` work fine from your laptop.

## Project structure

```
src/
├── components/
│   ├── ui/               # Reusable shadcn-style primitives
│   ├── Hero.tsx          # Editorial intro + CTA
│   ├── About.tsx         # Skills grid (intersection-observed fade-in)
│   ├── Experience.tsx    # Work history timeline
│   ├── Projects.tsx      # Sticky-detail project list
│   ├── Contact.tsx       # Channels + "Available For" + CTA
│   ├── Header.tsx        # Nav with active-section tracking
│   ├── Footer.tsx        # Logo + social
│   └── PortfolioContent.tsx
├── i18n/                 # en.json, zh.json (always read first)
├── data/
│   ├── index.ts          # getProjects() / getResume() / merge helpers
│   ├── example/          # Tracked template placeholders
│   └── kv/               # Gitignored; populated by fetch-kv-data.ts
├── layouts/Layout.astro  # <head> + theme init + skip link
├── pages/
│   ├── index.astro       # /
│   ├── resume.astro      # /resume
│   └── zh/
│       ├── index.astro   # /zh
│       └── resume.astro  # /zh/resume
├── lib/utils.ts          # cn() (clsx + tailwind-merge)
└── styles/global.css     # @theme tokens; the design source of truth
```

## Pages

| Route | Notes |
|---|---|
| `/` | English homepage with hero, about, experience, projects, contact |
| `/zh` | Chinese homepage, same sections |
| `/resume` | English printable resume |
| `/zh/resume` | Chinese printable resume |

## Contributing

This is a personal template published as open source. If you fork
it, you don't need to PR back — go build your site. The one thing
worth keeping in mind: **never commit personal data to tracked
files**. The example data ships with obviously-fake contact info;
live data lives in `src/data/kv/` (gitignored) or in your Cloudflare
KV namespace. If you accidentally commit a real email / phone /
address, run `git filter-repo` to scrub history *before* your
first public push. The `AGENTS.md` PII protocol section has the
exact command.

## License

MIT — see [`LICENSE`](./LICENSE). Use it, fork it, ship your site.

---

Built with Astro 5 · React 19 · Tailwind 4 · deployed on
Cloudflare Workers. Inter typeface licensed under the SIL OFL.