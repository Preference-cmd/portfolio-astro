import * as React from "react";
import { Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getResume, type ResumeData } from "@/data";
import type { Locale } from "@/i18n";

interface ResumeProps {
  locale: Locale;
}

export function Resume({ locale }: ResumeProps) {
  const data: ResumeData = getResume(locale);
  const isZh = locale === "zh";

  return (
    <div className="min-h-screen bg-background py-20">
      <div className="container max-w-4xl px-4">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold">{data.personalInfo.name}</h1>
            <p className="text-lg text-muted-foreground">{data.personalInfo.title}</p>
            <p className="text-sm text-muted-foreground">{data.personalInfo.subtitle}</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            <Download className="h-4 w-4 mr-2" />
            {isZh ? "下载 PDF" : "Download PDF"}
          </Button>
        </div>

        {/* Contact */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">{isZh ? "联系方式" : "Contact"}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">{isZh ? "邮箱" : "Email"}</p>
                <p className="font-medium">{data.contact.email}</p>
              </div>
              <div>
                <p className="text-muted-foreground">{isZh ? "电话" : "Phone"}</p>
                <p className="font-medium">{data.contact.phone}</p>
              </div>
              <div>
                <p className="text-muted-foreground">{isZh ? "位置" : "Location"}</p>
                <p className="font-medium">{data.contact.location}</p>
              </div>
              <div>
                <p className="text-muted-foreground">GitHub</p>
                <p className="font-medium">{data.contact.github}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Skills */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">{isZh ? "技能" : "Skills"}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill) => (
                <Badge key={skill} variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Work Experience */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">{isZh ? "工作经历" : "Work Experience"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {data.workExperience.map((job, index) => (
              <div key={index}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold">{job.position}</h3>
                    <p className="text-sm text-muted-foreground">{job.company}</p>
                  </div>
                  <span className="text-sm text-muted-foreground">{job.period}</span>
                </div>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  {job.responsibilities.map((resp, i) => (
                    <li key={i}>{resp}</li>
                  ))}
                </ul>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Key Projects */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">{isZh ? "关键项目" : "Key Projects"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {data.keyProjects.map((project, index) => (
              <div key={index}>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold">{project.name}</h3>
                  <span className="text-sm text-muted-foreground">{project.period}</span>
                </div>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  {project.description.map((desc, i) => (
                    <li key={i}>{desc}</li>
                  ))}
                </ul>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Education */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{isZh ? "教育背景" : "Education"}</CardTitle>
          </CardHeader>
          <CardContent>
            {data.education.map((edu, index) => (
              <div key={index} className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{edu.institution}</h3>
                  <p className="text-sm text-muted-foreground">{edu.degree}</p>
                </div>
                <span className="text-sm text-muted-foreground">{edu.period}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
