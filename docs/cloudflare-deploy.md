# Cloudflare Pages 部署指南

## 方案一：静态部署（Cloudflare Pages）

### 1. 准备工作

1. 注册 Cloudflare 账号：https://dash.cloudflare.com/sign-up
2. 确保项目已构建完成

### 2. 构建项目

```bash
# 进入前端目录
cd frontend

# 安装依赖
npm install

# 构建生产版本
npm run build
```

构建产物位于 `frontend/dist` 目录。

### 3. 部署到 Cloudflare Pages

#### 方法A：通过 Dashboard 手动部署

1. 登录 Cloudflare Dashboard：https://dash.cloudflare.com
2. 点击左侧菜单 **Workers & Pages**
3. 点击 **Create application**
4. 选择 **Pages** 标签
5. 点击 **Upload assets**
6. 填写项目名称（如：`neiqiu-shenma`）
7. 选择 **Upload a folder**
8. 上传 `frontend/dist` 目录
9. 点击 **Deploy site**

#### 方法B：通过 Git 自动部署（推荐）

1. 将项目推送到 GitHub/GitLab
2. 在 Cloudflare Pages 中选择 **Connect to Git**
3. 选择你的仓库
4. 配置构建设置：
   - **Production branch**: main
   - **Build command**: npm run build
   - **Build output directory**: dist
5. 点击 **Save and Deploy**

### 4. 配置自定义域名

1. 在 Pages 项目设置中点击 **Custom domains**
2. 添加你的域名（如：`shenma.example.com`）
3. 按提示配置 DNS 记录

### 5. 配置 SPA 路由重定向

由于项目使用 React Router，需要配置重定向规则。

在 `frontend/public` 目录创建 `_redirects` 文件：

```
/*    /index.html   200
```

或者在 `frontend/public` 目录创建 `_routes.json` 文件：

```json
{
  "version": 1,
  "include": ["/*"],
  "exclude": ["/assets/*", "/uploads/*", "/content.json"],
  "routes": [
    { "handle": "filesystem" },
    { "src": "/*", "dest": "/index.html" }
  ]
}
```

---

## 方案二：完整功能部署（Cloudflare Workers + Pages）

如果需要保留后台编辑和图片上传功能，需要使用 Workers。

### 1. 创建 Worker 处理 API

创建 `worker.js` 文件：

```javascript
import { parse } from 'cookie';

const KV_NAMESPACE = 'CONTENT_KV';
const R2_BUCKET = 'UPLOADS_BUCKET';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;

    // API 路由
    if (path.startsWith('/api')) {
      return handleAPI(request, env);
    }

    // 静态资源由 Pages 处理
    return env.ASSETS.fetch(request);
  }
};

async function handleAPI(request, env) {
  const url = new URL(request.url);
  const path = url.pathname.replace('/api', '');

  if (path === '/content' && request.method === 'GET') {
    const content = await env[KV_NAMESPACE].get('content', 'json');
    return new Response(JSON.stringify(content || {}), {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  if (path === '/save' && request.method === 'POST') {
    const content = await request.json();
    await env[KV_NAMESPACE].put('content', JSON.stringify(content));
    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  if (path === '/upload' && request.method === 'POST') {
    const formData = await request.formData();
    const file = formData.get('file');
    
    const timestamp = Date.now();
    const randomNum = Math.floor(Math.random() * 1000000000);
    const filename = `${timestamp}-${randomNum}.${file.name.split('.').pop()}`;
    
    await env[R2_BUCKET].put(filename, file.stream());
    
    return new Response(JSON.stringify({ 
      filename,
      url: `/uploads/${filename}`
    }), {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  return new Response('Not Found', { status: 404 });
}
```

### 2. 配置 wrangler.toml

创建 `wrangler.toml` 文件：

```toml
name = "neiqiu-shenma"
main = "worker.js"
compatibility_date = "2024-01-01"

[site]
bucket = "./dist"

[[kv_namespaces]]
binding = "CONTENT_KV"
id = "your_kv_namespace_id"

[[r2_buckets]]
binding = "UPLOADS_BUCKET"
bucket_name = "shenma-uploads"
```

### 3. 部署 Worker

```bash
# 安装 Wrangler CLI
npm install -g wrangler

# 登录 Cloudflare
wrangler login

# 创建 KV 命名空间
wrangler kv:namespace create "CONTENT_KV"

# 创建 R2 存储桶
wrangler r2 bucket create shenma-uploads

# 部署
wrangler deploy
```

---

## 常见问题

### Q: 部署后页面空白怎么办？
A: 检查 `_redirects` 文件是否正确配置，SPA 需要将所有路由重定向到 index.html。

### Q: 图片加载失败怎么办？
A: 确保 `uploads` 目录已正确上传，或使用 R2 存储桶存储图片。

### Q: 如何更新内容？
A: 静态部署需要重新构建并上传；Workers 部署可通过后台编辑。

---

## 推荐方案

对于这个项目，推荐使用 **方案一（Cloudflare Pages 静态部署）**：

1. 项目主要是展示性质的非遗文化网站
2. 部署简单，免费额度充足
3. 自动 CI/CD，更新方便
4. 全球 CDN 加速

如果后续需要后台编辑功能，可以再升级到 Workers 方案。