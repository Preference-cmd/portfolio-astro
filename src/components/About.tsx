import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
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
    skills: string[];
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
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-24 bg-background relative flex items-center min-h-[50vh]">
      <div className="container px-8 w-full max-w-5xl mx-auto">
        {/* Section Title */}
        <div className={cn(
          "text-center mb-16 transition-all duration-700 ease-out",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <h2 className="text-4xl font-bold mb-4">{about.title}</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {locale === "en" ? "Technical Expertise" : "技术专长"}
          </p>
        </div>

        {/* Unified Skills Section */}
        <div className={cn(
          "transition-all duration-1000 delay-150 ease-out w-full",
          isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-12 scale-95"
        )}>
          <Card className="w-full shadow-lg border-2 border-transparent hover:border-primary/20 p-8 md:p-12 bg-background/80 backdrop-blur-sm mx-auto">
            <CardContent className="p-0">
              <h3 className="text-2xl font-bold mb-10 text-center">
                {about.skillsTitle}
              </h3>
              <div className="flex flex-wrap justify-center gap-4">
                {about.skills.map((skill: string, index: number) => (
                  <span
                    key={index}
                    className="px-6 py-3 text-base rounded-md border border-primary/30 bg-primary/5 text-foreground transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:shadow-md cursor-default font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
