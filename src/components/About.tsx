import * as React from "react";
import { getTranslations, type Locale } from "@/i18n";
import { getResume } from "@/data";
import { SwissTag } from "@/components/ui/swiss-tag";
import { SectionHeader } from "@/components/ui/section-header";
import { cn } from "@/lib/utils";

interface AboutProps {
  locale: Locale;
}

export function About({ locale }: AboutProps) {
  const t = getTranslations(locale);
  const resume = getResume(locale);

  const aboutContent = resume.aboutContent || (t.about as {
    title: string;
    subtitle: string;
    skillsTitle: string;
    skillCategories: { name: string; skills: string[] }[];
  });

  const [isVisible, setIsVisible] = React.useState(false);
  const sectionRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-16 md:py-24 relative">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <SectionHeader
          number={`02 / ${locale === "en" ? "Profile" : "个人简介"}`}
          title={aboutContent.title}
          subtitle={locale === "en"
            ? "AI Application · Full-stack · Robotics"
            : "AI应用 · 全栈 · 机器人"}
        />

        {/* Editorial grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left: Skills with tags */}
          <div className={cn(
            "lg:col-span-7 transition-all duration-700 ease-out",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}>
            <div className="mb-8">
              <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-6 pb-3 border-b border-muted">
                {aboutContent.skillsTitle}
              </h3>
            </div>

            <div className="space-y-8">
              {aboutContent.skillCategories?.map((category, idx) => (
                <div key={idx}>
                  <div className="flex items-baseline gap-3 mb-4">
                    <SwissTag variant="black">{category.name}</SwissTag>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill: string, index: number) => (
                      <span
                        key={index}
                        className="text-sm text-foreground hover:text-primary transition-colors cursor-default"
                      >
                        {skill}
                        {index < category.skills.length - 1 && (
                          <span className="text-muted-foreground ml-2">/</span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Education */}
          <div className={cn(
            "lg:col-span-5 lg:pl-8 lg:border-l border-muted transition-all duration-700 ease-out delay-150",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}>
            <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-6 pb-3 border-b border-muted">
              {locale === "en" ? "Education" : "教育背景"}
            </h3>

            <div className="space-y-6">
              {resume.education.map((edu, index) => (
                <div key={index} className="group">
                  <div className="flex items-baseline gap-3 mb-1">
                    <span className="font-bold text-base">{edu.institution}</span>
                  </div>
                  <div className="text-sm text-muted-foreground mb-2">{edu.degree}</div>
                  <span className="font-mono text-xs text-primary uppercase tracking-wider">
                    {edu.period}
                  </span>
                </div>
              ))}
            </div>

            {/* Languages */}
            <div className="mt-12">
              <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-6 pb-3 border-b border-muted">
                {locale === "en" ? "Languages" : "语言"}
              </h3>
              <div className="flex flex-wrap gap-2">
                {resume.languages?.map((lang: string, index: number) => (
                  <span key={index} className="text-sm text-foreground">
                    {lang}
                    {index < (resume.languages?.length || 0) - 1 && (
                      <span className="text-muted-foreground ml-2">/</span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}