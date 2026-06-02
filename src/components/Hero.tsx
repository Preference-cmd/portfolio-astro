import * as React from "react";
import { ArrowDown, Github } from "lucide-react";
import { getTranslations, type Locale } from "@/i18n";
import { getResume } from "@/data";

const TEMPLATE_REPO_URL = "https://github.com/Preference-cmd/portfolio-astro";

interface HeroProps {
  locale: Locale;
}

export function Hero({ locale }: HeroProps) {
  const t = getTranslations(locale);
  const resume = getResume(locale);
  const heroContent = resume.hero ||
    (t.hero as {
      greeting: string;
      title: string;
      subtitle: string;
      cta: string;
      contactMe: string;
      useTemplate: string;
    });

  return (
    <section className="w-full relative bg-background pt-28 pb-16 md:pt-36 md:pb-24">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        {/* Top meta row */}
        <div className="flex justify-between items-start mb-16 md:mb-24">
          <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            01 / {locale === "en" ? "Introduction" : "简介"}
          </div>
          <div className="text-right">
            <div className="text-xs font-mono uppercase tracking-widest text-foreground">
              AI <span className="text-primary">&amp;</span> INNOVATION
            </div>
            <div className="text-[10px] font-mono text-muted-foreground mt-1">
              {locale === "en" ? "For human beings to maintain normal" : "为了人类保持正常"}
            </div>
          </div>
        </div>

        {/* Main editorial layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-end">
          {/* Left: Giant name */}
          <div className="lg:col-span-7">
            {(() => {
              const nameParts = splitNameLines(
                resume.personalInfo?.name || "Shan Lin",
              );
              return (
                <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[10rem] xl:text-[12rem] font-heading leading-[0.85] text-foreground">
                  {nameParts.map((part, i) => (
                    <span key={i} className="block">
                      {part}
                    </span>
                  ))}
                </h1>
              );
            })()}
            <div className="mt-6 flex flex-wrap items-baseline gap-x-4 gap-y-2">
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                {resume.personalInfo?.title || heroContent.title}
              </span>
              <span
                className="font-serif italic text-base md:text-lg text-foreground/85 leading-snug"
                style={{ fontFeatureSettings: "'ss01'" }}
              >
                — {resume.personalInfo?.subtitle}
              </span>
            </div>
          </div>

          {/* Right: Description block */}
          <div className="lg:col-span-5 lg:pl-8 lg:border-l border-muted">
            <p className="text-sm md:text-base leading-relaxed text-foreground max-w-md mb-8">
              {heroContent.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-4">
              <a
                href="#projects"
                className="inline-flex items-center justify-center gap-2 min-h-[44px] text-xs font-mono uppercase tracking-widest text-foreground hover:text-primary transition-colors group"
              >
                <span className="w-8 h-8 border border-muted flex items-center justify-center group-hover:border-primary transition-colors shrink-0">
                  <ArrowDown className="h-4 w-4" />
                </span>
                {heroContent.cta}
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center min-h-[44px] text-xs font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
              >
                {heroContent.contactMe}
              </a>
              <a
                href={TEMPLATE_REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 min-h-[44px] px-3 text-xs font-mono uppercase tracking-widest text-foreground border border-muted hover:border-primary hover:text-primary transition-colors"
              >
                <Github className="h-3.5 w-3.5 shrink-0" />
                {heroContent.useTemplate}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Splits a name into stacked display lines. ASCII names split on
// whitespace; CJK names are split per character so a 2-4 character
// name still reads as a vertical stack matching the editorial
// scale.
function splitNameLines(name: string): string[] {
  const trimmed = name.trim();
  if (!trimmed) return [""];
  const hasAsciiWord = /[A-Za-z]/.test(trimmed);
  if (hasAsciiWord) {
    return trimmed.split(/\s+/).filter(Boolean);
  }
  return Array.from(trimmed);
}