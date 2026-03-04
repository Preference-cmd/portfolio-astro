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
          <div className="lg:col-span-12 flex flex-col gap-6 w-full max-w-6xl mx-auto">
            <h3 className="text-2xl font-bold uppercase tracking-widest mb-4 flex items-center gap-3">
              <span className="w-3 h-3 bg-primary inline-block"></span>
              {locale === "en" ? "Work Experience" : "工作经验"}
            </h3>

            <div className="relative pt-8 pl-12 md:pl-48 w-full max-w-5xl mx-auto">
              {/* Vertical Timeline Divider */}
              <div className="absolute left-4 md:left-40 top-0 bottom-0 w-px bg-muted z-0"></div>

              <div className="space-y-12 md:space-y-16">
                {resume.workExperience.map((job, index) => (
                  <div key={index} className="relative z-10 w-full group">

                    {/* Timeline Node Point (perfectly aligned with line) */}
                    <div className="absolute left-[calc(-3rem+16px-0.5px-8px)] md:left-[calc(-12rem+160px-0.5px-8px)] top-8 w-4 h-4 rounded-none bg-background border-2 border-primary group-hover:scale-150 group-hover:bg-primary transition-all z-20"></div>

                    {/* Timeline Period Label (Left side of axis on Desktop) */}
                    <div className="md:absolute md:left-[-190px] md:top-6 hidden md:flex items-center justify-end w-[130px]">
                      <div className="text-sm font-mono text-muted-foreground border border-muted px-4 py-2 uppercase tracking-widest bg-background group-hover:border-primary group-hover:text-primary transition-colors text-right whitespace-nowrap">
                        {job.period}
                      </div>
                    </div>

                    {/* Content Card (Right side of axis) */}
                    <div className="w-full border border-muted bg-card hover:border-primary transition-colors flex flex-col">
                      {/* Header */}
                      <div className="p-6 md:p-8 border-b border-muted bg-muted/10 group-hover:bg-primary/5 transition-colors">
                        {/* Mobile Only Period */}
                        <div className="md:hidden text-xs font-mono text-muted-foreground mb-4 uppercase tracking-widest border border-muted px-3 py-1 inline-block bg-background">
                          {job.period}
                        </div>
                        <h4 className="text-2xl font-black uppercase tracking-tighter mb-2">{job.position}</h4>
                        <div className="text-sm font-mono text-primary font-bold uppercase tracking-widest">
                          {locale === "en" ? "AT " : "@ "}{job.company}
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

                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
