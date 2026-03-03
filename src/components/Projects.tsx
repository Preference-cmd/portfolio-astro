import * as React from "react";
import { Github, ExternalLink } from "lucide-react";
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
  const projects = getProjects();
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
      className="py-24 bg-muted/30 relative"
    >
      <div className="container px-8 w-full max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold mb-4">
            {locale === "en" ? "My Projects" : "我的项目"}
          </h2>
          <p className="text-muted-foreground text-lg">
            {locale === "en" ? "Featured Projects" : "精选项目"}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-24 items-start relative">
          {/* Left: Project Timeline list (Scroll Area) */}
          <div className="lg:w-2/5 w-full">
            <div className="relative">
              {/* Vertical Line */}
              <div className="absolute left-[27px] lg:left-4 top-0 bottom-0 w-0.5 bg-border hidden lg:block" />

              <div className="space-y-0">
                {projects.map((project, index) => (
                  <div
                    key={project.id}
                    data-id={project.id}
                    className={cn(
                      "project-timeline-item relative w-full text-left pl-0 lg:pl-12 py-12 lg:py-32 pr-0 lg:pr-4 flex flex-col justify-center",
                      "min-h-[auto] lg:min-h-[60vh]",
                      index === 0 ? "lg:mt-0" : "",
                      index === projects.length - 1 ? "lg:mb-[30vh]" : ""
                    )}
                  >
                    {/* Timeline Dot (Desktop only) */}
                    <span
                      className={cn(
                        "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 transition-all duration-500 hidden lg:block",
                        activeId === project.id
                          ? "bg-primary border-primary scale-125"
                          : "bg-background border-muted-foreground/30"
                      )}
                    />

                    {/* Timeline Info (Desktop only) text wrapper */}
                    <div className={cn(
                      "transition-all duration-500 hidden lg:block",
                      activeId === project.id ? "opacity-100 translate-x-0" : "opacity-40 -translate-x-4"
                    )}>
                      <div className="font-bold text-3xl mb-2">
                        {project.title}
                      </div>
                      <div className="text-lg text-muted-foreground mt-2">
                        {project.duration}
                      </div>
                    </div>

                    {/* Mobile Project Card (Visible only on mobile/tablet) */}
                    <div className="block lg:hidden w-full mb-8">
                      <ProjectCard project={project} getStatusLabel={getStatusLabel} locale={locale} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Project Preview (Sticky on Desktop) */}
          <div className="hidden lg:flex lg:w-3/5 w-full sticky top-32 h-[calc(100vh-16rem)] items-center justify-center">
            <div className="relative w-full h-full flex items-center justify-center">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className={cn(
                    "absolute w-full transition-all duration-700 ease-out",
                    activeId === project.id
                      ? "opacity-100 translate-y-0 scale-100 z-10"
                      : "opacity-0 translate-y-12 scale-95 z-0 pointer-events-none"
                  )}
                >
                  <ProjectCard project={project} getStatusLabel={getStatusLabel} locale={locale} />
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
}

function ProjectCard({ project, getStatusLabel, locale }: ProjectCardProps) {
  return (
    <Card className="w-full shadow-lg border-2 border-transparent hover:border-primary/20 p-6 bg-background/80 backdrop-blur-sm">
      <CardHeader>
        <div className="flex justify-between items-start gap-4 flex-wrap mb-4">
          <CardTitle className="text-2xl">{project.title}</CardTitle>
          <Badge
            variant={
              project.status === "completed"
                ? "default"
                : project.status === "in progress"
                  ? "secondary"
                  : "outline"
            }
            className={project.status === "completed" ? "bg-primary text-primary-foreground" : ""}
          >
            {getStatusLabel(project.status)}
          </Badge>
        </div>
        <CardDescription className="text-lg">
          {project.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-base text-muted-foreground leading-relaxed">
          {project.overview}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech: string) => (
            <Badge key={tech} variant="outline" className="text-sm px-3 py-1">
              {tech}
            </Badge>
          ))}
        </div>
        <div className="flex gap-4 text-xs text-muted-foreground">
          <span>{project.duration}</span>
          <span className="opacity-50">|</span>
          <span>{project.teamSize}</span>
          <span className="opacity-50">|</span>
          <span>{project.role}</span>
        </div>
      </CardContent>
      <CardFooter className="gap-2">
        {project.liveUrl && (
          <Button variant="outline" size="sm" asChild>
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4 mr-2" />
              {locale === "en" ? "Live Demo" : "演示"}
            </a>
          </Button>
        )}
        {project.githubUrl && (
          <Button variant="outline" size="sm" asChild>
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
              <Github className="h-4 w-4 mr-2" />
              {locale === "en" ? "GitHub" : "源码"}
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
