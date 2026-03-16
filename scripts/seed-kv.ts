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
const DATA_DIR = path.join(process.cwd(), 'src', 'data', 'kv');

const API_BASE = `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/storage/kv/namespaces/${KV_NAMESPACE_ID}`;

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

function readJsonFile(filename: string, subdir: string): object | null {
  const filepath = path.join(DATA_DIR, subdir, filename);
  if (!fs.existsSync(filepath)) {
    console.log(`File not found: ${filepath}`);
    return null;
  }
  try {
    return JSON.parse(fs.readFileSync(filepath, 'utf-8'));
  } catch (error) {
    console.error(`Failed to parse ${filepath}:`, (error as Error).message);
    return null;
  }
}

async function seedProjects(): Promise<boolean> {
  console.log('Seeding projects...');
  
  const dataEn = readJsonFile('projects.json', 'en');
  const dataZh = readJsonFile('projects.json', 'zh');
  
  let saved = false;
  
  if (dataEn) {
    const success = await writeToKV('projects:en', JSON.stringify(dataEn));
    if (success) {
      console.log(`✓ Seeded projects (en)`);
      saved = true;
    }
  }
  
  if (dataZh) {
    const success = await writeToKV('projects:zh', JSON.stringify(dataZh));
    if (success) {
      console.log(`✓ Seeded projects (zh)`);
      saved = true;
    }
  }
  
  if (!dataEn && !dataZh) {
    console.log('No projects found to seed');
    return false;
  }
  
  return saved;
}

async function seedResumeEn(): Promise<boolean> {
  console.log('Seeding resume (en)...');
  const data = readJsonFile('resume.json', 'en');
  if (!data) return false;

  const success = await writeToKV('resume:en', JSON.stringify(data));
  if (success) {
    console.log('✓ Seeded resume (en)');
  }
  return success;
}

async function seedResumeZh(): Promise<boolean> {
  console.log('Seeding resume (zh)...');
  const data = readJsonFile('resume.zh.json', 'zh');
  if (!data) return false;

  const success = await writeToKV('resume:zh', JSON.stringify(data));
  if (success) {
    console.log('✓ Seeded resume (zh)');
  }
  return success;
}

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
