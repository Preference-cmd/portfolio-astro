import * as React from "react";
import { Github, MoveUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getProjects } from "@/data";
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
        rootMargin: "-40% 0px -50% 0px", // Trigger when element is within the middle 10%
      }
    );

    const items = document.querySelectorAll(".project-timeline-item");
    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="projects"
      className="py-24 bg-background relative"
      aria-label="Projects Section"
    >
      <div className="container px-4 md:px-8 w-full max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-muted pb-8 mb-16 relative z-10">
          <div className="relative">
            <div className="text-muted-foreground font-mono text-xs uppercase tracking-widest mb-4">
              04 / {locale === "en" ? "Projects" : "我的项目"}
            </div>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-foreground uppercase">
              {locale === "en" ? "Featured Work" : "精选项目"}
            </h2>
          </div>
          <p className="text-muted-foreground font-mono text-sm max-w-sm mt-6 md:mt-0 md:text-right">
            Selected engineering and design implementations.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start relative z-10 w-full">
          {/* Left: Project Timeline list (Scroll Area) */}
          <div className="lg:w-[35%] w-full">
            <div className="relative">
              {/* Vertical Line via border */}
              <div className="absolute left-[37px] top-0 bottom-0 w-[1px] bg-muted hidden lg:block" />

              <div className="space-y-0 relative z-10">
                {projects.map((project, index) => (
                  <div
                    key={project.id}
                    data-id={project.id}
                    className={cn(
                      "project-timeline-item relative w-full text-left pl-0 lg:pl-[84px] py-12 lg:py-32 pr-0 lg:pr-4 flex flex-col justify-center",
                      "min-h-[auto] lg:min-h-[60vh]",
                      index === 0 ? "lg:mt-0" : "",
                      index === projects.length - 1 ? "lg:mb-[30vh]" : ""
                    )}
                  >
                    {/* Timeline Tracker (Desktop only) */}
                    <div className="absolute left-[calc(37px-10px+0.5px)] top-1/2 -translate-y-1/2 hidden lg:flex items-center justify-center w-[20px] bg-background">
                      <span
                        className={cn(
                          "transition-all duration-500 font-mono text-xs font-bold w-full text-center relative z-20",
                          activeId === project.id
                            ? "text-primary scale-150"
                            : "text-muted-foreground scale-100 opacity-30"
                        )}
                      >
                        {activeId === project.id ? "◊" : "□"}
                      </span>
                    </div>

                    {/* Timeline Info (Desktop only) text wrapper */}
                    <div className={cn(
                      "transition-all duration-500 hidden lg:block",
                      activeId === project.id ? "opacity-100 translate-x-0" : "opacity-30 -translate-x-4"
                    )}>
                      <div className="font-bold text-3xl mb-3 tracking-tighter uppercase">
                        {project.title}
                      </div>
                      <div className="text-sm font-mono tracking-widest text-muted-foreground mt-2 uppercase mb-6">
                        {project.duration} // {project.role}
                      </div>

                      {/* Buttons in left column for desktop */}
                      <div className={cn(
                        "flex flex-wrap gap-4 transition-all duration-500",
                        activeId === project.id ? "opacity-100" : "opacity-0 pointer-events-none -translate-y-2"
                      )}>
                        {project.liveUrl && (
                          <Button size="sm" className="w-auto" asChild>
                            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                              {locale === "en" ? "Live Demo" : "演示"}
                              <MoveUpRight className="h-4 w-4 ml-2" />
                            </a>
                          </Button>
                        )}
                        {project.githubUrl && (
                          <Button variant="outline" size="sm" className="w-auto" asChild>
                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                              <Github className="h-4 w-4 mr-2" />
                              {locale === "en" ? "Source" : "源码"}
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>

                    {/* Mobile Project Card (Visible only on mobile/tablet) */}
                    <div className="block lg:hidden w-full mb-8">
                      <ProjectCard project={project} getStatusLabel={getStatusLabel} locale={locale} isActive={true} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Project Preview (Sticky on Desktop) */}
          <div className="hidden lg:flex lg:w-[65%] w-full sticky top-24 h-[calc(100vh-10rem)] items-center justify-center">
            <div className="relative w-full h-[80vh] max-h-[900px] flex items-center justify-center">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className={cn(
                    "absolute w-full h-full transition-all duration-700 ease-out flex items-center justify-center",
                    activeId === project.id
                      ? "opacity-100 translate-y-0 z-10"
                      : "opacity-0 translate-y-16 pointer-events-none -z-10"
                  )}
                  style={{
                    // Add slight rotations to inactive cards if desired for stacking effect, we stick to straight fade/slide here.
                  }}
                >
                  <ProjectCard project={project} getStatusLabel={getStatusLabel} locale={locale} isActive={activeId === project.id} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

interface ProjectCardProps {
  project: ProjectType;
  getStatusLabel: (status: string) => string;
  locale: "en" | "zh";
  isActive: boolean;
}

function ProjectCard({ project, getStatusLabel, locale, isActive }: ProjectCardProps) {
  return (
    <Card className={cn(
      "w-full h-full flex flex-col p-0 bg-background/95 backdrop-blur-xl transition-all duration-500",
      isActive ? "border-primary shadow-[4px_4px_0_var(--color-primary)]" : "border-muted"
    )}>
      <CardHeader className="border-b border-muted p-6 md:p-8 bg-muted/10">
        <div className="flex flex-col mb-4">
          <span className="text-xs font-mono text-muted-foreground tracking-widest uppercase mb-2">Deploy: {project.id}</span>
          <CardTitle className="text-3xl md:text-4xl uppercase tracking-tighter font-black mb-4">{project.title}</CardTitle>
          <div className="flex items-center">
            <Badge
              variant={
                project.status === "completed"
                  ? "default"
                  : project.status === "in progress"
                    ? "secondary"
                    : "outline"
              }
              className={cn(
                "notched-br px-3 py-1",
                project.status === "completed" ? "bg-primary text-primary-foreground border-primary" : ""
              )}
            >
              {getStatusLabel(project.status)}
            </Badge>
          </div>
        </div>
        <CardDescription className="text-lg text-foreground font-semibold mt-4">
          {project.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="p-6 md:p-8 flex-grow flex flex-col justify-between overflow-y-auto">
        <div>
          <p className="text-sm font-mono text-muted-foreground leading-relaxed mb-8">
            {project.overview}
          </p>

          <div className="mb-8">
            <h4 className="text-xs font-mono text-muted-foreground tracking-widest uppercase mb-4">Technologies</h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech: string) => (
                <span key={tech} className="text-xs font-bold font-mono bg-foreground text-background px-3 py-1.5 uppercase tracking-widest">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 text-xs font-mono text-muted-foreground uppercase tracking-widest border-t border-muted pt-6 mt-auto">
          <div className="flex flex-col gap-1">
            <span className="text-foreground/50">Timeline</span>
            <span className="text-foreground">{project.duration}</span>
          </div>
          <div className="border-l border-muted pl-4 flex flex-col gap-1">
            <span className="text-foreground/50">Team</span>
            <span className="text-foreground">{project.teamSize}</span>
          </div>
          <div className="border-l border-muted pl-4 flex flex-col gap-1">
            <span className="text-foreground/50">Role</span>
            <span className="text-foreground">{project.role}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-6 md:p-8 border-t border-muted bg-muted/10 gap-4 flex-wrap lg:hidden">
        {project.liveUrl && (
          <Button size="lg" className="w-full sm:w-auto" asChild>
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              {locale === "en" ? "Live Demo" : "演示"}
              <MoveUpRight className="h-4 w-4 ml-2" />
            </a>
          </Button>
        )}
        {project.githubUrl && (
          <Button variant="outline" size="lg" className="w-full sm:w-auto" asChild>
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
              <Github className="h-4 w-4 mr-2" />
              {locale === "en" ? "Source" : "源码"}
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
