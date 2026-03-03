import * as React from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getTranslations, type Locale } from "@/i18n";

interface HeroProps {
  locale: Locale;
}

export function Hero({ locale }: HeroProps) {
  const t = getTranslations(locale);
  const hero = t.hero as { greeting: string; title: string; subtitle: string; cta: string; contactMe: string };
  const about = t.about as {
    paragraphs: {
      para1: string;
      para2: string;
      para3: string;
    };
  };

  return (
    <section className="min-h-screen flex items-center justify-center pt-16">
      <div className="container px-4">
        {/* Centered two-column layout */}
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          {/* Left - Text Content */}
          <div className="text-center lg:text-left">
            {/* Greeting */}
            <p className="text-lg text-muted-foreground mb-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {hero.greeting}
            </p>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
              {hero.title}
            </h1>

            {/* Subtitle */}
            <p className="text-xl text-muted-foreground mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
              {hero.subtitle}
            </p>

            {/* Bio Paragraphs */}
            <div className="space-y-4 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
              <p className="text-lg text-muted-foreground leading-relaxed">
                {about.paragraphs.para1}
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {about.paragraphs.para2}
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {about.paragraphs.para3}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <a href="#projects">
                  {hero.cta}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="#contact">{hero.contactMe}</a>
              </Button>
            </div>
          </div>

          {/* Right - Decorative visual element */}
          <div className="flex items-center justify-center">
            <div className="relative w-64 h-64 flex items-center justify-center">
              {/* Background blur */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
              </div>

              {/* Geometric shapes */}
              <div className="relative">
                <div className="w-32 h-32 border-4 border-primary rotate-45 animate-pulse" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <span className="text-6xl font-bold text-primary">SL</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
