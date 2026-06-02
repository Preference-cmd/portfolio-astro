# AGENTS.md

> A contract between this codebase and any AI agent (or human) that
> touches it. Reads top-to-bottom in under 3 minutes; the longer
> detail lives in `README.md` and `.cursor/rules/`.

## What this project is

A **personal portfolio template** built with Astro + React + Tailwind
v4, deployable to Cloudflare Workers. It uses Cloudflare KV for
remote data (resume, projects) with local JSON fallback. It is meant
to be **forked**, not used as-is.

The visual language is **Swiss editorial** (12-col grid, hairline
borders, mono labels, mixed grotesk + italic serif for accent). Look
at `src/components/Hero.tsx`, `Projects.tsx`, and the right column
of `Contact.tsx` to feel the cadence.

## Repository layout

```
src/
├── components/        # React + Astro components
│   ├── ui/            # Reusable shadcn-style primitives
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Experience.tsx
│   ├── Projects.tsx
│   ├── Contact.tsx
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── PortfolioContent.tsx
├── i18n/              # en.json + zh.json, ALWAYS read from local files
├── data/
│   ├── index.ts       # getProjects(locale) / getResume(locale)
│   ├── example/       # Template placeholder data (TRACKED)
│   └── kv/            # Live data fetched from KV (GITIGNORED)
├── layouts/
├── pages/             # /, /zh, /resume, /zh/resume
├── lib/               # cn() utility
└── styles/global.css  # @theme tokens; source of truth for color/typography
```

## Data flow (read this before editing)

```
i18n JSON  ─→  t.*      (always local, ALWAYS read first)
KV data    ─→  resume.*  (gitignored, fetched at build by
                          scripts/fetch-kv-data.ts; falls back
                          to data/example/ when KV is empty)
Example    ─→  data/example/*  (template placeholders, tracked)
```

The merge pattern used in `Contact.tsx` and `Hero.tsx` is the
canonical approach:

```ts
const merged = {
  ...i18nDefaults,   // i18n is the source of truth
  ...resumeOverride, // KV may override individual fields
};
```

Don't break this contract. If a field can ever come from KV, it must
live under `resume.*` and merge over i18n. If it can only come from
i18n, it stays under `t.*` and never reads from KV.

## Commands

```bash
pnpm dev            # dev server (uses data/example/)
pnpm build          # static build (uses data/example/)
pnpm build:with-kv  # fetches KV → writes src/data/kv/ → builds
pnpm seed:kv        # pushes local JSON to Cloudflare KV
pnpm preview        # serve dist/
```

Required env vars (see `.env.example`):

- `CLOUDFLARE_ACCOUNT_ID`
- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_KV_NAMESPACE_ID`

## Editing rules (apply to every PR)

1. **Never hard-code personal data** in tracked files. Source content
   (email, phone, location, GitHub handle, project URLs) lives in
   `src/data/kv/en/resume.json` (en) / `src/data/kv/zh/resume.zh.json`
   (zh) for the live site, and `src/data/example/*` as the template
   defaults. The example data uses `Alex Chen` / `陈亚历` with
   `hello@alex-chen.dev` and `+1 (555) 123-4567` so the template
   ships with realistic but obviously-fake contact info.

2. **i18n is enforced.** Any new visible string needs both `en.json`
   and `zh.json` entries. If you add a string in only one, the
   other locale will fall through to the key path and look broken.

3. **Components are React 19 client islands.** All visible UI lives in
   `client:load`-hydrated React trees. Astro pages (`src/pages/*.astro`)
   are thin shells. Don't add heavy logic in `.astro` files.

4. **Tailwind v4 only.** Tokens live in `src/styles/global.css` under
   `@theme { ... }`. Use semantic class names like `text-foreground`,
   `bg-background`, `border-muted`. Don't hard-code hex values
   anywhere except inside `@theme` definitions.

5. **Inter is the only "non-replaceable" dependency.** It's
   self-hosted under `public/fonts/`. If you swap the font face,
   keep the variable-font behavior (one file, weight axis) and
   update both `@font-face` and `--font-sans` /
   `--font-heading` in `global.css`.

6. **No `Backdrop blur` / no glassmorphism.** This template's
   register is Swiss editorial, not glassmorphism. If a feature
   would require `backdrop-blur-*` or `bg-background/40` to
   work, redesign it.

## Personal data — PII protocol

Before any `git push` to a public remote, scrub the working tree
for:

```bash
grep -rnE "sq103832|137 9809|Guangzhou, China|中国广东省广州市" src/
```

All four of these were author PII at one point and got rewritten
either in source or via `git filter-repo`. If you fork and start
putting your own PII in, run `git filter-repo` *before* your first
public push. See the "PII protocol" entry in
`.impeccable/critique/2026-05-26T14-33-00Z__cv-resume-html.md` for
the pattern.

## Deploy

Push to `main` triggers `.github/workflows/deploy.yml` which:

1. Replaces `id = "portfolios"` in `wrangler.toml` with the
   `CLOUDFLARE_KV_NAMESPACE_ID` secret.
2. Runs `pnpm build:with-kv` to fetch data and build.
3. Calls `wrangler deploy` to publish to Cloudflare Workers.

The KV namespace ID and the deploy token are the only two GitHub
secrets you need (plus `CLOUDFLARE_ACCOUNT_ID` for the build
script).

## When you fork

Things to change:

- `TEMPLATE_REPO_URL` in `src/components/Hero.tsx` (line 6) — the
  home page "Deploy this template" button points here by default.
- `src/data/example/*` — your name, work history, projects, contact.
- `src/i18n/*.json` — your greetings, subtitles, available-for list.
- `astro.config.mjs` — the Cloudflare `name` field if you want a
  different workers subdomain.
- `wrangler.toml` — `name`, `compatibility_date`, and the assets
  directory (defaults to `dist`).

Things you do **not** need to change:

- Anything in `src/components/ui/`.
- The deploy workflow (secrets carry over).
- `astro.config.mjs` paths / alias / integrations.
- `src/styles/global.css` design tokens (just override the values
  if you want a different palette).