import type { Locale } from '@/i18n';

import projectsData from './projects.json';
import resumeData from './resume.json';
import resumeDataZh from './resume.zh.json';

export interface Project {
  id: string;
  title: string;
  description: string;
  overview: string;
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
  keyProjects: {
    name: string;
    period: string;
    description: string[];
  }[];
  education: {
    institution: string;
    degree: string;
    period: string;
    description: string[];
  }[];
  // Hero and About content from D1
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

export function getProjects(): Project[] {
  return projectsData.projects as Project[];
}

export function getResume(locale: Locale): ResumeData {
  return locale === 'zh' ? resumeDataZh as ResumeData : resumeData as ResumeData;
}
