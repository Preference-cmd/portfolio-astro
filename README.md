# Portfolio Website (Astro)

A modern personal portfolio website built with Astro, React, and Tailwind CSS. This is a migration from the original Next.js version, now using Astro for better static site performance.

## Features

- **Astro** - Static site generator for optimal performance
- **React** - Interactive UI components with client-side hydration
- **Tailwind CSS 3** - Utility-first CSS framework
- **shadcn/ui style components** - Reusable UI components
- **Dark/Light Theme** - Theme toggle with system preference detection
- **Internationalization (i18n)** - Support for English and Chinese
- **Responsive Design** - Mobile-first approach

## Tech Stack

- **Framework**: Astro 5.x
- **UI Library**: React 19
- **Styling**: Tailwind CSS 3
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
│   └── styles/          # Global styles
│       └── global.css
├── public/              # Static assets
├── astro.config.mjs     # Astro configuration
├── tailwind.config.mjs  # Tailwind configuration
└── tsconfig.json        # TypeScript configuration
```

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm 9+

### Installation

```bash
# Install dependencies
pnpm install
```

### Development

```bash
# Start development server
pnpm dev
```

Open [http://localhost:4321](http://localhost:4321) to view the site.

### Build

```bash
# Build for production
pnpm build

# Preview production build
pnpm preview
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

The locale is by the URL path. Switching determined between locales is done through the language toggle in the header.

## Design System

The design follows the trien-ui style with:
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

## Migration from Next.js

This project was migrated from Next.js (portfolio-website-nextjs). Key changes:

1. **File-based routing** - Pages are in `src/pages/` instead of `app/`
2. **Component islands** - Use `client:load` or `client:visible` for interactive components
3. **Static by default** - Astro generates static HTML by default
4. **No server components** - All components are client-side rendered

## License

MIT
