import * as React from "react";
import { Github, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getProjects, type Project } from "@/data";

interface ProjectsProps {
  locale: "en" | "zh";
}

export function Projects({ locale }: ProjectsProps) {
  const projects = getProjects();

  const getStatusLabel = (status: string): string => {
    if (status === "completed") return locale === "en" ? "Completed" : "已完成";
    if (status === "in progress") return locale === "en" ? "In Progress" : "进行中";
    return locale === "en" ? "Prototype" : "原型";
  };

  return (
    <section id="projects" className="py-20 scroll-mt-16 bg-muted/30">
      <div className="container px-4">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            {locale === "en" ? "My Projects" : "我的项目"}
          </h2>
          <p className="text-muted-foreground">
            {locale === "en" ? "Featured Projects" : "精选项目"}
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {projects.map((project) => (
            <Card key={project.id} className="flex flex-col hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start gap-2">
                  <CardTitle className="text-xl">{project.title}</CardTitle>
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
                <CardDescription className="line-clamp-2">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="grow">
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                  {project.overview}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <Badge key={tech} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                  {project.technologies.length > 4 && (
                    <Badge variant="outline" className="text-xs">
                      +{project.technologies.length - 4}
                    </Badge>
                  )}
                </div>
                <div className="text-xs text-muted-foreground">
                  <p>{project.duration}</p>
                </div>
              </CardContent>
              <CardFooter className="gap-2">
                {project.liveUrl && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-3 w-3 mr-1" />
                      {locale === "en" ? "Live" : "演示"}
                    </a>
                  </Button>
                )}
                {project.githubUrl && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="h-3 w-3 mr-1" />
                      {locale === "en" ? "GitHub" : "源码"}
                    </a>
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
