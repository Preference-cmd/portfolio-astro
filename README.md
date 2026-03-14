# Portfolio Website Template (Astro)

A modern personal portfolio website template built with Astro, React, and Tailwind CSS. Fork this repo and customize it with your own information!

## Features

- **Astro** - Static site generator for optimal performance
- **React** - Interactive UI components with client-side hydration
- **Tailwind CSS 4** - Utility-first CSS framework
- **shadcn/ui style components** - Reusable UI components
- **Dark/Light Theme** - Theme toggle with system preference detection
- **Internationalization (i18n)** - Support for English and Chinese (local files)
- **Cloudflare KV** - Remote data storage (optional, falls back to local example data)
- **Responsive Design** - Mobile-first approach
- **GitHub Actions** - Automatic deployment to Cloudflare Workers

## Quick Start

### 1. Fork this repository

Click the "Fork" button on GitHub to create your own copy.

### 2. Customize your data

Edit the example data files:

- `src/data/example/projects.json` - Your projects data
- `src/data/example/en/resume.json` - Your resume data (English)
- `src/data/example/zh/resume.zh.json` - Your resume data (Chinese)
- `src/i18n/en.json` - English translations
- `src/i18n/zh.json` - Chinese translations

### 3. Run locally

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Open [http://localhost:4321](http://localhost:4321) to view the site.

### 4. Deploy to Cloudflare Workers

1. Create a Cloudflare account if you don't have one
2. Set up GitHub Secrets:
   - `CLOUDFLARE_API_TOKEN` - Your Cloudflare API token (with KV write permissions)
   - `CLOUDFLARE_ACCOUNT_ID` - Your Cloudflare account ID
   - `CLOUDFLARE_KV_NAMESPACE_ID` - Your KV namespace ID

The site will automatically deploy on push to main branch.

## Data Architecture

```
src/data/
├── index.ts          # Data access with fallback logic
├── kv/               # KV data (gitignored, fetched during build)
│   ├── projects.json
│   ├── resume.json   # (en)
│   └── resume.zh.json # (zh)
└── example/          # Example data (tracked in git)
    ├── projects.json
    ├── en/resume.json
    └── zh/resume.zh.json
```

- **Local development**: Uses example data from `src/data/example/`
- **GitHub Actions build**: Fetches data from your KV namespace, overwrites `src/data/kv/`
- **Fallback**: If KV fetch fails, falls back to example data

### Build Commands

```bash
# Local build (uses example data)
pnpm build

# Build with KV data (for deployment)
pnpm build:with-kv

# Seed your data to KV
pnpm seed:kv
```

### Setting Up KV Data

1. Create a KV namespace in Cloudflare Dashboard
2. Get your KV namespace ID and add to GitHub Secrets
3. Run `pnpm seed:kv` to populate KV with your data (requires `CLOUDFLARE_ACCOUNT_ID`, `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_KV_NAMESPACE_ID`)

## Tech Stack

- **Framework**: Astro 5.x
- **UI Library**: React 19
- **Styling**: Tailwind CSS 4
- **Components**: Radix UI + custom shadcn/ui-style components
- **Icons**: Lucide React
- **Language**: TypeScript
- **Package Manager**: pnpm
- **Deployment**: Cloudflare Workers
- **Remote Data**: Cloudflare KV

## Project Structure

```
portfolio-astro/
├── src/
│   ├── components/       # React components
│   │   ├── ui/          # shadcn/ui-style components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Projects.tsx
│   │   ├── Contact.tsx
│   │   ├── Resume.tsx
│   │   └── PortfolioContent.tsx
│   ├── i18n/            # Internationalization (local files)
│   │   ├── en.json
│   │   ├── zh.json
│   │   └── index.ts
│   ├── layouts/         # Astro layouts
│   │   └── Layout.astro
│   ├── lib/             # Utilities
│   │   └── utils.ts
│   ├── pages/           # Astro pages
│   │   ├── index.astro
│   │   ├── resume.astro
│   │   └── zh/
│   │       ├── index.astro
│   │       └── resume.astro
│   └── data/            # Data with fallback
│       ├── index.ts     # Data access functions
│       ├── kv/          # KV data (gitignored)
│       └── example/     # Example data (tracked)
├── scripts/
│   ├── fetch-kv-data.ts # Fetch from KV
│   └── seed-kv.ts      # Seed to KV
├── .github/
│   └── workflows/
│       └── deploy.yml   # GitHub Actions deployment
├── wrangler.toml        # Cloudflare configuration
└── astro.config.mjs     # Astro configuration
```

## Pages

| Route | Description |
|-------|-------------|
| `/` | English homepage |
| `/zh` | Chinese homepage |
| `/resume` | English resume |
| `/zh/resume` | Chinese resume |

## Theme

The site supports light and dark themes. The theme is stored in localStorage and respects system preferences by default.

## Internationalization

Translations are stored in `src/i18n/` as JSON files:
- `en.json` - English
- `zh.json` - Chinese (Simplified)

The locale is determined by the URL path. Switching between locales is done through the language toggle in the header.

## Design System

The design follows the shadcn/ui style with:
- OKLCH color system
- Smooth transitions (0.2s cubic-bezier)
- Backdrop blur effects
- Mobile-first responsive design

### Color Palette

| Token | Light | Dark |
|-------|-------|------|
| Background | oklch(1 0 0) | oklch(0.145 0 0) |
| Foreground | oklch(0.145 0 0) | oklch(0.985 0 0) |
| Primary | oklch(0.205 0 0) | oklch(0.922 0 0) |

## License

MIT - Feel free to use this template for your own portfolio!
