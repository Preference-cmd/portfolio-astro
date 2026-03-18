import * as React from "react";
import { MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getTranslations, type Locale } from "@/i18n";
import { getResume } from "@/data";

// Assuming we process through Vite/Astro we need to import or specify explicit path if it's in public.
// However, standard Astro / React integration often allows importing the image:
// import coverImage from "@/images/cover.jpg";
// To avoid build errors if alias isn't setup for images, we use relative:
import coverImage from "../images/cover.jpg";

interface HeroProps {
  locale: Locale;
}

export function Hero({ locale }: HeroProps) {
  const t = getTranslations(locale);
  const resume = getResume(locale);

  // Prefer KV data, fallback to i18n translations
  const heroContent = resume.hero || (t.hero as { greeting: string; title: string; subtitle: string; cta: string; contactMe: string });

  return (
    <section className="w-full relative flex flex-col bg-background">
      {/* Background Image Layer (Full Screen) */}
      <div
        className="absolute inset-0 z-0 opacity-40 bg-cover bg-center bg-no-repeat pointer-events-none"
        style={{ backgroundImage: `url(${coverImage.src || coverImage})` }}
      />
      {/* Dark overlay for better text readability against image */}
      <div className="absolute inset-0 z-0 bg-background/80 mix-blend-multiply pointer-events-none" />
      <div className="absolute inset-0 z-0 grid-bg opacity-30 mix-blend-overlay pointer-events-none"></div>

      {/* Main Content Area */}
      <div className="pt-24 flex flex-col w-full min-h-screen relative z-10">
        <div className="w-full px-4 md:px-8 flex-1 flex flex-col">

          {/* Main Container Wrapper */}
          <div className="relative w-full flex-1 flex flex-col overflow-hidden backdrop-blur-[2px]">

            {/* 01 Nav / Section Numbering */}
            <div className="absolute -top-8 left-0 text-muted-foreground font-mono text-xs uppercase tracking-widest hidden md:block">
              01 / Introduction
            </div>

            {/* Content Container */}
            <div className="p-8 md:p-14 lg:p-20 flex flex-col justify-center relative z-10 flex-1">

              {/* Greeting */}
              <p className="text-secondary font-mono text-sm mb-4 uppercase tracking-widest">
                [ {heroContent.greeting} ]
              </p>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold tracking-normal leading-[1.15] mb-8 text-foreground">
                {heroContent.title}
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground font-semibold tracking-normal max-w-2xl mb-16">
                {heroContent.subtitle}
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                <Button asChild size="lg" variant="default" className="text-base group w-full sm:w-auto">
                  <a href="#projects">
                    {heroContent.cta}
                    <MoveRight className="ml-3 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-base group w-full sm:w-auto">
                  <a href="#contact">{heroContent.contactMe}</a>
                </Button>
              </div>

              {/* Status Info */}
              <div className="mt-12 pt-6 flex flex-wrap gap-x-8 gap-y-3 text-xs font-mono text-muted-foreground uppercase tracking-widest">
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
      <div className="relative z-20 w-full bg-primary text-primary-foreground h-[62px] md:h-[56px] flex items-center px-4 md:px-8 overflow-hidden border-y border-muted">
        <div className="w-full h-full flex justify-between items-center font-mono text-xs md:text-sm uppercase font-bold tracking-widest">
          <span>Portfolio 2026 //</span>
          <span className="hidden sm:inline">Creative Engine</span>
          <span>v1.0.0</span>
        </div>
      </div>
    </section>
  );
}
