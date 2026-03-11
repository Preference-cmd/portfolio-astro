# Portfolio Website Template (Astro)

A modern personal portfolio website template built with Astro, React, and Tailwind CSS. Fork this repo and customize it with your own information!

## Features

- **Astro** - Static site generator for optimal performance
- **React** - Interactive UI components with client-side hydration
- **Tailwind CSS 4** - Utility-first CSS framework
- **shadcn/ui style components** - Reusable UI components
- **Dark/Light Theme** - Theme toggle with system preference detection
- **Internationalization (i18n)** - Support for English and Chinese (local files)
- **Cloudflare D1** - Database for projects and resume data (optional, falls back to local JSON)
- **Responsive Design** - Mobile-first approach
- **GitHub Actions** - Automatic deployment to Cloudflare Workers

## Quick Start

### 1. Fork this repository

Click the "Fork" button on GitHub to create your own copy.

### 2. Customize your data

Edit the following files to add your information:

- `src/data/projects.json` - Your projects data
- `src/data/resume.json` - Your resume data (English)
- `src/data/resume.zh.json` - Your resume data (Chinese)
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
   - `CLOUDFLARE_API_TOKEN` - Your Cloudflare API token
   - `CLOUDFLARE_ACCOUNT_ID` - Your Cloudflare account ID
   - `CLOUDFLARE_D1_DATABASE_ID` - (Optional) Your D1 database ID

The site will automatically deploy on push to main branch.

## Data Sources

- **i18n**: Always reads from local files (`src/i18n/*.json`)
- **Projects & Resume**: Reads from D1 database if available, falls back to local JSON files

### Using Local Data Only

```bash
pnpm build
```

### Using D1 Database

```bash
pnpm build:with-d1
```

## Tech Stack

- **Framework**: Astro 5.x
- **UI Library**: React 19
- **Styling**: Tailwind CSS 4
- **Components**: Radix UI + custom shadcn/ui-style components
- **Icons**: Lucide React
- **Language**: TypeScript
- **Package Manager**: pnpm
- **Deployment**: Cloudflare Workers

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
│   └── data/            # Content data (local fallback)
│       ├── projects.json
│       ├── resume.json
│       └── resume.zh.json
├── scripts/
│   └── fetch-d1-data.ts # D1 data fetching script
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
