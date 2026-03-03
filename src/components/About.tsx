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
    stats: {
      experience: { value: string; label: string };
      projects: { value: string; label: string };
    };
  };

  return (
    <section id="about" className="py-20 scroll-mt-16 justify-center flex items-center">
      <div className="container px-4">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{about.title}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {about.subtitle}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid sm:grid-cols-2 gap-4 max-w-xl mx-auto mb-12">
          <Card className="bg-card border-border/50">
            <CardContent className="p-6 text-center">
              <p className="text-4xl font-bold text-primary">
                {about.stats.experience.value}
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                {about.stats.experience.label}
              </p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border/50">
            <CardContent className="p-6 text-center">
              <p className="text-4xl font-bold text-primary">
                {about.stats.projects.value}
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                {about.stats.projects.label}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Skills Section - Card with pill tags */}
        <div className="max-w-3xl mx-auto">
          <Card className="bg-card border-border/50">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4 text-center">
                {about.skillsTitle}
              </h3>
              <div className="flex flex-wrap justify-center gap-2">
                {about.skills.map((skill, index) => (
                  <span
                    key={index}
                    className={cn(
                      "px-3 py-1.5 text-sm rounded-full border border-primary/30 bg-primary/5 text-foreground transition-colors hover:bg-primary/10 hover:border-primary/50 cursor-default"
                    )}
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
