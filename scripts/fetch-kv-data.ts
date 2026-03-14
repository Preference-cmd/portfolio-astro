/**
 * 构建前脚本：从 Cloudflare KV 获取数据并保存为 JSON 文件
 * 使用 Cloudflare REST API
 *
 * 使用方法:
 * npx tsx scripts/fetch-kv-data.ts
 */

import fs from 'fs';
import path from 'path';

const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID || '';
const KV_NAMESPACE_ID = process.env.CLOUDFLARE_KV_NAMESPACE_ID || '';
const API_TOKEN = process.env.CLOUDFLARE_API_TOKEN || '';
const OUTPUT_DIR = path.join(process.cwd(), 'src', 'data', 'kv');

const API_BASE = `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/storage/kv/namespaces/${KV_NAMESPACE_ID}`;

// 确保输出目录存在
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

/**
 * 从 KV 读取数据 via REST API
 */
async function readFromKV(key: string): Promise<string | null> {
  try {
    const response = await fetch(`${API_BASE}/values/${encodeURIComponent(key)}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
      },
    });

    if (!response.ok) {
      console.error(`KV key "${key}" not found:`, response.status);
      return null;
    }

    return await response.text();
  } catch (error) {
    console.error(`KV key "${key}" error:`, (error as Error).message);
    return null;
  }
}

/**
 * 获取项目数据
 */
async function fetchProjects(): Promise<boolean> {
  console.log('Fetching projects from KV...');
  const projectsJson = await readFromKV('projects');

  if (!projectsJson) {
    console.log('No projects from KV, will use local fallback');
    return false;
  }

  const formatted = JSON.parse(projectsJson);

  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'projects.json'),
    JSON.stringify(formatted, null, 2)
  );
  console.log(`✓ Saved ${formatted.projects?.length || 0} projects`);
  return true;
}

/**
 * 获取简历数据（英文）
 */
async function fetchResumeEn(): Promise<boolean> {
  console.log('Fetching resume (en) from KV...');
  const resumeJson = await readFromKV('resume:en');

  if (!resumeJson) {
    console.log('No resume (en) from KV, will use local fallback');
    return false;
  }

  const formatted = JSON.parse(resumeJson);

  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'resume.json'),
    JSON.stringify(formatted, null, 2)
  );
  console.log(`✓ Saved resume (en)`);
  return true;
}

/**
 * 获取简历数据（中文）
 */
async function fetchResumeZh(): Promise<boolean> {
  console.log('Fetching resume (zh) from KV...');
  const resumeJson = await readFromKV('resume:zh');

  if (!resumeJson) {
    console.log('No resume (zh) from KV, will use local fallback');
    return false;
  }

  const formatted = JSON.parse(resumeJson);

  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'resume.zh.json'),
    JSON.stringify(formatted, null, 2)
  );
  console.log(`✓ Saved resume (zh)`);
  return true;
}

// 主流程
async function main() {
  console.log('=== Fetching data from Cloudflare KV ===\n');

  if (!ACCOUNT_ID || !API_TOKEN) {
    console.log('\n⚠️ Missing CLOUDFLARE_ACCOUNT_ID or CLOUDFLARE_API_TOKEN');
    console.log('Please set these environment variables:');
    console.log('  export CLOUDFLARE_ACCOUNT_ID=your_account_id');
    console.log('  export CLOUDFLARE_API_TOKEN=your_api_token');
    console.log('\nFalling back to local JSON files...');
    process.exit(1);
  }

  const projectsOk = await fetchProjects();
  const resumeEnOk = await fetchResumeEn();
  const resumeZhOk = await fetchResumeZh();

  if (!projectsOk && !resumeEnOk && !resumeZhOk) {
    console.log('\n⚠️ WARNING: KV not available or keys not found, using local JSON files');
    console.log('⚠️ The deployed site will contain EXAMPLE DATA, not your KV content!');
    console.log('⚠️ Please check:');
    console.log('  1. KV namespace "portfolios" exists');
    console.log('  2. Keys "projects", "resume:en", "resume:zh" are set');
    console.log('  3. Run "pnpm seed:kv" to populate KV');
    process.exit(1);
  } else {
    console.log('\n✓ Data fetched from KV');
  }

  console.log('\n=== Done! ===');
}

main();
