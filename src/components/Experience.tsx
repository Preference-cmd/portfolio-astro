import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { getResume, type Locale } from "@/data";
import { cn } from "@/lib/utils";

interface ExperienceProps {
  locale: Locale;
}

export function Experience({ locale }: ExperienceProps) {
  const resume = getResume(locale);

  return (
    <section id="experience" className="py-20 scroll-mt-16">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {locale === "en" ? "Experience" : "工作经历"}
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative max-w-3xl mx-auto">
        {/* Section Title */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {locale === "en" ? "Experience" : "工作经历"}
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative max-w-3xl">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

          {/* Timeline items */}
          <div className="space-y-12">
            {resume.workExperience.map((job, index) => (
              <div
                key={index}
                className={cn(
                  "relative flex flex-col md:flex-row gap-6",
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                )}
              >
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-primary rounded-full -translate-x-1/2 mt-6 z-10" />

                {/* Content card */}
                <div className={cn(
                  "ml-12 md:ml-0 md:w-[calc(50%-1.5rem)]",
                  index % 2 === 0 ? "md:text-right" : "md:text-left"
                )}>
                  <Card className="bg-card border-border/50">
                    <CardContent className="p-5">
                      {/* Period badge */}
                      <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary mb-3">
                        {job.period}
                      </span>
                      
                      {/* Position */}
                      <h3 className="text-lg font-semibold mb-1">
                        {job.position}
                      </h3>
                      
                      {/* Company */}
                      <p className="text-sm text-muted-foreground mb-3">
                        {locale === "en" ? "at " : ""}{job.company}
                      </p>
                      
                      {/* Responsibilities */}
                      <ul className={cn(
                        "space-y-2 text-sm text-muted-foreground",
                        index % 2 === 0 ? "md:text-right" : "md:text-left"
                      )}>
                        {job.responsibilities.map((resp, respIndex) => (
                          <li key={respIndex} className={cn(
                            "flex gap-2",
                            index % 2 === 0 ? "md:flex-row-reverse" : ""
                          )}>
                            <span className="text-primary">•</span>
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                {/* Empty space for alternating layout */}
                <div className="hidden md:block md:w-[calc(50%-1.5rem)]" />
              </div>
            ))}
          </div>
        </div>

        {/* Education Section */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold mb-6">
            {locale === "en" ? "Education" : "教育背景"}
          </h3>
          <div className="max-w-3xl space-y-4">
            {resume.education.map((edu, index) => (
              <Card key={index} className="bg-card border-border/50">
                <CardContent className="p-5">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                    <div>
                      <h4 className="text-lg font-semibold">{edu.institution}</h4>
                      <p className="text-muted-foreground">{edu.degree}</p>
                    </div>
                    <span className="text-sm text-muted-foreground">{edu.period}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
