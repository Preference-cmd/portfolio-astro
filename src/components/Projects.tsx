import * as React from "react";
import { Github, MoveUpRight } from "lucide-react";
import { getProjects } from "@/data";
import { SwissTag } from "@/components/ui/swiss-tag";
import { SectionHeader } from "@/components/ui/section-header";
import { cn } from "@/lib/utils";

interface ProjectsProps {
  locale: "en" | "zh";
}

type ProjectType = ReturnType<typeof getProjects>[0];

export function Projects({ locale }: ProjectsProps) {
  const projects = getProjects(locale);
  const [activeId, setActiveId] = React.useState(projects[0]?.id || "");

  const getStatusLabel = (status: string): string => {
    if (status === "completed") return locale === "en" ? "Completed" : "已完成";
    if (status === "in progress") return locale === "en" ? "In Progress" : "进行中";
    return locale === "en" ? "Prototype" : "原型";
  };

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-id");
            if (id) {
              setActiveId(id);
            }
          }
        });
      },
      {
        root: null,
        rootMargin: "-40% 0px -50% 0px",
      }
    );

    const items = document.querySelectorAll(".project-item");
    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="projects"
      className="py-16 md:py-24 bg-background relative"
      aria-label="Projects Section"
    >
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <SectionHeader
          number={`04 / ${locale === "en" ? "Projects" : "我的项目"}`}
          title={locale === "en" ? "Featured Work" : "精选项目"}
          subtitle="Selected engineering and design implementations."
        />

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">
          {/* Left: Project list */}
          <div className="lg:w-[40%] w-full">
            <div className="space-y-0">
              {projects.map((project, index) => (
                <div
                  key={project.id}
                  data-id={project.id}
                  className={cn(
                    "project-item py-8 lg:py-12 border-b border-muted cursor-pointer transition-all duration-300",
                    index === 0 && "border-t",
                    activeId === project.id
                      ? "opacity-100"
                      : "opacity-60 hover:opacity-85"
                  )}
                  onClick={() => setActiveId(project.id)}
                >
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="font-mono text-sm text-muted-foreground">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-xl md:text-2xl font-medium tracking-tight text-foreground">
                      {project.title}
                    </h3>
                  </div>
                  <div className="text-sm font-mono text-muted-foreground uppercase tracking-widest ml-9">
                    {project.duration} // {project.role}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Active project detail (sticky on desktop) */}
          <div className="hidden lg:block lg:w-[60%] w-full sticky top-24">
            {projects.map((project) => (
              <div
                key={project.id}
                className={cn(
                  "transition-all duration-500",
                  activeId === project.id
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4 absolute inset-0 pointer-events-none"
                )}
                aria-hidden={activeId !== project.id}
                inert={activeId !== project.id || undefined}
              >
                <ProjectDetail
                  project={project}
                  getStatusLabel={getStatusLabel}
                  locale={locale}
                />
              </div>
            ))}
          </div>

          {/* Mobile: All project details */}
          <div className="lg:hidden w-full space-y-8">
            {projects.map((project) => (
              <ProjectDetail
                key={project.id}
                project={project}
                getStatusLabel={getStatusLabel}
                locale={locale}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

interface ProjectDetailProps {
  project: ProjectType;
  getStatusLabel: (status: string) => string;
  locale: "en" | "zh";
}

function ProjectDetail({ project, getStatusLabel, locale }: ProjectDetailProps) {
  return (
    <div className="border border-muted bg-card">
      {/* Top bar with tags */}
      <div className="p-6 md:p-8 border-b border-muted">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <SwissTag variant="orange">{getStatusLabel(project.status)}</SwissTag>
          <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
            {project.id}
          </span>
        </div>
        <h3 className="text-2xl md:text-3xl font-medium tracking-tight text-foreground mb-3">
          {project.title}
        </h3>
        <p className="text-base text-foreground font-medium">
          {project.description}
        </p>
      </div>

      <div className="p-6 md:p-8">
        <ul className="space-y-1 mb-8">
          {project.overview.map((item, i) => (
            <li key={i} className="flex gap-2 text-sm text-muted-foreground">
              <span className="text-primary">—</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className="mb-8">
          <h4 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4 pb-2 border-b border-muted">
            Technologies
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech: string) => (
              <SwissTag key={tech} variant="outline" size="sm">{tech}</SwissTag>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 text-xs font-mono text-muted-foreground uppercase tracking-widest border-t border-muted pt-6">
          <div>
            <span className="block text-foreground/50 mb-1">Timeline</span>
            <span className="text-foreground">{project.duration}</span>
          </div>
          <div>
            <span className="block text-foreground/50 mb-1">Team</span>
            <span className="text-foreground">{project.teamSize}</span>
          </div>
          <div>
            <span className="block text-foreground/50 mb-1">Role</span>
            <span className="text-foreground">{project.role}</span>
          </div>
        </div>
      </div>

      <div className="p-6 md:p-8 border-t border-muted flex flex-wrap gap-4">
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-foreground hover:text-primary transition-colors"
          >
            {locale === "en" ? "Live Demo" : "演示"}
            <MoveUpRight className="h-4 w-4" />
          </a>
        )}
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
          >
            <Github className="h-4 w-4" />
            {locale === "en" ? "Source" : "源码"}
          </a>
        )}
      </div>
    </div>
  );
}