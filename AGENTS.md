# portfolio-astro AGENTS.md

## Project Overview

Personal portfolio website built with Astro, React, and Tailwind CSS. Features a Swiss Design System aesthetic with dark mode support and internationalization (English/Chinese).

## Tech Stack

- **Framework**: Astro 5.x with React integration
- **UI Library**: React 19
- **Styling**: Tailwind CSS v4 with CSS-based @theme configuration
- **Components**: Radix UI primitives + shadcn/ui patterns
- **Language**: TypeScript
- **Package Manager**: pnpm

## Directory Structure

```
portfolio-astro/
├── src/
│   ├── components/
│   │   ├── ui/                    # Reusable UI components (shadcn style)
│   │   │   ├── button.tsx         # CVA-based button variants
│   │   │   ├── badge.tsx
│   │   │   ├── card.tsx
│   │   │   ├── theme-toggle.tsx
│   │   │   └── ...
│   │   ├── Header.tsx             # Navigation header with mobile menu
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Projects.tsx
│   │   ├── PortfolioContent.tsx  # Main content wrapper
│   │   ├── Resume.tsx
│   │   └── Contact.tsx
│   ├── layouts/
│   │   └── Layout.astro           # Base HTML layout with theme init
│   ├── pages/
│   │   ├── index.astro            # English home
│   │   ├── resume.astro           # English resume
│   │   └── zh/
│   │       ├── index.astro        # Chinese home
│   │       └── resume.astro       # Chinese resume
│   ├── i18n/
│   │   ├── index.ts               # i18n utilities & hooks
│   │   ├── en.json                # English translations
│   │   └── zh.json                # Chinese translations
│   ├── data/
│   │   ├── index.ts               # Data access functions
│   │   ├── projects.json          # Projects data
│   │   ├── resume.json            # English resume data
│   │   └── resume.zh.json         # Chinese resume data
│   ├── lib/
│   │   └── utils.ts               # cn() utility (clsx + twMerge)
│   └── styles/
│       └── global.css             # CSS variables & @theme configuration
│       └── global.css             # CSS variables & Tailwind directives
├── public/
│   ├── favicon.svg
│   └── favicon.ico
├── astro.config.mjs               # Astro config with React & @tailwindcss/vite
└── tsconfig.json                  # TypeScript config (extends astro/tsconfigs/strict)
```
└── tsconfig.json                  # TypeScript config (extends astro/tsconfigs/strict)
```

## Key Patterns

### Swiss Design System

CSS variables in `global.css` define the design tokens:

```css
/* Light mode */
--primary: #FF3D00;           /* Swiss Orange */
--background: #F2F2F2;
--foreground: #161616;

/* Dark mode */
--background: #161616;
--foreground: #FFFFFF;
```

Toggle via `class="dark"` on `<html>` element.

### Tailwind CSS v4 Configuration

Tailwind v4 uses CSS-based configuration via `@theme` directive in `global.css`:

```css
@import "tailwindcss";

@theme {
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --font-sans: 'MiSans', ui-sans-serif, system-ui, sans-serif;
  /* ... */
}
```

Dark mode via custom variant:
```css
@custom-variant dark (&:where(.dark, .dark *));
```

### Component Pattern (shadcn/ui style)

Components use `class-variance-authority` (CVA) for variant props:

```tsx
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva("inline-flex...", {
  variants: {
    variant: {
      default: "bg-primary...",
      destructive: "bg-destructive...",
      // ...
    },
    size: {
      default: "h-9 px-4 py-2",
      sm: "h-8 rounded-md px-3",
      // ...
    },
  },
});
```

### Astro + React Integration

Astro pages use React components with `client:load` directive:

```astro
---
import { PortfolioContent } from "@/components/PortfolioContent";
---
<Layout title="...">
  <PortfolioContent client:load locale={locale} />
</Layout>
```

### i18n Pattern

Translation JSON files + TypeScript utilities:

```ts
// src/i18n/index.ts
export type Locale = 'en' | 'zh';
export function getTranslations(locale: Locale) { ... }
export function useTranslations(locale: Locale) { ... }
```

Navigation links handle locale prefixes:
- `/` → English
- `/zh` → Chinese
- `/resume` → English resume
- `/zh/resume` → Chinese resume

### Path Alias

`@` alias points to `src/`:

```ts
import Layout from "@/layouts/Layout.astro";
import { cn } from "@/lib/utils";
```

## Commands

```bash
cd portfolio-astro

# Development
pnpm dev          # Start dev server (default: localhost:4321)

# Build
pnpm build        # Build for production (output: dist/)

# Preview
pnpm preview      # Preview production build
```

## Development Notes

- Theme initialization runs inline in `<head>` to prevent flash of wrong theme
- Mobile menu state managed in React (Header.tsx)
- Resume and projects data stored as JSON files, loaded at build time
- All UI components are client-side React; Astro handles routing and initial HTML shell
