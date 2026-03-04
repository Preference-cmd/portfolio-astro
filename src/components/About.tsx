import * as React from "react";
import { getTranslations, type Locale } from "@/i18n";
import { cn } from "@/lib/utils";

interface AboutProps {
  locale: Locale;
}

export function About({ locale }: AboutProps) {
  const t = getTranslations(locale);
  const about = t.about as {
    title: string;
    subtitle: string;
    skillsTitle: string;
    skillCategories: { name: string; skills: string[] }[];
  };

  const [isVisible, setIsVisible] = React.useState(false);
  const sectionRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-24 relative flex items-center min-h-screen">
      <div className="container px-4 md:px-8 max-w-7xl mx-auto relative z-10">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-muted pb-8 mb-16">
          <div className="relative">
            <div className="text-muted-foreground font-mono text-xs uppercase tracking-widest mb-4">
              02 / {locale === "en" ? "Profile" : "个人简介"}
            </div>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-foreground uppercase">
              {about.title}
            </h2>
          </div>
          <p className="text-muted-foreground font-mono text-sm max-w-sm mt-6 md:mt-0 md:text-right">
            Systematic overview of technical capabilities and domain expertise.
          </p>
        </div>

        {/* Skills Grid - Brutalist Module */}
        <div className={cn(
          "grid grid-cols-1 lg:grid-cols-4 border border-muted bg-card transition-all duration-1000 ease-out",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          {/* Sidebar Title */}
          <div className="p-8 border-b lg:border-b-0 lg:border-r border-muted bg-muted/10 flex flex-col justify-between">
            <h3 className="text-2xl font-bold uppercase tracking-widest mb-4">
              {about.skillsTitle}
            </h3>
            <div className="text-primary text-4xl hidden lg:block">◊</div>
          </div>

          {/* Skills Content */}
          <div className="col-span-1 lg:col-span-3 grid grid-cols-1 md:grid-cols-2">
            {about.skillCategories?.map((category, idx) => (
              <div key={idx} className={cn(
                "p-8 border-muted flex flex-col border-b md:border-r"
              )}>
                <h4 className="font-mono text-secondary text-sm uppercase mb-6 tracking-widest flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary inline-block"></span>
                  {category.name}
                </h4>
                <div className="flex flex-wrap gap-3">
                  {category.skills.map((skill: string, index: number) => (
                    <span
                      key={index}
                      className="px-3 py-1 text-xs md:text-sm bg-background border border-muted hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors cursor-crosshair font-mono tracking-tight"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
