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

  return (
    <section className="w-full flex flex-col">
      <div className="pt-24 flex flex-col w-full min-h-screen">
        <div className="w-full px-4 md:px-8 flex-1 flex flex-col">

          {/* Main Grid Wrapper */}
          <div className="grid grid-cols-1 lg:grid-cols-2 border-x border-t border-muted bg-background relative z-10 w-full flex-1">

            {/* 01 Nav / Section Numbering */}
            <div className="absolute -top-8 left-0 text-muted-foreground font-mono text-xs uppercase tracking-widest hidden md:block">
              01 / Introduction
            </div>

            {/* Left Column: Image Area */}
            <div className="border-b lg:border-b-0 lg:border-r border-muted relative min-h-[40vh] lg:min-h-full bg-muted/5 flex items-center justify-center p-8 md:p-14 lg:p-20 group overflow-hidden">

              {/* Decorative Background Pattern */}
              <div className="absolute inset-0 grid-bg opacity-30 z-0"></div>

              {/* Brutalist Image Container */}
              <div className="relative w-full h-full max-h-[600px] border border-muted bg-card flex items-center justify-center z-10 group-hover:border-primary transition-colors overflow-hidden">
                <img
                  src="/portrait.jpg"
                  alt="Portrait / Featured Image"
                  className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                  onError={(e) => {
                    // Fallback visually if image doesn't exist
                    e.currentTarget.style.display = 'none';
                    if (e.currentTarget.nextElementSibling) {
                      e.currentTarget.nextElementSibling.classList.remove('hidden');
                    }
                  }}
                />
                <div className="hidden absolute font-mono text-2xl md:text-3xl lg:text-5xl text-muted-foreground/20 font-bold -rotate-90 tracking-tighter uppercase whitespace-nowrap pointer-events-none">
                  [ IMAGE PLACEHOLDER ]
                </div>
              </div>
            </div>

            {/* Right Column: Hero Copy (Shortened) */}
            <div className="p-8 md:p-14 lg:p-20 flex flex-col justify-center relative">

              {/* Top right corner decorative bracket */}
              <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-muted opacity-50 hidden md:block" />

              {/* Greeting */}
              <p className="text-secondary font-mono text-sm mb-4 uppercase tracking-widest">
                [ {hero.greeting} ]
              </p>

              {/* Title */}
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[6.5rem] font-bold tracking-tighter leading-[0.85] mb-8 text-foreground uppercase">
                {hero.title}
              </h1>

              {/* Subtitle */}
              <p className="text-xl sm:text-2xl md:text-3xl text-muted-foreground font-semibold tracking-tight max-w-2xl mb-16">
                {hero.subtitle}
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                <Button asChild size="lg" variant="default" className="text-base group w-full sm:w-auto">
                  <a href="#projects">
                    {hero.cta}
                    <MoveRight className="ml-3 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-base group w-full sm:w-auto">
                  <a href="#contact">{hero.contactMe}</a>
                </Button>
              </div>

              {/* Status Info (Preserved from old right column) */}
              <div className="mt-12 pt-6 border-t border-muted/30 flex flex-wrap gap-x-8 gap-y-3 text-xs font-mono text-muted-foreground uppercase tracking-widest">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-none h-2 w-2 bg-primary"></span>
                  </span>
                  <span className="text-primary font-bold">System Active</span>
                </div>
                <div>Loc: Global</div>
                <div>Status: Available</div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom Horizontal Brand Bar (like in the reference) */}
      <div className="w-full bg-primary text-primary-foreground h-[62px] md:h-[56px] flex items-center px-4 md:px-8 overflow-hidden border-y border-muted">
        <div className="w-full h-full flex justify-between items-center font-mono text-xs md:text-sm uppercase font-bold tracking-widest">
          <span>Portfolio 2026 //</span>
          <span className="hidden sm:inline">Creative Engine</span>
          <span>v1.0.0</span>
        </div>
      </div>
    </section>
  );
}
