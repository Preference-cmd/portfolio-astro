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
              <p className="text-muted-foreground font-mono text-sm mb-6 uppercase tracking-widest">
                [ {heroContent.greeting} ]
              </p>

              <h1 className="flex flex-col leading-[0.85] mb-8">
                <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[9rem] font-heading font-black text-foreground tracking-tight">
                  AI/
                </span>
                <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-7xl font-heading font-extralight text-muted-foreground tracking-tight">
                  Fullstack Developer
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg md:text-xl text-secondary font-medium tracking-normal max-w-2xl mb-16">
                {heroContent.subtitle}
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                <Button asChild size="lg" variant="secondary" className="text-base group w-full sm:w-auto">
                  <a href="#projects">
                    {heroContent.cta}
                    <MoveRight className="ml-3 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </Button>
                <Button asChild variant="ghost" size="lg" className="text-base group w-full sm:w-auto text-foreground hover:bg-transparent hover:underline underline-offset-4">
                  <a href="#contact">{heroContent.contactMe}</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
