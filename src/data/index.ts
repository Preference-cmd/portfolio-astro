import type { Locale } from '@/i18n';
import fs from 'fs';
import path from 'path';

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
  hero?: {
    greeting: string;
    title: string;
    subtitle: string;
    cta: string;
    contactMe: string;
  };
}

const KV_DIR = path.join(process.cwd(), 'src', 'data', 'kv');
const EXAMPLE_DIR = path.join(process.cwd(), 'src', 'data', 'example');

function readJsonFile(filename: string, subdir = ''): any {
  const kvPath = path.join(KV_DIR, subdir, filename);
  if (fs.existsSync(kvPath)) {
    try {
      return JSON.parse(fs.readFileSync(kvPath, 'utf-8'));
    } catch (e) {
      console.warn(`Failed to parse KV file: ${kvPath}, falling back to example`);
    }
  }

  const examplePath = path.join(EXAMPLE_DIR, subdir, filename);
  if (fs.existsSync(examplePath)) {
    try {
      return JSON.parse(fs.readFileSync(examplePath, 'utf-8'));
    } catch (e) {
      console.error(`Failed to parse example file: ${examplePath}`);
    }
  }

  console.error(`Data file not found: ${filename}`);
  return null;
}

export function getProjects(locale: Locale = 'en'): Project[] {
  const subdir = locale === 'zh' ? 'zh' : '';
  const data = readJsonFile('projects.json', subdir);
  return (data?.projects || []) as Project[];
}

export function getResume(locale: Locale): ResumeData {
  const filename = locale === 'zh' ? 'resume.zh.json' : 'resume.json';
  const subdir = locale === 'zh' ? 'zh' : 'en';
  const data = readJsonFile(filename, subdir);
  
  if (!data) {
    return {
      personalInfo: { name: '', title: '', subtitle: '' },
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
