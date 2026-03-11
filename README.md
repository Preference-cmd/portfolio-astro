# Portfolio Website Template (Astro)

A modern personal portfolio website template built with Astro, React, and Tailwind CSS. Fork this repo and customize it with your own information!

## Features

- **Astro** - Static site generator for optimal performance
- **React** - Interactive UI components with client-side hydration
- **Tailwind CSS 4** - Utility-first CSS framework
- **shadcn/ui style components** - Reusable UI components
- **Dark/Light Theme** - Theme toggle with system preference detection
- **Internationalization (i18n)** - Support for English and Chinese
- **Responsive Design** - Mobile-first approach
- **Cloudflare D1** - Optional database integration for dynamic content
- **GitHub Actions** - Automatic deployment to Cloudflare Workers

## Quick Start

### 1. Fork this repository

Click the "Fork" button on GitHub to create your own copy.

### 2. Customize your data

Edit the following files to add your information:

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

### 4. Deploy

Connect your repository to Cloudflare Workers/Pages for automatic deployment.

See [D1_MIGRATION.md](./D1_MIGRATION.md) for optional database setup.

## Tech Stack

- **Framework**: Astro 5.x
- **UI Library**: React 19
- **Styling**: Tailwind CSS 4
- **Components**: Radix UI + custom shadcn/ui-style components
- **Icons**: Lucide React
- **Language**: TypeScript
- **Package Manager**: pnpm

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
│   ├── i18n/            # Internationalization
│   │   ├── en.json      # English translations
│   │   ├── zh.json      # Chinese translations
│   │   └── index.ts    # i18n utilities
│   ├── layouts/         # Astro layouts
│   │   └── Layout.astro
│   ├── lib/             # Utilities
│   │   └── utils.ts    # cn() function
│   ├── pages/           # Astro pages
│   │   ├── index.astro      # English home
│   │   ├── resume.astro    # English resume
│   │   └── zh/             # Chinese pages
│   │       ├── index.astro
│   │       └── resume.astro
│   └── data/             # Content data
│       ├── resume.json
│       └── projects.json
├── d1/                   # D1 database files
│   └── schema.sql
├── .github/
│   └── workflows/
│       └── deploy.yml    # GitHub Actions deployment
├── wrangler.toml         # Cloudflare configuration── astro.config.mjs
└ # Astro configuration
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
