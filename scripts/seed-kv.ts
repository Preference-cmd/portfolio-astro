/**
 * 种子脚本：将本地 JSON 数据同步到 Cloudflare KV
 * 使用 Cloudflare REST API
 *
 * 使用方法:
 * npx tsx scripts/seed-kv.ts
 */

import fs from 'fs';
import path from 'path';

const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID || '';
const KV_NAMESPACE_ID = process.env.CLOUDFLARE_KV_NAMESPACE_ID || '';
const API_TOKEN = process.env.CLOUDFLARE_API_TOKEN || '';
const DATA_DIR = path.join(process.cwd(), 'src', 'data');

const API_BASE = `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/storage/kv/namespaces/${KV_NAMESPACE_ID}`;

/**
 * 写入数据到 KV via REST API
 */
async function writeToKV(key: string, value: string): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE}/values/${encodeURIComponent(key)}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Content-Type': 'text/plain',
      },
      body: value,
    });

    if (!response.ok) {
      const error = await response.text();
      console.error(`Failed to write KV key "${key}":`, error);
      return false;
    }
    return true;
  } catch (error) {
    console.error(`Failed to write KV key "${key}":`, (error as Error).message);
    return false;
  }
}

/**
 * 读取本地 JSON 文件
 */
function readJsonFile(filename: string): object | null {
  const filepath = path.join(DATA_DIR, filename);
  if (!fs.existsSync(filepath)) {
    console.log(`File not found: ${filename}`);
    return null;
  }
  try {
    return JSON.parse(fs.readFileSync(filepath, 'utf-8'));
  } catch (error) {
    console.error(`Failed to parse ${filename}:`, (error as Error).message);
    return null;
  }
}

/**
 * 上传项目数据
 */
async function seedProjects(): Promise<boolean> {
  console.log('Seeding projects...');
  const data = readJsonFile('projects.json');
  if (!data) return false;

  const success = await writeToKV('projects', JSON.stringify(data));
  if (success) {
    console.log(`✓ Seeded projects (${(data as any).projects?.length || 0} items)`);
  }
  return success;
}

/**
 * 上传简历数据（英文）
 */
async function seedResumeEn(): Promise<boolean> {
  console.log('Seeding resume (en)...');
  const data = readJsonFile('resume.json');
  if (!data) return false;

  const success = await writeToKV('resume:en', JSON.stringify(data));
  if (success) {
    console.log('✓ Seeded resume (en)');
  }
  return success;
}

/**
 * 上传简历数据（中文）
 */
async function seedResumeZh(): Promise<boolean> {
  console.log('Seeding resume (zh)...');
  const data = readJsonFile('resume.zh.json');
  if (!data) return false;

  const success = await writeToKV('resume:zh', JSON.stringify(data));
  if (success) {
    console.log('✓ Seeded resume (zh)');
  }
  return success;
}

// 主流程
async function main() {
  console.log('=== Seeding Cloudflare KV ===\n');
  console.log(`Data directory: ${DATA_DIR}`);

  if (!ACCOUNT_ID || !API_TOKEN) {
    console.log('\n⚠️ Missing CLOUDFLARE_ACCOUNT_ID or CLOUDFLARE_API_TOKEN');
    console.log('Please set these environment variables:');
    console.log('  export CLOUDFLARE_ACCOUNT_ID=your_account_id');
    console.log('  export CLOUDFLARE_API_TOKEN=your_api_token');
    process.exit(1);
  }

  const projectsOk = await seedProjects();
  const resumeEnOk = await seedResumeEn();
  const resumeZhOk = await seedResumeZh();

  if (projectsOk && resumeEnOk && resumeZhOk) {
    console.log('\n✓ All data seeded successfully!');
  } else {
    console.log('\n⚠️ Some data failed to seed. Check errors above.');
    process.exit(1);
  }

  console.log('\n=== Done! ===');
  console.log('\nYou can now build with: pnpm build:with-kv');
}

main();
