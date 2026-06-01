import type { Locale } from '@/i18n';

import projectsEn from './kv/en/projects.json';
import projectsZh from './kv/zh/projects.json';
import resumeEn from './kv/en/resume.json';
import resumeZh from './kv/zh/resume.zh.json';
import exampleProjectsEn from './example/en/projects.json';
import exampleProjectsZh from './example/zh/projects.json';
import exampleResumeEn from './example/en/resume.json';
import exampleResumeZh from './example/zh/resume.zh.json';

export interface Project {
  id: string;
  title: string;
  description: string;
  overview: string[];
  technologies: string[];
  duration: string;
  teamSize: string;
  role: string;
  status: 'completed' | 'in progress' | 'prototype';
  liveUrl?: string;
  githubUrl?: string;
}

export interface ResumeData {
  personalInfo: {
    name: string;
    logo?: string;
    brand?: string;
    title: string;
    subtitle: string;
  };
  contact: {
    website: string;
    email: string;
    phone: string;
    location: string;
    github: string;
  };
  skills: string[];
  tools: string[];
  languages: string[];
  workExperience: {
    company: string;
    position: string;
    period: string;
    responsibilities: string[];
  }[];
  keyProjects: string[]; // project IDs referencing projects.json
  education: {
    institution: string;
    degree: string;
    period: string;
    description: string[];
  }[];
  hero?: {
    greeting: string;
    title: string;
    subtitle: string;
    cta: string;
    contactMe: string;
  };
  aboutContent?: {
    title: string;
    skillsTitle: string;
    skillCategories: { name: string; skills: string[] }[];
    stats: {
      experience: { value: string; label: string };
      projects: { value: string; label: string };
    };
  };
}

export function getProjects(locale: Locale = 'en'): Project[] {
  const kvData = locale === 'zh' ? projectsZh : projectsEn;
  const exampleData = locale === 'zh' ? exampleProjectsZh : exampleProjectsEn;

  let projects: Project[] = [];
  if (kvData?.projects) {
    projects = kvData.projects as Project[];
  } else {
    projects = (exampleData?.projects || []) as Project[];
  }

  // Sort by start year descending (newest first)
  return [...projects].sort((a, b) => {
    const aYear = extractStartYear(a.duration);
    const bYear = extractStartYear(b.duration);
    return bYear - aYear;
  });
}

function extractStartYear(duration: string): number {
  // Match patterns like "2026年3月", "March 2026", "2025.11", etc.
  const match = duration.match(/(\d{4})/);
  return match ? parseInt(match[1], 10) : 0;
}

export function getResume(locale: Locale): ResumeData {
  const kvData = locale === 'zh' ? resumeZh : resumeEn;
  const exampleData = locale === 'zh' ? exampleResumeZh : exampleResumeEn;
  
  const data = kvData || exampleData;
  
  if (!data) {
    return {
      personalInfo: { name: '', logo: '', brand: '', title: '', subtitle: '' },
      contact: { website: '', email: '', phone: '', location: '', github: '' },
      skills: [],
      tools: [],
      languages: [],
      workExperience: [],
      keyProjects: [],
      education: [],
    };
  }
  
  return data as ResumeData;
}
