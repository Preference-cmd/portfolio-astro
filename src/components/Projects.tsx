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

export function Projects({ locale }: ProjectsProps) {
  const projects = getProjects();
  const sectionRef = React.useRef<HTMLElement>(null);
  const [activeId, setActiveId] = React.useState(projects[0]?.id || "");
  const [isAnimating, setIsAnimating] = React.useState(false);
  const isAnimatingRef = React.useRef(false);
  const [direction, setDirection] = React.useState<"up" | "down">("down");
  const [isInView, setIsInView] = React.useState(false);
  const isLastProjectRef = React.useRef(false);
  const isFirstProjectRef = React.useRef(true);

  const getStatusLabel = (status: string): string => {
    if (status === "completed") return locale === "en" ? "Completed" : "已完成";
    if (status === "in progress") return locale === "en" ? "In Progress" : "进行中";
    return locale === "en" ? "Prototype" : "原型";
  };

  const currentIndex = projects.findIndex((p) => p.id === activeId);
  isLastProjectRef.current = currentIndex === projects.length - 1;
  isFirstProjectRef.current = currentIndex === 0;

  const handleProjectSelect = React.useCallback((id: string, dir: "up" | "down" = "down") => {
    if (id === activeId || isAnimatingRef.current) return;
    setDirection(dir);
    isAnimatingRef.current = true;
    setIsAnimating(true);
    setTimeout(() => {
      setActiveId(id);
      isAnimatingRef.current = false;
      setIsAnimating(false);
    }, 300);
  }, [activeId]);

  const goToNext = React.useCallback(() => {
    if (isLastProjectRef.current) return false;
    const nextIndex = currentIndex + 1;
    handleProjectSelect(projects[nextIndex].id, "down");
    return true;
  }, [currentIndex, handleProjectSelect, projects]);

  const goToPrev = React.useCallback(() => {
    if (isFirstProjectRef.current) return false;
    const prevIndex = currentIndex - 1;
    handleProjectSelect(projects[prevIndex].id, "up");
    return true;
  }, [currentIndex, handleProjectSelect, projects]);

  // Handle scroll within section
  React.useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let scrollTimeout: NodeJS.Timeout;

    const handleWheel = (e: WheelEvent) => {
      // Only handle vertical scroll and when in view - require larger scroll delta
      if (!isInView || Math.abs(e.deltaY) < 50) return;

      // Wait for animation to complete before allowing next scroll
      if (isAnimatingRef.current) return;

      // If at last project and scrolling down, allow natural scroll to next section
      if (e.deltaY > 0 && isLastProjectRef.current) return;

      // If at first project and scrolling up, allow natural scroll to previous section
      if (e.deltaY < 0 && isFirstProjectRef.current) return;

      // Prevent default scroll and handle project switch
      e.preventDefault();
      clearTimeout(scrollTimeout);

      scrollTimeout = setTimeout(() => {
        if (e.deltaY > 0) {
          goToNext();
        } else {
          goToPrev();
        }
      }, 50);
    };

    section.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      section.removeEventListener("wheel", handleWheel);
      clearTimeout(scrollTimeout);
    };
  }, [isInView, goToNext, goToPrev]);

  // Track if section is in view
  React.useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const activeProject = projects.find((p) => p.id === activeId) || projects[0];

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-24 scroll-mt-16 bg-muted/30 min-h-screen flex items-center justify-center"
    >
      <div className="container px-8 w-full max-w-7xl">
        {/* Section Title */}
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold mb-4">
            {locale === "en" ? "My Projects" : "我的项目"}
          </h2>
          <p className="text-muted-foreground text-lg">
            {locale === "en" ? "Featured Projects" : "精选项目"}
          </p>
        </div>

        {/* Carousel Layout */}
        <div className="flex flex-col lg:flex-row gap-24 items-start">
          {/* Left: Project Timeline */}
          <div className="lg:w-2/5 w-full">
            <div className="relative">
              {/* Vertical Line */}
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />

              {/* Project List */}
              <div className="space-y-4">
                {projects.map((project) => (
                  <button
                    key={project.id}
                    onClick={() => handleProjectSelect(project.id, project.id > activeId ? "down" : "up")}
                    disabled={isAnimating}
                    className={cn(
                      "relative w-full text-left pl-12 py-4 pr-4 rounded-lg transition-all duration-300 group",
                      activeId === project.id
                        ? "bg-primary/10"
                        : "hover:bg-muted/50"
                    )}
                  >
                    {/* Timeline Dot */}
                    <span
                      className={cn(
                        "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 transition-all duration-300",
                        activeId === project.id
                          ? "bg-primary border-primary scale-125"
                          : "bg-background border-muted-foreground/30 group-hover:border-muted-foreground"
                      )}
                    />
                    {/* Project Title */}
                    <div className="font-medium text-base">
                      {project.title}
                    </div>
                    {/* Duration */}
                    <div className="text-sm text-muted-foreground mt-1">
                      {project.duration}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Project Preview with Flip Animation */}
          <div className="lg:w-3/5 w-full">
            <div className="relative min-h-150 flex items-center overflow-hidden">
              <div
                className={cn(
                  "w-full transition-all duration-300",
                  isAnimating
                    ? direction === "down"
                      ? "opacity-0 -translate-y-12"
                      : "opacity-0 translate-y-12"
                    : "opacity-100 translate-y-0"
                )}
              >
                {activeProject && (
                  <Card className="hover:shadow-lg transition-shadow border-2 border-transparent hover:border-primary/20 p-6">
                    <CardHeader>
                      <div className="flex justify-between items-start gap-4 flex-wrap mb-4">
                        <CardTitle className="text-2xl">{activeProject.title}</CardTitle>
                        <Badge
                          variant={
                            activeProject.status === "completed"
                              ? "default"
                              : activeProject.status === "in progress"
                              ? "secondary"
                              : "outline"
                          }
                          className={activeProject.status === "completed" ? "bg-primary text-primary-foreground" : ""}
                        >
                          {getStatusLabel(activeProject.status)}
                        </Badge>
                      </div>
                      <CardDescription className="text-lg">
                        {activeProject.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <p className="text-base text-muted-foreground leading-relaxed">
                        {activeProject.overview}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {activeProject.technologies.map((tech) => (
                          <Badge key={tech} variant="outline" className="text-sm px-3 py-1">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex gap-4 text-xs text-muted-foreground">
                        <span>{activeProject.duration}</span>
                        <span>|</span>
                        <span>{activeProject.teamSize}</span>
                        <span>|</span>
                        <span>{activeProject.role}</span>
                      </div>
                    </CardContent>
                    <CardFooter className="gap-2">
                      {activeProject.liveUrl && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={activeProject.liveUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-3 w-3 mr-1" />
                            {locale === "en" ? "Live" : "演示"}
                          </a>
                        </Button>
                      )}
                      {activeProject.githubUrl && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={activeProject.githubUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="h-3 w-3 mr-1" />
                            {locale === "en" ? "GitHub" : "源码"}
                          </a>
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
