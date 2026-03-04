import * as React from "react";
import { getResume } from "@/data";
import type { Locale } from "@/i18n";
import { cn } from "@/lib/utils";

interface ExperienceProps {
  locale: Locale;
}

export function Experience({ locale }: ExperienceProps) {
  const resume = getResume(locale);

  return (
    <section id="experience" className="py-24 bg-background relative" aria-label="Experience Section">
      <div className="container px-4 md:px-8 w-full max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-muted pb-8 mb-16 relative z-10">
          <div className="relative">
            <div className="text-muted-foreground font-mono text-xs uppercase tracking-widest mb-4">
              03 / {locale === "en" ? "Experience" : "工作经历"}
            </div>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-foreground uppercase">
              {locale === "en" ? "Career Path" : "职业轨迹"}
            </h2>
          </div>
          <p className="text-muted-foreground font-mono text-sm max-w-sm mt-6 md:mt-0 md:text-right">
            Professional trajectory and academic foundations.
          </p>
        </div>

        {/* Experience & Education Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 relative z-10 w-full mb-12">

          {/* Work Experience */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <h3 className="text-2xl font-bold uppercase tracking-widest mb-4 flex items-center gap-3">
              <span className="w-3 h-3 bg-primary inline-block"></span>
              {locale === "en" ? "Work Experience" : "工作经验"}
            </h3>

            <div className="space-y-6">
              {resume.workExperience.map((job, index) => (
                <div key={index} className="border border-muted bg-card group relative flex flex-col hover:border-primary transition-colors">
                  {/* Header part */}
                  <div className="p-6 md:p-8 border-b border-muted bg-muted/10 group-hover:bg-primary/5 transition-colors flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div>
                      <h4 className="text-2xl font-black uppercase tracking-tighter mb-2">{job.position}</h4>
                      <div className="text-sm font-mono text-primary font-bold uppercase tracking-widest">
                        {locale === "en" ? "AT " : "@ "}{job.company}
                      </div>
                    </div>
                    <div className="text-xs font-mono text-muted-foreground border border-muted px-3 py-1 uppercase tracking-widest bg-background h-fit">
                      {job.period}
                    </div>
                  </div>

                  {/* Responsibilities */}
                  <div className="p-6 md:p-8">
                    <ul className="space-y-3 font-mono text-sm text-muted-foreground">
                      {job.responsibilities.map((resp, respIndex) => (
                        <li key={respIndex} className="flex gap-3 leading-relaxed">
                          <span className="text-primary mt-1">&gt;</span>
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education Secondary Column */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <h3 className="text-2xl font-bold uppercase tracking-widest mb-4 flex items-center gap-3">
              <span className="w-3 h-3 bg-primary inline-block"></span>
              {locale === "en" ? "Education" : "教育背景"}
            </h3>

            <div className="space-y-6">
              {resume.education.map((edu, index) => (
                <div key={index} className="border border-muted border-l-4 border-l-primary bg-card p-6 md:p-8 flex flex-col">
                  <div className="text-xs font-mono text-muted-foreground mb-4 uppercase tracking-widest">
                    {edu.period}
                  </div>
                  <h4 className="text-xl font-black uppercase tracking-tighter mb-2">
                    {edu.institution}
                  </h4>
                  <div className="text-sm font-mono text-muted-foreground uppercase">
                    {edu.degree}
                  </div>
                </div>
              ))}
            </div>

            {/* Brutalist Deco Block */}
            <div className="hidden lg:flex flex-1 border border-muted bg-muted/5 items-center justify-center p-8 mt-2 overflow-hidden relative group min-h-[200px]">
              <div className="absolute inset-0 bg-primary/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out"></div>
              <div className="text-primary font-mono text-6xl tracking-tighter opacity-20 group-hover:opacity-100 transition-opacity rotate-90 scale-150">
                SYSTEM
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
