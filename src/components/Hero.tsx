import * as React from "react";
import { MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getTranslations, type Locale } from "@/i18n";

interface HeroProps {
  locale: Locale;
}

export function Hero({ locale }: HeroProps) {
  const t = getTranslations(locale);
  const hero = t.hero as { greeting: string; title: string; subtitle: string; cta: string; contactMe: string };
  const about = t.about as { paragraphs: { para1: string; para2: string; para3: string; } };

  return (
    <section className="min-h-screen pt-24 pb-12 flex flex-col justify-center">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">

        {/* Main Grid Wrapper */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] border border-muted bg-background relative z-10">

          {/* 01 Nav / Section Numbering */}
          <div className="absolute -top-8 left-0 text-muted-foreground font-mono text-xs uppercase tracking-widest hidden md:block">
            01 / Introduction
          </div>

          {/* Left Column: Hero Copy */}
          <div className="p-8 md:p-14 lg:p-20 border-b lg:border-b-0 lg:border-r border-muted flex flex-col justify-center relative">

            {/* Top right corner decorative bracket */}
            <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-muted opacity-50 hidden md:block" />

            {/* Greeting */}
            <p className="text-secondary font-mono text-sm mb-6 uppercase tracking-widest">
              [ {hero.greeting} ]
            </p>

            {/* Title */}
            <h1 className="text-5xl md:text-7xl lg:text-[6rem] font-bold tracking-tighter leading-[0.85] mb-8 text-foreground uppercase">
              {hero.title}
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-muted-foreground font-semibold tracking-tight max-w-2xl mb-12">
              {hero.subtitle}
            </p>

            {/* Bio */}
            <div className="space-y-6 max-w-2xl mb-12 font-mono text-sm text-muted-foreground leading-relaxed">
              <p>{about.paragraphs.para1}</p>
              <p>{about.paragraphs.para2}</p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-6 mt-auto">
              <Button asChild size="lg" variant="default" className="text-base group">
                <a href="#projects">
                  {hero.cta}
                  <MoveRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-base group">
                <a href="#contact">{hero.contactMe}</a>
              </Button>
            </div>
          </div>

          {/* Right Column: Site Map / Stats */}
          <div className="flex flex-col">
            <div className="p-6 md:p-8 border-b border-muted flex-grow">
              <h3 className="text-muted-foreground font-mono text-xs uppercase tracking-widest mb-6 border-b border-muted pb-4">
                Directory
              </h3>
              <ul className="space-y-4 font-mono text-sm tracking-tight">
                <li><a href="#about" className="hover:text-primary transition-colors flex justify-between"><span>About</span> <span>02</span></a></li>
                <li className="dotted-divider my-4"></li>
                <li><a href="#experience" className="hover:text-primary transition-colors flex justify-between"><span>Experience</span> <span>03</span></a></li>
                <li className="dotted-divider my-4"></li>
                <li><a href="#projects" className="hover:text-primary transition-colors flex justify-between"><span>Projects</span> <span>04</span></a></li>
                <li className="dotted-divider my-4"></li>
                <li><a href="#contact" className="hover:text-primary transition-colors flex justify-between"><span>Contact</span> <span>05</span></a></li>
              </ul>
            </div>

            {/* Status Block */}
            <div className="p-6 md:p-8 bg-muted/10 grid-bg relative">
              <div className="flex items-center gap-3 text-sm font-mono text-primary mb-4">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-none bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-none h-2 w-2 bg-primary"></span>
                </span>
                <span className="uppercase tracking-wider font-bold">System Active</span>
              </div>
              <p className="text-xs text-muted-foreground/80 font-mono leading-relaxed uppercase">
                Location: Global<br />
                Stack: TS / React / Astro<br />
                Status: Available
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Horizontal Brand Bar (like in the reference) */}
      <div className="w-full bg-primary text-primary-foreground py-4 px-4 md:px-8 mt-12 overflow-hidden border-y border-muted">
        <div className="container mx-auto max-w-7xl flex justify-between items-center font-mono text-xs md:text-sm uppercase font-bold tracking-widest">
          <span>Portfolio 2026 //</span>
          <span className="hidden sm:inline">Creative Engine</span>
          <span>v1.0.0</span>
        </div>
      </div>
    </section>
  );
}
