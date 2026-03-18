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

  const aboutContent = resume.aboutContent || (t.about as {
    title: string;
    subtitle: string;
    skillsTitle: string;
    skillCategories: { name: string; skills: string[] }[];
  });

  const [isVisible, setIsVisible] = React.useState(false);
  const sectionRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
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
    <section id="about" ref={sectionRef} className="py-16 md:py-24 relative flex items-center min-h-screen">
      <div className="container px-4 md:px-8 max-w-7xl mx-auto relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          <div className="lg:col-span-4">
            <div className={cn(
              "transition-all duration-700 ease-out",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}>
              <div className="text-muted-foreground font-mono text-xs uppercase tracking-widest mb-4">
                02 / {locale === "en" ? "Profile" : "个人简介"}
              </div>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold tracking-normal text-foreground mb-6">
                {aboutContent.title}
              </h2>
              <div className="w-12 h-0.5 bg-primary mb-6" />
              <p className="text-muted-foreground font-mono text-sm leading-relaxed">
                {locale === "en" 
                  ? "Building at the intersection of AI and full-stack development. Focused on scalable systems and clean architecture."
                  : "构建于 AI 与全栈开发的交汇点。专注于可扩展系统与清晰架构。"}
              </p>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className={cn(
              "transition-all duration-700 ease-out delay-150",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}>
              
              <div className="mb-12">
                <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-6 pb-3 border-b border-muted">
                  {aboutContent.skillsTitle}
                </h3>
                
                <div className="space-y-6">
                  {aboutContent.skillCategories?.map((category, idx) => (
                    <div key={idx}>
                      <div className="flex items-baseline gap-4 mb-3">
                        <span className="font-mono text-xs uppercase tracking-wider text-primary">
                          {category.name}
                        </span>
                        <div className="flex-1 h-px bg-muted/30" />
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {category.skills.map((skill: string, index: number) => (
                          <span
                            key={index}
                            className="px-3 py-1.5 text-sm border border-muted hover:border-primary hover:bg-primary/5 transition-colors"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-6 pb-3 border-b border-muted">
                  {locale === "en" ? "Education" : "教育背景"}
                </h3>
                
                <div className="space-y-4">
                  {resume.education.map((edu, index) => (
                    <div key={index} className="grid grid-cols-[1fr_auto] gap-4 items-start">
                      <div>
                        <div className="font-bold text-base mb-1">{edu.institution}</div>
                        <div className="text-sm text-muted-foreground">{edu.degree}</div>
                      </div>
                      <div className="font-mono text-xs text-primary whitespace-nowrap">
                        {edu.period}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
