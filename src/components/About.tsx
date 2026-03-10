import * as React from "react";
import { getTranslations, type Locale } from "@/i18n";
import { getResume } from "@/data";
import { cn } from "@/lib/utils";

interface AboutProps {
  locale: Locale;
}

export function About({ locale }: AboutProps) {
  const t = getTranslations(locale);
  const resume = getResume(locale);
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

        {/* Skills & Education Merged Layout */}
        <div className={cn(
          "flex flex-col gap-16 transition-all duration-1000 ease-out",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>

          {/* Main Column: Skills */}
          <div className="flex flex-col">
            <h3 className="text-2xl font-bold uppercase tracking-widest mb-6 flex items-center gap-3">
              <span className="w-3 h-3 bg-primary inline-block"></span>
              {about.skillsTitle}
            </h3>

            <div className="border border-muted bg-card grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2">
              {about.skillCategories?.map((category, idx) => (
                <div key={idx} className="p-6 md:p-8 border-muted flex flex-col border-b sm:border-r sm:even:border-r-0 last:border-b-0 sm:last:border-b-0">
                  <h4 className="font-mono text-secondary text-sm uppercase mb-6 tracking-widest flex items-center gap-2">
                    <span className="w-2 h-2 border border-primary inline-block"></span>
                    {category.name}
                  </h4>
                  <div className="flex flex-wrap gap-2 md:gap-3">
                    {category.skills.map((skill: string, index: number) => (
                      <span
                        key={index}
                        className="px-3 py-1.5 text-xs md:text-sm bg-background border border-muted hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors cursor-crosshair font-mono tracking-tight"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Secondary Column: Education */}
          <div className="flex flex-col">
            <h3 className="text-2xl font-bold uppercase tracking-widest mb-6 flex items-center gap-3">
              <span className="w-3 h-3 bg-primary inline-block"></span>
              {locale === "en" ? "Education" : "教育背景"}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {resume.education.map((edu, index) => (
                <div key={index} className="border border-muted bg-card group relative flex flex-col hover:border-primary transition-colors">
                  <div className="p-6 md:p-8 h-full flex flex-col border-b border-muted bg-muted/10 group-hover:bg-primary/5 transition-colors">
                    <div className="text-xs font-mono text-primary font-bold mb-4 uppercase tracking-widest flex justify-between">
                      <span>[{edu.period}]</span>
                    </div>
                    <h4 className="text-xl font-black uppercase tracking-tighter mb-2 leading-tight">
                      {edu.institution}
                    </h4>
                    <div className="text-sm font-mono text-muted-foreground uppercase mt-4 border-l-2 border-primary pl-3">
                      {edu.degree}
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
