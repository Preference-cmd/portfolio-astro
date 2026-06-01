import * as React from "react";
import { getResume } from "@/data";
import type { Locale } from "@/i18n";
import { SwissTag } from "@/components/ui/swiss-tag";
import { SectionHeader } from "@/components/ui/section-header";
import { cn } from "@/lib/utils";

interface ExperienceProps {
  locale: Locale;
}

export function Experience({ locale }: ExperienceProps) {
  const resume = getResume(locale);

  return (
    <section id="experience" className="py-16 md:py-24 bg-background relative" aria-label="Experience Section">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <SectionHeader
          number={`03 / ${locale === "en" ? "Experience" : "工作经历"}`}
          title={locale === "en" ? "Experience" : "职业轨迹"}
          subtitle="Professional trajectory and academic foundations."
        />

        {/* Work Experience modules */}
        <div className="space-y-0">
          {resume.workExperience.map((job, index) => (
            <div
              key={index}
              className="group py-10 md:py-14 border-b border-muted"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
                {/* Left: Number + Meta */}
                <div className="lg:col-span-3">
                  <div className="flex items-baseline gap-3 mb-3">
                    <span className="font-mono text-sm text-muted-foreground">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <SwissTag variant="black">{job.period}</SwissTag>
                  </div>
                </div>

                {/* Middle: Position + Company */}
                <div className="lg:col-span-4">
                  <h4 className="text-xl md:text-2xl font-medium tracking-tight text-foreground mb-2">
                    {job.position}
                  </h4>
                  <div className="text-sm font-mono text-primary uppercase tracking-widest">
                    {job.company}
                  </div>
                </div>

                {/* Right: Responsibilities */}
                <div className="lg:col-span-5">
                  <ul className="space-y-2">
                    {job.responsibilities.map((resp, respIndex) => (
                      <li key={respIndex} className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
                        <span className="text-primary mt-1 shrink-0">&mdash;</span>
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}