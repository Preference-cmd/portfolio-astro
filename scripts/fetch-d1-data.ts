/**
 * 构建前脚本：从 D1 获取数据并保存为 JSON 文件
 *
 * 使用方法:
 * npx tsx scripts/fetch-d1-data.ts
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const DB_NAME = 'portfolios';
const OUTPUT_DIR = path.join(process.cwd(), 'src', 'data');

// 确保输出目录存在
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

/**
 * 执行 D1 查询并返回 JSON 结果
 */
function executeD1Query(sql: string): any[] {
  try {
    const result = execSync(
      `npx wrangler d1 execute ${DB_NAME} --remote --command="${sql.replace(/"/g, '\\"')}" --json`,
      { encoding: 'utf-8', stdio: ['pipe', 'pipe', 'pipe'] }
    );

    const parsed = JSON.parse(result);
    return parsed[0]?.results || [];
  } catch (error) {
    console.error('D1 query failed:', (error as Error).message);
    return [];
  }
}

/**
 * 获取项目数据
 */
function fetchProjects(): boolean {
  console.log('Fetching projects from D1...');
  const projects = executeD1Query('SELECT * FROM projects ORDER BY display_order');

  if (projects.length === 0) {
    console.log('No projects from D1, will use local fallback');
    return false;
  }

  const formatted = {
    projects: projects.map((p: any) => ({
      id: p.id,
      title: p.title,
      description: p.description,
      overview: p.overview,
      technologies: JSON.parse(p.technologies),
      duration: p.duration,
      teamSize: p.team_size,
      role: p.role,
      status: p.status,
      liveUrl: p.live_url || undefined,
      githubUrl: p.github_url || undefined,
    }))
  };

  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'projects.json'),
    JSON.stringify(formatted, null, 2)
  );
  console.log(`✓ Saved ${formatted.projects.length} projects`);
  return true;
}

/**
 * 获取简历数据
 */
function fetchResumes(): boolean {
  console.log('Fetching resumes from D1...');
  const resumes = executeD1Query('SELECT * FROM resume_data');

  if (resumes.length === 0) {
    console.log('No resumes from D1, will use local fallback');
    return false;
  }

  let saved = false;
  resumes.forEach((r: any) => {
    const data = {
      personalInfo: JSON.parse(r.personal_info),
      contact: JSON.parse(r.contact),
      skills: JSON.parse(r.skills),
      tools: JSON.parse(r.tools),
      languages: JSON.parse(r.languages),
      workExperience: JSON.parse(r.work_experience),
      keyProjects: JSON.parse(r.key_projects),
      education: JSON.parse(r.education),
    };

    fs.writeFileSync(
      path.join(OUTPUT_DIR, `resume.${r.locale}.json`),
      JSON.stringify(data, null, 2)
    );
    console.log(`✓ Saved resume (${r.locale})`);
    saved = true;
  });

  return saved;
}

// 主流程
console.log('=== Fetching data from D1 ===\n');

const projectsOk = fetchProjects();
const resumesOk = fetchResumes();

if (!projectsOk && !resumesOk) {
  console.log('\n⚠️ WARNING: D1 not available or query failed, using local JSON files');
  console.log('⚠️ The deployed site will contain EXAMPLE DATA, not your D1 content!');
  console.log('⚠️ Please check:');
  console.log('  1. CLOUDFLARE_D1_DATABASE_ID secret is set in GitHub');
  console.log('  2. CLOUDFLARE_API_TOKEN has D1 read permissions');
  console.log('  3. The D1 database "portfolios" exists and has data');
  process.exit(1);
} else {
  console.log('\n✓ Data fetched from D1');
}

console.log('\n=== Done! ===');
