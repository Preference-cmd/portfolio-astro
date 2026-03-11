# D1 数据库迁移指南

本项目已配置为使用 Cloudflare D1 数据库存储 portfolio 数据。

## 数据流

```
D1 Database (Cloudflare)
        │
        │ wrangler d1 execute --remote
        ▼
  JSON Files (src/data/d1/)
        │
        │ require() at build time
        ▼
  Astro Static Site Generation
        │
        ▼
  Cloudflare Pages 部署
```

## 快速开始

### 1. 创建 D1 数据库

```bash
# 登录 Cloudflare
wrangler login

# 创建 D1 数据库
wrangler d1 create portfolio-db
```

将返回的 `database_id` 添加到 `wrangler.toml`:

```toml
[[d1_databases]]
binding = "DB"
database_name = "portfolio-db"
database_id = "your-database-id-here"
```

### 2. 初始化数据库

```bash
# 执行 schema
wrangler d1 execute portfolio-db --remote --file=d1/schema.sql

# 导入数据
wrangler d1 execute portfolio-db --remote --file=d1/seed-data.sql
wrangler d1 execute portfolio-db --remote --file=d1/translations.sql
```

或者使用 npm scripts:

```bash
npm run d1:push
```

### 3. 构建时同步数据

```bash
# 从 D1 获取最新数据并构建
npm run build:with-d1
```

这会：
1. 从 D1 查询所有数据
2. 保存到 `src/data/d1/` 目录
3. 执行 Astro 构建

### 4. 部署

```bash
# 使用 Wrangler 部署到 Cloudflare Pages
npx wrangler pages deploy dist
```

## 数据更新流程

1. 修改 D1 数据库中的数据：
   ```bash
   wrangler d1 execute portfolio-db --remote --command="UPDATE projects SET title='New Title' WHERE id='xxx'"
   ```

2. 重新构建：
   ```bash
   npm run build:with-d1
   ```

3. 部署：
   ```bash
   npx wrangler pages deploy dist
   ```

## 项目结构

```
portfolio-astro/
├── d1/
│   ├── schema.sql        # 数据库表结构
│   ├── seed-data.sql     # 项目和简历初始数据
│   └── translations.sql  # i18n 翻译数据
├── scripts/
│   └── fetch-d1-data.ts  # 从 D1 获取数据的脚本
├── src/
│   ├── data/
│   │   ├── d1/           # D1 导出的数据（构建时生成）
│   │   ├── projects.json # 原始 JSON 数据（备用）
│   │   └── resume.json    # 原始 JSON 数据（备用）
│   └── i18n/
│       ├── d1/           # D1 导出的翻译（构建时生成）
│       ├── en.json       # 原始翻译文件（备用）
│       └── zh.json       # 原始翻译文件（备用）
├── wrangler.toml         # Cloudflare 配置
└── package.json
```

## 备选方案

如果 D1 不可用，系统会自动回退到原始 JSON 文件，确保项目仍然可以正常构建和运行。

## 注意事项

- SSG 模式下，数据在构建时从 D1 获取，构建后静态 HTML 不包含数据库连接
- 如需实时数据，需要改用 SSR 模式（将 `output: 'static'` 改为 `output: 'server'`）
