-- Portfolio D1 Database Schema

-- 项目表
CREATE TABLE projects (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    overview TEXT NOT NULL,
    technologies TEXT NOT NULL, -- JSON array stored as text
    duration TEXT,
    team_size TEXT,
    role TEXT,
    status TEXT CHECK(status IN ('completed', 'in progress', 'prototype')),
    live_url TEXT,
    github_url TEXT,
    display_order INTEGER DEFAULT 0,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- 简历表 (使用 JSON blob 存储结构化数据)
CREATE TABLE resume_data (
    id TEXT PRIMARY KEY DEFAULT 'default',
    locale TEXT NOT NULL DEFAULT 'en',
    personal_info TEXT NOT NULL, -- JSON blob
    contact TEXT NOT NULL, -- JSON blob
    skills TEXT NOT NULL, -- JSON array
    tools TEXT NOT NULL, -- JSON array
    languages TEXT NOT NULL, -- JSON array
    work_experience TEXT NOT NULL, -- JSON array
    key_projects TEXT NOT NULL, -- JSON array
    education TEXT NOT NULL, -- JSON array
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(locale)
);

-- i18n 翻译表 (存储整个翻译 JSON 文件)
CREATE TABLE translations (
    id TEXT PRIMARY KEY DEFAULT 'default',
    locale TEXT NOT NULL DEFAULT 'en',
    translation_json TEXT NOT NULL, -- 整个翻译 JSON 存储为 text
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(locale)
);

-- 索引
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_order ON projects(display_order);
CREATE INDEX idx_resume_locale ON resume_data(locale);
CREATE INDEX idx_translations_locale ON translations(locale);
