import * as React from "react";
import { Download } from "lucide-react";
import { SwissTag } from "@/components/ui/swiss-tag";
import { getResume, getProjects, type ResumeData, type Project } from "@/data";
import type { Locale } from "@/i18n";

interface ResumeProps {
  locale: Locale;
}

export function Resume({ locale }: ResumeProps) {
  const data: ResumeData = getResume(locale);
  const allProjects = getProjects(locale);
  const keyProjectList = data.keyProjects
    .map((id) => allProjects.find((p) => p.id === id))
    .filter((p): p is Project => !!p);
  const isZh = locale === "zh";

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-12 pb-6 border-b border-muted">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading tracking-tight text-foreground">
              {data.personalInfo.name}
            </h1>
            <p className="text-sm font-mono text-muted-foreground uppercase tracking-widest mt-2">
              {data.personalInfo.title} / {data.personalInfo.subtitle}
            </p>
          </div>
          <a
            href="#"
            className="mt-4 md:mt-0 inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-foreground hover:text-primary transition-colors"
          >
            <Download className="h-4 w-4" />
            {isZh ? "下载 PDF" : "Download PDF"}
          </a>
        </div>

        {/* Contact grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 pb-8 border-b border-muted">
          <div>
            <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-1">{isZh ? "邮箱" : "Email"}</p>
            <p className="text-sm font-medium">{data.contact.email}</p>
          </div>
          <div>
            <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-1">{isZh ? "电话" : "Phone"}</p>
            <p className="text-sm font-medium">{data.contact.phone}</p>
          </div>
          <div>
            <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-1">{isZh ? "位置" : "Location"}</p>
            <p className="text-sm font-medium">{data.contact.location}</p>
          </div>
          <div>
            <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-1">GitHub</p>
            <p className="text-sm font-medium">{data.contact.github}</p>
          </div>
        </div>

        {/* Skills */}
        <div className="mb-12 pb-8 border-b border-muted">
          <h2 className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-6 pb-2 border-b border-muted">
            {isZh ? "技能" : "Skills"}
          </h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill) => (
              <SwissTag key={skill} variant="orange">{skill}</SwissTag>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            {data.tools.map((tool) => (
              <span key={tool} className="text-xs font-mono uppercase tracking-wider bg-black text-white px-2 py-1 dark:bg-white dark:text-black">
                {tool}
              </span>
            ))}
          </div>
        </div>

        {/* Work Experience */}
        <div className="mb-12 pb-8 border-b border-muted">
          <h2 className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-6 pb-2 border-b border-muted">
            {isZh ? "工作经历" : "Work Experience"}
          </h2>
          <div className="space-y-0">
            {data.workExperience.map((job, index) => (
              <div key={index} className="py-6 border-b border-muted last:border-b-0">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  <div className="md:col-span-3">
                    <SwissTag variant="black">{job.period}</SwissTag>
                  </div>
                  <div className="md:col-span-4">
                    <h3 className="text-lg font-medium tracking-tight">{job.position}</h3>
                    <p className="text-sm font-mono text-primary uppercase tracking-widest mt-1">{job.company}</p>
                  </div>
                  <div className="md:col-span-5">
                    <ul className="space-y-1">
                      {job.responsibilities.map((resp, i) => (
                        <li key={i} className="flex gap-2 text-sm text-muted-foreground">
                          <span className="text-primary">—</span>
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

        {/* Key Projects */}
        <div className="mb-12 pb-8 border-b border-muted">
          <h2 className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-6 pb-2 border-b border-muted">
            {isZh ? "关键项目" : "Key Projects"}
          </h2>
          <div className="space-y-0">
            {keyProjectList.map((project) => (
              <div key={project.id} className="py-6 border-b border-muted last:border-b-0">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
                  <div className="md:col-span-3">
                    <SwissTag variant="black">{project.duration}</SwissTag>
                  </div>
                  <div className="md:col-span-4">
                    <h3 className="text-lg font-medium tracking-tight">{project.title}</h3>
                    <p className="text-sm font-mono text-primary uppercase tracking-widest mt-1">{project.role}</p>
                  </div>
                  <div className="md:col-span-5">
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.map((tech) => (
                        <SwissTag key={tech} variant="outline" size="sm">{tech}</SwissTag>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div>
          <h2 className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-6 pb-2 border-b border-muted">
            {isZh ? "教育背景" : "Education"}
          </h2>
          <div className="space-y-6">
            {data.education.map((edu, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-3">
                  <SwissTag variant="black">{edu.period}</SwissTag>
                </div>
                <div className="md:col-span-9">
                  <h3 className="text-lg font-medium tracking-tight">{edu.institution}</h3>
                  <p className="text-sm text-muted-foreground">{edu.degree}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}